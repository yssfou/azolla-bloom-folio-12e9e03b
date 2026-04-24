import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { ArrowDown, ArrowRight, Sparkles, Leaf } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { WaterCanvas } from "./WaterCanvas";
import heroImg from "@/assets/hero-azolla.jpg";

const ease = [0.16, 1, 0.3, 1] as const;

export const Hero = () => {
  const { t, lang } = useI18n();
  const sectionRef = useRef<HTMLElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  // Scroll-driven parallax
  const { scrollY } = useScroll();
  const yBg = useTransform(scrollY, [0, 600], [0, 140]);
  const yMid = useTransform(scrollY, [0, 600], [0, 80]);
  const yFg = useTransform(scrollY, [0, 600], [0, -40]);
  const opacity = useTransform(scrollY, [0, 500], [1, 0]);

  // Mouse-tracking spotlight
  useEffect(() => {
    if (reduce) return;
    const onMove = (e: MouseEvent) => {
      const el = glowRef.current;
      if (!el) return;
      const x = (e.clientX / window.innerWidth) * 100;
      const y = (e.clientY / window.innerHeight) * 100;
      el.style.background = `radial-gradient(600px circle at ${x}% ${y}%, hsl(145 63% 49% / 0.22), transparent 55%)`;
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [reduce]);

  return (
    <section
      ref={sectionRef}
      id="top"
      className="relative min-h-screen w-full overflow-hidden bg-gradient-hero noise-overlay"
    >
      {/* Layer 1 — cinematic dark Azolla photo */}
      <motion.div
        style={{ y: yBg }}
        className="absolute inset-0 will-change-transform"
        aria-hidden
      >
        <img
          src={heroImg}
          alt=""
          fetchPriority="high"
          width={1920}
          height={1088}
          className="w-full h-[120%] object-cover opacity-55 scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-deep/85 via-deep/70 to-deep" />
      </motion.div>

      {/* Layer 2 — animated water + leaves canvas */}
      <motion.div style={{ y: yMid }} className="absolute inset-0 opacity-80 will-change-transform">
        <WaterCanvas />
      </motion.div>

      {/* Layer 3 — mouse-tracking glow */}
      <div ref={glowRef} aria-hidden className="absolute inset-0 pointer-events-none transition-[background] duration-300" />

      {/* Glow orbs */}
      <motion.div
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 2, ease }}
        className="absolute -top-40 -start-40 w-[460px] h-[460px] rounded-full bg-fresh/25 blur-[130px]"
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 2.4, delay: 0.3, ease }}
        className="absolute -bottom-40 -end-40 w-[560px] h-[560px] rounded-full bg-water/20 blur-[150px]"
      />

      {/* Mesh */}
      <div className="absolute inset-0 bg-gradient-mesh opacity-50 pointer-events-none" />

      {/* Decorative floating leaf icons */}
      {!reduce &&
        [...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            animate={{
              opacity: [0, 0.5, 0.3, 0.5, 0],
              y: [0, -30, 0, -20, 0],
              rotate: [0, 15, -10, 8, 0],
            }}
            transition={{
              duration: 12 + i * 2,
              delay: i * 0.8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute pointer-events-none"
            style={{
              top: `${15 + i * 14}%`,
              left: `${8 + i * 18}%`,
            }}
          >
            <Leaf className="w-6 h-6 text-fresh/40" strokeWidth={1.5} />
          </motion.div>
        ))}

      {/* Content */}
      <motion.div
        style={{ y: yFg, opacity }}
        className="relative z-10 mx-auto max-w-6xl px-6 md:px-10 pt-32 md:pt-24 pb-32 min-h-screen flex flex-col items-center justify-center text-center will-change-transform"
      >
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1, delay: 0.2, ease }}
          className="inline-flex items-center gap-2 glass-dark rounded-full px-4 py-2 mb-8 hover:border-fresh/60 transition-colors duration-500"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-fresh opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-fresh" />
          </span>
          <Sparkles className="w-4 h-4 text-fresh" />
          <span className="text-xs md:text-sm text-mint/90 tracking-wide">{t.hero.eyebrow}</span>
        </motion.div>

        {/* Headline */}
        <h1 className="font-display text-mint text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-balance max-w-5xl leading-[1.05] mx-auto">
          {t.hero.headline.map((word, i) => (
            <motion.span
              key={`${lang}-${i}`}
              initial={{ opacity: 0, y: 80, filter: "blur(16px)", scale: 0.9 }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)", scale: 1 }}
              transition={{ duration: 1.3, delay: 0.4 + i * 0.18, ease }}
              className="inline-block me-3"
            >
              {i === 1 ? (
                <span className="relative gradient-text">
                  {word}
                  <motion.span
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 1.4, delay: 1.2, ease }}
                    className="absolute -bottom-2 start-0 w-full h-[3px] bg-gradient-fresh origin-start rounded-full"
                  />
                </span>
              ) : (
                word
              )}
            </motion.span>
          ))}
        </h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.15, ease }}
          className="mt-8 max-w-2xl mx-auto text-lg md:text-xl text-mint/75 leading-relaxed"
        >
          {t.hero.subtitle}
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.35, ease }}
          className="mt-10 flex flex-wrap justify-center gap-4"
        >
          <a
            href="#about"
            className="group relative inline-flex items-center gap-2 px-7 py-4 rounded-full glass-dark text-mint font-semibold border border-mint/30 hover:border-fresh hover:shadow-glow hover:-translate-y-0.5 transition-all duration-500 ease-spring"
          >
            <span className="relative z-10">{t.hero.cta1}</span>
            <ArrowRight className="w-4 h-4 relative z-10 transition-transform duration-500 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 rtl:rotate-180" />
          </a>
          <a
            href="#contact"
            className="group relative inline-flex items-center gap-2 px-7 py-4 rounded-full bg-gradient-fresh text-deep font-bold overflow-hidden shadow-glow hover:-translate-y-0.5 transition-transform duration-500 ease-spring"
          >
            <span className="absolute inset-0 bg-mint scale-x-0 group-hover:scale-x-100 origin-start transition-transform duration-700 ease-spring" />
            <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-spring bg-gradient-to-r from-transparent via-white/40 to-transparent" />
            <span className="relative z-10">{t.hero.cta2}</span>
            <ArrowRight className="w-4 h-4 relative z-10 transition-transform duration-500 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 rtl:rotate-180" />
          </a>
        </motion.div>

        {/* Stat strip */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 1.6, ease }}
          className="mt-14 grid grid-cols-3 gap-3 sm:gap-6 max-w-2xl mx-auto w-full"
        >
          {t.hero.stats.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.9, delay: 1.7 + i * 0.12, ease }}
              whileHover={{ y: -4, scale: 1.03 }}
              className="relative rounded-2xl glass-dark px-4 py-4 sm:px-5 sm:py-5 overflow-hidden group cursor-default"
            >
              <div className="absolute -top-10 -end-10 w-24 h-24 rounded-full bg-fresh/15 blur-2xl group-hover:bg-fresh/40 transition-all duration-700" />
              <div className="relative">
                <div className="font-display text-3xl sm:text-4xl text-mint tabular-nums">{s.v}</div>
                <div className="text-mint/60 text-[11px] sm:text-xs uppercase tracking-wider mt-1">
                  {s.l}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Scroll indicator */}
        <motion.a
          href="#about"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.2, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-mint/70 hover:text-fresh transition-colors duration-500"
        >
          <span className="text-[10px] tracking-[0.4em] uppercase">{t.hero.scroll}</span>
          <span className="relative grid place-items-center w-9 h-9 rounded-full border border-mint/30">
            <ArrowDown className="w-4 h-4 animate-bounce-soft" />
          </span>
        </motion.a>
      </motion.div>
    </section>
  );
};
