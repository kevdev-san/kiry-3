"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { musicController } from "@/components/MusicPlayer";

// ─── Pon aquí la ruta a tu canción (dentro de /public) ───────────────────────
const SONG_SRC = "/music/song.mp3";
// ─────────────────────────────────────────────────────────────────────────────

// Pool de medias: 9 elementos → mínimo 8 slots entre repeticiones (supera el mínimo de 4)
// Orden: hori1 · Anime_.jpg · hori2 · HorimiyaAnime.gif · hori3 · HoriSan.gif · hori4 · art.jpg · IMPRESIONES.gif
const M = [
  "hori1.gif",
  "Anime_ Horimiya.jpg",
  "hori2.gif",
  "Horimiya Anime Horimiya GIF - Horimiya Anime Horimiya Hori San To Miyamura - Discover & Share GIFs.gif",
  "hori3.gif",
  "Horimiya Hori San GIF - Horimiya Hori San Miyamura - Discover & Share GIFs.gif",
  "hori4.gif",
  "Horimiya official art edit.jpg",
  "IMPRESIONES INTERMEDIAS _ INVIERNO 2021.gif",
] as const;

const LYRICS: { time: number; text: string; gif: string | null }[] = [
  // Patrón: ~2 con media → 1 null → repite  (min 4 slots antes de repetir cada media)
  { time: 0,   text: "",                                                gif: null  },
  { time: 12,  text: "TU FORMA DE ESCRIBIR",                           gif: M[0]  }, // hori1.gif
  { time: 15,  text: "OH POR DIOS, TU ESCRITURA",                      gif: M[1]  }, // Anime_.jpg
  { time: 18,  text: "EN LIBRERÍAS",                                    gif: null  },
  { time: 21,  text: "QUE HARAS HOY EN LA NOCHE?",                     gif: M[2]  }, // hori2.gif
  { time: 24,  text: "YO SOLO VINE POR ALGO DE PAPEL",                 gif: M[3]  }, // HorimiyaAnime.gif
  { time: 30,  text: "PERO MI CORAZON SE SIENTE COMO JANE AUSTEN",     gif: null  },
  { time: 34,  text: "OH, MIERDA",                                      gif: M[4]  }, // hori3.gif
  { time: 37,  text: "TE VEO A TRAVES DE LOS ESTANTES",                gif: M[5]  }, // HoriSan.gif
  { time: 40,  text: "Y QUIERO SEGUIRTE",                               gif: null  },
  { time: 43,  text: "YO SOY EL PAPEL Y TU ERES EL LAPIZ",             gif: M[6]  }, // hori4.gif
  { time: 46,  text: "ME ABRIRAS AUNQUE SEA UNA VEZ?",                 gif: null  },
  { time: 50,  text: "MOJARAS TU DEDO PARA DARME VUELTA?",             gif: M[7]  }, // art.jpg
  { time: 52,  text: "PASARAS LA PAGINA?",                              gif: M[8]  }, // IMPRESIONES.gif
  { time: 56,  text: "ME LEERAS?",                                      gif: null  },
  { time: 59,  text: "MARCARAS MI PAGINA?",                             gif: M[0]  }, // hori1.gif
  { time: 62,  text: "NO ME DEVUELVAS O ME PERDERAS",                   gif: null  },
  { time: 65,  text: "ME LLEVARAS CONTIGO?",                            gif: M[1]  }, // Anime_.jpg
  { time: 68,  text: "ME SUBRAYARAS?",                                  gif: M[2]  }, // hori2.gif
  { time: 70,  text: "ME DOBLARAS A TU GUSTO?",                        gif: null  },
  { time: 71,  text: "SALDRAS CONMIGO?",                                gif: M[3]  }, // HorimiyaAnime.gif
  { time: 74,  text: "TU FORMA DE LEER",                                gif: null  },
  { time: 76,  text: "OH POR DIOS ESA TECNICA",                         gif: M[4]  }, // hori3.gif
  { time: 79,  text: "LIBRERO",                                          gif: M[5]  }, // HoriSan.gif
  { time: 82,  text: "QUE HARAS HOY EN LA NOCHE?",                     gif: null  },
  { time: 86,  text: "SOLO NOS DIMOS UN BESO",                          gif: M[6]  }, // hori4.gif
  { time: 91,  text: "PERO MI CORAZON SE SIENTE COMO EN SCOTT Y ZELDA",gif: null  },
  { time: 95,  text: "OH, QUE LOCURA",                                  gif: M[7]  }, // art.jpg
  { time: 98,  text: "TE VEO A TRAVES DE LOS ESTANTES",                gif: M[8]  }, // IMPRESIONES.gif
  { time: 101, text: "Y QUIERO SEGUIRTE",                               gif: null  },
  { time: 105, text: "YO SOY EL PAPEL Y TU ERES EL LAPIZ",             gif: M[0]  }, // hori1.gif
  { time: 108, text: "ME ABRIRAS AUNQUE SEA UNA VEZ?",                 gif: null  },
  { time: 111, text: "MOJARAS TU DEDO PARA DARME VUELTA?",             gif: M[1]  }, // Anime_.jpg
  { time: 114, text: "PASARAS LA PAGINA?",                              gif: M[2]  }, // hori2.gif
  { time: 117, text: "ME LEERAS?",                                      gif: null  },
  { time: 119, text: "MARCARAS MI PAGINA?",                             gif: M[3]  }, // HorimiyaAnime.gif
  { time: 123, text: "NO ME DEVUELVAS O ME PERDERAS",                   gif: null  },
  { time: 126, text: "ME LLEVARAS CONTIGO?",                            gif: M[4]  }, // hori3.gif
  { time: 130, text: "ME SUBRAYARAS?",                                  gif: M[5]  }, // HoriSan.gif
  { time: 131, text: "ME DOBLARAS A TU GUSTO?",                        gif: null  },
  { time: 132, text: "ME RECORDARAS?",                                  gif: M[6]  }, // hori4.gif
  { time: 133, text: "",                                                 gif: null  },
  { time: 193, text: "",                                                 gif: null  },
];



// Fotos decorativas que flotan alrededor (polaroids estáticos)
// desktopStyle / mobileStyle para posicionarlas responsive
const DECO_PHOTOS = [
  {
    src: "/descarga (1).jpg",
    rotate: -7,
    style: { top: "10%", left: "1%" },
    delay: 0.2,
    size: 120,
    sizeMobile: 80,
  },
  {
    src: "/descarga (2).jpg",
    rotate: 6,
    style: { top: "10%", right: "1%" },
    delay: 0.35,
    size: 120,
    sizeMobile: 80,
  },
  {
    src: "/Love❤️.jpg",
    rotate: -4,
    style: { bottom: "10%", left: "1%" },
    delay: 0.5,
    size: 120,
    sizeMobile: 80,
  },
];

const LINE_DURATION = 3.8;

// GIFs con posición fija: alternan izquierda/derecha por orden de aparición
const gifsWithSide = LYRICS.filter((l) => l.gif !== null).map((l, i) => ({
  gif: l.gif!,
  side: i % 2 === 0 ? "left" : "right",
}));
const gifSideMap: Record<string, "left" | "right"> = {};
gifsWithSide.forEach(({ gif, side }) => { gifSideMap[gif] = side; });

export default function LyricsPage() {
  const [currentTime, setCurrentTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const startTimeRef = useRef<number>(0);
  const accumulatedRef = useRef<number>(0);
  // Audio ref para la canción dedicada
  const songRef = useRef<HTMLAudioElement | null>(null);

  const activeIndex = (() => {
    let idx = -1;
    for (let i = 0; i < LYRICS.length; i++) {
      if (LYRICS[i].time <= currentTime) idx = i;
    }
    return idx;
  })();

  const activeGif =
    activeIndex >= 0 &&
    currentTime - LYRICS[activeIndex].time < LINE_DURATION
      ? LYRICS[activeIndex].gif
      : null;

  const activeSide = activeGif ? gifSideMap[activeGif] ?? "left" : null;

  const startTimer = () => {
    startTimeRef.current = Date.now();
    intervalRef.current = setInterval(() => {
      const elapsed = (Date.now() - startTimeRef.current) / 1000;
      setCurrentTime(accumulatedRef.current + elapsed);
    }, 100);
  };

  const stopTimer = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    accumulatedRef.current = currentTime;
  };

  const togglePlay = () => {
    if (isPlaying) {
      // Pausar canción y timer
      stopTimer();
      setIsPlaying(false);
      songRef.current?.pause();
      musicController.resume(); // retoma ambient
    } else {
      // Reanudar canción desde donde se pausó
      if (songRef.current) {
        songRef.current.currentTime = accumulatedRef.current;
        songRef.current.play().catch(() => {});
      }
      startTimer();
      setIsPlaying(true);
      musicController.pause(); // silencia ambient
    }
  };

  const restart = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    accumulatedRef.current = 0;
    setCurrentTime(0);
    setIsPlaying(false);
    if (songRef.current) {
      songRef.current.pause();
      songRef.current.currentTime = 0;
    }
    musicController.resume();
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      songRef.current?.pause();
      musicController.resume();
    };
  }, []);

  const visibleLines = [-2, -1, 0, 1].map((offset) => {
    const idx = activeIndex + offset;
    if (idx < 0 || idx >= LYRICS.length) return null;
    return { ...LYRICS[idx], offset, idx };
  });

  const progress = Math.min(
    100,
    (currentTime / (LYRICS[LYRICS.length - 1].time + LINE_DURATION)) * 100
  );

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden">

      {/* ── Audio de la canción dedicada (oculto) ── */}
      {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
      <audio ref={songRef} src={SONG_SRC} preload="auto" />

      {/* ── Fotos decorativas flotantes ── */}
      {DECO_PHOTOS.map((photo, i) => (
        <motion.div
          key={i}
          className="absolute pointer-events-none"
          style={photo.style}
          initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1, delay: photo.delay, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Glow rosa */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "radial-gradient(ellipse at center, rgba(249,168,201,0.3) 0%, transparent 70%)",
              filter: "blur(18px)",
              transform: "scale(1.5)",
              zIndex: 0,
              borderRadius: 4,
            }}
          />
          {/* Frame polaroid — tamaño responsivo via CSS clamp */}
          <div
            style={{
              position: "relative",
              zIndex: 1,
              background: "rgba(255,255,255,0.92)",
              borderRadius: 4,
              padding: "6px 6px 22px 6px",
              boxShadow: "0 12px 40px rgba(0,0,0,0.35), 0 2px 8px rgba(0,0,0,0.2)",
              transform: `rotate(${photo.rotate}deg)`,
            }}
          >
            <Image
              src={photo.src}
              alt=""
              width={photo.size}
              height={photo.size}
              style={{
                objectFit: "cover",
                display: "block",
                borderRadius: 2,
                /* clamp: 72px en móvil, crece hasta photo.size */
                width: `clamp(72px, 14vw, ${photo.size}px)`,
                height: `clamp(72px, 14vw, ${photo.size}px)`,
              }}
            />
            <div style={{ marginTop: 5, height: 1, background: "rgba(0,0,0,0.06)" }} />
          </div>
        </motion.div>
      ))}

      {/* ── GIF — memoria flotante ── */}
      <AnimatePresence mode="wait">
        {activeGif && activeSide && (
          <motion.div
            key={activeGif}
            initial={{
              opacity: 0,
              scale: 0.88,
              x: activeSide === "left" ? -30 : 30,
              rotate: activeSide === "left" ? -4 : 4,
            }}
            animate={{ opacity: 1, scale: 1, x: 0, rotate: activeSide === "left" ? -2 : 2 }}
            exit={{
              opacity: 0,
              scale: 0.92,
              x: activeSide === "left" ? -20 : 20,
              filter: "blur(6px)",
            }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="absolute pointer-events-none z-20"
            style={{
              left: activeSide === "left" ? "2%" : "auto",
              right: activeSide === "right" ? "2%" : "auto",
              top: "50%",
              transform: "translateY(-50%)",
            }}
          >
            {/* Polaroid frame */}
            <div
              style={{
                background: "rgba(255,255,255,0.92)",
                borderRadius: 4,
                padding: "10px 10px 32px 10px",
                boxShadow: "0 12px 40px rgba(0,0,0,0.35), 0 2px 8px rgba(0,0,0,0.2)",
                transform: `rotate(${activeSide === "left" ? "-2deg" : "2deg"})`,
              }}
            >
              {/* Usar <img> para GIFs animados — next/image detiene la animación */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`/${activeGif}`}
                alt=""
                style={{
                  /* clamp: 120px en móvil, 190px en desktop */
                  width: "clamp(120px, 25vw, 190px)",
                  height: "clamp(120px, 25vw, 190px)",
                  objectFit: "cover",
                  display: "block",
                  borderRadius: 2,
                }}
              />
              {/* Línea tenue estilo polaroid */}
              <div
                style={{
                  marginTop: 8,
                  height: 1,
                  background: "rgba(0,0,0,0.06)",
                  borderRadius: 1,
                }}
              />
            </div>

            {/* Glow rosa detrás */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: "radial-gradient(ellipse at center, rgba(249,168,201,0.3) 0%, transparent 70%)",
                filter: "blur(24px)",
                transform: "scale(1.4)",
                zIndex: -1,
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Letra karaoke ── */}
      <div
        className="relative z-10 flex flex-col items-center justify-center gap-5 px-8"
        style={{ minHeight: 260, maxWidth: 520 }}
      >
        <AnimatePresence mode="popLayout">
          {visibleLines.map((line) => {
            if (!line) return null;
            const isActive = line.offset === 0;
            const isPast = line.offset < 0;
            const opacity = isActive ? 1 : isPast ? (line.offset === -1 ? 0.32 : 0.13) : 0.22;
            const scale = isActive ? 1 : isPast ? (line.offset === -1 ? 0.96 : 0.93) : 0.96;
            const fontSize = isActive ? 34 : 24;
            const blur = isActive ? 0 : isPast ? (line.offset === -1 ? 1 : 2.5) : 1;

            return (
              <motion.p
                key={line.idx}
                layout
                initial={{ opacity: 0, y: 32, filter: "blur(10px)" }}
                animate={{ opacity, scale, y: 0, filter: `blur(${blur}px)` }}
                exit={{ opacity: 0, y: -32, filter: "blur(10px)" }}
                transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                className="text-center font-light tracking-wide w-full"
                style={{
                  fontFamily: "var(--font-cormorant), serif",
                  fontSize,
                  fontStyle: "italic",
                  color: isActive ? "rgba(255,255,255,0.96)" : "rgba(255,255,255,0.55)",
                  lineHeight: 1.45,
                  textShadow: isActive
                    ? "0 0 50px rgba(249,168,201,0.55), 0 2px 14px rgba(0,0,0,0.5)"
                    : "none",
                }}
              >
                {line.text}
              </motion.p>
            );
          })}
        </AnimatePresence>
      </div>

      {/* ── Barra de progreso ── */}
      <div className="relative z-10 mt-12 w-72 sm:w-80">
        {/* Track más grueso: 4px */}
        <div
          className="w-full overflow-hidden rounded-full"
          style={{ height: 4, background: "rgba(255,255,255,0.12)" }}
        >
          <div
            className="h-full rounded-full transition-all duration-100"
            style={{
              background: "linear-gradient(90deg, #e879a0, #f9a8c9)",
              width: `${progress}%`,
              boxShadow: "0 0 8px rgba(232,121,160,0.6)",
            }}
          />
        </div>
        <div className="mt-2 flex justify-between">
          <span className="font-mono" style={{ fontSize: 11, color: "rgba(255,255,255,0.35)", letterSpacing: "0.1em" }}>
            {String(Math.floor(currentTime / 60)).padStart(2, "0")}:{String(Math.floor(currentTime % 60)).padStart(2, "0")}
          </span>
          <span className="font-mono" style={{ fontSize: 11, color: "rgba(255,255,255,0.35)", letterSpacing: "0.1em" }}>
            {String(Math.floor(LYRICS[LYRICS.length - 1].time / 60)).padStart(2, "0")}:{String(Math.floor(LYRICS[LYRICS.length - 1].time % 60)).padStart(2, "0")}
          </span>
        </div>
      </div>

      {/* ── Botón play mejorado ── */}
      <div className="relative z-10 mt-8 flex flex-col items-center gap-4">

        <div className="flex items-center gap-5">
          {/* Restart */}
          <button
            onClick={restart}
            className="transition-all duration-200 hover:scale-110 active:scale-95"
            style={{ color: "rgba(255,255,255)" }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
              <path d="M3 3v5h5" />
            </svg>
          </button>

          {/* Play / Pause — botón principal */}
          <div className="relative">
            {/* Anillo pulsante cuando está playing */}
            {isPlaying && (
              <>
                <motion.div
                  className="absolute inset-0 rounded-full"
                  animate={{ scale: [1, 1.5], opacity: [0.3, 0] }}
                  transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut" }}
                  style={{ background: "rgba(232,121,160,0.4)" }}
                />
                <motion.div
                  className="absolute inset-0 rounded-full"
                  animate={{ scale: [1, 1.8], opacity: [0.2, 0] }}
                  transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut", delay: 0.4 }}
                  style={{ background: "rgba(232,121,160,0.25)" }}
                />
              </>
            )}

            <button
              onClick={togglePlay}
              className="relative flex items-center justify-center rounded-full transition-all duration-300 hover:scale-105 active:scale-95"
              style={{
                width: 56,
                height: 56,
                background: isPlaying
                  ? "linear-gradient(135deg, rgba(232,121,160,0.5), rgba(249,168,201,0.3))"
                  : "rgba(255,255,255,0.10)",
                border: isPlaying
                  ? "1px solid rgba(232,121,160,0.5)"
                  : "1px solid rgba(255,255,255,0.22)",
                color: "rgba(255,255,255,0.90)",
                boxShadow: isPlaying
                  ? "0 0 20px rgba(232,121,160,0.3), inset 0 0 20px rgba(255,255,255,0.05)"
                  : "none",
              }}
            >
              <AnimatePresence mode="wait">
                {isPlaying ? (
                  <motion.div
                    key="pause"
                    initial={{ scale: 0.6, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.6, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="flex items-end gap-[3px]"
                    style={{ height: 18 }}
                  >
                    {/* Barras de ecualizador animadas */}
                    {[1, 1.4, 0.8, 1.2].map((h, i) => (
                      <motion.span
                        key={i}
                        className="w-[3px] rounded-full"
                        style={{ background: "rgba(255,255,255,0.9)" }}
                        animate={{ scaleY: [h * 0.5, h, h * 0.6, h * 0.9, h * 0.5] }}
                        transition={{
                          duration: 0.8 + i * 0.15,
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: i * 0.1,
                        }}
                        initial={{ height: 14, scaleY: 1, originY: 1 }}
                      />
                    ))}
                  </motion.div>
                ) : (
                  <motion.svg
                    key="play"
                    initial={{ scale: 0.6, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.6, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M5 3l14 9-14 9V3z" />
                  </motion.svg>
                )}
              </AnimatePresence>
            </button>
          </div>

          {/* Nota */}
          <span style={{ fontSize: 15, color: "rgba(255,255,255,0.25)" }}>♪</span>
        </div>

        {/* Label debajo del botón */}
        <motion.p
          animate={{ opacity: isPlaying ? 0 : 1 }}
          transition={{ duration: 0.4 }}
          style={{
            fontSize: 20,
            letterSpacing: "0.35em",
            color: "rgba(255,255,255)",
            textTransform: "uppercase",
          }}
        >
          PLAY MUSIC
        </motion.p>
      </div>
    </div>
  );
}