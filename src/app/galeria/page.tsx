import type { Metadata } from "next";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SiteNavbar } from "@/components/site-navbar";
import { SiteFooter } from "@/components/site-footer";
import { WhatsAppFloat } from "@/components/whatsapp-float";
import { ImageGallery } from "@/components/image-gallery";
import { GALLERY_IMAGES } from "@/lib/gallery-images";
import { GALLERY_IMAGES_V2 } from "@/lib/gallery-images-v2";
import { BUSINESS, buildWhatsAppUrl } from "@/lib/business-data";
import { Camera, MessageCircle, ArrowLeft, Video } from "lucide-react";

export const metadata: Metadata = {
  title: "Galería de Tatuajes, Fotos y Videos en Santiago | Samsara",
  description:
    "Galería con 83 fotos y 11 videos de tatuajes realizados por Wilfren Jiménez en Santiago de Chile. Realismo, línea fina, cover up, lettering, manga, micro realismo y aerografía. Mira los videos en acción.",
  alternates: { canonical: "/galeria" },
  openGraph: {
    title: "Galería de Tatuajes, Fotos y Videos en Santiago | Samsara",
    description:
      "83 fotos y 11 videos de trabajos de tatuaje profesional en Santiago de Chile. Realismo, línea fina, cover up y más.",
    type: "website",
    locale: "es_CL",
    images: [
      {
        url: `${BUSINESS.url}/banner.jpg`,
        secureUrl: `${BUSINESS.url}/banner.jpg`,
        width: 1200,
        height: 630,
        alt: "Galería de Tatuajes en Santiago - Samsara Tattoo Studio",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Galería de Tatuajes y Aerografía en Santiago | Samsara",
    description:
      "Fotos reales de trabajos de tatuaje y aerografía profesional en Santiago de Chile.",
    images: [`${BUSINESS.url}/banner.jpg`],
  },
};

export default function GaleriaPage() {
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
            <div className="flex items-center gap-3">
              <Camera className="size-10 text-primary" />
              <Badge
                variant="outline"
                className="border-primary/30 text-primary"
              >
                Galería de Proyectos
              </Badge>
            </div>
            <h1 className="mt-4 text-3xl font-bold text-foreground md:text-4xl lg:text-5xl">
              Tatuajes en{" "}
              <span className="bg-gradient-to-r from-primary to-emerald-400 bg-clip-text text-transparent">
                Santiago de Chile
              </span>
            </h1>
            <p className="mt-4 max-w-2xl text-base text-muted-foreground md:text-lg">
              Explora nuestra galería con {GALLERY_IMAGES.length} fotos reales de
              tatuajes realizados en distintas comunas de la Región Metropolitana.
              Haz clic en cualquier foto para ampliarla.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button asChild>
                <a
                  href={buildWhatsAppUrl(
                    "Hola Samsara, vi la galería y quiero cotizar"
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageCircle className="mr-2 size-5" />
                  Cotizar por WhatsApp
                </a>
              </Button>
            </div>
            {/* Banner */}
            <div className="mt-8 overflow-hidden rounded-2xl border border-border shadow-xl">
              <img
                src={BUSINESS.bannerUrl}
                alt="Samsara Tattoo Studio - Galería de Tatuajes en Santiago"
                className="w-full"
              />
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <ImageGallery />
          </div>
        </section>

        {/* Nueva Galería de Arte y Tatuaje */}
        <section className="border-t border-border bg-gradient-to-b from-zinc-950/50 to-background py-16">
          <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-8 text-center">
              <Badge variant="outline" className="mb-4 border-primary/30 text-primary">
                <Camera className="mr-1.5 size-3.5" />
                Nueva Colección 2026
              </Badge>
              <h2 className="text-3xl font-bold text-foreground md:text-4xl">
                Nueva Galería de Arte y Tatuaje
              </h2>
              <p className="mt-3 text-muted-foreground max-w-2xl mx-auto">
                El tatuaje que tanto deseas: realismo, línea fina, lettering, cover up,
                micro realismo y más. 83 trabajos realizados por Wilfren Jiménez en distintas
                comunas de Santiago de Chile.
              </p>
            </div>

            {/* Grid de nueva galería */}
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
              {GALLERY_IMAGES_V2.map((img, i) => (
                <a
                  key={i}
                  href={img.src}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative aspect-square overflow-hidden rounded-lg border border-border"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={img.src}
                    alt={img.alt}
                    loading="lazy"
                    className="size-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100">
                    <span className="absolute bottom-2 left-2 right-2 text-xs font-medium text-white line-clamp-2">
                      {img.alt}
                    </span>
                  </div>
                </a>
              ))}
            </div>

            <div className="mt-8 text-center">
              <Button asChild>
                <a
                  href={buildWhatsAppUrl("Hola Wilfren, vi tu nueva galería de tatuajes y quiero cotizar uno")}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageCircle className="mr-2 size-5" />
                  Cotizar mi tatuaje
                </a>
              </Button>
            </div>

            {/* Link a galería de videos */}
            <div className="mt-6 text-center">
              <Button asChild variant="outline">
                <Link href="/galeria-videos">
                  <Video className="mr-2 size-4" />
                  Ver galería de videos (11 videos)
                </Link>
              </Button>
            </div>
          </div>
        </section>

        <section className="border-t border-border bg-primary py-10 text-center">
          <div className="container mx-auto max-w-4xl px-4">
            <h2 className="text-2xl font-bold text-primary-foreground md:text-3xl">
              ¿Listo para tu próximo tatuaje?
            </h2>
            <p className="mt-2 text-primary-foreground/80">
              Cotiza tu servicio en segundos. Atención profesional con cita
              previa en Providencia, Santiago.
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
