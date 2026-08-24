#!/usr/bin/env python3
"""Test funcional del script de migración D1 usando sqlite3 nativo de Python."""
import sqlite3
import os
import re

DB_PATH = '/tmp/d1-test/test.db'
SQL_PATH = '/home/z/my-project/repos/en-santiago/scripts/fixes/fix-category-slugs.sql'

# Re-esquematizar desde cero
if os.path.exists(DB_PATH):
    os.remove(DB_PATH)

conn = sqlite3.connect(DB_PATH)
conn.executescript('''
CREATE TABLE categories (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  icon TEXT,
  color TEXT,
  sort_order INTEGER DEFAULT 99,
  is_active INTEGER DEFAULT 1,
  banner_url TEXT,
  tipo_negocio_id INTEGER,
  created_at TEXT DEFAULT (datetime('now')),
  updated_at TEXT DEFAULT (datetime('now'))
);

INSERT INTO categories (id, name, slug, is_active, sort_order) VALUES
  (1, 'Tapizados de Volantes', 'tapizados-de-volantes', 1, 5),
  (2, 'Mecánica Automotriz', 'mecanica-automotriz', 1, 3),
  (3, 'Taller Mecánico', 'taller-mecanico', 1, 4),
  (4, 'Restaurantes', 'restaurantes', 1, 1),
  (5, 'Café & Bar', 'cafe-bar', 1, 2),
  (6, 'Mecánica', 'mecanica', 1, 6),
  (7, 'Tapizar IA', 'tapizados-de-volantes-x', 1, 7),
  (8, 'Categoría Inactiva', 'inactiva', 0, 99);
''')
conn.commit()

print('=== ANTES de la migración ===')
print(f'{"ID":>3} {"NAME":<30} {"SLUG":<35}')
for row in conn.execute('SELECT id, name, slug FROM categories ORDER BY name'):
    print(f'{row[0]:>3} {row[1]:<30} {row[2]:<35}')

# Cargar y ejecutar el SQL
with open(SQL_PATH, 'r') as f:
    sql = f.read()

# Separar en statements (sqlite3.executescript soporta múltiples separados por ;)
try:
    conn.executescript(sql)
    conn.commit()
    print('\n=== Migración ejecutada sin errores ===\n')
except Exception as e:
    print(f'\n*** ERROR en migración: {e}')
    raise

print('=== DESPUÉS de la migración ===')
print(f'{"ID":>3} {"NAME":<30} {"SLUG":<35}')
for row in conn.execute('SELECT id, name, slug FROM categories WHERE is_active=1 ORDER BY name'):
    print(f'{row[0]:>3} {row[1]:<30} {row[2]:<35}')

# Validaciones
print('\n=== Validaciones ===')
failures = []

# 1. Todas las categorías activas deben tener slug consistente con slugify(name)
def expected_slug(name):
    s = name.lower()
    # Replace acentos
    for a, b in [('á','a'),('é','e'),('í','i'),('ó','o'),('ú','u'),('ñ','n'),('Á','a'),('É','e'),('Í','i'),('Ó','o'),('Ú','u'),('Ñ','n'),('ü','u'),('Ü','u')]:
        s = s.replace(a, b)
    # Replace chars especiales (igual que el SQL)
    for a, b in [(' ', '-'), ('&', 'y'), ('.', ''), (',', ''), (';', ''), (':', ''),
                 ('(', '-'), (')', '-'), ('"', ''), ("'", ''), ('¡', ''), ('¿', ''),
                 ('!', ''), ('?', ''), ('/', '-'), ('\\', '-'), ('@', '-at-'), ('#', ''),
                 ('--', '-')]:
        s = s.replace(a, b)
    s = s.strip('-')
    return s[:80]

for row in conn.execute('SELECT id, name, slug FROM categories WHERE is_active=1'):
    id_, name, slug = row
    expected = expected_slug(name)
    # El slug actual debe ser O el esperado O el esperado con sufijo -N
    if slug == expected:
        print(f'  ✓ cat {id_} "{name}" → slug "{slug}" (consistente)')
    elif re.match(rf'^{re.escape(expected)}-\d+$', slug):
        print(f'  ✓ cat {id_} "{name}" → slug "{slug}" (sufijo por colisión)')
    else:
        print(f'  ✗ cat {id_} "{name}" → slug "{slug}" (esperado "{expected}" o "{expected}-N")')
        failures.append(f'cat {id_} slug inconsistente')

# 2. No debe haber slugs duplicados
dup = conn.execute('SELECT slug, COUNT(*) as n FROM categories WHERE is_active=1 GROUP BY slug HAVING n > 1').fetchall()
if dup:
    print(f'  ✗ Slugs duplicados: {dup}')
    failures.append('slugs duplicados')
else:
    print('  ✓ No hay slugs duplicados')

# 3. La categoría inactiva (id=8) no debe haberse modificado
inactiva = conn.execute('SELECT slug FROM categories WHERE id=8').fetchone()
if inactiva[0] == 'inactiva':
    print('  ✓ Categoría inactiva NO fue modificada')
else:
    print(f'  ✗ Categoría inactiva fue modificada: {inactiva[0]}')
    failures.append('categoría inactiva modificada')

# 4. Caso Tapizar IA: debe quedar como 'tapizar-ia' (no como 'tapizados-de-volantes-x')
t = conn.execute('SELECT slug FROM categories WHERE name="Tapizar IA"').fetchone()
if t[0] == 'tapizar-ia':
    print('  ✓ Tapizar IA → slug "tapizar-ia" (consistente)')
else:
    print(f'  ✗ Tapizar IA → slug "{t[0]}" (esperado "tapizar-ia")')
    failures.append('Tapizar IA no quedó consistente')

print()
if failures:
    print(f'❌ FALLÓ: {failures}')
    exit(1)
else:
    print('✅ TODAS LAS VALIDACIONES PASARON')
    exit(0)
