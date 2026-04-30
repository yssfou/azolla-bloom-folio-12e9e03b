import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { translations, type Lang, type Translation } from "./translations";

interface I18nCtx {
  lang: Lang;
  t: Translation;
  setLang: (l: Lang) => void;
  toggle: () => void;
  isTransitioning: boolean;
}

const g = globalThis as unknown as { __azolaI18nCtx?: React.Context<I18nCtx | null> };
const Ctx = g.__azolaI18nCtx ?? createContext<I18nCtx | null>(null);
g.__azolaI18nCtx = Ctx;

const TRANSITION_MS = 450;

export const I18nProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLangState] = useState<Lang>("ar");
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = translations[lang].dir;
  }, [lang]);

  const setLang = (l: Lang) => {
    if (l === lang) return;
    setIsTransitioning(true);
    // Wait for fade-out, then swap language, then fade back in
    window.setTimeout(() => {
      setLangState(l);
      window.setTimeout(() => setIsTransitioning(false), 30);
    }, TRANSITION_MS / 2);
  };

  const value: I18nCtx = {
    lang,
    t: translations[lang],
    setLang,
    toggle: () => setLang(lang === "ar" ? "fr" : "ar"),
    isTransitioning,
  };

  return (
    <Ctx.Provider value={value}>
      <div
        style={{
          opacity: isTransitioning ? 0 : 1,
          filter: isTransitioning ? "blur(6px)" : "blur(0px)",
          transition: `opacity ${TRANSITION_MS / 2}ms ease, filter ${TRANSITION_MS / 2}ms ease`,
        }}
      >
        {children}
      </div>
    </Ctx.Provider>
  );
};

export const useI18n = () => {
  const c = useContext(Ctx);
  if (!c) throw new Error("useI18n must be used inside I18nProvider");
  return c;
};
