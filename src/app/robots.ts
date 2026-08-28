// src/app/robots.ts
// Robots.txt dinamico con user-agents de IA generativa permitidos explicitamente.
// Permite que Gemini, ChatGPT, Claude, Perplexity, Copilot, etc. indexen el sitio.

import type { MetadataRoute } from "next";
import { BUSINESS } from "@/lib/business-data";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // === IA generativa permitida explicitamente ===
      { userAgent: "Google-Extended", allow: "/" },        // Google Gemini / Bard / SGE
      { userAgent: "GPTBot", allow: "/" },                  // OpenAI / ChatGPT
      { userAgent: "OAI-SearchBot", allow: "/" },          // OpenAI Search
      { userAgent: "ChatGPT-User", allow: "/" },           // ChatGPT user-facing
      { userAgent: "PerplexityBot", allow: "/" },          // Perplexity AI
      { userAgent: "Perplexity-User", allow: "/" },        // Perplexity user-facing
      { userAgent: "ClaudeBot", allow: "/" },              // Anthropic / Claude
      { userAgent: "anthropic-ai", allow: "/" },           // Anthropic alt
      { userAgent: "Claude-Web", allow: "/" },            // Claude web
      { userAgent: "Meta-ExternalAgent", allow: "/" },    // Meta / Llama
      { userAgent: "Meta-ExternalFetcher", allow: "/" },   // Meta fetcher
      { userAgent: "Bingbot", allow: "/" },                 // Microsoft / Bing / Copilot
      { userAgent: "BingPreview", allow: "/" },           // Bing preview
      { userAgent: "Applebot", allow: "/" },               // Apple Intelligence
      { userAgent: "Applebot-Extended", allow: "/" },      // Apple extended
      { userAgent: "cohere-ai", allow: "/" },              // Cohere
      { userAgent: "Bytespider", allow: "/" },             // TikTok / ByteDance
      { userAgent: "Diffbot", allow: "/" },                // Diffbot
      { userAgent: "Amazonbot", allow: "/" },              // Amazon / Rufus
      { userAgent: "Omgilibot", allow: "/" },              // Omgili
      { userAgent: "YouBot", allow: "/" },                  // You.com
      { userAgent: "CCBot", allow: "/" },                  // Common Crawl (muchas IAs)
      { userAgent: "FacebookBot", allow: "/" },            // Facebook
      { userAgent: "Twitterbot", allow: "/" },             // Twitter / X
      { userAgent: "LinkedInBot", allow: "/" },            // LinkedIn
      { userAgent: "Slackbot", allow: "/" },               // Slack
      { userAgent: "Discordbot", allow: "/" },             // Discord
      { userAgent: "TelegramBot", allow: "/" },            // Telegram
      { userAgent: "WhatsApp", allow: "/" },               // WhatsApp
      // === Resto de crawlers tradicionales ===
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/_next/", "/*?q=", "/*?utm_", "/*?fbclid="],
      },
    ],
    sitemap: `${BUSINESS.url}/sitemap.xml`,
    host: BUSINESS.url,
  };
}
