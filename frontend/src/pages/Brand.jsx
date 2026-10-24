import { useEffect, useState } from "react";
import {
  BARS,
  CONTRAST,
  DOCLINES,
  DOWNLOADS,
  INDEX,
  NAV,
  SUPPORT,
  TINTS,
  TONES,
} from "@/pages/brandData";

const DISPLAY = "font-display font-medium tracking-tighter leading-[0.95] text-[#0B2016]";
const CARD_TITLE = "font-display font-medium tracking-tight leading-[1.1] text-[#0B2016]";

const LEAF =
  '<path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/>';

const ICONS = [
  ["Fulla", LEAF, true],
  ["QR", '<rect width="5" height="5" x="3" y="3" rx="1"/><rect width="5" height="5" x="16" y="3" rx="1"/><rect width="5" height="5" x="3" y="16" rx="1"/><path d="M21 16h-3a2 2 0 0 0-2 2v3"/><path d="M21 21v.01"/><path d="M12 7v3a2 2 0 0 1-2 2H7"/><path d="M3 12h.01"/><path d="M12 3h.01"/><path d="M12 16v.01"/><path d="M16 12h1"/><path d="M21 12v.01"/><path d="M12 21v-1"/>', false],
  ["Reciclar", '<path d="M7 19H4.815a1.83 1.83 0 0 1-1.57-.881 1.785 1.785 0 0 1-.004-1.784L7.196 9.5"/><path d="M11 19h8.203a1.83 1.83 0 0 0 1.556-.89 1.784 1.784 0 0 0 0-1.775l-1.226-2.12"/><path d="m14 16-3 3 3 3"/><path d="M8.293 13.596 7.196 9.5 3.1 10.598"/><path d="m9.344 5.811 1.093-1.892A1.83 1.83 0 0 1 11.985 3a1.784 1.784 0 0 1 1.546.888l3.943 6.843"/><path d="m13.378 9.633 4.096 1.098 1.097-4.096"/>', false],
  ["Inspecció", '<path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>', false],
  ["Llit", '<path d="M2 4v16"/><path d="M2 8h18a2 2 0 0 1 2 2v10"/><path d="M2 17h20"/><path d="M6 8v9"/>', false],
];

function useNoIndex() {
  useEffect(() => {
    const existing = document.querySelector('meta[name="robots"]');
    const meta = existing || document.createElement("meta");
    const previous = existing ? existing.getAttribute("content") : null;
    if (!existing) {
      meta.setAttribute("name", "robots");
      document.head.appendChild(meta);
    }
    meta.setAttribute("content", "noindex");
    const previousTitle = document.title;
    document.title = "Benlligat · Brand Book";
    return () => {
      if (!existing) meta.remove();
      else if (previous == null) meta.removeAttribute("content");
      else meta.setAttribute("content", previous);
      document.title = previousTitle;
    };
  }, []);
}

function useActiveSection() {
  const [active, setActive] = useState(NAV[0].id);
  useEffect(() => {
    const nodes = NAV.map((item) => document.getElementById(item.id)).filter(Boolean);
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target?.id) setActive(visible.target.id);
      },
      { rootMargin: "-15% 0px -55% 0px", threshold: [0.15, 0.4, 0.7] },
    );
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);
  return active;
}

async function copyText(value) {
  try {
    await navigator.clipboard.writeText(value);
  } catch {
    const area = document.createElement("textarea");
    area.value = value;
    document.body.appendChild(area);
    area.select();
    document.execCommand("copy");
    area.remove();
  }
}

function Hex({ hex, className = "", light = false }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      type="button"
      onClick={() => {
        copyText(hex);
        setCopied(true);
        window.setTimeout(() => setCopied(false), 1200);
      }}
      className={`font-medium underline-offset-2 hover:underline ${light ? "text-white" : "text-[#0B2016]"} ${className}`}
      aria-label={`Copiar ${hex}`}
    >
      {copied ? "Copiat" : hex}
    </button>
  );
}

function Eyebrow({ children, muted = false, className = "" }) {
  return (
    <p className={`text-xs font-medium uppercase tracking-[0.14em] ${muted ? "text-[#4A5D53]" : "text-[#1A5336]"} ${className}`}>
      {children}
    </p>
  );
}

function H2({ children }) {
  return <h2 className={`mt-3 max-w-3xl text-4xl sm:text-5xl ${DISPLAY}`}>{children}</h2>;
}

function Accent({ children }) {
  return <span className="text-[#1A5336]">{children}</span>;
}

function Section({ id, children, dark = false, testId, className = "" }) {
  return (
    <section
      id={id}
      data-testid={testId || `brand-${id}`}
      className={`scroll-mt-16 border-b border-[#E2E8E4] px-5 py-14 sm:px-8 lg:px-12 lg:py-20 ${dark ? "border-white/10 bg-[#062A18] text-white" : ""} ${className}`}
    >
      <div className="mx-auto max-w-5xl">{children}</div>
    </section>
  );
}

function Card({ children, className = "" }) {
  return (
    <div className={`rounded-3xl border border-[#E2E8E4] bg-white p-6 text-[#4A5D53] shadow-[0_8px_30px_rgba(0,0,0,0.04)] ${className}`}>
      {children}
    </div>
  );
}

function FileLink({ href, file, label, primary = false }) {
  return (
    <a
      href={href}
      download={file}
      className={
        primary
          ? "inline-flex items-center rounded-full bg-[#1A5336] px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#133D27]"
          : "inline-flex items-center rounded-full border border-[#E2E8E4] bg-white px-4 py-2 text-sm font-medium text-[#0B2016] transition-colors hover:bg-[#FAFAFA]"
      }
    >
      {label}
    </a>
  );
}

function Glyph({ path, stroke = "#1A5336", size = 22 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" dangerouslySetInnerHTML={{ __html: path }} />
  );
}

function Strong({ children }) {
  return <strong className="font-medium text-[#0B2016]">{children}</strong>;
}

export default function Brand() {
  useNoIndex();
  const active = useActiveSection();
  const pdf = DOWNLOADS[0];
  const jump = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-[#4A5D53]" data-testid="brand-page">
      <div className="lg:grid lg:grid-cols-[15rem_minmax(0,1fr)]">
        <aside className="hidden border-r border-[#E2E8E4] bg-white lg:block">
          <div className="sticky top-0 flex h-screen flex-col px-4 py-6">
            <a href="#portada" className="flex items-center gap-2 px-2">
              <img src="/brand/mark.png" alt="" className="h-9 w-9" />
              <span className={`text-lg ${DISPLAY}`}>Benlligat</span>
            </a>
            <p className="mt-1 px-2 text-xs">Brand Book · v1.1</p>
            <nav className="mt-6 flex-1 space-y-1 overflow-y-auto" aria-label="Seccions">
              {NAV.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={(event) => {
                    event.preventDefault();
                    jump(item.id);
                  }}
                  className={`block rounded-full px-3 py-1.5 text-sm font-medium transition-colors ${
                    active === item.id ? "bg-[#E6EFE7] text-[#1A5336]" : "text-[#4A5D53] hover:text-[#1A5336]"
                  }`}
                  aria-current={active === item.id ? "true" : undefined}
                >
                  {item.label}
                </a>
              ))}
            </nav>
            <FileLink href={pdf.href} file={pdf.file} label="Descarregar PDF" primary />
          </div>
        </aside>

        <div>
          <div className="sticky top-0 z-30 border-b border-[#E2E8E4] bg-white/85 backdrop-blur-xl lg:hidden">
            <div className="flex items-center justify-between gap-3 px-4 py-3">
              <span className={`text-lg ${DISPLAY}`}>Benlligat</span>
              <FileLink href={pdf.href} file={pdf.file} label="PDF" primary />
            </div>
            <nav className="flex gap-2 overflow-x-auto px-4 pb-3" aria-label="Seccions">
              {NAV.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={(event) => {
                    event.preventDefault();
                    jump(item.id);
                  }}
                  className={`shrink-0 rounded-full px-3 py-1 text-xs font-medium ${
                    active === item.id ? "bg-[#1A5336] text-white" : "bg-[#E6EFE7] text-[#0B2016]"
                  }`}
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </div>

          <main>
            <Section id="portada" dark testId="brand-cover" className="relative flex min-h-[100dvh] flex-col justify-center overflow-hidden">
              <div className="pointer-events-none absolute inset-0" style={{ background: "radial-gradient(120% 90% at 85% 10%, #1A5336 0%, #062A18 60%)" }} />
              <svg className="pointer-events-none absolute -bottom-24 -right-16 w-[28rem] opacity-10" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" dangerouslySetInnerHTML={{ __html: LEAF }} />
              <div className="relative">
                <img src="/brand/logo-full-reversed.png" alt="Benlligat" className="h-12 w-auto sm:h-14" />
                <div className="mt-16 max-w-3xl sm:mt-24">
                  <Eyebrow className="text-[#A6E08A]">Brand Book · Versió 1.1 · Octubre 2026</Eyebrow>
                  <h1 className="mt-4 font-display text-5xl font-medium tracking-tighter leading-[0.95] text-white sm:text-6xl lg:text-7xl" data-testid="brand-hero-title">
                    Com es veu, com parla
                    <span className="text-[#A6E08A]"> i com s’aplica Benlligat.</span>
                  </h1>
                  <p className="mt-6 max-w-xl text-lg leading-relaxed text-[#E5F2EA]">
                    Requeriments d’estil de la marca: logotip, color, tipografia, components d’interfície, dades i aplicacions. Basat en els actius oficials i en el codi de la web publicada (branca main), que és la font de veritat.
                  </p>
                </div>
                <div className="mt-10 grid gap-6 border-t border-white/20 pt-5 sm:grid-cols-2 lg:grid-cols-4">
                  {[
                    ["Color principal", "Order Green #1A5336"],
                    ["Text", "Ink #0B2016"],
                    ["Tipografies", "Cabinet Grotesk 500 · Outfit"],
                    ["Web", "benlligat.com"],
                  ].map(([k, v]) => (
                    <div key={k}>
                      <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-[#A3BAAF]">{k}</p>
                      <p className="mt-1 text-sm text-white">{v}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-8">
                  <a href={pdf.href} download={pdf.file} className="inline-flex rounded-full bg-[#A6E08A] px-6 py-3 text-base font-medium text-[#0B2016] transition-colors hover:bg-[#8BC96F]">
                    Descarregar el PDF
                  </a>
                </div>
              </div>
            </Section>

            <Section id="index">
              <Eyebrow>Índex</Eyebrow>
              <H2>Tot el que cal per <Accent>aplicar la marca bé.</Accent></H2>
              <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {INDEX.map(([num, title, page, id]) => (
                  <a key={title} href={`#${id}`} className="flex items-baseline gap-3 border-t border-[#E2E8E4] pt-3">
                    <span className="text-xs font-medium uppercase tracking-[0.14em] text-[#1A5336]">{num}</span>
                    <span className={`flex-1 text-lg ${DISPLAY}`}>{title}</span>
                    <span className="text-sm">{page}</span>
                  </a>
                ))}
              </div>
              <Card className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                <Eyebrow muted className="shrink-0">Com llegir-lo</Eyebrow>
                <p className="text-sm leading-relaxed">
                  Les regles marcades com a <strong className="font-medium text-[#1A5336]">obligatòries</strong> s’han d’aplicar sempre. Les marcades com a <span className="mx-1 inline-flex rounded-full bg-[#FFF4E5] px-2 py-0.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#7A4B00]">Pendent de definir</span> encara no estan decidides i porten una recomanació. Els valors de color, tipografia i components surten del codi de la web publicada (WEB-ULTONIA, branca <Strong>main</Strong>). Si el manual i la web discrepen, mana la web.
                </p>
              </Card>
            </Section>

            <Section id="essencia">
              <Eyebrow>01 · Essència i to de veu</Eyebrow>
              <H2>Traçabilitat que es pot <Accent>comprovar.</Accent></H2>
              <p className="mt-4 max-w-3xl text-lg leading-relaxed">
                Benlligat és una plataforma B2B per a la gestió circular d’actius físics en hotels i hospitals. El primer actiu és el matalàs: passaport digital de producte, QR amb GS1 Digital Link, inventari, inspeccions, incidències, final de vida i impacte en CO<sub>2</sub>.
              </p>
              <div className="mt-8 grid gap-4 lg:grid-cols-3">
                {[
                  ["1", "Professional", "Parlem a direcció, manteniment, compres i sostenibilitat. Llenguatge clar, sense exageracions ni argot de màrqueting."],
                  ["2", "Fiable", "Cada afirmació es pot verificar. Si una dada és d’exemple, ho diem. Si una font està pendent, ho diem."],
                  ["3", "Sostenibilitat mesurable", "No “verd” genèric: parlem de materials, pesos, destins i CO₂ calculat, amb el mètode a la vista."],
                ].map(([n, title, body]) => (
                  <Card key={n}>
                    <span className="grid h-8 w-8 place-items-center rounded-full bg-[#0B2016] text-sm font-semibold text-white">{n}</span>
                    <h3 className={`mt-4 text-2xl ${CARD_TITLE}`}>{title}</h3>
                    <p className="mt-2 text-sm leading-relaxed">{body}</p>
                  </Card>
                ))}
              </div>
              <div className="mt-8 grid gap-8 lg:grid-cols-2">
                <div>
                  <Eyebrow>Així sí</Eyebrow>
                  <ul className="mt-3 space-y-2 text-sm leading-relaxed">
                    {["Català directe, frases curtes, verb al davant.", "Una idea per titular; la frase clau en Order Green.", "Pregunta → resposta: “Què passa amb el matalàs quan es dona de baixa?”", "Xifres amb unitat, període i font (o etiqueta “Dades d’exemple”)."].map((item) => (
                      <li key={item} className="flex gap-3"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#1A5336]" />{item}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <Eyebrow muted>Així no</Eyebrow>
                  <ul className="mt-3 space-y-2 text-sm leading-relaxed">
                    {["Superlatius sense prova (“el millor”, “revolucionari”, “100% sostenible”).", "Xifres sense font o presentades com a resultats reals quan no ho són.", "Clients, aliances o històries que no estiguin confirmades.", "Anglicismes evitables quan hi ha terme català (inventari, baixa, incidència)."].map((item) => (
                      <li key={item} className="flex gap-3"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full border border-[#4A5D53]" />{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </Section>

            <Section id="logotip" testId="brand-logos">
              <Eyebrow>02 · Logotip</Eyebrow>
              <H2>Un símbol, una fulla, <Accent>un nom.</Accent></H2>
              <p className="mt-4 max-w-3xl leading-relaxed">
                Quadrat arrodonit verd amb la fulla en traç blanc + mot “Benlligat” en verd fosc. Dues versions: <Strong>complet</Strong> (símbol + mot) i <Strong>només símbol</Strong> (favicon, avatar, espais petits). Sobre fons foscos o verds s’usa la versió invertida.
              </p>
              <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {[
                  ["/brand/logo-full.png", "bg-white", "Complet · positiu.", "Fons #FAFAFA o blanc. Versió preferent.", "logo-full.png", "w-[72%]"],
                  ["/brand/logo-full-reversed.png", "bg-[#1A5336]", "Complet · invertit.", "Sobre Order Green: símbol blanc amb fulla verda, mot en blanc.", "logo-full-reversed.png", "w-[72%]"],
                  ["/brand/mark.png", "bg-white", "Símbol · positiu.", "", "mark.png", "w-[42%]"],
                  ["/brand/mark-reversed.png", "bg-[#0B2016]", "Símbol · invertit.", "Sobre Ink #0B2016.", "mark-reversed.png", "w-[42%]"],
                ].map(([src, bg, title, note, file, width]) => (
                  <div key={file}>
                    <div className={`grid h-44 place-items-center rounded-3xl border border-[#E2E8E4] ${bg}`}>
                      <img src={src} alt="" className={width} />
                    </div>
                    <p className="mt-2 text-sm leading-relaxed"><Strong>{title}</Strong> {note}</p>
                    <a href={`/brand/${file}`} download={file} className="mt-1 inline-block text-sm font-medium text-[#1A5336] hover:text-[#133D27]">Descarregar</a>
                  </div>
                ))}
              </div>
              <div className="mt-6 grid gap-4 lg:grid-cols-2">
                <Card>
                  <Eyebrow muted>Construcció observada</Eyebrow>
                  <p className="mt-2 text-sm leading-relaxed">
                    Radi del quadrat aprox. 33% del costat. A la web: contenidor de 36 px, radi 12 px, fulla Lucide de 20 px; mot en Cabinet Grotesk 500, 20 px, tracking −0,025 em, #0B2016. Al peu (fons #0B2016) el quadrat és llima #A6E08A amb la fulla en #0B2016.
                  </p>
                </Card>
                <Card>
                  <Eyebrow muted>Fitxers</Eyebrow>
                  <p className="mt-2 text-sm leading-relaxed">
                    Original oficial: <Strong>benlligat-logo.png</Strong>. Generades per a aquest manual: invertida i només símbol. <span className="mx-1 inline-flex rounded-full bg-[#FFF4E5] px-2 py-0.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#7A4B00]">Pendent</span> Vectoritzar en SVG oficial i substituir la icona aproximada de la web (Lucide “Leaf” + text).
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <FileLink href="/brand/benlligat-logo.png" file="benlligat-logo.png" label="Logo oficial" />
                    <FileLink href="/brand/logo-full-official.png" file="logo-full-official.png" label="Complet oficial" />
                  </div>
                </Card>
              </div>
            </Section>

            <Section id="regles">
              <Eyebrow>02 · Logotip</Eyebrow>
              <H2>Espai de protecció, mida mínima <Accent>i usos incorrectes.</Accent></H2>
              <div className="mt-8 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
                <div>
                  <Card className="grid place-items-center p-8">
                    <div className="relative border border-dashed border-[#A3BAAF] p-8">
                      <img src="/brand/logo-full.png" alt="" className="w-64 max-w-full" />
                      <span className="absolute left-0 top-0 grid h-8 w-8 place-items-center bg-[#1A5336]/15 text-sm font-medium text-[#1A5336]">x</span>
                      <span className="absolute bottom-0 right-0 grid h-8 w-8 place-items-center bg-[#1A5336]/15 text-sm font-medium text-[#1A5336]">x</span>
                    </div>
                  </Card>
                  <p className="mt-3 text-sm leading-relaxed"><Strong>Espai de protecció:</Strong> x = ¼ del costat del símbol, a tots quatre costats. Cap text, vora ni imatge dins d’aquesta zona.</p>
                </div>
                <div>
                  <table className="w-full text-left text-sm">
                    <thead>
                      <tr className="text-xs font-semibold uppercase tracking-[0.14em]">
                        <th className="py-2 font-semibold">Versió</th>
                        <th className="py-2 font-semibold">Digital</th>
                        <th className="py-2 font-semibold">Imprès</th>
                      </tr>
                    </thead>
                    <tbody className="text-[#0B2016]">
                      <tr className="border-t border-[#E2E8E4]"><td className="py-2">Complet</td><td>120 px d’amplada</td><td>30 mm d’amplada</td></tr>
                      <tr className="border-t border-[#E2E8E4]"><td className="py-2">Només símbol</td><td>24 px (favicon 32 px)</td><td>8 mm</td></tr>
                      <tr className="border-t border-[#E2E8E4]"><td className="py-2">Capçalera web</td><td>símbol 36 px</td><td>—</td></tr>
                    </tbody>
                  </table>
                  <p className="mt-3 text-sm leading-relaxed">Per sota d’aquestes mides, usa només el símbol. Mides mínimes recomanades per aquest manual.</p>
                </div>
              </div>
              <Eyebrow muted className="mt-8">No ho facis</Eyebrow>
              <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
                {[
                  ["Canviar-ne el color", { filter: "hue-rotate(150deg) saturate(2)" }],
                  ["Estirar o deformar", { transform: "scaleX(1.45) scaleY(0.8)" }],
                  ["Girar-lo", { transform: "rotate(-14deg)" }],
                  ["Afegir ombres o efectes", { filter: "drop-shadow(8px 8px 6px rgba(0,0,0,.45)) drop-shadow(0 0 12px #9be36d)" }],
                  ["Fons amb massa soroll", null],
                ].map(([label, style]) => (
                  <div key={label}>
                    <div
                      className="grid h-28 place-items-center overflow-hidden rounded-2xl border border-[#E2E8E4] bg-white"
                      style={label === "Fons amb massa soroll" ? { background: "repeating-linear-gradient(35deg,#c9a46b 0 8px,#6b8fb5 8px 16px,#e8d9b0 16px 22px,#3c5a3c 22px 30px)" } : undefined}
                    >
                      <img src="/brand/logo-full.png" alt="" className="w-1/2" style={style || undefined} />
                    </div>
                    <p className="mt-2 flex items-center gap-2 text-sm text-[#0B2016]">
                      <span className="grid h-5 w-5 place-items-center rounded-full bg-[#9B2C2C] text-xs font-medium text-white">×</span>
                      {label}
                    </p>
                  </div>
                ))}
              </div>
            </Section>

            <Section id="color" testId="brand-color">
              <Eyebrow>03 · Color</Eyebrow>
              <H2>Un verd, un fosc i molt d’aire. <Accent>El verd assenyala.</Accent></H2>
              <p className="mt-3 text-sm">Clica un HEX per copiar-lo.</p>
              <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {[
                  ["#1A5336", true, "Primari · accent", "Order Green", ["RGB 26 · 83 · 54", "CMYK aprox. 69 · 0 · 35 · 67", "Frase clau del titular, badges, icones, botons CTA, dada destacada."]],
                  ["#0B2016", true, "Text · seccions fosques", "Ink", ["RGB 11 · 32 · 22", "CMYK aprox. 66 · 0 · 31 · 87", "Titulars, text fort, dades, peu i seccions fosques de la web."]],
                  ["#FAFAFA", false, "Fons de pàgina", "Background", ["RGB 250 · 250 · 250", "CMYK aprox. 0 · 0 · 0 · 2", "Fons general de web, deck i documents."]],
                  ["#FFFFFF", false, "Targetes", "White", ["Vora #E2E8E4 · 1 px", "Targetes i panells sobre #FAFAFA."]],
                ].map(([hex, light, tag, name, lines]) => (
                  <article key={name} className="overflow-hidden rounded-3xl border border-[#E2E8E4] bg-white">
                    <div className="flex h-36 flex-col justify-end border-b border-[#E2E8E4]/40 p-4" style={{ background: hex }}>
                      <span className={`text-[11px] font-semibold uppercase tracking-[0.14em] ${light ? "text-white" : "text-[#4A5D53]"}`}>{tag}</span>
                    </div>
                    <div className="space-y-1 p-4 text-sm leading-relaxed">
                      <b className={`block text-2xl ${DISPLAY}`}>{name}</b>
                      <Hex hex={hex} />
                      {lines.map((line) => <p key={line}>{line}</p>)}
                    </div>
                  </article>
                ))}
              </div>
              <Eyebrow muted className="mt-10">Proporció d’ús recomanada</Eyebrow>
              <div className="mt-3 flex h-12 overflow-hidden rounded-full border border-[#E2E8E4] text-xs">
                <div className="flex flex-[60] items-center bg-[#FAFAFA] pl-3">#FAFAFA · 60%</div>
                <div className="flex flex-[20] items-center border-l border-[#E2E8E4] bg-white pl-3">Blanc · 20%</div>
                <div className="flex flex-[12] items-center bg-[#0B2016] pl-2 text-white">#0B2016 · 12%</div>
                <div className="flex flex-[8] items-center bg-[#1A5336] pl-2 text-white">8%</div>
              </div>
              <p className="mt-2 text-sm leading-relaxed">
                L’Order Green funciona perquè és escàs: marca el que importa. El text i les seccions fosques de la web usen #0B2016. CMYK aproximat per conversió directa; valida-ho amb la impremta (o defineix un Pantone) abans d’imprimir. Colors de suport a la secció següent.
              </p>
            </Section>

            <Section id="suport" testId="brand-support">
              <Eyebrow>03 · Color</Eyebrow>
              <H2>Colors de suport: <Accent>els que la web ja fa servir.</Accent></H2>
              <p className="mt-4 max-w-3xl leading-relaxed">
                Oficials a partir d’aquesta versió. Verificats al codi de la web publicada (index.css, Hero, Navbar, StaticSections, ExperienceSection). Ràtios de contrast WCAG 2.1 calculats.
              </p>
              <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
                {SUPPORT.map((color) => (
                  <article key={color.hex} className="overflow-hidden rounded-3xl border border-[#E2E8E4] bg-white">
                    <div className="flex h-24 items-end p-3" style={{ background: color.hex }}>
                      <span className={`text-[11px] font-semibold uppercase tracking-[0.14em] ${color.light ? "text-white" : "text-[#0B2016]"}`}>{color.name}</span>
                    </div>
                    <div className="p-4 text-sm leading-relaxed">
                      <Hex hex={color.hex} />
                      <p>RGB {color.rgb}</p>
                      <p>CMYK aprox. {color.cmyk}</p>
                      <p className="mt-2 min-h-16 text-sm">{color.use}</p>
                      {color.pairs.map(([label, ratio, level]) => (
                        <div key={label} className="mt-2 border-t border-[#E2E8E4] pt-2">
                          <p className="text-xs">{label}</p>
                          <p className="font-medium text-[#0B2016]">{ratio} <span className={level === "només decoratiu" ? "" : "text-[#1A5336]"}>{level}</span></p>
                        </div>
                      ))}
                    </div>
                  </article>
                ))}
              </div>
              <p className="mt-4 text-sm leading-relaxed">
                Derivats a la web: <Strong>#E6EFE7</Strong> fons del badge (Order Green sobre aquest fons 7,65:1, AAA) i <Strong>#8BC96F</Strong> hover del botó llima (#0B2016 a sobre 8,67:1).
              </p>
              <Card className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-center">
                <span className="h-12 w-16 shrink-0 rounded-xl bg-[#062A18]" />
                <p className="text-sm leading-relaxed">
                  <Strong>Deep Green #062A18</Strong> (RGB 6 · 42 · 24) · <Strong>no s’usa a la web publicada</Strong>; només al deck. Es manté únicament per a <Strong>superfícies fosques</Strong> del deck i d’impresos (com la portada d’aquest manual). Mai com a color de text: a la web, el text i els fons foscos són #0B2016.
                </p>
              </Card>
            </Section>

            <Section id="contrast">
              <Eyebrow>03 · Color</Eyebrow>
              <H2>Tints aprovats i <Accent>parelles de contrast.</Accent></H2>
              <div className="mt-8 grid gap-8 lg:grid-cols-2">
                <div>
                  <Eyebrow muted>Tints d’Order Green (barreja amb blanc)</Eyebrow>
                  <div className="mt-3 grid grid-cols-4 gap-2 sm:grid-cols-7">
                    {TINTS.map((tint) => (
                      <div key={tint.hex}>
                        <div className="flex h-24 items-end rounded-2xl border border-[#062A18]/10 p-2 text-xs font-semibold" style={{ background: tint.hex, color: tint.ink }}>{tint.pct}</div>
                        <Hex hex={tint.hex} className="mt-1 block text-left text-[11px]" />
                      </div>
                    ))}
                  </div>
                  <Eyebrow muted className="mt-8">Altres tons observats (no són colors de marca)</Eyebrow>
                  <table className="mt-3 w-full text-left text-sm">
                    <thead>
                      <tr className="text-xs font-semibold uppercase tracking-[0.14em]">
                        <th className="py-2 font-semibold">Tons</th>
                        <th className="py-2 font-semibold">On</th>
                        <th className="py-2 font-semibold">Regla</th>
                      </tr>
                    </thead>
                    <tbody>
                      {TONES.map((tone) => (
                        <tr key={tone.where} className="border-t border-[#E2E8E4]">
                          <td className="py-2 pr-2 text-[#0B2016]">
                            {tone.chips.map((hex) => (
                              <button key={hex} type="button" onClick={() => copyText(hex)} className="mb-1 mr-2 inline-flex items-center gap-1" aria-label={`Copiar ${hex}`}>
                                <span className="inline-block h-4 w-4 rounded border border-[#062A18]/10" style={{ background: hex }} />
                                {hex}
                              </button>
                            ))}
                          </td>
                          <td className="py-2 pr-2">{tone.where}</td>
                          <td className="py-2">{tone.rule}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div>
                  <Eyebrow muted>Contrast WCAG 2.1 (calculat)</Eyebrow>
                  <div className="mt-3 overflow-x-auto">
                    <table className="w-full text-left text-sm">
                      <thead>
                        <tr className="text-xs font-semibold uppercase tracking-[0.14em]">
                          <th className="py-2 pr-2 font-semibold">Text / fons</th>
                          <th className="py-2 pr-2 font-semibold">Mostra</th>
                          <th className="py-2 pr-2 font-semibold">Ràtio</th>
                          <th className="py-2 font-semibold">Nivell</th>
                        </tr>
                      </thead>
                      <tbody>
                        {CONTRAST.map((row) => (
                          <tr key={row.name} className="border-t border-[#E2E8E4]">
                            <td className="py-2 pr-2 text-[#0B2016]">{row.name}</td>
                            <td className="py-2 pr-2">
                              <span className="inline-block rounded-full border border-[#E2E8E4] px-3 py-1 text-xs font-semibold" style={{ background: row.bg, color: row.fg }}>Aa Benlligat</span>
                            </td>
                            <td className="py-2 pr-2 font-medium text-[#0B2016]">{row.ratio}</td>
                            <td className={`py-2 font-semibold ${row.ok ? "text-[#1A5336]" : "text-[#9B2C2C]"}`}>{row.level}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed">
                    AA demana 4,5:1 per a text normal i 3:1 per a text gran (des de 24 px, o 18,7 px en negreta). AAA demana 7:1. <strong className="font-medium text-[#9B2C2C]">No</strong> combinis Order Green amb #0B2016 per a text (1,89:1): sobre fons fosc, l’accent és el llima #A6E08A.
                  </p>
                </div>
              </div>
            </Section>

            <Section id="tipografia" testId="brand-type">
              <Eyebrow>04 · Tipografia</Eyebrow>
              <H2>Cabinet Grotesk per cridar. <Accent>Outfit per explicar.</Accent></H2>
              <div className="mt-8 grid gap-4 lg:grid-cols-2">
                <Card>
                  <div className="flex items-baseline justify-between gap-3">
                    <Eyebrow>Display · titulars</Eyebrow>
                    <p className="text-sm">Fontshare · gratuïta</p>
                  </div>
                  <p className={`mt-3 text-6xl sm:text-7xl ${DISPLAY}`}>Aa Bb 128</p>
                  <p className="mt-3 font-display text-base font-medium tracking-tight text-[#0B2016]">
                    <span className="text-[#1A5336]">Medium 500 · en ús</span> · Bold 700 · Extrabold 800 · Black 900
                  </p>
                  <p className="mt-2 text-sm leading-relaxed">
                    La web carrega 500/700/800/900 i <Strong>font-display</Strong> no fixa pes, així que tots els titulars, xifres i el mot del logo es veuen en <Strong>500</Strong>. Fes servir 500; la resta de pesos no estan en ús.
                  </p>
                </Card>
                <Card>
                  <div className="flex items-baseline justify-between gap-3">
                    <Eyebrow>Text · interfície</Eyebrow>
                    <p className="text-sm">Google Fonts · gratuïta</p>
                  </div>
                  <p className="mt-3 text-6xl font-normal leading-[0.95] tracking-tight text-[#0B2016] sm:text-7xl" style={{ fontFamily: "Outfit, sans-serif" }}>Aa Bb 128</p>
                  <p className="mt-3 text-base text-[#0B2016]" style={{ fontFamily: "Outfit, sans-serif" }}>
                    <span className="font-light">Light 300</span> · Regular 400 · <span className="font-medium">Medium 500</span> · <span className="font-semibold">Semibold 600</span> · <span className="font-bold">Bold 700</span>
                  </p>
                  <p className="mt-2 text-sm leading-relaxed">
                    Cos de text en #4A5D53; èmfasi i dades en <Strong>Outfit 500 #0B2016</Strong>. Botons, navegació i badges en 500. Alternativa de sistema: -apple-system, Segoe UI, sans-serif.
                  </p>
                </Card>
              </div>
              <Eyebrow muted className="mt-8">Jerarquia (valors de la web publicada)</Eyebrow>
              <div className="mt-3 overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="text-xs font-semibold uppercase tracking-[0.14em]">
                      <th className="py-2 pr-3 font-semibold">Nivell</th>
                      <th className="py-2 pr-3 font-semibold">Mostra</th>
                      <th className="py-2 font-semibold">Especificació</th>
                    </tr>
                  </thead>
                  <tbody className="align-top">
                    <tr className="border-t border-[#E2E8E4]">
                      <td className="py-3 pr-3 text-[#0B2016]">Badge</td>
                      <td className="py-3 pr-3"><span className="inline-flex rounded-full bg-[#E6EFE7] px-4 py-1 text-xs font-medium text-[#1A5336]">Passaport digital obligatori</span></td>
                      <td className="py-3">Outfit 500 · 12 px · caixa normal · píndola #E6EFE7, text #1A5336, 4 × 16 px</td>
                    </tr>
                    <tr className="border-t border-[#E2E8E4]">
                      <td className="py-3 pr-3 text-[#0B2016]">Etiqueta</td>
                      <td className="py-3 pr-3"><span className="text-xs font-medium uppercase tracking-[0.14em] text-[#1A5336]">Pas 01 · Identitat</span></td>
                      <td className="py-3">Outfit 500 · 12 px · MAJÚSCULES · tracking 0,14 em · #1A5336</td>
                    </tr>
                    <tr className="border-t border-[#E2E8E4]">
                      <td className="py-3 pr-3 text-[#0B2016]">H1 hero</td>
                      <td className="py-3 pr-3"><p className={`max-w-sm text-3xl ${DISPLAY}`}>El cicle de vida dels teus matalassos, <Accent>sota control.</Accent></p></td>
                      <td className="py-3">Cabinet 500 · 48 / 60 / 72 px · interlínia 0,95 · tracking −0,05 em · #0B2016; frase clau #1A5336</td>
                    </tr>
                    <tr className="border-t border-[#E2E8E4]">
                      <td className="py-3 pr-3 text-[#0B2016]">H2 secció</td>
                      <td className="py-3 pr-3"><p className="max-w-sm font-display text-2xl font-medium tracking-tight leading-[1.25] text-[#0B2016]">Cada matalàs, una identitat verificable.</p></td>
                      <td className="py-3">Cabinet 500 · 36 / 48 px · interlínia 1,25 · tracking −0,025 em · #0B2016</td>
                    </tr>
                    <tr className="border-t border-[#E2E8E4]">
                      <td className="py-3 pr-3 text-[#0B2016]">H3 targeta</td>
                      <td className="py-3 pr-3"><p className={CARD_TITLE}>Petjada de carboni</p></td>
                      <td className="py-3">Cabinet 500 · 18–30 px · tracking −0,025 em · #0B2016</td>
                    </tr>
                    <tr className="border-t border-[#E2E8E4]">
                      <td className="py-3 pr-3 text-[#0B2016]">Cos</td>
                      <td className="py-3 pr-3">Identitat, inspecció i final de vida <Strong>en una sola fitxa</Strong>.</td>
                      <td className="py-3">Outfit 400 · 18–20 px (entradeta) / 14 px (targeta) · interlínia 1,625 · #4A5D53; èmfasi 500 #0B2016</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </Section>

            <Section id="components">
              <Eyebrow>05 · Components d’interfície</Eyebrow>
              <H2>Arrodonit, net i <Accent>amb vores fines.</Accent></H2>
              <div className="mt-8 grid gap-8 lg:grid-cols-3">
                <div>
                  <Eyebrow muted>Botons · sempre rounded-full</Eyebrow>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <span className="rounded-full bg-[#1A5336] px-5 py-2.5 text-sm font-medium text-white">Vols provar?</span>
                    <span className="rounded-full bg-[#133D27] px-5 py-2.5 text-sm font-medium text-white">Hover</span>
                    <span className="rounded-full border border-[#E2E8E4] bg-white/70 px-5 py-2.5 text-sm font-medium text-[#0B2016]">Demanar demo</span>
                    <span className="rounded-full bg-[#A6E08A] px-5 py-2.5 text-sm font-medium text-[#0B2016]">Llima</span>
                    <span className="rounded-full bg-[#1A5336] px-5 py-2.5 text-sm font-medium text-white shadow-[0_0_0_2px_#fff,0_0_0_4px_#A6E08A]">Focus</span>
                  </div>
                  <table className="mt-4 w-full text-left text-sm">
                    <tbody>
                      {[
                        ["Primari", "#1A5336, text blanc, Outfit 500; hover #133D27"],
                        ["Mides", "Hero: 16 px, 32 px laterals, aprox. 48 px d’alt, ombra suau, s’eleva 2 px en hover. Menú: 14 px, 24 px laterals, 36 px d’alt"],
                        ["Secundari", "Blanc 70% + desenfocament, vora #E2E8E4, text #0B2016"],
                        ["Llima", "Sobre #0B2016: fons #A6E08A, text #0B2016, hover #8BC96F"],
                        ["Focus", "Anell llima #A6E08A (2 px amb separació)"],
                      ].map(([k, v]) => (
                        <tr key={k} className="border-t border-[#E2E8E4]"><td className="py-2 pr-3"><Strong>{k}</Strong></td><td className="py-2">{v}</td></tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div>
                  <Eyebrow muted>Targeta</Eyebrow>
                  <Card className="mt-3">
                    <Glyph path={ICONS[3][1]} />
                    <h3 className={`mt-3 text-2xl ${CARD_TITLE}`}>Inspecció</h3>
                    <p className="mt-2 text-sm leading-relaxed">Estat, data i responsable queden a la fitxa del matalàs.</p>
                  </Card>
                  <p className="mt-3 text-sm leading-relaxed">Blanc, vora 1 px #E2E8E4, radi 24 px (rounded-3xl), farciment 28–32 px, ombra 0 8px 30px rgba(0,0,0,.04); en hover puja 4 px. Variants: destacada en #1A5336 amb icona llima; sobre #0B2016, blanc 4% amb vora blanc 10%. Radi base 16 px; icones en quadrat de 12–16 px de radi.</p>
                  <Eyebrow muted className="mt-4">Badge i etiqueta</Eyebrow>
                  <div className="mt-2 flex items-center gap-3">
                    <span className="rounded-full bg-[#E6EFE7] px-4 py-1 text-sm font-medium text-[#1A5336]">Model Freemium</span>
                    <span className="text-xs font-medium uppercase tracking-[0.14em] text-[#1A5336]">Pas 02</span>
                  </div>
                  <p className="mt-2 text-sm">El badge va sempre damunt del titular. Sobre fons fosc: blanc 10%, vora blanc 15%, text llima.</p>
                </div>
                <div>
                  <Eyebrow muted>Xifres</Eyebrow>
                  <Card className="mt-3">
                    <div className="flex items-center justify-between gap-2">
                      <Eyebrow>Inventari</Eyebrow>
                      <span className="rounded-full bg-[#E6EFE7] px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#1A5336]">Dades d’exemple</span>
                    </div>
                    <div className="mt-4 grid grid-cols-3 gap-2">
                      {[["96", "en servei"], ["22", "en revisió"], ["10", "de baixa"]].map(([v, l]) => (
                        <div key={l}>
                          <div className="font-display text-3xl font-medium tracking-tight leading-none text-[#1A5336]">{v}</div>
                          <div className="text-xs">{l}</div>
                        </div>
                      ))}
                    </div>
                    <div className="mt-4 grid grid-cols-3 gap-2 border-t border-[#E2E8E4] pt-3">
                      {[["96", "En servei"], ["22", "En revisió"], ["10", "De baixa"]].map(([v, l]) => (
                        <div key={l} className="border-l-2 border-[#1A5336] pl-2">
                          <div className={`text-2xl ${DISPLAY}`}>{v}</div>
                          <div className="text-xs">{l}</div>
                        </div>
                      ))}
                    </div>
                  </Card>
                  <p className="mt-3 text-sm leading-relaxed"><Strong>Web</Strong> (a dalt): Cabinet 500, 24–30 px, tracking −0,025 em, #1A5336, etiqueta Outfit 12–14 px #4A5D53. <Strong>Deck</Strong> (a sota): xifra en #0B2016 amb filet de 2 px #1A5336. Xifres d’exemple, no dades reals.</p>
                </div>
              </div>
              <Eyebrow muted className="mt-8">Variants de targeta a la web</Eyebrow>
              <div className="mt-3 grid gap-4 lg:grid-cols-3">
                <Card className="flex items-center gap-4">
                  <Glyph path={LEAF} />
                  <div><h3 className={`text-lg ${CARD_TITLE}`}>Estàndard</h3><p className="text-sm">Blanc · vora #E2E8E4 · text #4A5D53</p></div>
                </Card>
                <div className="flex items-center gap-4 rounded-3xl bg-[#1A5336] p-6 text-white shadow-[0_8px_32px_rgba(0,0,0,0.08)]">
                  <Glyph path={LEAF} stroke="#A6E08A" />
                  <div><h3 className="font-display text-lg font-medium tracking-tight leading-[1.1] text-white">Destacada</h3><p className="text-sm text-white/75">Order Green · icona llima · text blanc 75%</p></div>
                </div>
                <div className="rounded-3xl bg-[#0B2016] p-3">
                  <div className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                    <Glyph path={LEAF} stroke="#A6E08A" />
                    <div><h3 className="font-display text-lg font-medium tracking-tight leading-[1.1] text-white">Secció fosca</h3><p className="text-sm text-white/70">Fons #0B2016 · blanc 4% · vora blanc 10%</p></div>
                  </div>
                </div>
              </div>
            </Section>

            <Section id="grafics">
              <Eyebrow>05 · Gràfics</Eyebrow>
              <H2>Una sola dada en verd. <Accent>La resta, en fosc.</Accent></H2>
              <div className="mt-8 grid gap-6 lg:grid-cols-[1.3fr_1fr]">
                <Card>
                  <div className="flex items-center justify-between gap-3">
                    <Eyebrow>Destí del material · exemple</Eyebrow>
                    <span className="rounded-full bg-[#E6EFE7] px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#1A5336]">Dades d’exemple</span>
                  </div>
                  <div className="mt-6 space-y-5">
                    {BARS.map((bar) => (
                      <div key={bar.label} className="grid items-center gap-3 sm:grid-cols-[9rem_1fr_auto]">
                        <div>
                          <div className="font-medium text-[#0B2016]">{bar.label}</div>
                          <div className="text-xs">{bar.note}</div>
                        </div>
                        <div className="h-8 overflow-hidden rounded-full bg-[#E6EFE7]">
                          <div className="h-full rounded-full" style={{ width: `${bar.value}%`, background: bar.accent ? "#1A5336" : "#0B2016" }} />
                        </div>
                        <div className={`text-3xl ${bar.accent ? "font-display font-medium tracking-tighter leading-[0.95] text-[#1A5336]" : DISPLAY}`}>{bar.value}%</div>
                      </div>
                    ))}
                  </div>
                  <p className="mt-4 text-sm">Valors il·lustratius per mostrar el format. No descriuen cap centre.</p>
                </Card>
                <ul className="space-y-3 text-sm leading-relaxed">
                  {[
                    <><Strong>Sèrie base:</Strong> #0B2016. <Strong>Dada destacada:</Strong> #1A5336 (només una per gràfic).</>,
                    <><Strong>Pista i quadrícula:</Strong> #E6EFE7 / #E2E8E4, filets d’1 px.</>,
                    <><Strong>Més sèries:</Strong> tints aprovats 60% (#769886) i 40% (#A3BAAF). Màxim quatre colors; la resta, agrupada a “Altres”.</>,
                    <><Strong>Barres arrodonides</Strong> (rounded-full), valors en Cabinet 500 a la dreta.</>,
                    <><Strong>Sempre</Strong> unitat, període i font, o la pill “Dades d’exemple”.</>,
                    <><Strong>Sense</Strong> 3D, ombres, degradats ni colors fora de la paleta. Vermells/ambres només per a estats d’alerta.</>,
                  ].map((item, i) => (
                    <li key={i} className="flex gap-3"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#1A5336]" /><span>{item}</span></li>
                  ))}
                </ul>
              </div>
            </Section>

            <Section id="imatge">
              <Eyebrow>06 · Imatgeria i iconografia</Eyebrow>
              <H2>Objectes reals, <Accent>icones de línia.</Accent></H2>
              <div className="mt-8 grid gap-6 lg:grid-cols-2">
                <div>
                  <Eyebrow muted>Iconografia · definit</Eyebrow>
                  <div className="mt-4 flex flex-wrap gap-4">
                    {ICONS.map(([name, path, filled]) => (
                      <div key={name} className="text-center">
                        <div className={`grid h-16 w-16 place-items-center rounded-2xl ${filled ? "bg-[#1A5336]" : "border border-[#E2E8E4] bg-white"}`}>
                          <Glyph path={path} stroke={filled ? "#fff" : "#1A5336"} size={30} />
                        </div>
                        <p className="mt-1 text-xs">{name}</p>
                      </div>
                    ))}
                  </div>
                  <ul className="mt-4 space-y-2 text-sm leading-relaxed">
                    <li className="flex gap-3"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#1A5336]" />Família <Strong>Lucide</Strong> (la que ja usa la web), traç 2 px, extrems arrodonits.</li>
                    <li className="flex gap-3"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#1A5336]" />Color #1A5336 sobre clar; llima #A6E08A sobre #0B2016 o sobre verd; blanc dins del símbol.</li>
                    <li className="flex gap-3"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#1A5336]" />Mida 20–32 px. Contenidor opcional: quadrat de 48 px amb radi 16 px (icona llima sobre llima 15%) o el quadrat del símbol.</li>
                    <li className="flex gap-3"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#1A5336]" />No barregis famílies d’icones ni icones plenes amb icones de línia.</li>
                  </ul>
                  <Eyebrow muted className="mt-6">Il·lustració 3D</Eyebrow>
                  <p className="mt-2 text-sm leading-relaxed">El matalàs interactiu de la web (capes i materials) és l’actiu visual propi. Usa’l per explicar materials i final de vida, en colors de la paleta.</p>
                </div>
                <div className="rounded-3xl border border-dashed border-[#A3BAAF] bg-white p-6">
                  <span className="inline-flex rounded-full bg-[#FFF4E5] px-2 py-0.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#7A4B00]">Pendent de definir</span>
                  <h3 className={`mt-3 text-2xl ${CARD_TITLE}`}>Estil fotogràfic</h3>
                  <p className="mt-2 text-sm leading-relaxed">Encara no hi ha fotografia de marca aprovada. Recomanació:</p>
                  <ul className="mt-3 space-y-2 text-sm leading-relaxed">
                    {[
                      "Fotografia real d’habitacions, plantes i magatzems, amb llum natural i sense persones identificables (pacients).",
                      "Detalls de producte: etiqueta QR, costures, capes del matalàs.",
                      "Tons neutres i freds; deixa espai net per al text. Cap filtre de color verd.",
                      "Evita bancs d’imatges genèrics (fulles, mans amb planteta, globus terraqüi).",
                      "Mai el logotip sobre una foto amb molt de detall: usa una franja #FAFAFA o #0B2016.",
                    ].map((item) => (
                      <li key={item} className="flex gap-3"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#1A5336]" />{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </Section>

            <Section id="dades" dark>
              <Eyebrow className="text-[#A3BAAF]">07 · Regla d’honestedat de dades · obligatòria</Eyebrow>
              <h2 className="mt-3 max-w-3xl font-display text-4xl font-medium tracking-tighter leading-[0.95] text-white sm:text-5xl">
                Si una dada no és real, <span className="text-[#A6E08A]">ho diem a la mateixa vista.</span>
              </h2>
              <div className="mt-8 grid gap-6 lg:grid-cols-3">
                {[
                  ["1", <>Tota xifra d’exemple porta la pill <strong className="font-medium text-white">“Dades d’exemple”</strong> al costat, no en un peu de pàgina llunyà.</>],
                  ["2", <>Tota afirmació sense font verificada porta <strong className="font-medium text-white">[font pendent]</strong>. Només es cita com a fet una font real (p. ex. GS1 Digital Link, Reglament (UE) 2024/1781).</>],
                  ["3", "No s’inventen clients, logos de tercers, testimonis, premis ni resultats. Un CO₂ calculat indica mètode i abast."],
                ].map(([n, body]) => (
                  <div key={n} className="border-l-2 border-[#A3BAAF] pl-4">
                    <p className="font-display text-3xl font-medium tracking-tighter leading-[0.95] text-[#A6E08A]">{n}</p>
                    <p className="mt-2 leading-relaxed text-[#E5F2EA]">{body}</p>
                  </div>
                ))}
              </div>
              <div className="mt-8 flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-[#E6EFE7] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#1A5336]">Dades d’exemple</span>
                <span className="rounded-full border border-[#4A6558] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#E5F2EA]">[font pendent]</span>
                <span className="rounded-full bg-[#1A5336] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-white">Fet general</span>
                <p className="text-sm text-[#A3BAAF]">Les tres etiquetes del deck. Estil: 11 px · 600 · majúscules · tracking 0,14 em.</p>
              </div>
              <div className="mt-8 grid gap-4 lg:grid-cols-2">
                <div>
                  <div className="flex items-start justify-between gap-4 rounded-3xl bg-white p-6">
                    <div>
                      <p className={`text-5xl ${DISPLAY}`}>128</p>
                      <p className="text-sm text-[#4A5D53]">matalassos en una planta</p>
                    </div>
                    <span className="rounded-full bg-[#E6EFE7] px-2 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#1A5336]">Dades d’exemple</span>
                  </div>
                  <p className="mt-2 flex items-center gap-2 text-sm text-[#E5F2EA]"><span className="grid h-5 w-5 place-items-center rounded-full bg-[#1A5336] text-xs text-white">✓</span>Correcte: l’etiqueta és al costat de la xifra.</p>
                </div>
                <div>
                  <div className="rounded-3xl bg-white p-6">
                    <p className={`text-5xl ${DISPLAY}`}>−40% CO₂</p>
                    <p className="text-sm text-[#4A5D53]">en el primer any</p>
                  </div>
                  <p className="mt-2 flex items-center gap-2 text-sm text-[#E5F2EA]"><span className="grid h-5 w-5 place-items-center rounded-full bg-[#9B2C2C] text-xs text-white">×</span>Incorrecte: xifra sense font, sense mètode ni etiqueta.</p>
                </div>
              </div>
            </Section>

            <Section id="aplicacions">
              <Eyebrow>08 · Aplicacions</Eyebrow>
              <H2>Web, deck i document: <Accent>un sol sistema.</Accent></H2>
              <div className="mt-8 grid gap-4 lg:grid-cols-3">
                <div>
                  <Card className="overflow-hidden p-0">
                    <div className="flex items-center justify-between border-b border-[#E2E8E4] px-4 py-3">
                      <img src="/brand/logo-full.png" alt="" className="h-6" />
                      <span className="rounded-full bg-[#1A5336] px-3 py-1 text-[11px] font-medium text-white">Vols provar?</span>
                    </div>
                    <div className="bg-[#FAFAFA] p-4">
                      <span className="inline-flex rounded-full bg-[#E6EFE7] px-3 py-1 text-[11px] font-medium text-[#1A5336]">Passaport digital</span>
                      <p className={`mt-2 text-2xl ${DISPLAY}`}>Cada matalàs, <Accent>amb identitat.</Accent></p>
                      <p className="mt-2 text-sm">Inventari, inspeccions i final de vida.</p>
                    </div>
                  </Card>
                  <h3 className={`mt-4 text-2xl ${CARD_TITLE}`}>Web</h3>
                  <p className="mt-2 text-sm leading-relaxed">Capçalera fixa de 64 px; en fer scroll, vidre (blanc 70% + desenfocament). Logo a l’esquerra, enllaços 14 px #4A5D53, CTA rodó. Amplada màx. 1280 px, marges 24/48 px, seccions de 96–128 px.</p>
                </div>
                <div>
                  <Card className="flex min-h-[16rem] flex-col">
                    <div className="flex items-center justify-between">
                      <Eyebrow>03 · Què n’obté el centre</Eyebrow>
                      <span className="flex gap-1"><i className="h-1.5 w-6 rounded-full bg-[#1A5336]" /><i className="h-1.5 w-4 rounded-full bg-[#E2E8E4]" /><i className="h-1.5 w-4 rounded-full bg-[#E2E8E4]" /></span>
                    </div>
                    <p className="mt-4 text-sm">Quina informació té l’equip?</p>
                    <p className={`mt-1 text-2xl ${DISPLAY}`}>Tot l’historial, <Accent>a un escaneig.</Accent></p>
                    <div className="mt-auto flex items-end gap-4 pt-6">
                      <div className="border-l-2 border-[#1A5336] pl-2"><div className={`text-xl ${DISPLAY}`}>96</div><div className="text-xs">En servei</div></div>
                      <div className="border-l-2 border-[#1A5336] pl-2"><div className={`text-xl ${DISPLAY}`}>22</div><div className="text-xs">En revisió</div></div>
                      <span className="ml-auto rounded-full bg-[#E6EFE7] px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#1A5336]">Dades d’exemple</span>
                    </div>
                  </Card>
                  <h3 className={`mt-4 text-2xl ${CARD_TITLE}`}>Deck</h3>
                  <p className="mt-2 text-sm leading-relaxed">Una pregunta per pantalla, resposta en titular gran amb la frase clau en verd. Barra de progrés superior, notes i fonts al lateral.</p>
                </div>
                <div>
                  <Card className="flex min-h-[16rem] flex-col">
                    <img src="/brand/logo-full.png" alt="" className="h-5 self-start" />
                    <Eyebrow className="mt-4">Informe · Planta 3</Eyebrow>
                    <p className={`mt-1 text-xl ${DISPLAY}`}>Resum d’estat <Accent>del parc.</Accent></p>
                    <div className="mt-3 space-y-1.5">
                      {DOCLINES.map(([label, value]) => (
                        <div key={label} className="flex justify-between border-b border-[#E2E8E4] pb-1 text-xs">
                          <span>{label}</span><b className="font-medium text-[#0B2016]">{value}</b>
                        </div>
                      ))}
                    </div>
                    <p className="mt-auto border-t border-[#E2E8E4] pt-2 text-[11px]">benlligat.com · pàgina 1</p>
                  </Card>
                  <h3 className={`mt-4 text-2xl ${CARD_TITLE}`}>Document</h3>
                  <p className="mt-2 text-sm leading-relaxed">A4, fons blanc o #FAFAFA, marges 18 mm, logotip a dalt a l’esquerra, titulars Cabinet, cos Outfit 10–11 pt, peu amb web i paginació.</p>
                </div>
              </div>
            </Section>

            <Section id="fitxa">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <Eyebrow>09 · Fitxa ràpida</Eyebrow>
                  <H2>Benlligat en <Accent>una pàgina.</Accent></H2>
                </div>
                <img src="/brand/logo-full.png" alt="Benlligat" className="h-12" />
              </div>
              <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <Card>
                  <Eyebrow muted>Color</Eyebrow>
                  {[
                    ["#1A5336", "Order Green"],
                    ["#0B2016", "Ink · text"],
                    ["#4A5D53", "Text secundari"],
                    ["#FAFAFA", "Fons"],
                    ["#FFFFFF", "Targetes"],
                    ["#E2E8E4", "Vores"],
                    ["#133D27", "Hover"],
                    ["#A6E08A", "Llima"],
                  ].map(([hex, name]) => (
                    <p key={hex} className="mt-2 flex items-center gap-2 text-sm text-[#0B2016]">
                      <span className="h-4 w-4 rounded border border-[#062A18]/10" style={{ background: hex }} />
                      <Hex hex={hex} /> {name}
                    </p>
                  ))}
                </Card>
                <Card>
                  <Eyebrow muted>Tipografia</Eyebrow>
                  <p className={`mt-4 text-3xl ${DISPLAY}`}>Cabinet 500</p>
                  <p className="text-sm">H1 −0,05 em · 0,95 · #0B2016<br />H2/H3/xifres −0,025 em</p>
                  <p className="mt-4 text-2xl text-[#0B2016]">Outfit 400</p>
                  <p className="text-sm">Cos 18–20 px · 1,625 · #4A5D53</p>
                  <p className="mt-4"><span className="rounded-full bg-[#E6EFE7] px-3 py-1 text-xs font-medium text-[#1A5336]">Badge 500 · 12 px</span></p>
                  <p className="mt-2 text-sm">#E6EFE7 / #1A5336</p>
                </Card>
                <Card>
                  <Eyebrow muted>Forma</Eyebrow>
                  <p className="mt-3 text-sm leading-relaxed">Radi base 16 px · targetes 24 px · botons i pills 999 px · símbol 33%</p>
                  <p className="mt-2 text-sm leading-relaxed">Vora 1 px #E2E8E4 · ombra 0 8 30 rgba(0,0,0,.04)</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <span className="rounded-full bg-[#1A5336] px-3 py-1.5 text-xs font-medium text-white">Vols provar?</span>
                    <span className="rounded-full bg-[#A6E08A] px-3 py-1.5 text-xs font-medium text-[#0B2016]">Llima</span>
                  </div>
                  <p className="mt-3 text-sm">Hover #133D27 · focus anell llima</p>
                </Card>
                <Card>
                  <Eyebrow muted>Regles d’or</Eyebrow>
                  <ul className="mt-3 space-y-2 text-sm leading-relaxed">
                    {["Titulars Cabinet 500; una frase clau en verd.", "Verd escàs: aprox. 8% de la superfície.", "Logo sense deformar ni recolorir; espai x = ¼ del símbol.", "Xifres d’exemple sempre etiquetades.", "Text: AA mínim (4,5:1)."].map((item) => (
                      <li key={item} className="flex gap-2"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#1A5336]" />{item}</li>
                    ))}
                  </ul>
                </Card>
              </div>
              <Card className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
                <span className="inline-flex shrink-0 rounded-full bg-[#FFF4E5] px-2 py-0.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#7A4B00]">Pendent de definir</span>
                <p className="text-sm leading-relaxed">SVG oficial del logotip · Pantone/CMYK validat per impremta · estil fotogràfic · color d’alerta oficial.</p>
              </Card>
            </Section>
          </main>
        </div>
      </div>
    </div>
  );
}
