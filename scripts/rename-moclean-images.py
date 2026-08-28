#!/usr/bin/env python3
"""
Renombrar imagenes de public/images/:
- Quitar el patron " (N)" -> "limpieza-a-domicilio-en (1).jpeg" -> "limpieza-a-domicilio-en.jpeg"
- Qitar espacios
- Agregar sufijo "-comuna-de-santiago-de-chile" antes de la extension
- Resultado: "limpieza-a-domicilio-en-comuna-de-santiago-de-chile.jpeg"
"""
import os
import re

DIR = '/home/z/my-project/repos/moclean/public/images'

def clean_filename(name):
    # Quitar el patron " (N)" o "(N)" al final del nombre (antes de la extension)
    base, ext = os.path.splitext(name)
    # Remover "( N )" o "(N)" o " ( N ) " en cualquier parte del nombre
    base = re.sub(r'\s*\(\s*\d+\s*\)\s*', '', base)
    # Quitar espacios
    base = base.replace(' ', '')
    # Agregar sufijo
    base = base + '-comuna-de-santiago-de-chile'
    return base + ext.lower()

os.chdir(DIR)
print('=== Renombrando imagenes ===')
renames = []
for fname in sorted(os.listdir('.')):
    if not os.path.isfile(fname):
        continue
    new_fname = clean_filename(fname)
    if new_fname != fname:
        if os.path.exists(new_fname):
            # Si ya existe (puede pasar con duplicados), agregarle -2, -3
            i = 2
            base, ext = os.path.splitext(new_fname)
            while os.path.exists(f'{base}-{i}{ext}'):
                i += 1
            new_fname = f'{base}-{i}{ext}'
        os.rename(fname, new_fname)
        renames.append((fname, new_fname))
        print(f'  {fname}')
        print(f'    -> {new_fname}')

print(f'\nTotal renombradas: {len(renames)}')
print('\n=== Lista final ===')
for f in sorted(os.listdir('.')):
    if os.path.isfile(f):
        print(f'  {f}')
