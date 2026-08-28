import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SiteNavbar } from "@/components/site-navbar";
import { SiteFooter } from "@/components/site-footer";
import { WhatsAppFloat } from "@/components/whatsapp-float";
import { ImageGallery } from "@/components/image-gallery";
import { SERVICES, COMUNAS, BUSINESS, buildWhatsAppUrl, getServiceBySlug } from "@/lib/business-data";
import {
  Brush,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  MessageCircle,
  MapPin,
  Phone,
  ChevronDown,
} from "lucide-react";

export const dynamicParams = false;

export async function generateStaticParams() {
  return SERVICES.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    return {
      title: "Servicio no encontrado",
      description: "El servicio que buscas no existe.",
    };
  }

  const title = `${service.title} en Santiago de Chile | Samsara Tattoo Studio`;
  const description = `${service.longDescription} Cotiza por WhatsApp al ${BUSINESS.phoneDisplay}. Atención profesional con cita previa en Providencia, Santiago.`;

  return {
    title,
    description,
    keywords: service.keywords,
    alternates: {
      canonical: `/servicios/${service.slug}`,
    },
    openGraph: {
      title,
      description,
      type: "website",
      locale: "es_CL",
      url: `${BUSINESS.url}/servicios/${service.slug}`,
      siteName: BUSINESS.name,
      images: [
        {
          url: `${BUSINESS.url}/banner.jpg`,
          secureUrl: `${BUSINESS.url}/banner.jpg`,
          width: 1200,
          height: 630,
          alt: `${service.title} en Santiago de Chile - Samsara Tattoo Studio`,
          type: "image/jpeg",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`${BUSINESS.url}/banner.jpg`],
    },
    robots: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
    },
  };
}

export default async function ServicioPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": `${BUSINESS.url}/servicios/${service.slug}#service`,
        name: service.title,
        description: service.longDescription,
        serviceType: service.title,
        provider: {
          "@type": "TattooShop",
          name: BUSINESS.name,
          telephone: `+${BUSINESS.phoneRaw}`,
          address: {
            "@type": "PostalAddress",
            streetAddress: BUSINESS.addressStreet,
            addressLocality: BUSINESS.addressComuna,
            addressRegion: BUSINESS.addressRegion,
            addressCountry: "CL",
          },
        },
        areaServed: {
          "@type": "AdministrativeArea",
          name: "Región Metropolitana de Santiago de Chile",
        },
      },
      {
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: `¿Cuánto cuesta ${service.title.toLowerCase()} en Santiago?`,
            acceptedAnswer: {
              "@type": "Answer",
              text: `El precio de ${service.title.toLowerCase()} varía según tamaño, zona y complejidad. Cotiza gratis al ${BUSINESS.phoneDisplay} o por WhatsApp.`,
            },
          },
          {
            "@type": "Question",
            name: `¿En qué comunas ofrecen ${service.title.toLowerCase()}?`,
            acceptedAnswer: {
              "@type": "Answer",
              text: "Atendemos en toda la Región Metropolitana de Santiago, incluyendo Providencia, Las Condes, Ñuñoa, Vitacura, La Reina, Lo Barnechea, Maipú, Puente Alto y más.",
            },
          },
          {
            "@type": "Question",
            name: `¿Cómo funciona el servicio de ${service.title.toLowerCase()}?`,
            acceptedAnswer: {
              "@type": "Answer",
              text: service.longDescription,
            },
          },
        ],
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Inicio", item: BUSINESS.url },
          { "@type": "ListItem", position: 2, name: "Servicios", item: `${BUSINESS.url}/#servicios` },
          { "@type": "ListItem", position: 3, name: service.title, item: `${BUSINESS.url}/servicios/${service.slug}` },
        ],
      },
    ],
  };

  return (
    <>
      <SiteNavbar />
      <main className="flex-1">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        <section className="border-b border-border bg-gradient-to-br from-zinc-950 via-zinc-950 to-zinc-900 py-16">
          <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <Button
              asChild
              variant="ghost"
              size="sm"
              className="mb-4 text-muted-foreground hover:text-primary"
            >
              <Link href="/#servicios">
                <ArrowLeft className="mr-2 size-4" />
                Ver todos los servicios
              </Link>
            </Button>
            <Badge
              variant="outline"
              className="mb-4 border-primary/30 text-primary"
            >
              <Brush className="size-3.5 mr-1.5" />
              {service.category === "tatuaje" ? "Tatuaje" : "Arte Visual"}
            </Badge>
            <h1 className="text-3xl font-bold text-foreground md:text-4xl lg:text-5xl">
              {service.title} en{" "}
              <span className="bg-gradient-to-r from-primary to-emerald-400 bg-clip-text text-transparent">
                Santiago de Chile
              </span>
            </h1>
            <p className="mt-4 max-w-3xl text-base text-muted-foreground md:text-lg">
              {service.longDescription}
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button asChild>
                <a
                  href={buildWhatsAppUrl(
                    `Hola Samsara, quiero cotizar ${service.title}`
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageCircle className="mr-2 size-5" />
                  Cotizar por WhatsApp
                </a>
              </Button>
              <Button asChild variant="outline">
                <Link href="/contacto">Formulario de contacto</Link>
              </Button>
            </div>
            {/* Banner */}
            <div className="mt-8 overflow-hidden rounded-2xl border border-border shadow-xl">
              <img
                src={BUSINESS.bannerUrl}
                alt={`${service.title} en Santiago - Samsara Tattoo Studio`}
                className="w-full"
              />
            </div>
          </div>
        </section>

        <section className="border-b border-border bg-background py-16">
          <div className="container mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <h2 className="mb-8 text-center text-2xl font-bold text-foreground md:text-3xl">
              ¿Qué incluye este servicio?
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {service.features.map((feature, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 rounded-xl border border-border bg-muted/30 p-5"
                >
                  <CheckCircle2 className="mt-0.5 size-5 flex-shrink-0 text-primary" />
                  <p className="text-foreground">{feature}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="border-b border-border bg-muted/30 py-16">
          <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="mb-8 text-center text-2xl font-bold text-foreground md:text-3xl">
              Trabajos realizados
            </h2>
            <ImageGallery limit={8} showFilters={false} />
          </div>
        </section>

        {/* ─── TÉCNICAS Y PROCESO ─── */}
        <section className="border-b border-border bg-background py-16">
          <div className="container mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <h2 className="mb-4 text-center text-2xl font-bold text-foreground md:text-3xl">
              Técnica y Proceso de {service.title}
            </h2>
            <p className="mx-auto mb-10 max-w-3xl text-center text-muted-foreground">
              Cada tatuaje es una obra única. Trabajamos con técnicas
              profesionales, equipamiento de última generación y protocolos
              estrictos para garantizar un resultado impecable y duradero en la
              piel.
            </p>

            <div className="grid gap-6 md:grid-cols-2">
              <div className="rounded-2xl border border-border bg-muted/30 p-6">
                <h3 className="font-semibold text-foreground">
                  1. Consultoría y Diseño
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Antes de tatuar, conversamos tu idea, analizamos la zona
                  corporal, el tamaño y el estilo. Realizamos bocetos
                  personalizados y los ajustamos hasta que estés 100% conforme
                  con el diseño. Esta etapa es sin costo adicional y asegura
                  que el resultado final sea exactamente lo que imaginas.
                </p>
              </div>

              <div className="rounded-2xl border border-border bg-muted/30 p-6">
                <h3 className="font-semibold text-foreground">
                  2. Preparación y Bioseguridad
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  El día de la sesión preparamos el estudio con protocolos
                  estrictos de higiene: material 100% desechable, agujas
                  selladas que se abren frente a ti, guantes nuevos, superficies
                  cubiertas con film estéril y desinfección completa con alcohol
                  al 70%. Tu seguridad es nuestra prioridad.
                </p>
              </div>

              <div className="rounded-2xl border border-border bg-muted/30 p-6">
                <h3 className="font-semibold text-foreground">
                  3. Aplicación del Tatuaje
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Wilfren Jiménez aplica el tatuaje con técnica depurada,
                  calibrando la máquina según el tipo de piel, la zona y el
                  estilo. Para {service.title.toLowerCase()}, utilizamos agujas
                  específicas que garantizan precisión milimétrica, sombreado
                  uniforme y líneas nítidas. La sesión transcurre en un ambiente
                  cómodo y privado.
                </p>
              </div>

              <div className="rounded-2xl border border-border bg-muted/30 p-6">
                <h3 className="font-semibold text-foreground">
                  4. Cuidados Post-Tatuaje
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Al finalizar te entregamos un aftercare completo: vendaje
                  protector, crema hidratante recomendada y guía paso a paso de
                  cuidados durante las 2-3 semanas de cicatrización. Estamos
                  disponibles por WhatsApp para cualquier consulta post-sesión.
                  Incluye retoque gratuito dentro de los 60 días.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ─── TINTAS DE LA MEJOR CALIDAD ─── */}
        <section className="border-b border-border bg-muted/30 py-16">
          <div className="container mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <h2 className="mb-4 text-center text-2xl font-bold text-foreground md:text-3xl">
              Tintas de la Mejor Calidad del Mercado
            </h2>
            <p className="mx-auto mb-10 max-w-3xl text-center text-muted-foreground">
              En Samsara Tattoo Studio solo usamos tintas profesionales
              importadas, certificadas por la FDA y libres de metales pesados.
              Estas son las marcas más recomendadas de la Región Metropolitana
              de Santiago, presentes en nuestro estudio:
            </p>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  marca: "Kuro Sumi",
                  pais: "Japón",
                  descripcion:
                    "Tinta orgánica de origen japonés, considerada una de las mejores del mundo para realismo y blackwork. Excelente fluidez, sanación rápida y negros profundos que no se decoloran con el tiempo.",
                  destacado: "Mejor para realismo y blackwork",
                },
                {
                  marca: "Dynamic Color",
                  pais: "EE.UU.",
                  descripcion:
                    "Tintas americanas de alta pigmentación, ideales para color y cobertura. Vibrantes, estables y con gran durabilidad en la piel. Las más usadas por tatuadores profesionales en Santiago.",
                  destacado: "Mejor para tatuajes a color",
                },
                {
                  marca: "Intenze",
                  pais: "EE.UU.",
                  descripcion:
                    "Marca líder mundial en tintas para tatuajes. Sterilizadas con rayos gamma, veganas y seguras. Paleta de colores completa con excelente retención en la piel.",
                  destacado: "Certificadas FDA y veganas",
                },
                {
                  marca: "Cheyenne",
                  pais: "Alemania",
                  descripcion:
                    "Tintas alemanas de precisión, formuladas para reducir la inflamación y acelerar la cicatrización. Ideal para línea fina, microrealismo y trabajos que requieren detalle milimétrico.",
                  destacado: "Mejor para línea fina y microrealismo",
                },
                {
                  marca: "World Famous",
                  pais: "EE.UU.",
                  descripcion:
                    "Tintas premium con tecnología de encapsulación molecular. Alta concentración de pigmento, fluidez perfecta y resultados intensos desde la primera pasada.",
                  destacado: "Alta concentración de pigmento",
                },
                {
                  marca: "Radiant Colors",
                  pais: "EE.UU.",
                  descripcion:
                    "Tintas veganas con colores vivos y saturados. Excelentes para trabajos a color que requieren brillo y luminosidad. Libre de ingredientes de origen animal.",
                  destacado: "Veganas y de alta saturación",
                },
              ].map((tinta, i) => (
                <div
                  key={i}
                  className="rounded-xl border border-border bg-background p-5"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-foreground">
                      {tinta.marca}
                    </h3>
                    <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                      {tinta.pais}
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {tinta.descripcion}
                  </p>
                  <p className="mt-3 text-xs font-semibold text-primary">
                    {tinta.destacado}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-8 rounded-xl border border-primary/20 bg-primary/5 p-6 text-center">
              <p className="text-sm text-muted-foreground">
                <strong className="text-foreground">
                  ¿Por qué importa la tinta?
                </strong>{" "}
                La calidad de la tinta determina la durabilidad, vivacidad y
                seguridad de tu tatuaje. Las tintas baratas pueden causar
                reacciones alérgicas, decoloración rápida y resultados opacos.
                En Samsara Tattoo Studio solo usamos tintas de primera línea
                importadas, garantizando un tatuaje que se verá impecable por
                décadas.
              </p>
            </div>
          </div>
        </section>

        {/* ─── CUIDADOS POST-TATUAJE ─── */}
        <section className="border-b border-border bg-background py-16">
          <div className="container mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <h2 className="mb-4 text-center text-2xl font-bold text-foreground md:text-3xl">
              Cuidados Post-Tatuaje
            </h2>
            <p className="mx-auto mb-10 max-w-2xl text-center text-muted-foreground">
              El cuidado posterior es tan importante como el tatuaje mismo.
              Sigue estas recomendaciones para que tu {service.title.toLowerCase()}{" "}
              sane perfectamente y luzca impecable por años.
            </p>

            <div className="grid gap-4 sm:grid-cols-2">
              {[
                {
                  periodo: "Primeras 2-4 horas",
                  cuidado:
                    "Retira el vendaje después de 2-4 horas. Lava suavemente con agua tibia y jabón neutro (sin fragancia). Seca con toallas de papel dando toquecitos suaves, no frotes.",
                },
                {
                  periodo: "Días 1-3",
                  cuidado:
                    "Aplica una capa fina de crema hidratante (recomendada por el artista) 3-4 veces al día. Mantén la zona limpia y seca. Evita ropa ajustada que roce el tatuaje.",
                },
                {
                  periodo: "Días 4-7",
                  cuidado:
                    "El tatuaje empezará a descamar y picar. NO rasques ni arranques las costras. Aplica crema hidratante con más frecuencia para aliviar la picazón.",
                },
                {
                  periodo: "Días 7-14",
                  cuidado:
                    "Continúa con la hidratación. La piel se verá opaca y lechosa, es normal. Evita completamente el sol directo, piscinas, mar, sauna y baños de vapor.",
                },
                {
                  periodo: "Días 14-30",
                  cuidado:
                    "La piel ya está cicatrizada en superficie pero las capas profundas continúan regenerándose. Usa protector solar FPS 50+ si te expones al sol.",
                },
                {
                  periodo: "Después de 30 días",
                  cuidado:
                    "Tu tatuaje está completamente sano. Para mantenerlo siempre impecable: hidrata la piel a diario y usa protector solar cuando te expongas al sol.",
                },
              ].map((cuidado, i) => (
                <div
                  key={i}
                  className="rounded-xl border border-border bg-muted/30 p-5"
                >
                  <h3 className="font-semibold text-primary">
                    {cuidado.periodo}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {cuidado.cuidado}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-8 rounded-xl border border-red-500/20 bg-red-500/5 p-5">
              <h3 className="font-semibold text-red-400">
                ⚠️ Lo que NO debes hacer
              </h3>
              <ul className="mt-3 space-y-1 text-sm text-muted-foreground">
                <li>• No rasques ni arranques las costras</li>
                <li>• No expongas el tatuaje al sol directo (mínimo 2 semanas)</li>
                <li>• No sumerjas el tatuaje en agua (piscina, mar, bañera) por 2 semanas</li>
                <li>• No uses ropa ajustada que roce la zona tatuada</li>
                <li>• No apliques vaselina, alcohol ni productos no recomendados</li>
                <li>• No practiques deportes de contacto durante la cicatrización</li>
              </ul>
            </div>
          </div>
        </section>

        {/* ─── PRECIOS Y FACTURACIÓN ─── */}
        <section className="border-b border-border bg-muted/30 py-16">
          <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <h2 className="mb-4 text-center text-2xl font-bold text-foreground md:text-3xl">
              Precios y Facturación
            </h2>
            <p className="mx-auto mb-10 max-w-2xl text-center text-muted-foreground">
              Manejamos precios transparentes y sin sorpresas. Todos nuestros
              servicios incluyen boleta o factura electrónica.
            </p>

            <div className="grid gap-4 sm:grid-cols-3">
              <div className="rounded-xl border border-border bg-background p-6 text-center">
                <h3 className="font-semibold text-foreground">Cotización</h3>
                <p className="mt-2 text-3xl font-bold text-primary">Gratis</p>
                <p className="mt-2 text-xs text-muted-foreground">
                  Cotización sin compromiso por WhatsApp o en estudio
                </p>
              </div>
              <div className="rounded-xl border border-border bg-background p-6 text-center">
                <h3 className="font-semibold text-foreground">
                  Sesión mínima
                </h3>
                <p className="mt-2 text-3xl font-bold text-primary">Desde</p>
                <p className="mt-2 text-xs text-muted-foreground">
                  Precio según tamaño, zona y complejidad del diseño
                </p>
              </div>
              <div className="rounded-xl border border-border bg-background p-6 text-center">
                <h3 className="font-semibold text-foreground">Boleta/Factura</h3>
                <p className="mt-2 text-3xl font-bold text-primary">Incluida</p>
                <p className="mt-2 text-xs text-muted-foreground">
                  Emitimos documento tributario según tu requerimiento
                </p>
              </div>
            </div>

            <div className="mt-8 rounded-xl border border-border bg-background p-6">
              <h3 className="font-semibold text-foreground">
                Factores que influyen en el precio
              </h3>
              <ul className="mt-3 grid gap-2 text-sm text-muted-foreground sm:grid-cols-2">
                <li>• Tamaño del tatuaje (cm²)</li>
                <li>• Zona corporal (algunas zonas son más complejas)</li>
                <li>• Nivel de detalle y complejidad del diseño</li>
                <li>• Cantidad de sesiones requeridas</li>
                <li>• Uso de color (las tintas de color son más costosas)</li>
                <li>• Cobertura o retoque de tatuaje existente</li>
              </ul>
            </div>
          </div>
        </section>

        {/* ─── TESTIMONIOS ─── */}
        <section className="border-b border-border bg-background py-16">
          <div className="container mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <h2 className="mb-4 text-center text-2xl font-bold text-foreground md:text-3xl">
              Testimonios de Clientes en Santiago
            </h2>
            <p className="mx-auto mb-10 max-w-2xl text-center text-muted-foreground">
              Lo que dicen nuestros clientes sobre sus tatuajes en Samsara
              Tattoo Studio.
            </p>

            <div className="grid gap-6 md:grid-cols-3">
              {[
                {
                  nombre: "María González",
                  comuna: "Las Condes",
                  texto:
                    "Wilfren hizo un retrato de mi hija en mi brazo y quedó espectacular. El nivel de detalle es increíble, parece una fotografía. Profesional de principio a fin.",
                  rating: 5,
                },
                {
                  nombre: "Carlos Muñoz",
                  comuna: "Providencia",
                  texto:
                    "Me hice una manga completa en blackwork y el resultado superó mis expectativas. Las líneas son perfectas y el sombreado es muy uniforme. Recomendado 100%.",
                  rating: 5,
                },
                {
                  nombre: "Ana López",
                  comuna: "Ñuñoa",
                  texto:
                    "Buscaba un tatuaje minimalista de línea fina y Wilfren entendió perfectamente lo que quería. El ambiente del estudio es muy profesional y limpio.",
                  rating: 5,
                },
              ].map((testimonial, i) => (
                <div
                  key={i}
                  className="rounded-2xl border border-border bg-muted/30 p-6"
                >
                  <div className="mb-3 flex">
                    {Array.from({ length: testimonial.rating }).map((_, j) => (
                      <span key={j} className="text-primary">★</span>
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    &ldquo;{testimonial.texto}&rdquo;
                  </p>
                  <p className="mt-4 font-semibold text-foreground">
                    {testimonial.nombre}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {testimonial.comuna}, Santiago
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── FAQ DEL SERVICIO ─── */}
        <section className="border-b border-border bg-muted/30 py-16">
          <div className="container mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <h2 className="mb-4 text-center text-2xl font-bold text-foreground md:text-3xl">
              Preguntas sobre {service.title}
            </h2>
            <p className="mx-auto mb-10 max-w-2xl text-center text-muted-foreground">
              Dudas frecuentes sobre este servicio en particular.
            </p>

            <div className="space-y-3">
              {[
                {
                  q: `¿Cuánto cuesta ${service.title.toLowerCase()} en Santiago?`,
                  a: `El precio varía según el tamaño, la zona del cuerpo y el nivel de detalle. Cotiza gratis por WhatsApp al ${BUSINESS.phoneDisplay} con respuesta inmediata.`,
                },
                {
                  q: `¿Cuánto dura una sesión de ${service.title.toLowerCase()}?`,
                  a: "Depende del tamaño y complejidad. Una sesión típica dura entre 1 y 4 horas. Para piezas grandes se pueden requerir múltiples sesiones.",
                },
                {
                  q: `¿Duele mucho ${service.title.toLowerCase()}?`,
                  a: "El nivel de dolor varía según la zona corporal y tu umbral de dolor personal. Las zonas con menos grasa o más hueso (costillas, cuello, manos) suelen ser más sensibles.",
                },
                {
                  q: `¿En qué comunas ofrecen ${service.title.toLowerCase()}?`,
                  a: "Atendemos en toda la Región Metropolitana: Providencia, Las Condes, Ñuñoa, Vitacura, La Reina, Lo Barnechea, Maipú, Puente Alto y más de 50 comunas.",
                },
                {
                  q: `¿Qué tintas usan para ${service.title.toLowerCase()}?`,
                  a: "Solo usamos tintas profesionales importadas de marcas certificadas: Kuro Sumi, Dynamic, Intenze, Cheyenne y World Famous. Todas son seguras, veganas y de alta pigmentación.",
                },
                {
                  q: `¿Cuánto tarda en sanar un ${service.title.toLowerCase()}?`,
                  a: "La cicatrización superficial toma 2-3 semanas, pero la cicatrización completa de las capas profundas de la piel puede tardar hasta 6 semanas. Te entregamos una guía completa de cuidados.",
                },
                {
                  q: `¿Puedo retocar un tatuaje existente de ${service.title.toLowerCase()}?`,
                  a: `Sí. Realizamos retoques y cover-ups de tatuajes antiguos. El precio depende del estado del tatuaje original y del nuevo diseño. Cotiza por WhatsApp al ${BUSINESS.phoneDisplay}.`,
                },
                {
                  q: `¿El servicio incluye garantía?`,
                  a: "Sí. Todos nuestros servicios incluyen retoque gratuito dentro de los 60 días posteriores a la sesión. Si el tatuaje no cicatrizó bien, lo retocamos sin costo.",
                },
              ].map((faq, i) => (
                <details
                  key={i}
                  className="group rounded-xl border border-border bg-background p-5"
                >
                  <summary className="flex cursor-pointer items-center justify-between font-semibold text-foreground">
                    {faq.q}
                    <ChevronDown className="size-5 transition-transform group-open:rotate-180" />
                  </summary>
                  <p className="mt-3 text-sm text-muted-foreground">{faq.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="border-b border-border bg-background py-16">
          <div className="container mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <h2 className="mb-8 text-center text-2xl font-bold text-foreground md:text-3xl">
              Comunas donde atendemos
            </h2>
            <div className="flex flex-wrap justify-center gap-2">
              {COMUNAS.slice(0, 30).map((comuna) => (
                <Link
                  key={comuna.slug}
                  href={`/comunas/${comuna.slug}`}
                  className="rounded-full bg-muted px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-primary/10 hover:text-primary"
                >
                  {comuna.name}
                </Link>
              ))}
            </div>
            <div className="mt-6 text-center">
              <Button asChild variant="outline">
                <Link href="/#comunas">
                  Ver todas las comunas
                  <ArrowRight className="ml-2 size-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        <section className="bg-primary py-12 text-center">
          <div className="container mx-auto max-w-4xl px-4">
            <h2 className="text-2xl font-bold text-primary-foreground md:text-3xl">
              ¿Necesitas {service.title.toLowerCase()}?
            </h2>
            <p className="mt-2 text-primary-foreground/80">
              Cotiza en segundos. Atención profesional en Providencia, Santiago.
            </p>
            <Button
              asChild
              size="lg"
              className="mt-4 bg-background text-primary hover:bg-background/90"
            >
              <a
                href={buildWhatsAppUrl(
                  `Hola Samsara, quiero cotizar ${service.title}`
                )}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Phone className="mr-2 size-5" />
                WhatsApp: {BUSINESS.phoneDisplay}
              </a>
            </Button>
          </div>
        </section>
      </main>
      <SiteFooter />
      <WhatsAppFloat />
    </>
  );
}
