import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

interface Props {
  onComplete?: () => void;
}

export const LoadingScreen = ({ onComplete }: Props) => {
  const [mounted, setMounted] = useState(true);
  const rootRef = useRef<HTMLDivElement>(null);
  const screenRef = useRef<HTMLDivElement>(null);
  const nameARef = useRef<HTMLDivElement>(null);
  const nameBRef = useRef<HTMLDivElement>(null);
  const flashRef = useRef<HTMLDivElement>(null);
  const swRef = useRef<HTMLDivElement>(null);
  const lLRef = useRef<HTMLDivElement>(null);
  const lRRef = useRef<HTMLDivElement>(null);
  const brandRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const partsRef = useRef<HTMLDivElement>(null);
  const cracksRef = useRef<HTMLDivElement>(null);
  const vsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const nameA = nameARef.current!;
      const nameB = nameBRef.current!;
      const flash = flashRef.current!;
      const sw = swRef.current!;
      const lL = lLRef.current!;
      const lR = lRRef.current!;
      const brand = brandRef.current!;
      const bar = barRef.current!;
      const parts = partsRef.current!;
      const cracks = cracksRef.current!;
      const screen = screenRef.current!;
      const vs = vsRef.current!;

      gsap.set(nameA, { x: -900, opacity: 0, rotation: 0, scale: 1 });
      gsap.set(nameB, { x: 900, opacity: 1, scale: 1.05, rotation: 0 });
      gsap.set(flash, { opacity: 0 });
      gsap.set(sw, { scale: 0, opacity: 0 });
      gsap.set(lL, { opacity: 0 });
      gsap.set(lR, { opacity: 0 });
      gsap.set(brand, { opacity: 0 });
      gsap.set(bar, { width: "0%" });
      gsap.set(cracks, { opacity: 0 });
      gsap.set(vs, { opacity: 0 });

      const tl = gsap.timeline({
        onComplete: () => {
          gsap.to(screen, {
            opacity: 0,
            duration: 0.5,
            ease: "power2.inOut",
            onComplete: () => {
              setMounted(false);
              onComplete?.();
            },
          });
        },
      });

      tl.to(nameA, { x: 0, opacity: 1, duration: 0.9, ease: "back.out(1.3)" })
        .to(vs, { opacity: 1, duration: 0.2 }, "-=0.1")
        .to(nameA, { duration: 0.35 })
        .to(lL, { opacity: 1, duration: 0.1 })
        .to(lR, { opacity: 1, duration: 0.1 }, "<")
        .to(nameB, { x: 0, duration: 0.5, ease: "power4.in" }, "<")
        .to(lL, { opacity: 0, duration: 0.08 }, "-=0.1")
        .to(lR, { opacity: 0, duration: 0.08 }, "<")
        .to(vs, { opacity: 0, duration: 0.06 }, "<")
        .to(flash, { opacity: 1, duration: 0.06 }, "-=0.02")
        .to(flash, { opacity: 0, duration: 0.1 })
        .call(
          () => {
            gsap.set(sw, { scale: 0, opacity: 1 });
            gsap.to(sw, { scale: 4.5, opacity: 0, duration: 0.7, ease: "expo.out" });
            gsap.set(cracks, { opacity: 1 });
            gsap.to(cracks, { opacity: 0, duration: 0.55, delay: 0.2 });
            gsap.to(screen, {
              x: 16,
              duration: 0.05,
              repeat: 8,
              yoyo: true,
              ease: "none",
              onComplete: () => gsap.set(screen, { x: 0 }),
            });
            const colors = ["#3dba5a", "#dd1a00", "#ffffff", "#ff6600", "#ffee00"];
            for (let i = 0; i < 16; i++) {
              const p = document.createElement("div");
              const a = (i / 16) * Math.PI * 2;
              const d = 80 + Math.random() * 70;
              const sz = 4 + Math.floor(Math.random() * 10);
              p.style.cssText = `position:absolute;width:${sz}px;height:${sz}px;border-radius:50%;background:${colors[i % 5]};top:calc(50% - ${sz / 2}px);left:calc(50% - ${sz / 2}px);`;
              parts.appendChild(p);
              gsap.to(p, {
                x: Math.cos(a) * d,
                y: Math.sin(a) * d,
                opacity: 0,
                scale: 0,
                duration: 0.6 + Math.random() * 0.35,
                ease: "power2.out",
              });
            }
          },
          [],
          "<"
        )
        .to(nameA, { x: -1000, rotation: -22, scale: 0.3, opacity: 0, duration: 0.38, ease: "power4.in" }, "<")
        .to(nameB, { scale: 1.18, duration: 0.12, ease: "power2.out" })
        .to(nameB, { scale: 0, opacity: 0, duration: 0.2, ease: "power2.in" })
        .to(brand, { opacity: 1, duration: 0.65, ease: "expo.out" })
        .to(bar, { width: "100%", duration: 1.2, ease: "none" }, "-=0.3");
    }, rootRef);

    return () => ctx.revert();
  }, [onComplete]);

  if (!mounted) return null;

  return (
    <div ref={rootRef} className="fixed inset-0 z-[9999]" dir="ltr">
      <div
        ref={screenRef}
        className="absolute inset-0 flex items-center justify-center overflow-hidden"
        style={{ background: "#0a0a0a" }}
      >
        <div ref={flashRef} style={{ position: "absolute", inset: 0, background: "white", opacity: 0, pointerEvents: "none", zIndex: 50 }} />
        <div
          ref={swRef}
          style={{
            position: "absolute",
            width: 320,
            height: 320,
            borderRadius: "50%",
            border: "4px solid rgba(255,60,0,0.95)",
            opacity: 0,
            pointerEvents: "none",
            zIndex: 49,
            top: "50%",
            left: "50%",
            marginTop: -160,
            marginLeft: -160,
          }}
        />
        <div ref={partsRef} style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 48 }} />

        <div
          ref={cracksRef}
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%,-50%)",
            pointerEvents: "none",
            zIndex: 47,
            opacity: 0,
          }}
        >
          <svg width="400" height="160" viewBox="0 0 400 80" style={{ overflow: "visible" }}>
            <line x1="200" y1="40" x2="70" y2="-5" stroke="#ff3300" strokeWidth="3" opacity="0.95" />
            <line x1="200" y1="40" x2="40" y2="75" stroke="#ff3300" strokeWidth="2" opacity="0.7" />
            <line x1="200" y1="40" x2="330" y2="-8" stroke="#ff3300" strokeWidth="3" opacity="0.95" />
            <line x1="200" y1="40" x2="360" y2="82" stroke="#ff3300" strokeWidth="2" opacity="0.7" />
            <line x1="200" y1="40" x2="193" y2="-25" stroke="#ff3300" strokeWidth="1.5" opacity="0.6" />
            <line x1="200" y1="40" x2="207" y2="105" stroke="#ff3300" strokeWidth="1.5" opacity="0.6" />
            <line x1="200" y1="40" x2="120" y2="90" stroke="#ff3300" strokeWidth="1.5" opacity="0.5" />
            <line x1="200" y1="40" x2="280" y2="88" stroke="#ff3300" strokeWidth="1.5" opacity="0.5" />
          </svg>
        </div>

        <div
          ref={lLRef}
          style={{
            position: "absolute",
            top: "50%",
            left: 0,
            transform: "translateY(-50%)",
            display: "flex",
            flexDirection: "column",
            gap: 18,
            paddingLeft: 20,
            opacity: 0,
            pointerEvents: "none",
            zIndex: 9,
          }}
        >
          <div style={{ width: 140, height: 3, background: "linear-gradient(to right,transparent,rgba(255,60,0,0.7))", borderRadius: 2 }} />
          <div style={{ width: 90, height: 2, background: "linear-gradient(to right,transparent,rgba(255,60,0,0.45))", borderRadius: 2 }} />
          <div style={{ width: 115, height: 3, background: "linear-gradient(to right,transparent,rgba(255,60,0,0.6))", borderRadius: 2 }} />
          <div style={{ width: 70, height: 1.5, background: "linear-gradient(to right,transparent,rgba(255,60,0,0.3))", borderRadius: 2 }} />
        </div>

        <div
          ref={lRRef}
          style={{
            position: "absolute",
            top: "50%",
            right: 0,
            transform: "translateY(-50%)",
            display: "flex",
            flexDirection: "column",
            gap: 18,
            paddingRight: 20,
            opacity: 0,
            pointerEvents: "none",
            zIndex: 9,
          }}
        >
          <div style={{ width: 140, height: 3, background: "linear-gradient(to left,transparent,rgba(61,186,90,0.7))", borderRadius: 2 }} />
          <div style={{ width: 90, height: 2, background: "linear-gradient(to left,transparent,rgba(61,186,90,0.45))", borderRadius: 2 }} />
          <div style={{ width: 115, height: 3, background: "linear-gradient(to left,transparent,rgba(61,186,90,0.6))", borderRadius: 2 }} />
          <div style={{ width: 70, height: 1.5, background: "linear-gradient(to left,transparent,rgba(61,186,90,0.3))", borderRadius: 2 }} />
        </div>

        <div
          ref={nameARef}
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%,-50%)",
            opacity: 0,
            zIndex: 10,
            textAlign: "center",
            whiteSpace: "nowrap",
          }}
        >
          <div
            style={{
              fontFamily: "'Nosifer',cursive",
              fontSize: 46,
              color: "#dd1a00",
              letterSpacing: 2,
              lineHeight: 1.3,
              textShadow: "0 0 18px rgba(220,0,0,1),0 0 40px rgba(180,0,0,0.6)",
            }}
          >
            عارف دائك
          </div>
          <div
            style={{
              fontFamily: "'Nosifer',cursive",
              fontSize: 36,
              color: "#bb1500",
              letterSpacing: 2,
              lineHeight: 1.3,
              textShadow: "0 0 14px rgba(200,0,0,0.9),0 0 30px rgba(160,0,0,0.5)",
            }}
          >
            و دواك
          </div>
        </div>

        <div
          ref={nameBRef}
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%,-50%)",
            opacity: 1,
            zIndex: 11,
            textAlign: "center",
            whiteSpace: "nowrap",
          }}
        >
          <div
            style={{
              fontFamily: "'Metal Mania',cursive",
              fontSize: 96,
              color: "#3dba5a",
              letterSpacing: 4,
              lineHeight: 1,
              textShadow: "0 0 20px rgba(61,186,90,1),0 0 50px rgba(40,160,70,0.7)",
            }}
          >
            AZOLLA
          </div>
        </div>

        <div
          ref={vsRef}
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%,-50%)",
            fontFamily: "'Metal Mania',cursive",
            fontSize: 36,
            color: "#333",
            opacity: 0,
            zIndex: 8,
            pointerEvents: "none",
            textShadow: "0 0 10px rgba(255,255,255,0.1)",
          }}
        >
          VS
        </div>

        <div
          ref={brandRef}
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%,-50%)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 18,
            opacity: 0,
            textAlign: "center",
          }}
        >
          <div
            style={{
              fontFamily: "'Metal Mania',cursive",
              fontSize: 92,
              color: "#3dba5a",
              letterSpacing: 6,
              textShadow: "0 0 25px rgba(61,186,90,1),0 0 60px rgba(40,160,70,0.6)",
              whiteSpace: "nowrap",
            }}
          >
            AZOLLA
          </div>
          <div style={{ width: 250, height: 3, background: "rgba(61,186,90,0.15)", borderRadius: 2, overflow: "hidden" }}>
            <div
              ref={barRef}
              style={{
                height: "100%",
                width: "0%",
                background: "#3dba5a",
                borderRadius: 2,
                boxShadow: "0 0 12px rgba(61,186,90,1)",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
