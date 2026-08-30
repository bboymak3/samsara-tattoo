// functions/api/contact.js
// Cloudflare Pages Function - Guarda cotizaciones en D1
// POST /api/contact -> inserta en tabla cotizaciones

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

export async function onRequestOptions() {
  return new Response(null, { headers: corsHeaders });
}

export async function onRequestPost(context) {
  const { request, env } = context;

  try {
    const body = await request.json();
    const { nombre, telefono, servicio, mensaje } = body;

    // Validación
    if (!nombre || !telefono || !servicio) {
      return new Response(JSON.stringify({ error: 'Faltan campos obligatorios' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Insertar en D1 si está disponible
    if (env.DB) {
      const result = await env.DB.prepare(
        'INSERT INTO cotizaciones (nombre, telefono, servicio, mensaje) VALUES (?, ?, ?, ?)'
      ).bind(
        String(nombre).substring(0, 200),
        String(telefono).substring(0, 50),
        String(servicio).substring(0, 100),
        mensaje ? String(mensaje).substring(0, 2000) : null
      ).run();

      return new Response(JSON.stringify({
        success: true,
        id: result.meta.last_row_id,
        message: 'Cotización guardada correctamente'
      }), {
        status: 201,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // D1 no disponible - solo confirmar
    return new Response(JSON.stringify({
      success: true,
      message: 'Cotización recibida (D1 no configurado)'
    }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    return new Response(JSON.stringify({
      error: 'Error interno del servidor',
      details: error.message
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
}
