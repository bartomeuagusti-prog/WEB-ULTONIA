// Dades del titular per a la Política de privacitat i l'Avís legal.
// Tot el que és entre claudàtors és PENDENT: s'ha de substituir per la dada real
// abans de donar els textos per bons. Es pinten destacats a la web perquè no s'escapin.
export const LEGAL = {
  marca: "Benlligat",
  raoSocial: "[RAÓ SOCIAL PENDENT]",
  nif: "[NIF PENDENT]",
  adreca: "[ADREÇA FISCAL PENDENT]",
  correuPrivacitat: "[CORREU DE PRIVACITAT PENDENT]",
  correuContacte: "[CORREU DE CONTACTE PENDENT]",
  registre: "[DADES REGISTRALS PENDENTS]",
  termini: "[TERMINI PENDENT]",
  jurisdiccio: "[JUTJATS COMPETENTS PENDENTS]",
  web: "benlligat.vercel.app",
  darreraActualitzacio: "25 d'octubre de 2026",
};

export const isPending = (v) => typeof v === "string" && v.startsWith("[") && v.endsWith("]");
