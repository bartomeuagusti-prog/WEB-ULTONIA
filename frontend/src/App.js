import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "@/App.css";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ExperienceSection from "@/components/ExperienceSection";
import ExperienceAlternatives from "@/components/ExperienceAlternatives";
import ContactDialog from "@/components/ContactDialog";
import {
  PassportSection,
  StakeholdersSection,
  PricingSection,
  Footer,
} from "@/components/StaticSections";
import { Toaster } from "@/components/ui/sonner";
import Admin from "@/pages/Admin";

function Landing() {
  const [contactOpen, setContactOpen] = useState(false);
  const openContact = () => setContactOpen(true);

  return (
    <div className="App bg-[#FAFAFA]" id="top" data-testid="app-root">
      <Navbar onContact={openContact} />
      <main>
        <Hero onContact={openContact} />
        <ExperienceSection />
        <ExperienceAlternatives />
        <PassportSection />
        <StakeholdersSection />
        <PricingSection onContact={openContact} />
      </main>
      <Footer onContact={openContact} />
      <ContactDialog open={contactOpen} onOpenChange={setContactOpen} />
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
      <Toaster position="top-center" richColors />
    </BrowserRouter>
  );
}

export default App;
