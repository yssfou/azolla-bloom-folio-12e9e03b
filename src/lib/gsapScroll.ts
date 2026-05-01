import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Splits a text node into per-word spans for staggered reveal animations.
 * Preserves spaces and ignores elements that have already been split.
 */
const splitIntoWords = (el: HTMLElement) => {
  if (el.dataset.splitDone === "1") return Array.from(el.querySelectorAll<HTMLElement>(".gsap-word"));
  // Only split if it contains plain text (avoid nuking nested motion spans, e.g. Hero headline)
  const hasComplexChildren = Array.from(el.children).some(
    (c) => c.tagName !== "BR" && (c as HTMLElement).innerHTML.trim() !== ""
  );
  if (hasComplexChildren) return [];

  const text = el.textContent ?? "";
  el.textContent = "";
  const words = text.split(/(\s+)/);
  const spans: HTMLElement[] = [];
  for (const w of words) {
    if (/^\s+$/.test(w)) {
      el.appendChild(document.createTextNode(w));
    } else if (w.length) {
      const span = document.createElement("span");
      span.className = "gsap-word";
      span.style.display = "inline-block";
      span.style.willChange = "transform, opacity, filter";
      span.textContent = w;
      el.appendChild(span);
      spans.push(span);
    }
  }
  el.dataset.splitDone = "1";
  return spans;
};

export const initGsapScrollEffects = () => {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduce) return () => {};

  const ctx = gsap.context(() => {
    // -------- Headings: word-by-word reveal on scroll --------
    // Skip word splitting for RTL languages (e.g. Arabic) — splitting words
    // into inline-block spans breaks shaping, ligatures and reading order.
    const isRTL = document.documentElement.dir === "rtl";
    const headings = gsap.utils.toArray<HTMLElement>(
      "section h2, section h3"
    );
    headings.forEach((h) => {
      const words = isRTL ? [] : splitIntoWords(h);
      if (!words.length) {
        // Fallback: animate the whole heading
        gsap.fromTo(
          h,
          { y: 40, opacity: 0, filter: "blur(8px)" },
          {
            y: 0,
            opacity: 1,
            filter: "blur(0px)",
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: h,
              start: "top 85%",
              end: "top 55%",
              toggleActions: "play none none reverse",
            },
          }
        );
        return;
      }
      gsap.fromTo(
        words,
        { yPercent: 110, opacity: 0, rotateX: -40, filter: "blur(8px)" },
        {
          yPercent: 0,
          opacity: 1,
          rotateX: 0,
          filter: "blur(0px)",
          duration: 1.1,
          ease: "power4.out",
          stagger: 0.06,
          scrollTrigger: {
            trigger: h,
            start: "top 88%",
            end: "top 55%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });

    // -------- Paragraphs: subtle fade-up --------
    const paras = gsap.utils.toArray<HTMLElement>(
      "section p:not(.no-gsap)"
    );
    paras.forEach((p) => {
      gsap.fromTo(
        p,
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: "power2.out",
          scrollTrigger: {
            trigger: p,
            start: "top 92%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });

    // -------- Section background parallax --------
    const sections = gsap.utils.toArray<HTMLElement>("section[id]");
    sections.forEach((sec) => {
      if (sec.id === "top") return; // Hero handles its own parallax
      gsap.fromTo(
        sec,
        { backgroundPositionY: "0%" },
        {
          backgroundPositionY: "20%",
          ease: "none",
          scrollTrigger: {
            trigger: sec,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );
    });

    // -------- Generic [data-gsap] elements --------
    // Usage: data-gsap="fade-up" | "fade" | "scale" | "slide-start" | "slide-end"
    const tagged = gsap.utils.toArray<HTMLElement>("[data-gsap]");
    tagged.forEach((el) => {
      const kind = el.dataset.gsap;
      const delay = parseFloat(el.dataset.gsapDelay ?? "0");
      const presets: Record<string, gsap.TweenVars> = {
        "fade-up": { y: 50, opacity: 0 },
        fade: { opacity: 0 },
        scale: { scale: 0.9, opacity: 0 },
        "slide-start": { x: -60, opacity: 0 },
        "slide-end": { x: 60, opacity: 0 },
      };
      const from = presets[kind ?? "fade-up"] ?? presets["fade-up"];
      gsap.fromTo(
        el,
        from,
        {
          x: 0,
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1,
          delay,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 88%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });

    ScrollTrigger.refresh();
  });

  // Refresh on layout shifts (images, fonts)
  const onLoad = () => ScrollTrigger.refresh();
  window.addEventListener("load", onLoad);

  return () => {
    window.removeEventListener("load", onLoad);
    ctx.revert();
  };
};
