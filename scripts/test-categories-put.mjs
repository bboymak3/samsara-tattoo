// Test funcional del endpoint PUT /api/categories/[id]
// Simula el flujo completo con un mock de D1 en memoria.

import { onRequestPut } from '/tmp/en-santiago-test/functions/api/categories/[id].js';

// ─── Mock de D1 en memoria ─────────────────────────────────────
class MockD1 {
  constructor() { /* usa MockD1.rows */ }
  prepare(sql) {
    const trimmed = sql.trim();
    const self = {
      _sql: trimmed,
      _args: [],
      bind: function(...args) { this._args = args; return this; },
      first: async function() {
        if (/SELECT id, name, slug FROM categories WHERE id = \?/.test(this._sql)) {
          const id = this._args[0];
          const row = MockD1.rows.find(r => r.id === id);
          return row ? { ...row } : null;  // ← retornar copia
        }
        if (/SELECT id FROM categories WHERE slug = \? AND id != \?/.test(this._sql)) {
          const [slug, excludeId] = this._args;
          const row = MockD1.rows.find(r => r.slug === slug && r.id !== excludeId);
          return row ? { ...row } : null;
        }
        if (/SELECT \* FROM categories WHERE id = \?/.test(this._sql)) {
          const id = this._args[0];
          const row = MockD1.rows.find(r => r.id === id);
          return row ? { ...row } : null;  // ← retornar copia
        }
        return null;
      },
      all: async function() {
        if (/SELECT.*FROM categories ORDER BY name/i.test(this._sql)) {
          return { results: [...MockD1.rows].sort((a, b) => a.name.localeCompare(b.name)) };
        }
        return { results: [] };
      },
      run: async function() {
        if (/^ALTER TABLE/i.test(this._sql)) return { meta: {} };
        if (/^UPDATE categories SET/i.test(this._sql)) {
          const id = this._args[this._args.length - 1];
          const row = MockD1.rows.find(r => r.id === id);
          if (row) {
            const setMatch = this._sql.match(/SET (.+?) WHERE/i);
            if (setMatch) {
              const clauses = setMatch[1].split(', ');
              let argIdx = 0;
              for (const clause of clauses) {
                const m = clause.match(/^(\w+)\s*=\s*\?/);
                if (m) {
                  row[m[1]] = this._args[argIdx++];
                } else if (clause.includes("updated_at = datetime")) {
                  row.updated_at = new Date().toISOString();
                } else if (clause.includes('ai_cache = NULL')) {
                  // skip
                }
              }
            }
          }
          return { meta: {} };
        }
        return { meta: {} };
      },
    };
    return self;
  }
  async batch(stmts) { return stmts.map(() => ({ results: [] })); }
}
MockD1.rows = [];

// ─── JWT helper ────────────────────────────────────────────────
async function makeAdminJWT(secret) {
  const enc = new TextEncoder();
  const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' })).replace(/=/g, '');
  const payload = btoa(JSON.stringify({ id: 1, role: 'admin', exp: Math.floor(Date.now()/1000) + 3600 })).replace(/=/g, '');
  const data = header + '.' + payload;
  const key = await crypto.subtle.importKey('raw', enc.encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
  const sig = await crypto.subtle.sign('HMAC', key, enc.encode(data));
  const sigB64 = btoa(String.fromCharCode(...new Uint8Array(sig))).replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
  return data + '.' + sigB64;
}

const SECRET = 'test-secret';
const token = await makeAdminJWT(SECRET);

function makeRequest(body, catId) {
  return new Request(`https://test.local/api/categories/${catId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token,
    },
    body: JSON.stringify(body),
  });
}

function makeContext(catId, initialRows) {
  MockD1.rows = JSON.parse(JSON.stringify(initialRows));
  return {
    request: null,
    env: { DB: new MockD1(), JWT_SECRET: SECRET },
    params: { id: String(catId) },
  };
}

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

// ─── TEST 1: Renombrar -> slug se regenera
await runTest('renombrar categoria regenera slug', async () => {
  const initial = [
    { id: 10, name: 'Tapizados de Volantes', slug: 'tapizados-de-volantes', is_active: 1, sort_order: 5, icon: 'fas fa-couch', color: '#607d8b' },
    { id: 11, name: 'Mecanica', slug: 'mecanica', is_active: 1, sort_order: 1, icon: 'fas fa-wrench', color: '#e74c3c' },
  ];
  const ctx = makeContext(10, initial);
  ctx.request = makeRequest({ name: 'Tapizar IA' }, 10);
  const resp = await onRequestPut(ctx);
  assert(resp.status === 200, 'esperado 200, got ' + resp.status);
  const body = JSON.parse(await resp.text());
  assert(body.slug_changed === true, 'slug_changed debe ser true, got: ' + JSON.stringify(body));
  assert(body.previous_slug === 'tapizados-de-volantes', 'previous_slug incorrecto: ' + body.previous_slug);
  assert(body.new_slug === 'tapizar-ia', 'new_slug incorrecto: ' + body.new_slug);
  assert(body.slug_source === 'regenerated', 'slug_source incorrecto: ' + body.slug_source);
  assert(body.category.slug === 'tapizar-ia', 'DB no se actualizo, slug=' + body.category.slug);
  assert(body.category.name === 'Tapizar IA', 'name no se actualizo');
});

// ─── TEST 2: Mismo nombre -> slug NO se toca
await runTest('mismo nombre no toca slug', async () => {
  const initial = [{ id: 20, name: 'Tapizar IA', slug: 'tapizar-ia', is_active: 1, sort_order: 5, icon: 'fas fa-couch', color: '#607d8b' }];
  const ctx = makeContext(20, initial);
  ctx.request = makeRequest({ name: 'Tapizar IA', icon: 'fas fa-edit' }, 20);
  const resp = await onRequestPut(ctx);
  const body = JSON.parse(await resp.text());
  assert(body.slug_changed === false, 'slug_changed debe ser false');
  assert(body.category.slug === 'tapizar-ia', 'slug NO debe cambiar');
});

// ─── TEST 3: Slug explicito override
await runTest('slug explicito hace override', async () => {
  const initial = [{ id: 30, name: 'Taller Mecanico', slug: 'taller-mecanico', is_active: 1, sort_order: 3, icon: 'fas fa-wrench', color: '#e74c3c' }];
  const ctx = makeContext(30, initial);
  ctx.request = makeRequest({ name: 'Taller Mecanico', slug: 'taller-auto-v2' }, 30);
  const resp = await onRequestPut(ctx);
  const body = JSON.parse(await resp.text());
  assert(body.slug_changed === true, 'slug_changed debe ser true con override explicito');
  assert(body.new_slug === 'taller-auto-v2', 'new_slug debe ser el override');
  assert(body.slug_source === 'explicit', 'slug_source debe ser explicit');
});

// ─── TEST 4: Slug colisiona -> sufijo -1
await runTest('slug colisiona genera sufijo -1', async () => {
  const initial = [
    { id: 40, name: 'Cafe', slug: 'cafe', is_active: 1, sort_order: 1, icon: 'fas fa-coffee', color: '#8b4513' },
    { id: 41, name: 'Cafeteria', slug: 'cafeteria', is_active: 1, sort_order: 2, icon: 'fas fa-coffee', color: '#8b4513' },
  ];
  const ctx = makeContext(41, initial);
  ctx.request = makeRequest({ name: 'Cafe' }, 41);
  const resp = await onRequestPut(ctx);
  const body = JSON.parse(await resp.text());
  assert(body.slug_changed === true, 'debe cambiar slug');
  assert(body.new_slug === 'cafe-1', 'esperado cafe-1 por colision, got: ' + body.new_slug);
});

// ─── TEST 4b: Slug colisiona dos veces -> sufijo -2
await runTest('slug colisiona dos veces genera sufijo -2', async () => {
  const initial = [
    { id: 40, name: 'Cafe', slug: 'cafe', is_active: 1, sort_order: 1, icon: 'fas fa-coffee', color: '#8b4513' },
    { id: 41, name: 'Cafe Premium', slug: 'cafe-1', is_active: 1, sort_order: 2, icon: 'fas fa-coffee', color: '#8b4513' },
    { id: 42, name: 'Cafeteria', slug: 'cafeteria', is_active: 1, sort_order: 3, icon: 'fas fa-coffee', color: '#8b4513' },
  ];
  const ctx = makeContext(42, initial);
  ctx.request = makeRequest({ name: 'Cafe' }, 42);
  const resp = await onRequestPut(ctx);
  const body = JSON.parse(await resp.text());
  assert(body.new_slug === 'cafe-2', 'esperado cafe-2 (2 colisiones), got: ' + body.new_slug);
});

// ─── TEST 5: Sin auth -> 403
await runTest('sin auth retorna 403', async () => {
  const initial = [{ id: 50, name: 'X', slug: 'x', is_active: 1, sort_order: 1, icon: '', color: '#000' }];
  const ctx = makeContext(50, initial);
  ctx.request = new Request('https://test.local/api/categories/50', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name: 'Y' }),
  });
  const resp = await onRequestPut(ctx);
  assert(resp.status === 403, 'esperado 403, got ' + resp.status);
});

// ─── TEST 6: Body vacio -> 400
await runTest('body vacio retorna 400', async () => {
  const initial = [{ id: 60, name: 'X', slug: 'x', is_active: 1, sort_order: 1, icon: '', color: '#000' }];
  const ctx = makeContext(60, initial);
  ctx.request = makeRequest({}, 60);
  const resp = await onRequestPut(ctx);
  assert(resp.status === 400, 'esperado 400, got ' + resp.status);
});

// ─── TEST 7: ID inexistente -> 404
await runTest('ID inexistente retorna 404', async () => {
  const initial = [{ id: 70, name: 'X', slug: 'x', is_active: 1, sort_order: 1, icon: '', color: '#000' }];
  const ctx = makeContext(999, initial);
  ctx.request = makeRequest({ name: 'Y' }, 999);
  const resp = await onRequestPut(ctx);
  assert(resp.status === 404, 'esperado 404, got ' + resp.status);
});

// ─── TEST 8: Cambio banner_url solo -> slug no se toca
await runTest('cambiar banner_url no toca slug', async () => {
  const initial = [{ id: 80, name: 'X', slug: 'x', is_active: 1, sort_order: 1, icon: '', color: '#000' }];
  const ctx = makeContext(80, initial);
  ctx.request = makeRequest({ banner_url: 'https://example.com/banner.png' }, 80);
  const resp = await onRequestPut(ctx);
  const body = JSON.parse(await resp.text());
  assert(body.slug_changed === false, 'slug_changed debe ser false');
  assert(body.category.banner_url === 'https://example.com/banner.png', 'banner_url no se actualizo');
});

console.log('');
console.log('Resultado: ' + passed + ' pasados, ' + failed + ' fallidos');
if (failed > 0) process.exit(1);
