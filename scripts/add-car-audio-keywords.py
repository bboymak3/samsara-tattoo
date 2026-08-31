#!/usr/bin/env python3
"""
Agregar 50 palabras clave SEO en todas las landings de servicios y comunas.
Las keywords se insertan como contenido natural en secciones dedicadas.
"""
import os, re

REPO = '/home/z/my-project/repos/car-audio-pro'

KEYWORDS = [
    'Car audio a domicilio en Santiago',
    'Instalación de sonido para autos a domicilio',
    'Car audio Santiago',
    'Instalador de car audio a domicilio',
    'Equipos de sonido para autos Santiago',
    'Sonido para autos a domicilio',
    'Instalación de audio para vehículos',
    'Taller de car audio a domicilio',
    'Montaje de sonido para autos',
    'Mejorar sonido de auto en Santiago',
    'Ecualización de audio para autos',
    'Calibración de car audio a domicilio',
    'Calibración de procesadores de audio para autos',
    'Ajuste de crossovers para autos',
    'Ecualizar sonido de auto en Santiago',
    'Calibrar amplificadores de auto',
    'Configuración de DSP para autos',
    'Eliminar distorsión de audio en autos',
    'Ajuste de frecuencias para car audio',
    'Sonido nítido para autos a domicilio',
    'Instalación de pantallas para autos a domicilio',
    'Instalación de cámaras de retroceso en Santiago',
    'Pantallas Android para autos a domicilio',
    'Conectar cámara de retroceso a radio',
    'Instalación de radios táctiles para autos',
    'Poner pantalla a vehículo a domicilio',
    'Cámara trasera para auto instalación',
    'Instalador de pantallas Android Santiago',
    'Radio con pantalla y cámara de retroceso',
    'Servicio de instalación de pantallas en Santiago',
    'Instalación de alarmas para autos a domicilio',
    'Instalación de GPS para autos en Santiago',
    'Cortacorrientes para autos a domicilio',
    'Seguridad automotriz a domicilio Santiago',
    'Instalar alarma a auto a domicilio',
    'Técnico de alarmas vehiculares en Santiago',
    'Instalador de GPS satelital a domicilio',
    'Bloqueo de motor y corta corriente Santiago',
    'Sistema antirobo para autos a domicilio',
    'Alarma vehicular instalación a domicilio',
    'Reparación de plantas de sonido para autos',
    'Reparación de amplificadores de audio automotriz',
    'Fabricación de cajones acústicos a medida',
    'Cableado para car audio a domicilio',
    'Instalación de amplificador y bajo en auto',
    'Conexión de subwoofers para autos a domicilio',
    'Arreglo de plantas de sonido en Santiago',
    'Instalación de componentes y tweeters para autos',
    'Tendido de cableado de audio vehicular',
    'Servicio técnico de car audio a domicilio en Santiago',
]

# Sección HTML con todas las keywords como lista natural
KEYWORDS_SECTION = '''
    <section style="padding:60px 20px;background:#080808;">
      <div style="max-width:900px;margin:0 auto;">
        <h2 style="font-size:1.8rem;margin-bottom:16px;">Servicios de Car Audio en Santiago</h2>
        <p style="color:#999;line-height:1.8;margin-bottom:24px;">En Car Audio Pro ofrecemos el servicio más completo de sonido vehicular, multimedia y seguridad automotriz con servicio a domicilio en Santiago. Estas son algunas de las búsquedas más comunes que atendemos en la Región Metropolitana:</p>

        <h3 style="font-size:1.2rem;color:#00e676;margin:24px 0 12px;">Sonido y Car Audio General</h3>
        <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:8px;">
''' + '\n'.join(f'          <div style="background:#141414;border:1px solid #222;border-radius:8px;padding:10px;font-size:0.85rem;color:#999;"><i class="fas fa-check" style="color:#00e676;margin-right:6px;font-size:0.7rem;"></i>{k}</div>' for k in KEYWORDS[:10]) + '''
        </div>

        <h3 style="font-size:1.2rem;color:#00e676;margin:24px 0 12px;">Calibración, Ecualización y Procesadores</h3>
        <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:8px;">
''' + '\n'.join(f'          <div style="background:#141414;border:1px solid #222;border-radius:8px;padding:10px;font-size:0.85rem;color:#999;"><i class="fas fa-check" style="color:#00e676;margin-right:6px;font-size:0.7rem;"></i>{k}</div>' for k in KEYWORDS[10:20]) + '''
        </div>

        <h3 style="font-size:1.2rem;color:#00e676;margin:24px 0 12px;">Pantallas y Cámaras de Retroceso</h3>
        <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:8px;">
''' + '\n'.join(f'          <div style="background:#141414;border:1px solid #222;border-radius:8px;padding:10px;font-size:0.85rem;color:#999;"><i class="fas fa-check" style="color:#00e676;margin-right:6px;font-size:0.7rem;"></i>{k}</div>' for k in KEYWORDS[20:30]) + '''
        </div>

        <h3 style="font-size:1.2rem;color:#00e676;margin:24px 0 12px;">Seguridad Vehicular (Alarmas y GPS)</h3>
        <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:8px;">
''' + '\n'.join(f'          <div style="background:#141414;border:1px solid #222;border-radius:8px;padding:10px;font-size:0.85rem;color:#999;"><i class="fas fa-check" style="color:#00e676;margin-right:6px;font-size:0.7rem;"></i>{k}</div>' for k in KEYWORDS[30:40]) + '''
        </div>

        <h3 style="font-size:1.2rem;color:#00e676;margin:24px 0 12px;">Componentes, Reparación y Trabajos Especiales</h3>
        <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:8px;">
''' + '\n'.join(f'          <div style="background:#141414;border:1px solid #222;border-radius:8px;padding:10px;font-size:0.85rem;color:#999;"><i class="fas fa-check" style="color:#00e676;margin-right:6px;font-size:0.7rem;"></i>{k}</div>' for k in KEYWORDS[40:]) + '''
        </div>
      </div>
    </section>
'''

# === Insertar en index.html ===
print('=== Actualizando index.html ===')
with open(f'{REPO}/index.html', 'r') as f:
    content = f.read()

# Insertar antes del footer
if 'Servicios de Car Audio en Santiago' not in content:
    content = content.replace('</footer>', KEYWORDS_SECTION + '\n  </footer>' if '</footer>' in content else KEYWORDS_SECTION + content[content.rfind('<footer'):])
    with open(f'{REPO}/index.html', 'w') as f:
        f.write(content)
    print('  ✓ index.html actualizado')
else:
    print('  - index.html ya tenía las keywords')

# === Insertar en servicios ===
print('\n=== Actualizando 8 landings de servicios ===')
for fname in os.listdir(f'{REPO}/services'):
    if not fname.endswith('.html'):
        continue
    fpath = f'{REPO}/services/{fname}'
    with open(fpath, 'r') as f:
        content = f.read()

    if 'Servicios de Car Audio en Santiago' in content:
        print(f'  - {fname} ya tenía las keywords')
        continue

    # Insertar antes del footer
    footer_pos = content.rfind('<footer')
    if footer_pos > 0:
        content = content[:footer_pos] + KEYWORDS_SECTION + '\n' + content[footer_pos:]
        with open(fpath, 'w') as f:
            f.write(content)
        print(f'  ✓ {fname}')

# === Insertar en comunas ===
print(f'\n=== Actualizando landings de comunas ===')
count = 0
for fname in os.listdir(f'{REPO}/comunas'):
    if not fname.endswith('.html'):
        continue
    fpath = f'{REPO}/comunas/{fname}'
    with open(fpath, 'r') as f:
        content = f.read()

    if 'Servicios de Car Audio en Santiago' in content:
        continue

    footer_pos = content.rfind('<footer')
    if footer_pos > 0:
        content = content[:footer_pos] + KEYWORDS_SECTION + '\n' + content[footer_pos:]
        with open(fpath, 'w') as f:
            f.write(content)
        count += 1

print(f'  ✓ {count} comunas actualizadas')

# === Insertar en páginas estáticas ===
print('\n=== Actualizando páginas estáticas ===')
for fname in ['quienes-somos.html', 'faq.html', 'contacto.html', 'politica-garantia.html']:
    fpath = f'{REPO}/{fname}'
    if not os.path.exists(fpath):
        continue
    with open(fpath, 'r') as f:
        content = f.read()

    if 'Servicios de Car Audio en Santiago' in content:
        print(f'  - {fname} ya tenía las keywords')
        continue

    footer_pos = content.rfind('<footer')
    if footer_pos > 0:
        content = content[:footer_pos] + KEYWORDS_SECTION + '\n' + content[footer_pos:]
        with open(fpath, 'w') as f:
            f.write(content)
        print(f'  ✓ {fname}')

print('\n=== DONE ===')
print(f'Total keywords insertadas: {len(KEYWORDS)} por página')
