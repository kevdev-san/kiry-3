"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { X } from "lucide-react";

const letters = [
  {
    id: "01",
    title: "No soy muy bueno con las palabras",
    message:
      "Hola kiryyy <3, no soy muy bueno con las palabras pero me gusta demostrar mi cariño de otras formas jeje, espero te guste la pagina que hice para ti.",
    color: "#f9a8c9",
    sealColor: "#e879a0",
  },
  {
    id: "02",
    title: "Pensamientos sobre ti",
    message:
      "Me encanta tu personalidad, pese a que llevamos poco tiempo de conocernos. Me gusta como eres en general, y no solo me gusta tu personalidad, si no que eres una chica super linda, tu cabello corto me parece de lo mas bonito que hay, ademas de que tus ojos, tu sonrisa, y todo de ti me parece increible. ",
    color: "#c4b5fd",
    sealColor: "#a78bfa",
  },
  {
    id: "03",
    title: "Sentimientos",
    message:
      "Que mas te puedo decir, el simple hecho de haberte encontrado en un mundo lleno de personas superficiales y encontrar alguien como tu, me hace sentir tan afortunado y feliz.",
    color: "#93c5fd",
    sealColor: "#60a5fa",
  },
];

function EnvelopeCard({
  letter,
  index,
  onClick,
}: {
  letter: (typeof letters)[0];
  index: number;
  onClick: () => void;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: 0.7, delay: index * 0.13, ease: [0.22, 1, 0.36, 1] }}
      className="flex justify-center"
    >
      <button
        onClick={onClick}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="relative focus:outline-none"
        style={{ width: 260, height: 180 }}
      >
        {/* Sombra de color debajo */}
        <motion.div
          animate={{
            opacity: hovered ? 0.6 : 0.3,
            y: hovered ? 14 : 6,
            scaleX: hovered ? 0.88 : 0.82,
          }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="absolute bottom-0 left-1/2 -translate-x-1/2 rounded-[50%]"
          style={{
            width: 220,
            height: 20,
            background: letter.color,
            filter: "blur(14px)",
            zIndex: 0,
          }}
        />

        <motion.div
          animate={{ y: hovered ? -8 : 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="relative w-full h-full"
          style={{ zIndex: 1 }}
        >
          {/* Carta asomándose */}
          <motion.div
            className="absolute left-1/2 -translate-x-1/2 rounded-lg flex flex-col items-center justify-center overflow-hidden"
            style={{
              bottom: 16,
              width: 200,
              background: "rgba(255,255,255,0.96)",
              zIndex: 0,
              transformOrigin: "bottom center",
            }}
            animate={{
              height: hovered ? 80 : 0,
              opacity: hovered ? 1 : 0,
            }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <p
              className="text-center px-4"
              style={{
                fontFamily: "var(--font-cormorant), serif",
                fontSize: 20,
                color: "#1a1a2e",
                fontStyle: "italic",
                lineHeight: 1.5,
              }}
            >
              {letter.title}
            </p>
            <div
              className="mt-2 h-px w-10"
              style={{ background: letter.sealColor, opacity: 0.6 }}
            />
          </motion.div>

          {/* SVG base del sobre — más opaco */}
          <svg
            viewBox="0 0 260 180"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="absolute inset-0 w-full h-full"
            style={{ zIndex: 1 }}
          >
            {/* Cuerpo — fondo más sólido */}
            <rect
              x="1"
              y="20"
              width="258"
              height="158"
              rx="10"
              fill="rgba(255,255,255,0.28)"
              stroke="rgba(255,255,255,0.55)"
              strokeWidth="1.2"
            />
            {/* Pliegue inferior */}
            <path d="M1 178 L130 112 L259 178" fill="rgba(255,255,255,0.18)" />
            {/* Líneas de pliegues */}
            <line x1="1" y1="20" x2="130" y2="95" stroke="rgba(255,255,255,0.40)" strokeWidth="1" />
            <line x1="259" y1="20" x2="130" y2="95" stroke="rgba(255,255,255,0.40)" strokeWidth="1" />
            <line x1="1" y1="178" x2="130" y2="112" stroke="rgba(255,255,255,0.28)" strokeWidth="1" />
            <line x1="259" y1="178" x2="130" y2="112" stroke="rgba(255,255,255,0.28)" strokeWidth="1" />
          </svg>

          {/* Solapa — más opaca */}
          <motion.div
            className="absolute inset-x-0 top-0 overflow-hidden"
            style={{
              height: 100,
              transformOrigin: "top center",
              perspective: 600,
              zIndex: 2,
            }}
            animate={{ rotateX: hovered ? -155 : 0 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          >
            <svg
              viewBox="0 0 260 100"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-full"
            >
              <path
                d="M0 0 L260 0 L130 82 Z"
                fill="rgba(255,255,255,0.32)"
                stroke="rgba(255,255,255,0.55)"
                strokeWidth="1.2"
                strokeLinejoin="round"
              />
              {/* Sello */}
              <circle cx="130" cy="34" r="17" fill={letter.sealColor} opacity="0.95" />
              <text x="130" y="40" textAnchor="middle" fontSize="15" fill="white">
                🌸
              </text>
            </svg>
          </motion.div>

          {/* Número */}
          <div
            className="absolute bottom-3 right-5 font-mono"
            style={{
              fontSize: 10,
              color: "rgba(255,255,255,0.5)",
              letterSpacing: "0.2em",
              zIndex: 3,
            }}
          >
            {letter.id}
          </div>
        </motion.div>
      </button>
    </motion.div>
  );
}

export default function Letters() {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="mb-14 text-center"
      >
        <div className="mx-auto mt-3 h-px w-16 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      </motion.div>

      {/* Grid de sobres */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-10 max-w-4xl px-6">
        {letters.map((letter, index) => (
          <EnvelopeCard
            key={index}
            letter={letter}
            index={index}
            onClick={() => setSelected(index)}
          />
        ))}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selected !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            onClick={() => setSelected(null)}
            className="fixed inset-0 z-50 flex items-center justify-center px-6"
            style={{ background: "rgba(0,0,0,0.65)", backdropFilter: "blur(14px)" }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.88, y: 50, filter: "blur(16px)" }}
              animate={{ opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, scale: 0.92, y: 24, filter: "blur(8px)" }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e: React.MouseEvent) => e.stopPropagation()}
              className="relative w-full max-w-md"
            >
              {/* Botón cerrar */}
              <button
                onClick={() => setSelected(null)}
                className="absolute -top-3 -right-3 z-20 rounded-full p-2 transition-all duration-200 hover:scale-110"
                style={{
                  background: "rgba(255,255,255,0.18)",
                  border: "1px solid rgba(255,255,255,0.35)",
                  color: "rgba(255,255,255,0.8)",
                }}
              >
                <X size={14} />
              </button>

              {/* Sobre abierto de fondo — más opaco */}
              <div
                className="absolute inset-x-0 bottom-0 rounded-2xl"
                style={{
                  height: "88%",
                  background: "rgba(255,255,255,0.18)",
                  border: "1px solid rgba(255,255,255,0.35)",
                  backdropFilter: "blur(20px)",
                  zIndex: 0,
                }}
              />

              {/* Solapa decorativa modal */}
              <div
                className="absolute inset-x-0 top-0 overflow-hidden rounded-t-2xl"
                style={{ height: 56, zIndex: 0 }}
              >
                <svg viewBox="0 0 400 56" className="w-full h-full">
                  <path
                    d="M0 0 L400 0 L400 8 L200 52 L0 8 Z"
                    fill="rgba(255,255,255,0.16)"
                    stroke="rgba(255,255,255,0.35)"
                    strokeWidth="1"
                  />
                </svg>
              </div>

              {/* Carta saliendo del sobre */}
              <motion.div
                initial={{ y: 70, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="relative mx-5 rounded-2xl overflow-hidden"
                style={{
                  marginTop: 28,
                  background: "rgba(255,255,255,0.97)",
                  boxShadow: "0 8px 40px rgba(0,0,0,0.3)",
                  zIndex: 2,
                }}
              >
                {/* Banda de color */}
                <div
                  className="h-1.5 w-full"
                  style={{
                    background: `linear-gradient(90deg, ${letters[selected].sealColor}, ${letters[selected].color})`,
                    opacity: 0.9,
                  }}
                />

                <div className="px-8 pt-7 pb-8">
                  <div className="flex items-start justify-between mb-5">
                    <div>
                      <p
                        className="uppercase"
                        style={{
                          fontSize: 18,
                          letterSpacing: "0.4em",
                          color: "rgba(0,0,0,0.45)",
                          fontFamily: "var(--font-noto), sans-serif",
                        }}
                      >
                        Para kiry &nbsp;·&nbsp; {letters[selected].id}
                      </p>
                      <h2
                        style={{
                          fontFamily: "var(--font-cormorant), serif",
                          fontSize: 28,
                          fontStyle: "italic",
                          fontWeight: 300,
                          color: "#12121e",
                          marginTop: 5,
                          lineHeight: 1.2,
                        }}
                      >
                        {letters[selected].title}
                      </h2>
                    </div>
                  </div>

                  <div
                    className="h-px w-full mb-6"
                    style={{
                      background: `linear-gradient(90deg, ${letters[selected].sealColor}70, transparent)`,
                    }}
                  />

                  <motion.p
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.42, duration: 0.5 }}
                    style={{
                      fontFamily: "var(--font-noto), sans-serif",
                      fontSize: 18,
                      lineHeight: "2rem",
                      color: "rgba(0,0,0,0.70)",
                    }}
                  >
                    {letters[selected].message}
                  </motion.p>

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6, duration: 0.5 }}
                    className="mt-8 flex items-center gap-2"
                  >
                    <div
                      className="h-px w-6"
                      style={{ background: letters[selected].sealColor, opacity: 0.5 }}
                    />
                    <span
                      className="uppercase"
                      style={{
                        fontSize: 15,
                        letterSpacing: "0.3em",
                        color: "rgba(0,0,0,0.35)",
                        fontFamily: "var(--font-noto), sans-serif",
                      }}
                    >
                      con mucho cariño de kev para ti
                    </span>
                  </motion.div>
                </div>
              </motion.div>

              {/* Sombra de color */}
              <div
                className="absolute bottom-0 left-1/2 -translate-x-1/2 rounded-[50%] pointer-events-none"
                style={{
                  width: 280,
                  height: 30,
                  background: letters[selected].color,
                  filter: "blur(20px)",
                  opacity: 0.4,
                  zIndex: 0,
                }}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}