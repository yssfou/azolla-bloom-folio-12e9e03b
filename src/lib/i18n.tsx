import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { translations, type Lang, type Translation } from "./translations";

interface I18nCtx {
  lang: Lang;
  t: Translation;
  setLang: (l: Lang) => void;
  toggle: () => void;
}

const Ctx = createContext<I18nCtx | null>(null);

export const I18nProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLang] = useState<Lang>("ar");
  const [transitioning, setTransitioning] = useState(false);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = translations[lang].dir;
  }, [lang]);

  const changeLang = (l: Lang) => {
    if (l === lang) return;
    setTransitioning(true);
    // Swap language at the peak of the overlay so content morph is hidden
    window.setTimeout(() => setLang(l), 280);
    window.setTimeout(() => setTransitioning(false), 900);
  };

  const value: I18nCtx = {
    lang,
    t: translations[lang],
    setLang: changeLang,
    toggle: () => changeLang(lang === "ar" ? "fr" : "ar"),
  };

  return (
    <Ctx.Provider value={value}>
      <AnimatePresence>
        {transitioning && (
          <motion.div
            key="lang-transition"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[200] pointer-events-none backdrop-blur-xl bg-deep/40"
            aria-hidden
          >
            <motion.div
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0 grid place-items-center"
            >
              <span className="font-display text-5xl md:text-7xl gradient-text tracking-tight">
                {lang === "ar" ? "FR" : "AR"}
              </span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        key={lang}
        initial={{ opacity: 0, filter: "blur(12px)" }}
        animate={{ opacity: 1, filter: "blur(0px)" }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        {children}
      </motion.div>
    </Ctx.Provider>
  );
};

export const useI18n = () => {
  const c = useContext(Ctx);
  if (!c) throw new Error("useI18n must be used inside I18nProvider");
  return c;
};
