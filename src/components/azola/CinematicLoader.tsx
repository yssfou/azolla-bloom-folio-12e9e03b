import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { Leaf } from "lucide-react";

interface Props {
  onComplete?: () => void;
}

export const CinematicLoader = ({ onComplete }: Props) => {
  const rootRef = useRef<HTMLDivElement>(null);
  const phase1Ref = useRef<HTMLDivElement>(null);
  const logoCardRef = useRef<HTMLDivElement>(null);
  const flashRef = useRef<HTMLDivElement>(null);
  const phase2Ref = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const barFillRef = useRef<HTMLDivElement>(null);
  const watermarkRef = useRef<SVGSVGElement>(null);
  const [mounted, setMounted] = useState(true);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (sessionStorage.getItem("azolla_intro_played") === "1") {
      setMounted(false);
      onComplete?.();
      return;
    }
    sessionStorage.setItem("azolla_intro_played", "1");

    const isMobile = window.matchMedia("(max-width: 640px)").matches;
    const ctx = gsap.context(() => {
      // Initial states
      gsap.set(phase2Ref.current, { autoAlpha: 0 });
      gsap.set(logoCardRef.current, { scale: 0.6, opacity: 0 });
      gsap.set(flashRef.current, { opacity: 0 });
      gsap.set(titleRef.current?.querySelectorAll(".letter") ?? [], { y: 40, opacity: 0 });
      gsap.set(subtitleRef.current, { x: 20, opacity: 0 });
      gsap.set(barFillRef.current, { scaleX: 0, transformOrigin: "left center" });

      // Watermark continuous spin
      gsap.to(watermarkRef.current, {
        rotation: 360,
        duration: 3,
        repeat: -1,
        ease: "none",
        transformOrigin: "50% 50%",
      });

      const tl = gsap.timeline({
        onComplete: () => {
          setMounted(false);
          onComplete?.();
        },
      });

      // PHASE 1 — IN
      tl.to(logoCardRef.current, {
        scale: 1,
        opacity: 1,
        duration: 0.7,
        ease: "expo.out",
      })
        .to({}, { duration: 0.6 }); // hold

      // PHASE 1 — OUT (shake + shrink/fall + flash)
      if (!isMobile) {
        tl.to(logoCardRef.current, {
          x: 12,
          duration: 0.06,
          repeat: 5,
          yoyo: true,
          ease: "power1.inOut",
        });
      }
      tl.to(
        logoCardRef.current,
        {
          scale: 0.3,
          y: 60,
          rotation: 15,
          opacity: 0,
          duration: 0.45,
          ease: "back.in(2)",
        },
        ">"
      ).to(
        flashRef.current,
        {
          keyframes: [
            { opacity: 1, duration: 0.05 },
            { opacity: 0, duration: 0.05 },
          ],
        },
        "<"
      );

      // Swap phases
      tl.set(phase1Ref.current, { autoAlpha: 0 })
        .set(phase2Ref.current, { autoAlpha: 1 });

      // PHASE 2 — Brand
      tl.to(titleRef.current?.querySelectorAll(".letter") ?? [], {
        y: 0,
        opacity: 1,
        duration: 0.7,
        stagger: 0.07,
        ease: "expo.out",
      })
        .to(
          subtitleRef.current,
          { x: 0, opacity: 1, duration: 0.8, ease: "expo.out" },
          "-=0.3"
        )
        .to(
          barFillRef.current,
          { scaleX: 1, duration: 1.4, ease: "none" },
          "-=0.5"
        )
        .to({}, { duration: 0.2 });

      // EXIT — clip-path wipe up
      tl.to(rootRef.current, {
        clipPath: "inset(0 0 100% 0)",
        duration: 0.7,
        ease: "expo.inOut",
      });
    }, rootRef);

    return () => ctx.revert();
  }, [onComplete]);

  if (!mounted) return null;

  const letters = "AZOLLA".split("");

  return (
    <div
      ref={rootRef}
      className="fixed inset-0 z-[9999] overflow-hidden"
      style={{ clipPath: "inset(0 0 0 0)" }}
      aria-hidden
    >
      {/* PHASE 1 */}
      <div
        ref={phase1Ref}
        className="absolute inset-0 grid place-items-center"
        style={{ backgroundColor: "#f0ebe3" }}
      >
        <div
          ref={logoCardRef}
          className="w-28 h-28 rounded-3xl shadow-2xl grid place-items-center"
          style={{
            background: "linear-gradient(135deg, #ffffff 0%, #e8e3d6 100%)",
          }}
        >
          <Leaf className="w-14 h-14" style={{ color: "#5A673F" }} strokeWidth={2} />
        </div>
        <div
          ref={flashRef}
          className="absolute inset-0 bg-white pointer-events-none"
          style={{ opacity: 0 }}
        />
      </div>

      {/* PHASE 2 */}
      <div
        ref={phase2Ref}
        className="absolute inset-0 grid place-items-center overflow-hidden"
        style={{ backgroundColor: "#cec8a0" }}
      >
        {/* Watermark leaf */}
        <svg
          ref={watermarkRef}
          viewBox="0 0 100 100"
          className="absolute w-[420px] h-[420px] pointer-events-none"
          style={{ opacity: 0.3, color: "#5A673F" }}
        >
          <path
            fill="currentColor"
            d="M50 5C30 25 15 45 15 65c0 17 14 30 35 30s35-13 35-30c0-20-15-40-35-60zm0 18c12 14 22 28 22 42 0 11-9 20-22 20s-22-9-22-20c0-14 10-28 22-42z"
          />
        </svg>

        <div className="relative z-10 flex flex-col items-center gap-6 px-6">
          <h1
            ref={titleRef}
            className="flex gap-1 leading-none"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontWeight: 700,
              color: "#2e2d1f",
              fontSize: "clamp(64px, 12vw, 140px)",
              letterSpacing: "0.05em",
            }}
          >
            {letters.map((l, i) => (
              <span key={i} className="letter inline-block">
                {l}
              </span>
            ))}
          </h1>

          <p
            ref={subtitleRef}
            style={{
              fontFamily: "'Great Vibes', cursive",
              color: "#2e2d1f",
              fontSize: "clamp(24px, 3.5vw, 36px)",
            }}
          >
            sustainable by nature
          </p>

          <div
            className="relative mt-4 overflow-hidden"
            style={{
              width: 200,
              height: 2,
              backgroundColor: "rgba(90, 103, 63, 0.15)",
            }}
          >
            <div
              ref={barFillRef}
              className="h-full"
              style={{
                width: "100%",
                backgroundColor: "#5A673F",
                boxShadow: "0 0 8px #5A673F, 0 0 14px rgba(90,103,63,0.6)",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
