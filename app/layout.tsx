import type { Metadata } from "next";
import "./globals.css";
import { Montserrat } from "next/font/google";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import { SpeedInsights } from "@vercel/speed-insights/next"

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "INOXPARTS",
  description:
    "InoxParts ist ein Unternehmen, das sich auf Produkte und Dienstleistungen für Flachdächer und Entwässerungssysteme spezialisiert hat. Mit langjähriger Erfahrung in der Verarbeitung von Edelstahl setzt das Unternehmen hochwertige Materialien wie V2A-Stahl (X5CrNi18-10) ein, um Langlebigkeit und hervorragende Leistung zu gewährleisten. InoxParts bietet eine Produktpalette, die Entwässerungsrinnen, Gitter, Kiesrahmen und weiteres Zubehör umfasst, das an die spezifischen Bedürfnisse der Kunden angepasst wird. Das Unternehmen engagiert sich für Qualität und exzellenten Service und liefert nachhaltige und dekorative Lösungen.",
  keywords: ["inoxparts"],
  authors: [{ name: "Vizatim", url: "https://www.vizatim.com/" }],
  creator: "Vizatim",
  publisher: "Vizatim",
  metadataBase: new URL("https://inoxparts.ch"),
  alternates: {
    canonical: "/",
    languages: {
      "de-CH": "/", // Primary language (Swiss-German)
    },
  },
  openGraph: {
    title: "INOXPARTS",
    description:
      "InoxParts ist ein Unternehmen, das sich auf Produkte und Dienstleistungen für Flachdächer und Entwässerungssysteme spezialisiert hat. Mit langjähriger Erfahrung in der Verarbeitung von Edelstahl setzt das Unternehmen hochwertige Materialien wie V2A-Stahl (X5CrNi18-10) ein, um Langlebigkeit und hervorragende Leistung zu gewährleisten. InoxParts bietet eine Produktpalette, die Entwässerungsrinnen, Gitter, Kiesrahmen und weiteres Zubehör umfasst, das an die spezifischen Bedürfnisse der Kunden angepasst wird. Das Unternehmen engagiert sich für Qualität und exzellenten Service und liefert nachhaltige und dekorative Lösungen.",
    url: "https://inoxparts.ch",
    siteName: "InoxParts",
    images: [
      {
        url: "/inox/logoInox.svg", // or full URL
        width: 800,
        height: 600,
      },
    ],
    locale: "de_CH",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "INOXPARTS",
    description:
      "InoxParts ist ein Unternehmen, das sich auf Produkte und Dienstleistungen für Flachdächer und Entwässerungssysteme spezialisiert hat. Mit langjähriger Erfahrung in der Verarbeitung von Edelstahl setzt das Unternehmen hochwertige Materialien wie V2A-Stahl (X5CrNi18-10) ein, um Langlebigkeit und hervorragende Leistung zu gewährleisten. InoxParts bietet eine Produktpalette, die Entwässerungsrinnen, Gitter, Kiesrahmen und weiteres Zubehör umfasst, das an die spezifischen Bedürfnisse der Kunden angepasst wird. Das Unternehmen engagiert sich für Qualität und exzellenten Service und liefert nachhaltige und dekorative Lösungen.",
    images: ["https://inoxparts.ch/_next/static/media/logoInox.58e7a852.svg"],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/inox/logoInox.svg",
    apple: "/inox/logoInox.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <SpeedInsights />
      <body className={`antialiased ${montserrat.className}`}>
        <Navigation />
        {children}
        <Footer />
      </body>
    </html>
  );
}
