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

// Midpoint of each explode band the previous section used: floor(e * 5).
const STEP_POSE = [0.1, 0.3, 0.5, 0.7, 0.9];

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
    const mattress = Math.min(Math.max(window.innerHeight * 0.32, 200), 260);
    return 64 + mattress + 36;
  }
  return Math.min(window.innerHeight * 0.4, 440);
}

function StepArt({ index }) {
  const common = {
    viewBox: "0 0 200 112",
    className: "h-16 w-full",
    fill: "none",
    "aria-hidden": true,
    focusable: "false",
  };

  if (index === 0) {
    return (
      <svg {...common}>
        <rect x="34" y="34" width="108" height="56" rx="12" fill="#F7FAF7" stroke="#1A5336" strokeWidth="1.5" />
        <path d="M34 52h108" stroke="#1A5336" strokeWidth="1.25" />
        <path d="M62 34v56M90 34v56M118 34v56" stroke="#A6E08A" strokeWidth="1.6" />
        <rect x="46" y="64" width="40" height="14" rx="4" fill="#fff" stroke="#1A5336" strokeWidth="1" />
        <path d="M54 71h24" stroke="#1A5336" strokeWidth="1.2" strokeLinecap="round" />
        <path
          d="M158 20c-6.4 0-11 4.8-11 10.7 0 7.8 11 16.8 11 16.8s11-9 11-16.8C169 24.8 164.4 20 158 20z"
          fill="#1A5336"
        />
        <circle cx="158" cy="30.5" r="3.4" fill="#A6E08A" />
      </svg>
    );
  }

  if (index === 1) {
    return (
      <svg {...common}>
        <rect x="22" y="48" width="156" height="10" rx="5" fill="#E6EFE7" />
        <rect x="22" y="48" width="156" height="10" rx="5" fill="#1A5336" />
        {Array.from({ length: 9 }).map((_, i) => (
          <path
            key={i}
            d={`M${22 + i * 19.5} 66v8`}
            stroke={i === 8 ? "#1A5336" : "#C5D4CB"}
            strokeWidth="1.4"
            strokeLinecap="round"
          />
        ))}
        <text x="22" y="92" fill="#4A5D53" fontSize="11" fontFamily="Outfit, sans-serif">
          0
        </text>
        <text x="178" y="92" textAnchor="end" fill="#1A5336" fontSize="13" fontFamily="Outfit, sans-serif" fontWeight="600">
          8 anys
        </text>
      </svg>
    );
  }

  if (index === 2) {
    return (
      <svg {...common}>
        <circle cx="100" cy="56" r="30" fill="#F4F8F4" stroke="#1A5336" strokeWidth="1.5" />
        <path d="M100 74c0-14 9-26 20-30-3 15-11 26-20 30z" fill="#1A5336" />
        <path d="M100 74c0-14-9-26-20-30 3 15 11 26 20 30z" fill="#1A5336" opacity="0.82" />
        <path d="M100 74V50" stroke="#A6E08A" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    );
  }

  if (index === 3) {
    return (
      <svg {...common}>
        {[0, 1, 2].map((row) => {
          const y = 22 + row * 26;
          const done = row === 0;
          return (
            <g key={row} opacity={done ? 1 : 0.45}>
              <rect x="36" y={y} width="128" height="20" rx="6" fill="#fff" stroke="#E2E8E4" />
              <circle cx="52" cy={y + 10} r="5.5" fill={done ? "#1A5336" : "none"} stroke="#1A5336" strokeWidth="1.2" />
              {done && (
                <path
                  d={`M49.2 ${y + 10.2}l2 2.1 3.8-4`}
                  stroke="#A6E08A"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              )}
              <path
                d={`M66 ${y + 10}h${done ? 36 : 28}`}
                stroke={done ? "#1A5336" : "#C5D4CB"}
                strokeWidth="1.6"
                strokeLinecap="round"
              />
            </g>
          );
        })}
      </svg>
    );
  }

  return (
    <svg {...common}>
      <path d="M64 70c2-22 58-26 70-4" stroke="#1A5336" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M128 58l10 6-10 2" fill="#1A5336" />
      <path d="M136 74c-2 20-56 24-70 2" stroke="#1A5336" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M72 84l-10-8 8-4" fill="#1A5336" />
      <rect x="84" y="48" width="32" height="20" rx="5" fill="#fff" stroke="#1A5336" strokeWidth="1.4" />
      <path d="M84 56h32" stroke="#A6E08A" strokeWidth="1.6" />
      <path d="M96 48v20M108 48v20" stroke="#E6EFE7" strokeWidth="1.4" />
    </svg>
  );
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

      const current = nodes[active].getBoundingClientRect();
      const nextTop =
        active < STEPS.length - 1 ? nodes[active + 1].getBoundingClientRect().top : current.top + current.height;
      const span = Math.max(1, nextTop - current.top);
      const local = Math.min(1, Math.max(0, (y + 16 - current.top) / span));
      const scrub = Math.min(1, (active + local) / STEPS.length);
      explodeRef.current = reduced ? STEP_POSE[active] : scrub;

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
  }, [reduced]);

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
            className="sticky top-16 z-20 -mx-6 mb-2 h-[32vh] min-h-[200px] max-h-[260px] self-start border-b border-[#E2E8E4] bg-[#F4F7F4]/95 px-6 shadow-[0_10px_24px_rgb(11,32,22,0.05)] backdrop-blur-md lg:order-2 lg:z-10 lg:mx-0 lg:mb-0 lg:h-[calc(100vh-6.5rem)] lg:max-h-none lg:min-h-0 lg:w-[44%] lg:shrink-0 lg:border-0 lg:bg-transparent lg:px-0 lg:shadow-none lg:backdrop-blur-none lg:top-24"
            data-testid="experience-canvas-wrap"
          >
            <div className="relative h-full">
              <Mattress3D explodeRef={explodeRef} reducedMotion={reduced} />
              <div className="pointer-events-none absolute bottom-2 left-1/2 flex -translate-x-1/2 items-center gap-2 whitespace-nowrap rounded-full bg-white/70 px-3 py-1.5 text-[11px] text-[#4A5D53] backdrop-blur-sm lg:bottom-4 lg:text-xs">
                <MousePointer2 className="h-3.5 w-3.5" />
                Arrossega per girar · desplaça't per desmuntar
              </div>
            </div>
          </div>

          <ol className="min-w-0 lg:order-1 lg:min-w-0 lg:flex-1 lg:pt-2">
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
                  className="relative pb-8 last:pb-0 lg:pb-[16vh]"
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
                    className={`relative z-10 grid w-full grid-cols-[2.75rem_minmax(0,1fr)] gap-x-3 gap-y-3 rounded-3xl px-1 py-3 text-left font-[inherit] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A6E08A] focus-visible:ring-offset-2 motion-reduce:transition-none lg:grid-cols-[3rem_minmax(0,1fr)_8.5rem] lg:gap-x-4 lg:px-2 ${
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
                      <span className="mt-3 block max-w-xl text-base leading-relaxed text-[#4A5D53]">{step.body}</span>
                    </span>
                    <span
                      className={`col-start-2 grid h-[4.75rem] place-items-center rounded-2xl border border-[#E2E8E4] bg-[#F7FAF7] px-2 lg:col-start-3 lg:h-auto lg:min-h-[6.5rem] ${
                        active ? "" : "opacity-70"
                      }`}
                    >
                      <StepArt index={i} />
                    </span>
                  </button>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
