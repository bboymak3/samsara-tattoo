// Car Audio Pro - Script
// WhatsApp, validación formulario, navbar scroll, comunas

const WHATSAPP_NUMBER = '56945070308';
const SITE_URL = 'https://car-audio-pro.pages.dev';

// === 54 Comunas de la Región Metropolitana ===
const COMUNAS = [
  'Providencia','Las Condes','Ñuñoa','Vitacura','La Reina','Lo Barnechea',
  'Santiago Centro','Recoleta','Independencia','Estación Central','Macul',
  'Peñalolén','La Florida','Puente Alto','Maipú','Pudahuel','Quilicura',
  'Huechuraba','Conchalí','Renca','Cerro Navia','Lo Prado','Cerrillos',
  'Lo Espejo','Pedro Aguirre Cerda','San Miguel','San Joaquín','La Cisterna',
  'La Granja','La Pintana','San Ramón','El Bosque','San Bernardo',
  'Calera de Tango','Buin','Paine','Colina','Lampa','Til Til','Melipilla',
  'Alhué','Curacaví','María Pinto','El Monte','Padre Hurtado','Peñaflor',
  'Isla de Maipo','San Pedro','San José de Maipo','Pirque','Quinta Normal',
  'Cerrillos','La Reina'
];

// === Render comunas en home ===
function renderComunas() {
  const grid = document.getElementById('comunasGrid');
  if (!grid) return;
  const slugify = (name) =>
    name.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

  grid.innerHTML = COMUNAS.map(comuna => {
    const slug = slugify(comuna);
    return `<a href="/comunas/${slug}.html" class="comuna-chip">
      <i class="fas fa-map-marker-alt"></i> ${comuna}
    </a>`;
  }).join('');

  // Footer comunas (primeras 8)
  const footerComunas = document.getElementById('footerComunas');
  if (footerComunas) {
    footerComunas.innerHTML = COMUNAS.slice(0, 8).map(comuna => {
      const slug = slugify(comuna);
      return `<li><a href="/comunas/${slug}.html">${comuna}</a></li>`;
    }).join('');
  }
}

// === Navbar scroll effect ===
function initNavbar() {
  const navbar = document.getElementById('navbar');
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');

  if (navbar) {
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 8);
    });
  }

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      navMenu.classList.toggle('open');
    });
    // Close on link click
    navMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => navMenu.classList.remove('open'));
    });
  }
}

// === Formulario de contacto -> WhatsApp ===
function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const nombre = document.getElementById('nombre').value.trim();
    const telefono = document.getElementById('telefono').value.trim();
    const servicio = document.getElementById('servicio').value;
    const mensaje = document.getElementById('mensaje').value.trim();

    if (!nombre || !telefono || !servicio) {
      alert('Por favor completa todos los campos obligatorios (*).');
      return;
    }

    const text = `Hola Car Audio Pro, soy ${nombre}.
Mi teléfono: ${telefono}
Servicio: ${servicio}
${mensaje ? 'Detalle: ' + mensaje : ''}`;

    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');

    // También enviar al API de D1 (si está configurado)
    fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nombre, telefono, servicio, mensaje })
    }).catch(() => {}); // Ignorar errores, el WhatsApp es lo principal

    form.reset();
  });
}

// === Lightbox simple para galería ===
function initGallery() {
  const items = document.querySelectorAll('.gallery-item img');
  if (!items.length) return;

  items.forEach(img => {
    img.addEventListener('click', () => {
      const overlay = document.createElement('div');
      overlay.style.cssText = `
        position:fixed;inset:0;z-index:200;background:rgba(0,0,0,0.95);
        display:flex;align-items:center;justify-content:center;padding:20px;cursor:pointer;
      `;
      overlay.innerHTML = `<img src="${img.src}" style="max-width:90%;max-height:90vh;border-radius:12px;">`;
      document.body.appendChild(overlay);
      overlay.addEventListener('click', () => overlay.remove());
    });
  });
}

// === Init ===
document.addEventListener('DOMContentLoaded', () => {
  renderComunas();
  initNavbar();
  initContactForm();
  initGallery();
});
