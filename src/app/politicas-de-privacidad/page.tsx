import type { Metadata } from "next";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SiteNavbar } from "@/components/site-navbar";
import { SiteFooter } from "@/components/site-footer";
import { WhatsAppFloat } from "@/components/whatsapp-float";
import { BUSINESS } from "@/lib/business-data";
import { ArrowLeft, Shield, Mail, Phone } from "lucide-react";

export const metadata: Metadata = {
  title: "Política de Privacidad | Samsara Tattoo Studio",
  description:
    "Política de privacidad de Samsara Tattoo Studio. Cómo recopilamos, usamos y protegemos tus datos personales en cumplimiento de la Ley 19.628 de Protección de Datos Personales de Chile.",
  alternates: { canonical: "/politicas-de-privacidad" },
  robots: { index: true, follow: true },
};

export default function PoliticasPrivacidadPage() {
  return (
    <>
      <SiteNavbar />
      <main className="flex-1">
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
              Legal
            </Badge>
            <h1 className="text-3xl font-bold text-foreground md:text-4xl">
              Política de Privacidad
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Última actualización: {new Date().getFullYear()}
            </p>
          </div>
        </section>

        <section className="border-b border-border bg-background py-16">
          <div className="container mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <div className="prose prose-invert max-w-none space-y-6 text-muted-foreground">
              <div>
                <h2 className="text-xl font-semibold text-foreground">
                  1. Información que recopilamos
                </h2>
                <p className="mt-2 text-sm">
                  Samsara Tattoo Studio ({BUSINESS.url}) recopila la siguiente
                  información personal cuando llenas el formulario de contacto o
                  cotizas por WhatsApp:
                </p>
                <ul className="mt-2 list-disc space-y-1 pl-6 text-sm">
                  <li>Nombre completo</li>
                  <li>Número de teléfono / WhatsApp</li>
                  <li>Correo electrónico (si se proporciona)</li>
                  <li>Descripción del servicio solicitado</li>
                  <li>Datos de la cita (fecha, horario, comuna)</li>
                </ul>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-foreground">
                  2. Uso de la información
                </h2>
                <p className="mt-2 text-sm">
                  Utilizamos tus datos personales exclusivamente para:
                </p>
                <ul className="mt-2 list-disc space-y-1 pl-6 text-sm">
                  <li>Responder a tus cotizaciones y consultas</li>
                  <li>Agendar y gestionar citas de tatuaje o aerografía</li>
                  <li>Enviar recordatorios de citas</li>
                  <li>Cumplir con obligaciones tributarias (boleta/factura)</li>
                  <li>Mejorar nuestros servicios</li>
                </ul>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-foreground">
                  3. Base legal
                </h2>
                <p className="mt-2 text-sm">
                  El tratamiento de tus datos se realiza en cumplimiento de la{" "}
                  <strong>Ley 19.628 de Protección de Datos Personales</strong>{" "}
                  de Chile y el Reglamento General de Protección de Datos (RGPD)
                  de la Unión Europea cuando aplique.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-foreground">
                  4. Compartir información
                </h2>
                <p className="mt-2 text-sm">
                  No vendemos ni alquilamos tus datos personales. Solo
                  compartimos información con terceros cuando sea necesario para:
                </p>
                <ul className="mt-2 list-disc space-y-1 pl-6 text-sm">
                  <li>WhatsApp (Meta) para responder tus cotizaciones</li>
                  <li>Servicios de pago (al procesar transacciones)</li>
                  <li>Google Maps para ubicación del estudio</li>
                  <li>Instagram (Meta) para mostrar nuestro trabajo</li>
                </ul>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-foreground">
                  5. Conservación de datos
                </h2>
                <p className="mt-2 text-sm">
                  Conservamos tus datos durante el tiempo necesario para cumplir
                  con los fines descritos y durante el plazo legal exigido para
                  fines tributarios (al menos 5 años según SII de Chile).
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-foreground">
                  6. Tus derechos
                </h2>
                <p className="mt-2 text-sm">
                  Como titular de los datos, tienes derecho a:
                </p>
                <ul className="mt-2 list-disc space-y-1 pl-6 text-sm">
                  <li>Acceder a tus datos personales</li>
                  <li>Solicitar la rectificación de datos inexactos</li>
                  <li>Solicitar la eliminación de tus datos</li>
                  <li>Oponerte al tratamiento de tus datos</li>
                  <li>Solicitar la portabilidad de tus datos</li>
                </ul>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-foreground">
                  7. Cookies
                </h2>
                <p className="mt-2 text-sm">
                  Este sitio web no utiliza cookies de seguimiento comercial.
                  Solo se utilizan cookies técnicas necesarias para el
                  funcionamiento del sitio.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-foreground">
                  8. Seguridad
                </h2>
                <p className="mt-2 text-sm">
                  Implementamos medidas de seguridad técnicas y organizativas
                  para proteger tus datos personales contra acceso no autorizado,
                  alteración, divulgación o destrucción.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-foreground">
                  9. Contacto
                </h2>
                <p className="mt-2 text-sm">
                  Si tienes preguntas sobre esta política de privacidad o
                  quieres ejercer tus derechos, contáctanos:
                </p>
                <div className="mt-3 flex flex-wrap gap-4 text-sm">
                  <span className="flex items-center gap-2 text-muted-foreground">
                    <Phone className="size-4 text-primary" />
                    {BUSINESS.phoneDisplay}
                  </span>
                  <span className="flex items-center gap-2 text-muted-foreground">
                    <Mail className="size-4 text-primary" />
                    contacto@samsara-tattoo.pages.dev
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
      <WhatsAppFloat />
    </>
  );
}
