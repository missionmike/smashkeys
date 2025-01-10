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

export interface CanvasProps {
  orbsRef: React.MutableRefObject<Orb[]>;
  animationFrameRef: React.MutableRefObject<number | undefined>;
}

const Canvas: React.FC<CanvasProps> = ({ orbsRef, animationFrameRef }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
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
  }, [orbsRef, animationFrameRef]);

  return (
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
  );
};

export default Canvas;
