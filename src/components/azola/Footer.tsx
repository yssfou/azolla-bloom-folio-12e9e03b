import { Leaf } from "lucide-react";
import { useI18n } from "@/lib/i18n";

export const Footer = () => {
  const { t } = useI18n();
  return (
    <footer className="bg-deep text-mint/70 border-t border-mint/10">
      <div className="mx-auto max-w-7xl px-6 md:px-10 py-10 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="grid place-items-center w-8 h-8 rounded-full bg-gradient-fresh">
            <Leaf className="w-4 h-4 text-deep" strokeWidth={2.5} />
          </span>
          <span className="font-display text-lg text-mint">AZOLA</span>
        </div>
        <p className="text-sm">{t.footer.tagline}</p>
        <p className="text-xs">© {new Date().getFullYear()} AZOLA. {t.footer.rights}.</p>
      </div>
    </footer>
  );
};
