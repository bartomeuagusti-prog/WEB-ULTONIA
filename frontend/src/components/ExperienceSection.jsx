import React, { useRef, useEffect, useState } from "react";
import Mattress3D from "./Mattress3D";
import { Button } from "@/components/ui/button";
import { MousePointer2, ChevronDown } from "lucide-react";

const CAPTIONS = [
  {
    tag: "01 · Funda i teixit",
    title: "Vida útil de 8 anys",
    body: "Cada matalàs neix a l'inventari amb 8 anys de vida útil. El comptador es va reduint amb l'ús real, no amb una data arbitrària.",
  },
  {
    tag: "02 · Capa de confort",
    title: "Petjada de carboni",
    body: "Introdueix les dades del fabricant i la petjada de carboni associada per entendre l'impacte real de cada peça dins l'economia circular.",
  },
  {
    tag: "03 · Nucli de molles",
    title: "Manteniment i neteja",
    body: "Registra cada acció de manteniment i neteja. Allarga l'esperança de vida del producte i deixa-ho documentat al seu historial.",
  },
  {
    tag: "04 · Base estructural",
    title: "Llindar de substitució",
    body: "En assolir el llindar crític, Benlligat recomana la substitució i activa el desmuntatge, el reciclatge i la reintroducció al mercat.",
  },
];

export default function ExperienceSection({ onContact }) {
  const containerRef = useRef(null);
  const explodeRef = useRef(0);
  const [progress, setProgress] = useState(0);

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
        setProgress(p);
        explodeRef.current = Math.min(1, Math.max(0, (p - 0.15) / 0.7));
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const heroOpacity = Math.max(0, 1 - progress / 0.12);
  const explode = Math.min(1, Math.max(0, (progress - 0.15) / 0.7));
  const captionsVisible = explode > 0.04;
  const activeStep = Math.min(CAPTIONS.length - 1, Math.floor(explode * CAPTIONS.length * 0.999));

  return (
    <section
      ref={containerRef}
      className="relative"
      style={{ height: "380vh" }}
      data-testid="experience-section"
      id="experiencia"
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* soft radial backdrop */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(120% 90% at 70% 20%, #ffffff 0%, #F3F5F4 45%, #E6EFE7 100%)",
          }}
        />
        <div className="absolute inset-0 grain" />

        {/* 3D Canvas */}
        <div className="absolute inset-0 z-10 md:[transform:translateX(20%)]">
          <Mattress3D explodeRef={explodeRef} />
        </div>

        {/* HERO overlay */}
        <div
          className="absolute inset-0 z-20 pointer-events-none"
          style={{ opacity: heroOpacity, transition: "opacity 0.15s linear" }}
        >
          <div className="max-w-7xl mx-auto px-6 md:px-12 h-full flex flex-col justify-center">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/70 backdrop-blur-md border border-white/50 px-4 py-1.5 text-sm text-[#1A5336] font-medium mb-6">
                <span className="h-2 w-2 rounded-full bg-[#A6E08A]" />
                Passaport digital · Economia circular
              </div>
              <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl tracking-tighter leading-[0.95] text-[#0B2016]">
                El cicle de vida dels teus matalassos,
                <span className="text-[#1A5336]"> sota control.</span>
              </h1>
              <p className="mt-6 text-lg text-[#4A5D53] max-w-xl leading-relaxed">
                Benlligat dona als hotelers el control i la comprensió del residu
                voluminós dels matalassos: inventari, petjada de carboni, passaport
                digital i reintroducció al mercat.
              </p>
              <div className="mt-8 flex flex-wrap gap-4 pointer-events-auto">
                <Button
                  onClick={onContact}
                  data-testid="cta-hero-provar"
                  className="rounded-full bg-[#1A5336] hover:bg-[#133D27] text-white px-8 py-6 text-base font-medium shadow-md hover:-translate-y-0.5 transition-all"
                >
                  Vols provar?
                </Button>
                <Button
                  onClick={onContact}
                  variant="outline"
                  data-testid="cta-hero-demo"
                  className="rounded-full bg-white/70 backdrop-blur-md border-[#E2E8E4] text-[#0B2016] hover:bg-white px-8 py-6 text-base font-medium transition-all"
                >
                  Demanar demo
                </Button>
              </div>
            </div>
          </div>

          {/* drag hint */}
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[#4A5D53]">
            <div className="flex items-center gap-2 text-sm">
              <MousePointer2 className="h-4 w-4" />
              Arrossega per girar · desplaça't per desmuntar
            </div>
            <ChevronDown className="h-5 w-5 animate-bounce" />
          </div>
        </div>

        {/* SCROLL captions */}
        <div
          className="absolute inset-y-0 left-0 z-20 w-full md:w-[42%] pointer-events-none flex items-center"
          style={{ opacity: captionsVisible ? 1 : 0, transition: "opacity 0.3s ease" }}
        >
          <div className="px-6 md:px-12 w-full">
            {CAPTIONS.map((c, i) => (
              <div
                key={i}
                className="absolute left-6 md:left-12 right-6 max-w-md"
                style={{
                  opacity: activeStep === i ? 1 : 0,
                  transform: `translateY(${activeStep === i ? 0 : 20}px)`,
                  transition: "opacity 0.45s ease, transform 0.45s ease",
                }}
              >
                <span className="text-sm font-medium tracking-wide text-[#1A5336]">{c.tag}</span>
                <h2 className="font-display text-4xl sm:text-5xl tracking-tight text-[#0B2016] mt-2">
                  {c.title}
                </h2>
                <p className="mt-4 text-lg text-[#4A5D53] leading-relaxed bg-white/40 backdrop-blur-sm rounded-2xl">
                  {c.body}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* progress rail */}
        <div className="absolute right-6 md:right-10 top-1/2 -translate-y-1/2 z-20 hidden md:flex flex-col gap-2">
          {CAPTIONS.map((_, i) => (
            <span
              key={i}
              className="h-8 w-1 rounded-full transition-colors duration-300"
              style={{ background: captionsVisible && activeStep >= i ? "#1A5336" : "#D8E2DA" }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
