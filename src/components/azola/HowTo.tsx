import { motion } from "framer-motion";
import { useI18n } from "@/lib/i18n";
import { SectionHeader } from "./SectionHeader";
import { Waves, Ruler, FlaskConical, Eye, Scissors } from "lucide-react";

const ease = [0.16, 1, 0.3, 1] as const;
const icons = [Waves, Ruler, FlaskConical, Eye, Scissors];

export const HowTo = () => {
  const { t } = useI18n();

  return (
    <section id="howto" className="section bg-water/40 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-mesh opacity-40 pointer-events-none" />

      <div className="relative mx-auto max-w-7xl">
        <SectionHeader tag={t.howto.tag} title={t.howto.title} />

        <div className="mt-20 relative">
          {/* connecting line (desktop) */}
          <div className="hidden lg:block absolute top-10 start-0 end-0 h-px bg-gradient-to-r from-transparent via-fresh/40 to-transparent" />

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            {t.howto.steps.map((s, i) => {
              const Icon = icons[i];
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.9, delay: i * 0.1, ease }}
                  className="relative flex flex-col items-center text-center group"
                >
                  <div className="relative grid place-items-center w-20 h-20 rounded-full bg-card border border-border shadow-card group-hover:shadow-glow group-hover:border-fresh transition-all duration-700 ease-spring">
                    <Icon className="w-8 h-8 text-deep" strokeWidth={2} />
                    <span className="absolute -top-2 -end-2 w-7 h-7 rounded-full bg-gradient-fresh text-deep text-xs font-bold grid place-items-center shadow-glow">
                      {i + 1}
                    </span>
                  </div>
                  <h3 className="mt-6 font-display text-xl text-deep">{s.t}</h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed max-w-[200px]">
                    {s.d}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
