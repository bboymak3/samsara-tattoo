// src/app/robots.ts
// Robots.txt dinamico con user-agents de IA generativa permitidos.

import type { MetadataRoute } from "next";
import { BUSINESS } from "@/lib/business-data";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // === IA generativa permitida explicitamente ===
      { userAgent: "Google-Extended", allow: "/" },
      { userAgent: "GPTBot", allow: "/" },
      { userAgent: "OAI-SearchBot", allow: "/" },
      { userAgent: "PerplexityBot", allow: "/" },
      { userAgent: "ClaudeBot", allow: "/" },
      { userAgent: "anthropic-ai", allow: "/" },
      { userAgent: "Meta-ExternalAgent", allow: "/" },
      { userAgent: "Meta-ExternalFetcher", allow: "/" },
      { userAgent: "Bingbot", allow: "/" },
      { userAgent: "Applebot", allow: "/" },
      { userAgent: "Applebot-Extended", allow: "/" },
      { userAgent: "cohere-ai", allow: "/" },
      { userAgent: "Bytespider", allow: "/" },
      { userAgent: "Diffbot", allow: "/" },
      { userAgent: "Amazonbot", allow: "/" },
      { userAgent: "Omgilibot", allow: "/" },
      { userAgent: "YouBot", allow: "/" },
      { userAgent: "*", allow: "/", disallow: ["/api/", "/_next/", "/*?q=", "/*?utm_"] },
    ],
    sitemap: `${BUSINESS.url}/sitemap.xml`,
    host: BUSINESS.url,
  };
}
