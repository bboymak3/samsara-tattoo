#!/usr/bin/env python3
"""
Regenerar landings de servicios y comunas con contenido MUCHO mas rico.
- H1 con keyword 'servicio a domicilio en Santiago' + nombre servicio/comuna
- H2 con servicio + comuna
- Contenido sobre tecnicas, marcas, proceso, cuidados, FAQ
- Keyword 'servicio a domicilio en Santiago' distribuida naturalmente
"""
import os, re, json

REPO = '/home/z/my-project/repos/car-audio-pro'
SITE = 'https://car-audio-pro.pages.dev'
PHONE = '56945070308'
PHONE_DISPLAY = '+56945070308'
TODAY = '2026-08-28'

NAVBAR = '''  <header class="navbar" id="navbar">
    <div class="nav-container">
      <a href="/" class="nav-logo"><span class="logo-icon">🟢</span><span class="logo-text">Car Audio Pro</span></a>
      <nav class="nav-menu" id="navMenu">
        <a href="/">Inicio</a>
        <a href="/#servicios">Servicios</a>
        <a href="/quienes-somos.html">Quiénes Somos</a>
        <a href="/faq.html">FAQ</a>
        <a href="/contacto.html">Contacto</a>
      </nav>
      <a href="https://wa.me/''' + PHONE + '''?text=Hola%2C%20quiero%20cotizar%20car%20audio" target="_blank" class="nav-whatsapp-btn"><i class="fab fa-whatsapp"></i> Cotizar</a>
      <button class="nav-toggle" id="navToggle" aria-label="Menú"><i class="fas fa-bars"></i></button>
    </div>
  </header>'''

FOOTER = f'''  <footer class="footer">
    <div class="container">
      <div class="footer-grid">
        <div class="footer-col">
          <a href="/" class="footer-logo"><span class="logo-icon">🟢</span><span>Car Audio Pro</span></a>
          <p>Especialistas en sonido, multimedia y seguridad vehicular con servicio a domicilio en Santiago de Chile.</p>
        </div>
        <div class="footer-col">
          <h4>Servicios</h4>
          <ul>
            <li><a href="/services/car-audio-cableado">Car Audio</a></li>
            <li><a href="/services/calibracion-ecualizacion">Ecualización DSP</a></li>
            <li><a href="/services/pantallas-radios-android">Pantallas Android</a></li>
            <li><a href="/services/camaras-retroceso">Cámaras de Retroceso</a></li>
            <li><a href="/services/alarmas-gps-seguridad">Alarmas y GPS</a></li>
            <li><a href="/services/reparacion-plantas-amplificadores">Reparación de Plantas</a></li>
            <li><a href="/services/cajones-acusticos">Cajones Acústicos</a></li>
            <li><a href="/services/cableado-profesional">Cableado Pro</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <h4>Información</h4>
          <ul>
            <li><a href="/quienes-somos.html">Quiénes Somos</a></li>
            <li><a href="/faq.html">Preguntas Frecuentes</a></li>
            <li><a href="/politica-garantia.html">Política de Garantía</a></li>
            <li><a href="/contacto.html">Contacto</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <h4>Contacto</h4>
          <ul>
            <li><i class="fab fa-whatsapp"></i> <a href="https://wa.me/{PHONE}" target="_blank">{PHONE_DISPLAY}</a></li>
            <li><i class="fas fa-clock"></i> Lun-Sáb: 9AM-8PM</li>
            <li><i class="fas fa-map-marker-alt"></i> Santiago, RM</li>
          </ul>
        </div>
      </div>
      <div class="footer-bottom">
        <p>&copy; 2026 Car Audio Pro 🟢. Todos los derechos reservados.</p>
        <p><a href="https://en-santiago.pages.dev/" target="_blank">Grupo 360 Soluciones</a> - <a href="https://coporo.pages.dev/" target="_blank">SEO Local</a></p>
      </div>
    </div>
  </footer>
  <a href="https://wa.me/{PHONE}" target="_blank" class="whatsapp-float"><i class="fab fa-whatsapp"></i></a>
  <script src="/js/script.js"></script>'''

SERVICES = [
    {
        'slug': 'car-audio-cableado', 'title': 'Instalación de Car Audio y Cableado', 'icon': 'fa-volume-up',
        'short': 'Montaje de parlantes, componentes, bajos y tendido eléctrico profesional.',
        'body': 'La instalación de car audio profesional es mucho más que conectar unos cables. Requiere conocimiento técnico de acústica, electrónica y mecánica automotriz para lograr un sonido nítido, potente y sin interferencias eléctricas que puedan dañar tu equipo o tu vehículo. En Car Audio Pro realizamos instalaciones completas de sistemas de sonido vehicular con servicio a domicilio en Santiago, directamente en tu casa o lugar de trabajo, sin que tengas que mover tu vehículo.',
        'proceso': 'Nuestro proceso de instalación incluye: 1) Evaluación del vehículo y sistema existente, 2) Selección de componentes según tu presupuesto y necesidades, 3) Desarme prolijo de paneles sin dañar plásticos ni clips, 4) Tendido de cableado con calibre adecuado usando cables oxygen-free de primera calidad, 5) Instalación de parlantes con aislación acústica donde sea necesario, 6) Montaje del equipo principal (radio, pantalla o amplificador), 7) Configuración inicial de cruces y ganancias, 8) Prueba de sonido y ajuste fino, 9) Rearmado completo del vehículo.',
        'marcas': 'Pioneer, JVC, Kenwood, Sony, Alpine, Rockford Fosgate, JBL, Kicker, Hertz, Audison, Rainbow',
    },
    {
        'slug': 'calibracion-ecualizacion', 'title': 'Calibración y Ecualización Fina', 'icon': 'fa-sliders-h',
        'short': 'Ajuste de sonido con procesadores DSP y crossovers para máxima nitidez.',
        'body': 'La calibración y ecualización con procesadores de audio digitales (DSP) es el secreto para lograr un sonido de calidad de auditorio en tu vehículo. Un DSP permite ajustar con precisión milimétrica cada frecuencia, tiempo de llegada, fase y corte de cada parlante, eliminando distorsiones, resonancias y cancelaciones que degradan la calidad sonora. En Car Audio Pro somos especialistas en calibración fina con servicio a domicilio en Santiago.',
        'proceso': 'El proceso de calibración incluye: 1) Análisis acústico del habitáculo con micrófono de medición, 2) Identificación de problemas: resonancias, cancelaciones de fase, tiempos de llegada desalineados, 3) Configuración de cruces activos (crossovers) para cada vía, 4) Alineamiento temporal (time alignment) para que el sonido llegue simultáneamente a tus oídos, 5) Ecualización paramétrica: ajuste fino de cada banda de frecuencia, 6) Configuración de retardos y fases, 7) Prueba con diferentes géneros musicales, 8) Ajuste final según preferencia del cliente.',
        'marcas': 'Audison Bit One, Alpine H800, Rockford Fosgate 360.3, JBL MS-8, Kicker Key, Pioneer DEH-S, DSP Rainbow',
    },
    {
        'slug': 'pantallas-radios-android', 'title': 'Pantallas Multimedia y Radios Android', 'icon': 'fa-tablet-alt',
        'short': 'Montaje y configuración multimedia a medida para tu vehículo.',
        'body': 'Las pantallas multimedia con Android integrado transforman tu vehículo en un centro de entretenimiento completo. Con una pantalla táctil de 9 a 11 pulgadas puedes tener Google Maps, Spotify, YouTube, WhatsApp, Bluetooth, cámara de retroceso y todas las apps de tu celular directamente en el tablero de tu auto. En Car Audio Pro instalamos pantallas Android con servicio a domicilio en Santiago, con integración perfecta a tu vehículo.',
        'proceso': 'La instalación incluye: 1) Verificación de compatibilidad con tu vehículo, 2) Selección de pantalla según tamaño y características, 3) Desarme del tablero y retiro del equipo original, 4) Instalación del panel ISO o adaptador específico, 5) Conexión de cables: alimentación, audio, steering wheel controls, 6) Instalación de módulo Can Bus si es necesario, 7) Configuración de Android: WiFi, Bluetooth, cuentas Google, 8) Instalación de apps: Spotify, Google Maps, YouTube, 9) Prueba completa de todas las funciones, 10) Rearmado del tablero.',
        'marcas': 'Pioneer, JVC, Kenwood, Sony, Alpine, pantallas Android universales, Teyes, Joying, Xtrons',
    },
    {
        'slug': 'camaras-retroceso', 'title': 'Cámaras de Retroceso', 'icon': 'fa-camera-retro',
        'short': 'Integración a pantalla para asistencia de estacionamiento.',
        'body': 'Las cámaras de retroceso son una de las instalaciones más solicitadas para mejorar la seguridad al estacionar y evitar accidentes. Una buena cámara de retroceso con visión nocturna, líneas guía dinámicas y ángulo amplio puede prevenir choques, atropellos y daños materiales. En Car Audio Pro instalamos cámaras de retroceso con servicio a domicilio en Santiago, integrándolas a la pantalla existente de tu vehículo o instalando una nueva.',
        'proceso': 'La instalación incluye: 1) Evaluación del vehículo y tipo de pantalla existente, 2) Selección de cámara: estándar, CCD, HD o con visión nocturna IR, 3) Tendido de cable desde la cámara hasta la pantalla (por dentro del vehículo, sin cables visibles), 4) Conexión a la luz de reversa para activación automática, 5) Instalación de la cámara: en placa patente, moldura o emblema, 6) Configuración de líneas guía en la pantalla, 7) Prueba de imagen y ajuste de ángulo, 8) Verificación de activación automática al poner reversa.',
        'marcas': 'Pioneer, Sony, JVC, Kenwood, Alpine, cámaras universales CCD/CMOS, Hertz, Vision',
    },
    {
        'slug': 'alarmas-gps-seguridad', 'title': 'Alarmas, Cortacorrientes y GPS Satelital', 'icon': 'fa-shield-alt',
        'short': 'Seguridad automotriz completa con instalación profesional a domicilio.',
        'body': 'La seguridad de tu vehículo es primordial en Santiago. Instalamos alarmas con sensores de movimiento y doble impacto, cortacorrientes que impiden el arranque del motor sin autorización, y sistemas GPS satelital que te permiten rastrear tu vehículo en tiempo real desde tu celular. Todo con servicio a domicilio en Santiago y garantía de instalación.',
        'proceso': 'La instalación incluye: 1) Evaluación del vehículo y sistema eléctrico, 2) Selección de alarma según características: sensores, zonas, modos silenciosos, 3) Instalación del módulo principal en ubicación oculta, 4) Conexión a sistema eléctrico: encendido, puertas, baúl, capó, 5) Instalación de cortacorriente en línea de combustible o arranque, 6) Configuración de sensores: impacto, movimiento, inclinación, 7) Programación de controles remotos, 8) Instalación de GPS si corresponde: módulo, antena, SIM card, 9) Configuración de app móvil para rastreo, 10) Prueba completa del sistema.',
        'marcas': 'Black Widow, Python, Viper, Avital, Code Alarm, X-28, Centinela, GPS: Concox, Coban, Meitrack',
    },
    {
        'slug': 'reparacion-plantas-amplificadores', 'title': 'Reparación de Plantas y Amplificadores', 'icon': 'fa-tools',
        'short': 'Diagnóstico y reparación de amplificadores de sonido con servicio a domicilio.',
        'body': 'La reparación de plantas amplificadoras requiere conocimiento técnico especializado en electrónica de audio. Un amplificador dañado puede presentar problemas como: distorsión, canal muerto, protección activada, sobrecalentamiento, ruido eléctrico o simplemente no enciende. En Car Audio Pro diagnosticamos y reparamos amplificadores de todas las marcas y potencias con servicio a domicilio en Santiago.',
        'proceso': 'El proceso de reparación incluye: 1) Diagnóstico inicial: identificación del problema, 2) Desarme del amplificador, 3) Inspección visual: transistores quemados, capacitores inflamados, soldaduras frías, 4) Prueba de componentes con multímetro y osciloscopio, 5) Reemplazo de componentes dañados: transistores MOSFET, capacitores, resistencias, op-amps, 6) Revisión de fuente de alimentación, 7) Reemplazo de placa si es necesario, 8) Prueba bajo carga con parlantes, 9) Medición de potencia real con analizadores, 10) Ensamblaje y prueba final.',
        'marcas': 'Rockford Fosgate, Kicker, JBL, Pioneer, Sony, Hertz, Audison, Taramps, Sounigital, Stetsom',
    },
    {
        'slug': 'cajones-acusticos', 'title': 'Fabricación de Cajones Acústicos', 'icon': 'fa-box',
        'short': 'Cajas a medida para subwoofers con acabado profesional.',
        'body': 'La fabricación de cajones acústicos a medida es un arte que combina acústica, carpintería y diseño. Un cajón bien construido puede hacer que un subwoofer económico suene increíble, mientras que un cajón mal diseñado puede arruinar incluso el mejor equipo. En Car Audio Pro construimos cajones sellados, porteados y bandpass calculados específicamente para tu subwoofer, con servicio a domicilio en Santiago.',
        'proceso': 'El proceso de fabricación incluye: 1) Cálculo del volumen óptimo según especificaciones del subwoofer (VAS, QTS, FS), 2) Selección del tipo de caja: sellada, porteadas o bandpass, 3) Cálculo de longitud y diámetro del puerto (si es porteadas), 4) Corte de MDF de 18mm con CNC o calado manual, 5) Ensable con cola y tornillos, 6) Sellado interior con silicone acústico, 7) Refuerzos internos si es necesario, 8) Tapizado: carpet, vinipiel o pintura, 9) Instalación del subwoofer y terminales, 10) Prueba de sonido y ajuste.',
        'marcas': 'Construimos para cualquier marca: Rockford Fosgate, Kicker, JBL, Pioneer, Sundown, Skar, Hertz, Dayton',
    },
    {
        'slug': 'cableado-profesional', 'title': 'Cableado Profesional Completo', 'icon': 'fa-bolt',
        'short': 'Tendido eléctrico prolijo con materiales de primera calidad.',
        'body': 'El cableado profesional es la base de cualquier instalación de car audio de calidad. Un cableado deficiente puede causar ruido eléctrico, caída de voltaje, sobrecalentamiento e incluso incendios. En Car Audio Pro realizamos el tendido eléctrico completo desde la batería hasta cada componente del sistema, usando cables de calibre adecuado, fusibles, relés y conectores de primera calidad, con servicio a domicilio en Santiago.',
        'proceso': 'El proceso de cableado incluye: 1) Cálculo de calibre de cable según potencia del sistema (0 AWG, 2 AWG, 4 AWG, 8 AWG), 2) Instalación de fusible principal cerca de la batería, 3) Tendido de cable de potencia por debajo de umbrales (sin cables visibles), 4) Pasaje de cables RCA por lado opuesto al de potencia (evita ruido), 5) Instalación de cable de tierra en chasis limpio (lijar pintura), 6) Conexión de cable remoto (turn-on) desde el equipo principal, 7) Cableado de parlantes con cable especial sin oxígeno (OFC), 8) Instalación de capacitor si es necesario, 9) Organización y zipado de cables, 10) Prueba de voltaje y continuidad.',
        'marcas': 'Stinger, Kicker, Rockford Fosgate, Tsunami, Streetwires, NVX, Knukonceptz, Crux',
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
    'Isla de Maipo','San Pedro','San José de Maipo','Pirque','Quinta Normal'
]

def slugify(name):
    n = name.lower()
    n = n.replace('ñ','n').replace('á','a').replace('é','e').replace('í','i').replace('ó','o').replace('ú','u')
    n = re.sub(r'[^a-z0-9]+', '-', n).strip('-')
    return n

def html_head(title, description, keywords, canonical, og_title, og_desc, jsonld=''):
    return f'''<!DOCTYPE html>
<html lang="es-CL">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{title}</title>
  <meta name="description" content="{description}">
  <meta name="keywords" content="{keywords}">
  <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large">
  <link rel="canonical" href="{canonical}">
  <meta property="og:type" content="website">
  <meta property="og:locale" content="es_CL">
  <meta property="og:site_name" content="Car Audio Pro">
  <meta property="og:title" content="{og_title}">
  <meta property="og:description" content="{og_desc}">
  <meta property="og:url" content="{canonical}">
  <meta property="og:image" content="{SITE}/images/banner.jpg">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="{og_title}">
  <meta name="twitter:description" content="{og_desc}">
  <meta name="twitter:image" content="{SITE}/images/banner.jpg">
  <meta name="geo.region" content="CL-RM">
  <meta name="geo.placename" content="Santiago de Chile">
  <link rel="icon" type="image/svg+xml" href="/favicon.svg">
  <link rel="stylesheet" href="/css/styles.css">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
  {jsonld}
</head>'''

# ============================================================
# SERVICIOS con contenido rico
# ============================================================
print('=== Regenerando 8 servicios con contenido rico ===')
for svc in SERVICES:
    slug = svc['slug']
    title = svc['title']
    short = svc['short']
    body = svc['body']
    proceso = svc['proceso']
    marcas = svc['marcas']

    jsonld = f'''<script type="application/ld+json">
  {{"@context":"https://schema.org","@type":"Service","name":"{title}","description":"{short}","provider":{{"@type":"AutoPartsStore","name":"Car Audio Pro","telephone":"+{PHONE}","areaServed":"Región Metropolitana de Santiago"}},"areaServed":"Santiago de Chile"}}
  </script>
  <script type="application/ld+json">
  {{"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{{"@type":"Question","name":"¿Hacen {title.lower()} con servicio a domicilio en Santiago?","acceptedAnswer":{{"@type":"Answer","text":"Sí. Vamos directamente a tu domicilio en toda la Región Metropolitana de Santiago."}}}},{{"@type":"Question","name":"¿Cuánto cuesta {title.lower()}?","acceptedAnswer":{{"@type":"Answer","text":"El precio varía según el tipo de instalación. Cotiza gratis por WhatsApp al {PHONE_DISPLAY}."}}}}]}}
  </script>'''

    faqs = [
        (f'¿Hacen {title.lower()} con servicio a domicilio en Santiago?', 'Sí. Vamos directamente a tu domicilio en toda la Región Metropolitana de Santiago. No necesitas mover tu vehículo.'),
        (f'¿Cuánto cuesta {title.lower()}?', f'El precio varía según el tipo de instalación, el vehículo y los materiales. Cotiza gratis por WhatsApp al {PHONE_DISPLAY}.'),
        (f'¿Cuánto dura la instalación de {title.lower()}?', 'Depende de la complejidad. Entre 1 y 5 horas según el servicio.'),
        (f'¿Qué marcas usan para {title.lower()}?', f'Trabajamos con las mejores marcas: {marcas}.'),
        (f'¿La instalación de {title.lower()} tiene garantía?', 'Sí, todas nuestras instalaciones tienen garantía de 90 días sobre la mano de obra.'),
        (f'¿En qué comunas ofrecen {title.lower()}?', 'Atendemos en toda la Región Metropolitana: Providencia, Las Condes, Ñuñoa, Maipú, Puente Alto y más de 50 comunas.'),
    ]

    faq_html = '\n'.join(f'        <details class="faq-item"><summary>{q}</summary><p>{a}</p></details>' for q,a in faqs)

    # Comunas links
    comunas_links = '\n'.join(
        f'            <a href="/comunas/{slugify(c)}" class="comuna-chip"><i class="fas fa-map-marker-alt"></i> {c}</a>'
        for c in COMUNAS[:30]
    )

    html = html_head(
        f'{title} - Servicio a Domicilio en Santiago | Car Audio Pro 🟢',
        f'{short} Servicio a domicilio en Santiago. {body[:120]} Cotiza gratis al {PHONE_DISPLAY}.',
        f'{title.lower()}, car audio Santiago, servicio a domicilio Santiago, {slug.replace("-"," ")}, instalacion car audio Chile',
        f'{SITE}/services/{slug}.html',
        f'{title} - Servicio a Domicilio en Santiago | Car Audio Pro',
        short,
        jsonld
    ) + '\n<body>\n' + NAVBAR + f'''
  <main>
    <section class="hero" style="padding:60px 20px;text-align:center;">
      <div class="hero-content">
        <a href="/#servicios" style="color:#999;font-size:0.9rem;">← Volver a servicios</a>
        <div style="font-size:3rem;color:#00e676;margin:20px 0;"><i class="fas {svc["icon"]}"></i></div>
        <span class="hero-badge">🟢 Servicio a Domicilio en Santiago</span>
        <h1 style="font-size:2.2rem;font-weight:800;margin:12px 0;">{title} - <span class="text-green">Servicio a Domicilio en Santiago</span></h1>
        <p style="color:#999;max-width:700px;margin:0 auto 24px;">{short}</p>
        <a href="https://wa.me/{PHONE}?text=Hola%2C%20quiero%20cotizar%20{slug.replace("-","%20")}" target="_blank" class="btn btn-whatsapp"><i class="fab fa-whatsapp"></i> Cotizar por WhatsApp</a>
      </div>
    </section>

    <section style="padding:60px 20px;max-width:900px;margin:0 auto;">
      <h2 style="font-size:1.8rem;margin-bottom:20px;">Sobre el Servicio</h2>
      <p style="color:#999;line-height:1.8;margin-bottom:16px;">{body}</p>
      <p style="color:#999;line-height:1.8;margin-bottom:16px;">Nuestro servicio a domicilio en Santiago te permite recibir una instalación profesional sin tener que trasladar tu vehículo a un taller. Ahorras tiempo, evitas riesgos de traslado y puedes ver el proceso de instalación en tiempo real.</p>
    </section>

    <section style="padding:60px 20px;max-width:900px;margin:0 auto;">
      <h2 style="font-size:1.8rem;margin-bottom:20px;">Proceso de Instalación</h2>
      <p style="color:#999;line-height:1.8;margin-bottom:16px;">{proceso}</p>
    </section>

    <section style="padding:60px 20px;max-width:900px;margin:0 auto;">
      <h2 style="font-size:1.8rem;margin-bottom:20px;">Marcas que Trabajamos</h2>
      <p style="color:#999;line-height:1.8;">Trabajamos con las mejores marcas del mercado para garantizar resultados profesionales: <strong style="color:#00e676;">{marcas}</strong>. También puedes comprar tu propio equipo y nosotros lo instalamos con servicio a domicilio en Santiago.</p>
    </section>

    <section style="padding:60px 20px;max-width:900px;margin:0 auto;">
      <h2 style="font-size:1.8rem;margin-bottom:20px;">¿Qué incluye el servicio?</h2>
      <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:16px;">
        <div style="background:#141414;border:1px solid #222;border-radius:12px;padding:20px;"><i class="fas fa-check" style="color:#00e676;margin-right:8px;"></i> Visita a domicilio en toda la Región Metropolitana</div>
        <div style="background:#141414;border:1px solid #222;border-radius:12px;padding:20px;"><i class="fas fa-check" style="color:#00e676;margin-right:8px;"></i> Diagnóstico y cotización sin costo</div>
        <div style="background:#141414;border:1px solid #222;border-radius:12px;padding:20px;"><i class="fas fa-check" style="color:#00e676;margin-right:8px;"></i> Materiales de primera calidad</div>
        <div style="background:#141414;border:1px solid #222;border-radius:12px;padding:20px;"><i class="fas fa-check" style="color:#00e676;margin-right:8px;"></i> Garantía de 90 días</div>
        <div style="background:#141414;border:1px solid #222;border-radius:12px;padding:20px;"><i class="fas fa-check" style="color:#00e676;margin-right:8px;"></i> Trabajo prolijo y profesional</div>
        <div style="background:#141414;border:1px solid #222;border-radius:12px;padding:20px;"><i class="fas fa-check" style="color:#00e676;margin-right:8px;"></i> Boleta o factura electrónica</div>
      </div>
    </section>

    <section style="padding:60px 20px;max-width:800px;margin:0 auto;">
      <h2 style="font-size:1.8rem;margin-bottom:20px;">Preguntas sobre {title}</h2>
      <div class="faq-list">
{faq_html}
      </div>
    </section>

    <section style="padding:60px 20px;max-width:900px;margin:0 auto;">
      <h2 style="font-size:1.8rem;margin-bottom:20px;">Comunas donde ofrecemos {title.lower()}</h2>
      <div class="comunas-grid" style="display:grid;grid-template-columns:repeat(auto-fill,minmax(150px,1fr));gap:10px;">
{comunas_links}
      </div>
    </section>

    <section style="padding:40px 20px;text-align:center;background:#00e676;">
      <h2 style="font-size:1.8rem;color:#0a0a0a;margin-bottom:12px;">¿Necesitas {title.lower()}?</h2>
      <p style="color:#0a0a0a;margin-bottom:20px;">Cotiza en segundos. Servicio a domicilio en Santiago.</p>
      <a href="https://wa.me/{PHONE}?text=Hola%2C%20quiero%20cotizar%20{slug.replace("-","%20")}" target="_blank" class="btn" style="background:#0a0a0a;color:#00e676;"><i class="fab fa-whatsapp"></i> WhatsApp: {PHONE_DISPLAY}</a>
    </section>
  </main>
''' + FOOTER + '\n</body>\n</html>'

    with open(f'{REPO}/services/{slug}.html', 'w', encoding='utf-8') as f:
        f.write(html)
    print(f'  ✓ services/{slug}.html')

# ============================================================
# COMUNAS con contenido rico
# ============================================================
print(f'\n=== Regenerando {len(COMUNAS)} comunas con contenido rico ===')
for comuna in COMUNAS:
    slug = slugify(comuna)

    # H2 por cada servicio + comuna
    servicios_h2 = '\n'.join(
        f'      <h2 style="font-size:1.3rem;margin:20px 0 8px;"><a href="/services/{s["slug"]}" style="color:#00e676;">{s["title"]}</a> en {comuna}</h2>\n      <p style="color:#999;line-height:1.6;">{s["short"]} Servicio a domicilio en {comuna}, Santiago.</p>'
        for s in SERVICES
    )

    faqs = [
        (f'¿Hacen servicio a domicilio de car audio en {comuna}?', f'Sí. Vamos directamente a tu domicilio en {comuna} con todo el equipamiento necesario. No necesitas mover tu vehículo.'),
        (f'¿Cuánto cuesta la instalación de car audio en {comuna}?', f'El precio varía según el tipo de instalación. Cotiza gratis por WhatsApp al {PHONE_DISPLAY}.'),
        (f'¿Qué servicios ofrecen en {comuna}?', 'Car audio, ecualización DSP, pantallas Android, cámaras de retroceso, alarmas, GPS, reparación de plantas, cajones acústicos y cableado profesional. Todo con servicio a domicilio en Santiago.'),
        (f'¿La instalación en {comuna} tiene garantía?', 'Sí, todas nuestras instalaciones tienen garantía de 90 días sobre la mano de obra.'),
        (f'¿Cómo agendo una visita en {comuna}?', f'Por WhatsApp al {PHONE_DISPLAY}. Coordinamos día y horario según tu preferencia.'),
        (f'¿Cuánto dura una instalación en {comuna}?', 'Depende del servicio: 1-2 horas para cámaras, 3-5 horas para instalaciones completas de car audio.'),
    ]
    faq_html = '\n'.join(f'        <details class="faq-item"><summary>{q}</summary><p>{a}</p></details>' for q,a in faqs)

    jsonld = f'''<script type="application/ld+json">
  {{"@context":"https://schema.org","@type":"AutoPartsStore","name":"Car Audio Pro - {comuna}","description":"Servicio de car audio, cámaras, alarmas y GPS a domicilio en {comuna}, Santiago de Chile.","telephone":"+{PHONE}","areaServed":{{"@type":"AdministrativeArea","name":"{comuna}"}}}}
  </script>
  <script type="application/ld+json">
  {{"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{{"@type":"Question","name":"¿Hacen car audio a domicilio en {comuna}?","acceptedAnswer":{{"@type":"Answer","text":"Sí, atendemos en {comuna} con servicio a domicilio."}}}}]}}
  </script>'''

    html = html_head(
        f'Car Audio a Domicilio en {comuna} | Car Audio Pro 🟢 Santiago',
        f'Servicio de car audio, cámaras, alarmas, GPS y ecualización con servicio a domicilio en {comuna}, Santiago de Chile. Cotiza gratis al {PHONE_DISPLAY}.',
        f'car audio {comuna}, instalacion car audio {comuna}, camaras retroceso {comuna}, alarmas auto {comuna}, servicio a domicilio {comuna}, GPS vehicular {comuna}',
        f'{SITE}/comunas/{slug}.html',
        f'Car Audio a Domicilio en {comuna} | Car Audio Pro',
        f'Servicio de car audio a domicilio en {comuna}, Santiago.',
        jsonld
    ) + '\n<body>\n' + NAVBAR + f'''
  <main>
    <section class="hero" style="padding:60px 20px;text-align:center;">
      <div class="hero-content">
        <a href="/#comunas" style="color:#999;font-size:0.9rem;">← Ver todas las comunas</a>
        <span class="hero-badge">🟢 Servicio a Domicilio en Santiago</span>
        <h1 style="font-size:2.2rem;font-weight:800;margin:12px 0;">Car Audio a Domicilio en <span class="text-green">{comuna}</span></h1>
        <p style="color:#999;max-width:700px;margin:0 auto 24px;">Servicio profesional de car audio, cámaras de retroceso, alarmas, GPS, ecualización DSP y reparación de plantas con servicio a domicilio en {comuna}, Santiago de Chile. No necesitas mover tu vehículo de casa.</p>
        <a href="https://wa.me/{PHONE}?text=Hola%2C%20vivo%20en%20{slug}%20y%20quiero%20cotizar%20car%20audio" target="_blank" class="btn btn-whatsapp"><i class="fab fa-whatsapp"></i> Cotizar por WhatsApp</a>
      </div>
    </section>

    <section style="padding:60px 20px;max-width:900px;margin:0 auto;">
      <h2 style="font-size:1.8rem;margin-bottom:16px;">Servicio a Domicilio en {comuna}</h2>
      <p style="color:#999;line-height:1.8;margin-bottom:16px;">En Car Audio Pro llevamos el taller directamente a tu casa en {comuna}. Realizamos instalaciones de car audio, cámaras de retroceso, pantallas multimedia, alarmas, GPS, ecualización con DSP y reparación de amplificadores, todo con servicio a domicilio en Santiago. Nuestro equipo llega con todas las herramientas, materiales y equipos necesarios para realizar el trabajo en el lugar que tú elijas.</p>
      <p style="color:#999;line-height:1.8;margin-bottom:16px;">Atender en {comuna} nos permite ofrecer un servicio cómodo y sin riesgos para nuestros clientes: no tienes que trasladar tu vehículo, no pierdes tiempo esperando en un taller, y puedes ver el proceso de instalación en tiempo real. Además, cotizamos gratis antes de empezar cualquier trabajo.</p>
    </section>

    <section style="padding:60px 20px;max-width:900px;margin:0 auto;">
      <h2 style="font-size:1.8rem;margin-bottom:20px;">Servicios de Car Audio en {comuna}</h2>
{servicios_h2}
    </section>

    <section style="padding:60px 20px;max-width:900px;margin:0 auto;">
      <h2 style="font-size:1.8rem;margin-bottom:20px;">Marcas que Instalamos en {comuna}</h2>
      <p style="color:#999;line-height:1.8;">Trabajamos con las mejores marcas del mercado: <strong style="color:#00e676;">Pioneer, JVC, Kenwood, Sony, Alpine, Rockford Fosgate, JBL, Kicker, Hertz, Audison</strong> y más. También puedes comprar tu propio equipo y nosotros lo instalamos con servicio a domicilio en {comuna}.</p>
    </section>

    <section style="padding:60px 20px;max-width:800px;margin:0 auto;">
      <h2 style="font-size:1.8rem;margin-bottom:20px;">Preguntas sobre Car Audio en {comuna}</h2>
      <div class="faq-list">
{faq_html}
      </div>
    </section>

    <section style="padding:60px 20px;max-width:900px;margin:0 auto;">
      <h2 style="font-size:1.8rem;margin-bottom:20px;">Otros Servicios en {comuna}</h2>
      <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(250px,1fr));gap:12px;">
{''.join(f'<a href="/services/{s["slug"]}" style="background:#141414;border:1px solid #222;border-radius:10px;padding:14px;display:flex;align-items:center;gap:10px;color:#999;"><i class="fas {s["icon"]}" style="color:#00e676;"></i>{s["title"]}</a>' for s in SERVICES)}
      </div>
    </section>

    <section style="padding:40px 20px;text-align:center;background:#00e676;">
      <h2 style="font-size:1.8rem;color:#0a0a0a;margin-bottom:12px;">¿Vives en {comuna}?</h2>
      <p style="color:#0a0a0a;margin-bottom:20px;">Cotiza tu instalación con servicio a domicilio en Santiago.</p>
      <a href="https://wa.me/{PHONE}?text=Hola%2C%20vivo%20en%20{slug}%20y%20quiero%20cotizar%20car%20audio" target="_blank" class="btn" style="background:#0a0a0a;color:#00e676;"><i class="fab fa-whatsapp"></i> WhatsApp: {PHONE_DISPLAY}</a>
    </section>
  </main>
''' + FOOTER + '\n</body>\n</html>'

    with open(f'{REPO}/comunas/{slug}.html', 'w', encoding='utf-8') as f:
        f.write(html)

print(f'\nTotal: {len(SERVICES)} servicios + {len(COMUNAS)} comunas regeneradas')
