import type { Metadata } from "next";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SiteNavbar } from "@/components/site-navbar";
import { SiteFooter } from "@/components/site-footer";
import { WhatsAppFloat } from "@/components/whatsapp-float";
import { BUSINESS, buildWhatsAppUrl } from "@/lib/business-data";
import {
  ArrowLeft,
  Shield,
  Sparkles,
  Droplet,
  Hand,
  Clock,
  CheckCircle2,
  MessageCircle,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Política de Higiene y Bioseguridad | Samsara Tattoo Studio",
  description:
    "Protocolos de bioseguridad e higiene de Samsara Tattoo Studio en Providencia, Santiago. Material desechable, esterilización, estudio privado y certificaciones de Wilfren Jiménez.",
  alternates: { canonical: "/politica-de-higiene" },
  openGraph: {
    title: "Política de Higiene y Bioseguridad | Samsara Tattoo Studio",
    description:
      "Protocolos estrictos de bioseguridad: material desechable, esterilización, estudio privado con cita previa.",
    images: [{ url: "/banner.jpg" }],
  },
};

const PROTOCOLOS = [
  {
    icon: Hand,
    title: "Material 100% Desechable",
    description:
      "Todos los materiales que entran en contacto con la piel son desechables: agujas, guantes, cartuchos, tintas individuales y papel de la camilla. Nunca reutilizamos material.",
  },
  {
    icon: Droplet,
    title: "Esterilización Certificada",
    description:
      "Utilizamos autoclave para esterilizar todo el material no desechable. Las superficies de trabajo se desinfectan con alcohol al 70% entre cada cliente.",
  },
  {
    icon: Shield,
    title: "Estudio Privado con Cita Previa",
    description:
      "Atendemos con cita previa en un espacio privado y exclusivo. No hay circulación de personas ajenas al servicio durante tu sesión.",
  },
  {
    icon: Sparkles,
    title: "Tintas de Primera Calidad",
    description:
      "Usamos tintas profesionales importadas de marcas certificadas (Kuro Sumi, Dynamic, Intenze), libres de metales pesados y aprobadas para uso en piel humana.",
  },
  {
    icon: CheckCircle2,
    title: "Protocolo de Barrera",
    description:
      "El artista usa guantes nuevos en cada sesión, cubre todas las superficies con film desechable y mantiene una zona estéril para el material.",
  },
  {
    icon: Clock,
    title: "Atención 24/7 para Emergencias",
    description:
      "Disponibilidad las 24 horas para consultas post-tatuaje. Si tienes cualquier duda o reacción inesperada, contáctanos inmediatamente.",
  },
];

export default function PoliticaHigienePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "¿Qué protocolos de bioseguridad tiene Samsara Tattoo Studio?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Usamos material 100% desechable, esterilización con autoclave, estudio privado con cita previa, tintas certificadas y protocolo de barrera en cada sesión.",
        },
      },
      {
        "@type": "Question",
        name: "¿Las agujas de tatuaje son desechables?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Sí, todas las agujas y cartuchos son desechables y de un solo uso. Se abren frente al cliente y se desechan en contenedor especial después de la sesión.",
        },
      },
      {
        "@type": "Question",
        name: "¿Cómo se desinfecta el estudio?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Las superficies se desinfectan con alcohol al 70% entre cada cliente. La camilla se cubre con film desechable. El suelo y áreas comunes se limpian con productos desinfectantes profesionales.",
        },
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
              <Link href="/">
                <ArrowLeft className="mr-2 size-4" />
                Volver al inicio
              </Link>
            </Button>
            <Badge
              variant="outline"
              className="mb-4 border-primary/30 text-primary"
            >
              <Shield className="size-3.5 mr-1.5" />
              Bioseguridad Certificada
            </Badge>
            <h1 className="text-3xl font-bold text-foreground md:text-4xl lg:text-5xl">
              Política de Higiene y Bioseguridad
            </h1>
            <p className="mt-4 max-w-3xl text-base text-muted-foreground md:text-lg">
              En Samsara Tattoo Studio priorizamos tu salud y seguridad. Cada
              sesión se realiza siguiendo protocolos estrictos de bioseguridad
              para garantizar una experiencia limpia, segura y profesional.
            </p>
          </div>
        </section>

        <section className="border-b border-border bg-background py-16">
          <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {PROTOCOLOS.map((protocol, i) => {
                const Icon = protocol.icon;
                return (
                  <div
                    key={i}
                    className="rounded-2xl border border-border bg-muted/30 p-6"
                  >
                    <div className="flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <Icon className="size-6" />
                    </div>
                    <h3 className="mt-4 font-semibold text-foreground">
                      {protocol.title}
                    </h3>
                    <p className="mt-2 text-sm text-muted-foreground">
                      {protocol.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section className="border-b border-border bg-muted/30 py-16">
          <div className="container mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <h2 className="mb-6 text-2xl font-bold text-foreground">
              Cuidados Post-Tatuaje
            </h2>
            <div className="space-y-4">
              {[
                "Retira el vendaje después de 2-4 horas y lava con agua tibia y jabón neutro.",
                "Aplica una capa fina de crema hidratante (recomendada por el artista) 3-4 veces al día.",
                "No rasques ni arranque las costras que se formen durante la cicatrización.",
                "Evita la exposición directa al sol, piscinas y saunas durante 2 semanas.",
                "Mantén la zona limpia y seca, usa ropa holgada que no roce el tatuaje.",
                "Si notas enrojecimiento, hinchazón o secreción anormal, contáctanos inmediatamente.",
              ].map((cuidado, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 rounded-xl border border-border bg-background p-4"
                >
                  <CheckCircle2 className="mt-0.5 size-5 flex-shrink-0 text-primary" />
                  <p className="text-sm text-foreground">{cuidado}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-primary py-12 text-center">
          <div className="container mx-auto max-w-4xl px-4">
            <h2 className="text-2xl font-bold text-primary-foreground md:text-3xl">
              ¿Tienes dudas sobre bioseguridad?
            </h2>
            <p className="mt-2 text-primary-foreground/80">
              Escríbenos y te explicamos todos los protocolos antes de tu sesión.
            </p>
            <Button
              asChild
              size="lg"
              className="mt-4 bg-background text-primary hover:bg-background/90"
            >
              <a
                href={buildWhatsAppUrl(
                  "Hola Samsara, tengo dudas sobre bioseguridad"
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
