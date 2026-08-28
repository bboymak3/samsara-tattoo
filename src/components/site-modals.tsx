"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import {
  MapPin,
  Clock,
  Shield,
  Instagram,
  Brush,
  Wind,
  Sparkles,
  Award,
  Palette,
  ExternalLink,
} from "lucide-react";
import { BUSINESS } from "@/lib/business-data";

interface ModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

/* ──────────────── Modal 1: Info Estudio ──────────────── */
export function EstudioModal({ open, onOpenChange }: ModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl bg-zinc-950 border-border text-foreground">
        <DialogHeader>
          <Badge className="mb-2 w-fit bg-primary/15 text-primary border-primary/30">
            <Shield className="size-3.5 mr-1.5" />
            Estudio Privado
          </Badge>
          <DialogTitle className="text-2xl text-foreground">
            SAMSARA TATTOO STUDIO
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Estudio de tatuajes y galería de arte en Providencia, Santiago de Chile.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-5 text-sm">
          <div className="flex items-start gap-3">
            <MapPin className="mt-0.5 size-4 flex-shrink-0 text-primary" />
            <div>
              <p className="font-semibold text-foreground">Ubicación</p>
              <p className="text-muted-foreground">
                {BUSINESS.addressStreet}
                <br />
                {BUSINESS.addressComuna}, {BUSINESS.addressRegion}
                <br />
                {BUSINESS.addressCountry}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Clock className="mt-0.5 size-4 flex-shrink-0 text-primary" />
            <div>
              <p className="font-semibold text-foreground">Horario</p>
              <p className="text-muted-foreground">{BUSINESS.hours}</p>
            </div>
          </div>

          <div className="rounded-lg border border-primary/20 bg-primary/5 p-4">
            <p className="flex items-center gap-2 font-semibold text-primary">
              <Shield className="size-4" />
              Estándares de Bioseguridad
            </p>
            <ul className="mt-3 space-y-2 text-muted-foreground">
              <li className="flex items-start gap-2">
                <Sparkles className="mt-0.5 size-3.5 flex-shrink-0 text-primary" />
                Estudio privado con cita previa
              </li>
              <li className="flex items-start gap-2">
                <Sparkles className="mt-0.5 size-3.5 flex-shrink-0 text-primary" />
                Material 100% desechable y esterilizado
              </li>
              <li className="flex items-start gap-2">
                <Sparkles className="mt-0.5 size-3.5 flex-shrink-0 text-primary" />
                Bioseguridad certificada
              </li>
              <li className="flex items-start gap-2">
                <Sparkles className="mt-0.5 size-3.5 flex-shrink-0 text-primary" />
                Tintas de primera calidad importadas
              </li>
            </ul>
          </div>

          <div className="flex flex-wrap gap-3">
            <a
              href={BUSINESS.instagrams[0].url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-br from-fuchsia-500 to-amber-500 px-4 py-2 text-sm font-semibold text-white"
            >
              <Instagram className="size-4" />
              Ver Instagram
              <ExternalLink className="size-3" />
            </a>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

/* ──────────────── Modal 2: Info Tatuador ──────────────── */
export function TatuadorModal({ open, onOpenChange }: ModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl bg-zinc-950 border-border text-foreground">
        <DialogHeader>
          <Badge className="mb-2 w-fit bg-primary/15 text-primary border-primary/30">
            <Award className="size-3.5 mr-1.5" />
            {BUSINESS.experienceYears} años de experiencia
          </Badge>
          <DialogTitle className="text-2xl text-foreground">
            Wilfren Jiménez
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            {BUSINESS.artistRole} · Tatuador y aerografista profesional
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 text-sm">
          <p className="text-muted-foreground">
            <span className="font-semibold text-foreground">Wilfren Jiménez</span> es
            el artista detrás de Samsara Tattoo Studio, con más de{" "}
            <strong className="text-primary">{BUSINESS.experienceYears} años de
            experiencia</strong> en la industria del tatuaje y las artes
            plásticas. Su versatilidad le permite plasmar arte tanto en piel como
            en lienzo, dominando técnicas que van desde el realismo hiperdetallado
            hasta la aerografía de gran formato.
          </p>

          <p className="text-muted-foreground">
            <span className="font-semibold text-foreground">Filosofía:</span>{" "}
            <em className="text-foreground/80">&ldquo;{BUSINESS.tagline}&rdquo;</em>
          </p>

          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-lg border border-border bg-muted/30 p-3">
              <p className="flex items-center gap-2 font-semibold text-foreground">
                <Brush className="size-4 text-primary" />
                Especialidades en Tatuaje
              </p>
              <ul className="mt-2 space-y-1 text-xs text-muted-foreground">
                <li>• Realismo hiperdetallado</li>
                <li>• Blackwork a gran escala</li>
                <li>• Línea fina y minimalismo</li>
                <li>• Lettering personalizado</li>
                <li>• Microrealismo</li>
                <li>• Geometría sagrada</li>
              </ul>
            </div>

            <div className="rounded-lg border border-border bg-muted/30 p-3">
              <p className="flex items-center gap-2 font-semibold text-foreground">
                <Palette className="size-4 text-primary" />
                Artes Visuales
              </p>
              <ul className="mt-2 space-y-1 text-xs text-muted-foreground">
                <li>• Aerografía (Airbrush Art)</li>
                <li>• Pintura acrílica</li>
                <li>• Acuarela</li>
                <li>• Encargos por comisión</li>
                <li>• Murales</li>
                <li>• Galería de obras</li>
              </ul>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            {BUSINESS.instagrams.slice(0, 2).map((ig) => (
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
      </DialogContent>
    </Dialog>
  );
}

/* ──────────────── Modal 3: Aerógrafo ──────────────── */
export function AerografoModal({ open, onOpenChange }: ModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl bg-zinc-950 border-border text-foreground">
        <DialogHeader>
          <Badge className="mb-2 w-fit bg-primary/15 text-primary border-primary/30">
            <Wind className="size-3.5 mr-1.5" />
            Airbrush Art
          </Badge>
          <DialogTitle className="text-2xl text-foreground">
            Aerografía - Wilfren Jiménez (@wil_airbrush)
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Pintura con aerógrafo de alto nivel sobre cualquier superficie.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 text-sm">
          <p className="text-muted-foreground">
            Wilfren Jiménez también es aerografista profesional bajo el seudónimo{" "}
            <a
              href={BUSINESS.instagrams[2].url}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-primary underline"
            >
              @wil_airbrush
            </a>
            . Con técnica de airbrush crea murales, lienzos, cascos, motos,
            guitarras y cualquier superficie personalizable. La aerografía permite
            degradados suaves y efectos imposibles con pincel.
          </p>

          <div className="rounded-lg border border-primary/20 bg-primary/5 p-4">
            <p className="flex items-center gap-2 font-semibold text-primary">
              <Sparkles className="size-4" />
              Servicios de Aerografía
            </p>
            <ul className="mt-3 space-y-2 text-muted-foreground">
              <li className="flex items-start gap-2">
                <Wind className="mt-0.5 size-3.5 flex-shrink-0 text-primary" />
                <span>
                  <strong className="text-foreground">Murales y grandes formatos</strong>
                  {" "}— Paredes, fachadas y espacios amplios con técnicas de aerografía profesional.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <Wind className="mt-0.5 size-3.5 flex-shrink-0 text-primary" />
                <span>
                  <strong className="text-foreground">Cascos, motos y vehículos</strong>
                  {" "}— Personalización de cascos, motocicletas, autos y bicicletas con diseños únicos.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <Wind className="mt-0.5 size-3.5 flex-shrink-0 text-primary" />
                <span>
                  <strong className="text-foreground">Guitarras e instrumentos</strong>
                  {" "}— Aerografía sobre guitarras eléctricas, acústicas y otros instrumentos.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <Wind className="mt-0.5 size-3.5 flex-shrink-0 text-primary" />
                <span>
                  <strong className="text-foreground">Lienzos y encargos</strong>
                  {" "}— Obras en lienzo con técnica de aerografía para decoración y coleccionistas.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <Wind className="mt-0.5 size-3.5 flex-shrink-0 text-primary" />
                <span>
                  <strong className="text-foreground">A domicilio en Santiago</strong>
                  {" "}— Para piezas de gran formato, Wilfren se desplaza a tu ubicación en toda la Región Metropolitana.
                </span>
              </li>
            </ul>
          </div>

          <div className="flex flex-wrap gap-3">
            <a
              href={BUSINESS.instagrams[2].url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-br from-fuchsia-500 to-amber-500 px-4 py-2 text-sm font-semibold text-white"
            >
              <Instagram className="size-4" />
              Ver @wil_airbrush
              <ExternalLink className="size-3" />
            </a>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
