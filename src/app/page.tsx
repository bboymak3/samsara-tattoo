"use client";

import { useState } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
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
  Award,
  Shield,
  Clock,
  MapPin,
  Phone,
  Instagram,
  ArrowRight,
  MessageCircle,
  ExternalLink,
  ChevronDown,
  HelpCircle,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BUSINESS, SERVICES, buildWhatsAppUrl } from "@/lib/business-data";
import { SiteNavbar } from "@/components/site-navbar";
import { SiteFooter } from "@/components/site-footer";
import { WhatsAppFloat } from "@/components/whatsapp-float";
import { ImageGallery } from "@/components/image-gallery";
import { GALLERY_IMAGES_V2 } from "@/lib/gallery-images-v2";
import { GALLERY_VIDEOS } from "@/lib/gallery-videos";
import {
  EstudioModal,
  TatuadorModal,
  AerografoModal,
} from "@/components/site-modals";
import { BannerWithGlowEyes } from "@/components/banner-glow-eyes";

const ComunasMap = dynamic(
  () => import("@/components/comunas-map").then((m) => m.ComunasMap),
  {
    ssr: false,
    loading: () => (
      <div
        style={{ height: 450 }}
        className="flex items-center justify-center rounded-2xl border-2 border-border bg-muted/30"
      >
        <span className="text-muted-foreground">Cargando mapa...</span>
      </div>
    ),
  }
);

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

export default function Home() {
  const [estudioOpen, setEstudioOpen] = useState(false);
  const [tatuadorOpen, setTatuadorOpen] = useState(false);
  const [aerografoOpen, setAerografoOpen] = useState(false);

  return (
    <>
      <SiteNavbar />
      <main className="flex-1">
        {/* ─── HERO ─── */}
        <section
          id="inicio"
          className="relative overflow-hidden border-b border-border bg-gradient-to-b from-zinc-950 via-zinc-950 to-zinc-900"
        >
          <div className="absolute inset-0 opacity-20 [background-image:radial-gradient(circle_at_20%_20%,#22c55e_0,transparent_40%),radial-gradient(circle_at_80%_60%,#22c55e_0,transparent_35%)]" />
          <div className="container relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
            <div className="mx-auto max-w-3xl text-center">
              <Badge className="mb-4 bg-primary/15 text-primary border-primary/30">
                <Award className="size-3.5 mr-1.5" />
                {BUSINESS.experienceYears} años de experiencia
              </Badge>
              <h1 className="text-4xl font-bold leading-tight text-foreground md:text-5xl lg:text-6xl">
                Tatuajes en{" "}
                <span className="bg-gradient-to-r from-primary to-emerald-400 bg-clip-text text-transparent">
                  Santiago de Chile
                </span>
              </h1>
              <p className="mt-4 text-base text-muted-foreground md:text-lg lg:text-xl">
                {BUSINESS.tagline}
              </p>
              <p className="mt-3 text-sm text-muted-foreground/80">
                {BUSINESS.artist} · {BUSINESS.artistRole} ·{" "}
                {BUSINESS.addressComuna}, Santiago
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Button
                  asChild
                  size="lg"
                  className="bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  <a
                    href={buildWhatsAppUrl(
                      "Hola Samsara, quiero cotizar un tatuaje"
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <MessageCircle className="mr-2 size-5" />
                    Cotizar por WhatsApp
                  </a>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <Link href="/galeria">
                    <Sparkles className="mr-2 size-5" />
                    Ver Galería
                  </Link>
                </Button>
              </div>
            </div>
            {/* Banner con efecto fuego en ojos del buho */}
            <div className="mt-10">
              <BannerWithGlowEyes
                eyeCenterX={50}
                eyeCenterY={60}
                glowRadius={18}
              />
            </div>
          </div>
        </section>

        {/* ─── ARTISTA ─── */}
        <section
          id="artista"
          className="border-b border-border bg-background py-20"
        >
          <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid items-center gap-10 lg:grid-cols-2">
              <div>
                <Badge
                  variant="outline"
                  className="mb-4 border-primary/30 text-primary"
                >
                  <Brush className="size-3.5 mr-1.5" />
                  Sobre el Artista
                </Badge>
                <h2 className="text-3xl font-bold text-foreground md:text-4xl">
                  Wilfren Jiménez ·{" "}
                  <span className="text-primary">Artista Corporal y Visual</span>
                </h2>
                <p className="mt-4 text-muted-foreground">
                  Con <strong className="text-foreground">
                    {BUSINESS.experienceYears} años de experiencia
                  </strong>{" "}
                  en la industria del tatuaje y las artes plásticas, Wilfren
                  Jiménez es el artista detrás de Samsara Tattoo Studio. Su
                  versatilidad le permite plasmar arte tanto en piel como en
                  lienzo, dominando técnicas que van desde el realismo
                  hiperdetallado hasta la aerografía de gran formato.
                </p>
                <p className="mt-3 text-muted-foreground">
                  Cada proyecto es una colaboración entre tu idea y su
                  experiencia para crear algo único y personalizado.
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Button onClick={() => setTatuadorOpen(true)}>
                    Ver trayectoria
                    <ArrowRight className="ml-2 size-4" />
                  </Button>
                  <Button asChild variant="outline">
                    <a
                      href={BUSINESS.instagrams[1].url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Instagram className="mr-2 size-4" />
                      @wilfren_jimenez
                    </a>
                  </Button>
                </div>
              </div>

              <div className="rounded-2xl border border-border bg-gradient-to-br from-zinc-900 to-zinc-950 p-6 shadow-xl">
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div className="rounded-xl bg-muted/30 p-5">
                    <Award className="mx-auto size-8 text-primary" />
                    <p className="mt-2 text-2xl font-bold text-foreground">
                      {BUSINESS.experienceYears}+
                    </p>
                    <p className="text-xs text-muted-foreground">Lun-Sáb 10AM-9PM
                      Años de experiencia
                    </p>
                  </div>
                  <div className="rounded-xl bg-muted/30 p-5">
                    <Brush className="mx-auto size-8 text-primary" />
                    <p className="mt-2 text-2xl font-bold text-foreground">7+</p>
                    <p className="text-xs text-muted-foreground">Lun-Sáb 10AM-9PM
                      Estilos de tatuaje
                    </p>
                  </div>
                  <div className="rounded-xl bg-muted/30 p-5">
                    <Wind className="mx-auto size-8 text-primary" />
                    <p className="mt-2 text-2xl font-bold text-foreground">100%</p>
                    <p className="text-xs text-muted-foreground">Lun-Sáb 10AM-9PM
                      Aerografía profesional
                    </p>
                  </div>
                  <div className="rounded-xl bg-muted/30 p-5">
                    <Shield className="mx-auto size-8 text-primary" />
                    <p className="mt-2 text-2xl font-bold text-foreground">10-21</p>
                    <p className="text-xs text-muted-foreground">Lun-Sáb 10AM-9PM
                      Atención de emergencias
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── SERVICIOS ─── */}
        <section
          id="servicios"
          className="border-b border-border bg-muted/30 py-20"
        >
          <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-12 text-center">
              <Badge
                variant="outline"
                className="mb-4 border-primary/30 text-primary"
              >
                <Sparkles className="size-3.5 mr-1.5" />
                Catálogo de Servicios
              </Badge>
              <h2 className="text-3xl font-bold text-foreground md:text-4xl">
                Tatuajes y Artes Visuales en Santiago
              </h2>
              <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
                Servicios profesionales en estudio (Providencia) y aerografía a
                domicilio en toda la Región Metropolitana.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {SERVICES.map((service) => {
                const Icon = ICON_MAP[service.icon] || Brush;
                const isAerografia = service.slug === "aerografia";
                return (
                  <div
                    key={service.slug}
                    className="group relative overflow-hidden rounded-2xl border border-border bg-background p-6 shadow-sm transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg"
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
                    </div>
                    <div className="mt-4 flex items-center justify-between">
                      <Badge
                        variant="secondary"
                        className={
                          service.category === "tatuaje"
                            ? "bg-primary/10 text-primary"
                            : "bg-amber-500/10 text-amber-500"
                        }
                      >
                        {service.category === "tatuaje" ? "Tatuaje" : "Arte"}
                      </Badge>
                      {isAerografia ? (
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => setAerografoOpen(true)}
                        >
                          Ver detalles
                          <ChevronRight className="ml-1 size-4" />
                        </Button>
                      ) : (
                        <Button asChild size="sm" variant="ghost">
                          <Link href={`/servicios/${service.slug}`}>
                            Ver detalles
                            <ChevronRight className="ml-1 size-4" />
                          </Link>
                        </Button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ─── GALERIA ─── */}
        <section
          id="galeria"
          className="border-b border-border bg-background py-20"
        >
          <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-10 text-center">
              <Badge
                variant="outline"
                className="mb-4 border-primary/30 text-primary"
              >
                <ImageIcon className="size-3.5 mr-1.5" />
                Galería
              </Badge>
              <h2 className="text-3xl font-bold text-foreground md:text-4xl">
                Portafolio de Trabajos en Santiago
              </h2>
              <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
                Tatuajes realizados en distintas comunas de la Región
                Metropolitana. Haz clic en cualquier foto para ampliarla.
              </p>
            </div>
            <ImageGallery limit={12} />
            <div className="mt-8 text-center">
              <Button asChild variant="outline">
                <Link href="/galeria">
                  Ver galería completa
                  <ArrowRight className="ml-2 size-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* ─── NUEVA GALERÍA DE ARTE Y TATUAJE ─── */}
        <section className="border-b border-border bg-gradient-to-b from-zinc-950/50 to-background py-20">
          <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-10 text-center">
              <Badge variant="outline" className="mb-4 border-primary/30 text-primary">
                <ImageIcon className="size-3.5 mr-1.5" />
                Nueva Colección 2026
              </Badge>
              <h2 className="text-3xl font-bold text-foreground md:text-4xl">
                Nueva Galería de Arte y Tatuaje
              </h2>
              <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
                El tatuaje que tanto deseas: realismo, línea fina, lettering, cover up,
                micro realismo y más. Trabajos realizados por Wilfren Jiménez en Santiago de Chile.
              </p>
            </div>

            {/* Grid de 25 imágenes de la nueva galería */}
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
              {GALLERY_IMAGES_V2.slice(0, 25).map((img, i) => (
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

            {/* Textos descriptivos */}
            <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <div className="rounded-xl border border-border bg-card p-6">
                <h3 className="mb-2 text-lg font-bold text-foreground">Realismo y Sombras</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Especialistas en tatuaje realista con sombras suaves y detalladas en Providencia, Las Condes y Ñuñoa. Retratos, animales y paisajes con la calidad de un taller formal, directamente en tu domicilio o en nuestro estudio privado en Santiago de Chile. Wilfren Jiménez, 11 años de experiencia.
                </p>
              </div>
              <div className="rounded-xl border border-border bg-card p-6">
                <h3 className="mb-2 text-lg font-bold text-foreground">Línea Fina y Minimalista</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Tatuajes delicados con trazos finos y diseños minimalistas en Las Condes, La Reina y Vitacura. Flores, símbolos y detalles sutiles que realzan tu piel. Trabajo profesional con materiales estériles de uso individual, garantizando seguridad y precisión en cada pieza realizada en Santiago.
                </p>
              </div>
              <div className="rounded-xl border border-border bg-card p-6">
                <h3 className="mb-2 text-lg font-bold text-foreground">Cover Up y Reparación</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  ¿Tatuaje viejo que quieres tapar? Cover up profesional en Macul, San Miguel y Lo Barnechea. Reparamos trabajos anteriores con técnicas de arreglo de tinta, cobertura total y rediseño. Transformamos tu tatuaje antiguo en una obra nueva que te encante, con resultado natural y profesional.
                </p>
              </div>
              <div className="rounded-xl border border-border bg-card p-6">
                <h3 className="mb-2 text-lg font-bold text-foreground">Lettering y Caligrafía</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Tatuajes de letras, frases y nombres con caligrafía artística en Vitacura, Providencia y Santiago. Estilos cursiva, gótica y moderna. Diseños exclusivos para parejas y personas que buscan plasmar significados especiales en su piel con elegancia y precisión técnica.
                </p>
              </div>
              <div className="rounded-xl border border-border bg-card p-6">
                <h3 className="mb-2 text-lg font-bold text-foreground">Manga y Antebrazo</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Proyectos de gran formato: manga completa, antebrazo y brazo entero. Animales, leones, tigres y composiciones detalladas. Trabajo multi-sesión con planificación profesional en Providencia, Ñuñoa y Lo Barnechea. Cada proyecto se diseña a medida según tu estilo y anatomía.
                </p>
              </div>
              <div className="rounded-xl border border-border bg-card p-6">
                <h3 className="mb-2 text-lg font-bold text-foreground">Micro Realismo</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Detalles minúsculos con precisión milimétrica en San Miguel, Macul y La Reina. Tatuajes pequeños pero llenos de detalle: retratos en miniatura, paisajes compactos y símbolos con sombras sutiles. La especialidad más exigente del tatuaje, dominada por Wilfren Jiménez en Santiago.
                </p>
              </div>
            </div>

            <div className="mt-10 text-center">
              <Button asChild>
                <Link href="/galeria">
                  Ver galería completa (83 fotos)
                  <ArrowRight className="ml-2 size-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* ─── GALERÍA DE VIDEOS ─── */}
        <section className="border-b border-border bg-background py-20">
          <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-10 text-center">
              <Badge variant="outline" className="mb-4 border-primary/30 text-primary">
                <ImageIcon className="size-3.5 mr-1.5" />
                Videos
              </Badge>
              <h2 className="text-3xl font-bold text-foreground md:text-4xl">
                Galería de Videos de Tatuajes
              </h2>
              <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
                Mira en acción los tatuajes realizados por Wilfren Jiménez en Santiago de Chile.
                Cada video muestra el proceso y resultado final en distintas comunas.
              </p>
            </div>

            {/* Grid de videos con texto descriptivo */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {GALLERY_VIDEOS.map((video, i) => (
                <div key={i} className="overflow-hidden rounded-xl border border-border bg-card">
                  <div className="relative aspect-video bg-black">
                    <video
                      preload="none"
                      controls
                      className="size-full object-contain"
                      poster={`data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='640' height='360'%3E%3Crect fill='%231a1a1a' width='640' height='360'/%3E%3Ctext x='50%25' y='50%25' fill='%23666' font-size='16' text-anchor='middle' dy='.3em'%3E${encodeURIComponent(video.title)}%3C/text%3E%3C/svg%3E`}
                    >
                      <source src={video.src} type="video/mp4" />
                    </video>
                  </div>
                  <div className="p-4">
                    <div className="mb-2 flex items-center gap-2">
                      <span className="rounded bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary capitalize">
                        {video.category.replace("-", " ")}
                      </span>
                      <span className="text-xs text-muted-foreground capitalize">{video.comuna.replace("-", " ")}</span>
                    </div>
                    <h3 className="mb-1 text-sm font-bold text-foreground">{video.title}</h3>
                    <p className="text-xs leading-relaxed text-muted-foreground line-clamp-3">
                      {video.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 text-center">
              <Button asChild variant="outline">
                <Link href="/galeria-videos">
                  Ver todos los videos
                  <ArrowRight className="ml-2 size-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* ─── ESTUDIO + BIOSEGURIDAD ─── */}
        <section
          id="estudio"
          className="border-b border-border bg-muted/30 py-20"
        >
          <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-10 lg:grid-cols-2">
              <div>
                <Badge
                  variant="outline"
                  className="mb-4 border-primary/30 text-primary"
                >
                  <Shield className="size-3.5 mr-1.5" />
                  Estudio Privado
                </Badge>
                <h2 className="text-3xl font-bold text-foreground md:text-4xl">
                  Estudio en Providencia, Santiago
                </h2>
                <p className="mt-4 text-muted-foreground">
                  Atendemos con cita previa en un espacio privado, íntimo y
                  profesional. Trabajamos con los más altos estándares de
                  bioseguridad para una experiencia impecable.
                </p>
                <ul className="mt-6 space-y-3 text-sm">
                  <li className="flex items-start gap-3">
                    <Shield className="mt-0.5 size-4 flex-shrink-0 text-primary" />
                    <span>
                      <strong className="text-foreground">Material estéril y desechable:</strong>{" "}
                      100% esterilizado y desechable para cada cliente.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Clock className="mt-0.5 size-4 flex-shrink-0 text-primary" />
                    <span>
                      <strong className="text-foreground">{BUSINESS.hours}:</strong>{" "}
                      Atención flexible con cita previa.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <MapPin className="mt-0.5 size-4 flex-shrink-0 text-primary" />
                    <span>
                      <strong className="text-foreground">Ubicación:</strong>{" "}
                      {BUSINESS.addressStreet}, {BUSINESS.addressComuna}.
                    </span>
                  </li>
                </ul>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Button onClick={() => setEstudioOpen(true)}>
                    Ver info del estudio
                    <ArrowRight className="ml-2 size-4" />
                  </Button>
                </div>
              </div>

              <div className="rounded-2xl border border-border bg-background p-6 shadow-lg">
                <h3 className="text-xl font-bold text-foreground">
                  Por qué elegirnos
                </h3>
                <ul className="mt-4 space-y-4">
                  <li className="flex items-start gap-3">
                    <Award className="mt-0.5 size-5 flex-shrink-0 text-primary" />
                    <div>
                      <p className="font-semibold text-foreground">
                        {BUSINESS.experienceYears} años de experiencia
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Trayectoria comprobada en tatuajes y artes visuales.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <Brush className="mt-0.5 size-5 flex-shrink-0 text-primary" />
                    <div>
                      <p className="font-semibold text-foreground">
                        Versatilidad artística
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Realismo, fine line, blackwork, lettering, aerografía y
                        más.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <Shield className="mt-0.5 size-5 flex-shrink-0 text-primary" />
                    <div>
                      <p className="font-semibold text-foreground">
                        Bioseguridad certificada
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Protocolos estrictos, material esterilizado, estudio
                        privado.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <Wind className="mt-0.5 size-5 flex-shrink-0 text-primary" />
                    <div>
                      <p className="font-semibold text-foreground">
                        Aerografía a domicilio
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Para piezas de gran formato en toda la Región
                        Metropolitana.
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ─── FAQ / PREGUNTAS FRECUENTES ─── */}
        <section id="faq" className="border-b border-border bg-muted/30 py-20">
          <div className="container mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <div className="mb-12 text-center">
              <Badge
                variant="outline"
                className="mb-4 border-primary/30 text-primary"
              >
                <HelpCircle className="size-3.5 mr-1.5" />
                FAQ
              </Badge>
              <h2 className="text-3xl font-bold text-foreground md:text-4xl">
                Preguntas Frecuentes
              </h2>
              <p className="mt-3 text-muted-foreground">
                Resolvemos tus dudas sobre tatuajes, aerografía, precios y
                atención en Santiago.
              </p>
            </div>

            <div className="space-y-3">
              {[
                {
                  q: "¿Dónde está ubicado Samsara Tattoo Studio?",
                  a: `Estamos en ${BUSINESS.addressStreet}, ${BUSINESS.addressComuna}, Santiago de Chile. Atendemos con cita previa en un espacio privado.`,
                },
                {
                  q: "¿Qué estilos de tatuaje realiza Wilfren Jiménez?",
                  a: "Domina realismo, línea fina, lettering, blackwork, micro realismo, geometría sagrada y proyectos personalizados.",
                },
                {
                  q: "¿Cuánto cuesta un tatuaje en Santiago?",
                  a: `El precio varía según tamaño, zona y complejidad. Cotiza gratis por WhatsApp al ${BUSINESS.phoneDisplay}.`,
                },
                {
                  q: "¿En qué comunas atienden?",
                  a: "Atendemos en toda la Región Metropolitana: Providencia, Las Condes, Ñuñoa, Vitacura, La Reina, Lo Barnechea, Maipú, Puente Alto y más de 50 comunas.",
                },
                {
                  q: "¿Hacen aerografía a domicilio?",
                  a: "Sí. Para piezas de gran formato como murales o personalización de cascos/motos, Wilfren se desplaza a tu ubicación.",
                },
                {
                  q: "¿El servicio tiene garantía?",
                  a: "Garantía de satisfacción. Después de la cicatrización, revisamos cada tatuaje para evaluar su resultado. Si requiere un retoque debido al proceso normal de cicatrización, este se realizará sin costo adicional, según evaluación del artista. La garantía no incluye cambios en el diseño, modificaciones solicitadas posteriormente por el cliente ni daños ocasionados por un cuidado inadecuado.",
                },
                {
                  q: "¿Tienen protocolos de bioseguridad?",
                  a: "Sí: material estéril y desechable de uso individual para cada cliente, esterilización certificada, estudio privado con cita previa y tintas de primera calidad.",
                },
                {
                  q: "¿Cómo agendo mi sesión?",
                  a: `Por WhatsApp al ${BUSINESS.phoneDisplay} o mediante el formulario de contacto. Coordinamos fecha y horario según tu preferencia.`,
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

            <div className="mt-8 text-center">
              <Button asChild variant="outline">
                <Link href="/preguntas-frecuentes">
                  Ver todas las preguntas
                  <ArrowRight className="ml-2 size-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* ─── CONTACTO ─── */}
        <section id="contacto" className="bg-background py-20">
          <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-10 lg:grid-cols-2">
              <div>
                <Badge
                  variant="outline"
                  className="mb-4 border-primary/30 text-primary"
                >
                  <MessageCircle className="size-3.5 mr-1.5" />
                  Contacto
                </Badge>
                <h2 className="text-3xl font-bold text-foreground md:text-4xl">
                  Agenda tu sesión en Santiago
                </h2>
                <p className="mt-4 text-muted-foreground">
                  Cotiza tu tatuaje o aerografía por WhatsApp. Respondemos en
                  minutos durante el horario de atención.
                </p>

                <ul className="mt-8 space-y-4 text-sm">
                  <li className="flex items-center gap-3">
                    <Phone className="size-5 text-primary" />
                    <a
                      href={`tel:+${BUSINESS.phoneRaw}`}
                      className="font-semibold text-foreground hover:text-primary"
                    >
                      {BUSINESS.phoneDisplay}
                    </a>
                  </li>
                  <li className="flex items-center gap-3">
                    <MapPin className="size-5 text-primary" />
                    <span className="text-muted-foreground">
                      {BUSINESS.addressStreet}, {BUSINESS.addressComuna}
                    </span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Clock className="size-5 text-primary" />
                    <span className="text-muted-foreground">{BUSINESS.hours}</span>
                  </li>
                </ul>

                <div className="mt-6 flex flex-wrap gap-3">
                  <Button asChild>
                    <a
                      href={buildWhatsAppUrl(
                        "Hola Samsara, quiero cotizar un tatuaje"
                      )}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <MessageCircle className="mr-2 size-4" />
                      WhatsApp directo
                    </a>
                  </Button>
                  <Button asChild variant="outline">
                    <Link href="/contacto">Formulario de contacto</Link>
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
                      <ExternalLink className="size-3 opacity-60" />
                    </a>
                  ))}
                </div>
              </div>

              <div className="overflow-hidden rounded-2xl border border-border shadow-lg">
                <iframe
                  src="https://www.google.com/maps?q=Guardia+Vieja+181+Providencia+Santiago+Chile&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0, minHeight: 400 }}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Ubicación Samsara Tattoo Studio en Providencia"
                />
              </div>
            </div>
          </div>
        </section>

        {/* ─── MAPA DE COMUNAS ─── */}
        <ComunasMap />
      </main>

      <SiteFooter />
      <WhatsAppFloat />

      {/* ─── MODALES ─── */}
      <EstudioModal open={estudioOpen} onOpenChange={setEstudioOpen} />
      <TatuadorModal open={tatuadorOpen} onOpenChange={setTatuadorOpen} />
      <AerografoModal open={aerografoOpen} onOpenChange={setAerografoOpen} />

      {/* ─── JSON-LD @graph ─── */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "TattooShop",
                "@id": `${BUSINESS.url}/#tattooshop`,
                name: BUSINESS.name,
                description: `Estudio de tatuajes y galería de arte en ${BUSINESS.addressComuna}, Santiago de Chile. Realismo, línea fina, lettering, blackwork y aerografía.`,
                url: BUSINESS.url,
                telephone: `+${BUSINESS.phoneRaw}`,
                image: `${BUSINESS.url}/images/estudio-de-tatuajes-providencia.jpg`,
                logo: `${BUSINESS.url}/images/samsara-tattoo-studio-logo-oficial.jpeg`,
                priceRange: "$$",
                address: {
                  "@type": "PostalAddress",
                  streetAddress: BUSINESS.addressStreet,
                  addressLocality: BUSINESS.addressComuna,
                  addressRegion: BUSINESS.addressRegion,
                  postalCode: BUSINESS.postalCode,
                  addressCountry: "CL",
                },
                geo: {
                  "@type": "GeoCoordinates",
                  latitude: BUSINESS.geo.latitude,
                  longitude: BUSINESS.geo.longitude,
                },
                openingHoursSpecification: [
                  {
                    "@type": "OpeningHoursSpecification",
                    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
                    opens: "10:00",
                    closes: "21:00",
                  },
                ],
                founder: { "@type": "Person", name: BUSINESS.artist },
                sameAs: BUSINESS.instagrams.map((ig) => ig.url),
                hasOfferCatalog: {
                  "@type": "OfferCatalog",
                  name: "Servicios de Tatuaje y Arte",
                  itemListElement: [
                    { "@type": "Offer", itemOffered: { "@type": "Service", name: "Tatuaje Realismo" } },
                    { "@type": "Offer", itemOffered: { "@type": "Service", name: "Tatuaje Línea Fina" } },
                    { "@type": "Offer", itemOffered: { "@type": "Service", name: "Tatuaje Lettering" } },
                    { "@type": "Offer", itemOffered: { "@type": "Service", name: "Tatuaje Blackwork" } },
                    { "@type": "Offer", itemOffered: { "@type": "Service", name: "Aerografía" } },
                    { "@type": "Offer", itemOffered: { "@type": "Service", name: "Pintura Acrílica" } },
                  ],
                },
              },
              {
                "@type": "ArtGallery",
                "@id": `${BUSINESS.url}/#artgallery`,
                name: `Galería de Arte - ${BUSINESS.name}`,
                description:
                  "Galería de arte con pinturas, acuarelas y aerografías originales de Wilfren Jiménez en Providencia, Santiago.",
                url: BUSINESS.url,
                address: {
                  "@type": "PostalAddress",
                  streetAddress: BUSINESS.addressStreet,
                  addressLocality: BUSINESS.addressComuna,
                  addressRegion: BUSINESS.addressRegion,
                  addressCountry: "CL",
                },
              },
              {
                "@type": "FAQPage",
                "@id": `${BUSINESS.url}/#faqpage`,
                mainEntity: [
                  {
                    "@type": "Question",
                    name: "¿Dónde está ubicado Samsara Tattoo Studio?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: `Samsara Tattoo Studio está ubicado en ${BUSINESS.addressStreet}, ${BUSINESS.addressComuna}, Santiago de Chile. Atendemos con cita previa.`,
                    },
                  },
                  {
                    "@type": "Question",
                    name: "¿Qué estilos de tatuaje realiza Wilfren Jiménez?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "Wilfren Jiménez domina realismo, línea fina (fine line), lettering, blackwork, micro realismo, geometría sagrada y proyectos 100% personalizados.",
                    },
                  },
                  {
                    "@type": "Question",
                    name: "¿Ofrecen aerografía a domicilio en Santiago?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "Sí. Para piezas de gran formato como murales o personalizaciones de cascos/motos, Wilfren se desplaza a tu ubicación en toda la Región Metropolitana de Santiago.",
                    },
                  },
                  {
                    "@type": "Question",
                    name: "¿Cómo agendo una sesión de tatuaje?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: `Puedes agendar por WhatsApp al ${BUSINESS.phoneDisplay} o mediante el formulario de contacto en la web. Cotizamos tu idea y coordinamos fecha.`,
                    },
                  },
                  {
                    "@type": "Question",
                    name: "¿El servicio tiene garantía?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "Garantía de satisfacción. Después de la cicatrización, revisamos cada tatuaje para evaluar su resultado. Si requiere un retoque debido al proceso normal de cicatrización, este se realizará sin costo adicional, según evaluación del artista. La garantía no incluye cambios en el diseño, modificaciones solicitadas posteriormente por el cliente ni daños ocasionados por un cuidado inadecuado.",
                    },
                  },
                ],
              },
            ],
          }),
        }}
      />
    </>
  );
}
