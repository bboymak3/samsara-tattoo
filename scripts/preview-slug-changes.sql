-- ──────────────────────────────────────────────────────────────────────────
-- FIX: Sincronizar slugs de categorias existentes con su nombre actual.
-- VARIANTE PARA D1 REST API: Sin tablas TEMP. Una sola query con CTE.
-- ──────────────────────────────────────────────────────────────────────────

-- Preview: ver qué slugs van a cambiar
WITH step1 AS (
  SELECT
    id, name,
    LOWER(
      REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(
        REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(
          name,
          'á','a'), 'é','e'), 'í','i'), 'ó','o'), 'ú','u'),
          'ñ','n'),
          'Á','a'), 'É','e'), 'Í','i'), 'Ó','o'),
          'Ú','u'), 'Ñ','n'),
          'ü','u'), 'Ü','u'),
          ' ','-')
    ) AS s
  FROM categories WHERE is_active = 1
),
step2 AS (
  -- Remover / . , ; : ( ) & @ # etc.
  SELECT id, name,
    REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(
      REPLACE(REPLACE(REPLACE(
        s,
        '/',''),
        '.',''),
        ',',''),
        ';',''),
        ':',''),
        '(',''),
        ')',''),
        '&',''),
        '@',''),
        '#',''),
        '"',''),
        '''',''),
        '!','')
  AS s
  FROM step1
),
step3 AS (
  -- Limpiar dobles guiones y trim
  SELECT id, name, LTRIM(RTRIM(REPLACE(s, '--', '-'), '-'), '-') AS expected_slug
  FROM step2
)
SELECT
  c.id, c.name, c.slug AS current_slug,
  s.expected_slug AS new_slug,
  CASE WHEN c.slug = s.expected_slug THEN 'OK' ELSE 'CAMBIA' END AS status
FROM categories c
JOIN step3 s ON c.id = s.id
ORDER BY c.name;
