-- ──────────────────────────────────────────────────────────────────────────
-- FIX D1 (via REST API): Recalcular slugs en una sola query UPDATE.
-- ──────────────────────────────────────────────────────────────────────────
-- Cada categoría recibe slug = slugify(name) con sufijo -1, -2, -3 si colisiona.
-- Idempotente: solo cambia filas donde current_slug != expected_slug.

UPDATE categories
SET slug = (
  WITH normalized AS (
    SELECT
      id,
      LOWER(
        REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(
          REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(
            name,
            'á','a'), 'é','e'), 'í','i'), 'ó','o'), 'ú','u'),
            'ñ','n'),
            'Á','a'), 'É','e'), 'Í','i'), 'Ó','o'),
            'Ú','u'), 'Ñ','n'),
            'ü','u'), 'Ü','u'),
            ' ','-'),
            '/',''),
            '.','')
      ) AS expected_slug
    FROM categories WHERE is_active = 1
  ),
  final AS (
    SELECT
      n.id,
      n.expected_slug,
      CASE
        WHEN NOT EXISTS (
          SELECT 1 FROM categories c2
          WHERE c2.slug = n.expected_slug AND c2.id != n.id
        ) THEN n.expected_slug
        WHEN NOT EXISTS (
          SELECT 1 FROM categories c3
          WHERE c3.slug = (n.expected_slug || '-1') AND c3.id != n.id
        ) THEN n.expected_slug || '-1'
        WHEN NOT EXISTS (
          SELECT 1 FROM categories c4
          WHERE c4.slug = (n.expected_slug || '-2') AND c4.id != n.id
        ) THEN n.expected_slug || '-2'
        WHEN NOT EXISTS (
          SELECT 1 FROM categories c5
          WHERE c5.slug = (n.expected_slug || '-3') AND c5.id != n.id
        ) THEN n.expected_slug || '-3'
        ELSE n.expected_slug || '-x'
      END AS new_slug
    FROM normalized n
  )
  SELECT f.new_slug FROM final f WHERE f.id = categories.id
)
WHERE id IN (
  SELECT c.id FROM categories c
  JOIN (
    SELECT id, LOWER(
        REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(
          REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(
            name,
            'á','a'), 'é','e'), 'í','i'), 'ó','o'), 'ú','u'),
            'ñ','n'),
            'Á','a'), 'É','e'), 'Í','i'), 'Ó','o'),
            'Ú','u'), 'Ñ','n'),
            'ü','u'), 'Ü','u'),
            ' ','-'),
            '/',''),
            '.','')
        ) AS expected_slug
    FROM categories WHERE is_active = 1
  ) e ON c.id = e.id
  WHERE c.slug != e.expected_slug AND c.is_active = 1
);
