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
    "Samsara Tattoo Studio en Providencia, Santiago. Tatuajes realismo, línea fina, lettering, blackwork y aerografía a domicilio. 11 años de experiencia con Wilfren Jiménez, artista corporal y visual. Cotiza por WhatsApp.",
  keywords: [
    "tatuajes en Santiago",
    "tatuajes Providencia",
    "tatuajes realismo",
    "tatuajes minimalistas",
    "lettering tatuajes",
    "tatuajes personalizados",
    "aerografía a domicilio Santiago",
    "tatuador realista Santiago",
    "estudio de tatuajes Providencia",
    "Wilfren Jiménez",
    "tatuajes en el brazo",
    "manga tatuaje",
    "tatuajes para hombres",
    "tatuajes para mujeres",
  ],
  authors: [{ name: BUSINESS.artist }],
  creator: BUSINESS.artist,
  publisher: BUSINESS.artist,
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: "/logo.svg",
    shortcut: "/logo.svg",
    apple: "/logo.svg",
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
        url: "/images/estudio-de-tatuajes-providencia.jpg",
        width: 1200,
        height: 630,
        alt: "Samsara Tattoo Studio - Estudio de tatuajes en Providencia, Santiago",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Samsara Tattoo Studio | Tatuajes en Santiago y Providencia",
    description:
      "Estudio de tatuajes y galería de arte en Providencia, Santiago. Wilfren Jiménez, 11 años de experiencia.",
    images: ["/images/estudio-de-tatuajes-providencia.jpg"],
  },
  other: {
    "geo.region": BUSINESS.geo.region,
    "geo.placename": BUSINESS.geo.placeName,
    "geo.position": `${BUSINESS.geo.latitude};${BUSINESS.geo.longitude}`,
    ICBM: `${BUSINESS.geo.latitude}, ${BUSINESS.geo.longitude}`,
    "google-site-verification": "GOOGLE_SITE_VERIFICATION_PLACEHOLDER",
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
