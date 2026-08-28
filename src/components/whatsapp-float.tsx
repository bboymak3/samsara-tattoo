"use client";

import { MessageCircle } from "lucide-react";
import { buildWhatsAppUrl } from "@/lib/business-data";

export function WhatsAppFloat() {
  return (
    <a
      href={buildWhatsAppUrl("Hola Samsara, quiero cotizar un tatuaje")}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Cotizar por WhatsApp"
      className="fixed bottom-6 right-6 z-40 flex size-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg shadow-primary/40 transition-transform hover:scale-110"
    >
      <MessageCircle className="size-7" />
    </a>
  );
}
