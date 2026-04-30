import { useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { I18nProvider } from "@/lib/i18n";
import { CinematicLoader } from "@/components/azola/CinematicLoader";
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

// Only play loader on first page-load (not on client-side navigations)
let loaderHasPlayed = false;

const Index = () => {
  const [revealed, setRevealed] = useState(loaderHasPlayed);

  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 22, mass: 0.4 });

  // Sync hero unblur with the loader's clip-path wipe (last 0.7s of the timeline)
  const heroRevealStyle: React.CSSProperties = revealed
    ? {
        filter: "blur(0px)",
        transform: "scale(1)",
        transition:
          "filter 0.7s cubic-bezier(0.87, 0, 0.13, 1), transform 0.9s cubic-bezier(0.16, 1, 0.3, 1)",
      }
    : {
        filter: "blur(12px)",
        transform: "scale(0.95)",
      };

  return (
    <I18nProvider>
      {!loaderHasPlayed && (
        <CinematicLoader
          onComplete={() => {
            loaderHasPlayed = true;
            setRevealed(true);
          }}
        />
      )}

      <motion.div
        aria-hidden
        style={{ scaleX: progress }}
        className="fixed top-0 inset-x-0 h-[2px] origin-start z-[60] bg-gradient-fresh shadow-glow pointer-events-none"
      />

      <main
        className="relative bg-background text-foreground"
        style={heroRevealStyle}
      >
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
    </I18nProvider>
  );
};

export default Index;
