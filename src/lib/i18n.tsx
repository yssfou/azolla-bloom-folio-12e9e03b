import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { translations, type Lang, type Translation } from "./translations";

interface I18nCtx {
  lang: Lang;
  t: Translation;
  setLang: (l: Lang) => void;
  toggle: () => void;
}

const g = globalThis as unknown as { __azolaI18nCtx?: React.Context<I18nCtx | null> };
const Ctx = g.__azolaI18nCtx ?? createContext<I18nCtx | null>(null);
g.__azolaI18nCtx = Ctx;

export const I18nProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLang] = useState<Lang>("ar");

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = translations[lang].dir;
  }, [lang]);

  const value: I18nCtx = {
    lang,
    t: translations[lang],
    setLang,
    toggle: () => setLang(lang === "ar" ? "fr" : "ar"),
  };

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
};

export const useI18n = () => {
  const c = useContext(Ctx);
  if (!c) throw new Error("useI18n must be used inside I18nProvider");
  return c;
};
