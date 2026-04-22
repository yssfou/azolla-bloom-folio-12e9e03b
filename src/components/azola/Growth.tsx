import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { useI18n } from "@/lib/i18n";
import { SectionHeader } from "./SectionHeader";

const ease = [0.16, 1, 0.3, 1] as const;

const Counter = ({ to, suffix }: { to: number; suffix: string }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let start: number | null = null;
    const dur = 1800;
    const step = (ts: number) => {
      if (start === null) start = ts;
      const p = Math.min(1, (ts - start) / dur);
      const eased = 1 - Math.pow(1 - p, 4);
      setVal(Math.round(eased * to));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [inView, to]);
  return (
    <span ref={ref}>
      {val}
      {suffix}
    </span>
  );
};

export const Growth = () => {
  const { t } = useI18n();
  const sectionRef = useRef<HTMLElement>(null);
  const [coverage, setCoverage] = useState(0);

  // Scroll-driven Azolla spread coverage
  useEffect(() => {
    const onScroll = () => {
      const el = sectionRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const total = rect.height + vh;
      const progress = Math.max(0, Math.min(1, (vh - rect.top) / total));
      setCoverage(progress);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section
      ref={sectionRef}
      id="growth"
      className="section bg-gradient-emerald text-mint overflow-hidden noise-overlay"
    >
      <div className="absolute inset-0 bg-gradient-mesh opacity-60 pointer-events-none" />

      <div className="relative mx-auto max-w-7xl">
        <SectionHeader tag={t.growth.tag} title={t.growth.title} subtitle={t.growth.sub} invert />

        {/* Stats */}
        <div className="mt-16 grid md:grid-cols-3 gap-6">
          {t.growth.stats.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.9, delay: i * 0.12, ease }}
              className="relative rounded-3xl glass-dark p-10 overflow-hidden group"
            >
              <div className="absolute -bottom-20 -end-20 w-56 h-56 rounded-full bg-fresh/30 blur-3xl group-hover:bg-fresh/50 transition-all duration-700" />
              <div className="relative">
                <div className="font-display text-6xl md:text-7xl text-mint">
                  <Counter to={s.value} suffix={s.suffix} />
                </div>
                <p className="mt-4 text-mint/70 leading-relaxed">{s.label}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Comparison chart */}
        <div className="mt-20 grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <h3 className="font-display text-3xl md:text-4xl text-mint mb-4">{t.growth.compareTitle}</h3>
            <p className="text-mint/70 mb-8">{t.growth.compareNote}</p>
            <div className="space-y-6">
              {t.growth.compare.map((c, i) => (
                <motion.div
                  key={c.name}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.8, delay: i * 0.1, ease }}
                >
                  <div className="flex justify-between mb-2">
                    <span className="text-mint font-semibold">{c.name}</span>
                    <span className="text-mint/70 text-sm">{c.value}%</span>
                  </div>
                  <div className="relative h-3 rounded-full bg-mint/10 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${c.value}%` }}
                      viewport={{ once: true, margin: "-80px" }}
                      transition={{ duration: 1.6, delay: 0.2 + i * 0.1, ease }}
                      className={`absolute inset-y-0 start-0 rounded-full ${
                        c.color === "fresh"
                          ? "bg-gradient-fresh shadow-glow"
                          : c.color === "mint"
                          ? "bg-mint/70"
                          : "bg-water/60"
                      }`}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Azolla water basin spread */}
          <div className="relative">
            <div className="relative aspect-square max-w-md mx-auto rounded-full overflow-hidden bg-gradient-water animate-water shadow-deep border-8 border-deep/40">
              {/* concentric water rings */}
              <div className="absolute inset-4 rounded-full border border-deep/20" />
              <div className="absolute inset-12 rounded-full border border-deep/15" />
              {/* azolla coverage */}
              <div
                className="absolute inset-0 transition-all duration-300 ease-spring"
                style={{
                  clipPath: `circle(${coverage * 70}% at 50% 50%)`,
                  background:
                    "radial-gradient(circle at 30% 30%, hsl(146 56% 78%) 0%, hsl(145 63% 49%) 45%, hsl(153 70% 22%) 100%)",
                }}
              />
              {/* leaf dots */}
              {Array.from({ length: 24 }).map((_, i) => {
                const angle = (i / 24) * Math.PI * 2;
                const r = 18 + (i % 4) * 8;
                const cx = 50 + Math.cos(angle) * r;
                const cy = 50 + Math.sin(angle) * r;
                return (
                  <span
                    key={i}
                    className="absolute w-2.5 h-2.5 rounded-full bg-mint/80 animate-float-leaf"
                    style={{
                      left: `${cx}%`,
                      top: `${cy}%`,
                      opacity: coverage > 0.2 ? 0.9 : 0,
                      transition: "opacity 0.6s",
                      animationDelay: `${i * 0.15}s`,
                    }}
                  />
                );
              })}
            </div>
            <p className="mt-6 text-center text-mint/60 text-sm tracking-wide uppercase">
              {Math.round(coverage * 100)}% coverage
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
