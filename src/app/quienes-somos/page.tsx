import type { Metadata } from "next";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SiteNavbar } from "@/components/site-navbar";
import { SiteFooter } from "@/components/site-footer";
import { WhatsAppFloat } from "@/components/whatsapp-float";
import { BUSINESS } from "@/lib/business-data";
import {
  Brush,
  Wind,
  Award,
  Palette,
  Shield,
  Instagram,
  MessageCircle,
  ArrowRight,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Quiénes Somos | Wilfren Jiménez - Samsara Tattoo Studio",
  description:
    "Conoce a Wilfren Jiménez, artista corporal y visual con 11 años de experiencia. Tatuajes realismo, línea fina, blackwork, lettering y aerografía profesional en Providencia, Santiago de Chile.",
  alternates: { canonical: "/quienes-somos" },
};

export default function QuienesSomosPage() {
  return (
    <>
      <SiteNavbar />
      <main className="flex-1">
        <section className="border-b border-border bg-gradient-to-b from-zinc-950 to-zinc-900 py-16">
          <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <Badge
              variant="outline"
              className="mb-4 border-primary/30 text-primary"
            >
              <Award className="size-3.5 mr-1.5" />
              {BUSINESS.experienceYears} años de experiencia
            </Badge>
            <h1 className="text-4xl font-bold text-foreground md:text-5xl">
              Wilfren Jiménez ·{" "}
              <span className="bg-gradient-to-r from-primary to-emerald-400 bg-clip-text text-transparent">
                Artista Corporal y Visual
              </span>
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              {BUSINESS.tagline}
            </p>
          </div>
        </section>

        <section className="border-b border-border bg-background py-16">
          <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <div className="prose prose-invert max-w-none">
              <h2 className="text-2xl font-bold text-foreground">
                Trayectoria del Artista
              </h2>
              <p className="mt-4 text-muted-foreground">
                <strong className="text-foreground">Wilfren Jiménez</strong> es
                el artista detrás de Samsara Tattoo Studio. Con más de{" "}
                <strong className="text-primary">
                  {BUSINESS.experienceYears} años de experiencia
                </strong>{" "}
                en la industria del tatuaje y las artes plásticas, su
                versatilidad le permite plasmar arte tanto en piel como en
                lienzo.
              </p>
              <p className="mt-4 text-muted-foreground">
                Domina técnicas que van desde el realismo hiperdetallado hasta
                la aerografía de gran formato. Cada proyecto es una colaboración
                entre la idea del cliente y su experiencia para crear algo único
                y personalizado.
              </p>
              <p className="mt-4 text-muted-foreground">
                En el estudio de Providencia atiende con cita previa en un
                espacio privado, con los más altos estándares de bioseguridad.
                Para piezas de gran formato (aerografía), se desplaza a domicilio
                en toda la Región Metropolitana de Santiago.
              </p>
            </div>

            <div className="mt-12 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-border bg-muted/30 p-6">
                <Brush className="size-8 text-primary" />
                <h3 className="mt-3 font-semibold text-foreground">
                  Especialidades en Tatuaje
                </h3>
                <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
                  <li>• Realismo hiperdetallado</li>
                  <li>• Blackwork a gran escala</li>
                  <li>• Línea fina y minimalismo</li>
                  <li>• Lettering personalizado</li>
                  <li>• Microrealismo</li>
                  <li>• Geometría sagrada</li>
                  <li>• Diseño 100% personalizado</li>
                </ul>
              </div>

              <div className="rounded-2xl border border-border bg-muted/30 p-6">
                <Palette className="size-8 text-primary" />
                <h3 className="mt-3 font-semibold text-foreground">
                  Artes Visuales
                </h3>
                <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
                  <li>• Aerografía (Airbrush Art)</li>
                  <li>• Pintura acrílica sobre lienzo</li>
                  <li>• Acuarelas sobre papel de algodón</li>
                  <li>• Murales a gran escala</li>
                  <li>• Personalización de cascos/motos</li>
                  <li>• Encargos por comisión</li>
                  <li>• Galería de obras originales</li>
                </ul>
              </div>
            </div>

            <div className="mt-12 rounded-2xl border border-primary/20 bg-primary/5 p-6">
              <Shield className="size-8 text-primary" />
              <h3 className="mt-3 text-xl font-semibold text-foreground">
                Bioseguridad Certificada
              </h3>
              <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                <li>✓ Estudio privado con cita previa</li>
                <li>✓ Material 100% desechable y esterilizado</li>
                <li>✓ Tintas de primera calidad importadas</li>
                <li>✓ Protocolos estrictos de higiene</li>
                <li>✓ Espacio seguro y profesional</li>
              </ul>
            </div>

            <div className="mt-12 flex flex-wrap gap-3">
              <Button asChild>
                <a
                  href={BUSINESS.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageCircle className="mr-2 size-4" />
                  Cotizar por WhatsApp
                </a>
              </Button>
              <Button asChild variant="outline">
                <Link href="/">
                  Volver al inicio
                  <ArrowRight className="ml-2 size-4" />
                </Link>
              </Button>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              {BUSINESS.instagrams.map((ig) => (
                <a
                  key={ig.url}
                  href={ig.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg border border-border bg-muted px-4 py-2 text-sm font-semibold text-foreground transition-colors hover:border-primary/40 hover:bg-primary/5"
                >
                  <Instagram className="size-4" />
                  {ig.label}
                  <span className="text-xs text-muted-foreground">{ig.handle}</span>
                </a>
              ))}
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
      <WhatsAppFloat />
    </>
  );
}
