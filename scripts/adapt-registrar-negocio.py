#!/usr/bin/env python3
"""
Adaptar registrar-negocio.html desde en-santiago a HolaX (Venezuela).
Reemplaza:
  - en-santiago.pages.dev -> holax.com.ve
  - En Santiago -> HolaX
  - Santiago de Chile -> Venezuela
  - es_CL -> es_VE
  - CL-RM -> VE
  - -33.4489;-70.6693 -> 8.6;-66.0 (centro aproximado de Venezuela)
  - 32+ comunas urbanas incluyendo... -> 24 estados de Venezuela incluyendo...
  - comuna -> estado
  - RM -> VE
  - En Santiago.png -> Holax.png
"""
import re

FILE = '/home/z/my-project/repos/meridaunclick/registrar-negocio.html'

with open(FILE, encoding='utf-8') as f:
    content = f.read()

# Order matters: longest/most specific first
replacements = [
    # URLs
    ('https://en-santiago.pages.dev', 'https://holax.com.ve'),
    ('/images/En%20Santiago.png', '/images/Holax.png'),
    ('/images/En Santiago.png', '/images/Holax.png'),

    # Geo coordinates (centro Venezuela ~8.6, -66.0 — entre Barinas y Mérida)
    ('-33.4489;-70.6693', '8.6;-66.0'),
    ('-33.4489, -70.6693', '8.6, -66.0'),

    # Geo regions
    ('es_CL', 'es_VE'),
    ('CL-RM', 'VE'),
    ('geo.region" content="VE"', 'geo.region" content="VE"'),

    # Branding
    ('Santiago de Chile', 'Venezuela'),
    ('En Santiago', 'HolaX'),

    # Geo tags (after brand replace)
    ('<meta name="geo.placename" content="Venezuela">',
     '<meta name="geo.placename" content="Venezuela">'),

    # 32+ comunas -> 24 estados (con lista completa de Venezuela)
    ('Santiago de Chile y sus 32+ comunas urbanas incluyendo Maipú, Las Condes, Providencia, Pudahuel, Ñuñoa, Santiago Centro, La Florida, Puente Alto, San Miguel, Huechuraba, Vitacura, Lo Barnechea, La Reina, Macul, Peñalolén, La Granja, San Ramón, La Cisterna, El Bosque, Pedro Aguirre Cerda, Lo Espejo, Cerrillos, Estación Central, Quilicura, Renca, Cerro Navia, Lo Prado, Conchalí, Independencia, Recoleta, Providencia, Las Condes, Vitacura, Barnechea.',
     'Venezuela y sus 24 estados incluyendo Distrito Capital, Amazonas, Anzoátegui, Apure, Aragua, Barinas, Bolívar, Carabobo, Cojedes, Delta Amacuro, Falcón, Guárico, Lara, Mérida, Miranda, Monagas, Nueva Esparta, Portuguesa, Sucre, Táchira, Trujillo, Vargas, Yaracuy, Zulia.'),

    # comunas -> estados
    ('comuna', 'estado'),
    ('comunas', 'estados'),

    # RM -> VE (despues de otros cambios)
    ('RM', 'VE'),

    # Postal code ref
    ('RM, Chile', 'Venezuela'),
]

for old, new in replacements:
    content = content.replace(old, new)

with open(FILE, 'w', encoding='utf-8') as f:
    f.write(content)

# Verify
import subprocess
r = subprocess.run(['grep', '-c', 'en-santiago.pages.dev\\|Santiago de Chile\\|En Santiago', FILE],
                   capture_output=True, text=True)
print(f"Remaining refs (should be 0): {r.stdout.strip()}")
r = subprocess.run(['grep', '-c', 'HolaX\\|holax.com.ve\\|Venezuela', FILE],
                   capture_output=True, text=True)
print(f"New refs (should be >0): {r.stdout.strip()}")
