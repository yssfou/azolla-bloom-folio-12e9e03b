import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { SectionHeader } from "./SectionHeader";

const ease = [0.16, 1, 0.3, 1] as const;
const grads = ["from-fresh to-mint", "from-mint to-water", "from-deep to-fresh"];

const initials = (name: string) =>
  name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("");

export const Testimonials = () => {
  const { t } = useI18n();
  return (
    <section id="testimonials" className="section bg-water/40 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-mesh opacity-30 pointer-events-none" />
      <div className="relative mx-auto max-w-7xl">
        <SectionHeader tag={t.testimonials.tag} title={t.testimonials.title} />

        <div className="mt-16 grid md:grid-cols-3 gap-6 md:gap-8">
          {t.testimonials.items.map((it, i) => (
            <motion.figure
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.9, delay: i * 0.1, ease }}
              className="relative rounded-3xl p-8 bg-card border border-border shadow-card hover:shadow-deep transition-all duration-700 group"
            >
              <Quote className="absolute top-6 end-6 w-12 h-12 text-fresh/15 group-hover:text-fresh/30 transition-colors" />
              <blockquote className="relative text-lg text-deep leading-relaxed">
                "{it.quote}"
              </blockquote>
              <figcaption className="mt-8 flex items-center gap-4">
                <span
                  className={`grid place-items-center w-12 h-12 rounded-full bg-gradient-to-br ${grads[i % 3]} text-deep font-bold shadow-glow`}
                >
                  {initials(it.name)}
                </span>
                <div>
                  <div className="font-semibold text-deep">{it.name}</div>
                  <div className="text-sm text-muted-foreground">{it.role}</div>
                </div>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
};
