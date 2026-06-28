import React, { useRef, useEffect, useState } from "react";
import Mattress3D from "./Mattress3D";
import { MousePointer2 } from "lucide-react";

const CAPTIONS = [
  {
    tag: "Inventari",
    title: "Crea i ubica el matalàs",
    body: "El responsable dona d'alta cada matalàs amb les dades del fabricant i la seva ubicació. Cada peça entra a l'inventari amb la seva identitat única.",
  },
  {
    tag: "Cicle de vida",
    title: "Vida útil de 8 anys",
    body: "Cada matalàs neix amb 8 anys de vida útil que es van reduint amb l'ús real. Teixit stretch, fibres termoreguladores i viscoelàstica d'alta densitat, capa a capa.",
  },
  {
    tag: "Sostenibilitat",
    title: "Petjada de carboni",
    body: "Registra la petjada de carboni i les dades clau del fabricant per entendre l'impacte real de cada matalàs dins l'economia circular.",
  },
  {
    tag: "Allarga la vida",
    title: "Manteniment i neteja",
    body: "El nucli de molles ensacades multipunt i el marc estabilitzador. Registra accions de manteniment i neteja per allargar l'esperança de vida del producte.",
  },
  {
    tag: "Final de cicle",
    title: "Llindar i reciclatge",
    body: "En assolir el llindar crític, Benlligat recomana la substitució i activa el desmuntatge, el reciclatge i la reintroducció al mercat.",
  },
];

export default function ExperienceSection() {
  const containerRef = useRef(null);
  const explodeRef = useRef(0);
  const [explode, setExplode] = useState(0);

  useEffect(() => {
    let raf = null;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = null;
        const el = containerRef.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const vh = window.innerHeight;
        const p = Math.min(1, Math.max(0, -rect.top / (rect.height - vh)));
        const e = Math.min(1, Math.max(0, (p - 0.08) / 0.82));
        explodeRef.current = e;
        setExplode(e);
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const activeStep = Math.min(CAPTIONS.length - 1, Math.floor(explode * CAPTIONS.length * 0.999));

  return (
    <section
      ref={containerRef}
      className="relative bg-[#FAFAFA]"
      style={{ height: "500vh" }}
      data-testid="experience-section"
      id="experiencia"
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            background: "radial-gradient(120% 90% at 60% 25%, #ffffff 0%, #F1F5F1 55%, #E6EFE7 100%)",
          }}
        />
        <div className="absolute inset-0 grain" />

        <div className="relative z-10 h-full max-w-7xl mx-auto px-6 md:px-12">
          <div className="h-full grid grid-cols-1 lg:grid-cols-2 items-center gap-6">
            {/* CANVAS column (right on desktop, top on mobile) */}
            <div className="order-1 lg:order-2 relative h-[48vh] lg:h-full" data-testid="experience-canvas-wrap">
              <Mattress3D explodeRef={explodeRef} />
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-2 text-xs text-[#4A5D53]/80 bg-white/50 backdrop-blur-sm px-3 py-1.5 rounded-full">
                <MousePointer2 className="h-3.5 w-3.5" />
                Arrossega per girar · desplaça't per desmuntar
              </div>
            </div>

            {/* TEXT column (left on desktop, bottom on mobile) — never overlaps the 3D */}
            <div className="order-2 lg:order-1 relative flex items-center">
              <div className="relative w-full">
                {/* progress rail */}
                <div className="hidden lg:flex absolute -left-2 top-1/2 -translate-y-1/2 flex-col gap-2">
                  {CAPTIONS.map((_, i) => (
                    <span
                      key={i}
                      className="h-9 w-1 rounded-full transition-colors duration-300"
                      style={{ background: activeStep >= i ? "#1A5336" : "#D8E2DA" }}
                    />
                  ))}
                </div>

                <div className="relative min-h-[300px] lg:pl-8">
                  {CAPTIONS.map((c, i) => (
                    <div
                      key={i}
                      aria-hidden={activeStep !== i}
                      className="absolute inset-x-0 top-0 max-w-md"
                      style={{
                        opacity: activeStep === i ? 1 : 0,
                        transform: `translateY(${activeStep === i ? 0 : 24}px)`,
                        transition: "opacity 0.5s ease, transform 0.5s ease",
                        pointerEvents: activeStep === i ? "auto" : "none",
                      }}
                    >
                      <div className="flex items-center gap-3 text-sm font-medium text-[#1A5336]">
                        <span className="font-display text-lg">{String(i + 1).padStart(2, "0")}</span>
                        <span className="h-px w-8 bg-[#1A5336]/40" />
                        <span className="tracking-wide uppercase text-xs">{c.tag}</span>
                      </div>
                      <h2 className="font-display text-4xl sm:text-5xl tracking-tight text-[#0B2016] mt-3 leading-[1.02]">
                        {c.title}
                      </h2>
                      <p className="mt-4 text-lg text-[#4A5D53] leading-relaxed">{c.body}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
