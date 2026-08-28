// src/lib/gallery-images.ts
// Lista centralizada de 25 imágenes SEO local para galería.
// Cada imagen tiene: src, alt (con keyword + comuna), category, comuna.

export interface GalleryImage {
  src: string;
  alt: string;
  category: "tatuaje" | "pintura" | "aerografia";
  comuna?: string;
}

export const GALLERY_IMAGES: GalleryImage[] = [
  {
    src: "/images/estudio-de-tatuajes-providencia.jpg",
    alt: "Estudio de tatuajes Samsara Tattoo Studio en Providencia, Santiago",
    category: "tatuaje",
    comuna: "providencia",
  },
  {
    src: "/images/tatuajes-realismo-las-condes.jpg",
    alt: "Tatuaje de realismo realizado por Wilfren Jiménez en Las Condes, Santiago",
    category: "tatuaje",
    comuna: "las-condes",
  },
  {
    src: "/images/tatuador-realista-santiago-centro.jpg",
    alt: "Tatuador realista en Santiago Centro - Samsara Tattoo Studio",
    category: "tatuaje",
    comuna: "santiago",
  },
  {
    src: "/images/tatuajes-personalizados-vitacura.jpg",
    alt: "Tatuaje personalizado en Vitacura - Wilfren Jiménez Samsara",
    category: "tatuaje",
    comuna: "vitacura",
  },
  {
    src: "/images/tatuajes-minimalistas-la-reina.jpg",
    alt: "Tatuaje minimalista en La Reina, Santiago de Chile",
    category: "tatuaje",
    comuna: "la-reina",
  },
  {
    src: "/images/tatuajes-linea-fina-nunoa.jpg",
    alt: "Tatuaje línea fina (Fine Line) en Ñuñoa, Santiago",
    category: "tatuaje",
    comuna: "nunoa",
  },
  {
    src: "/images/tatuajes-lettering-lo-barnechea.jpg",
    alt: "Tatuaje lettering y caligrafía en Lo Barnechea, Santiago",
    category: "tatuaje",
    comuna: "lo-barnechea",
  },
  {
    src: "/images/tatuajes-en-el-brazo-macul.jpg",
    alt: "Tatuaje en el brazo realizado en Macul, Santiago de Chile",
    category: "tatuaje",
    comuna: "macul",
  },
  {
    src: "/images/manga-tatuaje-realismo-penalolen.jpg",
    alt: "Manga tatuaje realismo en Peñalolén, Santiago - Samsara",
    category: "tatuaje",
    comuna: "penalolen",
  },
  {
    src: "/images/tatuajes-antebrazo-hombre-la-florida.jpg",
    alt: "Tatuaje en antebrazo hombre en La Florida, Santiago",
    category: "tatuaje",
    comuna: "la-florida",
  },
  {
    src: "/images/tatuajes-brazo-mujer-san-miguel.jpg",
    alt: "Tatuaje en brazo de mujer en San Miguel, Santiago",
    category: "tatuaje",
    comuna: "san-miguel",
  },
  {
    src: "/images/tatuajes-para-hombres-recoleta.jpg",
    alt: "Tatuajes para hombres en Recoleta, Santiago de Chile",
    category: "tatuaje",
    comuna: "recoleta",
  },
  {
    src: "/images/tatuajes-para-mujeres-independencia.jpg",
    alt: "Tatuajes para mujeres en Independencia, Santiago",
    category: "tatuaje",
    comuna: "independencia",
  },
  {
    src: "/images/tatuajes-pequenos-quinta-normal.jpg",
    alt: "Tatuaje pequeño minimalista en Quinta Normal, Santiago",
    category: "tatuaje",
    comuna: "quinta-normal",
  },
  {
    src: "/images/tatuajes-de-flores-estacion-central.jpg",
    alt: "Tatuaje de flores realista en Estación Central, Santiago",
    category: "tatuaje",
    comuna: "estacion-central",
  },
  {
    src: "/images/tatuajes-de-nombres-maipu.jpg",
    alt: "Tatuaje de nombres lettering en Maipú, Santiago",
    category: "tatuaje",
    comuna: "maipu",
  },
  {
    src: "/images/tatuajes-en-la-mano-pudahuel.jpg",
    alt: "Tatuaje en la mano en Pudahuel, Santiago de Chile",
    category: "tatuaje",
    comuna: "pudahuel",
  },
  {
    src: "/images/tatuajes-en-el-cuello-quilicura.jpg",
    alt: "Tatuaje en el cuello en Quilicura, Santiago",
    category: "tatuaje",
    comuna: "quilicura",
  },
  {
    src: "/images/tatuajes-en-pareja-huechuraba.jpg",
    alt: "Tatuajes en pareja en Huechuraba, Santiago de Chile",
    category: "tatuaje",
    comuna: "huechuraba",
  },
  {
    src: "/images/tatuaje-retrato-realista-conchali.jpg",
    alt: "Tatuaje retrato realista en Conchalí, Santiago",
    category: "tatuaje",
    comuna: "conchali",
  },
  {
    src: "/images/tatuaje-flor-de-loto-san-joaquin.jpg",
    alt: "Tatuaje flor de loto geometría en San Joaquín, Santiago",
    category: "tatuaje",
    comuna: "san-joaquin",
  },
  {
    src: "/images/tatuajes-artisticos-la-cisterna.jpg",
    alt: "Tatuaje artístico blackwork en La Cisterna, Santiago",
    category: "tatuaje",
    comuna: "la-cisterna",
  },
  {
    src: "/images/tatuadores-profesionales-cerrillos.jpg",
    alt: "Tatuadores profesionales en Cerrillos, Santiago de Chile",
    category: "tatuaje",
    comuna: "cerrillos",
  },
  {
    src: "/images/mejor-estudio-de-tatuajes-puente-alto.jpg",
    alt: "Mejor estudio de tatuajes en Puente Alto, Santiago",
    category: "tatuaje",
    comuna: "puente-alto",
  },
  {
    src: "/images/samsara-tattoo-studio-san-bernardo.jpg",
    alt: "Samsara Tattoo Studio - tatuajes en San Bernardo, Santiago",
    category: "tatuaje",
    comuna: "san-bernardo",
  },
];

export const GALLERY_CATEGORIES = [
  { value: "todas", label: "Todas" },
  { value: "tatuaje", label: "Tatuajes" },
  { value: "pintura", label: "Pinturas" },
  { value: "aerografia", label: "Aerografía" },
] as const;
