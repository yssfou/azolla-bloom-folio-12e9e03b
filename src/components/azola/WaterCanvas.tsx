import { useEffect, useRef } from "react";

/**
 * Animated water surface canvas with floating Azolla leaves
 * and cursor-reactive ripples. Lightweight, no external deps.
 */
export const WaterCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ripples = useRef<{ x: number; y: number; r: number; o: number }[]>([]);
  const leaves = useRef<{ x: number; y: number; r: number; vx: number; vy: number; rot: number; vr: number; size: number }[]>(
    []
  );
  const raf = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    let w = (canvas.width = canvas.offsetWidth * devicePixelRatio);
    let h = (canvas.height = canvas.offsetHeight * devicePixelRatio);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const resize = () => {
      w = canvas.width = canvas.offsetWidth * devicePixelRatio;
      h = canvas.height = canvas.offsetHeight * devicePixelRatio;
    };
    window.addEventListener("resize", resize);

    // seed leaves
    const count = reduce ? 12 : 36;
    leaves.current = Array.from({ length: count }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * Math.PI * 2,
      vx: (Math.random() - 0.5) * 0.15,
      vy: (Math.random() - 0.5) * 0.15,
      rot: Math.random() * Math.PI,
      vr: (Math.random() - 0.5) * 0.004,
      size: 6 + Math.random() * 16,
    }));

    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      ripples.current.push({
        x: (e.clientX - rect.left) * devicePixelRatio,
        y: (e.clientY - rect.top) * devicePixelRatio,
        r: 0,
        o: 0.5,
      });
      if (ripples.current.length > 14) ripples.current.shift();
    };
    canvas.addEventListener("mousemove", onMove);

    const drawLeaf = (l: (typeof leaves.current)[number]) => {
      ctx.save();
      ctx.translate(l.x, l.y);
      ctx.rotate(l.rot);
      const grd = ctx.createRadialGradient(0, 0, 1, 0, 0, l.size * devicePixelRatio);
      grd.addColorStop(0, "rgba(168, 230, 207, 0.85)");
      grd.addColorStop(0.6, "rgba(46, 204, 113, 0.55)");
      grd.addColorStop(1, "rgba(11, 61, 46, 0.0)");
      ctx.fillStyle = grd;
      ctx.beginPath();
      ctx.ellipse(0, 0, l.size * devicePixelRatio, l.size * 0.55 * devicePixelRatio, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    };

    const tick = () => {
      ctx.clearRect(0, 0, w, h);

      // soft water gradient base
      const bg = ctx.createLinearGradient(0, 0, 0, h);
      bg.addColorStop(0, "rgba(11,61,46,0.0)");
      bg.addColorStop(1, "rgba(46,204,113,0.06)");
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, w, h);

      // ripples
      ripples.current.forEach((rp) => {
        rp.r += 1.6 * devicePixelRatio;
        rp.o *= 0.96;
        ctx.beginPath();
        ctx.strokeStyle = `rgba(168,230,207,${rp.o})`;
        ctx.lineWidth = 1.2 * devicePixelRatio;
        ctx.arc(rp.x, rp.y, rp.r, 0, Math.PI * 2);
        ctx.stroke();
      });
      ripples.current = ripples.current.filter((rp) => rp.o > 0.02);

      // leaves
      leaves.current.forEach((l) => {
        l.x += l.vx;
        l.y += l.vy;
        l.rot += l.vr;
        if (l.x < -40) l.x = w + 40;
        if (l.x > w + 40) l.x = -40;
        if (l.y < -40) l.y = h + 40;
        if (l.y > h + 40) l.y = -40;
        drawLeaf(l);
      });

      raf.current = requestAnimationFrame(tick);
    };
    tick();

    return () => {
      cancelAnimationFrame(raf.current!);
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("mousemove", onMove);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" aria-hidden />;
};
