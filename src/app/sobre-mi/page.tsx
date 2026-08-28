import type { Metadata } from "next";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SiteNavbar } from "@/components/site-navbar";
import { SiteFooter } from "@/components/site-footer";
import { WhatsAppFloat } from "@/components/whatsapp-float";
import { BUSINESS, buildWhatsAppUrl } from "@/lib/business-data";
import {
  Brush,
  Wind,
  Award,
  Palette,
  Shield,
  Instagram,
  MessageCircle,
  ArrowRight,
  MapPin,
  Phone,
  Microscope,
  PenLine,
  Sparkles,
  ExternalLink,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Sobre Mí - Wilfren Jiménez | Samsara Tattoo Studio",
  description:
    "Wilfren Jiménez, artista corporal y visual con 11 años de trayectoria. Fundador de Samsara Tattoo Studio en Providencia, Santiago. Tatuajes realismo, microrealismo, línea fina, blackwork, lettering y aerografía profesional.",
  keywords: [
    "Wilfren Jiménez",
    "tatuador Santiago",
    "artista corporal Chile",
    "artista visual Providencia",
    "biografía tatuador Chile",
    "Samsara Tattoo Studio fundador",
    "aerografía Santiago",
    "realismo tatuaje Chile",
  ],
  alternates: { canonical: "/sobre-mi" },
  openGraph: {
    title: "Sobre Mí - Wilfren Jiménez | Samsara Tattoo Studio",
    description:
      "Artista corporal y visual con 11 años de trayectoria. Tatuajes realismo, microrealismo, línea fina, blackwork y aerografía en Providencia, Santiago.",
    type: "profile",
    locale: "es_CL",
        images: [
      {
        url: `${BUSINESS.url}/banner.jpg`,
        secureUrl: `${BUSINESS.url}/banner.jpg`,
        width: 1200,
        height: 630,
        alt: "Samsara Tattoo Studio - Tatuajes en Santiago de Chile",
        type: "image/jpeg",
      },
    ],
    twitter: {
      card: "summary_large_image",
      images: [`${BUSINESS.url}/banner.jpg`],
    },
  },
  twitter: {
    card: "summary_large_image",
    title: "Sobre Mí - Wilfren Jiménez | Samsara Tattoo Studio",
    description:
      "Artista corporal y visual con 11 años de trayectoria en Providencia, Santiago de Chile.",
    images: ["/banner.jpg"],
  },
};

export default function SobreMiPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": `${BUSINESS.url}/sobre-mi#person`,
        name: "Wilfren Jiménez",
        jobTitle: "Artista Corporal y Visual",
        description:
          "Artista visual y corporal con 11 años de trayectoria en la industria del arte y el tatuaje, radicado en Providencia, Santiago.",
        url: `${BUSINESS.url}/sobre-mi`,
        image: `${BUSINESS.url}/logo.jpg`,
        worksFor: {
          "@type": "Organization",
          name: "Samsara Tattoo Studio",
        },
        address: {
          "@type": "PostalAddress",
          streetAddress: BUSINESS.addressStreet,
          addressLocality: BUSINESS.addressComuna,
          addressRegion: BUSINESS.addressRegion,
          addressCountry: "CL",
        },
        telephone: `+${BUSINESS.phoneRaw}`,
        knowsAbout: [
          "Tatuaje realismo",
          "Microrealismo",
          "Línea fina (fine line)",
          "Minimalismo botánico",
          "Lettering caligráfico",
          "Blackwork",
          "Aerografía",
          "Pintura acrílica",
          "Acuarela",
        ],
        sameAs: BUSINESS.instagrams.map((ig) => ig.url),
      },
      {
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: "¿Quién es Wilfren Jiménez?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Wilfren Jiménez es artista corporal y visual con 11 años de trayectoria, fundador de Samsara Tattoo Studio en Providencia, Santiago de Chile. Especialista en tatuaje realismo, microrealismo, línea fina, blackwork, lettering y aerografía profesional.",
            },
          },
          {
            "@type": "Question",
            name: "¿Dónde está el estudio de Wilfren Jiménez?",
            acceptedAnswer: {
              "@type": "Answer",
              text: `El estudio Samsara Tattoo Studio está en ${BUSINESS.addressStreet}, ${BUSINESS.addressComuna}, Santiago de Chile. Atención con cita previa.`,
            },
          },
          {
            "@type": "Question",
            name: "¿Qué estilos de tatuaje domina Wilfren Jiménez?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Domina realismo y microrealismo (retratos fotorrealistas de personas, animales, esculturas y paisajes), línea fina (fine line), minimalismo botánico, lettering caligráfico y proyectos a medida en blackwork.",
            },
          },
          {
            "@type": "Question",
            name: "¿Wilfren Jiménez hace aerografía?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Sí. Wilfren también es aerografista profesional bajo el seudónimo @wil_airbrush en Instagram. Crea obras en aerografía de alta definición, acrílicos y acuarelas para cuadros de autor, proyectos personalizados y colecciones privadas.",
            },
          },
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

        {/* Hero */}
        <section className="border-b border-border bg-gradient-to-br from-zinc-950 via-zinc-950 to-zinc-900 py-16">
          <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <Button
              asChild
              variant="ghost"
              size="sm"
              className="mb-4 text-muted-foreground hover:text-primary"
            >
              <Link href="/">
                <ArrowRight className="mr-2 size-4 rotate-180" />
                Volver al inicio
              </Link>
            </Button>
            <Badge
              variant="outline"
              className="mb-4 border-primary/30 text-primary"
            >
              <Award className="size-3.5 mr-1.5" />
              11 años de trayectoria
            </Badge>
            <h1 className="text-4xl font-bold text-foreground md:text-5xl lg:text-6xl">
              Wilfren{" "}
              <span className="bg-gradient-to-r from-primary to-emerald-400 bg-clip-text text-transparent">
                Jiménez
              </span>
            </h1>
            <p className="mt-3 text-lg text-muted-foreground">
              Artista Corporal y Visual · Fundador de Samsara Tattoo Studio
            </p>
            <p className="mt-6 text-base text-muted-foreground md:text-lg">
              &ldquo;Si tienes planes de realizar un nuevo proyecto, te puedo
              acompañar en el proceso de creación para que tu idea junto a mi
              experiencia creemos algo único y personalizado.&rdquo;
            </p>
          </div>
        </section>

        {/* Biografía */}
        <section className="border-b border-border bg-background py-16">
          <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <Badge
              variant="outline"
              className="mb-4 border-primary/30 text-primary"
            >
              Perfil Artístico y Profesional
            </Badge>
            <h2 className="text-2xl font-bold text-foreground md:text-3xl">
              Biografía
            </h2>
            <div className="mt-6 space-y-4 text-muted-foreground">
              <p>
                <strong className="text-foreground">Wilfren Jiménez</strong> es
                un artista visual y corporal con{" "}
                <strong className="text-primary">11 años de trayectoria</strong>{" "}
                en la industria del arte y el tatuaje, radicado en Providencia,
                Santiago. Al frente de{" "}
                <strong className="text-foreground">Samsara Tattoo Studio</strong>
                , destaca por su versatilidad para concebir el arte sobre
                distintos soportes: desde piezas de alta complejidad sobre la
                piel hasta obras plásticas sobre lienzo y proyectos en
                aerografía.
              </p>
              <p>
                Su trabajo se define por un enfoque de{" "}
                <strong className="text-foreground">co-creación con el cliente</strong>
                , guiando cada idea desde el concepto inicial hasta convertirla
                en una pieza exclusiva con técnica depurada y máxima atención al
                detalle.
              </p>
            </div>
          </div>
        </section>

        {/* Especialidades */}
        <section className="border-b border-border bg-muted/30 py-16">
          <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-12 text-center">
              <Badge
                variant="outline"
                className="mb-4 border-primary/30 text-primary"
              >
                <Brush className="size-3.5 mr-1.5" />
                Especialidades y Disciplinas
              </Badge>
              <h2 className="text-3xl font-bold text-foreground md:text-4xl">
                Técnicas que domina Wilfren
              </h2>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <div className="rounded-2xl border border-border bg-background p-6 shadow-sm">
                <div className="flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Microscope className="size-6" />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-foreground">
                  Tatuaje Realismo & Microrealismo
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Retratos fotorrealistas de personas, animales, esculturas y
                  paisajes con alto contraste, profundidad y sombreado suave.
                </p>
              </div>

              <div className="rounded-2xl border border-border bg-background p-6 shadow-sm">
                <div className="flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <PenLine className="size-6" />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-foreground">
                  Estilos Complementarios
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Línea fina (fine line), minimalismo botánico, lettering
                  caligráfico y proyectos a medida en blackwork.
                </p>
              </div>

              <div className="rounded-2xl border border-border bg-background p-6 shadow-sm">
                <div className="flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Wind className="size-6" />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-foreground">
                  Artes Visuales & Aerografía
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Creación de obras en aerografía de alta definición, acrílicos
                  y acuarelas para cuadros de autor, proyectos personalizados y
                  colecciones privadas.
                </p>
              </div>

              <div className="rounded-2xl border border-border bg-background p-6 shadow-sm">
                <div className="flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Shield className="size-6" />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-foreground">
                  Estándares de Estudio
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Atención en estudio privado bajo estrictos protocolos de
                  higiene, esterilización y bioseguridad.
                </p>
              </div>

              <div className="rounded-2xl border border-border bg-background p-6 shadow-sm">
                <div className="flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Palette className="size-6" />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-foreground">
                  Co-creación Personalizada
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Cada proyecto es único: guía al cliente desde el concepto
                  inicial hasta la pieza final exclusiva con técnica depurada.
                </p>
              </div>

              <div className="rounded-2xl border border-border bg-background p-6 shadow-sm">
                <div className="flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Sparkles className="size-6" />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-foreground">
                  Versatilidad Artística
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Arte sobre distintos soportes: piel, lienzo, papel, pared y
                  cualquier superficie personalizable con aerografía.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Ubicación y contacto */}
        <section className="border-b border-border bg-background py-16">
          <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <Badge
              variant="outline"
              className="mb-4 border-primary/30 text-primary"
            >
              <MapPin className="size-3.5 mr-1.5" />
              Ubicación y Contacto
            </Badge>
            <h2 className="text-2xl font-bold text-foreground md:text-3xl">
              Estudio en Providencia, Santiago
            </h2>

            <div className="mt-6 grid gap-6 sm:grid-cols-2">
              <div className="rounded-2xl border border-border bg-muted/30 p-6">
                <MapPin className="size-6 text-primary" />
                <h3 className="mt-3 font-semibold text-foreground">Estudio</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  {BUSINESS.addressStreet}
                  <br />
                  {BUSINESS.addressComuna}, {BUSINESS.addressRegion}
                  <br />
                  {BUSINESS.addressCountry}
                </p>
              </div>

              <div className="rounded-2xl border border-border bg-muted/30 p-6">
                <Phone className="size-6 text-primary" />
                <h3 className="mt-3 font-semibold text-foreground">WhatsApp</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  <a
                    href={`tel:+${BUSINESS.phoneRaw}`}
                    className="font-semibold text-foreground hover:text-primary"
                  >
                    {BUSINESS.phoneDisplay}
                  </a>
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  {BUSINESS.hours}
                </p>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <Button asChild>
                <a
                  href={buildWhatsAppUrl(
                    "Hola Wilfren, quiero cotizar un proyecto"
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageCircle className="mr-2 size-4" />
                  Cotizar por WhatsApp
                </a>
              </Button>
            </div>

            {/* Banner */}
            <div className="mt-8 overflow-hidden rounded-2xl border border-border shadow-xl">
              <img
                src={BUSINESS.bannerUrl}
                alt="Samsara Tattoo Studio - Wilfren Jiménez - Artista Corporal y Visual en Santiago"
                className="w-full"
              />
            </div>
          </div>
        </section>

        {/* Instagrams */}
        <section className="border-b border-border bg-muted/30 py-16">
          <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
            <Badge
              variant="outline"
              className="mb-4 border-primary/30 text-primary"
            >
              <Instagram className="size-3.5 mr-1.5" />
              Redes Sociales
            </Badge>
            <h2 className="text-2xl font-bold text-foreground md:text-3xl">
              Sigue el trabajo de Wilfren
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
              Wilfren mantiene 3 perfiles de Instagram especializados según el
              tipo de trabajo. Encuentra el que más se ajuste a lo que buscas.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {BUSINESS.instagrams.map((ig, i) => (
                <a
                  key={ig.url}
                  href={ig.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group rounded-2xl border border-border bg-background p-6 text-left transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg"
                >
                  <div className="flex items-center justify-between">
                    <Instagram className="size-8 text-primary" />
                    <ExternalLink className="size-4 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
                  </div>
                  <h3 className="mt-4 font-semibold text-foreground">
                    {ig.label}
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {ig.handle}
                  </p>
                  <p className="mt-3 text-xs text-muted-foreground">
                    {i === 0 &&
                      "Estudio de tatuajes en Providencia. Portafolio completo de trabajos realizados."}
                    {i === 1 &&
                      "Perfil personal de Wilfren Jiménez. Tatuajes, proceso creativo y detrás de cámaras."}
                    {i === 2 &&
                      "Aerografía y artes visuales. Pinturas, murales y proyectos en lienzo."}
                  </p>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-primary py-12 text-center">
          <div className="container mx-auto max-w-4xl px-4">
            <h2 className="text-2xl font-bold text-primary-foreground md:text-3xl">
              ¿Tienes un proyecto en mente?
            </h2>
            <p className="mt-2 text-primary-foreground/80">
              Co-creemos algo único. Cuéntanos tu idea y la materializamos
              juntos.
            </p>
            <Button
              asChild
              size="lg"
              className="mt-4 bg-background text-primary hover:bg-background/90"
            >
              <a
                href={buildWhatsAppUrl(
                  "Hola Wilfren, tengo un proyecto que quiero cotizar"
                )}
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle className="mr-2 size-5" />
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
