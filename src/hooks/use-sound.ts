"use client";

import { useMemo } from "react";

export const useSound = (src: string, volume = 0.5) => {
  const audio = useMemo(() => {
    if (typeof Audio !== "undefined") {
      return new Audio(src);
    }
    return undefined;
  }, [src]);

  const play = () => {
    if (audio) {
      audio.currentTime = 0;
      audio.volume = volume;
      audio.play().catch((err) => {
        console.error("Failed to play audio:", err);
      });
    }
  };

  return play;
};
