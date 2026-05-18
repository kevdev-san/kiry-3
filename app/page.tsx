"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

const LEFT_PHOTOS = [
  { src: "/kiryy.jpeg", rotate: -6, x: -20, y: -30 },
  { src: "/kiry2.jpeg", rotate: -2, x: 10,  y: 40  },
];

const RIGHT_PHOTOS = [
  { src: "/kiry3.jpeg", rotate: 5,  x: 20,  y: -20 },
  { src: "/kiry4.jpeg", rotate: 2,  x: -10, y: 50  },
];

function Polaroid({
  src,
  rotate,
  x,
  y,
  delay,
  small,
}: {
  src: string;
  rotate: number;
  x: number;
  y: number;
  delay: number;
  small?: boolean;
}) {
  const size = small ? 100 : 160;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
      animate={{ opacity: 1, y, filter: "blur(0px)" }}
      transition={{ duration: 1, delay, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ scale: 1.04, rotate: 0, transition: { duration: 0.3 } }}
      style={{
        rotate,
        x,
        position: "relative",
        cursor: "default",
      }}
    >
      {/* Glow rosa detrás */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(ellipse at center, rgba(249,168,201,0.25) 0%, transparent 70%)",
          filter: "blur(20px)",
          transform: "scale(1.4)",
          zIndex: 0,
          borderRadius: 4,
        }}
      />

      {/* Frame polaroid */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          background: "rgba(255,255,255,0.92)",
          borderRadius: 4,
          padding: small ? "7px 7px 24px 7px" : "10px 10px 32px 10px",
          boxShadow: "0 12px 40px rgba(0,0,0,0.35), 0 2px 8px rgba(0,0,0,0.2)",
        }}
      >
        <Image
          src={src}
          alt=""
          width={size}
          height={size}
          style={{
            objectFit: "cover",
            display: "block",
            borderRadius: 2,
          }}
        />
        {/* Línea tenue */}
        <div
          style={{
            marginTop: 8,
            height: 1,
            background: "rgba(0,0,0,0.06)",
          }}
        />
      </div>
    </motion.div>
  );
}

export default function Home() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      {/* ── Layout escritorio (≥ md) ── */}
      <div className="relative z-30 hidden md:flex items-center justify-center gap-0 w-full max-w-5xl px-8 pt-40">

        {/* Fotos izquierda */}
        <div className="flex flex-col gap-4 items-end mr-12">
          {LEFT_PHOTOS.map((p, i) => (
            <Polaroid key={i} {...p} delay={0.3 + i * 0.15} />
          ))}
        </div>

        {/* Centro — título y botón */}
        <div className="text-center text-white flex-shrink-0">
          <motion.h1
            initial={{ opacity: 0, y: 16, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 1, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="title-font text-6xl font-light tracking-[0.15em] drop-shadow-lg"
          >
            Para Kiiry
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="mt-10 flex justify-center"
          >
            <Link
              href="/feelings"
              className="
                group relative overflow-hidden rounded-full
                border border-white/20 bg-white/10
                px-8 py-3 text-sm uppercase tracking-[0.25em] text-white
                backdrop-blur-md transition-all duration-500
                hover:scale-105 hover:bg-white/20
                hover:shadow-[0_0_30px_rgba(255,255,255,0.15)]
              "
            >
              <span className="relative z-10">entrar</span>
              <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 bg-gradient-to-r from-pink-300/10 to-white/10" />
            </Link>
          </motion.div>
        </div>

        {/* Fotos derecha */}
        <div className="flex flex-col gap-4 items-start ml-12">
          {RIGHT_PHOTOS.map((p, i) => (
            <Polaroid key={i} {...p} delay={0.45 + i * 0.15} />
          ))}
        </div>

      </div>

      {/* ── Layout móvil (< md) ── */}
      <div className="relative z-30 flex flex-col md:hidden items-center w-full px-4 pt-24 pb-10 gap-8">

        {/* Título */}
        <motion.h1
          initial={{ opacity: 0, y: 16, filter: "blur(6px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="title-font text-5xl font-light tracking-[0.15em] drop-shadow-lg text-white text-center"
        >
          Para Kiiry
        </motion.h1>

        {/* Fotos en grid 2×2 */}
        <div className="grid grid-cols-2 gap-5 w-full max-w-xs">
          {[...LEFT_PHOTOS, ...RIGHT_PHOTOS].map((p, i) => (
            <div key={i} className="flex justify-center">
              <Polaroid {...p} x={0} y={0} delay={0.3 + i * 0.12} small />
            </div>
          ))}
        </div>

        {/* Botón */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <Link
            href="/feelings"
            className="
              group relative overflow-hidden rounded-full
              border border-white/20 bg-white/10
              px-8 py-3 text-sm uppercase tracking-[0.25em] text-white
              backdrop-blur-md transition-all duration-500
              active:scale-95 hover:bg-white/20
            "
          >
            <span className="relative z-10">entrar</span>
            <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 bg-linear-to-r from-pink-300/10 to-white/10" />
          </Link>
        </motion.div>
      </div>
    </div>
  );
}