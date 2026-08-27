import sqlite3
import re

with open('/home/z/my-project/repos/en-santiago/scripts/fixes/fix-category-slugs.sql') as f:
    content = f.read()

def strip_sql_comments(text):
    out = []
    in_string = False
    i = 0
    while i < len(text):
        c = text[i]
        if c == "'":
            in_string = not in_string
            out.append(c)
        elif c == '-' and i+1 < len(text) and text[i+1] == '-' and not in_string:
            while i < len(text) and text[i] != '\n':
                i += 1
        else:
            out.append(c)
        i += 1
    return ''.join(out)

clean = strip_sql_comments(content)
match = re.search(r'(UPDATE _cat_slug_fix\s+SET expected_slug =\s+LOWER\(.+?\)\s*\);)', clean, re.DOTALL)
stmt = match.group(1)

flat = re.sub(r'\s+', ' ', stmt)
print("=== Statement aplanado ===")
print(flat)
print()

n_replace = len(re.findall(r'\bREPLACE\s*\(', flat))
n_lower = len(re.findall(r'\bLOWER\s*\(', flat))
n_open = flat.count('(')
n_close = flat.count(')')

print(f"REPLACE tokens: {n_replace}")
print(f"LOWER tokens: {n_lower}")
print(f"Total '(': {n_open}")
print(f"Total ')': {n_close}")

# Buscar todos los pares find/replace: 'X','Y')
pair_pattern = r"'[^']*'\s*,\s*'[^']*'\s*\)"
pairs = re.findall(pair_pattern, flat)
print(f"\nFind/replace pairs encontrados: {len(pairs)}")
for i, p in enumerate(pairs, 1):
    print(f"  {i}. {p}")

conn = sqlite3.connect(':memory:')
conn.executescript("CREATE TABLE _cat_slug_fix (expected_slug TEXT); INSERT INTO _cat_slug_fix VALUES ('test');")
try:
    conn.execute(stmt)
    conn.commit()
    r = conn.execute("SELECT expected_slug FROM _cat_slug_fix").fetchone()
    print(f"\nRESULTADO: {r[0]!r}")
except Exception as e:
    print(f"\nERROR: {e}")
