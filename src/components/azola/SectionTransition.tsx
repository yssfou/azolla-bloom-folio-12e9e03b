import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

type Tone = "deep" | "surface" | "water" | "emerald";

const fillFor: Record<Tone, string> = {
  deep: "hsl(153 70% 8%)",
  emerald: "hsl(153 70% 14%)",
  surface: "hsl(210 17% 98%)",
  water: "hsl(187 76% 93% / 0.4)",
};

const bgFor: Record<Tone, string> = {
  deep: "bg-[hsl(153_70%_8%)]",
  emerald: "bg-gradient-emerald",
  surface: "bg-surface",
  water: "bg-[hsl(187_76%_93%/0.4)]",
};

interface Props {
  /** Tone of the section above the divider */
  from: Tone;
  /** Tone of the section below the divider */
  to: Tone;
  /** Variant of the divider shape */
  variant?: "wave" | "wave-soft" | "blob";
  /** Flip the curve vertically */
  flip?: boolean;
  /** Height in pixels */
  height?: number;
}

/**
 * Organic SVG transition between two sections.
 * Renders a band that takes the `from` color at top and the `to` color at bottom,
 * with an SVG wave drawing the boundary so the next section "flows" out of the previous one.
 */
export const SectionTransition = ({
  from,
  to,
  variant = "wave",
  flip = false,
  height = 140,
}: Props) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  // Subtle horizontal drift to feel alive
  const x = useTransform(scrollYProgress, [0, 1], [-20, 20]);

  const fillTop = fillFor[from];
  const fillBottom = fillFor[to];

  const paths: Record<NonNullable<Props["variant"]>, string> = {
    wave: "M0,60 C240,140 480,0 720,60 C960,120 1200,30 1440,80 L1440,160 L0,160 Z",
    "wave-soft": "M0,80 C360,30 720,130 1080,70 C1260,40 1380,90 1440,80 L1440,160 L0,160 Z",
    blob: "M0,90 C200,160 380,40 600,80 C820,120 1000,180 1200,90 C1320,40 1400,80 1440,70 L1440,160 L0,160 Z",
  };

  return (
    <div
      ref={ref}
      aria-hidden
      className="relative w-full overflow-hidden -mt-px -mb-px pointer-events-none"
      style={{ height, background: fillTop }}
    >
      {/* soft glow seam */}
      <div
        className="absolute inset-x-0 top-1/2 h-[2px] -translate-y-1/2 opacity-40"
        style={{
          background: `linear-gradient(90deg, transparent, ${
            to === "surface" || to === "water" ? "hsl(145 63% 49% / 0.5)" : "hsl(146 56% 78% / 0.4)"
          }, transparent)`,
          filter: "blur(6px)",
        }}
      />
      <motion.svg
        style={{ x }}
        viewBox="0 0 1440 160"
        preserveAspectRatio="none"
        className={`absolute inset-x-0 bottom-0 w-[110%] -ms-[5%] h-full will-change-transform ${
          flip ? "rotate-180" : ""
        }`}
      >
        <path d={paths[variant]} fill={fillBottom} />
      </motion.svg>
      {/* faint accent ripple line */}
      <svg
        viewBox="0 0 1440 160"
        preserveAspectRatio="none"
        className={`absolute inset-x-0 bottom-0 w-full h-full ${flip ? "rotate-180" : ""}`}
      >
        <path
          d={paths[variant].replace(/L1440,160 L0,160 Z/, "")}
          fill="none"
          stroke="hsl(145 63% 49% / 0.18)"
          strokeWidth="1.2"
        />
      </svg>
    </div>
  );
};

export { bgFor as transitionBgFor };
