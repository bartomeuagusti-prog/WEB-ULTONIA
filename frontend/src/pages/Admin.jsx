import React, { useState, useEffect, useCallback } from "react";
import { api } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toast } from "sonner";
import { Leaf, Loader2, LogOut, RefreshCw, Trash2 } from "lucide-react";

function formatDate(ts) {
  try {
    return new Date(ts).toLocaleString("ca-ES", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch (_) {
    return ts;
  }
}

export default function Admin() {
  const [authed, setAuthed] = useState(!!localStorage.getItem("admin_token"));
  const [password, setPassword] = useState("");
  const [loggingIn, setLoggingIn] = useState(false);
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadLeads = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await api.get("/admin/leads");
      setLeads(data);
    } catch (err) {
      if (err?.response?.status === 401) {
        localStorage.removeItem("admin_token");
        setAuthed(false);
        toast.error("Sessió caducada. Torna a iniciar sessió.");
      } else {
        toast.error("No s'han pogut carregar les sol·licituds.");
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (authed) loadLeads();
  }, [authed, loadLeads]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoggingIn(true);
    try {
      const { data } = await api.post("/admin/login", { password });
      localStorage.setItem("admin_token", data.token);
      setPassword("");
      setAuthed(true);
    } catch (err) {
      const detail = err?.response?.data?.detail;
      toast.error(typeof detail === "string" ? detail : "No s'ha pogut iniciar sessió.");
    } finally {
      setLoggingIn(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("admin_token");
    setAuthed(false);
    setLeads([]);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Segur que vols esborrar aquesta sol·licitud?")) return;
    try {
      await api.delete(`/admin/leads/${id}`);
      setLeads((prev) => prev.filter((l) => l.id !== id));
      toast.success("Sol·licitud esborrada.");
    } catch (_) {
      toast.error("No s'ha pogut esborrar.");
    }
  };

  // --- Pantalla de login ---
  if (!authed) {
    return (
      <div className="min-h-screen bg-[#FAFAFA] flex items-center justify-center px-4">
        <form
          onSubmit={handleLogin}
          className="w-full max-w-sm bg-white rounded-3xl border border-[#E2E8E4] overflow-hidden shadow-sm"
        >
          <div className="bg-[#1A5336] px-7 pt-7 pb-6 text-white">
            <div className="flex items-center gap-2 text-[#A6E08A]">
              <Leaf className="h-5 w-5" />
              <span className="text-sm font-medium tracking-wide">Benlligat · Admin</span>
            </div>
            <h1 className="mt-3 text-2xl font-semibold tracking-tight">Panell d'administració</h1>
            <p className="text-white/70 text-sm mt-1">Introdueix la contrasenya per continuar.</p>
          </div>
          <div className="px-7 py-6 space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="password" className="text-[#4A5D53]">Contrasenya</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="rounded-lg focus-visible:ring-[#A6E08A]"
                autoFocus
              />
            </div>
            <Button
              type="submit"
              disabled={loggingIn || !password}
              className="w-full rounded-full bg-[#1A5336] hover:bg-[#133D27] text-white py-6 text-base font-medium"
            >
              {loggingIn ? <><Loader2 className="h-4 w-4 animate-spin" /> Entrant…</> : "Entrar"}
            </Button>
          </div>
        </form>
      </div>
    );
  }

  // --- Panell de leads ---
  return (
    <div className="min-h-screen bg-[#FAFAFA] px-4 py-8 md:px-10">
      <div className="max-w-5xl mx-auto">
        <header className="flex items-center justify-between mb-6">
          <div>
            <div className="flex items-center gap-2 text-[#1A5336]">
              <Leaf className="h-5 w-5" />
              <span className="text-sm font-medium tracking-wide">Benlligat · Admin</span>
            </div>
            <h1 className="text-2xl font-semibold tracking-tight text-[#1A2E24] mt-1">
              Sol·licituds de demo{" "}
              <span className="text-[#4A5D53] font-normal">({leads.length})</span>
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              onClick={loadLeads}
              disabled={loading}
              className="rounded-full gap-2"
            >
              <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} /> Actualitzar
            </Button>
            <Button variant="ghost" onClick={handleLogout} className="rounded-full gap-2 text-[#4A5D53]">
              <LogOut className="h-4 w-4" /> Sortir
            </Button>
          </div>
        </header>

        <div className="bg-white rounded-2xl border border-[#E2E8E4] overflow-hidden">
          {leads.length === 0 && !loading ? (
            <div className="py-16 text-center text-[#4A5D53]">
              Encara no hi ha cap sol·licitud.
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Data</TableHead>
                  <TableHead>Nom</TableHead>
                  <TableHead>Hotel</TableHead>
                  <TableHead>Correu</TableHead>
                  <TableHead>Missatge</TableHead>
                  <TableHead className="w-10"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {leads.map((lead) => (
                  <TableRow key={lead.id}>
                    <TableCell className="whitespace-nowrap text-sm text-[#4A5D53]">
                      {formatDate(lead.ts)}
                    </TableCell>
                    <TableCell className="font-medium">{lead.nom}</TableCell>
                    <TableCell>{lead.hotel || "—"}</TableCell>
                    <TableCell>
                      <a href={`mailto:${lead.email}`} className="text-[#1A5336] underline">
                        {lead.email}
                      </a>
                    </TableCell>
                    <TableCell className="max-w-xs text-sm text-[#4A5D53]">
                      {lead.missatge || "—"}
                    </TableCell>
                    <TableCell>
                      <button
                        onClick={() => handleDelete(lead.id)}
                        className="text-[#4A5D53] hover:text-red-600 transition-colors"
                        title="Esborrar"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </div>
      </div>
    </div>
  );
}
