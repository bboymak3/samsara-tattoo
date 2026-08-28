"use client";

import Link from "next/link";
import { Instagram, MapPin, Phone, Clock, ExternalLink } from "lucide-react";
import { BUSINESS } from "@/lib/business-data";

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-border bg-zinc-950/60">
      <div className="container mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-3">
          {/* Marca */}
          <div>
            <div className="flex items-center gap-2.5">
              <span className="flex size-9 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold text-lg shadow-md shadow-primary/30">
                S
              </span>
              <div className="leading-none">
                <p className="text-sm font-semibold tracking-wide text-foreground">
                  SAMSARA
                </p>
                <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                  Tattoo Studio
                </p>
              </div>
            </div>
            <p className="mt-4 text-sm text-muted-foreground">
              {BUSINESS.artist} · {BUSINESS.artistRole}.{" "}
              {BUSINESS.experienceYears} años de experiencia transformando ideas
              en arte corporal y visual.
            </p>
            <p className="mt-3 text-xs italic text-muted-foreground/80">
              &ldquo;{BUSINESS.tagline}&rdquo;
            </p>
          </div>

          {/* Instagrams */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">
              Síguenos
            </h3>
            <ul className="mt-4 space-y-3">
              {BUSINESS.instagrams.map((ig) => (
                <li key={ig.url}>
                  <a
                    href={ig.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-3 text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    <Instagram className="size-4" />
                    <span>
                      <span className="block font-medium text-foreground group-hover:text-primary">
                        {ig.label}
                      </span>
                      <span className="text-xs">{ig.handle}</span>
                    </span>
                    <ExternalLink className="ml-auto size-3 opacity-0 transition-opacity group-hover:opacity-100" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">
              Contacto
            </h3>
            <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 size-4 flex-shrink-0 text-primary" />
                <span>
                  {BUSINESS.addressStreet}
                  <br />
                  {BUSINESS.addressComuna}, {BUSINESS.addressRegion}
                  <br />
                  {BUSINESS.addressCountry}
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="size-4 flex-shrink-0 text-primary" />
                <a
                  href={`tel:+${BUSINESS.phoneRaw}`}
                  className="transition-colors hover:text-primary"
                >
                  {BUSINESS.phoneDisplay}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Clock className="size-4 flex-shrink-0 text-primary" />
                <span>{BUSINESS.hours}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-border/60 pt-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs text-muted-foreground">
              &copy; {new Date().getFullYear()} {BUSINESS.name}. Todos los derechos reservados.
            </p>
            <nav className="flex flex-wrap gap-4 text-xs">
              <Link href="/quienes-somos" className="text-muted-foreground transition-colors hover:text-primary">
                Quiénes Somos
              </Link>
              <Link href="/contacto" className="text-muted-foreground transition-colors hover:text-primary">
                Contacto
              </Link>
              <Link href="/galeria" className="text-muted-foreground transition-colors hover:text-primary">
                Galería
              </Link>
              <Link href="/comunas" className="text-muted-foreground transition-colors hover:text-primary">
                Comunas
              </Link>
            </nav>
          </div>

          <div className="mt-4 border-t border-border/40 pt-4 text-center">
            <p className="text-xs text-muted-foreground">
              <a
                href="https://en-santiago.pages.dev/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-muted-foreground transition-colors hover:text-primary"
              >
                Página web desarrollada por Grupo 360 Soluciones
              </a>
              {" "}-{" "}
              <a
                href="https://en-santiago.pages.dev/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground transition-colors hover:text-primary"
              >
                Diseño de páginas webs - SEO Local
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
