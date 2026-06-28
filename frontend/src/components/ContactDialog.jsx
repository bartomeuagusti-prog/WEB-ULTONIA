import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Leaf, Loader2 } from "lucide-react";

export default function ContactDialog({ open, onOpenChange }) {
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({ nom: "", hotel: "", email: "", missatge: "" });

  const update = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.nom || !form.email) {
      toast.error("Cal omplir el nom i el correu electrònic.");
      return;
    }
    setSubmitting(true);
    setTimeout(() => {
      try {
        const leads = JSON.parse(localStorage.getItem("benlligat_leads") || "[]");
        leads.push({ ...form, ts: new Date().toISOString() });
        localStorage.setItem("benlligat_leads", JSON.stringify(leads));
      } catch (_) {}
      setSubmitting(false);
      onOpenChange(false);
      setForm({ nom: "", hotel: "", email: "", missatge: "" });
      toast.success("Gràcies! Ens posarem en contacte molt aviat.", {
        description: "Un membre de l'equip de Benlligat et prepararà una demo personalitzada.",
      });
    }, 900);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="sm:max-w-[480px] rounded-3xl border-[#E2E8E4] p-0 overflow-hidden"
        data-testid="contact-dialog"
      >
        <div className="bg-[#1A5336] px-7 pt-7 pb-6 text-white">
          <div className="flex items-center gap-2 text-[#A6E08A]">
            <Leaf className="h-5 w-5" />
            <span className="text-sm font-medium tracking-wide">Benlligat · Freemium</span>
          </div>
          <DialogHeader className="mt-3 text-left space-y-1">
            <DialogTitle className="font-display text-2xl tracking-tight text-white">
              Vols provar Benlligat?
            </DialogTitle>
            <DialogDescription className="text-white/70 text-sm">
              Reserva una demo gratuïta i descobreix com controlar el cicle de vida dels teus matalassos.
            </DialogDescription>
          </DialogHeader>
        </div>

        <form onSubmit={handleSubmit} className="px-7 py-6 space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="nom" className="text-[#4A5D53]">Nom i cognoms *</Label>
            <Input
              id="nom"
              data-testid="contact-input-nom"
              value={form.nom}
              onChange={update("nom")}
              placeholder="Maria Puig"
              className="rounded-lg focus-visible:ring-[#A6E08A]"
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="hotel" className="text-[#4A5D53]">Hotel / Establiment</Label>
            <Input
              id="hotel"
              data-testid="contact-input-hotel"
              value={form.hotel}
              onChange={update("hotel")}
              placeholder="Hotel Mediterrani"
              className="rounded-lg focus-visible:ring-[#A6E08A]"
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="email" className="text-[#4A5D53]">Correu electrònic *</Label>
            <Input
              id="email"
              type="email"
              data-testid="contact-input-email"
              value={form.email}
              onChange={update("email")}
              placeholder="maria@hotel.cat"
              className="rounded-lg focus-visible:ring-[#A6E08A]"
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="missatge" className="text-[#4A5D53]">Missatge</Label>
            <Textarea
              id="missatge"
              data-testid="contact-input-missatge"
              value={form.missatge}
              onChange={update("missatge")}
              placeholder="Quants matalassos gestioneu? Què t'agradaria resoldre?"
              className="rounded-lg focus-visible:ring-[#A6E08A] min-h-[90px]"
            />
          </div>
          <Button
            type="submit"
            disabled={submitting}
            data-testid="contact-submit-button"
            className="w-full rounded-full bg-[#1A5336] hover:bg-[#133D27] text-white py-6 text-base font-medium transition-all"
          >
            {submitting ? (
              <><Loader2 className="h-4 w-4 animate-spin" /> Enviant…</>
            ) : (
              "Demana la teva demo gratuïta"
            )}
          </Button>
          <p className="text-xs text-center text-[#4A5D53]/70">
            Sense compromís · Pla Freemium disponible des del primer dia
          </p>
        </form>
      </DialogContent>
    </Dialog>
  );
}
