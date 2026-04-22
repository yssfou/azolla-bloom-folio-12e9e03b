import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Leaf } from "lucide-react";
import { useI18n } from "@/lib/i18n";

const sections = ["about", "growth", "benefits", "howto", "business", "gallery", "contact"] as const;

export const Navbar = () => {
  const { lang, setLang, t } = useI18n();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navItems = sections.map((s) => ({ id: s, label: t.nav[s] }));

  return (
    <>
      <motion.header
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ease-spring ${
          scrolled ? "py-3" : "py-5"
        }`}
      >
        <div
          className={`mx-auto max-w-7xl px-5 md:px-8 flex items-center justify-between rounded-full transition-all duration-500 ${
            scrolled
              ? "glass-dark shadow-deep"
              : "bg-transparent"
          }`}
          style={{ paddingTop: scrolled ? 10 : 14, paddingBottom: scrolled ? 10 : 14 }}
        >
          {/* Logo */}
          <a href="#top" className="flex items-center gap-2 group">
            <span className="grid place-items-center w-9 h-9 rounded-full bg-gradient-fresh shadow-glow">
              <Leaf className="w-5 h-5 text-deep" strokeWidth={2.5} />
            </span>
            <span
              className={`font-display text-2xl tracking-tight ${
                scrolled ? "text-mint" : "text-mint"
              }`}
              style={{ letterSpacing: lang === "ar" ? 0 : "-0.02em" }}
            >
              AZOLA
            </span>
          </a>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className="relative px-4 py-2 text-sm text-mint/80 hover:text-mint transition-colors duration-300 group"
              >
                {item.label}
                <span className="absolute bottom-0 start-4 end-4 h-px bg-gradient-fresh scale-x-0 group-hover:scale-x-100 origin-start transition-transform duration-500 ease-spring" />
              </a>
            ))}
          </nav>

          {/* Lang toggle + mobile */}
          <div className="flex items-center gap-3">
            <div className="relative flex items-center rounded-full p-1 bg-deep/40 border border-mint/20">
              {(["ar", "fr"] as const).map((l) => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  className={`relative z-10 px-3 py-1 text-xs font-semibold rounded-full transition-colors duration-300 ${
                    lang === l ? "text-deep" : "text-mint/70 hover:text-mint"
                  }`}
                >
                  {l.toUpperCase()}
                </button>
              ))}
              <motion.span
                layout
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="absolute top-1 bottom-1 w-[calc(50%-4px)] rounded-full bg-gradient-fresh shadow-glow"
                style={{ left: lang === "ar" ? 4 : "calc(50% + 0px)" }}
              />
            </div>

            <button
              className="lg:hidden grid place-items-center w-10 h-10 rounded-full glass-dark text-mint"
              onClick={() => setOpen(true)}
              aria-label="Menu"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-[60] bg-deep/95 backdrop-blur-2xl lg:hidden"
          >
            <div className="flex justify-end p-5">
              <button
                onClick={() => setOpen(false)}
                className="grid place-items-center w-12 h-12 rounded-full glass-dark text-mint"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <nav className="flex flex-col items-center justify-center h-[80vh] gap-6">
              {navItems.map((item, i) => (
                <motion.a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.07, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                  className="font-display text-3xl text-mint hover:text-fresh transition-colors"
                >
                  {item.label}
                </motion.a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
