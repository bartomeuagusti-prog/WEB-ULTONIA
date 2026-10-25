import React from "react";
import { Link } from "react-router-dom";
import LegalLayout, { D, H2, P, UL } from "@/pages/LegalLayout";

export default function LegalNotice() {
  return (
    <LegalLayout title="Avís legal" docTitle="Avís legal · Benlligat">
      <H2>1. Dades del titular</H2>
      <P>
        En compliment de l'article 10 de la Llei 34/2002, de serveis de la societat de la informació i
        de comerç electrònic (LSSI-CE), t'informem de les dades del titular d'aquest lloc web:
      </P>
      <UL>
        <li>Titular: <D k="raoSocial" /></li>
        <li>Marca comercial: Benlligat</li>
        <li>NIF: <D k="nif" /></li>
        <li>Domicili: <D k="adreca" /></li>
        <li>Correu electrònic: <D k="correuContacte" /></li>
        <li>Dades registrals: <D k="registre" /></li>
      </UL>

      <H2>2. Objecte</H2>
      <P>
        Aquest lloc web presenta Benlligat, un servei de control i traçabilitat del cicle de vida dels
        matalassos, i permet contactar amb nosaltres per demanar informació o una demo.
      </P>

      <H2>3. Condicions d'ús</H2>
      <P>
        Accedir al web i navegar-hi et dona la condició d'usuari i implica que acceptes aquest avís
        legal. Et comprometes a fer-ne un ús correcte, d'acord amb la llei, la bona fe i l'ordre públic, i a no:
      </P>
      <UL>
        <li>Fer servir el web per a activitats il·lícites o que lesionin drets de tercers.</li>
        <li>Introduir virus o qualsevol codi que pugui danyar els sistemes del titular o de tercers.</li>
        <li>Enviar a través del formulari dades falses o de terceres persones sense el seu consentiment.</li>
      </UL>

      <H2>4. Propietat intel·lectual i industrial</H2>
      <P>
        Els continguts del web (textos, imatges, disseny, logotips, marques i codi) són titularitat de{" "}
        <D k="raoSocial" /> o es fan servir amb autorització dels seus titulars. No se'n permet la
        reproducció, distribució, comunicació pública ni transformació sense autorització prèvia per escrit.
      </P>

      <H2>5. Responsabilitat</H2>
      <P>
        Treballem perquè la informació del web sigui correcta i estigui actualitzada, però no en
        garantim l'absència d'errors ni la disponibilitat ininterrompuda. Les xifres i dades marcades
        com a exemple són il·lustratives. No som responsables dels danys derivats d'un ús indegut del web
        ni dels continguts d'altres llocs als quals es pugui accedir mitjançant enllaços.
      </P>

      <H2>6. Protecció de dades</H2>
      <P>
        El tractament de les dades personals es regeix per la nostra{" "}
        <Link to="/privacitat" className="text-[#1A5336] underline hover:text-[#133D27]">
          Política de privacitat
        </Link>.
      </P>

      <H2>7. Llei aplicable i jurisdicció</H2>
      <P>
        Aquest avís legal es regeix per la legislació espanyola. Per a qualsevol controvèrsia, les parts
        se sotmeten als jutjats i tribunals de <D k="jurisdiccio" />, llevat que la normativa de
        consumidors i usuaris estableixi un altre fur.
      </P>
    </LegalLayout>
  );
}
