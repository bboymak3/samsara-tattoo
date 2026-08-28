import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { BUSINESS } from "@/lib/business-data";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(BUSINESS.url),
  title: {
    default: "Samsara Tattoo Studio | Tatuajes en Santiago y Providencia - Wilfren Jiménez",
    template: "%s | Samsara Tattoo Studio",
  },
  description:
    "Samsara Tattoo Studio en Providencia, Santiago de Chile. Tatuajes realismo, línea fina, lettering, blackwork, microrealismo, geometría y aerografía a domicilio. 11 años de experiencia con Wilfren Jiménez, artista corporal y visual. Cotiza gratis por WhatsApp al +56945070308.",
  keywords: [
    "tatuajes en Santiago",
    "tatuajes Providencia",
    "tatuajes realismo Santiago",
    "tatuajes minimalistas Chile",
    "lettering tatuajes",
    "tatuajes personalizados Providencia",
    "aerografía a domicilio Santiago",
    "tatuador realista Santiago",
    "estudio de tatuajes Providencia",
    "Wilfren Jiménez tatuador",
    "Samsara Tattoo Studio",
    "tatuajes en el brazo Santiago",
    "manga tatuaje Chile",
    "tatuajes para hombres Santiago",
    "tatuajes para mujeres Santiago",
    "tatuajes línea fina Santiago",
    "blackwork tatuajes Chile",
    "microrealismo tatuajes",
    "geometría sagrada tatuaje",
    "aerografía artística Santiago",
    "pintura acrílica Providencia",
    "acuarela personalizada Chile",
    "galería de arte Santiago",
    "encargos por comisión arte Chile",
    "tatuajes en Las Condes",
    "tatuajes en Ñuñoa",
    "tatuajes en Vitacura",
    "tatuajes en La Reina",
    "tatuajes en Lo Barnechea",
    "tatuajes en Puente Alto",
    "tatuajes en Maipú",
  ],
  authors: [{ name: BUSINESS.artist }],
  creator: BUSINESS.artist,
  publisher: BUSINESS.artist,
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: "/favicon.jpg",
    shortcut: "/favicon.jpg",
    apple: "/logo.jpg",
  },
  openGraph: {
    type: "website",
    locale: "es_CL",
    url: BUSINESS.url,
    siteName: BUSINESS.name,
    title: "Samsara Tattoo Studio | Tatuajes en Santiago y Providencia",
    description:
      "Estudio de tatuajes y galería de arte en Providencia, Santiago. Realismo, línea fina, lettering, blackwork y aerografía. 11 años de experiencia con Wilfren Jiménez.",
    images: [
      {
        url: "/banner.jpg",
        width: 1200,
        height: 630,
        alt: "Samsara Tattoo Studio - Tatuajes en Santiago de Chile",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Samsara Tattoo Studio | Tatuajes en Santiago y Providencia",
    description:
      "Estudio de tatuajes y galería de arte en Providencia, Santiago. Wilfren Jiménez, 11 años de experiencia.",
    images: ["/banner.jpg"],
  },
  other: {
    "geo.region": BUSINESS.geo.region,
    "geo.placename": BUSINESS.geo.placeName,
    "geo.position": `${BUSINESS.geo.latitude};${BUSINESS.geo.longitude}`,
    ICBM: `${BUSINESS.geo.latitude}, ${BUSINESS.geo.longitude}`,
    "google-site-verification": "AO8x2D5digAhJVNmj0wVdeJx60EpOc56vELa9rh_CmY",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  category: "tattoo",
};

export const viewport: Viewport = {
  themeColor: "#09090b",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es-CL" suppressHydrationWarning className="dark">
      <body
        className={`${inter.variable} font-sans antialiased bg-background text-foreground min-h-screen flex flex-col`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
