import type { Metadata } from "next";
import { Inter, Montserrat } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
  weight: ["600", "700"],
});

export const metadata: Metadata = {
  title: "SachaRbone — L'humain au cœur du service",
  description:
    "SachaRbone est une marque française qui accompagne les particuliers, familles et entreprises dans leurs défis du quotidien. Démarches, conseil, photo, halal, sweet — une marque, plusieurs expertises.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${inter.variable} ${montserrat.variable}`}>
      <body>{children}</body>
    </html>
  );
}
