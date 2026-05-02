import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { I18nProvider, useI18n } from "@/lib/i18n";
import { initGsapScrollEffects } from "@/lib/gsapScroll";
import { LoadingScreen } from "@/components/azola/LoadingScreen";
import { Navbar } from "@/components/azola/Navbar";
import { Hero } from "@/components/azola/Hero";
import { About } from "@/components/azola/About";
import { Growth } from "@/components/azola/Growth";
import { Benefits } from "@/components/azola/Benefits";
import { HowTo } from "@/components/azola/HowTo";
import { Business } from "@/components/azola/Business";
import { Gallery } from "@/components/azola/Gallery";
import { Testimonials } from "@/components/azola/Testimonials";
import { Contact } from "@/components/azola/Contact";
import { Footer } from "@/components/azola/Footer";
import { SectionTransition } from "@/components/azola/SectionTransition";

const PageContent = ({ loading }: { loading: boolean }) => {
  const { lang } = useI18n();
  const cleanupRef = useRef<null | (() => void)>(null);

  // Re-init GSAP scroll effects after loader is gone and whenever language changes
  useEffect(() => {
    if (loading) return;
    const id = window.requestAnimationFrame(() => {
      window.setTimeout(() => {
        cleanupRef.current?.();
        cleanupRef.current = initGsapScrollEffects();
      }, 80);
    });
    return () => {
      window.cancelAnimationFrame(id);
      cleanupRef.current?.();
      cleanupRef.current = null;
    };
  }, [loading, lang]);

  return (
    <main className="relative bg-background text-foreground">
      <Navbar />
      <Hero />
      <SectionTransition from="deep" to="surface" variant="wave" />
      <About />
      <SectionTransition from="surface" to="emerald" variant="wave-soft" />
      <Growth />
      <SectionTransition from="emerald" to="surface" variant="blob" />
      <Benefits />
      <SectionTransition from="surface" to="water" variant="wave-soft" />
      <HowTo />
      <SectionTransition from="water" to="surface" variant="wave" flip />
      <Business />
      <Gallery />
      <SectionTransition from="surface" to="water" variant="blob" />
      <Testimonials />
      <SectionTransition from="water" to="emerald" variant="wave" />
      <Contact />
      <Footer />
    </main>
  );
};

const Index = () => {
  const [loading, setLoading] = useState(() => {
    if (typeof window === "undefined") return true;
    return !sessionStorage.getItem("azolla_loaded");
  });

  // Smooth scroll progress bar at top of page
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 22, mass: 0.4 });

  return (
    <I18nProvider>
      {loading && (
        <LoadingScreen
          onComplete={() => {
            sessionStorage.setItem("azolla_loaded", "1");
            setLoading(false);
          }}
        />
      )}

      {/* Global scroll progress */}
      <motion.div
        aria-hidden
        style={{ scaleX: progress }}
        className="fixed top-0 inset-x-0 h-[2px] origin-start z-[60] bg-gradient-fresh shadow-glow pointer-events-none"
      />

      <PageContent loading={loading} />
    </I18nProvider>
  );
};

export default Index;
