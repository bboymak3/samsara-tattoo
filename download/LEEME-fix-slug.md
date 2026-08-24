# Fix Slug Categorías — En Santiago

## Resumen del bug

Cuando el admin renombraba una categoría (ej: "Tapizados de Volantes" → "Tapizar IA")
en el panel de administración, el campo `name` se actualizaba en la base de datos D1,
pero **el `slug` NO se recalculaba**, dejando la fila inconsistente:

- `name` = "Tapizar IA" (nombre nuevo)
- `slug` = "tapizados-de-volantes" (slug viejo)

Esto rompía:
- `/categoria/tapizar-ia` → 404 (la DB no tenía ese slug)
- `/categoria/tapizados-de-volantes` → cargaba pero con nombre nuevo (inconsistente)
- Los enlaces a negocios que usan `category_slug` por JOIN quedaban mezclados.
- En el listado del admin (`js/admin.js`) se veía el slug viejo, no el nuevo.

## Archivos modificados

1. **`functions/api/categories/[id].js`** — El PUT ahora regenera el slug cuando:
   - El `name` cambia → slug se recalcula con `slugify(name)`.
   - El admin pasa `slug` explícito en el body → se usa ese (sanitizado).
   - Se valida unicidad y se agregan sufijos `-2`, `-3`, etc. si colisiona.
   - La respuesta devuelve `slug_changed`, `previous_slug`, `new_slug` para que el
     frontend muestre feedback al admin.

2. **`functions/categoria/[slug].js`** — La página pública ahora hace fallback:
   - Si `/categoria/:slug` no encuentra por slug exacto, busca por `slugify(name)`.
   - Si encuentra, responde con 301 redirect al slug canónico actual.
   - Esto preserve el SEO: los enlaces indexados por Google con el slug viejo
     se redirigen automáticamente al nuevo.

3. **`js/admin.js`** — Se agregó:
   - Botón "Editar" (lápiz) en cada fila de categoría.
   - Modal completo de edición con campos: nombre, slug, icono, color, sort_order.
   - Auto-regeneración del slug en tiempo real al escribir el nombre.
   - Botón "Auto" para regenerar el slug desde el nombre.
   - Advertencia visual cuando el slug va a cambiar.
   - Toast con confirmación cuando el slug cambió (muestra anterior → nuevo).

4. **`scripts/fixes/fix-category-slugs.sql`** — Script de migración para D1:
   - Recalcula el slug de TODAS las categorías activas a partir de su `name` actual.
   - Idempotente (puede ejecutarse múltiples veces).
   - Maneja colisiones con sufijos -2, -3, etc.
   - Solo actualiza las filas donde el slug actual no coincide con el esperado.

## Cómo aplicar el fix (3 opciones)

### Opción A — Aplicar el patch (recomendado)

```bash
cd ruta/a/tu/en-santiago
git apply fix-slug-categorias.patch
git add -A
git commit -m "fix(categories): regenerar slug al editar categoría + redirect 301 desde slug viejo + modal admin

- PUT /api/categories/[id] ahora recalcula slug cuando name cambia
- GET /categoria/:slug hace fallback por slugify(name) + 301 redirect
- admin.js: modal completo de edición de categoría con preview de slug
- scripts/fixes/fix-category-slugs.sql: migración para D1

Fixes: bug donde renombrar categoría dejaba el slug inconsistente"
git push origin main
```

Cloudflare Pages despliega automáticamente al detectar el push.

### Opción B — Copiar archivos individuales

```bash
cp categories-id.js.fixed   ruta/a/tu/en-santiago/functions/api/categories/[id].js
cp categoria-slug.js.fixed  ruta/a/tu/en-santiago/functions/categoria/[slug].js
cp admin.js.fixed           ruta/a/tu/en-santiago/js/admin.js
cp fix-category-slugs.sql   ruta/a/tu/en-santiago/scripts/fixes/fix-category-slugs.sql

cd ruta/a/tu/en-santiago
git add -A
git commit -m "fix(categories): regenerar slug al editar categoría"
git push origin main
```

### Opción C — Verificar diff primero

```bash
git apply --check fix-slug-categorias.patch   # valida sin aplicar
git apply --stat fix-slug-categorias.patch    # muestra qué cambia
git apply fix-slug-categorias.patch            # aplica
```

## Después del deploy: ejecutar migración D1

Una vez desplegado el código nuevo, ejecuta la migración para reparar las
categorías que ya están inconsistentes en la DB:

```bash
wrangler d1 execute <TU_BINDING_D1> --remote --file=scripts/fixes/fix-category-slugs.sql
```

Reemplaza `<TU_BINDING_D1>` por el nombre real del binding D1 que está en tu
`wrangler.toml`. Si no lo recuerdas, ábrelo y busca la sección `[[d1_databases]]`.

## Verificación post-fix

1. Entra al panel admin → Categorías → verás el botón "Editar" (lápiz) al lado de cada una.
2. Edita "Tapizados de Volantes" → "Tapizar IA" → Guardar.
3. Verás un toast: "Categoría actualizada. Slug: tapizados-de-volantes → tapizar-ia".
4. La tabla ahora muestra el slug nuevo `tapizar-ia`.
5. Visita `https://en-santiago.pages.dev/categoria/tapizar-ia` → debe cargar.
6. Visita `https://en-santiago.pages.dev/categoria/tapizados-de-volantes` → debe redirigir (301) al nuevo.
7. Los negocios bajo esa categoría ahora se encuentran correctamente desde el listado.

## Seguridad

Si todavía no lo hiciste, ROTA los tokens que pegaste en el chat:
- Cloudflare: https://dash.cloudflare.com/profile/api-tokens → Roll
- GitHub: https://github.com/settings/tokens → Revoke
