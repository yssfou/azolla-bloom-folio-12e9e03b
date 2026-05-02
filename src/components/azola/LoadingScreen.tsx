import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import logoA from "@/assets/logo-primary.png";
import logoB from "@/assets/logo-secondary.png";

interface Props {
  onComplete?: () => void;
}

export const LoadingScreen = ({ onComplete }: Props) => {
  const [mounted, setMounted] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const screenRef = useRef<HTMLDivElement>(null);
  const logoARef = useRef<HTMLImageElement>(null);
  const logoBRef = useRef<HTMLImageElement>(null);
  const flashRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const speedLinesRef = useRef<HTMLDivElement>(null);
  const brandRef = useRef<HTMLDivElement>(null);
  const barFillRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          setMounted(false);
          onComplete?.();
        },
      });

      // Initial states
      gsap.set(logoARef.current, { x: "-100vw", opacity: 0, scale: 0.8, rotation: 0 });
      gsap.set(logoBRef.current, { x: "110vw", opacity: 1, scale: 1.1, filter: "blur(3px)" });
      gsap.set(flashRef.current, { opacity: 0 });
      gsap.set(ringRef.current, { scale: 0, opacity: 0 });
      gsap.set(speedLinesRef.current, { opacity: 0 });
      gsap.set(brandRef.current?.querySelectorAll(".brand-letter") ?? [], { y: 20, opacity: 0 });
      gsap.set(barFillRef.current, { scaleX: 0, transformOrigin: "left center" });

      // PHASE 1 — Logo A appears (0 → 1.0s)
      tl.to(logoARef.current, {
        x: "0vw",
        opacity: 1,
        scale: 1,
        duration: 0.8,
        ease: "back.out(1.4)",
      })
      .to({}, { duration: 0.2 }); // hold

      // PHASE 2 — Logo B charges in (1.0 → 1.6s)
      tl.to(speedLinesRef.current, { opacity: 1, duration: 0.1 }, "phase2")
        .to(
          logoBRef.current,
          {
            x: "0vw",
            scale: 1,
            filter: "blur(0px)",
            duration: 0.55,
            ease: "power4.in",
          },
          "phase2"
        );

      // PHASE 3 — COLLISION (1.6 → 1.95s) — fire all in same frame
      tl.add("impact")
        .to(speedLinesRef.current, { opacity: 0, duration: 0.1 }, "impact")
        // flash
        .to(flashRef.current, { opacity: 1, duration: 0.05, ease: "none" }, "impact")
        .to(flashRef.current, { opacity: 0, duration: 0.1, ease: "none" }, "impact+=0.05")
        // shockwave
        .fromTo(
          ringRef.current,
          { scale: 0, opacity: 1 },
          { scale: 3, opacity: 0, duration: 0.4, ease: "expo.out" },
          "impact"
        )
        // logo A knocked out
        .to(
          logoARef.current,
          {
            x: "-110vw",
            rotation: -25,
            scale: 0.6,
            opacity: 0,
            duration: 0.35,
            ease: "power4.in",
          },
          "impact"
        )
        // screen shake
        .to(
          screenRef.current,
          { x: "+=8", duration: 0.05, repeat: 5, yoyo: true, ease: "none" },
          "impact"
        );

      // particle burst
      const particles = particlesRef.current?.querySelectorAll<HTMLDivElement>(".particle") ?? [];
      particles.forEach((p) => {
        const angle = Math.random() * Math.PI * 2;
        const dist = gsap.utils.random(40, 80);
        tl.fromTo(
          p,
          { x: 0, y: 0, scale: 0, opacity: 1 },
          {
            x: Math.cos(angle) * dist,
            y: Math.sin(angle) * dist,
            scale: gsap.utils.random(0.8, 1.4),
            opacity: 0,
            duration: 0.5,
            ease: "power2.out",
          },
          "impact"
        );
      });

      // PHASE 4 — Logo B takes its place (1.95 → 2.8s)
      tl.to(
        logoBRef.current,
        {
          scale: 1.08,
          duration: 0.3,
          ease: "elastic.out(1, 0.4)",
        },
        "+=0.05"
      )
        .to(logoBRef.current, { scale: 1, duration: 0.3, ease: "elastic.out(1, 0.4)" })
        .to(
          logoBRef.current,
          {
            boxShadow: "0 0 40px rgba(90,103,63,0.5)",
            duration: 0.4,
            yoyo: true,
            repeat: 1,
          },
          "<"
        )
        .to(
          brandRef.current?.querySelectorAll(".brand-letter") ?? [],
          { y: 0, opacity: 1, stagger: 0.06, duration: 0.5, ease: "expo.out" },
          "<"
        )
        .to(barFillRef.current, { scaleX: 1, duration: 0.9, ease: "power2.inOut" }, "<");

      // PHASE 5 — Exit (3.5 → 4.3s)
      tl.to(
        logoBRef.current,
        { scale: 1.15, opacity: 0, duration: 0.4, ease: "expo.in" },
        "+=0.3"
      )
        .to(
          [brandRef.current, barFillRef.current?.parentElement],
          { opacity: 0, duration: 0.3 },
          "<"
        )
        .to(
          screenRef.current,
          {
            clipPath: "inset(0 0 100% 0)",
            duration: 0.75,
            ease: "expo.inOut",
          },
          "-=0.1"
        );
    }, containerRef);

    return () => ctx.revert();
  }, [onComplete]);

  if (!mounted) return null;

  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
  const logoSize = isMobile ? 130 : 180;

  return (
    <div ref={containerRef} className="fixed inset-0 z-[9999] pointer-events-none">
      <div
        ref={screenRef}
        className="absolute inset-0 overflow-hidden pointer-events-auto"
        style={{ background: "#cec8a0", clipPath: "inset(0 0 0% 0)" }}
      >
        {/* Center stage */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="relative" style={{ width: logoSize, height: logoSize }}>
            {/* Speed lines */}
            <div
              ref={speedLinesRef}
              className="absolute top-1/2 -translate-y-1/2"
              style={{ right: "100%", width: 80, height: 60 }}
            >
              {[-20, 0, 20].map((y, i) => (
                <span
                  key={i}
                  className="absolute block"
                  style={{
                    top: `calc(50% + ${y}px)`,
                    right: 0,
                    width: 60,
                    height: 2,
                    background: "#2e2d1f",
                    opacity: 0.4,
                    transform: "translateY(-50%)",
                  }}
                />
              ))}
            </div>

            {/* Shockwave ring */}
            <div
              ref={ringRef}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
              style={{
                width: logoSize,
                height: logoSize,
                border: "2px solid rgba(255,255,255,0.8)",
              }}
            />

            {/* Particles */}
            <div
              ref={particlesRef}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            >
              {Array.from({ length: 8 }).map((_, i) => (
                <div
                  key={i}
                  className="particle absolute rounded-sm"
                  style={{
                    width: 5,
                    height: 5,
                    background: i % 2 === 0 ? "#5A673F" : "#cec8a0",
                    boxShadow: "0 0 6px rgba(0,0,0,0.2)",
                  }}
                />
              ))}
            </div>

            {/* Logo A */}
            <img
              ref={logoARef}
              src={logoA}
              alt=""
              className="absolute top-1/2 left-1/2 object-contain"
              style={{
                width: logoSize,
                height: logoSize,
                transform: "translate(-50%, -50%)",
                borderRadius: 22,
                filter: "drop-shadow(0 12px 40px rgba(0,0,0,0.18))",
                zIndex: 1,
              }}
            />

            {/* Logo B */}
            <img
              ref={logoBRef}
              src={logoB}
              alt="Azolla"
              className="absolute top-1/2 left-1/2 object-contain"
              style={{
                width: logoSize,
                height: logoSize,
                transform: "translate(-50%, -50%)",
                borderRadius: 22,
                filter: "drop-shadow(0 12px 40px rgba(0,0,0,0.18))",
                zIndex: 2,
              }}
            />
          </div>

          {/* Brand name */}
          <div
            ref={brandRef}
            className="mt-8 flex overflow-hidden"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontWeight: 700,
              color: "#2e2d1f",
              fontSize: isMobile ? 32 : 44,
              letterSpacing: "0.15em",
            }}
          >
            {"AZOLLA".split("").map((ch, i) => (
              <span key={i} className="brand-letter inline-block">
                {ch}
              </span>
            ))}
          </div>

          {/* Loading bar */}
          <div
            className="mt-5 overflow-hidden rounded-full"
            style={{ width: 160, height: 2, background: "rgba(46,45,31,0.15)" }}
          >
            <div
              ref={barFillRef}
              className="h-full"
              style={{ background: "#5A673F", width: "100%" }}
            />
          </div>
        </div>

        {/* Flash overlay */}
        <div
          ref={flashRef}
          className="absolute inset-0 pointer-events-none"
          style={{ background: "white", zIndex: 10000 }}
        />
      </div>
    </div>
  );
};
