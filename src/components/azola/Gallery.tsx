import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useI18n } from "@/lib/i18n";
import { SectionHeader } from "./SectionHeader";
import g1 from "@/assets/gallery-1.jpg";
import g2 from "@/assets/gallery-2.jpg";
import g3 from "@/assets/gallery-3.jpg";
import g4 from "@/assets/gallery-4.jpg";
import g5 from "@/assets/gallery-5.jpg";
import g6 from "@/assets/gallery-6.jpg";

const ease = [0.16, 1, 0.3, 1] as const;

const tiles = [
  { src: g1, h: "h-72" },
  { src: g2, h: "h-96" },
  { src: g3, h: "h-64" },
  { src: g4, h: "h-80" },
  { src: g5, h: "h-72" },
  { src: g6, h: "h-96" },
];

export const Gallery = () => {
  const { t } = useI18n();
  const sectionRef = useRef<HTMLElement>(null);

  // Subtle GSAP-style parallax on each figure based on scroll
  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const figs = sectionRef.current?.querySelectorAll<HTMLElement>("[data-parallax]");
        if (!figs) return;
        figs.forEach((el, i) => {
          const r = el.getBoundingClientRect();
          const center = r.top + r.height / 2 - window.innerHeight / 2;
          const factor = (i % 2 === 0 ? -1 : 1) * 0.04;
          el.style.transform = `translate3d(0, ${center * factor}px, 0)`;
        });
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section ref={sectionRef} id="gallery" className="section bg-surface overflow-hidden">
      <div className="absolute -top-40 -end-40 w-[500px] h-[500px] rounded-full bg-fresh/10 blur-[140px] pointer-events-none" />
      <div className="relative mx-auto max-w-7xl">
        <SectionHeader tag={t.gallery.tag} title={t.gallery.title} />

        <div className="mt-16 columns-1 sm:columns-2 lg:columns-3 gap-6 [column-fill:_balance]">
          {tiles.map((tile, i) => (
            <motion.figure
              key={i}
              initial={{ opacity: 0, y: 40, scale: 0.96 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 1.1, delay: (i % 3) * 0.1, ease }}
              className="relative mb-6 break-inside-avoid rounded-3xl overflow-hidden group cursor-pointer shadow-card hover:shadow-deep transition-all duration-700 ease-spring hover:-translate-y-2"
            >
              <div data-parallax className={`relative ${tile.h} overflow-hidden bg-deep/10`}>
                <img
                  src={tile.src}
                  alt={`Azolla farm Tunisia — ${i + 1}`}
                  loading="lazy"
                  width={1024}
                  height={1024}
                  className="hover-zoom-img w-full h-full object-cover"
                />
                {/* Tinted overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-deep/60 via-deep/10 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-700" />
                {/* Top accent line that draws on hover */}
                <span className="absolute top-0 start-0 h-[3px] w-0 bg-gradient-fresh group-hover:w-full transition-all duration-1000 ease-spring" />
              </div>
              <figcaption className="absolute inset-x-0 bottom-0 p-5 translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-spring bg-gradient-to-t from-deep/95 via-deep/70 to-transparent">
                <span className="text-mint font-semibold flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-fresh animate-pulse-glow" />
                  {t.gallery.caption}
                </span>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
};
