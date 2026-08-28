"use client";

import * as React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Menu, MessageCircle, MapPin, Brush, ChevronDown } from "lucide-react";
import { BUSINESS, SERVICES, COMUNAS, buildWhatsAppUrl } from "@/lib/business-data";
import { cn } from "@/lib/utils";

export function SiteNavbar() {
  const [open, setOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const addressFull = `${BUSINESS.addressStreet}, ${BUSINESS.addressComuna}, ${BUSINESS.addressRegion}, ${BUSINESS.addressCountry}`;

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b border-border/80 bg-background/90 backdrop-blur-md transition-shadow",
        scrolled && "shadow-md shadow-black/40"
      )}
    >
      <div className="container mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2.5"
          aria-label="Samsara Tattoo Studio - Inicio"
        >
          <img
            src={BUSINESS.logoUrl}
            alt="Samsara Tattoo Studio"
            className="size-10 rounded-lg"
          />
          <span className="hidden flex-col leading-none sm:flex">
            <span className="text-sm font-semibold tracking-wide text-foreground">
              SAMSARA
            </span>
            <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
              Tattoo Studio
            </span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 md:flex">
          <Link
            href="/#inicio"
            className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary/60 hover:text-foreground"
          >
            Inicio
          </Link>
          <Link
            href="/#artista"
            className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary/60 hover:text-foreground"
          >
            Artista
          </Link>

          {/* Dropdown Servicios */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary/60 hover:text-foreground">
                Servicios
                <ChevronDown className="size-3.5" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="start"
              className="w-64 max-h-[400px] overflow-y-auto bg-background border-border"
            >
              <DropdownMenuLabel className="text-primary">
                Tatuajes
              </DropdownMenuLabel>
              {SERVICES.filter((s) => s.category === "tatuaje").map((service) => (
                <DropdownMenuItem key={service.slug} asChild>
                  <Link
                    href={`/servicios/${service.slug}`}
                    className="cursor-pointer"
                  >
                    <Brush className="mr-2 size-3.5 text-primary" />
                    {service.title}
                  </Link>
                </DropdownMenuItem>
              ))}
              <DropdownMenuSeparator />
              <DropdownMenuLabel className="text-primary">
                Artes Visuales
              </DropdownMenuLabel>
              {SERVICES.filter((s) => s.category === "arte").map((service) => (
                <DropdownMenuItem key={service.slug} asChild>
                  <Link
                    href={`/servicios/${service.slug}`}
                    className="cursor-pointer"
                  >
                    <Brush className="mr-2 size-3.5 text-primary" />
                    {service.title}
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Botón Comunas con dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary/60 hover:text-foreground">
                <MapPin className="size-3.5 mr-0.5" />
                Comunas
                <ChevronDown className="size-3.5" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="start"
              className="w-72 max-h-[400px] overflow-y-auto bg-background border-border"
            >
              <DropdownMenuItem asChild>
                <Link href="/comunas" className="cursor-pointer font-semibold">
                  <MapPin className="mr-2 size-4 text-primary" />
                  Ver todas las comunas
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              {COMUNAS.slice(0, 30).map((comuna) => (
                <DropdownMenuItem key={comuna.slug} asChild>
                  <Link
                    href={`/comunas/${comuna.slug}`}
                    className="cursor-pointer"
                  >
                    <MapPin className="mr-2 size-3 text-muted-foreground" />
                    {comuna.name}
                  </Link>
                </DropdownMenuItem>
              ))}
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/comunas" className="cursor-pointer text-primary">
                  Ver las {COMUNAS.length} comunas →
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Link
            href="/galeria"
            className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary/60 hover:text-foreground"
          >
            Galería
          </Link>
          <Link
            href="/#estudio"
            className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary/60 hover:text-foreground"
          >
            Estudio
          </Link>
          <Link
            href="/#contacto"
            className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary/60 hover:text-foreground"
          >
            Cotizar
          </Link>
        </nav>

        {/* WhatsApp button + mobile menu */}
        <div className="flex items-center gap-2">
          <Button
            asChild
            size="sm"
            className="hidden bg-primary text-primary-foreground hover:bg-primary/90 sm:inline-flex"
          >
            <a
              href={buildWhatsAppUrl("Hola Samsara, quiero cotizar un tatuaje.")}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Cotizar por WhatsApp"
            >
              <MessageCircle className="size-4" />
              WhatsApp
            </a>
          </Button>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="text-foreground md:hidden"
                aria-label="Abrir menú"
              >
                <Menu className="size-5" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-[320px] overflow-y-auto bg-background border-border"
            >
              <SheetTitle className="text-left">Menú</SheetTitle>
              <nav className="mt-6 flex flex-col gap-1">
                <Link
                  href="/#inicio"
                  onClick={() => setOpen(false)}
                  className="rounded-md px-3 py-3 text-base font-medium text-foreground hover:bg-secondary/60"
                >
                  Inicio
                </Link>
                <Link
                  href="/#artista"
                  onClick={() => setOpen(false)}
                  className="rounded-md px-3 py-3 text-base font-medium text-foreground hover:bg-secondary/60"
                >
                  Artista
                </Link>
                <Link
                  href="/comunas"
                  onClick={() => setOpen(false)}
                  className="rounded-md px-3 py-3 text-base font-medium text-foreground hover:bg-secondary/60"
                >
                  <MapPin className="mr-2 inline size-4 text-primary" />
                  Comunas
                </Link>
                <Link
                  href="/galeria"
                  onClick={() => setOpen(false)}
                  className="rounded-md px-3 py-3 text-base font-medium text-foreground hover:bg-secondary/60"
                >
                  Galería
                </Link>
                <Link
                  href="/#estudio"
                  onClick={() => setOpen(false)}
                  className="rounded-md px-3 py-3 text-base font-medium text-foreground hover:bg-secondary/60"
                >
                  Estudio
                </Link>
                <Link
                  href="/#contacto"
                  onClick={() => setOpen(false)}
                  className="rounded-md px-3 py-3 text-base font-medium text-foreground hover:bg-secondary/60"
                >
                  Cotizar
                </Link>

                <div className="mt-4 border-t border-border pt-4">
                  <p className="px-3 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                    Servicios
                  </p>
                  <div className="mt-2 grid grid-cols-1 gap-1">
                    {SERVICES.map((service) => (
                      <Link
                        key={service.slug}
                        href={`/servicios/${service.slug}`}
                        onClick={() => setOpen(false)}
                        className="rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-secondary/60 hover:text-foreground"
                      >
                        {service.title}
                      </Link>
                    ))}
                  </div>
                </div>
              </nav>

              <div className="mt-6 flex flex-col gap-2 border-t border-border pt-4 text-sm">
                <a
                  href={buildWhatsAppUrl("Hola Samsara, quiero cotizar un tatuaje.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-md bg-primary px-3 py-3 text-center font-medium text-primary-foreground"
                >
                  WhatsApp: {BUSINESS.phoneDisplay}
                </a>
                <a
                  href={`https://maps.google.com/?q=${encodeURIComponent(addressFull)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-md border border-border px-3 py-3 text-center font-medium text-foreground"
                >
                  {BUSINESS.addressStreet}, {BUSINESS.addressComuna}
                </a>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
