import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { useI18n } from "@/lib/i18n";
import { SectionHeader } from "./SectionHeader";
import { Sprout, Leaf, Wheat } from "lucide-react";
import compareImg from "@/assets/azolla-vs-crops.jpg";

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

const compareIcons = [Leaf, Sprout, Wheat];

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

  const coveragePct = Math.round(coverage * 100);

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
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 1, delay: i * 0.12, ease }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="relative rounded-3xl glass-dark p-10 overflow-hidden group transition-shadow duration-700 hover:shadow-glow"
            >
              <div className="absolute -bottom-20 -end-20 w-56 h-56 rounded-full bg-fresh/30 blur-3xl group-hover:bg-fresh/60 transition-all duration-700" />
              <div className="relative">
                <div className="font-display text-6xl md:text-7xl text-mint">
                  <Counter to={s.value} suffix={s.suffix} />
                </div>
                <p className="mt-4 text-mint/70 leading-relaxed">{s.label}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Comparison */}
        <div className="mt-24 grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: chart */}
          <div>
            <motion.h3
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 1, ease }}
              className="font-display text-3xl md:text-4xl text-mint mb-4"
            >
              {t.growth.compareTitle}
            </motion.h3>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 1, delay: 0.1, ease }}
              className="text-mint/70 mb-8"
            >
              {t.growth.compareNote}
            </motion.p>
            <div className="space-y-7">
              {t.growth.compare.map((c, i) => {
                const Icon = compareIcons[i];
                return (
                  <motion.div
                    key={c.name}
                    initial={{ opacity: 0, x: -40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.9, delay: i * 0.12, ease }}
                  >
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-mint font-semibold flex items-center gap-2">
                        <Icon className="w-4 h-4 text-fresh" strokeWidth={2.2} />
                        {c.name}
                      </span>
                      <span className="text-mint/80 text-sm font-mono tabular-nums">{c.value}%</span>
                    </div>
                    <div className="relative h-3.5 rounded-full bg-mint/10 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${c.value}%` }}
                        viewport={{ once: true, margin: "-80px" }}
                        transition={{ duration: 1.6, delay: 0.2 + i * 0.12, ease }}
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
                );
              })}
            </div>

            {/* PROMINENT coverage badge */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 1, delay: 0.4, ease }}
              className="mt-10 relative rounded-3xl glass-dark p-6 overflow-hidden group hover:shadow-glow transition-all duration-700"
            >
              <div className="absolute inset-0 opacity-30 pointer-events-none">
                <div className="shimmer-sweep" />
              </div>
              <div className="relative flex items-center gap-5">
                {/* Circular gauge */}
                <div className="relative shrink-0 w-24 h-24">
                  <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                    <circle cx="50" cy="50" r="42" stroke="hsl(var(--mint) / 0.15)" strokeWidth="8" fill="none" />
                    <circle
                      cx="50"
                      cy="50"
                      r="42"
                      stroke="url(#cov-grad)"
                      strokeWidth="8"
                      fill="none"
                      strokeLinecap="round"
                      strokeDasharray={`${2 * Math.PI * 42}`}
                      strokeDashoffset={`${2 * Math.PI * 42 * (1 - coverage)}`}
                      style={{ transition: "stroke-dashoffset 0.4s var(--ease-spring)" }}
                    />
                    <defs>
                      <linearGradient id="cov-grad" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stopColor="hsl(146 56% 78%)" />
                        <stop offset="100%" stopColor="hsl(145 63% 49%)" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <div className="absolute inset-0 grid place-items-center">
                    <span className="font-display text-2xl text-mint tabular-nums">{coveragePct}%</span>
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs uppercase tracking-[0.3em] text-mint/60 mb-2">
                    {t.growth.coverageLabel}
                  </div>
                  <div className="relative h-3 rounded-full bg-mint/10 overflow-hidden">
                    <div
                      className="absolute inset-y-0 start-0 rounded-full bg-gradient-fresh shadow-glow"
                      style={{
                        width: `${coveragePct}%`,
                        transition: "width 0.4s var(--ease-spring)",
                      }}
                    />
                  </div>
                  <p className="mt-2 text-mint/70 text-sm">{t.growth.coverageNote}</p>
                </div>
                <span className="hidden md:inline-flex items-center gap-2 rounded-full bg-fresh/15 border border-fresh/30 px-3 py-1.5 text-xs font-semibold text-fresh animate-ring-pulse">
                  <span className="w-1.5 h-1.5 rounded-full bg-fresh" /> LIVE
                </span>
              </div>
            </motion.div>
          </div>

          {/* Right: real comparison photo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 40 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1.4, ease }}
            className="relative rounded-3xl overflow-hidden shadow-deep border border-mint/10 group"
          >
            <img
              src={compareImg}
              alt="Azolla vs soy vs corn — aerial comparison"
              loading="lazy"
              width={1600}
              height={1024}
              className="hover-zoom-img w-full h-full object-cover aspect-[4/5]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-deep/80 via-deep/20 to-transparent" />
            {/* labels */}
            <div className="absolute inset-x-0 bottom-0 p-6 grid grid-cols-3 gap-3 text-center">
              {t.growth.compare.map((c, i) => (
                <motion.div
                  key={c.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.8, delay: 0.5 + i * 0.1, ease }}
                  className="rounded-xl glass-dark px-3 py-2"
                >
                  <div className="text-mint font-semibold text-sm">{c.name}</div>
                  <div className="text-fresh font-display text-lg tabular-nums">{c.value}%</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
