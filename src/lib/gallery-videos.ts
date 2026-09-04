// src/lib/gallery-videos.ts
// 11 videos de Samsara Tattoo Studio.
// Sin mencionar comunas en los textos visibles (solo en URLs/nombres de archivo).

export interface GalleryVideo {
  src: string;
  poster?: string;
  title: string;
  description: string;
  category: "realismo" | "linea-fina" | "cover-up" | "lettering" | "manga" | "microrealismo" | "minimalista" | "animales" | "bioseguridad" | "parejas";
  comuna: string;
}

const BASE = "/videos";

export const GALLERY_VIDEOS: GalleryVideo[] = [
  {
    src: `${BASE}/tatuaje-realismo-providencia-samsara-tattoo-santiago.mp4`,
    title: "Tatuaje Realismo",
    description: "Tatuaje realismo con sombras detalladas y retratos de alta fidelidad. Wilfren Jiménez, 11 años de experiencia, plasmando cada detalle con precisión profesional en Santiago de Chile. Estudio privado con cita previa.",
    category: "realismo",
    comuna: "providencia",
  },
  {
    src: `${BASE}/linea-fina-las-condes-samsara-tattoo-estudio.mp4`,
    title: "Línea Fina",
    description: "Tatuajes minimalistas con trazos delicados y flores. Samsara Tattoo Studio especializado en diseños sutiles que realzan la piel con elegancia y precisión técnica en la Región Metropolitana.",
    category: "linea-fina",
    comuna: "las-condes",
  },
  {
    src: `${BASE}/cover-up-macul-samsara-tattoo-santiago-chile.mp4`,
    title: "Cover Up",
    description: "Tapado de tatuaje antiguo con nuevo diseño. Transformamos trabajos anteriores en obras nuevas con técnicas de cobertura y arreglo de tinta. Resultado natural y profesional en Santiago de Chile.",
    category: "cover-up",
    comuna: "macul",
  },
  {
    src: `${BASE}/lettering-caligrafia-vitacura-samsara-tattoo.mp4`,
    title: "Lettering y Caligrafía",
    description: "Tatuajes de frases y nombres con estilo cursivo y gótico. Diseños exclusivos que plasman significados especiales con elegancia artística y precisión milimétrica en Santiago.",
    category: "lettering",
    comuna: "vitacura",
  },
  {
    src: `${BASE}/manga-completa-nunoa-samsara-tattoo-estudio.mp4`,
    title: "Manga Completa",
    description: "Proyecto de gran formato con animales y composiciones detalladas. Trabajo multi-sesión con planificación profesional. Samsara Tattoo Studio diseña cada proyecto a medida.",
    category: "manga",
    comuna: "nunoa",
  },
  {
    src: `${BASE}/microrealismo-san-miguel-samsara-tattoo-santiago.mp4`,
    title: "Micro Realismo",
    description: "Detalles minúsculos con precisión milimétrica. Tatuajes pequeños pero llenos de detalle con sombras sutiles. La especialidad más exigente dominada por Wilfren Jiménez.",
    category: "microrealismo",
    comuna: "san-miguel",
  },
  {
    src: `${BASE}/tatuaje-antebrazo-lobarnechea-samsara-tattoo.mp4`,
    title: "Antebrazo Realismo",
    description: "Antebrazo con realismo y sombras. Tatuaje de gran formato con transiciones suaves y profundidad visual. Estudio privado en Santiago con servicio a domicilio en toda la RM.",
    category: "realismo",
    comuna: "lobarnechea",
  },
  {
    src: `${BASE}/minimalista-trazos-lareina-samsara-tattoo-chile.mp4`,
    title: "Minimalista",
    description: "Tatuajes sutiles con trazos delicados y diseños personalizados para mujeres y hombres. Materiales estériles de uso individual garantizando seguridad en cada sesión.",
    category: "minimalista",
    comuna: "lareina",
  },
  {
    src: `${BASE}/tatuaje-leones-tigres-vitacura-samsara.mp4`,
    title: "Leones y Tigres",
    description: "Tatuaje de leones y tigres con realismo animal. Sombras detalladas que dan vida a la fauna en tu piel. Samsara Tattoo Studio en Santiago de Chile con cita previa.",
    category: "animales",
    comuna: "vitacura",
  },
  {
    src: `${BASE}/bioseguridad-estudio-privado-providencia-samsara.mp4`,
    title: "Bioseguridad",
    description: "Estudio privado con material estéril desechable, esterilización certificada y tintas de primera calidad. Samsara Tattoo Studio cumple protocolos de higiene para tu seguridad.",
    category: "bioseguridad",
    comuna: "providencia",
  },
  {
    src: `${BASE}/tatuaje-parejas-diseno-exclusivo-santiago-samsara.mp4`,
    title: "Parejas Diseño Exclusivo",
    description: "Diseño exclusivo para parejas. Tatuajes coordinados con significados especiales que representan su conexión. Samsara Tattoo Studio crea piezas únicas con estilo personalizado y profesional.",
    category: "parejas",
    comuna: "santiago",
  },
];
