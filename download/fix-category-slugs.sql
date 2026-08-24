-- ──────────────────────────────────────────────────────────────────────────
-- FIX: Sincronizar slugs de categorias existentes con su nombre actual.
-- ──────────────────────────────────────────────────────────────────────────
-- PROBLEMA:
--   Cuando se renombraba una categoria via PUT /api/categories/[id],
--   el `slug` NO se regeneraba, dejando la fila inconsistente
--   (name nuevo, slug viejo). Esto rompia /categoria/:slug y los
--   enlaces de negocios que dependen de category_slug por JOIN.
--
--   Ejemplo real:
--     name = 'Tapizar IA'           (nombre nuevo)
--     slug = 'tapizados-de-volantes' (slug viejo, NO coincide)
--
--   El frontend /categoria/tapizados-de-volantes seguia cargando
--   (porque el slug viejo seguia en la DB) pero mostraba el nombre
--   nuevo. El nuevo enlace /categoria/tapizar-ia devolvia 404.
--
-- SOLUCION:
--   Este script recalcula el slug de TODAS las categorias activas
--   a partir de su `name` actual, aplicando la misma logica de
--   slugify que usa el backend. En caso de colision, se le agrega
--   un sufijo -2, -3, etc.
--
-- USO (Cloudflare D1):
--   wrangler d1 execute en-santiago-db --remote --file=scripts/fixes/fix-category-slugs.sql
--
--   (cambia en-santiago-db por el nombre real de tu binding D1,
--    revisalo en wrangler.toml)
--
-- NOTAS:
--   - Es seguro ejecutarlo multiples veces (idempotente).
--   - Solo actualiza filas donde el slug actual NO coincide con el
--     slug esperado.
--   - NO borra datos, solo actualiza la columna `slug`.
-- ──────────────────────────────────────────────────────────────────────────

-- 1) Generar una tabla temporal con el slug esperado por cada categoria.
--    SQLite no tiene funcion slugify nativa, asi que hacemos un LOWER +
--    trim basico. La normalizacion de acentos se hace en dos pasadas
--    con REPLACE (limitado a los mas comunes en espanol).
CREATE TEMP TABLE IF NOT EXISTS _cat_slug_fix AS
SELECT
  id,
  name,
  slug AS current_slug,
  LOWER(
    REPLACE(
      REPLACE(
        REPLACE(
          REPLACE(
            REPLACE(
              REPLACE(
                REPLACE(
                  REPLACE(
                    REPLACE(
                      REPLACE(
                        REPLACE(
                          REPLACE(
                            REPLACE(
                              REPLACE(
                                REPLACE(
                                  REPLACE(name, 'á','a'),
                                'é','e'),
                              'í','i'),
                            'ó','o'),
                          'ú','u'),
                        'ñ','n'),
                      'Á','a'),
                    'É','e'),
                  'Í','i'),
                'Ó','o'),
              'Ú','u'),
            'Ñ','n'),
          'ü','u'),
        'Ü','u'),
      ' ','-')
    )
  ) AS expected_slug_raw
FROM categories
WHERE is_active = 1;

-- 2) Limpiar caracteres no alfanumericos (excepto guion).
--    Como SQLite no soporta regex replace, lo hacemos con REPLACE en cadena
--    para los caracteres mas comunes que aparecen en nombres de categorias.
UPDATE _cat_slug_fix
SET expected_slug_raw =
  REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(
    REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(
      REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(
        REPLACE(REPLACE(REPLACE(REPLACE(expected_slug_raw,
          '.',''), ',',''), ';',''), ':',''), '(',''), ')',''),
          '[',''), ']',''), '{',''), '}',''),
          '"',''), '''',''), '¡',''), '¿',''), '!',''),
          '?',''), '&','y'), '/','-'), '\\','-'), '@',''),
          '#',''), '$',''), '%',''), '*',''), '+',''),
          '=',''), '<',''), '>',''), '|',''), '~',''),
          '`',''), '^',''), '°',''), '--','-')
;

-- 3) Trim de guiones iniciales/finales.
UPDATE _cat_slug_fix
SET expected_slug_raw = LTRIM(RTRIM(expected_slug_raw, '-'), '-');

-- 4) Limitar a 80 caracteres (igual que el backend).
UPDATE _cat_slug_fix
SET expected_slug_raw = SUBSTR(expected_slug_raw, 1, 80);

-- 5) Reportar (preview) cuantas filas necesitan actualizacion.
--    Esto se ve en la salida de wrangler d1 execute.
SELECT
  id,
  name,
  current_slug,
  expected_slug_raw AS new_slug,
  CASE WHEN current_slug = expected_slug_raw THEN 'OK'
       ELSE 'CAMBIA' END AS status
FROM _cat_slug_fix
ORDER BY name;

-- 6) Aplicar la actualizacion solo a las filas que cambiaron.
--    Manejo de colisiones: si el slug esperado ya existe en otra categoria,
--    se le agrega sufijo -2, -3, ... hasta encontrar uno libre.
UPDATE categories
SET slug = (
  SELECT
    CASE
      WHEN NOT EXISTS (
        SELECT 1 FROM categories c2
        WHERE c2.slug = (SELECT expected_slug_raw FROM _cat_slug_fix f WHERE f.id = categories.id)
          AND c2.id != categories.id
      )
      THEN (SELECT expected_slug_raw FROM _cat_slug_fix f WHERE f.id = categories.id)
      -- Buscar sufijo libre -2, -3, ..., -100
      ELSE COALESCE(
        (SELECT (SELECT expected_slug_raw FROM _cat_slug_fix f WHERE f.id = categories.id) || '-' || (cnt.n)
         FROM (SELECT 2 AS n UNION SELECT 3 UNION SELECT 4 UNION SELECT 5 UNION SELECT 6
               UNION SELECT 7 UNION SELECT 8 UNION SELECT 9 UNION SELECT 10 UNION SELECT 11
               UNION SELECT 12 UNION SELECT 13 UNION SELECT 14 UNION SELECT 15 UNION SELECT 16
               UNION SELECT 17 UNION SELECT 18 UNION SELECT 19 UNION SELECT 20) cnt
         WHERE NOT EXISTS (
           SELECT 1 FROM categories c3
           WHERE c3.slug = (SELECT expected_slug_raw FROM _cat_slug_fix f WHERE f.id = categories.id) || '-' || (cnt.n)
             AND c3.id != categories.id
         )
         LIMIT 1),
        (SELECT expected_slug_raw FROM _cat_slug_fix f WHERE f.id = categories.id) || '-x'
      )
    END
)
WHERE id IN (SELECT id FROM _cat_slug_fix WHERE current_slug != expected_slug_raw)
  AND is_active = 1;

-- 7) Marcar updated_at
UPDATE categories
SET updated_at = datetime('now')
WHERE id IN (SELECT id FROM _cat_slug_fix WHERE current_slug != expected_slug_raw)
  AND is_active = 1;

-- 8) Limpiar tabla temporal.
DROP TABLE _cat_slug_fix;

-- 9) Verificacion final.
SELECT id, name, slug, updated_at
FROM categories
WHERE is_active = 1
ORDER BY name;
