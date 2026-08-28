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
