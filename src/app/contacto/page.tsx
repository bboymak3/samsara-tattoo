"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { SiteNavbar } from "@/components/site-navbar";
import { SiteFooter } from "@/components/site-footer";
import { WhatsAppFloat } from "@/components/whatsapp-float";
import { BUSINESS, SERVICES, buildWhatsAppUrl } from "@/lib/business-data";
import {
  MessageCircle,
  Phone,
  MapPin,
  Clock,
  Instagram,
  Send,
} from "lucide-react";

export default function ContactoPage() {
  const [form, setForm] = useState({
    nombre: "",
    whatsapp: "",
    servicio: "",
    estilo: "",
    descripcion: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const msg = `Hola Samsara, soy ${form.nombre}.
Mi WhatsApp: ${form.whatsapp}
Tipo de servicio: ${form.servicio}
Estilo deseado: ${form.estilo}
Idea: ${form.descripcion}`;
    window.open(buildWhatsAppUrl(msg), "_blank");
  };

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
              <MessageCircle className="size-3.5 mr-1.5" />
              Contacto
            </Badge>
            <h1 className="text-4xl font-bold text-foreground md:text-5xl">
              Contáctanos
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Cotiza tu tatuaje o aerografía. Respondemos en minutos durante el
              horario de atención.
            </p>
          </div>
        </section>

        <section className="border-b border-border bg-background py-16">
          <div className="container mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-10 lg:grid-cols-2">
              <div>
                <h2 className="text-2xl font-bold text-foreground">
                  Datos de Contacto
                </h2>
                <ul className="mt-6 space-y-4 text-sm">
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

                <Button
                  asChild
                  className="mt-6"
                  size="lg"
                >
                  <a
                    href={buildWhatsAppUrl(
                      "Hola Samsara, quiero cotizar un tatuaje"
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <MessageCircle className="mr-2 size-5" />
                    WhatsApp directo
                  </a>
                </Button>

                <h3 className="mt-10 text-lg font-semibold text-foreground">
                  Redes Sociales
                </h3>
                <div className="mt-3 flex flex-wrap gap-3">
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
                    </a>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl border border-border bg-muted/30 p-6 shadow-lg">
                <h2 className="text-xl font-bold text-foreground">
                  Formulario de Cotización
                </h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  Completa el formulario y te redirigiremos a WhatsApp con el
                  mensaje listo.
                </p>
                <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                  <div>
                    <Label htmlFor="nombre">Nombre *</Label>
                    <Input
                      id="nombre"
                      required
                      value={form.nombre}
                      onChange={(e) =>
                        setForm({ ...form, nombre: e.target.value })
                      }
                      placeholder="Tu nombre"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="whatsapp">Tu WhatsApp *</Label>
                    <Input
                      id="whatsapp"
                      required
                      value={form.whatsapp}
                      onChange={(e) =>
                        setForm({ ...form, whatsapp: e.target.value })
                      }
                      placeholder="+56 9 1234 5678"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="servicio">Tipo de Servicio *</Label>
                    <select
                      id="servicio"
                      required
                      value={form.servicio}
                      onChange={(e) =>
                        setForm({ ...form, servicio: e.target.value })
                      }
                      className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground"
                    >
                      <option value="">Selecciona...</option>
                      <optgroup label="Tatuajes">
                        {SERVICES.filter((s) => s.category === "tatuaje").map(
                          (s) => (
                            <option key={s.slug} value={s.title}>
                              {s.title}
                            </option>
                          )
                        )}
                      </optgroup>
                      <optgroup label="Artes Visuales">
                        {SERVICES.filter((s) => s.category === "arte").map(
                          (s) => (
                            <option key={s.slug} value={s.title}>
                              {s.title}
                            </option>
                          )
                        )}
                      </optgroup>
                    </select>
                  </div>
                  <div>
                    <Label htmlFor="estilo">Estilo / Tamaño / Zona</Label>
                    <Input
                      id="estilo"
                      value={form.estilo}
                      onChange={(e) =>
                        setForm({ ...form, estilo: e.target.value })
                      }
                      placeholder="Ej: Realismo, antebrazo, 15cm"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="descripcion">Describe tu idea</Label>
                    <Textarea
                      id="descripcion"
                      value={form.descripcion}
                      onChange={(e) =>
                        setForm({ ...form, descripcion: e.target.value })
                      }
                      placeholder="Cuéntanos qué quieres tatuarte o pintar..."
                      className="mt-1 min-h-[120px]"
                    />
                  </div>
                  <Button type="submit" size="lg" className="w-full">
                    <Send className="mr-2 size-4" />
                    Enviar por WhatsApp
                  </Button>
                </form>
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
