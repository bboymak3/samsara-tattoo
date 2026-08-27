#!/usr/bin/env python3
"""
Renombrar archivos de camaras/ quitando espacios y acentos.
Actualizar src/components/sections/camaras-gallery.tsx con las nuevas rutas.

Mapeo URL-encoded -> nombre limpio:
- '%20' (espacio) -> '' (eliminar)
- '%C3%B1o' (ñ) -> 'no'
- otros acentos -> ASCII
"""
import os
import re
import urllib.parse

REPO = '/home/z/my-project/repos/inversiones-valencia-mundo-net'
CAMARAS_DIR = f'{REPO}/camaras'
COMPONENT_FILE = f'{REPO}/src/components/sections/camaras-gallery.tsx'

def clean_filename(name):
    """Quitar espacios y acentos del nombre de archivo."""
    # Quitar acentos
    name = name.replace('ñ', 'n').replace('Ñ', 'N')
    name = name.replace('á', 'a').replace('Á', 'A')
    name = name.replace('é', 'e').replace('É', 'E')
    name = name.replace('í', 'i').replace('Í', 'I')
    name = name.replace('ó', 'o').replace('Ó', 'O')
    name = name.replace('ú', 'u').replace('Ú', 'U')
    # Quitar espacios
    name = name.replace(' ', '')
    # Colapsar dashes multiples
    name = re.sub(r'-+', '-', name)
    return name

# 1. Renombrar archivos
print('=== Renombrando archivos en camaras/ ===')
os.chdir(CAMARAS_DIR)

renames = []  # (old_path_encoded, new_path)
for fname in os.listdir('.'):
    if not os.path.isfile(fname):
        continue
    new_fname = clean_filename(fname)
    if new_fname != fname:
        # Renombrar via git mv para que quede tracked
        os.rename(fname, new_fname)
        # URL-encoded version of old name (como aparece en el .tsx)
        old_encoded = urllib.parse.quote(fname)
        renames.append((old_encoded, new_fname))
        print(f'  {fname}')
        print(f'    -> {new_fname}')
    else:
        # Ya limpio, no necesita renombrar pero si mapear
        old_encoded = urllib.parse.quote(fname)
        renames.append((old_encoded, new_fname))

print(f'\nTotal renombrados: {sum(1 for o,n in renames if o != n)}')

# 2. Actualizar el componente .tsx
print('\n=== Actualizando camaras-gallery.tsx ===')
with open(COMPONENT_FILE) as f:
    content = f.read()

# Para cada archivo (viejo encoded -> nuevo nombre), actualizar el src en el tsx
changes = 0
for old_encoded, new_fname in renames:
    # En el .tsx los src son como "/camaras/<encoded>"
    old_src = f'/camaras/{old_encoded}'
    new_src = f'/camaras/{new_fname}'
    if old_src in content:
        content = content.replace(old_src, new_src)
        changes += 1
        print(f'  Replaced: {old_src}')
        print(f'        -> {new_src}')

with open(COMPONENT_FILE, 'w') as f:
    f.write(content)
print(f'\nTotal cambios en .tsx: {changes}')

# 3. Verificar
print('\n=== Verificacion ===')
print('Archivos en camaras/:')
for f in sorted(os.listdir('.')):
    if os.path.isfile(f):
        print(f'  {f}')

print('\nSrcs en camaras-gallery.tsx:')
with open(COMPONENT_FILE) as f:
    c = f.read()
for src in re.findall(r'src:\s*"(/camaras/[^"]+)"', c):
    print(f'  {src}')

# Verificar que todos los src apuntan a archivos existentes
print('\nCheck files exist:')
all_ok = True
for src in re.findall(r'src:\s*"(/camaras/[^"]+)"', c):
    fname = src.replace('/camaras/', '')
    path = os.path.join(CAMARAS_DIR, fname)
    if not os.path.exists(path):
        print(f'  MISSING: {fname}')
        all_ok = False
    else:
        print(f'  OK: {fname}')

print(f'\nResultado: {"ALL OK" if all_ok else "ALGUNOS ARCHIVOS FALTAN"}')
