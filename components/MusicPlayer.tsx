"use client";

import { Pause, Play, Volume2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";

// Expone control global para que LyricsPage pueda pausar/reanudar
export const musicController = {
  pause: () => {},
  resume: () => {},
};

export default function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [mounted, setMounted] = useState(false);

  const fadeIn = async () => {
    if (!audioRef.current) return;
    const audio = audioRef.current;
    audio.volume = 0;
    try {
      await audio.play();
      setPlaying(true);
      let volume = 0;
      const fade = setInterval(() => {
        volume += 0.02;
        if (audio) audio.volume = Math.min(volume, 0.25);
        if (volume >= 0.25) clearInterval(fade);
      }, 100);
    } catch (e) {
      console.error("Error reproduciendo audio:", e);
    }
  };

  const fadeOut = (onDone?: () => void) => {
    if (!audioRef.current) return;
    const audio = audioRef.current;
    let volume = audio.volume;
    const fade = setInterval(() => {
      volume -= 0.02;
      if (audio) audio.volume = Math.max(volume, 0);
      if (volume <= 0) {
        clearInterval(fade);
        audio.pause();
        setPlaying(false);
        onDone?.();
      }
    }, 100);
  };

  useEffect(() => {
    setMounted(true);
    fadeIn();
  }, []);

  // Registrar controladores globales
  useEffect(() => {
    musicController.pause = () => {
      if (playing) fadeOut();
    };
    musicController.resume = () => {
      if (!playing) fadeIn();
    };
  }, [playing]);

  const toggleMusic = () => {
    if (playing) {
      fadeOut();
    } else {
      fadeIn();
    }
  };

  if (!mounted) return null;

  return (
    <>
      <audio ref={audioRef} src="/music/ambience.mp3" loop />

      <button
        onClick={toggleMusic}
        className="group fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-full border border-white/20 bg-white/10 px-5 py-3 text-white backdrop-blur-xl transition-all duration-500 hover:scale-105 hover:bg-white/20 active:scale-95"
        style={{
          boxShadow: playing ? "0 0 25px rgba(255,255,255,0.12)" : "none",
        }}
      >
        {playing && (
          <div className="absolute inset-0 rounded-full bg-white/10 animate-pulse" />
        )}

        <div className="relative z-10 flex items-center justify-center">
          {playing ? <Pause size={18} /> : <Play size={18} className="ml-0.5" />}
        </div>

        <div className="relative z-10 flex flex-col items-start">
          <span className="text-xs uppercase tracking-[0.25em] text-white/50">ambience</span>
          <span className="text-sm font-light tracking-wide">
            {playing ? "now playing" : "play music"}
          </span>
        </div>

        {playing ? (
          <div className="relative z-10 flex items-end gap-[2px] h-5">
            <span className="w-1 h-2 bg-white/70 rounded-full animate-[bounce_1s_infinite]" />
            <span className="w-1 h-4 bg-white/70 rounded-full animate-[bounce_1.2s_infinite]" />
            <span className="w-1 h-3 bg-white/70 rounded-full animate-[bounce_0.8s_infinite]" />
          </div>
        ) : (
          <Volume2 size={16} className="relative z-10 text-white/60" />
        )}
      </button>
    </>
  );
}