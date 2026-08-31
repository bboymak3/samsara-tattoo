import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SiteNavbar } from "@/components/site-navbar";
import { SiteFooter } from "@/components/site-footer";
import { WhatsAppFloat } from "@/components/whatsapp-float";
import { ComunasMapClient } from "@/components/comunas-map-client";
import { SERVICES, BUSINESS, COMUNAS, buildWhatsAppUrl, getComunaBySlug } from "@/lib/business-data";
import {
  MapPin,
  ArrowLeft,
  ArrowRight,
  Brush,
  MessageCircle,
  Phone,
  ChevronRight,
} from "lucide-react";

export const dynamicParams = false;

export async function generateStaticParams() {
  return COMUNAS.map((comuna) => ({ slug: comuna.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const comuna = getComunaBySlug(slug);

  if (!comuna) {
    return {
      title: "Comuna no encontrada",
      description: "La comuna que buscas no existe.",
    };
  }

  const title = `Tatuajes en ${comuna.name} | Samsara Tattoo Studio`;
  const description = `Servicio profesional de tatuajes y aerografía en ${comuna.name}, Santiago de Chile. Realismo, línea fina, blackwork, lettering, aerografía a domicilio. Cotiza gratis al ${BUSINESS.phoneDisplay}.`;

  return {
    title,
    description,
    keywords: [
      `tatuajes ${comuna.name}`,
      `tatuador ${comuna.name}`,
      `estudio de tatuajes ${comuna.name}`,
      `aerografía ${comuna.name}`,
      `tatuajes en Santiago`,
    ],
    alternates: {
      canonical: `/comunas/${comuna.slug}`,
    },
    openGraph: {
      title,
      description,
      type: "website",
      locale: "es_CL",
      url: `${BUSINESS.url}/comunas/${comuna.slug}`,
      siteName: BUSINESS.name,
      images: [
        {
          url: `${BUSINESS.url}/banner.jpg`,
          secureUrl: `${BUSINESS.url}/banner.jpg`,
          width: 1200,
          height: 630,
          alt: `Tatuajes en ${comuna.name}, Santiago de Chile - Samsara Tattoo Studio`,
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

export default async function ComunaPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const comuna = getComunaBySlug(slug);

  if (!comuna) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "TattooShop",
        "@id": `${BUSINESS.url}/comunas/${comuna.slug}#tattooshop`,
        name: `Samsara Tattoo Studio - Tatuajes en ${comuna.name}`,
        description: `Servicio profesional de tatuajes y aerografía en ${comuna.name}, Santiago de Chile. Realismo, línea fina, blackwork, lettering y más.`,
        url: `${BUSINESS.url}/comunas/${comuna.slug}`,
        telephone: `+${BUSINESS.phoneRaw}`,
        address: {
          "@type": "PostalAddress",
          streetAddress: BUSINESS.addressStreet,
          addressLocality: BUSINESS.addressComuna,
          addressRegion: BUSINESS.addressRegion,
          addressCountry: "CL",
        },
        areaServed: {
          "@type": "AdministrativeArea",
          name: comuna.name,
        },
        priceRange: "$$",
        openingHours: "Mo-Sa 10:00-21:00",
      },
      {
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: `¿Atienden tatuajes en ${comuna.name}?`,
            acceptedAnswer: {
              "@type": "Answer",
              text: `Sí, Samsara Tattoo Studio atiende en ${comuna.name} y toda la Región Metropolitana de Santiago de Chile. Cotiza gratis al ${BUSINESS.phoneDisplay}.`,
            },
          },
          {
            "@type": "Question",
            name: `¿Qué estilos de tatuaje ofrecen en ${comuna.name}?`,
            acceptedAnswer: {
              "@type": "Answer",
              text: `Ofrecemos realismo, línea fina, blackwork, lettering, microrealismo, geometría sagrada y tatuajes personalizados en ${comuna.name}.`,
            },
          },
          {
            "@type": "Question",
            name: `¿Hacen aerografía a domicilio en ${comuna.name}?`,
            acceptedAnswer: {
              "@type": "Answer",
              text: `Sí. Para piezas de gran formato como murales o personalización de cascos/motos, Wilfren se desplaza a ${comuna.name} y toda la Región Metropolitana.`,
            },
          },
          {
            "@type": "Question",
            name: `¿Cómo agendo una sesión en ${comuna.name}?`,
            acceptedAnswer: {
              "@type": "Answer",
              text: `Puedes agendar por WhatsApp al ${BUSINESS.phoneDisplay} o mediante el formulario de contacto en la web.`,
            },
          },
        ],
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Inicio", item: BUSINESS.url },
          { "@type": "ListItem", position: 2, name: "Comunas", item: `${BUSINESS.url}/#comunas` },
          { "@type": "ListItem", position: 3, name: comuna.name, item: `${BUSINESS.url}/comunas/${comuna.slug}` },
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
              <Link href="/#comunas">
                <ArrowLeft className="mr-2 size-4" />
                Ver todas las comunas
              </Link>
            </Button>
            <Badge
              variant="outline"
              className="mb-4 border-primary/30 text-primary"
            >
              <MapPin className="size-3.5 mr-1.5" />
              Región Metropolitana de Santiago
            </Badge>
            <h1 className="text-3xl font-bold text-foreground md:text-4xl lg:text-5xl">
              Tatuajes en{" "}
              <span className="bg-gradient-to-r from-primary to-emerald-400 bg-clip-text text-transparent">
                {comuna.name}
              </span>
            </h1>
            <p className="mt-3 text-lg text-muted-foreground">
              Servicio profesional de tatuajes y aerografía en {comuna.name}, Santiago de Chile
            </p>
            <p className="mt-4 max-w-3xl text-base text-muted-foreground md:text-lg">
              En Samsara Tattoo Studio atendemos clientes en {comuna.name} y toda
              la Región Metropolitana. Realizamos tatuajes en estudio (Providencia)
              y aerografía a domicilio en {comuna.name} para piezas de gran formato.
              Cotiza gratis por WhatsApp.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button asChild>
                <a
                  href={buildWhatsAppUrl(
                    `Hola Samsara, quiero cotizar un tatuaje en ${comuna.name}`
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
                alt={`Samsara Tattoo Studio - Tatuajes en ${comuna.name}, Santiago`}
                className="w-full"
              />
            </div>
          </div>
        </section>

        <section className="border-b border-border bg-background py-16">
          <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="mb-8 text-center text-2xl font-bold text-foreground md:text-3xl">
              Servicios disponibles en {comuna.name}
            </h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {SERVICES.map((service) => (
                <Link
                  key={service.slug}
                  href={`/servicios/${service.slug}`}
                  className="group flex items-start gap-4 rounded-2xl border border-border bg-muted/30 p-5 transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg"
                >
                  <div className="flex size-10 flex-shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Brush className="size-5" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground">{service.title}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {service.shortDescription}
                    </p>
                  </div>
                  <ChevronRight className="size-5 flex-shrink-0 text-muted-foreground transition-colors group-hover:text-primary" />
                </Link>
              ))}
            </div>
          </div>
        </section>

        <ComunasMapClient />

        <section className="border-t border-border bg-background py-16">
          <div className="container mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <h2 className="mb-8 text-center text-2xl font-bold text-foreground md:text-3xl">
              Preguntas Frecuentes sobre tatuajes en {comuna.name}
            </h2>
            <div className="space-y-4">
              {[
                {
                  q: `¿Atienden tatuajes en ${comuna.name}?`,
                  a: `Sí, Samsara Tattoo Studio atiende en ${comuna.name} y toda la Región Metropolitana. Cotiza gratis al ${BUSINESS.phoneDisplay}.`,
                },
                {
                  q: `¿Qué estilos de tatuaje ofrecen en ${comuna.name}?`,
                  a: `Ofrecemos realismo, línea fina, blackwork, lettering, microrealismo, geometría sagrada y tatuajes personalizados en ${comuna.name}.`,
                },
                {
                  q: `¿Hacen aerografía a domicilio en ${comuna.name}?`,
                  a: `Sí. Para piezas de gran formato como murales o personalización de cascos/motos, Wilfren se desplaza a ${comuna.name}.`,
                },
                {
                  q: `¿Cuánto cuesta un tatuaje en ${comuna.name}?`,
                  a: `El precio varía según tamaño, zona y complejidad. Cotiza gratis por WhatsApp al ${BUSINESS.phoneDisplay}.`,
                },
                {
                  q: `¿Cómo agendo una sesión en ${comuna.name}?`,
                  a: `Puedes agendar por WhatsApp o mediante el formulario de contacto en la web. Coordinamos fecha y horario según tu preferencia.`,
                },
                {
                  q: `¿Tienen garantía?`,
                  a: `Sí, todos nuestros servicios cuentan con garantía de satisfacción. Si no quedas conforme, volvemos a realizar el retoque sin costo.`,
                },
                {
                  q: `¿Dónde está el estudio?`,
                  a: `El estudio está en ${BUSINESS.addressStreet}, ${BUSINESS.addressComuna}. Para clientes de ${comuna.name}, coordinamos la sesión en estudio o podemos evaluar servicio a domicilio para aerografía.`,
                },
                {
                  q: `¿Usan material esterilizado?`,
                  a: `Sí, utilizamos material 100% desechable y esterilizado para cada cliente. Protocolos estrictos de bioseguridad.`,
                },
              ].map((faq, i) => (
                <details
                  key={i}
                  className="group rounded-xl border border-border bg-muted/30 p-5"
                >
                  <summary className="flex cursor-pointer items-center justify-between font-semibold text-foreground">
                    {faq.q}
                    <ArrowRight className="size-4 transition-transform group-open:rotate-90" />
                  </summary>
                  <p className="mt-3 text-sm text-muted-foreground">{faq.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-primary py-12 text-center">
          <div className="container mx-auto max-w-4xl px-4">
            <h2 className="text-2xl font-bold text-primary-foreground md:text-3xl">
              ¿Listo para tu tatuaje en {comuna.name}?
            </h2>
            <p className="mt-2 text-primary-foreground/80">
              Cotiza en segundos. Atención profesional con Wilfren Jiménez.
            </p>
            <Button
              asChild
              size="lg"
              className="mt-4 bg-background text-primary hover:bg-background/90"
            >
              <a
                href={buildWhatsAppUrl(
                  `Hola Samsara, quiero cotizar un tatuaje en ${comuna.name}`
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
