import React, { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import ContactDialog from "@/components/ContactDialog";
import Mattress3D from "@/components/Mattress3D";
import {
  DESTINATIONS,
  EOL_STEPS,
  EXAMPLE_BARS,
  EXAMPLE_FILE,
  FLOW_TILES,
  HOW_TO,
  INCIDENTS,
  MATERIALS,
  OUTCOMES,
  PILOT_STEPS,
  PRODUCT_POINTS,
  ROLES,
  SECTIONS,
  WHY_CARDS,
} from "@/pages/deckContent";

function useReducedMotion() {
  const [reduced, setReduced] = useState(() =>
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setReduced(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);
  return reduced;
}

function useFinePointer() {
  const [fine, setFine] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    const apply = () => setFine(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);
  return fine;
}

function Mark({ n }) {
  if (!n) return null;
  return (
    <sup className="ml-0.5 text-[0.65em] font-semibold text-[#0C7E7C]">
      <a
        href="#deck-sidebar"
        className="no-underline hover:underline"
        onClick={(event) => {
          const desktop = document.getElementById("deck-sidebar");
          if (desktop && desktop.getClientRects().length) {
            event.preventDefault();
            desktop.focus();
            return;
          }
          const toggle = document.querySelector("[data-testid='deck-notes-toggle']");
          if (toggle && toggle.getAttribute("aria-expanded") !== "true") toggle.click();
          event.preventDefault();
        }}
      >
        {n}
      </a>
    </sup>
  );
}

function Answer({ parts }) {
  return parts.map((part, i) =>
    part.accent ? (
      <span key={i} className="text-[#0F9D9A]">
        {part.t}
      </span>
    ) : (
      <span key={i}>{part.t}</span>
    ),
  );
}

function ExampleTag() {
  return (
    <span className="inline-flex items-center rounded-full bg-[#E6F5F4] px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#0C7E7C]">
      Dades d'exemple
    </span>
  );
}

function QHead({ kicker, question, answer }) {
  return (
    <header className="max-w-4xl">
      <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-[#0F9D9A]">{kicker}</p>
      <p className="mt-4 text-lg text-[#7B8BA0] sm:text-xl">{question}</p>
      <h2 className="mt-2 font-display text-[2.15rem] font-extrabold leading-[0.98] tracking-[-0.03em] text-[#10233A] sm:text-5xl lg:text-[3.35rem]">
        <Answer parts={answer} />
      </h2>
    </header>
  );
}

function Slide({ id, children, wide }) {
  return (
    <section
      id={`deck-${id}`}
      tabIndex={-1}
      data-testid={`deck-section-${id}`}
      className="min-h-[calc(100dvh-4rem)] scroll-mt-16 border-b border-[#E3E8EF] px-5 py-14 outline-none sm:px-8 lg:px-14 lg:py-20"
    >
      <div className={wide ? "mx-auto max-w-6xl" : "mx-auto max-w-5xl"}>{children}</div>
    </section>
  );
}

function RevealTiles({ items, reduced, testId, columns = "xl:grid-cols-4" }) {
  const fine = useFinePointer();
  const [open, setOpen] = useState(null);
  return (
    <div className={`mt-10 grid gap-3 sm:grid-cols-2 ${columns}`} data-testid={testId}>
      {items.map((item, i) => {
        const shown = open === i;
        return (
          <button
            key={item.title}
            type="button"
            aria-expanded={shown}
            onMouseEnter={() => {
              if (fine) setOpen(i);
            }}
            onMouseLeave={() => {
              if (fine) setOpen((cur) => (cur === i ? null : cur));
            }}
            onFocus={() => setOpen(i)}
            onBlur={() => setOpen((cur) => (cur === i ? null : cur))}
            onClick={() => setOpen((cur) => (cur === i ? null : i))}
            className="flex min-h-[210px] flex-col rounded-3xl border border-[#E3E8EF] bg-white p-5 text-left shadow-[0_1px_2px_rgba(16,35,58,0.04)] transition-colors hover:border-[#0F9D9A] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0F9D9A]"
          >
            <span className="grid h-8 w-8 place-items-center rounded-full bg-[#10233A] text-sm font-semibold text-white">
              {i + 1}
            </span>
            <span className="mt-5 font-display text-2xl font-extrabold tracking-tight text-[#10233A]">
              {item.title}
            </span>
            <span className="relative mt-3 min-h-[4.5rem]">
              <span
                className={[
                  "block text-sm leading-relaxed text-[#5E6E82]",
                  shown ? "hidden" : "block",
                  !reduced ? "transition-opacity" : "",
                ].join(" ")}
              >
                {item.teaser}
              </span>
              <span
                className={[
                  "text-sm leading-relaxed text-[#10233A]",
                  shown ? "block" : "hidden",
                ].join(" ")}
              >
                {item.detail}
              </span>
            </span>
          </button>
        );
      })}
    </div>
  );
}

function ExampleBars({ reduced }) {
  const ref = useRef(null);
  const [shown, setShown] = useState(reduced);
  useEffect(() => {
    if (reduced) {
      setShown(true);
      return undefined;
    }
    const el = ref.current;
    if (!el) return undefined;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setShown(true);
      },
      { threshold: 0.25 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [reduced]);

  const max = Math.max(...EXAMPLE_BARS.map((row) => row.value));
  return (
    <div ref={ref} data-testid="deck-chart" className="mt-4 space-y-5">
      {EXAMPLE_BARS.map((row, i) => {
        const accent = i === EXAMPLE_BARS.length - 1;
        return (
          <div key={row.label} className="grid items-center gap-x-4 gap-y-1 sm:grid-cols-[13.5rem_1fr_auto]">
            <div>
              <div className="font-medium text-[#10233A]">{row.label}</div>
              <div className="text-sm text-[#7B8BA0]">{row.note}</div>
            </div>
            <div className="h-8 overflow-hidden rounded-full bg-[#EEF2F6]">
              <div
                className={accent ? "h-8 rounded-full bg-[#0F9D9A]" : "h-8 rounded-full bg-[#10233A]"}
                style={{
                  width: shown ? `${(row.value / max) * 100}%` : "0%",
                  transition: reduced ? "none" : "width 800ms cubic-bezier(.22,1,.36,1)",
                  transitionDelay: reduced ? "0ms" : `${i * 70}ms`,
                }}
              />
            </div>
            <div
              className={
                accent
                  ? "font-display text-4xl font-extrabold tracking-tight text-[#0F9D9A]"
                  : "font-display text-4xl font-extrabold tracking-tight text-[#10233A]"
              }
            >
              {row.value}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function SidebarBody({ section }) {
  if (section.sidebar === "howto") {
    return (
      <div>
        <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#5E6E82]">
          Com llegir aquest deck
        </p>
        <ol className="mt-6 space-y-5">
          {HOW_TO.map((item, i) => (
            <li key={item.title} className="text-sm leading-relaxed text-[#3E5168]">
              <span className="mb-1 flex items-center gap-2 font-medium text-[#10233A]">
                <span className="grid h-5 w-5 place-items-center rounded-full bg-[#E6F5F4] text-[11px] font-semibold text-[#0C7E7C]">
                  {i + 1}
                </span>
                {item.title}
              </span>
              {item.body}
            </li>
          ))}
        </ol>
        <div className="mt-8 border-t border-[#E3E8EF] pt-5">
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#5E6E82]">
            Nota d'aquesta portada
          </p>
          {section.notes.map((note) => (
            <p key={note.n} className="mt-3 text-sm leading-relaxed text-[#3E5168]">
              <span className="font-semibold text-[#0C7E7C]">{note.n} </span>
              {note.text}
            </p>
          ))}
          <p className="mt-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#8A97A8]">
            [font pendent]
          </p>
        </div>
      </div>
    );
  }

  if (section.sidebar === "next") {
    return (
      <div>
        <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#5E6E82]">
          Següent pas
        </p>
        <p className="mt-4 text-sm leading-relaxed text-[#3E5168]">
          La demo obre el formulari de contacte de la web. No cal sortir del deck.
        </p>
        <p className="mt-4 text-sm leading-relaxed text-[#3E5168]">
          Fletxa amunt o Re Pàg tornen a la secció anterior.
        </p>
      </div>
    );
  }

  return (
    <div>
      <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#5E6E82]">
        Fonts i notes
      </p>
      <p className="mt-2 text-xs text-[#8A97A8]">
        {section.id} · {section.nav}
      </p>
      <ol className="mt-6 space-y-5">
        {section.notes.map((note) => (
          <li key={note.n} className="text-sm leading-relaxed text-[#3E5168]">
            <span className="font-semibold text-[#0C7E7C]">{note.n} </span>
            {note.text}
            {note.pending ? (
              <span className="mt-2 block text-[11px] font-semibold uppercase tracking-[0.14em] text-[#8A97A8]">
                [font pendent]
              </span>
            ) : (
              <span className="mt-2 block text-[11px] font-semibold uppercase tracking-[0.14em] text-[#0C7E7C]">
                Fet general
              </span>
            )}
          </li>
        ))}
      </ol>
    </div>
  );
}

function Logo() {
  return (
    <span className="flex items-center gap-2.5">
      <span className="grid h-8 w-8 place-items-center rounded-lg bg-[#10233A] text-white" aria-hidden="true">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <rect x="2" y="2" width="5" height="5" rx="1" fill="#5EE0DC" />
          <rect x="9" y="2" width="5" height="5" rx="1" fill="white" />
          <rect x="2" y="9" width="5" height="5" rx="1" fill="white" />
          <rect x="9" y="9" width="2.2" height="2.2" rx="0.4" fill="#5EE0DC" />
          <rect x="12.2" y="12.2" width="1.8" height="1.8" rx="0.3" fill="#5EE0DC" />
        </svg>
      </span>
      <span className="font-display text-lg font-extrabold tracking-tight text-[#10233A]">Benlligat</span>
    </span>
  );
}

export default function Deck() {
  const reduced = useReducedMotion();
  const [active, setActive] = useState(0);
  const [contactOpen, setContactOpen] = useState(false);
  const [notesOpen, setNotesOpen] = useState(false);
  const indexRef = useRef(0);
  const lockRef = useRef(false);
  const lockTimer = useRef(0);
  const explodeRef = useRef(0.72);
  const section = SECTIONS[active];

  useEffect(() => {
    const previous = document.title;
    document.title = "Benlligat · Deck hospitals";
    return () => {
      document.title = previous;
    };
  }, []);

  useEffect(() => {
    const sync = () => {
      const line = 96;
      let current = 0;
      SECTIONS.forEach((item, i) => {
        const el = document.getElementById(`deck-${item.id}`);
        if (el && el.getBoundingClientRect().top <= line) current = i;
      });
      indexRef.current = current;
      setActive((prev) => (prev === current ? prev : current));
    };
    const onScroll = () => {
      if (lockRef.current) return;
      sync();
    };
    const release = () => {
      lockRef.current = false;
      sync();
    };
    sync();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("scrollend", release);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("scrollend", release);
    };
  }, []);

  const go = useCallback(
    (index) => {
      const next = Math.max(0, Math.min(SECTIONS.length - 1, index));
      indexRef.current = next;
      lockRef.current = true;
      setActive(next);
      const el = document.getElementById(`deck-${SECTIONS[next].id}`);
      if (!el) return;
      el.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" });
      window.clearTimeout(lockTimer.current);
      lockTimer.current = window.setTimeout(() => {
        lockRef.current = false;
      }, reduced ? 80 : 1400);
    },
    [reduced],
  );

  useEffect(() => {
    const onKey = (event) => {
      if (event.metaKey || event.ctrlKey || event.altKey) return;
      if (contactOpen || document.querySelector("[role='dialog']")) return;
      const tag = document.activeElement?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return;
      if (document.activeElement?.isContentEditable) return;
      const key = event.key;
      if (key !== "ArrowDown" && key !== "ArrowUp" && key !== "PageDown" && key !== "PageUp") return;
      event.preventDefault();
      const delta = key === "ArrowDown" || key === "PageDown" ? 1 : -1;
      go(indexRef.current + delta);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [contactOpen, go]);

  const openContact = () => setContactOpen(true);

  return (
    <div className="deck-root min-h-screen bg-[#F5F7FA] text-[#10233A]" data-testid="deck-root" data-active={section.id}>
      <header className="sticky top-0 z-40 border-b border-[#E3E8EF] bg-[#F5F7FA]/95 backdrop-blur">
        <div className="flex h-16 items-center gap-3 px-4 sm:px-6">
          <Link to="/" className="shrink-0 rounded-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#0F9D9A]" aria-label="Benlligat, torna a l'inici">
            <Logo />
          </Link>
          <span className="hidden shrink-0 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#7B8BA0] sm:inline">
            Hospitals
          </span>
          <nav
            aria-label="Seccions del deck"
            data-testid="deck-progress"
            className="deck-scroll flex min-w-0 flex-1 items-center gap-1 overflow-x-auto px-1"
          >
            {SECTIONS.map((item, i) => {
              const on = i === active;
              return (
                <button
                  key={item.id}
                  type="button"
                  aria-current={on ? "true" : undefined}
                  onClick={() => go(i)}
                  className={
                    on
                      ? "inline-flex shrink-0 items-center rounded-full bg-[#10233A] py-1.5 pl-2.5 pr-3 text-[11px] font-semibold tracking-wide text-white"
                      : "inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[11px] font-semibold text-[#5E6E82] hover:bg-[#E7ECF1]"
                  }
                >
                  <span>{item.id}</span>
                  {on ? <span className="ml-2 uppercase tracking-[0.14em]">{item.nav}</span> : null}
                </button>
              );
            })}
          </nav>
          <span className="hidden shrink-0 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#8A97A8] xl:inline">
            Confidencial
          </span>
          <button
            type="button"
            onClick={openContact}
            data-testid="deck-demo-button"
            className="shrink-0 rounded-full bg-[#0F9D9A] px-3 py-2 text-sm font-medium text-white hover:bg-[#0C7E7C] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#10233A] sm:px-4"
          >
            <span className="sm:hidden">Demo</span>
            <span className="hidden sm:inline">Demana una demo</span>
          </button>
        </div>
      </header>

      <div className="lg:grid lg:grid-cols-[240px_minmax(0,1fr)]">
        <aside className="hidden border-r border-[#E3E8EF] bg-[#EEF2F6] lg:block">
          <div
            id="deck-sidebar"
            tabIndex={-1}
            data-testid="deck-sidebar"
            className="sticky top-16 h-[calc(100dvh-4rem)] overflow-y-auto px-6 py-8 outline-none"
          >
            <SidebarBody section={section} />
          </div>
        </aside>

        <div>
          <div className="sticky top-16 z-30 border-b border-[#E3E8EF] bg-[#EEF2F6] lg:hidden">
            <button
              type="button"
              aria-expanded={notesOpen}
              data-testid="deck-notes-toggle"
              onClick={() => setNotesOpen((open) => !open)}
              className="flex w-full items-center justify-between px-5 py-3 text-left text-[11px] font-semibold uppercase tracking-[0.16em] text-[#5E6E82]"
            >
              {section.sidebar === "howto"
                ? "Com llegir aquest deck"
                : section.sidebar === "next"
                  ? "Següent pas"
                  : "Fonts i notes"}
              <span aria-hidden="true">{notesOpen ? "−" : "+"}</span>
            </button>
            {notesOpen ? (
              <div className="max-h-64 overflow-y-auto px-5 pb-4" data-testid="deck-notes-panel">
                <SidebarBody section={section} />
              </div>
            ) : null}
          </div>

          <Slide id="00" wide>
            <div className="grid items-end gap-10 lg:grid-cols-[minmax(0,1.35fr)_minmax(280px,0.85fr)]">
              <div>
                <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-[#0F9D9A]">
                  Benlligat · Hospitals
                </p>
                <h1 className="mt-5 max-w-3xl font-display text-[2.6rem] font-extrabold leading-[0.96] tracking-[-0.035em] text-[#10233A] sm:text-6xl lg:text-[4.35rem]">
                  El control del matalàs hospitalari,{" "}
                  <span className="text-[#0F9D9A]">de la planta a la baixa.</span>
                </h1>
                <p className="mt-6 max-w-xl text-base leading-relaxed text-[#3E5168] sm:text-lg">
                  Plataforma per a la gestió circular d'actius físics. El primer és el matalàs:
                  identitat, inspecció, manteniment i fi de vida. El mateix esquema es pot estendre
                  a mobiliari, tèxtils i equipament.
                </p>
                <p className="mt-4 max-w-xl text-sm leading-relaxed text-[#5E6E82]">
                  Per a direcció, hoteleria, manteniment, compres i sostenibilitat.
                </p>
              </div>
              <aside className="rounded-3xl border border-[#E3E8EF] bg-white p-6 shadow-[0_1px_2px_rgba(16,35,58,0.04)] sm:p-7">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#0F9D9A]">
                    Inventari d'exemple
                  </p>
                  <ExampleTag />
                </div>
                <p className="mt-5 font-display text-6xl font-extrabold tracking-tight text-[#10233A] sm:text-7xl">
                  128
                  <Mark n={1} />
                </p>
                <p className="mt-1 text-[#5E6E82]">matalassos en una planta</p>
                <div className="mt-6 grid grid-cols-3 gap-3 border-t border-[#E3E8EF] pt-5">
                  {[
                    ["96", "En servei"],
                    ["22", "En revisió"],
                    ["10", "De baixa"],
                  ].map(([value, label]) => (
                    <div key={label} className="border-l-2 border-[#0F9D9A] pl-3">
                      <div className="font-display text-2xl font-extrabold text-[#10233A]">{value}</div>
                      <div className="text-xs text-[#5E6E82]">{label}</div>
                    </div>
                  ))}
                </div>
                <p className="mt-5 text-sm leading-relaxed text-[#7B8BA0]">
                  Cap d'aquestes xifres és d'un centre real. Serveixen per ensenyar el format.
                </p>
              </aside>
            </div>
          </Slide>

          <Slide id="01">
            <QHead kicker={SECTIONS[1].kicker} question={SECTIONS[1].question} answer={SECTIONS[1].answer} />
            <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {WHY_CARDS.map((card) => (
                <article key={card.title} className="rounded-3xl border border-[#E3E8EF] bg-white p-5">
                  <h3 className="font-display text-xl font-extrabold tracking-tight">
                    {card.title}
                    <Mark n={card.n} />
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#3E5168]">{card.body}</p>
                </article>
              ))}
            </div>
          </Slide>

          <Slide id="02">
            <QHead kicker={SECTIONS[2].kicker} question={SECTIONS[2].question} answer={SECTIONS[2].answer} />
            <div className="mt-10 grid gap-3 sm:grid-cols-2">
              {PRODUCT_POINTS.map((point) => (
                <article key={point.title} className="rounded-3xl border border-[#E3E8EF] bg-white px-5 py-4">
                  <h3 className="font-display text-lg font-extrabold tracking-tight">
                    {point.title}
                    <Mark n={point.n} />
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-[#3E5168]">{point.body}</p>
                </article>
              ))}
            </div>
            <p className="mt-6 max-w-3xl rounded-3xl border border-[#E3E8EF] bg-white px-5 py-4 text-sm leading-relaxed text-[#3E5168]">
              El passaport de Benlligat s'alinea amb aquests principis d'identitat i traçabilitat.
              No presentem el passaport digital europeu com un requisit ja vigent per a tots els matalassos.
              <Mark n={2} />
            </p>
          </Slide>

          <Slide id="03" wide>
            <QHead kicker={SECTIONS[3].kicker} question={SECTIONS[3].question} answer={SECTIONS[3].answer} />
            <p className="mt-4 max-w-2xl text-sm text-[#5E6E82]">
              Passa el ratolí per damunt d'un pas, o toca'l, per llegir el detall.
              <Mark n={1} />
            </p>
            <RevealTiles items={FLOW_TILES} reduced={reduced} testId="deck-flow-tiles" />
          </Slide>

          <Slide id="04">
            <QHead kicker={SECTIONS[4].kicker} question={SECTIONS[4].question} answer={SECTIONS[4].answer} />
            <div className="mt-10 grid items-start gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(260px,0.85fr)]">
              <div className="grid gap-3 sm:grid-cols-2">
                {INCIDENTS.map((item) => (
                  <article key={item.title} className="rounded-3xl border border-[#E3E8EF] bg-white p-5">
                    <h3 className="font-display text-xl font-extrabold tracking-tight">{item.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-[#3E5168]">{item.body}</p>
                  </article>
                ))}
                <article className="rounded-3xl border border-[#E3E8EF] bg-[#10233A] p-5 text-white sm:col-span-2">
                  <h3 className="font-display text-xl font-extrabold tracking-tight">Ronda i vida útil</h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/75">
                    Les inspeccions es programen. Cada registre actualitza l'estat i la vida útil estimada,
                    també quan una intervenció l'allarga.
                    <Mark n={1} />
                  </p>
                </article>
              </div>
              <article className="rounded-3xl border border-[#E3E8EF] bg-white p-5" data-testid="deck-example-file">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#0F9D9A]">
                    Fitxa de disseny
                  </p>
                  <ExampleTag />
                </div>
                <dl className="mt-4 divide-y divide-[#E3E8EF]">
                  {EXAMPLE_FILE.map(([label, value]) => (
                    <div key={label} className="grid grid-cols-[7.5rem_1fr] gap-3 py-2.5 text-sm">
                      <dt className="text-[#7B8BA0]">{label}</dt>
                      <dd className="font-medium text-[#10233A]">{value}</dd>
                    </div>
                  ))}
                </dl>
                <p className="mt-2 text-xs text-[#8A97A8]">
                  Pantalla de disseny amb dades d'exemple.
                  <Mark n={2} />
                </p>
              </article>
            </div>
          </Slide>

          <Slide id="05">
            <QHead kicker={SECTIONS[5].kicker} question={SECTIONS[5].question} answer={SECTIONS[5].answer} />
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {OUTCOMES.map((item) => (
                <article key={item.title} className="rounded-3xl border border-[#E3E8EF] bg-white p-5">
                  <h3 className="font-display text-xl font-extrabold tracking-tight">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#3E5168]">{item.body}</p>
                </article>
              ))}
            </div>
            <article className="mt-4 rounded-3xl border border-[#E3E8EF] bg-white p-5 sm:p-7">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h3 className="font-display text-2xl font-extrabold tracking-tight">
                    Destí de les baixes, un any d'exemple
                    <Mark n={1} />
                  </h3>
                  <p className="mt-1 text-sm text-[#5E6E82]">Unitats il·lustratives. No és un centre real.</p>
                </div>
                <ExampleTag />
              </div>
              <ExampleBars reduced={reduced} />
              <p className="mt-6 border-t border-[#E3E8EF] pt-4 text-sm leading-relaxed text-[#3E5168]">
                Quan el centre tingui estoc real, l'informe substitueix aquestes barres. Els kg desviats i el CO₂
                evitat surten d'aquelles baixes, per a la memòria de sostenibilitat.
                <Mark n={2} />
              </p>
            </article>
          </Slide>

          <Slide id="06">
            <QHead kicker={SECTIONS[6].kicker} question={SECTIONS[6].question} answer={SECTIONS[6].answer} />
            <div className="mt-10 grid gap-3 lg:grid-cols-3">
              {EOL_STEPS.map((step) => (
                <article key={step.n} className="rounded-3xl border border-[#E3E8EF] bg-white p-5">
                  <span className="font-display text-3xl font-extrabold text-[#0F9D9A]">{step.n}</span>
                  <h3 className="mt-3 font-display text-2xl font-extrabold tracking-tight">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#3E5168]">{step.body}</p>
                </article>
              ))}
            </div>
            <div className="mt-4 rounded-3xl border border-[#E3E8EF] bg-white p-5">
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#5E6E82]">Cinc destins</p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {DESTINATIONS.map((name) => (
                  <li key={name} className="rounded-full border border-[#E3E8EF] px-3 py-1.5 text-sm font-medium">
                    {name}
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-sm leading-relaxed text-[#3E5168]">
                L'estat higiènic decideix si la unitat es pot reutilitzar o només se'n recuperen materials.
                Cada traspàs queda amb qui el rep i amb quin document.
                <Mark n={1} />
                <Mark n={2} />
              </p>
            </div>
          </Slide>

          <Slide id="07" wide>
            <QHead kicker={SECTIONS[7].kicker} question={SECTIONS[7].question} answer={SECTIONS[7].answer} />
            <div className="mt-10 grid items-start gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(280px,0.9fr)]">
              <div className="grid gap-3 sm:grid-cols-2">
                {MATERIALS.map((item) => (
                  <article key={item.title} className="rounded-3xl border border-[#E3E8EF] bg-white p-5">
                    <h3 className="font-display text-xl font-extrabold tracking-tight">{item.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-[#3E5168]">{item.body}</p>
                  </article>
                ))}
              </div>
              <div>
                <div className="relative h-[340px] overflow-hidden rounded-3xl border border-[#E3E8EF] bg-white lg:h-[460px]">
                  <Mattress3D explodeRef={explodeRef} reducedMotion={reduced} />
                </div>
                <p className="mt-3 text-sm leading-relaxed text-[#5E6E82]">
                  Vista de capes per ensenyar que un matalàs no és un sol material. El passaport ha de poder dir
                  què porta aquella unitat, quan es conegui.
                  <Mark n={1} />
                  <Mark n={2} />
                </p>
              </div>
            </div>
          </Slide>

          <Slide id="08" wide>
            <QHead kicker={SECTIONS[8].kicker} question={SECTIONS[8].question} answer={SECTIONS[8].answer} />
            <p className="mt-4 max-w-2xl text-sm text-[#5E6E82]">
              Passa el ratolí o toca un rol.
              <Mark n={1} />
            </p>
            <RevealTiles items={ROLES} reduced={reduced} testId="deck-role-tiles" columns="lg:grid-cols-3" />
          </Slide>

          <Slide id="09">
            <QHead kicker={SECTIONS[9].kicker} question={SECTIONS[9].question} answer={SECTIONS[9].answer} />
            <ol className="mt-10 space-y-3">
              {PILOT_STEPS.map((step) => (
                <li key={step.n} className="grid gap-3 rounded-3xl border border-[#E3E8EF] bg-white p-5 sm:grid-cols-[4rem_1fr] sm:items-start">
                  <span className="font-display text-3xl font-extrabold text-[#0F9D9A]">{step.n}</span>
                  <div>
                    <h3 className="font-display text-2xl font-extrabold tracking-tight">{step.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-[#3E5168]">{step.body}</p>
                  </div>
                </li>
              ))}
            </ol>
            <p className="mt-4 text-sm text-[#5E6E82]">
              Sense preu i sense calendari tancat en aquest deck.
              <Mark n={1} />
            </p>
          </Slide>

          <Slide id="10" wide>
            <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(280px,0.8fr)]">
              <div>
                <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-[#0F9D9A]">Gràcies</p>
                <h2 className="mt-4 font-display text-[2.8rem] font-extrabold leading-[0.96] tracking-[-0.035em] sm:text-6xl lg:text-[4.4rem]">
                  Gràcies pel teu <span className="text-[#0F9D9A]">temps.</span>
                </h2>
                <p className="mt-6 max-w-xl text-lg leading-relaxed text-[#3E5168]">
                  Si vols seguir la conversa, demana una demo. És el mateix formulari de la web.
                </p>
              </div>
              <article className="rounded-3xl border border-[#E3E8EF] bg-white p-6 sm:p-7">
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#0F9D9A]">Contacte</p>
                <h3 className="mt-3 font-display text-3xl font-extrabold tracking-tight">Demana una demo</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#5E6E82]">
                  Direcció, hoteleria, manteniment, compres o sostenibilitat. Explica des de quina planta voldríeu començar.
                </p>
                <button
                  type="button"
                  onClick={openContact}
                  data-testid="deck-thanks-demo"
                  className="mt-6 w-full rounded-full bg-[#0F9D9A] py-3 text-base font-medium text-white hover:bg-[#0C7E7C]"
                >
                  Demana una demo
                </button>
                <div className="mt-6 border-t border-[#E3E8EF] pt-5">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#8A97A8]">Web</p>
                  <div className="mt-2 flex items-center justify-between gap-3">
                    <span className="font-medium">Pàgina principal</span>
                    <Link to="/" className="text-sm font-semibold text-[#0C7E7C] hover:underline">
                      Obrir
                    </Link>
                  </div>
                </div>
              </article>
            </div>
          </Slide>
        </div>
      </div>

      <ContactDialog open={contactOpen} onOpenChange={setContactOpen} />
    </div>
  );
}
