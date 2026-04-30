import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* ---------- helpers ---------- */

const splitIntoWords = (el: HTMLElement) => {
  if (el.dataset.splitDone === "1")
    return Array.from(el.querySelectorAll<HTMLElement>(".gsap-word"));
  const hasComplexChildren = Array.from(el.children).some(
    (c) => c.tagName !== "BR" && (c as HTMLElement).innerHTML.trim() !== ""
  );
  if (hasComplexChildren) return [];
  const text = el.textContent ?? "";
  el.textContent = "";
  const spans: HTMLElement[] = [];
  for (const w of text.split(/(\s+)/)) {
    if (/^\s+$/.test(w)) el.appendChild(document.createTextNode(w));
    else if (w.length) {
      const s = document.createElement("span");
      s.className = "gsap-word";
      s.style.display = "inline-block";
      s.style.willChange = "transform, opacity, filter";
      s.textContent = w;
      el.appendChild(s);
      spans.push(s);
    }
  }
  el.dataset.splitDone = "1";
  return spans;
};

const splitIntoChars = (el: HTMLElement) => {
  if (el.dataset.splitCharsDone === "1")
    return Array.from(el.querySelectorAll<HTMLElement>(".gsap-char"));
  const hasComplexChildren = Array.from(el.children).some(
    (c) => c.tagName !== "BR" && (c as HTMLElement).innerHTML.trim() !== ""
  );
  if (hasComplexChildren) return [];
  const text = el.textContent ?? "";
  el.textContent = "";
  const spans: HTMLElement[] = [];
  for (const w of text.split(/(\s+)/)) {
    if (/^\s+$/.test(w)) {
      el.appendChild(document.createTextNode(w));
    } else {
      const wordWrap = document.createElement("span");
      wordWrap.style.display = "inline-block";
      wordWrap.style.whiteSpace = "nowrap";
      for (const ch of Array.from(w)) {
        const s = document.createElement("span");
        s.className = "gsap-char";
        s.style.display = "inline-block";
        s.style.willChange = "transform, opacity, filter";
        s.textContent = ch;
        wordWrap.appendChild(s);
        spans.push(s);
      }
      el.appendChild(wordWrap);
    }
  }
  el.dataset.splitCharsDone = "1";
  return spans;
};

/* ---------- heading effect catalog ---------- */

type HeadingEffect =
  | "rise"        // words rise from below w/ blur (default)
  | "stagger-x"   // words slide in alternating from sides
  | "letters"     // characters cascade w/ rotate
  | "wave"        // words bob in like a wave
  | "mask"        // words wipe up behind a mask
  | "zoom"        // words scale in from large
  | "tilt";       // words tilt in 3D

const applyHeadingEffect = (h: HTMLElement, effect: HeadingEffect) => {
  const trigger = {
    trigger: h,
    start: "top 88%",
    end: "top 55%",
    toggleActions: "play none none reverse",
  } as const;

  if (effect === "letters") {
    const chars = splitIntoChars(h);
    if (!chars.length) return applyHeadingEffect(h, "rise");
    gsap.fromTo(
      chars,
      { y: 60, opacity: 0, rotate: -12, scale: 0.6 },
      {
        y: 0, opacity: 1, rotate: 0, scale: 1,
        duration: 0.9, ease: "back.out(1.6)", stagger: 0.025,
        scrollTrigger: trigger,
      }
    );
    return;
  }

  if (effect === "mask") {
    const words = splitIntoWords(h);
    if (!words.length) return applyHeadingEffect(h, "rise");
    words.forEach((w) => {
      w.style.overflow = "hidden";
      const inner = document.createElement("span");
      inner.style.display = "inline-block";
      inner.textContent = w.textContent;
      w.textContent = "";
      w.appendChild(inner);
    });
    const inners = h.querySelectorAll<HTMLElement>(".gsap-word > span");
    gsap.fromTo(
      inners,
      { yPercent: 110 },
      {
        yPercent: 0, duration: 1.1, ease: "expo.out",
        stagger: 0.08, scrollTrigger: trigger,
      }
    );
    return;
  }

  const words = splitIntoWords(h);
  if (!words.length) {
    gsap.fromTo(
      h,
      { y: 40, opacity: 0, filter: "blur(8px)" },
      { y: 0, opacity: 1, filter: "blur(0px)", duration: 1, ease: "power3.out", scrollTrigger: trigger }
    );
    return;
  }

  switch (effect) {
    case "stagger-x":
      gsap.fromTo(
        words,
        (i: number) => ({ x: i % 2 === 0 ? -80 : 80, opacity: 0, filter: "blur(6px)" }),
        {
          x: 0, opacity: 1, filter: "blur(0px)",
          duration: 1.1, ease: "power4.out", stagger: 0.07,
          scrollTrigger: trigger,
        }
      );
      break;
    case "wave":
      gsap.fromTo(
        words,
        { y: 30, opacity: 0, rotate: -6 },
        {
          y: 0, opacity: 1, rotate: 0,
          duration: 0.9, ease: "elastic.out(1, 0.6)", stagger: 0.08,
          scrollTrigger: trigger,
        }
      );
      break;
    case "zoom":
      gsap.fromTo(
        words,
        { scale: 1.6, opacity: 0, filter: "blur(14px)" },
        {
          scale: 1, opacity: 1, filter: "blur(0px)",
          duration: 1.1, ease: "power3.out", stagger: 0.06,
          scrollTrigger: trigger,
        }
      );
      break;
    case "tilt":
      gsap.fromTo(
        words,
        { rotateX: 80, opacity: 0, transformOrigin: "50% 100% -20px" },
        {
          rotateX: 0, opacity: 1,
          duration: 1, ease: "power4.out", stagger: 0.07,
          scrollTrigger: trigger,
        }
      );
      break;
    case "rise":
    default:
      gsap.fromTo(
        words,
        { yPercent: 110, opacity: 0, filter: "blur(8px)" },
        {
          yPercent: 0, opacity: 1, filter: "blur(0px)",
          duration: 1.1, ease: "power4.out", stagger: 0.06,
          scrollTrigger: trigger,
        }
      );
  }
};

/* ---------- paragraph effect catalog ---------- */

type ParaEffect = "fade-up" | "fade-side" | "fade-blur" | "split-words";

const applyParaEffect = (p: HTMLElement, effect: ParaEffect) => {
  const trigger = {
    trigger: p,
    start: "top 92%",
    toggleActions: "play none none reverse",
  } as const;

  switch (effect) {
    case "fade-side":
      gsap.fromTo(
        p,
        { x: -40, opacity: 0 },
        { x: 0, opacity: 1, duration: 1, ease: "power3.out", scrollTrigger: trigger }
      );
      break;
    case "fade-blur":
      gsap.fromTo(
        p,
        { opacity: 0, filter: "blur(10px)", y: 14 },
        { opacity: 1, filter: "blur(0px)", y: 0, duration: 1.1, ease: "power2.out", scrollTrigger: trigger }
      );
      break;
    case "split-words": {
      const words = splitIntoWords(p);
      if (!words.length) return applyParaEffect(p, "fade-up");
      gsap.fromTo(
        words,
        { y: 16, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: "power2.out", stagger: 0.015, scrollTrigger: trigger }
      );
      break;
    }
    case "fade-up":
    default:
      gsap.fromTo(
        p,
        { y: 24, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, ease: "power2.out", scrollTrigger: trigger }
      );
  }
};

/* ---------- per-section assignment ---------- */

const HEADING_PRESETS: Record<string, HeadingEffect> = {
  about: "rise",
  growth: "stagger-x",
  benefits: "letters",
  howto: "mask",
  business: "zoom",
  gallery: "wave",
  contact: "tilt",
};

const PARA_PRESETS: Record<string, ParaEffect> = {
  about: "fade-blur",
  growth: "split-words",
  benefits: "fade-side",
  howto: "fade-up",
  business: "fade-blur",
  gallery: "fade-up",
  contact: "split-words",
};

/* ---------- main init ---------- */

export const initGsapScrollEffects = () => {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduce) return () => {};

  const ctx = gsap.context(() => {
    const sections = gsap.utils.toArray<HTMLElement>("section[id]");

    sections.forEach((sec, idx) => {
      if (sec.id === "top") return;

      const headingEffect: HeadingEffect =
        HEADING_PRESETS[sec.id] ??
        (["rise", "stagger-x", "letters", "wave", "mask", "zoom", "tilt"] as HeadingEffect[])[
          idx % 7
        ];
      const paraEffect: ParaEffect =
        PARA_PRESETS[sec.id] ??
        (["fade-up", "fade-side", "fade-blur", "split-words"] as ParaEffect[])[idx % 4];

      // Section titles
      sec.querySelectorAll<HTMLElement>("h2").forEach((h) => applyHeadingEffect(h, headingEffect));

      // Subtitles / card titles — use a contrasting effect
      const subEffect: HeadingEffect =
        headingEffect === "letters" ? "rise" : headingEffect === "rise" ? "wave" : "letters";
      sec.querySelectorAll<HTMLElement>("h3").forEach((h) => applyHeadingEffect(h, subEffect));

      // Paragraphs
      sec
        .querySelectorAll<HTMLElement>("p:not(.no-gsap)")
        .forEach((p) => applyParaEffect(p, paraEffect));
    });

    // Background parallax per section
    sections.forEach((sec) => {
      if (sec.id === "top") return;
      gsap.fromTo(
        sec,
        { backgroundPositionY: "0%" },
        {
          backgroundPositionY: "20%",
          ease: "none",
          scrollTrigger: { trigger: sec, start: "top bottom", end: "bottom top", scrub: true },
        }
      );
    });

    // Generic [data-gsap] elements (opt-in custom)
    gsap.utils.toArray<HTMLElement>("[data-gsap]").forEach((el) => {
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
      gsap.fromTo(el, from, {
        x: 0, y: 0, opacity: 1, scale: 1, duration: 1, delay,
        ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 88%", toggleActions: "play none none reverse" },
      });
    });

    ScrollTrigger.refresh();
  });

  const onLoad = () => ScrollTrigger.refresh();
  window.addEventListener("load", onLoad);

  return () => {
    window.removeEventListener("load", onLoad);
    ctx.revert();
  };
};
