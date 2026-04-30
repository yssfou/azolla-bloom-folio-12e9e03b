import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import competitorLogo from "@/assets/competitor-logo.png";

interface Props {
  onComplete?: () => void;
}

export const CinematicLoader = ({ onComplete }: Props) => {
  const rootRef = useRef<HTMLDivElement>(null);
  const phase1Ref = useRef<HTMLDivElement>(null);
  const phase2Ref = useRef<HTMLDivElement>(null);
  const logoCardRef = useRef<HTMLDivElement>(null);
  const flashRef = useRef<HTMLDivElement>(null);
  const cracksRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const scriptRef = useRef<HTMLSpanElement>(null);
  const barFillRef = useRef<HTMLDivElement>(null);
  const watermarkRef = useRef<HTMLDivElement>(null);
  const tagRef = useRef<HTMLDivElement>(null);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const isMobile = window.matchMedia("(max-width: 640px)").matches;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          setHidden(true);
          onComplete?.();
        },
      });

      // PHASE 1 — competitor logo IN
      tl.fromTo(
        logoCardRef.current,
        { scale: 0.6, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.7, ease: "expo.out" }
      )
        // Hold 0.6s
        .to({}, { duration: 0.6 });

      // Shake (skip on mobile)
      if (!isMobile) {
        tl.to(logoCardRef.current, {
          x: 12,
          duration: 0.06,
          repeat: 5,
          yoyo: true,
          ease: "power2.inOut",
        }).set(logoCardRef.current, { x: 0 });
      }

      // Flash + cracks + fall
      tl.to(
        flashRef.current,
        { opacity: 1, duration: 0.05, ease: "power1.in" },
        ">"
      )
        .to(flashRef.current, { opacity: 0, duration: 0.1, ease: "power1.out" })
        .fromTo(
          cracksRef.current,
          { opacity: 0, scale: 0.6 },
          { opacity: 1, scale: 1, duration: 0.05 },
          "<"
        )
        .to(cracksRef.current, { opacity: 0, duration: 0.2 }, ">0.05")
        .to(
          logoCardRef.current,
          {
            scale: 0.3,
            y: 60,
            rotation: 15,
            opacity: 0,
            duration: 0.45,
            ease: "back.in(2)",
          },
          "<-0.1"
        )
        .set(phase1Ref.current, { display: "none" });

      // PHASE 2 — Azolla brand
      tl.set(phase2Ref.current, { opacity: 1 });

      const letters = titleRef.current?.querySelectorAll<HTMLSpanElement>(".letter");
      if (letters) {
        tl.fromTo(
          letters,
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, stagger: 0.07, ease: "expo.out" }
        );
      }

      tl.fromTo(
        scriptRef.current,
        { opacity: 0, x: 20 },
        { opacity: 1, x: 0, duration: 0.7, ease: "expo.out" },
        "-=0.3"
      );

      tl.fromTo(
        watermarkRef.current,
        { opacity: 0 },
        { opacity: 0.3, duration: 0.6 },
        "<"
      );

      // Continuous rotate watermark
      gsap.to(watermarkRef.current, {
        rotation: 360,
        duration: 3,
        ease: "none",
        repeat: -1,
        transformOrigin: "center center",
      });

      tl.to(barFillRef.current, {
        width: "100%",
        duration: 1.4,
        ease: "none",
      });

      tl.fromTo(
        tagRef.current,
        { opacity: 0, y: 8 },
        { opacity: 1, y: 0, duration: 0.5 },
        "-=1.0"
      );

      // Hold briefly then exit wipe
      tl.to({}, { duration: 0.2 });

      tl.to(rootRef.current, {
        clipPath: "inset(0 0 100% 0)",
        duration: 0.7,
        ease: "expo.inOut",
      });
    }, rootRef);

    return () => ctx.revert();
  }, [onComplete]);

  if (hidden) return null;

  const word = "AZOLLA".split("");

  return (
    <div
      ref={rootRef}
      className="fixed inset-0 z-[9999] overflow-hidden"
      style={{ clipPath: "inset(0 0 0 0)" }}
    >
      {/* PHASE 1 */}
      <div
        ref={phase1Ref}
        className="absolute inset-0 grid place-items-center"
        style={{ backgroundColor: "#f0ebe3" }}
      >
        <div ref={logoCardRef} className="relative">
          <img
            src={competitorLogo}
            alt=""
            className="w-48 h-48 md:w-64 md:h-64 object-contain drop-shadow-2xl"
            draggable={false}
          />
          {/* Crack lines */}
          <div
            ref={cracksRef}
            className="absolute inset-0 pointer-events-none opacity-0"
            aria-hidden
          >
            <svg viewBox="0 0 200 200" className="w-full h-full">
              <g
                stroke="#1a1a1a"
                strokeWidth="1.5"
                fill="none"
                strokeLinecap="round"
              >
                <line x1="100" y1="100" x2="30" y2="40" />
                <line x1="100" y1="100" x2="170" y2="50" />
                <line x1="100" y1="100" x2="40" y2="170" />
                <line x1="100" y1="100" x2="180" y2="160" />
                <line x1="100" y1="100" x2="100" y2="20" />
                <line x1="100" y1="100" x2="20" y2="110" />
              </g>
            </svg>
          </div>
        </div>
        <div
          ref={flashRef}
          className="absolute inset-0 bg-white pointer-events-none opacity-0"
        />
      </div>

      {/* PHASE 2 */}
      <div
        ref={phase2Ref}
        className="absolute inset-0 grid place-items-center opacity-0"
        style={{ backgroundColor: "#cec8a0" }}
      >
        {/* Watermark leaf */}
        <div
          ref={watermarkRef}
          className="absolute opacity-0 pointer-events-none"
          aria-hidden
        >
          <svg width="320" height="320" viewBox="0 0 100 100" fill="none">
            <path
              d="M50 10 C30 25 20 45 25 65 C30 80 45 88 50 90 C55 88 70 80 75 65 C80 45 70 25 50 10 Z"
              fill="#5A673F"
            />
            <path
              d="M50 20 L50 85"
              stroke="#2e2d1f"
              strokeWidth="0.6"
              opacity="0.5"
            />
          </svg>
        </div>

        <div className="relative flex flex-col items-center px-6">
          <h1
            ref={titleRef}
            className="flex overflow-hidden"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontWeight: 700,
              color: "#2e2d1f",
              fontSize: "clamp(3.5rem, 10vw, 7rem)",
              lineHeight: 1,
              letterSpacing: "0.05em",
            }}
          >
            {word.map((l, i) => (
              <span
                key={i}
                className="letter inline-block"
                style={{ display: "inline-block" }}
              >
                {l}
              </span>
            ))}
          </h1>

          <span
            ref={scriptRef}
            className="mt-2 opacity-0"
            style={{
              fontFamily: "'Great Vibes', cursive",
              color: "#5A673F",
              fontSize: "clamp(2rem, 5vw, 3rem)",
              lineHeight: 1,
            }}
          >
            Farm
          </span>

          {/* Loading bar */}
          <div
            className="relative mt-10 overflow-hidden"
            style={{
              width: 200,
              height: 2,
              backgroundColor: "rgba(46, 45, 31, 0.2)",
            }}
          >
            <div
              ref={barFillRef}
              className="absolute inset-y-0 left-0"
              style={{
                width: "0%",
                backgroundColor: "#5A673F",
                boxShadow: "0 0 12px #5A673F, 0 0 24px rgba(90, 103, 63, 0.6)",
              }}
            />
          </div>

          <div
            ref={tagRef}
            className="mt-8 opacity-0"
            style={{
              fontFamily: "'Jost', sans-serif",
              fontWeight: 300,
              color: "#2e2d1f",
              fontSize: "0.65rem",
              letterSpacing: "0.4em",
              textTransform: "uppercase",
            }}
          >
            Est. 2024 · Premium Azolla Cultivation
          </div>
        </div>
      </div>
    </div>
  );
};
