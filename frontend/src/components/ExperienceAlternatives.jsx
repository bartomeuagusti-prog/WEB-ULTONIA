import React, { useEffect, useRef, useState } from "react";
import { Leaf, Pause, Play, QrCode } from "lucide-react";

const STEPS = [
  {
    id: "inventari",
    tag: "Inventari",
    title: "Crea i ubica el matalàs",
    body: "El responsable dona d'alta cada matalàs amb les dades del fabricant i la seva ubicació. Cada peça entra a l'inventari amb la seva identitat única.",
    kpi: "ID",
    kpiUnit: "únic",
  },
  {
    id: "vida",
    tag: "Cicle de vida",
    title: "Vida útil de 8 anys",
    body: "Cada matalàs neix amb 8 anys de vida útil que es van reduint amb l'ús real. Teixit stretch, fibres termoreguladores i viscoelàstica d'alta densitat, capa a capa.",
    kpi: "8",
    kpiUnit: "anys",
  },
  {
    id: "petjada",
    tag: "Sostenibilitat",
    title: "Petjada de carboni",
    body: "Registra la petjada de carboni i les dades clau del fabricant per entendre l'impacte real de cada matalàs dins l'economia circular.",
    kpi: "62",
    kpiUnit: "kg CO₂e",
  },
  {
    id: "manteniment",
    tag: "Allarga la vida",
    title: "Manteniment i neteja",
    body: "El nucli de molles ensacades multipunt i el marc estabilitzador. Registra accions de manteniment i neteja per allargar l'esperança de vida del producte.",
    kpi: "Registre",
    kpiUnit: "neteja",
  },
  {
    id: "reciclatge",
    tag: "Final de cicle",
    title: "Llindar i reciclatge",
    body: "En assolir el llindar crític, Benlligat recomana la substitució i activa el desmuntatge, el reciclatge i la reintroducció al mercat.",
    kpi: "Llindar",
    kpiUnit: "crític",
  },
];

const PASSPORT_FIELDS = [
  { label: "Identitat", value: "BLG-0xA9F3·2026·MTL·8Y", from: 0 },
  { label: "Fabricant", value: "Dades registrades", from: 0 },
  { label: "Ubicació", value: "Hab. 412", from: 0 },
  { label: "Vida útil", value: "8,0 anys", from: 1 },
  { label: "Petjada", value: "62 kg CO₂e", from: 2 },
  { label: "Manteniment", value: "Neteja registrada", from: 3 },
  { label: "Final de cicle", value: "Substitució i reciclatge", from: 4 },
];

const HISTORY = [
  { title: "Alta a l'inventari", meta: "Identitat única i ubicació", date: "12 març 2026", from: 0 },
  { title: "Vida útil assignada", meta: "8 anys de partida", date: "12 març 2026", from: 1 },
  { title: "Petjada registrada", meta: "Dades del fabricant", date: "18 març 2026", from: 2 },
  { title: "Manteniment i neteja", meta: "Acció registrada", date: "2 juny 2026", from: 3 },
  { title: "Llindar assolit", meta: "Desmuntatge i reciclatge", date: "10 oct. 2026", from: 4 },
];

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

function useOnScreen(ref) {
  const [onScreen, setOnScreen] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return undefined;
    const observer = new IntersectionObserver(
      ([entry]) => setOnScreen(entry.isIntersecting),
      { threshold: 0.12 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [ref]);

  return onScreen;
}

function pad(n) {
  return String(n + 1).padStart(2, "0");
}

function ProposalLabel({ children, onDark = false }) {
  return (
    <p
      className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium tracking-wide ${
        onDark
          ? "border-[#A6E08A]/30 bg-[#A6E08A]/10 text-[#A6E08A]"
          : "border-[#1A5336]/15 bg-white text-[#1A5336]"
      }`}
    >
      {children}
    </p>
  );
}

function StepArt({ index }) {
  const common = {
    viewBox: "0 0 200 112",
    className: "h-[4.5rem] w-full",
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
        <circle cx="78" cy="56" r="30" fill="#F4F8F4" stroke="#1A5336" strokeWidth="1.5" />
        <path d="M78 74c0-14 9-26 20-30-3 15-11 26-20 30z" fill="#1A5336" />
        <path d="M78 74c0-14-9-26-20-30 3 15 11 26 20 30z" fill="#1A5336" opacity="0.82" />
        <path d="M78 74V50" stroke="#A6E08A" strokeWidth="1.5" strokeLinecap="round" />
        <text x="122" y="54" fill="#0B2016" fontSize="20" fontFamily="Cabinet Grotesk, Outfit, sans-serif">
          CO₂
        </text>
        <text x="122" y="72" fill="#4A5D53" fontSize="11" fontFamily="Outfit, sans-serif">
          kg
        </text>
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
                <path d="M49.2 32.2l2 2.1 3.8-4" stroke="#A6E08A" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
              )}
              <path d={`M66 ${y + 10}h${done ? 36 : 28}`} stroke={done ? "#1A5336" : "#C5D4CB"} strokeWidth="1.6" strokeLinecap="round" />
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

function ProposalTimeline() {
  return (
    <section
      id="proposta-a"
      aria-label="Proposta A, línia de vida"
      className="scroll-mt-20 bg-[#FAFAFA] py-20 md:py-28"
      data-testid="proposta-a"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <ProposalLabel>Proposta A — Línia de vida</ProposalLabel>
        <div className="mt-6 max-w-2xl">
          <h2 className="font-display text-4xl sm:text-5xl tracking-tight text-[#0B2016] leading-[1.05]">
            El cicle, en ordre.
          </h2>
          <p className="mt-4 text-lg text-[#4A5D53] leading-relaxed">
            Cinc moments, de l'alta a l'inventari fins al reciclatge. Es llegeix de dalt a baix.
          </p>
        </div>

        <ol className="relative mt-14 max-w-5xl">
          {STEPS.map((step, i) => (
            <li
              key={step.id}
              className="relative grid grid-cols-[2.5rem_minmax(0,1fr)] md:grid-cols-[3rem_minmax(0,1fr)_11.5rem] gap-x-4 gap-y-4 md:gap-x-8 pb-12 last:pb-0"
            >
              {i < STEPS.length - 1 && (
                <span
                  className="absolute left-[1.22rem] top-10 bottom-0 w-px bg-[#D5E2DA] md:left-[1.46rem] md:top-12"
                  aria-hidden="true"
                />
              )}
              <div className="relative z-10">
                <span className="grid h-10 w-10 place-items-center rounded-full border border-[#E2E8E4] bg-white font-display text-sm text-[#1A5336] shadow-[0_4px_16px_rgb(0,0,0,0.04)] md:h-12 md:w-12">
                  {pad(i)}
                </span>
              </div>
              <div className="min-w-0 pt-1 md:pt-1.5">
                <p className="text-xs font-medium uppercase tracking-[0.14em] text-[#1A5336]">{step.tag}</p>
                <h3 className="mt-1 font-display text-2xl tracking-tight text-[#0B2016] md:text-3xl">{step.title}</h3>
                <p className="mt-3 max-w-xl text-base leading-relaxed text-[#4A5D53]">{step.body}</p>
              </div>
              <div className="col-start-2 md:col-start-3">
                <div className="grid h-24 place-items-center rounded-2xl border border-[#E2E8E4] bg-white px-3 shadow-[0_8px_30px_rgb(0,0,0,0.04)] md:h-full md:min-h-[6.5rem]">
                  <StepArt index={i} />
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function PassportCard({ step }) {
  const atThreshold = step >= 4;
  const lifeReady = step >= 1;

  return (
    <div
      id="proposta-b-passport"
      data-testid="proposta-b-passport"
      data-step={step}
      className="overflow-hidden rounded-3xl border border-[#E2E8E4] bg-white shadow-[0_8px_32px_rgb(0,0,0,0.06)]"
    >
      <div className="flex items-start justify-between gap-3 border-b border-[#E2E8E4] px-5 py-4 md:px-6">
        <div className="flex min-w-0 items-center gap-3">
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-[#1A5336] text-white">
            <Leaf className="h-4 w-4" />
          </span>
          <div className="min-w-0">
            <p className="font-display text-base tracking-tight text-[#0B2016]">Benlligat</p>
            <p className="text-xs text-[#4A5D53]">Passaport digital · exemple</p>
          </div>
        </div>
        <span
          className={`shrink-0 rounded-full px-3 py-1 text-xs font-medium ${
            atThreshold ? "bg-[#A6E08A] text-[#0B2016]" : "bg-[#E6EFE7] text-[#1A5336]"
          }`}
        >
          {atThreshold ? "Llindar crític" : "En servei"}
        </span>
      </div>

      <div className="flex items-center justify-between gap-4 px-5 py-4 md:px-6">
        <div className="min-w-0">
          <p className="text-xs uppercase tracking-[0.14em] text-[#4A5D53]">Hab. 412</p>
          <p className="mt-1 break-all font-mono text-sm text-[#1A5336]">BLG-0xA9F3·2026·MTL·8Y</p>
        </div>
        <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl border border-[#E2E8E4] text-[#1A5336]">
          <QrCode className="h-6 w-6" />
        </span>
      </div>

      <dl className="grid grid-cols-1 gap-2 px-5 sm:grid-cols-2 md:px-6">
        {PASSPORT_FIELDS.map((field) => {
          const ready = step >= field.from;
          const active = step === field.from;
          return (
            <div
              key={field.label}
              className={`rounded-2xl px-3.5 py-3 transition-colors duration-500 motion-reduce:transition-none ${
                active ? "bg-[#F3F8F1] ring-2 ring-[#A6E08A]" : "bg-[#F7F8F7]"
              }`}
            >
              <dt className="text-[11px] font-medium uppercase tracking-[0.12em] text-[#4A5D53]">{field.label}</dt>
              <dd
                className={`mt-1 text-sm font-medium leading-snug transition-colors duration-500 motion-reduce:transition-none ${
                  ready ? "text-[#0B2016]" : "text-[#4A5D53]/35"
                }`}
              >
                {ready ? field.value : "Pendent"}
              </dd>
            </div>
          );
        })}
      </dl>

      <div className="px-5 py-4 md:px-6">
        <div className="flex items-center justify-between text-xs text-[#4A5D53]">
          <span>Vida útil de partida</span>
          <span className="font-medium text-[#0B2016]">
            {!lifeReady ? "—" : atThreshold ? "Llindar crític" : "8 anys"}
          </span>
        </div>
        <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-[#E6EFE7]" aria-hidden="true">
          <div
            className="h-full rounded-full bg-[#1A5336] transition-[width] duration-700 ease-out motion-reduce:transition-none"
            style={{ width: !lifeReady ? "0%" : atThreshold ? "8%" : "100%" }}
          />
        </div>
      </div>

      <div className="border-t border-[#E2E8E4] px-5 py-4 md:px-6">
        <p className="text-xs font-medium uppercase tracking-[0.14em] text-[#4A5D53]">Historial</p>
        <ol className="mt-3 space-y-3">
          {HISTORY.map((item) => {
            const ready = step >= item.from;
            const active = step === item.from;
            return (
              <li key={item.title} className="flex items-start gap-3">
                <span
                  className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${
                    active ? "bg-[#A6E08A] ring-2 ring-[#1A5336]" : ready ? "bg-[#1A5336]" : "bg-[#D5E2DA]"
                  }`}
                  aria-hidden="true"
                />
                <div className="min-w-0 flex-1">
                  <p className={`text-sm font-medium ${ready ? "text-[#0B2016]" : "text-[#4A5D53]/40"}`}>
                    {ready ? item.title : "Pendent"}
                  </p>
                  <p className="text-xs text-[#4A5D53]">{ready ? item.meta : "Encara sense registre"}</p>
                </div>
                <p className="shrink-0 text-xs text-[#4A5D53]">{ready ? item.date : "—"}</p>
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
}

function ProposalPassport() {
  const reduced = usePrefersReducedMotion();
  const rootRef = useRef(null);
  const onScreen = useOnScreen(rootRef);
  const [step, setStep] = useState(0);
  const [paused, setPaused] = useState(false);
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    if (reduced || paused || hovering || !onScreen) return undefined;
    const id = window.setInterval(() => {
      setStep((current) => (current + 1) % STEPS.length);
    }, 4000);
    return () => window.clearInterval(id);
  }, [reduced, paused, hovering, onScreen, step]);

  const selectStep = (index) => {
    setStep(index);
    setPaused(true);
  };

  return (
    <section
      ref={rootRef}
      id="proposta-b"
      aria-label="Proposta B, passaport digital"
      className="scroll-mt-20 bg-[#F3F5F4] py-20 md:py-28"
      data-testid="proposta-b"
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <ProposalLabel>Proposta B — Passaport digital</ProposalLabel>
          {!reduced && (
            <button
              type="button"
              onClick={() => setPaused((value) => !value)}
              data-testid="proposta-b-pause"
              className="inline-flex items-center gap-2 rounded-full border border-[#E2E8E4] bg-white px-3 py-1.5 text-xs font-medium text-[#1A5336] transition-colors hover:bg-[#FAFAFA] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A6E08A] focus-visible:ring-offset-2"
            >
              {paused ? <Play className="h-3.5 w-3.5" /> : <Pause className="h-3.5 w-3.5" />}
              {paused ? "Reprèn" : "Pausa"}
            </button>
          )}
        </div>

        <div className="mt-6 max-w-2xl">
          <h2 className="font-display text-4xl sm:text-5xl tracking-tight text-[#0B2016] leading-[1.05]">
            La fitxa que veu l'hoteler.
          </h2>
          <p className="mt-4 text-lg text-[#4A5D53] leading-relaxed">
            Un passaport digital s'omple pas a pas: identitat, vida útil, petjada, manteniment i reciclatge.
          </p>
        </div>

        <div className="mt-12 grid items-start gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-14">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.14em] text-[#4A5D53]">
              Pas {pad(step)} de {pad(STEPS.length - 1)}
            </p>
            <ol className="mt-4 space-y-2">
              {STEPS.map((item, i) => {
                const active = step === i;
                return (
                  <li key={item.id}>
                    <button
                      type="button"
                      aria-pressed={active}
                      data-testid={`proposta-b-step-${item.id}`}
                      onClick={() => selectStep(i)}
                      className={`w-full rounded-2xl border px-4 py-3 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A6E08A] focus-visible:ring-offset-2 ${
                        active
                          ? "border-[#1A5336]/15 bg-white shadow-[0_8px_30px_rgb(0,0,0,0.04)]"
                          : "border-transparent bg-transparent hover:bg-white/70"
                      }`}
                    >
                      <span className="flex items-center gap-3 text-[#1A5336]">
                        <span className="font-display text-lg">{pad(i)}</span>
                        <span className="h-px w-6 bg-[#1A5336]/30" aria-hidden="true" />
                        <span className="text-xs font-medium uppercase tracking-[0.12em]">{item.tag}</span>
                      </span>
                      <span className="mt-1 block font-display text-xl tracking-tight text-[#0B2016] md:text-2xl">
                        {item.title}
                      </span>
                    </button>
                    {active && (
                      <p className="px-4 pb-2 pt-3 text-base leading-relaxed text-[#4A5D53]">{item.body}</p>
                    )}
                  </li>
                );
              })}
            </ol>
          </div>
          <PassportCard step={step} />
        </div>
      </div>
    </section>
  );
}

function ProposalIndicators() {
  const [step, setStep] = useState(0);
  const tabsRef = useRef([]);
  const current = STEPS[step];

  const move = (next) => {
    const index = (next + STEPS.length) % STEPS.length;
    setStep(index);
    tabsRef.current[index]?.focus();
  };

  const onKeyDown = (event) => {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      move(step + 1);
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      move(step - 1);
    } else if (event.key === "Home") {
      event.preventDefault();
      move(0);
    } else if (event.key === "End") {
      event.preventDefault();
      move(STEPS.length - 1);
    }
  };

  return (
    <section
      id="proposta-c"
      aria-label="Proposta C, indicadors"
      className="scroll-mt-20 bg-[#0B2016] py-20 text-white md:py-28"
      data-testid="proposta-c"
    >
      <div className="max-w-7xl mx-auto min-w-0 px-6 md:px-12">
        <ProposalLabel onDark>Proposta C — Indicadors</ProposalLabel>
        <div className="mt-6 max-w-2xl">
          <h2 className="font-display text-4xl tracking-tight leading-[1.05] sm:text-5xl">El cicle, en xifres.</h2>
          <p className="mt-4 text-lg leading-relaxed text-white/70">
            Un indicador per pas. Tria'n un per llegir què significa dins la vida del matalàs.
          </p>
        </div>

        <div
          role="tablist"
          aria-label="Passos del cicle de vida"
          onKeyDown={onKeyDown}
          className="mt-12 flex gap-3 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {STEPS.map((item, i) => {
            const active = step === i;
            const longKpi = item.kpi.length > 3;
            return (
              <button
                key={item.id}
                ref={(node) => {
                  tabsRef.current[i] = node;
                }}
                type="button"
                role="tab"
                id={`proposta-c-tab-${item.id}`}
                aria-selected={active}
                aria-controls="proposta-c-panel"
                tabIndex={active ? 0 : -1}
                data-testid={`proposta-c-step-${item.id}`}
                onClick={() => setStep(i)}
                className={`w-[9.75rem] shrink-0 snap-start rounded-2xl border px-4 py-4 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A6E08A] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B2016] md:w-auto md:min-w-0 md:flex-1 ${
                  active
                    ? "border-[#A6E08A] bg-[#A6E08A] text-[#0B2016]"
                    : "border-white/10 bg-white/[0.04] text-white hover:bg-white/[0.08]"
                }`}
              >
                <span className={`block text-[11px] font-medium uppercase tracking-[0.14em] ${active ? "text-[#0B2016]/70" : "text-white/55"}`}>
                  {pad(i)} · {item.tag}
                </span>
                <span className={`mt-3 block font-display leading-none tracking-tight ${longKpi ? "text-2xl" : "text-4xl"}`}>
                  {item.kpi}
                </span>
                <span className={`mt-2 block text-xs ${active ? "text-[#0B2016]/70" : "text-white/60"}`}>{item.kpiUnit}</span>
              </button>
            );
          })}
        </div>

        <div
          role="tabpanel"
          id="proposta-c-panel"
          aria-labelledby={`proposta-c-tab-${current.id}`}
          data-testid="proposta-c-panel"
          className="mt-10 max-w-3xl"
        >
          <div key={current.id} className="motion-safe:animate-float-up">
            <p className="font-display text-5xl tracking-tight text-[#A6E08A] sm:text-6xl">
              {current.kpi}
              <span className="ml-3 align-middle text-lg font-medium tracking-normal text-white/60">{current.kpiUnit}</span>
            </p>
            <h3 className="mt-5 font-display text-3xl tracking-tight md:text-4xl">{current.title}</h3>
            <p className="mt-4 max-w-2xl text-lg leading-relaxed text-white/70">{current.body}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

const JUMPS = [
  { href: "#proposta-a", label: "A · Línia de vida" },
  { href: "#proposta-b", label: "B · Passaport digital" },
  { href: "#proposta-c", label: "C · Indicadors" },
];

export default function ExperienceAlternatives() {
  return (
    <div id="propostes" data-testid="experience-alternatives">
      <div className="border-y border-[#1A5336]/10 bg-[#E6EFE7]">
        <div className="max-w-7xl mx-auto flex flex-col gap-4 px-6 py-5 md:flex-row md:items-center md:justify-between md:px-12">
          <div className="max-w-3xl">
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-[#1A5336]">Comparació</p>
            <p className="mt-1 text-sm leading-relaxed text-[#0B2016]/80">
              La secció de dalt es manté. Tres maneres d'explicar el mateix cicle, sense desmuntar el matalàs.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {JUMPS.map((jump) => (
              <a
                key={jump.href}
                href={jump.href}
                className="rounded-full border border-[#1A5336]/10 bg-white/80 px-3 py-1.5 text-xs font-medium text-[#1A5336] transition-colors hover:bg-white"
              >
                {jump.label}
              </a>
            ))}
          </div>
        </div>
      </div>
      <ProposalTimeline />
      <ProposalPassport />
      <ProposalIndicators />
    </div>
  );
}
