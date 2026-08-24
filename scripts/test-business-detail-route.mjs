// Test del endpoint functions/[tipo]/[categoria]/[slug].js
// Simula los casos:
// 1. URL con categoria correcta → 200 (renderiza)
// 2. URL con categoria vieja → 301 redirect a URL correcta
// 3. URL con slug inexistente → 404
// 4. URL con tipo incorrecto → 301 redirect

import { onRequestGet } from '/tmp/en-santiago-test-fix/functions/[tipo]/[categoria]/[slug].js';

// Mock D1
class MockD1 {
  constructor() {}
  prepare(sql) {
    const trimmed = sql.trim();
    const self = {
      _sql: trimmed,
      _args: [],
      bind: function(...args) { this._args = args; return this; },
      first: async function() {
        // SELECT 1 FROM tipos_negocio LIMIT 1
        if (/SELECT 1 FROM tipos_negocio/i.test(this._sql)) {
          return MockD1.hasTipos ? { '1': 1 } : null;
        }
        // SELECT id, slug, name FROM categories WHERE slug = ? AND is_active = 1
        if (/SELECT id, slug, name FROM categories WHERE slug = \? AND is_active = 1/i.test(this._sql)) {
          const slug = this._args[0];
          const cat = MockD1.categories.find(c => c.slug === slug && c.is_active);
          return cat ? { ...cat } : null;
        }
        // BIZ_FULL or BIZ_SIMPLE - check if it's a SELECT b.* FROM businesses
        if (/SELECT[\s\S]*FROM businesses b/i.test(this._sql)) {
          // WHERE b.slug = ? AND b.status = 'approved' (without c.id filter)
          if (/WHERE b\.slug = \? AND b\.status = 'approved'/.test(this._sql)) {
            const slug = this._args[0];
            const biz = MockD1.businesses.find(b => b.slug === slug && b.status === 'approved');
            if (!biz) return null;
            const cat = MockD1.categories.find(c => c.id === biz.category_id);
            return {
              ...biz,
              category_name: cat?.name,
              category_slug: cat?.slug,
              tipo_negocio_id: cat?.tipo_negocio_id,
              tipo_negocio_slug: cat?.tipo_negocio_slug,
              tipo_negocio_name: cat?.tipo_negocio_name,
            };
          }
          // WHERE b.id = ? AND b.status = 'approved'
          if (/WHERE b\.id = \? AND b\.status = 'approved'/.test(this._sql)) {
            const id = this._args[0];
            const biz = MockD1.businesses.find(b => b.id === id && b.status === 'approved');
            if (!biz) return null;
            const cat = MockD1.categories.find(c => c.id === biz.category_id);
            return {
              ...biz,
              category_name: cat?.name,
              category_slug: cat?.slug,
            };
          }
        }
        return null;
      },
      all: async function() {
        // SELECT rating, comment... FROM reviews
        if (/FROM reviews WHERE business_id/i.test(this._sql)) {
          return { results: [] };
        }
        // Stats query
        if (/AVG\(rating\).*COUNT/i.test(this._sql)) {
          return { results: [{ avg: 0, cnt: 0 }] };
        }
        return { results: [] };
      },
      run: async function() { return { meta: {} }; },
    };
    return self;
  }
}

// Mock renderBusinessPage para evitar depender del HTML completo
// Override the import via mock - this is tricky, so I'll test the route logic directly
// by inlining what the function does

// Actually, the import is static, so we can't mock it. Let's just verify the redirect logic.

let passed = 0, failed = 0;
async function runTest(name, fn) {
  try {
    await fn();
    console.log('  \u2713 ' + name);
    passed++;
  } catch (e) {
    console.log('  \u2717 ' + name + ' -> ' + e.message);
    failed++;
  }
}
function assert(cond, msg) { if (!cond) throw new Error(msg || 'Assertion failed'); }

// Setup data
MockD1.hasTipos = false;
MockD1.categories = [
  { id: 1, slug: 'otros', name: 'Otros', is_active: 1 },
  { id: 2, slug: 'tapizado-de-volantes', name: 'Tapizado de Volantes', is_active: 1 },
];
MockD1.businesses = [
  { id: 100, slug: 'tapizado-de-volantes-santiago', title: 'Tapizado de Volantes Santiago', business_type: 'servicio', category_id: 2, status: 'approved' },
];

function makeContext(tipo, categoria, slug) {
  return {
    env: { DB: new MockD1() },
    params: { tipo, categoria, slug },
  };
}

// ─── TEST 1: URL con categoria correcta → 200
await runTest('URL correcta retorna 200 (no redirect)', async () => {
  const ctx = makeContext('servicio', 'tapizado-de-volantes', 'tapizado-de-volantes-santiago');
  const resp = await onRequestGet(ctx);
  assert(resp.status === 200, 'esperado 200, got ' + resp.status);
});

// ─── TEST 2: URL con categoria VIEJA → 301 redirect a URL nueva
await runTest('URL con categoria vieja redirige 301 a nueva', async () => {
  const ctx = makeContext('servicio', 'otros', 'tapizado-de-volantes-santiago');
  const resp = await onRequestGet(ctx);
  assert(resp.status === 301, 'esperado 301, got ' + resp.status);
  const location = resp.headers.get('Location');
  assert(location === '/servicio/tapizado-de-volantes/tapizado-de-volantes-santiago', 'Location incorrecto: ' + location);
});

// ─── TEST 3: URL con slug inexistente → 404
await runTest('URL con slug inexistente retorna 404', async () => {
  const ctx = makeContext('servicio', 'otros', 'no-existe');
  const resp = await onRequestGet(ctx);
  assert(resp.status === 404, 'esperado 404, got ' + resp.status);
});

// ─── TEST 4: URL con tipo incorrecto → 301 redirect
await runTest('URL con tipo incorrecto redirige 301', async () => {
  const ctx = makeContext('negocio', 'tapizado-de-volantes', 'tapizado-de-volantes-santiago');
  const resp = await onRequestGet(ctx);
  assert(resp.status === 301, 'esperado 301, got ' + resp.status);
  const location = resp.headers.get('Location');
  assert(location === '/servicio/tapizado-de-volantes/tapizado-de-volantes-santiago', 'Location incorrecto: ' + location);
});

console.log('');
console.log('Resultado: ' + passed + ' pasados, ' + failed + ' fallidos');
if (failed > 0) process.exit(1);
