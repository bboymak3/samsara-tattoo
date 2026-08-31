#!/usr/bin/env python3
"""
Generar páginas estáticas + regenerar landings de servicios y comunas
con contenido mucho más rico, H1/H2 con keyword 'servicio a domicilio en Santiago',
FAQ, mapa de comunas, etc.
"""
import os, re, json

REPO = '/home/z/my-project/repos/car-audio-pro'
SITE = 'https://car-audio-pro.pages.dev'
PHONE = '56945070308'
PHONE_DISPLAY = '+56945070308'
TODAY = '2026-08-28'

# Head y footer comunes
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
  <meta name="author" content="Car Audio Pro">
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
  <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css">
  {jsonld}
</head>'''

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
            <li><a href="/#comunas">Comunas que Atendemos</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <h4>Contacto</h4>
          <ul>
            <li><i class="fab fa-whatsapp"></i> <a href="https://wa.me/{PHONE}" target="_blank">{PHONE_DISPLAY}</a></li>
            <li><i class="fas fa-clock"></i> Lun-Sáb: 9AM-8PM</li>
            <li><i class="fas fa-map-marker-alt"></i> Servicio a domicilio en Santiago, RM</li>
          </ul>
        </div>
      </div>
      <div class="footer-bottom">
        <p>&copy; 2026 Car Audio Pro, Cámaras y Accesorios 🟢. Todos los derechos reservados.</p>
        <p><a href="https://en-santiago.pages.dev/" target="_blank">Página web desarrollada por Grupo 360 Soluciones</a> - <a href="https://coporo.pages.dev/" target="_blank">Diseño de páginas webs - SEO Local</a></p>
      </div>
    </div>
  </footer>
  <a href="https://wa.me/{PHONE}?text=Hola%2C%20quiero%20cotizar%20car%20audio%20a%20domicilio" target="_blank" class="whatsapp-float" aria-label="WhatsApp"><i class="fab fa-whatsapp"></i></a>
  <script src="/js/script.js"></script>'''

WHATSAPP_FLOAT = f'<a href="https://wa.me/{PHONE}" target="_blank" class="whatsapp-float" aria-label="WhatsApp"><i class="fab fa-whatsapp"></i></a><script src="/js/script.js"></script>'

# ============================================================
# 1. QUIENES SOMOS
# ============================================================
print('=== Generando quienes-somos.html ===')
with open(f'{REPO}/quienes-somos.html', 'w') as f:
    f.write(html_head(
        'Quiénes Somos | Car Audio Pro 🟢 - Servicio a Domicilio en Santiago',
        'Car Audio Pro, especialistas en car audio, cámaras, alarmas y GPS con servicio a domicilio en Santiago. Conoce nuestro equipo, trayectoria y compromiso con la calidad profesional.',
        'quienes somos car audio, car audio pro Santiago, servicio a domicilio car audio, instalador car audio Chile',
        f'{SITE}/quienes-somos.html',
        'Quiénes Somos | Car Audio Pro 🟢',
        'Especialistas en car audio con servicio a domicilio en Santiago.'
    ) + '\n<body>\n' + NAVBAR + f'''
  <main>
    <section class="hero" style="padding:60px 20px;text-align:center;">
      <div class="hero-content">
        <span class="hero-badge">🟢 Quiénes Somos</span>
        <h1>Car Audio Pro - <span class="text-green">Servicio a Domicilio en Santiago</span></h1>
        <p class="hero-desc" style="max-width:800px;margin:0 auto;">Somos un equipo de especialistas en sonido vehicular, multimedia y seguridad automotriz que lleva el taller directamente a tu casa. Con años de experiencia en el rubro, hemos perfeccionado el arte de instalar, calibrar y reparar equipos de car audio con resultados profesionales.</p>
      </div>
    </section>

    <section style="padding:60px 20px;max-width:900px;margin:0 auto;">
      <h2 style="font-size:1.8rem;margin-bottom:20px;">Nuestra Historia</h2>
      <p style="color:#999;line-height:1.8;margin-bottom:16px;">Car Audio Pro nació de la pasión por el sonido de calidad y la necesidad de ofrecer un servicio profesional que no requiriera que el cliente moviera su vehículo de su casa. Nos dimos cuenta de que muchos propietarios querían mejorar su sistema de audio, instalar cámaras de retroceso o alarmas, pero no tenían tiempo de llevar el auto a un taller y esperar horas.</p>
      <p style="color:#999;line-height:1.8;margin-bottom:16px;">Por eso creamos el modelo de <strong style="color:#00e676;">servicio a domicilio en Santiago</strong>: vamos directamente a tu ubicación con todas las herramientas, materiales y equipos necesarios para realizar la instalación en el lugar que tú elijas. Tu casa, tu trabajo, el lugar que más te acomode.</p>
      <p style="color:#999;line-height:1.8;margin-bottom:16px;">Con el tiempo, ampliamos nuestros servicios más allá del car audio: pantallas multimedia Android, cámaras de retroceso, alarmas con cortacorriente, GPS satelital, ecualización con procesadores DSP, fabricación de cajones acústicos a medida, y reparación de plantas amplificadoras. Todo con el mismo estándar de calidad y la misma modalidad: servicio a domicilio en Santiago.</p>

      <h2 style="font-size:1.8rem;margin:32px 0 20px;">Nuestros Valores</h2>
      <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(250px,1fr));gap:16px;margin-bottom:32px;">
        <div style="background:#141414;border:1px solid #222;border-radius:12px;padding:24px;">
          <i class="fas fa-medal" style="font-size:2rem;color:#00e676;"></i>
          <h3 style="margin:12px 0 8px;">Calidad Profesional</h3>
          <p style="color:#999;font-size:0.9rem;">Usamos solo materiales de primera calidad y marcas reconocidas. Cada instalación se realiza con técnica profesional y acabado prolijo.</p>
        </div>
        <div style="background:#141414;border:1px solid #222;border-radius:12px;padding:24px;">
          <i class="fas fa-home" style="font-size:2rem;color:#00e676;"></i>
          <h3 style="margin:12px 0 8px;">Servicio a Domicilio</h3>
          <p style="color:#999;font-size:0.9rem;">Vamos a tu casa en toda la Región Metropolitana. No necesitas mover tu auto. Ahorra tiempo y reduce riesgos.</p>
        </div>
        <div style="background:#141414;border:1px solid #222;border-radius:12px;padding:24px;">
          <i class="fas fa-shield-alt" style="font-size:2rem;color:#00e676;"></i>
          <h3 style="margin:12px 0 8px;">Garantía</h3>
          <p style="color:#999;font-size:0.9rem;">Todas nuestras instalaciones tienen garantía. Si algo no funciona, volvemos a solucionarlo sin costo adicional.</p>
        </div>
        <div style="background:#141414;border:1px solid #222;border-radius:12px;padding:24px;">
          <i class="fas fa-handshake" style="font-size:2rem;color:#00e676;"></i>
          <h3 style="margin:12px 0 8px;">Transparencia</h3>
          <p style="color:#999;font-size:0.9rem;">Cotización clara y sin sorpresas. Sabes exactamente qué pagarás antes de que empecemos el trabajo.</p>
        </div>
      </div>

      <h2 style="font-size:1.8rem;margin:32px 0 20px;">¿Por qué elegir Car Audio Pro?</h2>
      <ul style="list-style:none;padding:0;">
        <li style="padding:12px;background:#141414;border-radius:10px;margin-bottom:8px;border:1px solid #222;"><i class="fas fa-check" style="color:#00e676;margin-right:8px;"></i> Servicio a domicilio en toda la Región Metropolitana de Santiago</li>
        <li style="padding:12px;background:#141414;border-radius:10px;margin-bottom:8px;border:1px solid #222;"><i class="fas fa-check" style="color:#00e676;margin-right:8px;"></i> Más de 8 servicios especializados en un solo lugar</li>
        <li style="padding:12px;background:#141414;border-radius:10px;margin-bottom:8px;border:1px solid #222;"><i class="fas fa-check" style="color:#00e676;margin-right:8px;"></i> Experiencia comprobada en todo tipo de vehículos</li>
        <li style="padding:12px;background:#141414;border-radius:10px;margin-bottom:8px;border:1px solid #222;"><i class="fas fa-check" style="color:#00e676;margin-right:8px;"></i> Materiales y equipos de marcas reconocidas</li>
        <li style="padding:12px;background:#141414;border-radius:10px;margin-bottom:8px;border:1px solid #222;"><i class="fas fa-check" style="color:#00e676;margin-right:8px;"></i> Garantía en todas las instalaciones</li>
        <li style="padding:12px;background:#141414;border-radius:10px;margin-bottom:8px;border:1px solid #222;"><i class="fas fa-check" style="color:#00e676;margin-right:8px;"></i> Cotización gratuita por WhatsApp</li>
        <li style="padding:12px;background:#141414;border-radius:10px;margin-bottom:8px;border:1px solid #222;"><i class="fas fa-check" style="color:#00e676;margin-right:8px;"></i> Horario flexible, incluyendo fines de semana</li>
        <li style="padding:12px;background:#141414;border-radius:10px;margin-bottom:8px;border:1px solid #222;"><i class="fas fa-check" style="color:#00e676;margin-right:8px;"></i> Trabajo prolijo, limpio y profesional</li>
      </ul>

      <div style="margin-top:32px;text-align:center;">
        <a href="https://wa.me/{PHONE}?text=Hola%2C%20quiero%20cotizar" target="_blank" class="btn btn-whatsapp"><i class="fab fa-whatsapp"></i> Cotizar por WhatsApp</a>
      </div>
    </section>
  </main>
''' + FOOTER + '\n</body>\n</html>')
print('  ✓ quienes-somos.html')

# ============================================================
# 2. CONTACTO
# ============================================================
print('=== Generando contacto.html ===')
with open(f'{REPO}/contacto.html', 'w') as f:
    f.write(html_head(
        'Contacto | Car Audio Pro 🟢 - Servicio a Domicilio en Santiago',
        'Contáctanos para cotizar car audio, cámaras, alarmas, GPS y más con servicio a domicilio en Santiago. WhatsApp: +56945070308. Respondemos en minutos.',
        'contacto car audio Santiago, cotizar car audio domicilio, WhatsApp car audio Chile',
        f'{SITE}/contacto.html',
        'Contacto | Car Audio Pro 🟢',
        'Cotiza car audio con servicio a domicilio en Santiago.'
    ) + '\n<body>\n' + NAVBAR + f'''
  <main>
    <section class="hero" style="padding:60px 20px;text-align:center;">
      <div class="hero-content">
        <span class="hero-badge">🟢 Contacto</span>
        <h1>Contacto - <span class="text-green">Servicio a Domicilio en Santiago</span></h1>
        <p class="hero-desc">Cotiza gratis tu instalación de car audio, cámaras, alarmas o GPS. Respondemos por WhatsApp en minutos.</p>
      </div>
    </section>

    <section style="padding:60px 20px;">
      <div class="container" style="max-width:1000px;">
        <div class="contact-grid">
          <div class="contact-info">
            <div class="contact-item">
              <i class="fab fa-whatsapp"></i>
              <div>
                <h4>WhatsApp Directo</h4>
                <a href="https://wa.me/{PHONE}" target="_blank">{PHONE_DISPLAY}</a>
                <p style="font-size:0.85rem;">Respondemos en minutos durante horario de atención</p>
              </div>
            </div>
            <div class="contact-item">
              <i class="fas fa-map-marker-alt"></i>
              <div>
                <h4>Cobertura</h4>
                <p>Servicio a domicilio en toda la Región Metropolitana de Santiago</p>
              </div>
            </div>
            <div class="contact-item">
              <i class="fas fa-clock"></i>
              <div>
                <h4>Horario</h4>
                <p>Lunes a Sábado: 9:00 AM - 8:00 PM</p>
                <p style="font-size:0.85rem;">Emergencias: WhatsApp 24/7</p>
              </div>
            </div>
            <div class="contact-item">
              <i class="fas fa-shield-alt"></i>
              <div>
                <h4>Garantía</h4>
                <p>Todas nuestras instalaciones tienen garantía</p>
              </div>
            </div>
          </div>
          <form class="contact-form" id="contactForm">
            <h3 style="margin-bottom:16px;">Solicita tu presupuesto</h3>
            <input type="text" id="nombre" name="nombre" placeholder="Nombre completo *" required>
            <input type="tel" id="telefono" name="telefono" placeholder="Teléfono / WhatsApp *" required>
            <select id="servicio" name="servicio" required>
              <option value="">Selecciona un servicio *</option>
              <option value="Car Audio">Instalación de Car Audio</option>
              <option value="Ecualización">Calibración y Ecualización DSP</option>
              <option value="Pantallas">Pantallas y Radios Android</option>
              <option value="Cámaras">Cámaras de Retroceso</option>
              <option value="Alarmas">Alarmas y GPS</option>
              <option value="Reparación">Reparación de Plantas</option>
              <option value="Cajones">Cajones Acústicos</option>
              <option value="Cableado">Cableado Profesional</option>
            </select>
            <input type="text" id="vehiculo" name="vehiculo" placeholder="Marca y modelo de tu vehículo">
            <input type="text" id="comuna" name="comuna" placeholder="Tu comuna en Santiago">
            <textarea id="mensaje" name="mensaje" placeholder="Describe lo que necesitas (equipo actual, problema, etc.)"></textarea>
            <button type="submit" class="btn btn-whatsapp btn-full"><i class="fab fa-whatsapp"></i> Enviar por WhatsApp</button>
          </form>
        </div>
      </div>
    </section>
  </main>
''' + FOOTER + '\n</body>\n</html>')
print('  ✓ contacto.html')

# ============================================================
# 3. FAQ
# ============================================================
print('=== Generando faq.html ===')
faqs = [
    ('¿Hacen servicio a domicilio en Santiago?', 'Sí. Vamos directamente a tu domicilio en toda la Región Metropolitana de Santiago. No necesitas llevar tu auto a ningún taller. Ahorras tiempo y evitas riesgos de traslado.'),
    ('¿Qué servicios de car audio ofrecen?', 'Instalación de car audio, calibración con DSP, ecualización, pantallas Android, cámaras de retroceso, alarmas, GPS, reparación de plantas y cajones acústicos a medida. Todo con servicio a domicilio en Santiago.'),
    ('¿Cuánto cuesta la instalación a domicilio?', 'El precio varía según el tipo de instalación, el vehículo y los materiales necesarios. Cotiza gratis por WhatsApp al +56945070308 con respuesta inmediata.'),
    ('¿En qué comunas atienden?', 'Atendemos en toda la Región Metropolitana: Providencia, Las Condes, Ñuñoa, Vitacura, La Reina, Lo Barnechea, Maipú, Puente Alto, La Florida, San Miguel y más de 50 comunas.'),
    ('¿La instalación tiene garantía?', 'Sí, todas nuestras instalaciones tienen garantía. Si algo no funciona correctamente, volvemos a solucionarlo sin costo adicional.'),
    ('¿Cómo agendo una visita?', 'Por WhatsApp al +56945070308 o mediante el formulario de contacto. Coordinamos día y horario según tu preferencia.'),
    ('¿Trabajan todos los días?', 'Atendemos de lunes a sábado de 9:00 AM a 8:00 PM. Para emergencias, contáctanos por WhatsApp.'),
    ('¿Qué marcas de equipo instalan?', 'Instalamos todas las marcas: Pioneer, JVC, Kenwood, Sony, Alpine, Rockford Fosgate, JBL, Kicker y más. También puedes comprar el equipo y nosotros lo instalamos.'),
    ('¿Hacen reparación de plantas amplificadoras?', 'Sí. Diagnosticamos y reparamos amplificadores de todas las marcas y potencias: transistores, capacitores, fuentes de alimentación y circuitos dañados.'),
    ('¿Fabrican cajones acústicos a medida?', 'Sí. Construimos cajas selladas, porteadas y bandpass calculadas específicamente para tu subwoofer, maximizando la respuesta de bajos.'),
    ('¿Instalan cámaras de retroceso en cualquier auto?', 'Sí. Instalamos cámaras de retroceso con visión nocturna y líneas guía en cualquier vehículo, integrándolas a la pantalla existente o instalando una nueva.'),
    ('¿El cableado es profesional?', 'Sí. Usamos cables de calibre adecuado, fusibles, relés y conectores de primera calidad. El cableado es prolijo y seguro.'),
    ('¿Aceptan tarjeta o transferencia?', 'Aceptamos transferencia bancaria y efectivo. Para tarjetas, consúltanos por WhatsApp.'),
    ('¿Hacen factura?', 'Sí, emitimos boleta o factura según tu requerimiento.'),
    ('¿Cuánto dura una instalación?', 'Depende del servicio. Una cámara de retroceso toma 1-2 horas, una instalación completa de car audio puede tomar 3-5 horas, y una calibración DSP 1-2 horas.'),
]
faq_jsonld = '<script type="application/ld+json">{"@context":"https://schema.org","@type":"FAQPage","mainEntity":[' + ','.join(
    f'{{"@type":"Question","name":"{q}","acceptedAnswer":{{"@type":"Answer","text":"{a}"}}}}' for q,a in faqs
) + ']}</script>'
with open(f'{REPO}/faq.html', 'w') as f:
    f.write(html_head(
        'Preguntas Frecuentes | Car Audio Pro 🟢 - Servicio a Domicilio en Santiago',
        'Resolvemos tus dudas sobre car audio, cámaras, alarmas, GPS, ecualización, precios y servicio a domicilio en Santiago. Cotiza gratis por WhatsApp.',
        'preguntas frecuentes car audio, FAQ car audio Santiago, dudas instalacion car audio',
        f'{SITE}/faq.html',
        'Preguntas Frecuentes | Car Audio Pro',
        'Dudas frecuentes sobre car audio y servicio a domicilio en Santiago.'
    ) + '\n<body>\n' + NAVBAR + f'''
  <main>
    <section class="hero" style="padding:60px 20px;text-align:center;">
      <div class="hero-content">
        <span class="hero-badge">FAQ</span>
        <h1>Preguntas Frecuentes - <span class="text-green">Servicio a Domicilio en Santiago</span></h1>
        <p class="hero-desc">Resolvemos tus dudas sobre car audio, cámaras, alarmas, GPS, precios y atención.</p>
      </div>
    </section>
    <section style="padding:60px 20px;">
      <div style="max-width:800px;margin:0 auto;">
        <div class="faq-list">
''' + '\n'.join(
    f'          <details class="faq-item"><summary>{q}</summary><p>{a}</p></details>' for q,a in faqs
) + f'''
        </div>
        <div style="margin-top:32px;text-align:center;padding:24px;background:#141414;border-radius:12px;border:1px solid #222;">
          <h3 style="margin-bottom:12px;">¿Tienes otra duda?</h3>
          <p style="color:#999;margin-bottom:16px;">Escríbenos por WhatsApp y te respondemos en minutos.</p>
          <a href="https://wa.me/{PHONE}?text=Hola%2C%20tengo%20una%20duda" target="_blank" class="btn btn-whatsapp"><i class="fab fa-whatsapp"></i> WhatsApp: {PHONE_DISPLAY}</a>
        </div>
      </div>
    </section>
  </main>
''' + FOOTER + '\n</body>\n</html>')
print('  ✓ faq.html')

# ============================================================
# 4. POLITICA DE GARANTIA
# ============================================================
print('=== Generando politica-garantia.html ===')
with open(f'{REPO}/politica-garantia.html', 'w') as f:
    f.write(html_head(
        'Política de Garantía | Car Audio Pro 🟢 - Servicio a Domicilio en Santiago',
        'Política de garantía de Car Audio Pro. Todas nuestras instalaciones de car audio, cámaras, alarmas y GPS tienen garantía. Conoce los términos y condiciones.',
        'garantia car audio, politica garantia instalacion, servicio a domicilio garantia',
        f'{SITE}/politica-garantia.html',
        'Política de Garantía | Car Audio Pro',
        'Garantía en todas las instalaciones de car audio con servicio a domicilio en Santiago.'
    ) + '\n<body>\n' + NAVBAR + '''
  <main>
    <section class="hero" style="padding:60px 20px;text-align:center;">
      <div class="hero-content">
        <span class="hero-badge">🟢 Garantía</span>
        <h1>Política de Garantía - <span class="text-green">Servicio a Domicilio en Santiago</span></h1>
        <p class="hero-desc">Todas nuestras instalaciones tienen garantía. Tu satisfacción es nuestra prioridad.</p>
      </div>
    </section>
    <section style="padding:60px 20px;max-width:800px;margin:0 auto;">
      <div style="background:#141414;border:1px solid #00e676;border-radius:12px;padding:24px;margin-bottom:24px;">
        <h2 style="color:#00e676;margin-bottom:12px;">Garantía de Instalación</h2>
        <p style="color:#999;line-height:1.8;">Todas las instalaciones realizadas por Car Audio Pro tienen una garantía de <strong style="color:#fff;">90 días</strong> sobre la mano de obra. Esto significa que si la instalación presenta algún problema técnico dentro de los 90 días posteriores al servicio, volveremos a solucionarlo <strong style="color:#00e676;">sin costo adicional</strong>.</p>
      </div>
      <div style="background:#141414;border:1px solid #222;border-radius:12px;padding:24px;margin-bottom:24px;">
        <h2 style="margin-bottom:12px;">¿Qué cubre la garantía?</h2>
        <ul style="list-style:none;padding:0;">
          <li style="padding:10px 0;color:#999;border-bottom:1px solid #222;"><i class="fas fa-check" style="color:#00e676;margin-right:8px;"></i> Mano de obra de la instalación</li>
          <li style="padding:10px 0;color:#999;border-bottom:1px solid #222;"><i class="fas fa-check" style="color:#00e676;margin-right:8px;"></i> Cableado y conexiones realizadas</li>
          <li style="padding:10px 0;color:#999;border-bottom:1px solid #222;"><i class="fas fa-check" style="color:#00e676;margin-right:8px;"></i> Configuración y calibración de equipos</li>
          <li style="padding:10px 0;color:#999;border-bottom:1px solid #222;"><i class="fas fa-check" style="color:#00e676;margin-right:8px;"></i> Integración de cámaras y pantallas</li>
          <li style="padding:10px 0;color:#999;"><i class="fas fa-check" style="color:#00e676;margin-right:8px;"></i> Programación de alarmas y GPS</li>
        </ul>
      </div>
      <div style="background:#141414;border:1px solid #222;border-radius:12px;padding:24px;margin-bottom:24px;">
        <h2 style="margin-bottom:12px;">¿Qué NO cubre la garantía?</h2>
        <ul style="list-style:none;padding:0;">
          <li style="padding:10px 0;color:#999;border-bottom:1px solid #222;"><i class="fas fa-times" style="color:#f44336;margin-right:8px;"></i> Daños causados por terceros o accidentes</li>
          <li style="padding:10px 0;color:#999;border-bottom:1px solid #222;"><i class="fas fa-times" style="color:#f44336;margin-right:8px;"></i> Equipos dañados por mal uso del cliente</li>
          <li style="padding:10px 0;color:#999;border-bottom:1px solid #222;"><i class="fas fa-times" style="color:#f44336;margin-right:8px;"></i> Modificaciones realizadas por terceros</li>
          <li style="padding:10px 0;color:#999;border-bottom:1px solid #222;"><i class="fas fa-times" style="color:#f44336;margin-right:8px;"></i> Daños por agua, fuego o factores externos</li>
          <li style="padding:10px 0;color:#999;"><i class="fas fa-times" style="color:#f44336;margin-right:8px;"></i> Desgaste normal por uso</li>
        </ul>
      </div>
      <div style="background:#141414;border:1px solid #222;border-radius:12px;padding:24px;">
        <h2 style="margin-bottom:12px;">Garantía de Equipos</h2>
        <p style="color:#999;line-height:1.8;">Los equipos (parlantes, pantallas, alarmas, etc.) tienen la garantía del fabricante. Si un equipo presenta fallas de fábrica, gestionamos el cambio directamente con el proveedor. Si tú compras el equipo, la garantía del producto la maneja el fabricante.</p>
      </div>
    </section>
  </main>
''' + FOOTER + '\n</body>\n</html>')
print('  ✓ politica-garantia.html')

print('\n=== Páginas estáticas completadas ===')
