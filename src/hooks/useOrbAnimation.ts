import { CanvasProps } from "../components/Canvas";
import { useEffect } from "react";

export interface Orb {
  x: number;
  y: number;
  radius: number;
  alpha: number;
  key: string;
  createdAt: number;
  fontSize: number;
  hue: number;
}

export const useOrbAnimation = ({
  orbsRef,
  animationFrameRef,
}: CanvasProps) => {
  useEffect(() => {
    const handleKeyDown = (e: globalThis.KeyboardEvent) => {
      // Prevent all other keyboard shortcuts and special keys
      if (e.key !== "Escape") {
        e.preventDefault();
      }

      const emojis = ["😀", "😎", "🚀", "💫", "✨", "🎵", "🎮", "💖", "🌟"];
      let displayChar = e.key;

      // Only create orb for regular key presses (not for modifier keys)
      if (e.key.length === 1) {
        displayChar =
          Math.random() > 0.5
            ? e.key
            : emojis[Math.floor(Math.random() * emojis.length)];
      } else {
        displayChar = emojis[Math.floor(Math.random() * emojis.length)];
      }

      const canvas = document.querySelector("canvas");
      if (!canvas) return;

      const radius = Math.min(
        Math.max(300, Math.random() * Math.min(canvas.width, canvas.height)),
        Math.min(canvas.width, canvas.height),
      );

      const x = Math.random() * (canvas.width - 2 * radius) + radius;
      const y = Math.random() * (canvas.height - 2 * radius) + radius;

      const newOrb: Orb = {
        x,
        y,
        radius,
        alpha: 1,
        key: displayChar,
        createdAt: Date.now(),
        fontSize: Math.floor(Math.random() * (200 - 144 + 1) + 144),
        hue: Math.floor(Math.random() * 360),
      };
      orbsRef.current = [...orbsRef.current, newOrb];
    };

    window.addEventListener("keydown", handleKeyDown, true);

    return () => {
      window.removeEventListener("keydown", handleKeyDown, true);
    };
  }, [animationFrameRef, orbsRef]);
};
