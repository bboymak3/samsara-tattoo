#!/usr/bin/env python3
"""
Actualizar URLs de imagenes en .vercel/output/static/_worker.js/index.js
que es el archivo que Cloudflare Pages realmente ejecuta para servir el sitio
Next.js (SSR con @cloudflare/next-on-pages).

El worker tiene las URLs hardcoded en el codigo JavaScript generado por el
build de Next.js. Hay que actualizar todas las URLs viejas (con espacios
y acentos) por las nuevas (limpias).
"""
import os
import re
import urllib.parse

WORKER_FILE = '/home/z/my-project/repos/inversiones-valencia-mundo-net/.vercel/output/static/_worker.js/index.js'

# Mapeo: URL-encoded viejo -> nombre limpio nuevo
MAPPINGS = [
    # (URL-encoded viejo, nombre limpio nuevo)
    ('instalacion-de-camaras-de-seguridad-en-barinas-mundonet%20-calencia.jpeg',
     'instalacion-de-camaras-de-seguridad-en-barinas-mundonet-calencia.jpeg'),
    ('instalacion-de-camaras-de-seguridad-en-barinas-mundonet%20-crear-app.jpeg',
     'instalacion-de-camaras-de-seguridad-en-barinas-mundonet-crear-app.jpeg'),
    ('instalacion-de-camaras-de-seguridad-en-barinas-mundonet%20-dose%C3%B1o%20de%20aplicaciones.jpeg',
     'instalacion-de-camaras-de-seguridad-en-barinas-mundonet-dosenodeaplicaciones.jpeg'),
    ('instalacion-de-camaras-de-seguridad-en-barinas-mundonet%20-la-luz-santa-lucia.jpeg',
     'instalacion-de-camaras-de-seguridad-en-barinas-mundonet-la-luz-santa-lucia.jpeg'),
    ('instalacion-de-camaras-de-seguridad-en-barinas-mundonet%20-merida-san%20cristobal.jpeg',
     'instalacion-de-camaras-de-seguridad-en-barinas-mundonet-merida-sancristobal.jpeg'),
    ('instalacion-de-camaras-de-seguridad-en-barinas-mundonet%20-valencia.jpeg',
     'instalacion-de-camaras-de-seguridad-en-barinas-mundonet-valencia.jpeg'),
    ('instalacion-de-camaras-de-seguridad-en-barinas-mundonet-%20libertad-canagua.jpeg',
     'instalacion-de-camaras-de-seguridad-en-barinas-mundonet-libertad-canagua.jpeg'),
    ('instalacion-de-camaras-de-seguridad-en-barinas-mundonet-canagua-santa-rosa%20.jpeg',
     'instalacion-de-camaras-de-seguridad-en-barinas-mundonet-canagua-santa-rosa.jpeg'),
    ('instalacion-de-camaras-de-seguridad-en-barinas-mundonet-guanare-socopo-santabarbara%20.jpeg',
     'instalacion-de-camaras-de-seguridad-en-barinas-mundonet-guanare-socopo-santabarbara.jpeg'),
    ('instalacion-de-camaras-de-seguridad-en-barinas-mundonet-pedraza-socopo%20.jpeg',
     'instalacion-de-camaras-de-seguridad-en-barinas-mundonet-pedraza-socopo.jpeg'),

    # Tambien version sin URL-encode (con espacios literales en JS strings)
    ('instalacion-de-camaras-de-seguridad-en-barinas-mundonet -calencia.jpeg',
     'instalacion-de-camaras-de-seguridad-en-barinas-mundonet-calencia.jpeg'),
    ('instalacion-de-camaras-de-seguridad-en-barinas-mundonet -crear-app.jpeg',
     'instalacion-de-camaras-de-seguridad-en-barinas-mundonet-crear-app.jpeg'),
    # Note: ñ in JS file may appear as \xF1 (escape sequence) or actual UTF-8 char
    ('instalacion-de-camaras-de-seguridad-en-barinas-mundonet -dose\\xF1o de aplicaciones.jpeg',
     'instalacion-de-camaras-de-seguridad-en-barinas-mundonet-dosenodeaplicaciones.jpeg'),
    ('instalacion-de-camaras-de-seguridad-en-barinas-mundonet -doseño de aplicaciones.jpeg',
     'instalacion-de-camaras-de-seguridad-en-barinas-mundonet-dosenodeaplicaciones.jpeg'),
    ('instalacion-de-camaras-de-seguridad-en-barinas-mundonet -la-luz-santa-lucia.jpeg',
     'instalacion-de-camaras-de-seguridad-en-barinas-mundonet-la-luz-santa-lucia.jpeg'),
    ('instalacion-de-camaras-de-seguridad-en-barinas-mundonet -merida-san cristobal.jpeg',
     'instalacion-de-camaras-de-seguridad-en-barinas-mundonet-merida-sancristobal.jpeg'),
    ('instalacion-de-camaras-de-seguridad-en-barinas-mundonet -valencia.jpeg',
     'instalacion-de-camaras-de-seguridad-en-barinas-mundonet-valencia.jpeg'),
    ('instalacion-de-camaras-de-seguridad-en-barinas-mundonet- libertad-canagua.jpeg',
     'instalacion-de-camaras-de-seguridad-en-barinas-mundonet-libertad-canagua.jpeg'),
    ('instalacion-de-camaras-de-seguridad-en-barinas-mundonet-canagua-santa-rosa .jpeg',
     'instalacion-de-camaras-de-seguridad-en-barinas-mundonet-canagua-santa-rosa.jpeg'),
    ('instalacion-de-camaras-de-seguridad-en-barinas-mundonet-guanare-socopo-santabarbara .jpeg',
     'instalacion-de-camaras-de-seguridad-en-barinas-mundonet-guanare-socopo-santabarbara.jpeg'),
    ('instalacion-de-camaras-de-seguridad-en-barinas-mundonet-pedraza-socopo .jpeg',
     'instalacion-de-camaras-de-seguridad-en-barinas-mundonet-pedraza-socopo.jpeg'),
]

with open(WORKER_FILE, encoding='utf-8') as f:
    content = f.read()

original_size = len(content)
changes = 0
for old, new in MAPPINGS:
    if old in content:
        count = content.count(old)
        content = content.replace(old, new)
        print(f'  Replaced {count}x: {old[:60]}... -> {new[:60]}...')
        changes += count

if changes > 0:
    with open(WORKER_FILE, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f'\nTotal cambios: {changes}')
    print(f'Tamano archivo: {original_size} -> {len(content)} bytes')
else:
    print('No se encontraron coincidencias.')

# Verificar
print('\n=== Verificacion ===')
with open(WORKER_FILE, encoding='utf-8') as f:
    c = f.read()
remaining = re.findall(r'instalacion-de-camaras-de-seguridad-en-barinas-mundonet[^"\'\\]*', c)
print(f'URLs restantes con espacios (%20): {sum(1 for r in remaining if "%20" in r or " " in r)}')
print(f'URLs limpias totales: {sum(1 for r in remaining if "%20" not in r and " " not in r)}')
