#!/usr/bin/env python3
"""
Agregar descripciones de 200-300 caracteres a cada categoria de keywords
en todas las paginas HTML del sitio Car Audio Pro.
"""
import os, re

REPO = '/home/z/my-project/repos/car-audio-pro'

# Descripciones por categoria (200-300 caracteres cada una)
DESCRIPTIONS = {
    'Sonido y Car Audio General': 'Instalamos y mejoramos sistemas de sonido vehicular con servicio a domicilio en Santiago. Parlantes, amplificadores, bajos y cableado profesional con resultados de calidad auditiva superior. Vamos directo a tu casa en toda la Región Metropolitana sin que muevas tu vehículo del garage.',
    'Calibración, Ecualización y Procesadores': 'Logramos sonido nítido y sin distorsión usando procesadores DSP y crossovers de alta precisión. Ajustamos frecuencias, tiempos de llegada y fases para que cada parlante reproduzca exactamente lo que debe. Tu música sonará como en un auditorio profesional dentro de tu auto.',
    'Pantallas y Cámaras de Retroceso': 'Instalamos pantallas Android táctiles de 9 a 11 pulgadas con Google Maps, Spotify y YouTube. Cámaras de retroceso con visión nocturna, líneas guía dinámicas y activación automática al poner reversa. Todo con cableado prolijo y sin cables visibles, servicio a domicilio en Santiago.',
    'Seguridad Vehicular (Alarmas y GPS)': 'Protegemos tu vehículo con alarmas de doble impacto, cortacorrientes que bloquean el arranque, y GPS satelital para rastrear tu auto en tiempo real desde el celular. Instalación profesional a domicilio en toda la Región Metropolitana de Santiago con garantía incluida en todos los sistemas.',
    'Componentes, Reparación y Trabajos Especiales': 'Reparamos amplificadores y plantas de sonido con diagnóstico electrónico preciso. Fabricamos cajones acústicos a medida calculados para tu subwoofer. Instalamos tweeters, componentes y subwoofers con cableado profesional oxygen-free. Servicio técnico especializado a domicilio en Santiago de Chile.',
}

# Insertar descripción después de cada H3 de categoría
def add_descriptions(content):
    for category, desc in DESCRIPTIONS.items():
        # Buscar el H3 y agregar párrafo después
        old = f'<h3 style="font-size:1.2rem;color:#005192;margin:24px 0 12px;">{category}</h3>'
        new = f'<h3 style="font-size:1.2rem;color:#005192;margin:24px 0 8px;">{category}</h3>\n        <p style="color:#999;font-size:0.85rem;line-height:1.6;margin:0 0 12px;max-width:800px;">{desc}</p>'
        if old in content:
            content = content.replace(old, new)
    return content

# Procesar todos los HTML
count = 0
for root, dirs, files in os.walk(REPO):
    for fname in files:
        if not fname.endswith('.html'):
            continue
        fpath = os.path.join(root, fname)
        with open(fpath, 'r', encoding='utf-8') as f:
            content = f.read()

        if 'Sonido y Car Audio General' not in content:
            continue

        new_content = add_descriptions(content)
        if new_content != content:
            with open(fpath, 'w', encoding='utf-8') as f:
                f.write(new_content)
            count += 1
            rel = os.path.relpath(fpath, REPO)
            print(f'  ✓ {rel}')

print(f'\nTotal: {count} archivos actualizados')
