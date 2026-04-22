import { useRef } from "react";
import { motion } from "framer-motion";
import { Beef, Wallet, Sprout, Leaf } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { SectionHeader } from "./SectionHeader";

const ease = [0.16, 1, 0.3, 1] as const;
const iconMap = { Beef, Wallet, Sprout, Leaf };

const TiltCard = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => {
  const ref = useRef<HTMLDivElement>(null);

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `perspective(900px) rotateX(${-y * 8}deg) rotateY(${x * 10}deg) translateY(-4px)`;
  };
  const onLeave = () => {
    if (ref.current) ref.current.style.transform = "perspective(900px) rotateX(0) rotateY(0) translateY(0)";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.9, delay, ease }}
      className="will-change-transform"
    >
      <div
        ref={ref}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        style={{ transition: "transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)" }}
        className="h-full"
      >
        {children}
      </div>
    </motion.div>
  );
};

export const Benefits = () => {
  const { t } = useI18n();

  return (
    <section id="benefits" className="section bg-surface overflow-hidden">
      <div className="absolute -top-40 start-1/4 w-[500px] h-[500px] rounded-full bg-fresh/10 blur-[140px] pointer-events-none" />

      <div className="relative mx-auto max-w-7xl">
        <SectionHeader tag={t.benefits.tag} title={t.benefits.title} />

        <div className="mt-16 grid sm:grid-cols-2 gap-6">
          {t.benefits.items.map((item, i) => {
            const Icon = iconMap[item.icon as keyof typeof iconMap];
            return (
              <TiltCard key={i} delay={i * 0.08}>
                <div className="relative group rounded-3xl p-8 md:p-10 h-full bg-card border border-border shadow-card hover:shadow-deep transition-shadow duration-700 overflow-hidden">
                  <div className="absolute -top-20 -end-20 w-56 h-56 rounded-full bg-fresh/10 blur-3xl group-hover:bg-fresh/30 transition-all duration-700" />
                  <div className="relative flex items-start gap-6">
                    <div className="shrink-0 grid place-items-center w-16 h-16 rounded-2xl bg-gradient-fresh text-deep shadow-glow">
                      <Icon className="w-7 h-7" strokeWidth={2.2} />
                    </div>
                    <div>
                      <h3 className="font-display text-2xl md:text-3xl text-deep mb-3">{item.t}</h3>
                      <p className="text-muted-foreground leading-relaxed">{item.d}</p>
                    </div>
                  </div>
                </div>
              </TiltCard>
            );
          })}
        </div>
      </div>
    </section>
  );
};
