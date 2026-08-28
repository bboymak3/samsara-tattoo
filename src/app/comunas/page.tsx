import type { Metadata } from "next";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SiteNavbar } from "@/components/site-navbar";
import { SiteFooter } from "@/components/site-footer";
import { WhatsAppFloat } from "@/components/whatsapp-float";
import { ComunasMapClient } from "@/components/comunas-map-client";
import { COMUNAS, SERVICES, BUSINESS, buildWhatsAppUrl } from "@/lib/business-data";
import { MapPin, ArrowLeft, MessageCircle, Phone, Brush, ChevronRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Comunas que Atendemos en Santiago | Samsara Tattoo Studio",
  description:
    "Listado de las 54 comunas de la Región Metropolitana de Santiago de Chile donde Samsara Tattoo Studio ofrece servicios de tatuaje y aerografía. Cotiza gratis por WhatsApp.",
  alternates: { canonical: "/comunas" },
  openGraph: {
    title: "Comunas que Atendemos en Santiago | Samsara Tattoo Studio",
    description:
      "54 comunas de la Región Metropolitana atendidas por Samsara Tattoo Studio. Tatuajes y aerografía a domicilio.",
    type: "website",
    locale: "es_CL",
  },
};

export default function ComunasIndexPage() {
  return (
    <>
      <SiteNavbar />
      <main className="flex-1">
        <section className="border-b border-border bg-gradient-to-br from-zinc-950 via-zinc-950 to-zinc-900 py-16">
          <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <Button
              asChild
              variant="ghost"
              size="sm"
              className="mb-4 text-muted-foreground hover:text-primary"
            >
              <Link href="/">
                <ArrowLeft className="mr-2 size-4" />
                Volver al inicio
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
              Comunas que Atendemos en{" "}
              <span className="bg-gradient-to-r from-primary to-emerald-400 bg-clip-text text-transparent">
                Santiago de Chile
              </span>
            </h1>
            <p className="mt-4 max-w-3xl text-base text-muted-foreground md:text-lg">
              En Samsara Tattoo Studio atendemos en {COMUNAS.length} comunas de
              la Región Metropolitana de Santiago de Chile. Ofrecemos tatuajes en
              estudio (Providencia) y aerografía a domicilio para piezas de gran
              formato. Selecciona tu comuna para ver los servicios disponibles.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button asChild>
                <a
                  href={buildWhatsAppUrl("Hola Samsara, quiero cotizar un tatuaje")}
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
                alt="Samsara Tattoo Studio - Comunas que atendemos en Santiago de Chile"
                className="w-full"
              />
            </div>
          </div>
        </section>

        {/* Mapa interactivo */}
        <ComunasMapClient />

        {/* Grid completo de comunas */}
        <section className="border-t border-border bg-background py-16">
          <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="mb-8 text-center text-2xl font-bold text-foreground md:text-3xl">
              Las {COMUNAS.length} Comunas Atendidas
            </h2>
            <p className="mx-auto mb-10 max-w-2xl text-center text-muted-foreground">
              Cada comuna tiene su propia landing con servicios disponibles,
              preguntas frecuentes y SEO local optimizado.
            </p>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
              {COMUNAS.map((comuna) => (
                <Link
                  key={comuna.slug}
                  href={`/comunas/${comuna.slug}`}
                  className="group flex flex-col items-center gap-2 rounded-xl border border-border bg-muted/30 p-4 text-center transition-all hover:-translate-y-1 hover:border-primary/40 hover:bg-primary/5 hover:shadow-lg"
                >
                  <MapPin className="size-5 text-primary" />
                  <span className="text-sm font-medium text-foreground group-hover:text-primary">
                    {comuna.name}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Servicios disponibles en todas las comunas */}
        <section className="border-t border-border bg-muted/30 py-16">
          <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="mb-8 text-center text-2xl font-bold text-foreground md:text-3xl">
              Servicios Disponibles en Todas las Comunas
            </h2>
            <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {SERVICES.map((service) => (
                <Link
                  key={service.slug}
                  href={`/servicios/${service.slug}`}
                  className="group flex items-center gap-3 rounded-xl border border-border bg-background p-4 transition-all hover:border-primary/40 hover:bg-primary/5"
                >
                  <div className="flex size-9 flex-shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Brush className="size-4" />
                  </div>
                  <span className="text-sm font-medium text-foreground group-hover:text-primary">
                    {service.title}
                  </span>
                  <ChevronRight className="ml-auto size-4 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary" />
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-primary py-12 text-center">
          <div className="container mx-auto max-w-4xl px-4">
            <h2 className="text-2xl font-bold text-primary-foreground md:text-3xl">
              ¿No ves tu comuna en la lista?
            </h2>
            <p className="mt-2 text-primary-foreground/80">
              Consúltanos por WhatsApp. Atendemos toda la Región Metropolitana.
            </p>
            <Button
              asChild
              size="lg"
              className="mt-4 bg-background text-primary hover:bg-background/90"
            >
              <a
                href={buildWhatsAppUrl(
                  "Hola Samsara, quiero saber si atienden en mi comuna"
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
