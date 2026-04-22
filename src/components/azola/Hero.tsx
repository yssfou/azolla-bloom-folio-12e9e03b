import { motion } from "framer-motion";
import { ArrowDown, Sparkles } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { WaterCanvas } from "./WaterCanvas";

export const Hero = () => {
  const { t, lang } = useI18n();
  const ease = [0.16, 1, 0.3, 1] as const;

  return (
    <section
      id="top"
      className="relative min-h-screen w-full overflow-hidden bg-gradient-hero noise-overlay"
    >
      {/* Animated water + leaves */}
      <div className="absolute inset-0 opacity-90">
        <WaterCanvas />
      </div>

      {/* Parallax soft mesh */}
      <motion.div
        aria-hidden
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.6 }}
        className="absolute inset-0 bg-gradient-mesh pointer-events-none"
      />

      {/* Glow orbs */}
      <div className="absolute -top-40 -start-40 w-[420px] h-[420px] rounded-full bg-fresh/20 blur-[120px]" />
      <div className="absolute -bottom-40 -end-40 w-[520px] h-[520px] rounded-full bg-water/20 blur-[140px]" />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-6 md:px-10 pt-40 md:pt-48 pb-32 min-h-screen flex flex-col justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease }}
          className="inline-flex items-center gap-2 self-start glass-dark rounded-full px-4 py-2 mb-8"
        >
          <Sparkles className="w-4 h-4 text-fresh" />
          <span className="text-xs md:text-sm text-mint/90 tracking-wide">{t.hero.eyebrow}</span>
        </motion.div>

        <h1 className="font-display text-mint text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-balance max-w-5xl">
          {t.hero.headline.map((word, i) => (
            <motion.span
              key={`${lang}-${i}`}
              initial={{ opacity: 0, y: 60, filter: "blur(12px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 1.2, delay: 0.4 + i * 0.18, ease }}
              className="inline-block me-3"
            >
              {i === 1 ? <span className="gradient-text">{word}</span> : word}
            </motion.span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.1, ease }}
          className="mt-8 max-w-2xl text-lg md:text-xl text-mint/75 leading-relaxed"
        >
          {t.hero.subtitle}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.3, ease }}
          className="mt-10 flex flex-wrap gap-4"
        >
          <a
            href="#about"
            className="group relative inline-flex items-center gap-2 px-7 py-4 rounded-full glass-dark text-mint font-semibold border border-mint/30 hover:border-fresh hover:shadow-glow transition-all duration-500 ease-spring"
          >
            <span className="relative z-10">{t.hero.cta1}</span>
          </a>
          <a
            href="#contact"
            className="group relative inline-flex items-center gap-2 px-7 py-4 rounded-full bg-gradient-fresh text-deep font-bold overflow-hidden shadow-glow"
          >
            <span className="absolute inset-0 bg-mint scale-x-0 group-hover:scale-x-100 origin-start transition-transform duration-700 ease-spring" />
            <span className="relative z-10">{t.hero.cta2}</span>
          </a>
        </motion.div>

        {/* Scroll indicator */}
        <motion.a
          href="#about"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8, duration: 1 }}
          className="absolute bottom-10 start-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-mint/70"
        >
          <span className="text-xs tracking-[0.3em] uppercase">{t.hero.scroll}</span>
          <ArrowDown className="w-4 h-4 animate-bounce-soft" />
        </motion.a>
      </div>
    </section>
  );
};
