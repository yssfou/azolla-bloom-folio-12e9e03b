import { motion } from "framer-motion";
import { useI18n } from "@/lib/i18n";
import { SectionHeader } from "./SectionHeader";
import { Wind, TrendingUp, Beaker } from "lucide-react";

const ease = [0.16, 1, 0.3, 1] as const;
const icons = [Wind, TrendingUp, Beaker];

export const About = () => {
  const { t } = useI18n();

  return (
    <section id="about" className="section bg-surface overflow-hidden">
      <div className="absolute inset-0 bg-gradient-mesh opacity-60 pointer-events-none" />
      <div className="relative mx-auto max-w-7xl">
        <SectionHeader tag={t.about.tag} title={t.about.title} subtitle={t.about.body} />

        <div className="mt-16 grid md:grid-cols-3 gap-6">
          {t.about.pillars.map((p, i) => {
            const Icon = icons[i];
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.9, delay: i * 0.1, ease }}
                className="relative group rounded-3xl p-8 bg-card border border-border shadow-card hover:shadow-deep transition-all duration-700 ease-spring overflow-hidden"
              >
                <div className="absolute -top-20 -end-20 w-48 h-48 rounded-full bg-fresh/10 blur-2xl group-hover:bg-fresh/25 transition-all duration-700" />
                <div className="relative">
                  <div className="grid place-items-center w-14 h-14 rounded-2xl bg-gradient-fresh text-deep mb-6 shadow-glow">
                    <Icon className="w-6 h-6" strokeWidth={2.2} />
                  </div>
                  <h3 className="font-display text-2xl text-deep mb-3">{p.t}</h3>
                  <p className="text-muted-foreground leading-relaxed">{p.d}</p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Nitrogen cycle infographic */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1.2, ease }}
          className="mt-20 relative rounded-3xl p-10 md:p-16 bg-gradient-emerald overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-mesh opacity-40" />
          <svg viewBox="0 0 600 240" className="relative w-full max-w-4xl mx-auto">
            <defs>
              <linearGradient id="cycleGrad" x1="0" x2="1">
                <stop offset="0" stopColor="hsl(146 56% 78%)" />
                <stop offset="1" stopColor="hsl(145 63% 49%)" />
              </linearGradient>
            </defs>
            {/* sky */}
            <text x="80" y="40" fill="hsl(146 56% 78%)" fontSize="14" fontFamily="DM Sans">N₂</text>
            {/* arrow down */}
            <motion.path
              d="M100 50 Q 130 110, 170 130"
              fill="none"
              stroke="url(#cycleGrad)"
              strokeWidth="2"
              strokeDasharray="4 4"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.6, ease }}
            />
            {/* azolla blob */}
            <ellipse cx="220" cy="150" rx="80" ry="22" fill="hsl(187 76% 93% / 0.2)" />
            <ellipse cx="220" cy="148" rx="70" ry="14" fill="url(#cycleGrad)" />
            <text x="190" y="190" fill="hsl(146 56% 78%)" fontSize="12">Azolla</text>
            {/* arrow to soil */}
            <motion.path
              d="M310 150 Q 380 170, 460 165"
              fill="none"
              stroke="url(#cycleGrad)"
              strokeWidth="2"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.6, delay: 0.3, ease }}
            />
            {/* soil */}
            <rect x="430" y="150" width="120" height="40" rx="8" fill="hsl(146 56% 78% / 0.18)" />
            <text x="455" y="175" fill="hsl(146 56% 78%)" fontSize="12">N-rich soil</text>
          </svg>
        </motion.div>
      </div>
    </section>
  );
};
