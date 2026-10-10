import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Leaf, Menu, X } from "lucide-react";

const LINKS = [
  { label: "Experiència", href: "#experiencia" },
  { label: "Passaport", href: "#passaport" },
  { label: "Ecosistema", href: "#ecosistema" },
];

export default function Navbar({ onContact }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled ? "backdrop-blur-xl bg-white/70 border-b border-white/40 shadow-[0_4px_20px_rgb(0,0,0,0.03)]" : "bg-transparent"
      }`}
      data-testid="navbar"
    >
      <nav className="max-w-7xl mx-auto px-6 md:px-12 h-16 flex items-center justify-between">
        <a href="#top" className="flex items-center gap-2" data-testid="navbar-brand">
          <span className="grid place-items-center h-9 w-9 rounded-xl bg-[#1A5336] text-white">
            <Leaf className="h-5 w-5" />
          </span>
          <span className="font-display text-xl tracking-tight text-[#0B2016]">Benlligat</span>
        </a>

        <div className="hidden md:flex items-center gap-8">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm font-medium text-[#4A5D53] hover:text-[#1A5336] transition-colors"
              data-testid={`navlink-${l.href.replace("#", "")}`}
            >
              {l.label}
            </a>
          ))}
          <Button
            onClick={onContact}
            data-testid="navbar-cta"
            className="rounded-full bg-[#1A5336] hover:bg-[#133D27] text-white px-6 font-medium transition-all"
          >
            Vols provar?
          </Button>
        </div>

        <button
          className="md:hidden text-[#0B2016]"
          onClick={() => setOpen((o) => !o)}
          data-testid="navbar-menu-toggle"
          aria-label="Menú"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {open && (
        <div className="md:hidden backdrop-blur-xl bg-white/90 border-b border-white/40 px-6 py-4 space-y-3">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block text-base font-medium text-[#4A5D53]"
            >
              {l.label}
            </a>
          ))}
          <Button
            onClick={() => { setOpen(false); onContact(); }}
            className="w-full rounded-full bg-[#1A5336] hover:bg-[#133D27] text-white font-medium"
          >
            Vols provar?
          </Button>
        </div>
      )}
    </header>
  );
}
