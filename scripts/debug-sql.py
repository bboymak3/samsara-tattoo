#!/usr/bin/env python3
"""Debug: ejecutar el SQL statement por statement."""
import sqlite3
import os

DB_PATH = '/tmp/d1-test/test.db'
SQL_PATH = '/home/z/my-project/repos/en-santiago/scripts/fixes/fix-category-slugs.sql'

if os.path.exists(DB_PATH):
    os.remove(DB_PATH)

conn = sqlite3.connect(DB_PATH)
conn.executescript('''
CREATE TABLE categories (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  icon TEXT, color TEXT,
  sort_order INTEGER DEFAULT 99,
  is_active INTEGER DEFAULT 1,
  banner_url TEXT, tipo_negocio_id INTEGER,
  created_at TEXT DEFAULT (datetime('now')),
  updated_at TEXT DEFAULT (datetime('now'))
);

INSERT INTO categories (id, name, slug, is_active, sort_order) VALUES
  (1, 'Tapizados de Volantes', 'tapizados-de-volantes', 1, 5),
  (5, 'Café & Bar', 'cafe-bar', 1, 2),
  (7, 'Tapizar IA', 'tapizados-de-volantes-x', 1, 7);
''')

with open(SQL_PATH, 'r') as f:
    sql = f.read()

# Split por ';' respetando strings (naive pero suficiente para debug)
# Solo mostrar los statements relevantes
print("=== Statements a ejecutar ===")
import re
# Quitar comentarios SQL (-- ...)
clean_sql = re.sub(r'--[^\n]*', '', sql)
stmts = [s.strip() for s in clean_sql.split(';') if s.strip()]
for i, s in enumerate(stmts):
    print(f'--- Statement {i+1} ---')
    print(s[:200] + ('...' if len(s) > 200 else ''))
    print()

# Ejecutar uno por uno para identificar el que falla
for i, s in enumerate(stmts):
    try:
        conn.execute(s)
        conn.commit()
        print(f'Statement {i+1}: OK')
    except Exception as e:
        print(f'Statement {i+1}: ERROR → {e}')
        print(f'  SQL: {s[:150]}')
        break

conn.close()
