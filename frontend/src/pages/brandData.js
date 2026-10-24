/** Content from docs/brandbook/brandbook.html v1.1. Logos are the PNGs in /brand/. */

export const NAV = [
  { id: "portada", label: "Portada" },
  { id: "index", label: "Índex" },
  { id: "essencia", label: "Essència" },
  { id: "logotip", label: "Logotip" },
  { id: "regles", label: "Regles" },
  { id: "color", label: "Color" },
  { id: "suport", label: "Suport" },
  { id: "contrast", label: "Contrast" },
  { id: "tipografia", label: "Tipografia" },
  { id: "components", label: "Components" },
  { id: "grafics", label: "Gràfics" },
  { id: "imatge", label: "Imatge" },
  { id: "dades", label: "Dades" },
  { id: "aplicacions", label: "Aplicacions" },
  { id: "fitxa", label: "Fitxa" },
];

export const INDEX = [
  ["01", "Essència i to de veu", "03", "essencia"],
  ["02", "Logotip: versions", "04", "logotip"],
  ["02", "Logotip: protecció, mida i usos incorrectes", "05", "regles"],
  ["03", "Color: paleta principal", "06", "color"],
  ["03", "Color: colors de suport", "07", "suport"],
  ["03", "Color: tints i contrast", "08", "contrast"],
  ["04", "Tipografia", "09", "tipografia"],
  ["05", "Components d’interfície", "10", "components"],
  ["05", "Gràfics", "11", "grafics"],
  ["06", "Imatgeria i iconografia", "12", "imatge"],
  ["07", "Honestedat de dades", "13", "dades"],
  ["08", "Aplicacions", "14", "aplicacions"],
  ["09", "Fitxa ràpida", "15", "fitxa"],
];

export const TINTS = [
  { pct: "100%", hex: "#1A5336", ink: "#FFFFFF" },
  { pct: "80%", hex: "#48755E", ink: "#FFFFFF" },
  { pct: "60%", hex: "#769886", ink: "#0B2016" },
  { pct: "40%", hex: "#A3BAAF", ink: "#0B2016" },
  { pct: "20%", hex: "#D1DDD7", ink: "#0B2016" },
  { pct: "10%", hex: "#E8EEEB", ink: "#0B2016" },
  { pct: "5%", hex: "#F4F6F5", ink: "#0B2016" },
];

export const SUPPORT = [
  {
    name: "Ink",
    hex: "#0B2016",
    rgb: "11 · 32 · 22",
    cmyk: "66 · 0 · 31 · 87",
    use: "Text principal, titulars, èmfasi (Outfit 500) i fons de les seccions fosques i del peu.",
    light: true,
    pairs: [
      ["sobre #FAFAFA", "16,33:1", "AAA"],
      ["blanc a sobre", "17,04:1", "AAA"],
    ],
  },
  {
    name: "Text secundari",
    hex: "#4A5D53",
    rgb: "74 · 93 · 83",
    cmyk: "20 · 0 · 11 · 64",
    use: "Paràgrafs, entradetes, enllaços del menú, etiquetes de xifres.",
    light: true,
    pairs: [
      ["sobre #FAFAFA", "6,75:1", "AA"],
      ["sobre blanc", "7,04:1", "AAA"],
    ],
  },
  {
    name: "Vora",
    hex: "#E2E8E4",
    rgb: "226 · 232 · 228",
    cmyk: "3 · 0 · 2 · 9",
    use: "Vores d’1 px de targetes, botó secundari i separadors. No és color de text.",
    light: false,
    pairs: [["sobre blanc", "1,24:1", "només decoratiu"]],
  },
  {
    name: "Hover",
    hex: "#133D27",
    rgb: "19 · 61 · 39",
    cmyk: "69 · 0 · 36 · 76",
    use: "Botó primari en hover. Mateix ús que Order Green, un pas més fosc.",
    light: true,
    pairs: [["text blanc", "12,18:1", "AAA"]],
  },
  {
    name: "Llima",
    hex: "#A6E08A",
    rgb: "166 · 224 · 138",
    cmyk: "26 · 0 · 38 · 12",
    use: "Accent sobre fons foscos: botó del peu, icones, badge fosc, selecció de text, anell de focus.",
    light: false,
    pairs: [
      ["text #0B2016", "11,08:1", "AAA"],
      ["sobre Order Green", "5,85:1", "AA"],
    ],
  },
];

export const CONTRAST = [
  { name: "Blanc / Order Green", fg: "#FFFFFF", bg: "#1A5336", ratio: "9.00:1", level: "AAA", ok: true },
  { name: "Ink / Fons", fg: "#0B2016", bg: "#FAFAFA", ratio: "16.33:1", level: "AAA", ok: true },
  { name: "Order Green / Fons", fg: "#1A5336", bg: "#FAFAFA", ratio: "8.62:1", level: "AAA", ok: true },
  { name: "Text secundari / Fons", fg: "#4A5D53", bg: "#FAFAFA", ratio: "6.75:1", level: "AA", ok: true },
  { name: "Order Green / Badge", fg: "#1A5336", bg: "#E6EFE7", ratio: "7.65:1", level: "AAA", ok: true },
  { name: "Blanc / Ink", fg: "#FFFFFF", bg: "#0B2016", ratio: "17.04:1", level: "AAA", ok: true },
  { name: "Llima / Ink", fg: "#A6E08A", bg: "#0B2016", ratio: "11.08:1", level: "AAA", ok: true },
  { name: "Blanc / Hover", fg: "#FFFFFF", bg: "#133D27", ratio: "12.18:1", level: "AAA", ok: true },
  { name: "Order Green / Ink", fg: "#1A5336", bg: "#0B2016", ratio: "1.89:1", level: "No apte", ok: false },
];

export const TONES = [
  { chips: ["#ECF4EC", "#F3F5F4"], where: "Degradat del hero", rule: "Només degradat subtil sobre #FAFAFA" },
  { chips: ["#F4F7F4", "#D5E2DA"], where: "Matalàs 3D", rule: "Fons i línies de l’escena" },
  { chips: ["#E5F2EA", "#E7EFEA"], where: "Deck", rule: "Equivalents a #E6EFE7: unificar-hi" },
];

export const BARS = [
  { label: "Reutilitzar", note: "Neteja i torna al servei", value: 38, accent: false },
  { label: "Renovar", note: "Canvi de funda o capes", value: 24, accent: false },
  { label: "Reciclar", note: "Separació per materials", value: 30, accent: false },
  { label: "Recuperat", note: "Total que no va a abocador", value: 92, accent: true },
];

export const DOWNLOADS = [
  { href: "/brand/Benlligat-Brand-Book.pdf", file: "Benlligat-Brand-Book.pdf", label: "Brand Book (PDF)" },
  { href: "/brand/benlligat-logo.png", file: "benlligat-logo.png", label: "Logo oficial" },
  { href: "/brand/logo-full-official.png", file: "logo-full-official.png", label: "Logo complet oficial" },
  { href: "/brand/logo-full.png", file: "logo-full.png", label: "Complet · positiu" },
  { href: "/brand/logo-full-reversed.png", file: "logo-full-reversed.png", label: "Complet · invertit" },
  { href: "/brand/mark.png", file: "mark.png", label: "Símbol · positiu" },
  { href: "/brand/mark-reversed.png", file: "mark-reversed.png", label: "Símbol · invertit" },
];

export const DOCLINES = [
  ["Matalassos en servei", "—"],
  ["Inspeccions pendents", "—"],
  ["Incidències obertes", "—"],
  ["Baixes del període", "—"],
];
