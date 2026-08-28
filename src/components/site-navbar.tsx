"use client";

import * as React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { Menu, MessageCircle } from "lucide-react";
import { BUSINESS, buildWhatsAppUrl } from "@/lib/business-data";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { label: "Inicio", href: "/#inicio" },
  { label: "Artista", href: "/#artista" },
  { label: "Servicios", href: "/#servicios" },
  { label: "Galería", href: "/#galeria" },
  { label: "Estudio", href: "/#estudio" },
  { label: "Cotizar", href: "/#contacto" },
];

export function SiteNavbar() {
  const [open, setOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b border-border/80 bg-background/90 backdrop-blur-md transition-shadow",
        scrolled && "shadow-md shadow-black/40"
      )}
    >
      <div className="container mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5" aria-label="Samsara Tattoo Studio - Inicio">
          <span className="flex size-9 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold text-lg shadow-md shadow-primary/30">
            S
          </span>
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
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground hover:bg-secondary/60"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* WhatsApp button + mobile menu */}
        <div className="flex items-center gap-2">
          <Button
            asChild
            size="sm"
            className="hidden sm:inline-flex bg-primary text-primary-foreground hover:bg-primary/90"
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
                className="md:hidden text-foreground"
                aria-label="Abrir menú"
              >
                <Menu className="size-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[280px] bg-background border-border">
              <SheetTitle className="text-left">Menú</SheetTitle>
              <nav className="mt-6 flex flex-col gap-1">
                {NAV_LINKS.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="rounded-md px-3 py-3 text-base font-medium text-foreground hover:bg-secondary/60"
                  >
                    {link.label}
                  </Link>
                ))}
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
                  href={`https://maps.google.com/?q=${encodeURIComponent(BUSINESS.addressStreet + ", " + BUSINESS.addressComuna + ", " + BUSINESS.addressRegion + ", " + BUSINESS.addressCountry)}`}
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
