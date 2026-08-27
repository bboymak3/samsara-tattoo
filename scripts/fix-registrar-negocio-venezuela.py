#!/usr/bin/env python3
"""
Adaptacion completa de registrar-negocio.html a Venezuela.
El script anterior fue incompleto: solo cambio 'comuna' por 'estado' pero
dejo intactas las listas de comunas de Santiago (Maipu, Las Condes, etc.),
la Region Metropolitana, Chile, ensantiago.cl, etc.

Este script hace una adaptacion exhaustiva con listas completas de Venezuela.
"""
import re

FILE = '/home/z/my-project/repos/meridaunclick/registrar-negocio.html'

with open(FILE, encoding='utf-8') as f:
    content = f.read()

# Lista completa de las 24 estados de Venezuela (capital + nombre corto)
ESTADOS_VENEZUELA = [
    'Distrito Capital', 'Amazonas', 'Anzoátegui', 'Apure', 'Aragua', 'Barinas',
    'Bolívar', 'Carabobo', 'Cojedes', 'Delta Amacuro', 'Falcón', 'Guárico',
    'Lara', 'Mérida', 'Miranda', 'Monagas', 'Nueva Esparta', 'Portuguesa',
    'Sucre', 'Táchira', 'Trujillo', 'Vargas', 'Yaracuy', 'Zulia'
]

# Ciudades principales de Venezuela (capital de cada estado + ciudades importantes)
CIUDADES_VENEZUELA = [
    'Caracas', 'Maracaibo', 'Valencia', 'Barquisimeto', 'Ciudad Guayana',
    'Maracay', 'Barinas', 'Mérida', 'San Cristóbal', 'Ciudad Bolívar',
    'Maturín', 'Puerto La Cruz', 'Punto Fijo', 'Coro', 'San Felipe',
    'La Asunción', 'Guanare', 'Cumaná', 'Trujillo', 'San Fernando',
    'Puerto Ayacucho', 'La Grita', 'Valera', 'Carúpano', 'Guarenas',
    'Guatire', 'Los Teques', 'Catia La Mar', 'Petare', 'El Tigre'
]

# Reemplazos especificos (orden importa: mas especificos primero)
replacements = [
    # Email de contacto (Chile -> Venezuela)
    ('contacto@ensantiago.cl', 'info@holax.com'),

    # Region Metropolitana
    ('Región Metropolitana de Santiago', 'Venezuela'),
    ('Región Metropolitana de Venezuela', 'Venezuela'),

    # Description keywords
    ('registrar negocio gratis Santiago, directorio empresas Venezuela, publicar negocio online, SEO local Santiago, Google Maps negocio, registro empresa VE, estado Santiago',
     'registrar negocio gratis Venezuela, directorio empresas Venezuela, publicar negocio online, SEO local Venezuela, Google Maps negocio, registro empresa VE'),

    # Twitter description
    ('Directorio metropolitano de negocios. Registro gratis con georreferenciación, WhatsApp y SEO local para 32+ estados de Santiago.',
     'Directorio nacional de negocios. Registro gratis con georreferenciación, WhatsApp y SEO local para 24 estados de Venezuela.'),

    # Stats
    ('<div class="stat-value">32+</div><div class="stat-label">Comunas</div>',
     '<div class="stat-value">24</div><div class="stat-label">Estados</div>'),

    # Step title
    ('<h3>Ingresar Datos NAP y Comuna</h3>', '<h3>Ingresar Datos NAP y Estado</h3>'),

    # Step description - menciona "estado de la Region Metropolitana"
    ('estado de la Región Metropolitana, categoría',
     'estado, categoría'),

    # "addressLocality": "Santiago" -> ciudad venezolana (dejarlo generico)
    ('"addressLocality": "Santiago"', '"addressLocality": "Caracas"'),

    # Lista de comunas en JSON-LD (Schema.org areaServed)
    ('Venezuela y sus 32+ estados urbanas incluyendo Maipú, Las Condes, Providencia, Pudahuel, Ñuñoa, Santiago Centro, La Florida, Puente Alto, San Miguel, Huechuraba, Vitacura, Lo Barnechea, La Reina, Macul, Peñalolén, La Granja, San Ramón, La Cisterna, El Bosque, Pedro Aguirre Cerda, Lo Espejo, Cerrillos, Estación Central, Quilicura, Renca, Cerro Navia, Lo Prado, Conchalí, Independencia, Recoleta, Providencia, Las Condes, Vitacura, Barnechea.',
     'Venezuela y sus 24 estados incluyendo Distrito Capital, Amazonas, Anzoátegui, Apure, Aragua, Barinas, Bolívar, Carabobo, Cojedes, Delta Amacuro, Falcón, Guárico, Lara, Mérida, Miranda, Monagas, Nueva Esparta, Portuguesa, Sucre, Táchira, Trujillo, Vargas, Yaracuy, Zulia.'),

    # Pais Chile -> Venezuela
    ('"name": "Chile"', '"name": "Venezuela"'),

    # FAQ: cubre todas las estados de la Region Metropolitana de Venezuela
    ('HolaX cubre todas las estados de la Región Metropolitana de Venezuela, incluyendo: Maipú, Las Condes, Providencia, Pudahuel, Ñuñoa, Santiago Centro, La Florida, Puente Alto, San Miguel, Huechuraba, Vitacura, Lo Barnechea, La Reina, Macul, Peñalolén, La Granja, San Ramón, La Cisterna, El Bosque, Pedro Aguirre Cerda, Lo Espejo, Cerrillos, Estación Central, Quilicura, Renca, Cerro Navia, Lo Prado, Conchalí, Independencia, Recoleta, Cerrillos y más. Cada estado tiene su propia página SEO optimizada para búsquedas locales.',
     'HolaX cubre todos los 24 estados de Venezuela, incluyendo: Distrito Capital (Caracas), Amazonas, Anzoátegui, Apure, Aragua, Barinas, Bolívar, Carabobo, Cojedes, Delta Amacuro, Falcón, Guárico, Lara, Mérida, Miranda, Monagas, Nueva Esparta, Portuguesa, Sucre, Táchira, Trujillo, Vargas, Yaracuy, Zulia. Cada estado tiene su propia página SEO optimizada para búsquedas locales.'),

    # Comentario CSS: "COMUNAS"
    ('/* COMUNAS */', '/* ESTADOS */'),

    # Cualquier otra mención de Santiago (case sensitive, no tocar "Venezuela")
    ('Santiago de Chile', 'Venezuela'),
    ('Santiago Centro', 'Caracas'),
    ('Santiago', 'Venezuela'),  # residual

    # Cualquier mención de Chile
    ('Chile', 'Venezuela'),

    # Comuna -> estado (sustantivo comun)
    ('comunas', 'estados'),
    ('comuna', 'estado'),

    # "32+ estados" -> "24 estados" (en cualquier sitio)
    ('32+ estados', '24 estados'),
    ('32+ estados de Venezuela', '24 estados de Venezuela'),

    # "Region Metropolitana" residual
    ('Región Metropolitana', 'Venezuela'),
    ('Region Metropolitana', 'Venezuela'),
]

for old, new in replacements:
    content = content.replace(old, new)

with open(FILE, 'w', encoding='utf-8') as f:
    f.write(content)

# Verificar
import subprocess
r = subprocess.run(['grep', '-ciE',
    'santiago|comuna|maipú|las condes|providencia|pudahuel|ñuñoa|puente alto|huechuraba|vitacura|lo barnechea|la reina|macul|peñalolén|la granja|san ramón|la cisterna|el bosque|pedro aguirre|lo espejo|cerrillos|estación central|quilicura|renca|cerro navia|lo prado|conchalí|independencia|recoleta|barnechea|chile|ensantiago\\.cl',
    FILE], capture_output=True, text=True)
print(f"Refs residuales (debe ser 0): {r.stdout.strip()}")

r = subprocess.run(['grep', '-c',
    'Venezuela|holax.com.ve|HolaX',
    FILE], capture_output=True, text=True)
print(f"Refs nuevas (debe ser >50): {r.stdout.strip()}")

# Verificar JSON-LD valido
r = subprocess.run(['python3', '-c',
    'import json,re; '
    f'c=open(\'{FILE}\').read(); '
    'blocks=re.findall(r\'<script type="application/ld\\+json">(.*?)</script>\', c, re.DOTALL); '
    '[print(f"Block {{i+1}}: VALID" if json.loads(b) else "INVALID") for i,b in enumerate(blocks)]'],
    capture_output=True, text=True, shell=False)
print(r.stdout)
