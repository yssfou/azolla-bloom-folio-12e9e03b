import { motion } from "framer-motion";
import { useI18n } from "@/lib/i18n";
import { SectionHeader } from "./SectionHeader";
import { Coins, Clock, TrendingUp } from "lucide-react";

const ease = [0.16, 1, 0.3, 1] as const;
const icons = [Coins, Clock, TrendingUp];

export const Business = () => {
  const { t } = useI18n();

  return (
    <section id="business" className="section bg-surface overflow-hidden">
      <div className="absolute -bottom-40 -end-40 w-[500px] h-[500px] rounded-full bg-water/40 blur-[140px] pointer-events-none" />

      <div className="relative mx-auto max-w-7xl">
        <SectionHeader tag={t.business.tag} title={t.business.title} subtitle={t.business.sub} />

        <div className="mt-16 grid md:grid-cols-3 gap-6">
          {t.business.points.map((p, i) => {
            const Icon = icons[i];
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.9, delay: i * 0.1, ease }}
                className="relative group rounded-3xl p-10 bg-gradient-emerald text-mint overflow-hidden hover:shadow-deep transition-all duration-700"
              >
                <div className="absolute -top-20 -end-20 w-56 h-56 rounded-full bg-fresh/30 blur-3xl group-hover:bg-fresh/60 transition-all duration-700" />
                <div className="relative">
                  <Icon className="w-10 h-10 text-fresh mb-6" strokeWidth={1.8} />
                  <h3 className="font-display text-3xl text-mint mb-3">{p.t}</h3>
                  <p className="text-mint/70 leading-relaxed">{p.d}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
