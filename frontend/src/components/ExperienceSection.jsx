import React, { useEffect, useRef, useState } from "react";
import Mattress3D from "./Mattress3D";
import { MousePointer2 } from "lucide-react";

const STEPS = [
  {
    id: "inventari",
    tag: "Inventari",
    title: "Crea i ubica el matalàs",
    body: "El responsable dona d'alta cada matalàs amb les dades del fabricant i la seva ubicació. Cada peça entra a l'inventari amb la seva identitat única.",
  },
  {
    id: "vida",
    tag: "Cicle de vida",
    title: "Vida útil de 8 anys",
    body: "Cada matalàs neix amb 8 anys de vida útil que es van reduint amb l'ús real. Teixit stretch, fibres termoreguladores i viscoelàstica d'alta densitat, capa a capa.",
  },
  {
    id: "petjada",
    tag: "Sostenibilitat",
    title: "Petjada de carboni",
    body: "Registra la petjada de carboni i les dades clau del fabricant per entendre l'impacte real de cada matalàs dins l'economia circular.",
  },
  {
    id: "manteniment",
    tag: "Allarga la vida",
    title: "Manteniment i neteja",
    body: "El nucli de molles ensacades multipunt i el marc estabilitzador. Registra accions de manteniment i neteja per allargar l'esperança de vida del producte.",
  },
  {
    id: "reciclatge",
    tag: "Final de cicle",
    title: "Llindar i reciclatge",
    body: "En assolir el llindar crític, Benlligat recomana la substitució i activa el desmuntatge, el reciclatge i la reintroducció al mercat.",
  },
];

// Held for the whole time that step is active. 01 is fully closed.
// Later steps jump in clearly larger openings; 05 is the maximum.
const STEP_POSE = [0, 0.25, 0.48, 0.68, 1];

function pad(n) {
  return String(n + 1).padStart(2, "0");
}

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return reduced;
}

function focusLine() {
  const mobile = window.matchMedia("(max-width: 1023px)").matches;
  if (mobile) {
    const wrap = document.querySelector('[data-testid="experience-canvas-wrap"]');
    if (wrap) return wrap.getBoundingClientRect().bottom + 56;
    return 64 + 280;
  }
  return Math.min(window.innerHeight * 0.4, 440);
}

export default function ExperienceSection() {
  const reduced = usePrefersReducedMotion();
  const explodeRef = useRef(0);
  const stepRefs = useRef([]);
  const activeRef = useRef(0);
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    let raf = 0;

    const measure = () => {
      raf = 0;
      const nodes = stepRefs.current;
      if (!nodes[0] || !nodes[STEPS.length - 1]) return;

      const y = focusLine();
      let active = 0;
      for (let i = 0; i < STEPS.length; i += 1) {
        const node = nodes[i];
        if (node && node.getBoundingClientRect().top <= y + 16) active = i;
      }

      explodeRef.current = STEP_POSE[active];
      const section = document.querySelector('[data-testid="experience-section"]');
      if (section) section.setAttribute("data-explode", explodeRef.current.toFixed(3));

      const wrap = document.querySelector('[data-testid="experience-canvas-wrap"]');
      if (wrap) {
        const rawTop = getComputedStyle(wrap).top;
        const rootPx = parseFloat(getComputedStyle(document.documentElement).fontSize) || 16;
        const stickyTop = rawTop.endsWith("rem") ? parseFloat(rawTop) * rootPx : parseFloat(rawTop) || 0;
        const nav = document.querySelector("header");
        const navBottom = nav ? nav.getBoundingClientRect().bottom : 64;
        const fadeDistance = Math.max(8, stickyTop - navBottom);
        const overflow = stickyTop - wrap.getBoundingClientRect().top;
        // Transparent by the time the panel meets the navbar, so it never shows underneath.
        wrap.style.opacity = overflow > 1 ? String(Math.max(0, 1 - overflow / fadeDistance)) : "1";
      }

      if (active !== activeRef.current) {
        activeRef.current = active;
        setActiveStep(active);
      }
    };

    const onScroll = () => {
      if (raf) return;
      raf = window.requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) window.cancelAnimationFrame(raf);
    };
  }, []);

  const goTo = (index) => {
    const el = stepRefs.current[index];
    if (!el) return;
    const top = window.scrollY + el.getBoundingClientRect().top;
    window.scrollTo({
      top: Math.max(0, top - focusLine() + 40),
      behavior: reduced ? "auto" : "smooth",
    });
  };

  return (
    <section
      id="experiencia"
      className="relative bg-[#F4F7F4]"
      data-testid="experience-section"
      data-active-step={activeStep}
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: "radial-gradient(120% 80% at 72% 12%, #ffffff 0%, rgba(244,247,244,0.2) 46%, rgba(230,239,231,0.65) 100%)",
        }}
      />
      <div className="pointer-events-none absolute inset-0 grain" />

      <div className="relative mx-auto max-w-7xl px-6 pb-20 pt-6 md:px-12 lg:pb-28 lg:pt-12">
        <h2 className="sr-only">Experiència: el cicle de vida del matalàs</h2>
        <div className="lg:flex lg:items-start lg:gap-14">
          <div
            className="sticky top-[4.75rem] z-20 -mx-6 mb-2 h-[36vh] min-h-[230px] max-h-[320px] self-start overflow-hidden border-b border-[#E2E8E4] bg-[#F4F7F4] px-6 lg:order-2 lg:top-[5.5rem] lg:z-10 lg:mx-0 lg:mb-0 lg:h-[calc(100vh-24rem)] lg:max-h-[480px] lg:min-h-[300px] lg:w-[44%] lg:shrink-0 lg:border-0 lg:bg-transparent lg:px-0"
            data-testid="experience-canvas-wrap"
          >
            <div className="flex h-full flex-col">
              <div className="relative min-h-0 flex-1">
                <div className="absolute inset-0">
                  <Mattress3D explodeRef={explodeRef} reducedMotion={reduced} />
                </div>
              </div>
              <div className="pointer-events-none mx-auto mb-1 mt-1 flex w-fit shrink-0 items-center gap-2 whitespace-nowrap rounded-full bg-white/70 px-3 py-1.5 text-[11px] text-[#4A5D53] lg:mb-2 lg:text-xs">
                <MousePointer2 className="h-3.5 w-3.5" />
                Arrossega per girar · desplaça't per desmuntar
              </div>
            </div>
          </div>

          <div className="min-w-0 lg:order-1 lg:min-w-0 lg:flex-1 lg:pt-2">
          <ol>
            {STEPS.map((step, i) => {
              const active = activeStep === i;
              const past = activeStep > i;
              return (
                <li
                  key={step.id}
                  ref={(node) => {
                    stepRefs.current[i] = node;
                  }}
                  data-testid={`experience-step-${step.id}`}
                  data-active={active ? "true" : "false"}
                  className={`relative ${i === STEPS.length - 1 ? "pb-0" : "pb-8 lg:pb-[16vh]"}`}
                >
                  {i < STEPS.length - 1 && (
                    <span
                      aria-hidden="true"
                      className={`absolute bottom-0 left-[calc(1.625rem-0.5px)] top-14 w-px lg:left-[calc(2rem-0.5px)] lg:top-[3.75rem] ${
                        past ? "bg-[#1A5336]" : "bg-[#D5E2DA]"
                      } motion-reduce:transition-none`}
                    />
                  )}
                  <button
                    type="button"
                    onClick={() => goTo(i)}
                    aria-current={active ? "step" : undefined}
                    className={`relative z-10 grid w-full grid-cols-[2.75rem_minmax(0,1fr)] gap-x-3 rounded-3xl px-1 py-3 text-left font-[inherit] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A6E08A] focus-visible:ring-offset-2 motion-reduce:transition-none lg:grid-cols-[3rem_minmax(0,1fr)] lg:gap-x-4 lg:px-2 ${
                      active ? "bg-white shadow-[0_8px_30px_rgb(0,0,0,0.05)]" : "hover:bg-white/50"
                    }`}
                  >
                    <span
                      className={`grid h-11 w-11 place-items-center rounded-full border font-display text-sm lg:h-12 lg:w-12 ${
                        active
                          ? "border-[#1A5336] bg-[#1A5336] text-white ring-4 ring-[#A6E08A]"
                          : past
                            ? "border-[#1A5336] bg-[#1A5336] text-white"
                            : "border-[#E2E8E4] bg-white text-[#1A5336]"
                      }`}
                    >
                      {pad(i)}
                    </span>
                    <span className="min-w-0 pt-1">
                      <span className="block text-xs font-medium uppercase tracking-[0.14em] text-[#1A5336]">{step.tag}</span>
                      <span className="mt-1 block font-display text-2xl tracking-tight text-[#0B2016] lg:text-[1.7rem] lg:leading-tight">
                        {step.title}
                      </span>
                      <span className="mt-3 block text-base leading-relaxed text-[#4A5D53]">{step.body}</span>
                    </span>
                  </button>
                </li>
              );
            })}
          </ol>
          {/* Short runway so step 05 can activate while the mattress is still fully on screen. */}
          <div className="h-8 lg:h-28" aria-hidden="true" />
          </div>
        </div>
      </div>
    </section>
  );
}
