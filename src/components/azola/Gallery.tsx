import { motion } from "framer-motion";
import { useI18n } from "@/lib/i18n";
import { SectionHeader } from "./SectionHeader";

const ease = [0.16, 1, 0.3, 1] as const;

const tiles = [
  { h: "h-72", grad: "from-fresh via-mint to-water" },
  { h: "h-96", grad: "from-deep via-fresh to-mint" },
  { h: "h-64", grad: "from-water via-mint to-fresh" },
  { h: "h-80", grad: "from-mint via-fresh to-deep" },
  { h: "h-72", grad: "from-fresh to-deep" },
  { h: "h-96", grad: "from-water to-fresh" },
];

export const Gallery = () => {
  const { t } = useI18n();
  return (
    <section id="gallery" className="section bg-surface overflow-hidden">
      <div className="relative mx-auto max-w-7xl">
        <SectionHeader tag={t.gallery.tag} title={t.gallery.title} />

        <div className="mt-16 columns-1 sm:columns-2 lg:columns-3 gap-6 [column-fill:_balance]">
          {tiles.map((tile, i) => (
            <motion.figure
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.9, delay: (i % 3) * 0.08, ease }}
              className="relative mb-6 break-inside-avoid rounded-3xl overflow-hidden group cursor-pointer shadow-card hover:shadow-deep transition-shadow duration-700"
            >
              <div
                className={`relative ${tile.h} bg-gradient-to-br ${tile.grad} animate-water transition-transform duration-[1200ms] ease-spring group-hover:scale-110`}
              >
                {/* leaf hints */}
                <div className="absolute inset-0 opacity-40">
                  {Array.from({ length: 8 }).map((_, k) => (
                    <span
                      key={k}
                      className="absolute rounded-full bg-mint/60 blur-sm animate-float-leaf"
                      style={{
                        width: `${30 + Math.random() * 50}px`,
                        height: `${20 + Math.random() * 30}px`,
                        left: `${Math.random() * 80}%`,
                        top: `${Math.random() * 80}%`,
                        animationDelay: `${k * 0.4}s`,
                      }}
                    />
                  ))}
                </div>
              </div>
              <figcaption className="absolute inset-x-0 bottom-0 p-5 translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-spring bg-gradient-to-t from-deep/95 via-deep/70 to-transparent">
                <span className="text-mint font-semibold">{t.gallery.caption}</span>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
};
