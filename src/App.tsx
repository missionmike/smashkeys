import "./App.css";

import { useEffect, useRef } from "react";

interface Orb {
  x: number;
  y: number;
  radius: number;
  alpha: number;
  key: string;
  createdAt: number;
  fontSize: number;
  hue: number;
}

function App() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number>();
  const orbsRef = useRef<Orb[]>([]);

  const enterFullscreen = async () => {
    try {
      if (containerRef.current) {
        if (containerRef.current.requestFullscreen) {
          await containerRef.current.requestFullscreen();
        }
      }
    } catch (err) {
      console.error("Error attempting to enter fullscreen:", err);
    }
  };

  useEffect(() => {
    enterFullscreen();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

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

      const radius = Math.min(
        Math.max(300, Math.random() * Math.min(canvas.width, canvas.height)),
        Math.min(canvas.width, canvas.height)
      );

      const x = Math.random() * (canvas.width - 2 * radius) + radius;
      const y = Math.random() * (canvas.height - 2 * radius) + radius;

      const newOrb = {
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
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("keydown", handleKeyDown, true);
      cancelAnimationFrame(animationFrameRef?.current || 0);
    };
  }, []);

  useEffect(() => {
    if (!canvasRef.current) return;
    if (!animationFrameRef) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    if (!ctx) return;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const currentTime = Date.now();
      const updatedOrbs = orbsRef.current.filter((orb) => {
        const age = currentTime - orb.createdAt;
        const lifespan = 1000;
        const alpha = 1 - age / lifespan;

        if (alpha <= 0) return false;

        ctx.save();
        ctx.globalAlpha = alpha;

        const gradient = ctx.createRadialGradient(
          orb.x,
          orb.y,
          0,
          orb.x,
          orb.y,
          orb.radius
        );
        const hue1 = orb.hue;
        const hue2 = (hue1 + 40) % 360;
        const hue3 = (hue2 + 40) % 360;
        gradient.addColorStop(0, `hsla(${hue1}, 100%, 80%, ${alpha})`);
        gradient.addColorStop(0.3, `hsla(${hue2}, 100%, 60%, ${alpha * 0.5})`);
        gradient.addColorStop(1, `hsla(${hue3}, 100%, 50%, 0)`);

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(orb.x, orb.y, orb.radius, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
        ctx.font = `${orb.fontSize}px Arial`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(orb.key, orb.x, orb.y);

        ctx.restore();
        return true;
      });

      orbsRef.current = updatedOrbs;
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameRef?.current || 0);
    };
  }, []);

  return (
    <div ref={containerRef} className="app">
      <canvas
        ref={canvasRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          background:
            "radial-gradient(circle at center, #1a1a2e 0%, #16213e 50%, #0f0f0f 100%)",
        }}
      />
    </div>
  );
}

export default App;
