import { useEffect, useState } from "react";
import { I18nProvider } from "@/lib/i18n";
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

const Index = () => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1400);
    return () => clearTimeout(t);
  }, []);

  return (
    <I18nProvider>
      <Loader show={loading} />
      <main className="relative bg-background text-foreground">
        <Navbar />
        <Hero />
        <About />
        <Growth />
        <Benefits />
        <HowTo />
        <Business />
        <Gallery />
        <Testimonials />
        <Contact />
        <Footer />
      </main>
    </I18nProvider>
  );
};

export default Index;
