-- ──────────────────────────────────────────────────────────────────────────
-- FIX: Sincronizar slugs de categorias existentes con su nombre actual.
-- VARIANTE: Esta DB no tiene columna `updated_at` en `categories`.
-- ──────────────────────────────────────────────────────────────────────────

CREATE TEMP TABLE IF NOT EXISTS _cat_slug_fix AS
SELECT id, name, slug AS current_slug, LOWER(name) AS expected_slug
FROM categories
WHERE is_active = 1;

UPDATE _cat_slug_fix SET expected_slug = REPLACE(expected_slug, 'á', 'a');
UPDATE _cat_slug_fix SET expected_slug = REPLACE(expected_slug, 'é', 'e');
UPDATE _cat_slug_fix SET expected_slug = REPLACE(expected_slug, 'í', 'i');
UPDATE _cat_slug_fix SET expected_slug = REPLACE(expected_slug, 'ó', 'o');
UPDATE _cat_slug_fix SET expected_slug = REPLACE(expected_slug, 'ú', 'u');
UPDATE _cat_slug_fix SET expected_slug = REPLACE(expected_slug, 'ñ', 'n');
UPDATE _cat_slug_fix SET expected_slug = REPLACE(expected_slug, 'Á', 'a');
UPDATE _cat_slug_fix SET expected_slug = REPLACE(expected_slug, 'É', 'e');
UPDATE _cat_slug_fix SET expected_slug = REPLACE(expected_slug, 'Í', 'i');
UPDATE _cat_slug_fix SET expected_slug = REPLACE(expected_slug, 'Ó', 'o');
UPDATE _cat_slug_fix SET expected_slug = REPLACE(expected_slug, 'Ú', 'u');
UPDATE _cat_slug_fix SET expected_slug = REPLACE(expected_slug, 'Ñ', 'n');
UPDATE _cat_slug_fix SET expected_slug = REPLACE(expected_slug, 'ü', 'u');
UPDATE _cat_slug_fix SET expected_slug = REPLACE(expected_slug, 'Ü', 'u');
UPDATE _cat_slug_fix SET expected_slug = REPLACE(expected_slug, ' ', '-');
UPDATE _cat_slug_fix SET expected_slug = REPLACE(expected_slug, '&', 'y');
UPDATE _cat_slug_fix SET expected_slug = REPLACE(expected_slug, '.', '');
UPDATE _cat_slug_fix SET expected_slug = REPLACE(expected_slug, ',', '');
UPDATE _cat_slug_fix SET expected_slug = REPLACE(expected_slug, ':', '');
-- Note: ; is not replaced here because it breaks SQL splitting, but the backend slugify removes it via regex anyway
UPDATE _cat_slug_fix SET expected_slug = REPLACE(expected_slug, '(', '-');
UPDATE _cat_slug_fix SET expected_slug = REPLACE(expected_slug, ')', '-');
UPDATE _cat_slug_fix SET expected_slug = REPLACE(expected_slug, '"', '');
UPDATE _cat_slug_fix SET expected_slug = REPLACE(expected_slug, '''', '');
UPDATE _cat_slug_fix SET expected_slug = REPLACE(expected_slug, '¡', '');
UPDATE _cat_slug_fix SET expected_slug = REPLACE(expected_slug, '¿', '');
UPDATE _cat_slug_fix SET expected_slug = REPLACE(expected_slug, '!', '');
UPDATE _cat_slug_fix SET expected_slug = REPLACE(expected_slug, '?', '');
UPDATE _cat_slug_fix SET expected_slug = REPLACE(expected_slug, '/', '-');
UPDATE _cat_slug_fix SET expected_slug = REPLACE(expected_slug, '@', '-at-');
UPDATE _cat_slug_fix SET expected_slug = REPLACE(expected_slug, '#', '');
UPDATE _cat_slug_fix SET expected_slug = REPLACE(expected_slug, '--', '-');
UPDATE _cat_slug_fix SET expected_slug = REPLACE(expected_slug, '--', '-');
UPDATE _cat_slug_fix SET expected_slug = LTRIM(RTRIM(expected_slug, '-'), '-');
UPDATE _cat_slug_fix SET expected_slug = SUBSTR(expected_slug, 1, 80);

SELECT id, name, current_slug, expected_slug AS new_slug,
  CASE WHEN current_slug = expected_slug THEN 'OK' ELSE 'CAMBIA' END AS status
FROM _cat_slug_fix ORDER BY name;

UPDATE categories
SET slug = CASE
  WHEN NOT EXISTS (
    SELECT 1 FROM categories c2
    WHERE c2.slug = (SELECT expected_slug FROM _cat_slug_fix f WHERE f.id = categories.id)
      AND c2.id != categories.id
  )
  THEN (SELECT expected_slug FROM _cat_slug_fix f WHERE f.id = categories.id)
  WHEN NOT EXISTS (
    SELECT 1 FROM categories c3
    WHERE c3.slug = ((SELECT expected_slug FROM _cat_slug_fix f WHERE f.id = categories.id) || '-1')
      AND c3.id != categories.id
  )
  THEN ((SELECT expected_slug FROM _cat_slug_fix f WHERE f.id = categories.id) || '-1')
  WHEN NOT EXISTS (
    SELECT 1 FROM categories c4
    WHERE c4.slug = ((SELECT expected_slug FROM _cat_slug_fix f WHERE f.id = categories.id) || '-2')
      AND c4.id != categories.id
  )
  THEN ((SELECT expected_slug FROM _cat_slug_fix f WHERE f.id = categories.id) || '-2')
  WHEN NOT EXISTS (
    SELECT 1 FROM categories c5
    WHERE c5.slug = ((SELECT expected_slug FROM _cat_slug_fix f WHERE f.id = categories.id) || '-3')
      AND c5.id != categories.id
  )
  THEN ((SELECT expected_slug FROM _cat_slug_fix f WHERE f.id = categories.id) || '-3')
  ELSE categories.slug
END
WHERE id IN (SELECT id FROM _cat_slug_fix WHERE current_slug != expected_slug)
  AND is_active = 1;

DROP TABLE _cat_slug_fix;

SELECT id, name, slug FROM categories WHERE is_active = 1 ORDER BY name;
