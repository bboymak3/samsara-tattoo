#!/usr/bin/env python3
"""
Generar 7 landings de servicios + 54 landings de comunas para Car Audio Pro.
Cada landing tiene SEO local, Schema JSON-LD, contenido rico y CTA WhatsApp.
"""
import os
import re

REPO = '/home/z/my-project/repos/car-audio-pro'

SERVICES = [
    {
        'slug': 'car-audio-cableado',
        'title': 'Instalación de Car Audio y Cableado',
        'icon': 'fa-volume-up',
        'desc': 'Montaje de parlantes, componentes, bajos y tendido eléctrico profesional con servicio a domicilio en Santiago.',
        'body': 'La instalación de car audio profesional requiere conocimiento técnico, materiales de calidad y un cableado prolijo que garantice el mejor sonido sin interferencias. En Car Audio Pro realizamos instalaciones completas de sistemas de sonido vehicular directamente en tu domicilio en Santiago, sin que tengas que moverte de casa.',
    },
    {
        'slug': 'calibracion-ecualizacion',
        'title': 'Calibración y Ecualización Fina',
        'icon': 'fa-sliders-h',
        'desc': 'Ajuste de sonido con procesadores DSP y crossovers para máxima nitidez y potencia.',
        'body': 'La calibración y ecualización con procesadores de audio digitales (DSP) y crossovers es el secreto para lograr un sonido nítido, equilibrado y potente en tu vehículo. Ajustamos frecuencias, tiempos de llegada, fases y cortes para que cada parlante reproduzca exactamente lo que debe, eliminando distorsiones y maximizando la calidad sonora.',
    },
    {
        'slug': 'pantallas-radios-android',
        'title': 'Pantallas Multimedia y Radios Android',
        'icon': 'fa-tablet-alt',
        'desc': 'Montaje y configuración multimedia a medida para tu vehículo con servicio a domicilio.',
        'body': 'Las pantallas multimedia y radios Android transforman tu vehículo en un centro de entretenimiento completo. Instalamos pantallas táctiles de 9 a 11 pulgadas con Android integrado, soporte para Google Maps, Spotify, YouTube, Bluetooth, cámara de retroceso y más. Todo con servicio a domicilio en Santiago.',
    },
    {
        'slug': 'camaras-retroceso',
        'title': 'Cámaras de Retroceso',
        'icon': 'fa-camera-retro',
        'desc': 'Integración a pantalla para asistencia de estacionamiento con servicio a domicilio.',
        'body': 'Las cámaras de retroceso son una de las instalaciones más solicitadas para mejorar la seguridad al estacionar. Instalamos cámaras de alta resolución con visión nocturna, líneas guía dinámicas e integración directa a la pantalla de tu vehículo. Servicio a domicilio en toda la Región Metropolitana.',
    },
    {
        'slug': 'alarmas-gps-seguridad',
        'title': 'Alarmas, Cortacorrientes y GPS Satelital',
        'icon': 'fa-shield-alt',
        'desc': 'Seguridad automotriz completa con instalación profesional a domicilio en Santiago.',
        'body': 'La seguridad de tu vehículo es primordial. Instalamos alarmas con sensores de movimiento, cortacorrientes que impiden el arranque del motor sin autorización, y GPS satelital que te permite rastrear tu vehículo en tiempo real desde tu celular. Servicio a domicilio en Santiago con garantía.',
    },
    {
        'slug': 'reparacion-plantas-amplificadores',
        'title': 'Reparación de Plantas y Amplificadores',
        'icon': 'fa-tools',
        'desc': 'Diagnóstico y reparación de amplificadores de sonido con servicio a domicilio.',
        'body': 'La reparación de plantas amplificadoras requiere conocimiento técnico especializado en electrónica de audio. Diagnosticamos y reparamos amplificadores de todas las marcas y potencias, reemplazando transistores, capacitores, fuentes de alimentación y circuitos dañados. Servicio a domicilio en Santiago.',
    },
    {
        'slug': 'cajones-acusticos',
        'title': 'Fabricación de Cajones Acústicos',
        'icon': 'fa-box',
        'desc': 'Cajas a medida para subwoofers con acabado profesional.',
        'body': 'La fabricación de cajones acústicos a medida es un arte que combina acústica, carpintería y diseño. Construimos cajas selladas, porteadas y bandpass calculadas específicamente para el subwoofer que tienes, maximizando la respuesta de bajos y el impacto sonoro en tu vehículo.',
    },
    {
        'slug': 'cableado-profesional',
        'title': 'Cableado Profesional Completo',
        'icon': 'fa-bolt',
        'desc': 'Tendido eléctrico prolijo con materiales de primera calidad.',
        'body': 'El cableado profesional es la base de cualquier instalación de car audio de calidad. Realizamos el tendido eléctrico completo desde la batería hasta cada componente del sistema, usando cables de calibre adecuado, fusibles, relés y conectores de primera calidad. Todo con servicio a domicilio en Santiago.',
    },
]

COMUNAS = [
    'Providencia','Las Condes','Ñuñoa','Vitacura','La Reina','Lo Barnechea',
    'Santiago Centro','Recoleta','Independencia','Estación Central','Macul',
    'Peñalolén','La Florida','Puente Alto','Maipú','Pudahuel','Quilicura',
    'Huechuraba','Conchalí','Renca','Cerro Navia','Lo Prado','Cerrillos',
    'Lo Espejo','Pedro Aguirre Cerda','San Miguel','San Joaquín','La Cisterna',
    'La Granja','La Pintana','San Ramón','El Bosque','San Bernardo',
    'Calera de Tango','Buin','Paine','Colina','Lampa','Til Til','Melipilla',
    'Alhué','Curacaví','María Pinto','El Monte','Padre Hurtado','Peñaflor',
    'Isla de Maipo','San Pedro','San José de Maipo','Pirque','Quinta Normal',
    'Conchalí','La Cisterna'
]

def slugify(name):
    n = name.lower()
    n = n.replace('ñ','n').replace('á','a').replace('é','e').replace('í','i').replace('ó','o').replace('ú','u')
    n = re.sub(r'[^a-z0-9]+', '-', n).strip('-')
    return n

# === Generar landings de servicios ===
print('=== Generando 8 landings de servicios ===')
for svc in SERVICES:
    slug = svc['slug']
    title = svc['title']
    desc = svc['desc']
    body = svc['body']

    html = f'''<!DOCTYPE html>
<html lang="es-CL">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{title} - Servicio a Domicilio en Santiago | Car Audio Pro 🟢</title>
  <meta name="description" content="{desc} Servicio a domicilio en Santiago. Cotiza gratis por WhatsApp al +56945070308.">
  <meta name="keywords" content="{title.lower()}, car audio Santiago, servicio a domicilio, {slug.replace('-',' ')}">
  <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large">
  <link rel="canonical" href="https://car-audio-pro.pages.dev/services/{slug}.html">
  <meta property="og:type" content="website">
  <meta property="og:title" content="{title} - Servicio a Domicilio en Santiago | Car Audio Pro">
  <meta property="og:description" content="{desc}">
  <meta property="og:url" content="https://car-audio-pro.pages.dev/services/{slug}.html">
  <meta property="og:image" content="https://car-audio-pro.pages.dev/images/banner.jpg">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="{title} - Servicio a Domicilio en Santiago">
  <meta name="twitter:description" content="{desc}">
  <meta name="twitter:image" content="https://car-audio-pro.pages.dev/images/banner.jpg">
  <link rel="icon" type="image/svg+xml" href="/favicon.svg">
  <link rel="stylesheet" href="/css/styles.css">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
  <script type="application/ld+json">
  {{
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "{title}",
    "description": "{desc}",
    "provider": {{
      "@type": "AutoPartsStore",
      "name": "Car Audio Pro",
      "telephone": "+56945070308",
      "areaServed": "Región Metropolitana de Santiago de Chile"
    }},
    "areaServed": "Santiago de Chile"
  }}
  </script>
</head>
<body>
  <header class="navbar">
    <div class="nav-container">
      <a href="/" class="nav-logo"><span class="logo-icon">🟢</span><span class="logo-text">Car Audio Pro</span></a>
      <nav class="nav-menu">
        <a href="/">Inicio</a>
        <a href="/#servicios">Servicios</a>
        <a href="/#galeria">Galería</a>
        <a href="/#contacto">Contacto</a>
      </nav>
      <a href="https://wa.me/56945070308?text=Hola%2C%20quiero%20cotizar%20{slug.replace('-','%20')}" target="_blank" class="nav-whatsapp-btn"><i class="fab fa-whatsapp"></i> Cotizar</a>
    </div>
  </header>

  <main>
    <section style="padding:60px 20px;text-align:center;background:linear-gradient(135deg,#0a0a0a,#0d1f0d,#0a0a0a);">
      <a href="/#servicios" style="color:#999;font-size:0.9rem;">← Volver a servicios</a>
      <div style="font-size:3rem;color:#00e676;margin:20px 0;"><i class="fas {svc['icon']}"></i></div>
      <h1 style="font-size:2.2rem;font-weight:800;margin-bottom:12px;">{title}</h1>
      <p style="color:#00e676;font-size:1.1rem;margin-bottom:16px;">Servicio a Domicilio en Santiago</p>
      <p style="max-width:700px;margin:0 auto 24px;color:#999;">{desc}</p>
      <a href="https://wa.me/56945070308?text=Hola%2C%20quiero%20cotizar%20{slug.replace('-','%20')}" target="_blank" class="btn btn-whatsapp"><i class="fab fa-whatsapp"></i> Cotizar por WhatsApp</a>
    </section>

    <section style="padding:60px 20px;max-width:800px;margin:0 auto;">
      <h2 style="font-size:1.8rem;margin-bottom:20px;">Sobre el servicio</h2>
      <p style="color:#999;line-height:1.8;margin-bottom:24px;">{body}</p>
      <h2 style="font-size:1.8rem;margin-bottom:20px;">¿Qué incluye?</h2>
      <ul style="list-style:none;padding:0;">
        <li style="padding:12px;background:#141414;border-radius:10px;margin-bottom:8px;border:1px solid #222;"><i class="fas fa-check" style="color:#00e676;margin-right:8px;"></i> Visita a domicilio en toda la Región Metropolitana</li>
        <li style="padding:12px;background:#141414;border-radius:10px;margin-bottom:8px;border:1px solid #222;"><i class="fas fa-check" style="color:#00e676;margin-right:8px;"></i> Diagnóstico y cotización sin costo</li>
        <li style="padding:12px;background:#141414;border-radius:10px;margin-bottom:8px;border:1px solid #222;"><i class="fas fa-check" style="color:#00e676;margin-right:8px;"></i> Materiales de primera calidad</li>
        <li style="padding:12px;background:#141414;border-radius:10px;margin-bottom:8px;border:1px solid #222;"><i class="fas fa-check" style="color:#00e676;margin-right:8px;"></i> Garantía de instalación</li>
        <li style="padding:12px;background:#141414;border-radius:10px;margin-bottom:8px;border:1px solid #222;"><i class="fas fa-check" style="color:#00e676;margin-right:8px;"></i> Trabajo prolijo y profesional</li>
      </ul>
    </section>

    <section style="padding:40px 20px;text-align:center;background:#00e676;">
      <h2 style="font-size:1.8rem;color:#0a0a0a;margin-bottom:12px;">¿Necesitas {title.lower()}?</h2>
      <p style="color:#0a0a0a;margin-bottom:20px;">Cotiza en segundos. Servicio a domicilio en Santiago.</p>
      <a href="https://wa.me/56945070308?text=Hola%2C%20quiero%20cotizar%20{slug.replace('-','%20')}" target="_blank" class="btn" style="background:#0a0a0a;color:#00e676;"><i class="fab fa-whatsapp"></i> WhatsApp: +56945070308</a>
    </section>
  </main>

  <footer class="footer">
    <div class="container">
      <div class="footer-bottom">
        <p>&copy; 2026 Car Audio Pro, Cámaras y Accesorios 🟢. Todos los derechos reservados.</p>
        <p><a href="https://en-santiago.pages.dev/" target="_blank">Página web desarrollada por Grupo 360 Soluciones</a> - <a href="https://coporo.pages.dev/" target="_blank">Diseño de páginas webs - SEO Local</a></p>
      </div>
    </div>
  </footer>

  <a href="https://wa.me/56945070308?text=Hola%2C%20quiero%20cotizar" target="_blank" class="whatsapp-float"><i class="fab fa-whatsapp"></i></a>
</body>
</html>'''

    with open(f'{REPO}/services/{slug}.html', 'w', encoding='utf-8') as f:
        f.write(html)
    print(f'  ✓ services/{slug}.html')

# === Generar landings de comunas ===
print(f'\n=== Generando {len(COMUNAS)} landings de comunas ===')
for comuna in COMUNAS:
    slug = slugify(comuna)
    html = f'''<!DOCTYPE html>
<html lang="es-CL">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Car Audio a Domicilio en {comuna} | Car Audio Pro 🟢 Santiago</title>
  <meta name="description" content="Servicio de car audio, cámaras, alarmas y GPS a domicilio en {comuna}, Santiago de Chile. Instalación profesional sin moverte de casa. Cotiza gratis al +56945070308.">
  <meta name="keywords" content="car audio {comuna}, instalacion car audio {comuna}, camaras de retroceso {comuna}, alarmas auto {comuna}, servicio a domicilio {comuna}">
  <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large">
  <link rel="canonical" href="https://car-audio-pro.pages.dev/comunas/{slug}.html">
  <meta property="og:type" content="website">
  <meta property="og:title" content="Car Audio a Domicilio en {comuna} | Car Audio Pro">
  <meta property="og:description" content="Servicio de car audio, cámaras, alarmas y GPS a domicilio en {comuna}, Santiago.">
  <meta property="og:url" content="https://car-audio-pro.pages.dev/comunas/{slug}.html">
  <meta property="og:image" content="https://car-audio-pro.pages.dev/images/banner.jpg">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="Car Audio a Domicilio en {comuna} | Car Audio Pro">
  <meta name="twitter:description" content="Servicio de car audio a domicilio en {comuna}, Santiago.">
  <meta name="twitter:image" content="https://car-audio-pro.pages.dev/images/banner.jpg">
  <link rel="icon" type="image/svg+xml" href="/favicon.svg">
  <link rel="stylesheet" href="/css/styles.css">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
  <script type="application/ld+json">
  {{
    "@context": "https://schema.org",
    "@type": "AutoPartsStore",
    "name": "Car Audio Pro - {comuna}",
    "description": "Servicio de car audio, cámaras, alarmas y GPS a domicilio en {comuna}, Santiago de Chile.",
    "telephone": "+56945070308",
    "areaServed": {{
      "@type": "AdministrativeArea",
      "name": "{comuna}"
    }}
  }}
  </script>
</head>
<body>
  <header class="navbar">
    <div class="nav-container">
      <a href="/" class="nav-logo"><span class="logo-icon">🟢</span><span class="logo-text">Car Audio Pro</span></a>
      <nav class="nav-menu">
        <a href="/">Inicio</a>
        <a href="/#servicios">Servicios</a>
        <a href="/#comunas">Comunas</a>
        <a href="/#contacto">Contacto</a>
      </nav>
      <a href="https://wa.me/56945070308?text=Hola%2C%20quiero%20cotizar%20car%20audio%20en%20{slug}" target="_blank" class="nav-whatsapp-btn"><i class="fab fa-whatsapp"></i> Cotizar</a>
    </div>
  </header>

  <main>
    <section style="padding:60px 20px;text-align:center;background:linear-gradient(135deg,#0a0a0a,#0d1f0d,#0a0a0a);">
      <a href="/#comunas" style="color:#999;font-size:0.9rem;">← Ver todas las comunas</a>
      <h1 style="font-size:2.2rem;font-weight:800;margin:20px 0 12px;">Car Audio a Domicilio en <span style="color:#00e676;">{comuna}</span></h1>
      <p style="color:#999;max-width:700px;margin:0 auto 24px;">Servicio profesional de car audio, cámaras de retroceso, alarmas, GPS y ecualización con servicio a domicilio en {comuna}, Santiago de Chile. No necesitas moverte de casa.</p>
      <a href="https://wa.me/56945070308?text=Hola%2C%20quiero%20cotizar%20car%20audio%20en%20{slug}" target="_blank" class="btn btn-whatsapp"><i class="fab fa-whatsapp"></i> Cotizar por WhatsApp</a>
    </section>

    <section style="padding:60px 20px;max-width:900px;margin:0 auto;">
      <h2 style="font-size:1.8rem;margin-bottom:20px;">Servicios disponibles en {comuna}</h2>
      <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:16px;">
        {''.join(f'''<a href="/services/{s["slug"]}.html" style="background:#141414;border:1px solid #222;border-radius:12px;padding:20px;display:flex;align-items:center;gap:12px;transition:border-color 0.2s;" onmouseover="this.style.borderColor='#00e676'" onmouseout="this.style.borderColor='#222'">
          <i class="fas {s["icon"]}" style="color:#00e676;font-size:1.5rem;"></i>
          <span>{s["title"]}</span>
        </a>''' for s in SERVICES)}
      </div>
    </section>

    <section style="padding:40px 20px;text-align:center;background:#00e676;">
      <h2 style="font-size:1.8rem;color:#0a0a0a;margin-bottom:12px;">¿Vives en {comuna}?</h2>
      <p style="color:#0a0a0a;margin-bottom:20px;">Cotiza tu instalación con servicio a domicilio.</p>
      <a href="https://wa.me/56945070308?text=Hola%2C%20vivo%20en%20{slug}%20y%20quiero%20cotizar%20car%20audio" target="_blank" class="btn" style="background:#0a0a0a;color:#00e676;"><i class="fab fa-whatsapp"></i> WhatsApp: +56945070308</a>
    </section>
  </main>

  <footer class="footer">
    <div class="container">
      <div class="footer-bottom">
        <p>&copy; 2026 Car Audio Pro 🟢. Todos los derechos reservados.</p>
        <p><a href="https://en-santiago.pages.dev/" target="_blank">Grupo 360 Soluciones</a> - <a href="https://coporo.pages.dev/" target="_blank">SEO Local</a></p>
      </div>
    </div>
  </footer>

  <a href="https://wa.me/56945070308" target="_blank" class="whatsapp-float"><i class="fab fa-whatsapp"></i></a>
</body>
</html>'''

    with open(f'{REPO}/comunas/{slug}.html', 'w', encoding='utf-8') as f:
        f.write(html)

print(f'\nTotal: {len(SERVICES)} servicios + {len(COMUNAS)} comunas = {len(SERVICES) + len(COMUNAS)} landings')
