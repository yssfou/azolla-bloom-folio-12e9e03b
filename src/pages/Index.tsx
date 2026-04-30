import { useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { I18nProvider, useI18n } from "@/lib/i18n";
import { initGsapScrollEffects } from "@/lib/gsapScroll";
import { Loader } from "@/components/azola/Loader";
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

  // Re-init GSAP scroll effects after loader is gone and whenever language changes
  useEffect(() => {
    if (loading) return;
    // Wait one frame so DOM is fully painted with new language strings
    const id = window.requestAnimationFrame(() => {
      // Small delay so any layout shifts settle
      window.setTimeout(() => {
        cleanupRef.current?.();
        cleanupRef.current = initGsapScrollEffects();
      }, 60);
    });
    return () => window.cancelAnimationFrame(id);
  }, [loading, lang]);

  const cleanupRef = (PageContent as any)._cleanupRef ??= { current: null as null | (() => void) };

  useEffect(() => () => cleanupRef.current?.(), []);

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
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1400);
    return () => clearTimeout(t);
  }, []);

  // Smooth scroll progress bar at top of page
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 22, mass: 0.4 });

  return (
    <I18nProvider>
      <Loader show={loading} />

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
