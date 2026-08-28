import type { Metadata } from "next";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SiteNavbar } from "@/components/site-navbar";
import { SiteFooter } from "@/components/site-footer";
import { WhatsAppFloat } from "@/components/whatsapp-float";
import { SERVICES, BUSINESS, buildWhatsAppUrl } from "@/lib/business-data";
import {
  Brush,
  PenLine,
  Type,
  Circle,
  Sparkles,
  Microscope,
  Hexagon,
  Wind,
  Palette,
  Droplet,
  Image as ImageIcon,
  ChevronRight,
  MessageCircle,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Servicios de Tatuajes y Aerografía en Santiago | Samsara",
  description:
    "12 servicios profesionales: tatuaje realismo, línea fina, lettering, blackwork, microrealismo, geometría, aerografía, pintura acrílica, acuarela, galería de arte y encargos por comisión. En Santiago de Chile con Wilfren Jiménez.",
  alternates: { canonical: "/servicios" },
  openGraph: {
    title: "Servicios de Tatuajes y Aerografía en Santiago | Samsara",
    description:
      "12 servicios profesionales de tatuaje y artes visuales en Santiago de Chile. Wilfren Jiménez, 11 años de experiencia.",
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
};

const ICON_MAP: Record<string, any> = {
  Brush,
  PenLine,
  Type,
  Circle,
  Sparkles,
  Microscope,
  Hexagon,
  Wind,
  Palette,
  Droplet,
  Image: ImageIcon,
};

export default function ServiciosIndexPage() {
  const tatuajes = SERVICES.filter((s) => s.category === "tatuaje");
  const artes = SERVICES.filter((s) => s.category === "arte");

  return (
    <>
      <SiteNavbar />
      <main className="flex-1">
        <section className="border-b border-border bg-gradient-to-br from-zinc-950 via-zinc-950 to-zinc-900 py-16">
          <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <Badge
              variant="outline"
              className="mb-4 border-primary/30 text-primary"
            >
              <Brush className="size-3.5 mr-1.5" />
              Catálogo de Servicios
            </Badge>
            <h1 className="text-3xl font-bold text-foreground md:text-4xl lg:text-5xl">
              Servicios de Tatuajes y Aerografía en{" "}
              <span className="bg-gradient-to-r from-primary to-emerald-400 bg-clip-text text-transparent">
                Santiago de Chile
              </span>
            </h1>
            <p className="mt-4 max-w-3xl text-base text-muted-foreground md:text-lg">
              {SERVICES.length} servicios profesionales: tatuajes en estudio
              (Providencia) y aerografía a domicilio en toda la Región
              Metropolitana. Wilfren Jiménez, {BUSINESS.experienceYears} años de
              experiencia.
            </p>
            <div className="mt-6">
              <Button asChild>
                <a
                  href={buildWhatsAppUrl("Hola Samsara, quiero cotizar un servicio")}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageCircle className="mr-2 size-5" />
                  Cotizar por WhatsApp
                </a>
              </Button>
            </div>
          </div>
        </section>

        {/* Tatuajes */}
        <section className="border-b border-border bg-background py-16">
          <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="mb-8 text-2xl font-bold text-foreground md:text-3xl">
              Tatuajes en Santiago
            </h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {tatuajes.map((service) => {
                const Icon = ICON_MAP[service.icon] || Brush;
                return (
                  <Link
                    key={service.slug}
                    href={`/servicios/${service.slug}`}
                    className="group rounded-2xl border border-border bg-muted/30 p-6 transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg"
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex size-12 flex-shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                        <Icon className="size-6" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-foreground">
                          {service.title}
                        </h3>
                        <p className="mt-1 text-sm text-muted-foreground">
                          {service.shortDescription}
                        </p>
                      </div>
                      <ChevronRight className="size-5 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary" />
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        {/* Artes Visuales */}
        <section className="border-b border-border bg-muted/30 py-16">
          <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="mb-8 text-2xl font-bold text-foreground md:text-3xl">
              Artes Visuales y Aerografía
            </h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {artes.map((service) => {
                const Icon = ICON_MAP[service.icon] || Brush;
                return (
                  <Link
                    key={service.slug}
                    href={`/servicios/${service.slug}`}
                    className="group rounded-2xl border border-border bg-background p-6 transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg"
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex size-12 flex-shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                        <Icon className="size-6" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-foreground">
                          {service.title}
                        </h3>
                        <p className="mt-1 text-sm text-muted-foreground">
                          {service.shortDescription}
                        </p>
                      </div>
                      <ChevronRight className="size-5 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary" />
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        <section className="bg-primary py-12 text-center">
          <div className="container mx-auto max-w-4xl px-4">
            <h2 className="text-2xl font-bold text-primary-foreground md:text-3xl">
              ¿Listo para tu próximo proyecto?
            </h2>
            <p className="mt-2 text-primary-foreground/80">
              Cotiza en segundos. Atención profesional con cita previa en Providencia.
            </p>
            <Button
              asChild
              size="lg"
              className="mt-4 bg-background text-primary hover:bg-background/90"
            >
              <a
                href={buildWhatsAppUrl("Hola Samsara, quiero cotizar")}
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
