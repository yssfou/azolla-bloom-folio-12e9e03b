import { motion } from "framer-motion";
import { useI18n } from "@/lib/i18n";
import { SectionHeader } from "./SectionHeader";
import { Wind, TrendingUp, Beaker } from "lucide-react";
import nitrogenCycleImg from "@/assets/azolla-nitrogen-cycle.jpg";

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
          className="mt-20 relative rounded-3xl overflow-hidden shadow-deep"
        >
          <img
            src={nitrogenCycleImg}
            alt="Azolla nitrogen cycle illustration"
            loading="lazy"
            width={1920}
            height={1080}
            className="w-full h-auto object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-deep/40 via-transparent to-transparent pointer-events-none" />
        </motion.div>
      </div>
    </section>
  );
};
