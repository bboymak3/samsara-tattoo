import type { Metadata } from "next";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SiteNavbar } from "@/components/site-navbar";
import { SiteFooter } from "@/components/site-footer";
import { WhatsAppFloat } from "@/components/whatsapp-float";
import { GALLERY_VIDEOS } from "@/lib/gallery-videos";
import { BUSINESS, buildWhatsAppUrl } from "@/lib/business-data";
import { Video, ArrowLeft, ArrowRight, ImageIcon, MessageCircle, Camera } from "lucide-react";

export const metadata: Metadata = {
  title: "Galería de Videos de Tatuajes en Santiago | Samsara",
  description:
    "Videos reales de tatuajes realizados por Wilfren Jiménez en Santiago de Chile. Realismo, línea fina, cover up, lettering, manga y micro realismo en Providencia, Las Condes y más comunas.",
  alternates: { canonical: "/galeria-videos" },
};

export default function GaleriaVideosPage() {
  return (
    <>
      <SiteNavbar />
      <main className="flex-1">
        <section className="border-b border-border bg-gradient-to-br from-zinc-950 via-zinc-950 to-zinc-900 py-16">
          <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <Button asChild variant="ghost" size="sm" className="mb-4 text-muted-foreground hover:text-primary">
              <Link href="/">
                <ArrowLeft className="mr-2 size-4" />
                Volver al inicio
              </Link>
            </Button>
            <Badge variant="outline" className="mb-4 border-primary/30 text-primary">
              <Video className="mr-1.5 size-3.5" />
              Galería de Videos
            </Badge>
            <h1 className="text-4xl font-bold text-foreground md:text-5xl">
              Videos de Tatuajes en Santiago
            </h1>
            <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
              Mira en acción los tatuajes realizados por Wilfren Jiménez en distintas comunas
              de la Región Metropolitana. Realismo, línea fina, cover up, lettering y más.
            </p>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {/* Link a galería de fotos */}
            <div className="mb-8 text-center">
              <Button asChild variant="outline">
                <Link href="/galeria">
                  <ImageIcon className="mr-2 size-4" />
                  Ver galería de fotos (83 imágenes)
                </Link>
              </Button>
            </div>

            {/* Grid de videos */}
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {GALLERY_VIDEOS.map((video, i) => (
                <div key={i} className="overflow-hidden rounded-xl border border-border bg-card">
                  <div className="relative aspect-video bg-black">
                    <video
                      preload="none"
                      controls
                      className="size-full object-contain"
                      poster={`data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='640' height='360'%3E%3Crect fill='%231a1a1a' width='640' height='360'/%3E%3Ctext x='50%25' y='50%25' fill='%23666' font-size='18' text-anchor='middle' dy='.3em'%3E${encodeURIComponent(video.title)}%3C/text%3E%3C/svg%3E`}
                    >
                      <source src={video.src} type="video/mp4" />
                    </video>
                  </div>
                  <div className="p-5">
                    <div className="mb-2 flex items-center gap-2">
                      <Badge variant="secondary" className="text-xs capitalize">
                        {video.category.replace("-", " ")}
                      </Badge>
                      <span className="text-xs text-muted-foreground capitalize">{video.comuna.replace("-", " ")}</span>
                    </div>
                    <h3 className="mb-2 text-lg font-bold text-foreground">{video.title}</h3>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {video.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="mt-12 text-center">
              <Button asChild size="lg">
                <a
                  href={buildWhatsAppUrl("Hola Wilfren, vi tus videos de tatuajes y quiero cotizar uno")}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageCircle className="mr-2 size-5" />
                  Cotizar mi tatuaje
                </a>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
      <WhatsAppFloat />
    </>
  );
}
