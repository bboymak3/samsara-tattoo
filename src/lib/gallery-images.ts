// src/lib/gallery-images.ts
// 25 imágenes reales de tatuajes realizados en distintas comunas de Santiago.
// Cada foto tiene el nombre base SEO + "-comuna" al final.

export interface GalleryImage {
  src: string;
  alt: string;
  category: "tatuaje" | "pintura" | "aerografia";
  comuna?: string;
}

const BASE = "/images/tatuajes-doseño-tatuador-tauar-tatuajes-a-domicilio-estudio-de-tatuajes-estudio-de-tatoos-en-santiago";

export const GALLERY_IMAGES: GalleryImage[] = [
  { src: `${BASE}-providencia.jpeg`, alt: "Tatuajes en Providencia, Santiago de Chile - Samsara Tattoo Studio", category: "tatuaje", comuna: "providencia" },
  { src: `${BASE}-las-condes.jpeg`, alt: "Tatuajes en Las Condes, Santiago - Wilfren Jiménez", category: "tatuaje", comuna: "las-condes" },
  { src: `${BASE}-nunoa.jpeg`, alt: "Tatuajes en Ñuñoa, Santiago de Chile - Samsara", category: "tatuaje", comuna: "nunoa" },
  { src: `${BASE}-vitacura.jpeg`, alt: "Tatuajes en Vitacura, Santiago - estudio de tatuajes", category: "tatuaje", comuna: "vitacura" },
  { src: `${BASE}-la-reina.jpeg`, alt: "Tatuajes en La Reina, Santiago de Chile - Samsara Tattoo", category: "tatuaje", comuna: "la-reina" },
  { src: `${BASE}-lo-barnechea.jpeg`, alt: "Tatuajes en Lo Barnechea, Santiago - Wilfren Jiménez", category: "tatuaje", comuna: "lo-barnechea" },
  { src: `${BASE}-santiago.jpeg`, alt: "Tatuajes en Santiago Centro - Samsara Tattoo Studio", category: "tatuaje", comuna: "santiago" },
  { src: `${BASE}-recoleta.jpeg`, alt: "Tatuajes en Recoleta, Santiago de Chile - Samsara", category: "tatuaje", comuna: "recoleta" },
  { src: `${BASE}-independencia.jpeg`, alt: "Tatuajes en Independencia, Santiago - estudio de tatuajes", category: "tatuaje", comuna: "independencia" },
  { src: `${BASE}-estacion-central.jpeg`, alt: "Tatuajes en Estación Central, Santiago - Samsara Tattoo", category: "tatuaje", comuna: "estacion-central" },
  { src: `${BASE}-macul.jpeg`, alt: "Tatuajes en Macul, Santiago de Chile - Wilfren Jiménez", category: "tatuaje", comuna: "macul" },
  { src: `${BASE}-penalolen.jpeg`, alt: "Tatuajes en Peñalolén, Santiago - Samsara Tattoo Studio", category: "tatuaje", comuna: "penalolen" },
  { src: `${BASE}-la-florida.jpeg`, alt: "Tatuajes en La Florida, Santiago de Chile - Samsara", category: "tatuaje", comuna: "la-florida" },
  { src: `${BASE}-puente-alto.jpeg`, alt: "Tatuajes en Puente Alto, Santiago - Wilfren Jiménez", category: "tatuaje", comuna: "puente-alto" },
  { src: `${BASE}-maipu.jpeg`, alt: "Tatuajes en Maipú, Santiago de Chile - Samsara Tattoo", category: "tatuaje", comuna: "maipu" },
  { src: `${BASE}-pudahuel.jpeg`, alt: "Tatuajes en Pudahuel, Santiago - estudio de tatuajes", category: "tatuaje", comuna: "pudahuel" },
  { src: `${BASE}-quilicura.jpeg`, alt: "Tatuajes en Quilicura, Santiago de Chile - Samsara", category: "tatuaje", comuna: "quilicura" },
  { src: `${BASE}-huechuraba.jpeg`, alt: "Tatuajes en Huechuraba, Santiago - Wilfren Jiménez", category: "tatuaje", comuna: "huechuraba" },
  { src: `${BASE}-conchali.jpeg`, alt: "Tatuajes en Conchalí, Santiago de Chile - Samsara Tattoo", category: "tatuaje", comuna: "conchali" },
  { src: `${BASE}-renca.jpeg`, alt: "Tatuajes en Renca, Santiago - estudio de tatuajes", category: "tatuaje", comuna: "renca" },
  { src: `${BASE}-san-miguel.jpeg`, alt: "Tatuajes en San Miguel, Santiago de Chile - Samsara", category: "tatuaje", comuna: "san-miguel" },
  { src: `${BASE}-san-joaquin.jpeg`, alt: "Tatuajes en San Joaquín, Santiago - Wilfren Jiménez", category: "tatuaje", comuna: "san-joaquin" },
  { src: `${BASE}-la-cisterna.jpeg`, alt: "Tatuajes en La Cisterna, Santiago de Chile - Samsara Tattoo", category: "tatuaje", comuna: "la-cisterna" },
  { src: `${BASE}-san-bernardo.jpeg`, alt: "Tatuajes en San Bernardo, Santiago - Samsara Tattoo Studio", category: "tatuaje", comuna: "san-bernardo" },
  { src: `${BASE}-cerrillos.jpeg`, alt: "Tatuajes en Cerrillos, Santiago de Chile - Samsara", category: "tatuaje", comuna: "cerrillos" },
];

export const GALLERY_CATEGORIES = [
  { value: "todas", label: "Todas" },
  { value: "tatuaje", label: "Tatuajes" },
  { value: "pintura", label: "Pinturas" },
  { value: "aerografia", label: "Aerografía" },
] as const;
