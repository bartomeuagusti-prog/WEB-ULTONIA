import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Leaf } from "lucide-react";
import { LEGAL, isPending } from "@/pages/legalData";

// Mostra una dada del titular; si és pendent, la ressalta perquè no passi desapercebuda.
export function D({ k }) {
  const v = LEGAL[k];
  if (isPending(v)) {
    return (
      <span
        className="rounded px-1 py-0.5 bg-[#A6E08A]/50 text-[#0B2016] font-semibold whitespace-nowrap"
        data-testid={`legal-pending-${k}`}
      >
        {v}
      </span>
    );
  }
  return <>{v}</>;
}

export function H2({ children }) {
  return (
    <h2 className="font-display font-medium tracking-tighter leading-[0.95] text-2xl md:text-3xl text-[#0B2016] mt-12 mb-4">
      {children}
    </h2>
  );
}

export function P({ children }) {
  return <p className="text-[#4A5D53] leading-relaxed mt-3">{children}</p>;
}

export function UL({ children }) {
  return <ul className="list-disc pl-6 mt-3 space-y-2 text-[#4A5D53] leading-relaxed">{children}</ul>;
}

export default function LegalLayout({ title, docTitle, children }) {
  useEffect(() => {
    const previous = document.title;
    document.title = docTitle;
    window.scrollTo(0, 0);
    return () => {
      document.title = previous;
    };
  }, [docTitle]);

  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      <header className="border-b border-[#E2E8E4] bg-white/70 backdrop-blur-xl">
        <nav className="max-w-7xl mx-auto px-6 md:px-12 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2" data-testid="legal-brand">
            <span className="grid place-items-center h-9 w-9 rounded-xl bg-[#1A5336] text-white">
              <Leaf className="h-5 w-5" />
            </span>
            <span className="font-display text-xl tracking-tight text-[#0B2016]">Benlligat</span>
          </Link>
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-[#1A5336] hover:text-[#133D27]"
            data-testid="legal-back-home"
          >
            <ArrowLeft className="h-4 w-4" /> Torna a l'inici
          </Link>
        </nav>
      </header>

      <main className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h1 className="font-display font-medium tracking-tighter leading-[0.95] text-4xl md:text-6xl text-[#0B2016]">
          {title}
        </h1>
        <p className="mt-6 text-sm text-[#4A5D53]">
          Darrera actualització: {LEGAL.darreraActualitzacio}
        </p>
        <div className="mt-6 rounded-2xl border border-[#E2E8E4] bg-white p-5 text-sm text-[#4A5D53]">
          Esborrany. Les dades{" "}
          <span className="rounded px-1 py-0.5 bg-[#A6E08A]/50 text-[#0B2016] font-semibold">
            ressaltades
          </span>{" "}
          estan pendents de completar.
        </div>
        <article>{children}</article>

        <div className="mt-16 pt-8 border-t border-[#E2E8E4] flex flex-wrap gap-6 text-sm">
          <Link to="/" className="text-[#1A5336] hover:text-[#133D27] font-medium">
            ← Torna a l'inici
          </Link>
          <Link to="/privacitat" className="text-[#4A5D53] hover:text-[#133D27]">
            Política de privacitat
          </Link>
          <Link to="/avis-legal" className="text-[#4A5D53] hover:text-[#133D27]">
            Avís legal
          </Link>
        </div>
      </main>
    </div>
  );
}
