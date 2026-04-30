import { motion } from "framer-motion";

interface Props {
  tag?: string;
  title: string;
  subtitle?: string;
  align?: "start" | "center";
  invert?: boolean;
}

const ease = [0.16, 1, 0.3, 1] as const;

export const SectionHeader = ({ tag, title, subtitle, align = "start", invert = false }: Props) => {
  const alignClass = align === "center" ? "items-center text-center" : "items-start text-start";
  return (
    <div className={`flex flex-col gap-5 max-w-3xl ${alignClass}`}>
      {tag && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease }}
          className={`inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs font-semibold tracking-wider uppercase ${
            invert ? "glass-dark text-mint" : "bg-fresh/10 text-deep border border-fresh/20"
          }`}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-fresh" /> {tag}
        </motion.div>
      )}
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 1, delay: 0.05, ease }}
        className={`no-gsap font-display text-4xl md:text-5xl lg:text-6xl text-balance ${
          invert ? "text-mint" : "text-deep"
        }`}
      >
        {title}
      </motion.h2>
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1, delay: 0.15, ease }}
          className={`text-lg md:text-xl leading-relaxed max-w-2xl ${
            invert ? "text-mint/80" : "text-muted-foreground"
          }`}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
};
