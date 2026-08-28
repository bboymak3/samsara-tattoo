import type { Metadata } from "next";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SiteNavbar } from "@/components/site-navbar";
import { SiteFooter } from "@/components/site-footer";
import { WhatsAppFloat } from "@/components/whatsapp-float";
import { BUSINESS, buildWhatsAppUrl } from "@/lib/business-data";
import { ArrowLeft, MessageCircle, ChevronDown } from "lucide-react";

export const metadata: Metadata = {
  title: "Preguntas Frecuentes | Samsara Tattoo Studio",
  description:
    "Resolvemos tus dudas sobre tatuajes, aerografía, bioseguridad, precios, zonas de atención y más. Samsara Tattoo Studio en Providencia, Santiago de Chile.",
  alternates: { canonical: "/preguntas-frecuentes" },
  openGraph: {
    title: "Preguntas Frecuentes | Samsara Tattoo Studio",
    description: "Dudas frecuentes sobre tatuajes y aerografía en Santiago de Chile.",
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

const FAQS = [
  {
    q: "¿Dónde está ubicado Samsara Tattoo Studio?",
    a: `Estamos en ${BUSINESS.addressStreet}, ${BUSINESS.addressComuna}, Santiago de Chile. Atendemos con cita previa en un espacio privado y profesional.`,
  },
  {
    q: "¿Qué estilos de tatuaje realiza Wilfren Jiménez?",
    a: "Domina realismo, línea fina (fine line), lettering, blackwork, microrealismo, geometría sagrada y proyectos 100% personalizados.",
  },
  {
    q: "¿Cuánto cuesta un tatuaje en Santiago?",
    a: `El precio varía según tamaño, zona corporal, nivel de detalle y estilo. Cotiza gratis por WhatsApp al ${BUSINESS.phoneDisplay} con respuesta inmediata.`,
  },
  {
    q: "¿En qué comunas de Santiago atienden?",
    a: "Atendemos en toda la Región Metropolitana: Providencia, Las Condes, Ñuñoa, Vitacura, La Reina, Lo Barnechea, Santiago Centro, Maipú, Puente Alto y más de 50 comunas.",
  },
  {
    q: "¿Hacen aerografía a domicilio en Santiago?",
    a: "Sí. Para piezas de gran formato como murales o personalización de cascos/motos, Wilfren se desplaza a tu ubicación en toda la Región Metropolitana.",
  },
  {
    q: "¿Cómo agendo una sesión de tatuaje?",
    a: `Puedes agendar por WhatsApp al ${BUSINESS.phoneDisplay} o mediante el formulario de contacto en la web. Coordinamos fecha y horario según tu preferencia.`,
  },
  {
    q: "¿El estudio tiene protocolos de bioseguridad?",
    a: "Sí. Trabajamos con material 100% desechable, esterilización certificada, tintas de primera calidad y estudio privado con cita previa.",
  },
  {
    q: "¿Ofrecen boleta o factura?",
    a: "Sí, emitimos boleta o factura según tu requerimiento. Solo indícalo al momento de solicitar tu cotización.",
  },
  {
    q: "¿Puedo agendar para fin de semana?",
    a: `Sí, atendemos de lunes a sábado. ${BUSINESS.hours}. Agenda con anticipación para asegurar tu horario preferido.`,
  },
  {
    q: "¿El servicio tiene garantía?",
    a: "Sí, todos nuestros servicios cuentan con garantía de satisfacción. Si no quedas conforme, volvemos a realizar el retoque sin costo adicional.",
  },
  {
    q: "¿Limpian tapicería de autos, alfombras y muebles?",
    a: "No, eso no es nuestro servicio. Nosotros hacemos tatuajes en piel y aerografía/pintura en superficies (lienzos, cascos, motos, etc.).",
  },
  {
    q: "¿Hacen tatuajes en pareja?",
    a: "Sí, hacemos tatuajes en pareja, matching tattoos y diseños coordinados. Cotiza con anticipación para reservar el tiempo necesario.",
  },
  {
    q: "¿Tienen galería de arte?",
    a: "Sí, contamos con una galería de obras originales de Wilfren Jiménez: pinturas, acuarelas y aerografías disponibles para venta. Visitas con cita previa.",
  },
  {
    q: "¿Aceptan encargos por comisión?",
    a: "Sí, aceptamos encargos por comisión para obras únicas: pinturas, aerografías y proyectos especiales. Cuéntanos tu idea y la materializamos.",
  },
  {
    q: "¿Qué debo preparar antes del tatuaje?",
    a: "Solo tener la piel limpia y bien hidratada. Ven con ropa cómoda que permita acceder a la zona a tatuar. Nuestro equipo se encarga del resto.",
  },
  {
    q: "¿Atienden emergencias de tatuaje?",
    a: `Sí, atendemos emergencias las 24 horas. Llámanos al ${BUSINESS.phoneDisplay} y responderemos lo antes posible.`,
  },
];

export default function PreguntasFrecuentesPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: { "@type": "Answer", text: faq.a },
    })),
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
              FAQ
            </Badge>
            <h1 className="text-3xl font-bold text-foreground md:text-4xl lg:text-5xl">
              Preguntas Frecuentes
            </h1>
            <p className="mt-4 text-base text-muted-foreground md:text-lg">
              Resolvemos tus dudas sobre tatuajes, aerografía, bioseguridad,
              precios y zonas de atención en Santiago de Chile.
            </p>
          </div>
        </section>

        <section className="border-b border-border bg-background py-16">
          <div className="container mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <div className="space-y-4">
              {FAQS.map((faq, i) => (
                <details
                  key={i}
                  className="group rounded-xl border border-border bg-muted/30 p-5"
                >
                  <summary className="flex cursor-pointer items-center justify-between font-semibold text-foreground">
                    {faq.q}
                    <ChevronDown className="size-5 transition-transform group-open:rotate-180" />
                  </summary>
                  <p className="mt-3 text-sm text-muted-foreground">{faq.a}</p>
                </details>
              ))}
            </div>

            <div className="mt-10 rounded-2xl border border-primary/20 bg-primary/5 p-6 text-center">
              <h2 className="text-xl font-semibold text-foreground">
                ¿Tienes otra duda?
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Escríbenos por WhatsApp y te respondemos en minutos.
              </p>
              <Button asChild className="mt-4">
                <a
                  href={buildWhatsAppUrl("Hola Samsara, tengo una duda")}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageCircle className="mr-2 size-4" />
                  WhatsApp: {BUSINESS.phoneDisplay}
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
