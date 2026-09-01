// src/lib/business-data.ts
// Información centralizada de SAMSARA TATTOO STUDIO.

export const BUSINESS = {
  name: "SAMSARA TATTOO STUDIO",
  artist: "Wilfren Jiménez",
  artistName: "Wilfren Jiménez",
  artistRole: "Artista Corporal y Visual",
  url: "https://samsaratattoostgo.com",
  tagline:
    "Si tienes planes de realizar un nuevo proyecto, te puedo acompañar en el proceso de creación para que tu idea junto a mi experiencia creemos algo único y personalizado.",
  experienceYears: 11,
  phoneDisplay: "+56945070308",
  phoneRaw: "56945070308",
  whatsappUrl:
    "https://wa.me/56945070308?text=Hola%20Samsara%2C%20quiero%20cotizar%20un%20tatuaje",
  whatsappBaseUrl: "https://wa.me/56945070308",
  addressStreet: "Guardia Vieja 181, Oficina 706",
  addressComuna: "Providencia",
  addressRegion: "Región Metropolitana",
  addressCountry: "Chile",
  postalCode: "7500000",
  hours: "Lunes a Sábado de 10:00 AM a 9:00 PM - Prevista cita y horarios flexibles",
  mapsUrl: "https://maps.google.com/?q=Guardia+Vieja+181+Providencia+Santiago+Chile",
  logoUrl: "/images/samsara-tattoo-estudio-tatuajes-en-santiago-chile.jpeg",
  bannerUrl: "/banner.jpg",
  faviconUrl: "/favicon.jpg",
  geo: {
    region: "CL-RM",
    placeName: "Providencia, Santiago de Chile",
    latitude: -33.4436,
    longitude: -70.6219,
  },
  instagrams: [
    {
      label: "Estudio",
      handle: "@samsara_stgo",
      url: "https://www.instagram.com/samsara_stgo",
    },
    {
      label: "Tatuajes / Personal",
      handle: "@wilfren_jimenez",
      url: "https://www.instagram.com/wilfren_jimenez",
    },
    {
      label: "Aerografía / Galería",
      handle: "@wil_airbrush",
      url: "https://www.instagram.com/wil_airbrush",
    },
  ],
};

export const SITE_URL = BUSINESS.url;

export function buildWhatsAppUrl(message?: string): string {
  const text = message
    ? encodeURIComponent(message)
    : "Hola Samsara, quiero cotizar un tatuaje";
  return `${BUSINESS.whatsappBaseUrl}?text=${text}`;
}

export interface Service {
  slug: string;
  title: string;
  shortDescription: string;
  longDescription: string;
  icon: string; // nombre del icono lucide-react
  category: "tatuaje" | "arte";
  features: string[];
  keywords: string[];
}

export const SERVICES: Service[] = [
  {
    slug: "tatuaje-realismo",
    title: "Tatuaje Realismo",
    shortDescription:
      "Retratos, animales, paisajes y esculturas con sombreado de alta fidelidad.",
    longDescription:
      "El realismo es una de las técnicas más exigentes del tatuaje. Wilfren Jiménez, con 11 años de experiencia, plasma retratos, animales, paisajes y esculturas con sombreado de alta fidelidad, logrando piezas únicas que parecen fotografías en la piel.",
    icon: "Brush",
    category: "tatuaje",
    features: [
      "Retratos hiperrealistas en blanco y negro o color",
      "Animales y paisajes con alto nivel de detalle",
      "Sombreado suave y degradados profesionales",
      "Tintas de primera calidad importadas",
    ],
    keywords: [
      "tatuaje realismo Santiago",
      "tatuador realista Providencia",
      "retratos en piel Chile",
    ],
  },
  {
    slug: "tatuaje-linea-fina",
    title: "Tatuaje Línea Fina",
    shortDescription:
      "Fine Line y minimalismo: líneas delicadas con precisión milimétrica.",
    longDescription:
      "El tatuaje de línea fina (Fine Line) es perfecto para quienes buscan diseños minimalistas, delicados y elegantes. Trabajamos con agujas especiales y técnica milimétrica para lograr trazos limpios y duraderos en cualquier zona del cuerpo.",
    icon: "PenLine",
    category: "tatuaje",
    features: [
      "Líneas finas y precisas con agujas especializadas",
      "Diseños minimalistas y delicados",
      "Ideal para muñecas, tobillos, cuello y dedos",
      "Tintas negras de alta definición",
    ],
    keywords: [
      "tatuaje linea fina Santiago",
      "fine line Providencia",
      "tatuajes minimalistas Chile",
    ],
  },
  {
    slug: "tatuaje-lettering",
    title: "Tatuaje Lettering",
    shortDescription:
      "Caligrafía personalizada: nombres, frases y citas en distintos estilos.",
    longDescription:
      "El lettering es el arte de tatuar textos con tipografía y caligrafía personalizada. Diseñamos nombres, fechas, frases y citas en distintos estilos caligráficos, desde gótico hasta cursiva moderna, adaptando cada letra al espacio y la piel del cliente.",
    icon: "Type",
    category: "tatuaje",
    features: [
      "Caligrafía personalizada a mano alzada",
      "Estilos: gótico, cursiva, old school, moderna",
      "Nombres, fechas, frases y citas",
      "Composición adaptada al cuerpo",
    ],
    keywords: [
      "tatuaje lettering Santiago",
      "caligrafía en piel Chile",
      "tatuajes de nombres Providencia",
    ],
  },
  {
    slug: "tatuaje-blackwork",
    title: "Tatuaje Blackwork",
    shortDescription:
      "Trabajos a gran escala en negro: ornamental, dotwork y geométrico.",
    longDescription:
      "El blackwork abarca todos los trabajos a gran escala realizados exclusivamente con tinta negra: ornamental, dotwork, geométrico, mandalas y proyectos de manga completa. Wilfren domina esta técnica con proyectos de alto impacto visual.",
    icon: "Circle",
    category: "tatuaje",
    features: [
      "Proyectos de manga completa y espalda",
      "Ornamental, dotwork y geométrico",
      "Cobertura y contraste profesional",
      "Sesiones largas con protocolos de bioseguridad",
    ],
    keywords: [
      "tatuaje blackwork Santiago",
      "manga tatuaje Chile",
      "tatuaje ornamental Providencia",
    ],
  },
  {
    slug: "tatuaje-personalizado",
    title: "Tatuaje Personalizado",
    shortDescription:
      "Asesoría y diseño 100% a medida para tu idea y tu piel.",
    longDescription:
      "Cada persona es única, y su tatuaje también debe serlo. Ofrecemos asesoría y diseño 100% personalizado: analizamos tu idea, la adaptamos a tu piel, estilo y zona corporal, y creamos una pieza única que nadie más tendrá.",
    icon: "Sparkles",
    category: "tatuaje",
    features: [
      "Asesoría previa sin costo",
      "Bocetos y ajustes hasta approval final",
      "Diseño único adaptado a tu piel",
      "Sesión privada con el artista",
    ],
    keywords: [
      "tatuaje personalizado Santiago",
      "diseño de tatuaje a medida Chile",
      "tatuaje único Providencia",
    ],
  },
  {
    slug: "tatuaje-microrealismo",
    title: "Tatuaje Micro Realismo",
    shortDescription:
      "Realismo en miniatura: detalles diminutos con alta fidelidad.",
    longDescription:
      "El microrealismo es una técnica especializada que consiste en tatuar imágenes realistas en tamaños muy pequeños (2-5 cm), conservando todos los detalles y sombreados. Ideal para quienes buscan un tatuaje discreto pero impactante.",
    icon: "Microscope",
    category: "tatuaje",
    features: [
      "Piezas de 2-5 cm con detalles completos",
      "Tintas especiales para micro detalles",
      "Sombreado suave en espacios reducidos",
      "Ideal para detrás de la oreja, muñeca, dedo",
    ],
    keywords: [
      "microrealismo Santiago",
      "tatuaje pequeño Providencia",
      "tatuaje minimalista Chile",
    ],
  },
  {
    slug: "tatuaje-geometria",
    title: "Tatuaje Geometría",
    shortDescription:
      "Mandalas, figuras sagradas y composiciones geométricas simétricas.",
    longDescription:
      "La geometría sagrada y los mandalas son composiciones simétricas que combinan precisión matemática con significado espiritual. Wilfren diseña mandalas, flor de la vida, metatron y figuras geométricas perfectas en cualquier tamaño.",
    icon: "Hexagon",
    category: "tatuaje",
    features: [
      "Mandalas y geometría sagrada",
      "Simetría perfecta y proporciones áureas",
      "Dotwork y linework combinados",
      "Tatuajes con significado espiritual",
    ],
    keywords: [
      "tatuaje geometría Santiago",
      "mandala tatuaje Chile",
      "geometría sagrada Providencia",
    ],
  },
  {
    slug: "aerografia",
    title: "Aerografía (Airbrush Art)",
    shortDescription:
      "Pintura con aerógrafo de alto nivel: murales, lienzos, cascos y más.",
    longDescription:
      "Wilfren Jiménez también es aerografista profesional. Con técnica de airbrush crea murales, lienzos, cascos, motos, guitarras y cualquier superficie personalizable. La aerografía permite degradados suaves y efectos imposibles con pincel.",
    icon: "Wind",
    category: "arte",
    features: [
      "Murales y grandes formatos",
      "Cascos, motos, guitarras y objetos",
      "Encargos personalizados por comisión",
      "Servicio a domicilio en Santiago para grandes piezas",
    ],
    keywords: [
      "aerografía Santiago",
      "airbrush art Chile",
      "pintura con aerógrafo Providencia",
      "aerografía a domicilio Santiago",
    ],
  },
  {
    slug: "pintura-acrilica",
    title: "Pintura Acrílica",
    shortDescription:
      "Obras en acrílico para decoración y coleccionistas.",
    longDescription:
      "Pinturas en acrílico sobre lienzo para decoración de espacios y coleccionistas. Obras originales con temáticas variadas: realismo, abstracto, retratos y composiciones únicas firmadas por el artista.",
    icon: "Palette",
    category: "arte",
    features: [
      "Obras originales sobre lienzo",
      "Temáticas personalizadas por encargo",
      "Certificado de autenticidad",
      "Envíos a todo Chile",
    ],
    keywords: [
      "pintura acrílica Santiago",
      "obras de arte Chile",
      "cuadros personalizados Providencia",
    ],
  },
  {
    slug: "pintura-acuarela",
    title: "Pintura Acuarela",
    shortDescription:
      "Acuarelas delicadas para decoración y coleccionistas.",
    longDescription:
      "Acuarelas sobre papel de algodón con técnicas tradicionales y contemporáneas. Obras delicadas ideales para decoración de interiores, regalos personalizados y coleccionismo de arte chileno.",
    icon: "Droplet",
    category: "arte",
    features: [
      "Papel de algodón de alta gramaje",
      "Técnicas húmedas y secas",
      "Encargos personalizados",
      "Certificado de autenticidad",
    ],
    keywords: [
      "pintura acuarela Santiago",
      "acuarelas Chile",
      "acuarela personalizada Providencia",
    ],
  },
  {
    slug: "galeria-arte",
    title: "Galería de Arte",
    shortDescription:
      "Obras originales y exposiciones en la galería del estudio.",
    longDescription:
      "En Samsara Tattoo Studio también contamos con una galería de arte con obras originales de Wilfren Jiménez: pinturas, acuarelas y aerografías disponibles para venta. Visitas con cita previa en Providencia.",
    icon: "Image",
    category: "arte",
    features: [
      "Obras originales en venta",
      "Visitas con cita previa",
      "Diferentes formatos y técnicas",
      "Certificado de autenticidad",
    ],
    keywords: [
      "galería de arte Santiago",
      "obras en venta Chile",
      "galería Providencia",
    ],
  },
  {
    slug: "encargos-comision",
    title: "Encargos por Comisión",
    shortDescription:
      "Obras y tatuajes 100% personalizados por encargo.",
    longDescription:
      "Aceptamos encargos por comisión para obras únicas: pinturas, aerografías, tatuajes y proyectos especiales. Cuéntanos tu idea y la materializamos en la técnica que mejor se adapte.",
    icon: "Brush",
    category: "arte",
    features: [
      "Consultoría inicial sin compromiso",
      "Bocetos y aprobación previa",
      "Plazos definidos por proyecto",
      "Obras 100% únicas y firmadas",
    ],
    keywords: [
      "encargo pintura Santiago",
      "comisión obra de arte Chile",
      "encargo tatuaje Providencia",
    ],
  },
];

export interface Comuna {
  slug: string;
  name: string;
  coords?: { lat: number; lng: number };
}

export const COMUNAS: Comuna[] = [
  { slug: "providencia", name: "Providencia", coords: { lat: -33.4436, lng: -70.6219 } },
  { slug: "las-condes", name: "Las Condes", coords: { lat: -33.4181, lng: -70.5531 } },
  { slug: "nunoa", name: "Ñuñoa", coords: { lat: -33.4586, lng: -70.6033 } },
  { slug: "vitacura", name: "Vitacura", coords: { lat: -33.3969, lng: -70.6056 } },
  { slug: "la-reina", name: "La Reina", coords: { lat: -33.4472, lng: -70.5503 } },
  { slug: "lo-barnechea", name: "Lo Barnechea", coords: { lat: -33.3544, lng: -70.5256 } },
  { slug: "santiago", name: "Santiago Centro", coords: { lat: -33.4489, lng: -70.6693 } },
  { slug: "recoleta", name: "Recoleta", coords: { lat: -33.4069, lng: -70.6394 } },
  { slug: "independencia", name: "Independencia", coords: { lat: -33.4197, lng: -70.6639 } },
  { slug: "estacion-central", name: "Estación Central", coords: { lat: -33.4614, lng: -70.7039 } },
  { slug: "quinta-normal", name: "Quinta Normal", coords: { lat: -33.4383, lng: -70.6997 } },
  { slug: "macul", name: "Macul", coords: { lat: -33.4797, lng: -70.5986 } },
  { slug: "penalolen", name: "Peñalolén", coords: { lat: -33.4989, lng: -70.5767 } },
  { slug: "la-florida", name: "La Florida", coords: { lat: -33.5286, lng: -70.5747 } },
  { slug: "puente-alto", name: "Puente Alto", coords: { lat: -33.6167, lng: -70.575 } },
  { slug: "maipu", name: "Maipú", coords: { lat: -33.5181, lng: -70.7589 } },
  { slug: "pudahuel", name: "Pudahuel", coords: { lat: -33.4269, lng: -70.7533 } },
  { slug: "quilicura", name: "Quilicura", coords: { lat: -33.3536, lng: -70.7236 } },
  { slug: "huechuraba", name: "Huechuraba", coords: { lat: -33.3708, lng: -70.6531 } },
  { slug: "conchali", name: "Conchalí", coords: { lat: -33.3858, lng: -70.6689 } },
  { slug: "renca", name: "Renca", coords: { lat: -33.4036, lng: -70.7186 } },
  { slug: "cerro-navia", name: "Cerro Navia", coords: { lat: -33.4414, lng: -70.7406 } },
  { slug: "lo-prado", name: "Lo Prado", coords: { lat: -33.4478, lng: -70.7256 } },
  { slug: "cerrillos", name: "Cerrillos", coords: { lat: -33.5025, lng: -70.7197 } },
  { slug: "lo-espejo", name: "Lo Espejo", coords: { lat: -33.5389, lng: -70.7108 } },
  { slug: "pedro", name: "Pedro Aguirre Cerda", coords: { lat: -33.5, lng: -70.6833 } },
  { slug: "san-miguel", name: "San Miguel", coords: { lat: -33.4961, lng: -70.6533 } },
  { slug: "san-joaquin", name: "San Joaquín", coords: { lat: -33.4908, lng: -70.6378 } },
  { slug: "la-cisterna", name: "La Cisterna", coords: { lat: -33.5372, lng: -70.6781 } },
  { slug: "la-granja", name: "La Granja", coords: { lat: -33.5514, lng: -70.6281 } },
  { slug: "la-pintana", name: "La Pintana", coords: { lat: -33.5867, lng: -70.5861 } },
  { slug: "san-ramon", name: "San Ramón", coords: { lat: -33.5422, lng: -70.5756 } },
  { slug: "el-bosque", name: "El Bosque", coords: { lat: -33.5564, lng: -70.6719 } },
  { slug: "san-bernardo", name: "San Bernardo", coords: { lat: -33.5856, lng: -70.7003 } },
  { slug: "calera-de-tango", name: "Calera de Tango", coords: { lat: -33.8658, lng: -70.7819 } },
  { slug: "buin", name: "Buin", coords: { lat: -33.7313, lng: -70.7411 } },
  { slug: "paine", name: "Paine", coords: { lat: -33.7939, lng: -70.7356 } },
  { slug: "colina", name: "Colina", coords: { lat: -33.2012, lng: -70.6747 } },
  { slug: "lampa", name: "Lampa", coords: { lat: -33.2756, lng: -70.8769 } },
  { slug: "til-til", name: "Til Til", coords: { lat: -33.0833, lng: -70.9189 } },
  { slug: "melipilla", name: "Melipilla", coords: { lat: -33.6892, lng: -71.2189 } },
  { slug: "alhue", name: "Alhué", coords: { lat: -33.8297, lng: -71.2108 } },
  { slug: "curacavi", name: "Curacaví", coords: { lat: -33.4089, lng: -71.1414 } },
  { slug: "maria", name: "María Pinto", coords: { lat: -33.5064, lng: -70.5917 } },
  { slug: "el-monte", name: "El Monte", coords: { lat: -33.6742, lng: -70.7825 } },
  { slug: "padre-hurtado", name: "Padre Hurtado", coords: { lat: -33.5647, lng: -70.8039 } },
  { slug: "penaflor", name: "Peñaflor", coords: { lat: -33.6114, lng: -70.8858 } },
  { slug: "isla-de-maipo", name: "Isla de Maipo", coords: { lat: -33.7544, lng: -70.8792 } },
  { slug: "san-pedro", name: "San Pedro", coords: { lat: -33.6903, lng: -70.7083 } },
  { slug: "san-jose-de-maipo", name: "San José de Maipo", coords: { lat: -33.6306, lng: -70.3556 } },
  { slug: "pirque", name: "Pirque", coords: { lat: -33.7347, lng: -70.5653 } },
  { slug: "puente-alto", name: "Puente Alto", coords: { lat: -33.6167, lng: -70.575 } },
];

export function getComunaBySlug(slug: string): Comuna | undefined {
  return COMUNAS.find((c) => c.slug === slug);
}

export function getServiceBySlug(slug: string): Service | undefined {
  return SERVICES.find((s) => s.slug === slug);
}
