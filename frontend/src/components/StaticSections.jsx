import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Fingerprint,
  Blocks,
  Files,
  Gauge,
  QrCode,
  Recycle,
  Factory,
  Truck,
  BadgeCheck,
  HeartHandshake,
  Building2,
  Landmark,
  Check,
  Leaf,
  ArrowRight,
} from "lucide-react";

const WAREHOUSE_IMG =
  "https://images.pexels.com/photos/4487383/pexels-photo-4487383.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940";

/* ---------------- Passport & Blockchain ---------------- */
export function PassportSection() {
  return (
    <section id="passaport" className="relative py-24 md:py-32 bg-[#FAFAFA]" data-testid="passport-section">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="max-w-3xl">
          <Badge className="bg-[#E6EFE7] text-[#1A5336] hover:bg-[#E6EFE7] rounded-full px-4 py-1 font-medium">
            Passaport digital obligatori
          </Badge>
          <h2 className="font-display text-4xl sm:text-5xl tracking-tight text-[#0B2016] mt-5 leading-tight">
            Cada matalàs, una identitat verificable.
          </h2>
          <p className="text-lg text-[#4A5D53] mt-5 leading-relaxed">
            Benlligat genera el passaport digital obligatori de cada matalàs, identificat
            amb un codi inequívoc amb suport blockchain i tots els arxius associats. Així
            es facilita el reciclatge, el desmuntatge i la reintroducció al mercat.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-6 gap-5 mt-14">
          {/* big card */}
          <div className="md:col-span-4 rounded-3xl bg-[#1A5336] text-white p-8 md:p-10 relative overflow-hidden shadow-[0_8px_32px_rgb(0,0,0,0.08)]">
            <div className="relative z-10">
              <Blocks className="h-8 w-8 text-[#A6E08A]" />
              <h3 className="font-display text-2xl md:text-3xl tracking-tight mt-5">
                Codi inequívoc amb suport blockchain
              </h3>
              <p className="text-white/75 mt-3 max-w-lg leading-relaxed">
                La identitat de cada matalàs queda registrada de forma immutable. La
                traçabilitat és transparent per a tots els actors del cicle del producte.
              </p>
              <div className="mt-6 inline-flex items-center gap-3 rounded-2xl bg-white/10 border border-white/15 px-4 py-3 font-mono text-sm text-[#A6E08A]">
                <QrCode className="h-5 w-5" />
                BLG-0xA9F3·2026·MTL·8Y
              </div>
            </div>
            <div className="absolute -right-10 -bottom-10 opacity-10">
              <Fingerprint className="h-64 w-64" />
            </div>
          </div>

          {/* tall card */}
          <div className="md:col-span-2 rounded-3xl bg-white border border-[#E2E8E4] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
            <Gauge className="h-7 w-7 text-[#1A5336]" />
            <h3 className="font-display text-xl tracking-tight text-[#0B2016] mt-4">
              Petjada de carboni
            </h3>
            <p className="text-[#4A5D53] mt-2 text-sm leading-relaxed">
              Quantifica l'impacte de cada peça i pren decisions amb dades reals.
            </p>
            <div className="mt-5 space-y-3">
              {[
                { l: "Fabricació", v: "62 kg CO₂e" },
                { l: "Vida útil restant", v: "5,4 anys" },
                { l: "Estalvi per reús", v: "−41%" },
              ].map((row) => (
                <div key={row.l} className="flex items-center justify-between text-sm">
                  <span className="text-[#4A5D53]">{row.l}</span>
                  <span className="font-medium text-[#0B2016]">{row.v}</span>
                </div>
              ))}
            </div>
          </div>

          {/* three small cards */}
          {[
            { icon: Fingerprint, t: "Identificació única", d: "Un codi inequívoc per matalàs, impossible de duplicar." },
            { icon: Files, t: "Arxius associats", d: "Factures, certificats, fitxes tècniques i historial complet." },
            { icon: Recycle, t: "Desmuntatge i reús", d: "Instruccions per al reciclatge i la reintroducció al mercat." },
          ].map((c) => (
            <div
              key={c.t}
              className="md:col-span-2 rounded-3xl bg-white border border-[#E2E8E4] p-7 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:-translate-y-1 transition-transform duration-300"
            >
              <c.icon className="h-7 w-7 text-[#1A5336]" />
              <h3 className="font-display text-lg tracking-tight text-[#0B2016] mt-4">{c.t}</h3>
              <p className="text-[#4A5D53] mt-2 text-sm leading-relaxed">{c.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Stakeholders Ecosystem ---------------- */
const ACTORS = [
  { icon: Building2, t: "Hotelers", d: "Creen i ubiquen els matalassos a l'inventari." },
  { icon: Factory, t: "Fabricants", d: "Aporten dades tècniques i de petjada de carboni." },
  { icon: Truck, t: "Gestors de residus", d: "Com TIRGY: planifiquen la recollida, la distribució, el tractament i el reciclatge." },
  { icon: BadgeCheck, t: "Certificadores", d: "Validen l'origen, el procés i la qualitat." },
  { icon: HeartHandshake, t: "Entitats del tercer sector", d: "Reaprofitament i reintroducció social dels matalassos reutilitzables per allargar-ne la vida útil." },
  { icon: Landmark, t: "Administració", d: "Tots comparteixen una mateixa font de veritat." },
];

export function StakeholdersSection() {
  return (
    <section id="ecosistema" className="relative py-24 md:py-32 bg-[#0B2016] text-white overflow-hidden" data-testid="stakeholders-section">
      <div
        className="absolute inset-0 opacity-20"
        style={{ backgroundImage: `url(${WAREHOUSE_IMG})`, backgroundSize: "cover", backgroundPosition: "center" }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#0B2016] via-[#0B2016]/85 to-[#0B2016]" />
      <div className="relative max-w-7xl mx-auto px-6 md:px-12">
        <div className="max-w-3xl">
          <Badge className="bg-white/10 text-[#A6E08A] hover:bg-white/10 rounded-full px-4 py-1 font-medium border border-white/15">
            Ecosistema connectat
          </Badge>
          <h2 className="font-display text-4xl sm:text-5xl tracking-tight mt-5 leading-tight">
            La mateixa dada a tots els stakeholders.
          </h2>
          <p className="text-lg text-white/70 mt-5 leading-relaxed">
            Benlligat comparteix la informació de cada matalàs amb fabricants, gestors de
            residus, certificadores i entitats del tercer sector, perquè tot el cicle del
            producte treballi amb les mateixes dades.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-14">
          {ACTORS.map((a) => (
            <div
              key={a.t}
              className="rounded-3xl bg-white/[0.04] border border-white/10 backdrop-blur-sm p-7 hover:bg-white/[0.07] transition-colors duration-300"
            >
              <span className="grid place-items-center h-12 w-12 rounded-2xl bg-[#A6E08A]/15 text-[#A6E08A]">
                <a.icon className="h-6 w-6" />
              </span>
              <h3 className="font-display text-xl tracking-tight mt-5">{a.t}</h3>
              <p className="text-white/65 mt-2 text-sm leading-relaxed">{a.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Pricing ---------------- */
const PLANS = [
  {
    name: "Freemium",
    price: "0€",
    period: "/ sempre",
    desc: "Comença a controlar el cicle de vida dels teus matalassos sense cost.",
    features: ["Fins a 200 matalassos", "Passaport digital bàsic", "Inventari i vida útil de 8 anys", "Registre de manteniment"],
    cta: "Comença gratis",
    highlight: false,
  },
  {
    name: "Professional",
    price: "A mida",
    period: "",
    desc: "Per a cadenes i grups hotelers que volen control total i traçabilitat completa.",
    features: ["Matalassos il·limitats", "Blockchain i codi inequívoc", "Petjada de carboni i informes", "Integracions amb tercers (API)", "Suport prioritari"],
    cta: "Vols provar?",
    highlight: true,
  },
];

export function PricingSection({ onContact }) {
  return (
    <section id="preus" className="relative py-24 md:py-32 bg-[#FAFAFA]" data-testid="pricing-section">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <div className="text-center max-w-2xl mx-auto">
          <Badge className="bg-[#E6EFE7] text-[#1A5336] hover:bg-[#E6EFE7] rounded-full px-4 py-1 font-medium">
            Model Freemium
          </Badge>
          <h2 className="font-display text-4xl sm:text-5xl tracking-tight text-[#0B2016] mt-5">
            Tria com vols començar.
          </h2>
          <p className="text-lg text-[#4A5D53] mt-4">
            Prova-ho gratis i escala quan ho necessitis. Sense compromisos.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-14">
          {PLANS.map((p) => (
            <div
              key={p.name}
              className={`rounded-3xl p-8 md:p-10 border transition-all duration-300 ${
                p.highlight
                  ? "bg-[#1A5336] text-white border-[#1A5336] shadow-[0_20px_50px_rgb(26,83,54,0.25)] md:-translate-y-2"
                  : "bg-white text-[#0B2016] border-[#E2E8E4] shadow-[0_8px_30px_rgb(0,0,0,0.04)]"
              }`}
              data-testid={`pricing-card-${p.name.toLowerCase()}`}
            >
              <div className="flex items-center justify-between">
                <h3 className="font-display text-2xl tracking-tight">{p.name}</h3>
                {p.highlight && <Leaf className="h-6 w-6 text-[#A6E08A]" />}
              </div>
              <div className="mt-5 flex items-end gap-1">
                <span className="font-display text-5xl tracking-tighter">{p.price}</span>
                <span className={`mb-1.5 text-sm ${p.highlight ? "text-white/60" : "text-[#4A5D53]"}`}>{p.period}</span>
              </div>
              <p className={`mt-4 text-sm leading-relaxed ${p.highlight ? "text-white/75" : "text-[#4A5D53]"}`}>
                {p.desc}
              </p>
              <ul className="mt-6 space-y-3">
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-sm">
                    <Check className={`h-5 w-5 shrink-0 ${p.highlight ? "text-[#A6E08A]" : "text-[#1A5336]"}`} />
                    <span className={p.highlight ? "text-white/90" : "text-[#0B2016]"}>{f}</span>
                  </li>
                ))}
              </ul>
              <Button
                onClick={onContact}
                data-testid={`pricing-cta-${p.name.toLowerCase()}`}
                className={`mt-8 w-full rounded-full py-6 text-base font-medium transition-all group ${
                  p.highlight
                    ? "bg-[#A6E08A] text-[#0B2016] hover:bg-[#8BC96F]"
                    : "bg-[#1A5336] text-white hover:bg-[#133D27]"
                }`}
              >
                {p.cta}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Footer ---------------- */
export function Footer({ onContact }) {
  return (
    <footer className="bg-[#0B2016] text-white py-16" data-testid="footer">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
          <div className="max-w-md">
            <div className="flex items-center gap-2">
              <span className="grid place-items-center h-9 w-9 rounded-xl bg-[#A6E08A] text-[#0B2016]">
                <Leaf className="h-5 w-5" />
              </span>
              <span className="font-display text-xl tracking-tight">Benlligat</span>
            </div>
            <p className="text-white/60 mt-4 text-sm leading-relaxed">
              Control i traçabilitat del residu voluminós dels matalassos per a hotelers,
              dins l'economia circular.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 self-start">
            <Button
              onClick={onContact}
              data-testid="footer-cta"
              className="rounded-full bg-[#A6E08A] text-[#0B2016] hover:bg-[#8BC96F] px-8 py-6 text-base font-medium"
            >
              Vols provar?
            </Button>
            <a
              href="https://benlligat-v1.vercel.app/"
              data-testid="footer-login"
              className="inline-flex items-center justify-center rounded-full border border-white/30 text-white hover:bg-white/10 px-8 py-3 text-base font-medium transition-colors"
            >
              Inicia sessió
            </a>
          </div>
        </div>
        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col sm:flex-row justify-between gap-4 text-sm text-white/50">
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-6">
            <span>© 2026 Benlligat. Tots els drets reservats.</span>
            <Link to="/privacitat" data-testid="footer-privacy-link" className="hover:text-white">
              Política de privacitat
            </Link>
            <Link to="/avis-legal" data-testid="footer-legal-link" className="hover:text-white">
              Avís legal
            </Link>
          </div>
          <Link
            to="/dossier"
            data-testid="footer-deck-link"
            className="text-xs text-white/30 hover:text-white/55"
          >
            Dossier
          </Link>
          <span>Economia circular · Passaport digital · Blockchain</span>
        </div>
      </div>
    </footer>
  );
}
