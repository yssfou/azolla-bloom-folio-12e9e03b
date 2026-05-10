import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, MessageCircle, Send, Check } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { SectionHeader } from "./SectionHeader";

const ease = [0.16, 1, 0.3, 1] as const;

export const Contact = () => {
  const { t } = useI18n();
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const name = (e.currentTarget.elements.namedItem("name") as HTMLInputElement)?.value || "";
    const email = (e.currentTarget.elements.namedItem("email") as HTMLInputElement)?.value || "";
    const phone = (e.currentTarget.elements.namedItem("phone") as HTMLInputElement)?.value || "";
    const message = (e.currentTarget.elements.namedItem("message") as HTMLTextAreaElement)?.value || "";

    if (!name.trim() || !email.trim() || !phone.trim() || !message.trim()) return;

    const text = `🌿 New Contact from Azola Website!%0A%0A👤 Name: ${name}%0A📧 Email: ${email}%0A📞 Phone: ${phone}%0A💬 Message: ${message}`;

    window.open(`https://wa.me/21622476723?text=${text}`, "_blank");

    setSent(true);
    e.currentTarget.reset();
    setTimeout(() => setSent(false), 3500);
  };

  return (
    <section id="contact" className="section bg-gradient-emerald text-mint overflow-hidden noise-overlay">
      <div className="absolute inset-0 bg-gradient-mesh opacity-50 pointer-events-none" />
      <div className="absolute -top-40 -end-40 w-[500px] h-[500px] rounded-full bg-fresh/30 blur-[140px] pointer-events-none" />

      <div className="relative mx-auto max-w-7xl">
        <SectionHeader tag={t.contact.tag} title={t.contact.title} subtitle={t.contact.sub} invert />

        <div className="mt-16 grid lg:grid-cols-2 gap-10 items-start">
          {/* Form */}
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1, ease }}
            className="relative rounded-3xl p-8 md:p-10 glass-dark"
          >
            <div className="space-y-5">
              <div>
                <label className="block text-sm text-mint/70 mb-2">{t.contact.name}</label>
                <input
                  name="name"
                  required
                  type="text"
                  maxLength={100}
                  className="w-full bg-deep/40 border border-mint/20 rounded-2xl px-4 py-3.5 text-mint placeholder:text-mint/40 focus:outline-none focus:border-fresh focus:shadow-glow transition-all"
                />
              </div>
              <div>
                <label className="block text-sm text-mint/70 mb-2">Email</label>
                <input
                  name="email"
                  required
                  type="email"
                  maxLength={100}
                  className="w-full bg-deep/40 border border-mint/20 rounded-2xl px-4 py-3.5 text-mint placeholder:text-mint/40 focus:outline-none focus:border-fresh focus:shadow-glow transition-all"
                />
              </div>
              <div>
                <label className="block text-sm text-mint/70 mb-2">{t.contact.message}</label>
                <textarea
                  name="message"
                  required
                  rows={4}
                  maxLength={1000}
                  className="w-full bg-deep/40 border border-mint/20 rounded-2xl px-4 py-3.5 text-mint placeholder:text-mint/40 focus:outline-none focus:border-fresh focus:shadow-glow transition-all resize-none"
                />
              </div>
              <button
                type="submit"
                className="group relative w-full inline-flex items-center justify-center gap-2 px-7 py-4 rounded-2xl bg-gradient-fresh text-deep font-bold overflow-hidden shadow-glow"
              >
                <span className="absolute inset-0 bg-mint scale-x-0 group-hover:scale-x-100 origin-start transition-transform duration-700 ease-spring" />
                <span className="relative z-10 flex items-center gap-2">
                  {t.contact.send} <Send className="w-4 h-4" />
                </span>
              </button>
            </div>

            <AnimatePresence>
              {sent && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 grid place-items-center rounded-3xl bg-deep/95 backdrop-blur-xl"
                >
                  <div className="flex flex-col items-center gap-4">
                    <span className="grid place-items-center w-20 h-20 rounded-full bg-gradient-fresh shadow-glow">
                      <svg viewBox="0 0 24 24" className="w-10 h-10 text-deep">
                        <path
                          d="M5 12.5l5 5 9-11"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="3"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="animate-draw"
                        />
                      </svg>
                    </span>
                    <p className="text-mint text-lg font-semibold">{t.contact.success}</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.form>

          {/* Side */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1, delay: 0.1, ease }}
            className="space-y-5"
          >
            <a
              href="https://wa.me/21622476723"
              target="_blank"
              rel="noreferrer"
              className="group flex items-center gap-4 rounded-3xl p-6 bg-gradient-fresh text-deep shadow-glow hover:scale-[1.02] transition-transform duration-500 ease-spring"
            >
              <span className="grid place-items-center w-14 h-14 rounded-2xl bg-deep text-fresh">
                <MessageCircle className="w-7 h-7" />
              </span>
              <span className="font-display text-xl">{t.contact.whatsapp}</span>
            </a>
            <div className="flex items-center gap-4 rounded-3xl p-6 glass-dark text-mint">
              <span className="grid place-items-center w-14 h-14 rounded-2xl bg-fresh/20 text-fresh">
                <MapPin className="w-7 h-7" />
              </span>
              <span className="font-display text-xl">{t.contact.location} 🇹🇳</span>
            </div>
            <div className="rounded-3xl p-8 glass-dark">
              <p className="text-mint/70 leading-relaxed">
                AZOLA — {t.footer.tagline}
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
