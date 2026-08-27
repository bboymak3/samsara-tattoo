#!/usr/bin/env python3
"""
Renombrar imagenes en .vercel/output/static/camaras/ y actualizar URLs en
todos los HTML estaticos para que el deploy sea inmediato sin rebuild.

Cloudflare Pages sirve directamente .vercel/output/static/ para este proyecto
(es un build precompilado con @cloudflare/next-on-pages).
"""
import os
import re
import urllib.parse

REPO = '/home/z/my-project/repos/inversiones-valencia-mundo-net'
STATIC_DIR = f'{REPO}/.vercel/output/static'
CAMARAS_DIR = f'{STATIC_DIR}/camaras'

def clean_filename(name):
    name = name.replace('ñ', 'n').replace('Ñ', 'N')
    name = name.replace('á', 'a').replace('Á', 'A')
    name = name.replace('é', 'e').replace('É', 'E')
    name = name.replace('í', 'i').replace('Í', 'I')
    name = name.replace('ó', 'o').replace('Ó', 'O')
    name = name.replace('ú', 'u').replace('Ú', 'U')
    name = name.replace(' ', '')
    name = re.sub(r'-+', '-', name)
    return name

# 1. Renombrar archivos en .vercel/output/static/camaras/
print('=== Renombrando archivos en .vercel/output/static/camaras/ ===')
os.chdir(CAMARAS_DIR)
renames = []
for fname in os.listdir('.'):
    if not os.path.isfile(fname):
        continue
    new_fname = clean_filename(fname)
    if new_fname != fname:
        os.rename(fname, new_fname)
        old_encoded = urllib.parse.quote(fname)
        renames.append((old_encoded, new_fname))
        print(f'  {fname} -> {new_fname}')

print(f'\nTotal renombrados: {len(renames)}')

# 2. Buscar y reemplazar URLs en todos los .html y .js de .vercel/output/static/
print('\n=== Actualizando URLs en archivos estaticos ===')
total_changes = 0
for root, dirs, files in os.walk(STATIC_DIR):
    # Skip _next/static/chunks (son demasiado grandes y no cambian)
    for fname in files:
        if not (fname.endswith('.html') or fname.endswith('.js') or fname.endswith('.json')):
            continue
        fpath = os.path.join(root, fname)
        try:
            with open(fpath, encoding='utf-8') as f:
                content = f.read()
        except:
            continue
        original = content
        for old_encoded, new_fname in renames:
            old_url = f'/camaras/{old_encoded}'
            new_url = f'/camaras/{new_fname}'
            if old_url in content:
                content = content.replace(old_url, new_url)
        if content != original:
            with open(fpath, 'w', encoding='utf-8') as f:
                f.write(content)
            total_changes += 1
            rel_path = os.path.relpath(fpath, STATIC_DIR)
            print(f'  Updated: {rel_path}')

print(f'\nTotal archivos actualizados: {total_changes}')

# 3. Verificar que los src en index.html apuntan a archivos existentes
print('\n=== Verificacion index.html ===')
index_path = f'{STATIC_DIR}/index.html'
if os.path.exists(index_path):
    with open(index_path) as f:
        c = f.read()
    srcs = re.findall(r'src="(/camaras/[^"]+)"', c)
    srcs += re.findall(r'href="(/camaras/[^"]+)"', c)
    srcs += re.findall(r'</camaras/([^>]+)>', c)
    all_ok = True
    seen = set()
    for s in srcs:
        if s in seen:
            continue
        seen.add(s)
        fname = s.split('/camaras/')[-1] if '/camaras/' in s else s
        path = os.path.join(CAMARAS_DIR, urllib.parse.unquote(fname))
        status = 'OK' if os.path.exists(path) else 'MISSING'
        if status == 'MISSING':
            all_ok = False
        print(f'  {status}: {fname}')
    print(f'\nResultado: {"ALL OK" if all_ok else "ALGUNOS ARCHIVOS FALTAN"}')
