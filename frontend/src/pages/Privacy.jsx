import React from "react";
import { Link } from "react-router-dom";
import LegalLayout, { D, H2, P, UL } from "@/pages/LegalLayout";

const A = ({ href, children }) => (
  <a href={href} target="_blank" rel="noopener noreferrer" className="text-[#1A5336] underline hover:text-[#133D27]">
    {children}
  </a>
);

export default function Privacy() {
  return (
    <LegalLayout title="Política de privacitat" docTitle="Política de privacitat · Benlligat">
      <P>
        Aquesta política explica com tractem les dades personals que ens facilites a través d'aquest
        lloc web, d'acord amb el Reglament (UE) 2016/679 general de protecció de dades (RGPD) i la Llei
        orgànica 3/2018, de protecció de dades personals i garantia dels drets digitals (LOPDGDD).
      </P>

      <H2>1. Responsable del tractament</H2>
      <UL>
        <li>Titular: <D k="raoSocial" /> (marca comercial Benlligat)</li>
        <li>NIF: <D k="nif" /></li>
        <li>Adreça: <D k="adreca" /></li>
        <li>Correu de contacte per a privacitat: <D k="correuPrivacitat" /></li>
      </UL>

      <H2>2. Quines dades recollim</H2>
      <P>Quan omples el formulari de contacte («Vols provar Benlligat?») recollim:</P>
      <UL>
        <li>Nom i cognoms (obligatori)</li>
        <li>Hotel o establiment (opcional)</li>
        <li>Correu electrònic (obligatori)</li>
        <li>Missatge (opcional)</li>
      </UL>
      <P>
        També desem la data i l'hora de l'enviament. No et demanem dades de categories especials; si us
        plau, no n'incloguis al missatge.
      </P>

      <H2>3. Per a què les fem servir</H2>
      <UL>
        <li>Respondre la teva sol·licitud de contacte i, si ho demanes, preparar una demo o l'alta al pla Freemium.</li>
        <li>
          Enviar-te comunicacions comercials relacionades amb Benlligat només si ens hi has donat el
          consentiment de manera expressa. Pots retirar-lo en qualsevol moment.
        </li>
      </UL>
      <P>No prenem decisions automatitzades ni elaborem perfils amb aquestes dades.</P>

      <H2>4. Base legal</H2>
      <P>
        El consentiment que ens dones en marcar la casella del formulari (article 6.1.a del RGPD).
        Pots retirar-lo quan vulguis, sense que això afecti la licitud del tractament anterior a la retirada.
      </P>

      <H2>5. Quant de temps les conservem</H2>
      <P>
        Conservem les dades el temps necessari per resoldre la teva sol·licitud i, com a màxim,{" "}
        <D k="termini" /> des de l'últim contacte, llevat que retiris abans el consentiment o en
        demanis la supressió. Després les suprimim o les mantenim bloquejades només durant els terminis
        legals de prescripció de possibles responsabilitats.
      </P>

      <H2>6. Destinataris i encarregats del tractament</H2>
      <P>
        No cedim les teves dades a tercers, llevat d'obligació legal. Per fer funcionar el web fem servir
        proveïdors que actuen com a encarregats del tractament:
      </P>
      <UL>
        <li>Vercel Inc. — allotjament del lloc web (frontend).</li>
        <li>Render Services, Inc. — allotjament del servidor (backend) que rep el formulari.</li>
        <li>MongoDB, Inc. (MongoDB Atlas) — base de dades on es desen les sol·licituds.</li>
      </UL>
      <P>
        Alguns d'aquests proveïdors tenen la seu als Estats Units i poden accedir a les dades o
        tractar-les fora de l'Espai Econòmic Europeu. En aquests casos, la transferència internacional
        s'empara en el Marc de Privacitat de Dades UE-EUA, quan el proveïdor hi està adherit, o en les
        clàusules contractuals tipus aprovades per la Comissió Europea.
      </P>

      <H2>7. Els teus drets</H2>
      <P>Pots exercir en qualsevol moment els drets següents:</P>
      <UL>
        <li>Accés a les teves dades.</li>
        <li>Rectificació de les dades inexactes.</li>
        <li>Supressió de les dades.</li>
        <li>Oposició al tractament.</li>
        <li>Limitació del tractament.</li>
        <li>Portabilitat de les dades.</li>
        <li>Retirada del consentiment.</li>
      </UL>
      <P>
        Per exercir-los, escriu a <D k="correuPrivacitat" /> indicant quin dret vols exercir. Si
        considerem que no podem identificar-te, et podrem demanar que acreditis la teva identitat.
      </P>
      <P>
        Si creus que no hem tractat bé les teves dades, pots presentar una reclamació davant l'Agència
        Espanyola de Protecció de Dades (<A href="https://www.aepd.es">www.aepd.es</A>).
      </P>

      <H2>8. Cookies i eines de tercers</H2>
      <P>
        <span className="rounded px-1 py-0.5 bg-[#A6E08A]/50 text-[#0B2016] font-semibold">
          [SECCIÓ DE COOKIES PENDENT]
        </span>{" "}
        Aquest apartat s'ha de completar quan es decideixi quines eines d'analítica fa servir el web.
      </P>

      <H2>9. Canvis en aquesta política</H2>
      <P>
        Podem actualitzar aquesta política per adaptar-la a canvis legals o del servei. La data de la
        darrera actualització apareix a dalt de tot. Consulta també l'<Link to="/avis-legal" className="text-[#1A5336] underline hover:text-[#133D27]">Avís legal</Link>.
      </P>
    </LegalLayout>
  );
}
