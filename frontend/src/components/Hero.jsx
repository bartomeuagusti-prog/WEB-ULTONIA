import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowDown, Leaf } from "lucide-react";

const STATS = [
  { v: "8 anys", l: "vida útil de partida" },
  { v: "100%", l: "traçabilitat blockchain" },
  { v: "0€", l: "per començar · Freemium" },
];

export default function Hero({ onContact }) {
  return (
    <section
      id="inici"
      className="relative min-h-screen flex items-center overflow-hidden bg-[#FAFAFA]"
      data-testid="hero-section"
    >
      {/* backdrop */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(110% 80% at 85% 10%, #ECF4EC 0%, #FAFAFA 55%, #F3F5F4 100%)",
        }}
      />
      <div className="absolute inset-0 grain" />
      <div
        className="absolute -right-24 -top-24 h-[480px] w-[480px] rounded-full opacity-[0.07] blur-2xl"
        style={{ background: "#1A5336" }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full pt-24 pb-16">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/70 backdrop-blur-md border border-white/60 px-4 py-1.5 text-sm text-[#1A5336] font-medium mb-7 animate-float-up">
            <Leaf className="h-4 w-4 text-[#1A5336]" />
            Passaport digital · Economia circular
          </div>

          <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl tracking-tighter leading-[0.95] text-[#0B2016] animate-float-up" style={{ animationDelay: "0.05s" }}>
            El cicle de vida dels teus matalassos,
            <span className="text-[#1A5336]"> sota control.</span>
          </h1>

          <p className="mt-7 text-lg sm:text-xl text-[#4A5D53] max-w-2xl leading-relaxed animate-float-up" style={{ animationDelay: "0.12s" }}>
            Benlligat dona als hotelers el control i la comprensió del residu voluminós
            dels matalassos: crea i ubica cada matalàs a l'inventari, segueix-ne la petjada
            de carboni, genera el passaport digital obligatori i facilita'n la reintroducció
            al mercat.
          </p>

          <div className="mt-9 flex flex-wrap gap-4 animate-float-up" style={{ animationDelay: "0.2s" }}>
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

          <div className="mt-14 grid grid-cols-3 gap-6 max-w-xl animate-float-up" style={{ animationDelay: "0.28s" }}>
            {STATS.map((s) => (
              <div key={s.l}>
                <div className="font-display text-2xl sm:text-3xl tracking-tight text-[#1A5336]">{s.v}</div>
                <div className="text-xs sm:text-sm text-[#4A5D53] mt-1 leading-snug">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <a
        href="#experiencia"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-[#4A5D53] hover:text-[#1A5336] transition-colors"
        data-testid="hero-scroll-hint"
      >
        <span className="text-sm">Descobreix-ne l'interior</span>
        <ArrowDown className="h-5 w-5 animate-bounce" />
      </a>
    </section>
  );
}
