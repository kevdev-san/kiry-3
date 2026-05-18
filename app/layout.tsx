import type { Metadata } from "next";
import { Cormorant_Garamond, Noto_Sans_JP } from "next/font/google";
import "./globals.css";

import MusicPlayer from "@/components/MusicPlayer";
import Petals from "@/components/petals";
import PageTransition from "@/components/PageTransition";
import Navbar from "@/components/Navbar";

import Image from "next/image";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-cormorant",
});

const noto = Noto_Sans_JP({
  subsets: ["latin"],
  variable: "--font-noto",
});

export const metadata: Metadata = {
  title: "Para Kiry",
  description: "🌸",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`
          ${cormorant.variable}
          ${noto.variable}
          relative
          min-h-screen
          bg-black
        `}
      >
        {/* Fondo fijo */}
        <div className="fixed inset-0 z-0">
          <Image src="/fonddo.jpg" alt="Fondo" fill priority className="object-cover" />
          <div className="absolute inset-0 bg-black/60" />
        </div>

        {/* Pétalos */}
        <div className="fixed inset-0 z-10 pointer-events-none">
          <Petals />
        </div>

        {/* Navbar */}
        <Navbar />

        {/* Contenido */}
        <main className="relative z-20 w-full">
          <PageTransition>{children}</PageTransition>
        </main>

        {/* Música */}
        <MusicPlayer />
      </body>
    </html>
  );
}