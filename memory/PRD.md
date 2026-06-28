# Benlligat — Landing Page (PRD)

## Original Problem Statement
Static one-page landing for "Benlligat" (green colors, Catalan content) for hoteliers about managing bulky mattress waste in the circular economy: inventory, 8-year decreasing useful life, carbon footprint, mandatory blockchain-backed digital passport, maintenance logs, stakeholders (manufacturers, waste managers TIRGY, certifiers, Red Cross). Plus a premium Apple/Dyson-style 3D mattress: 360° drag rotate, idle auto-rotate, scroll-driven layer disassembly, web-optimized & responsive.

## User Choices
- Real 3D with Three.js (React Three Fiber). 100% static frontend (no backend/DB).
- CTA "Vols provar?" opens a contact/email form. Catalan only. Designer-chosen green palette + typography.

## Architecture
- Frontend-only React app. No backend used (REACT_APP_BACKEND_URL set but unused).
- 3D: three + @react-three/fiber + @react-three/drei (OrbitControls autoRotate/drag, RoundedBox layers, Instances springs, ContactShadows, Float).
- Sticky 380vh experience section drives explode via scroll listener → explodeRef (no re-render) + progress state for captions.
- Contact form stores leads in localStorage and shows sonner toast.
- Fonts: Cabinet Grotesk (display) + Outfit (body). Greens: #1A5336 / #A6E08A / #E6EFE7.

## User Personas
- Hotel sustainability/operations managers responsible for mattress lifecycle & waste.

## Core Requirements (static)
- One-page, Catalan, green theme, premium 3D mattress, CTA → contact form, freemium messaging, stakeholders ecosystem, digital passport/blockchain narrative.

## Implemented (2026-06-28)
- Navbar (glass, sticky) + mobile menu.
- Hero with 3D mattress (Apple-style split), CTAs.
- Scroll-driven 3D disassembly with 4 lifecycle captions + progress rail.
- Passport & Blockchain bento section; Stakeholders ecosystem (6 actors incl. TIRGY, Creu Roja); Pricing (Freemium + Professional); Footer.
- Contact dialog (validated nom+email, success/error toasts, localStorage lead capture).
- Verified by testing agent: 100% frontend pass, zero console errors.

## Backlog / Next
- P1: Wire contact form to a real backend + email (Resend) to capture real leads.
- P1: Add a static GLTF photorealistic mattress + Environment HDR for higher realism.
- P2: i18n (add ES/EN), SEO meta/OG tags, analytics.
- P2: aria-hidden on inactive captions for screen readers; email regex validation.
