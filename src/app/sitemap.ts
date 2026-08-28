// src/app/sitemap.ts
// Sitemap XML dinamico: 6 estaticas + 12 servicios + 54 comunas = 72 URLs.

import type { MetadataRoute } from "next";
import { COMUNAS, SERVICES, BUSINESS } from "@/lib/business-data";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const today = new Date().toISOString().substring(0, 10);

  const staticPages: MetadataRoute.Sitemap = [
    { url: `${BUSINESS.url}/`, lastModified: today, changeFrequency: "weekly", priority: 1.0 },
    { url: `${BUSINESS.url}/galeria`, lastModified: today, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BUSINESS.url}/quienes-somos`, lastModified: today, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BUSINESS.url}/contacto`, lastModified: today, changeFrequency: "monthly", priority: 0.8 },
  ];

  const servicePages: MetadataRoute.Sitemap = SERVICES.map((service) => ({
    url: `${BUSINESS.url}/servicios/${service.slug}`,
    lastModified: today,
    changeFrequency: "monthly" as const,
    priority: 0.9,
  }));

  const comunaPages: MetadataRoute.Sitemap = COMUNAS.map((comuna) => ({
    url: `${BUSINESS.url}/comunas/${comuna.slug}`,
    lastModified: today,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  return [...staticPages, ...servicePages, ...comunaPages];
}
