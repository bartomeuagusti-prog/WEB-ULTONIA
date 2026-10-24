/** Copy and structure for the hospital dossier. Example figures are illustrative only. */

export const SECTIONS = [
  {
    id: "00",
    nav: "Portada",
    sidebar: "howto",
    notes: [
      {
        n: 1,
        pending: true,
        text: "L'inventari de la portada és un format d'exemple per ensenyar com es llegeix una xifra. No correspon a cap centre.",
      },
    ],
  },
  {
    id: "01",
    nav: "Per què",
    kicker: "Pregunta 1 de 8",
    question: "Per què els matalassos importen a l'hospital?",
    answer: [
      { t: "Perquè són una " },
      { t: "superfície clínica", accent: true },
      { t: " i un residu voluminós." },
    ],
    sidebar: "notes",
    notes: [
      {
        n: 1,
        pending: true,
        text: "Higiene, fluids i control d'infeccions: criteri de treball de la hoteleria hospitalària. Sense taxa ni estudi citat.",
      },
      {
        n: 2,
        pending: true,
        text: "Els matalassos d'alleujament de la pressió són equipament de pacient. El model i la deformació importen.",
      },
      {
        n: 3,
        pending: true,
        text: "Un matalàs de baixa és residu voluminós: ocupa, pesa i barreja materials.",
      },
    ],
  },
  {
    id: "02",
    nav: "Què és",
    kicker: "Pregunta 2 de 8",
    question: "Què fa Benlligat?",
    answer: [
      { t: "Dona " },
      { t: "identitat a cada matalàs", accent: true },
      { t: " per fer el seguiment durant tota la seva vida útil." },
    ],
    sidebar: "notes",
    notes: [
      {
        n: 1,
        pending: false,
        text: "GS1 Digital Link és un estàndard de GS1: un QR pot portar un identificador que es resol en una adreça web.",
      },
      {
        n: 2,
        pending: false,
        text: "El Reglament (UE) 2024/1781 crea el marc europeu d'ecodisseny i del passaport digital de producte. Les obligacions concretes arriben per grup de producte. Aquest reglament, per si sol, no imposa avui una obligació de passaport per a tots els matalassos.",
      },
      {
        n: 3,
        pending: true,
        text: "L'extensió a mobiliari, tèxtils i equipament és el disseny de la plataforma, no un catàleg ja desplegat.",
      },
    ],
  },
  {
    id: "03",
    nav: "Flux",
    kicker: "Pregunta 3 de 8",
    question: "Com es fa, a peu de llit?",
    answer: [
      { t: "El " },
      { t: "passaport digital", accent: true },
      { t: " amb tota la informació rellevant de cada unitat." },
    ],
    sidebar: "notes",
    notes: [
      {
        n: 1,
        pending: true,
        text: "El recorregut escaneig, passaport, inspecció o incidència, foto i acció següent és el flux de producte previst. No és una mesura de camp.",
      },
    ],
  },
  {
    id: "04",
    nav: "Inspecció",
    kicker: "Pregunta 4 de 8",
    question: "Què queda registrat?",
    answer: [
      { t: "L'estat, la incidència i " },
      { t: "què s'ha de fer després", accent: true },
      { t: "." },
    ],
    sidebar: "notes",
    notes: [
      {
        n: 1,
        pending: true,
        text: "Tipus d'incidència previstos: taques, deformació, humitat, higiene i trencament.",
      },
      {
        n: 2,
        pending: true,
        text: "La fitxa d'aquesta secció és una pantalla de disseny. Totes les dades són d'exemple.",
      },
    ],
  },
  {
    id: "05",
    nav: "El centre",
    kicker: "Pregunta 5 de 8",
    question: "Què obté el centre?",
    answer: [
      { t: "Traçabilitat, evidència i " },
      { t: "un informe que es pot defensar", accent: true },
      { t: "." },
    ],
    sidebar: "notes",
    notes: [
      {
        n: 1,
        pending: true,
        text: "Les barres i les unitats d'aquesta secció són dades d'exemple. No descriuen cap hospital.",
      },
      {
        n: 2,
        pending: true,
        text: "Els kg desviats i el CO₂ evitat es calculen a partir de l'estoc real del centre quan n'hi ha. Aquí no hi ha mesura de camp.",
      },
    ],
  },
  {
    id: "06",
    nav: "Fi de vida",
    kicker: "Pregunta 6 de 8",
    question: "Què passa a la baixa?",
    answer: [
      { t: "Es retira, es classifica i " },
      { t: "el destí queda documentat", accent: true },
      { t: "." },
    ],
    sidebar: "notes",
    notes: [
      {
        n: 1,
        pending: true,
        text: "Destins previstos: reutilització interna, donació, recondicionament, reciclatge de materials i disposició, amb cadena de custòdia.",
      },
      {
        n: 2,
        pending: true,
        text: "L'estat higiènic condiciona si la unitat es pot reutilitzar o només se'n recuperen materials.",
      },
    ],
  },
  {
    id: "07",
    nav: "Materials",
    kicker: "Pregunta 7 de 8",
    question: "De què està fet, i per què importa?",
    answer: [
      { t: "El destí depèn del " },
      { t: "material i de l'estat higiènic", accent: true },
      { t: "." },
    ],
    sidebar: "notes",
    notes: [
      {
        n: 1,
        pending: true,
        text: "Components habituals: molles d'acer, escumes, làtex, fundes, adhesius i retardants de flama. La composició real és la del model, no una llista universal.",
      },
      {
        n: 2,
        pending: true,
        text: "El model 3D és una il·lustració de capes, no un plànol de fabricació.",
      },
    ],
  },
  {
    id: "08",
    nav: "Rols",
    kicker: "Pregunta 8 de 8",
    question: "Qui hi entra, i a què?",
    answer: [
      { t: "Cada rol veu " },
      { t: "la feina que li toca", accent: true },
      { t: "." },
    ],
    sidebar: "notes",
    notes: [
      {
        n: 1,
        pending: true,
        text: "Rols previstos: direcció, hoteleria, manteniment, compres, proveïdors i gestors de residus.",
      },
    ],
  },
  {
    id: "09",
    nav: "Gràcies",
    sidebar: "next",
    notes: [],
  },
];

export const HOW_TO = [
  {
    title: "Scroll per navegar",
    body: "També amb les fletxes del teclat, Re Pàg i Av Pàg. Cada pulsació mou una secció.",
  },
  {
    title: "La barra de dalt salta",
    body: "Un botó per secció. El que està actiu s'obre i ensenya el nom. Un clic hi porta.",
  },
  {
    title: "Les xifres són d'exemple",
    body: "On hi ha un número, hi ha l'etiqueta Dades d'exemple. No és un resultat de cap centre.",
  },
  {
    title: "Les notes viuen al marge",
    body: "El número al text obre la nota d'aquesta secció.",
  },
];

export const WHY_CARDS = [
  {
    title: "Higiene i infeccions",
    body: "El matalàs rep fluids, es neteja entre pacients i ha de poder demostrar en quin estat higiènic està.",
    n: 1,
  },
  {
    title: "Seguretat del pacient",
    body: "Un matalàs d'alleujament de la pressió no és un estoc anònim: el model i la deformació importen.",
    n: 2,
  },
  {
    title: "Resistència als fluids",
    body: "La funda i les capes interiors no envelleixen igual. Cal saber quina unitat és quina.",
  },
  {
    title: "Substitució",
    body: "Sense historial, es dona de baixa sense saber quina vida útil li quedava.",
  },
  {
    title: "Residu voluminós",
    body: "Ocupa, pesa i barreja materials. Si surt sense identificador, la baixa no es pot explicar.",
    n: 3,
  },
];

export const PRODUCT_POINTS = [
  { title: "Identitat", body: "Cada matalàs té un identificador únic, en un QR amb GS1 Digital Link.", n: 1 },
  { title: "Passaport", body: "On és, quin model és i en quin estat està. Alineat amb els principis del passaport digital europeu.", n: 2 },
  { title: "Inventari", body: "La planta veu què té, a quin llit i en quin estat." },
  { title: "Inspeccions", body: "Rondes programades, no només una revisió quan alguna cosa ja falla." },
  { title: "Incidències", body: "Taques, deformació, humitat, higiene o trencament, amb el manteniment que se'n deriva." },
  { title: "Vida útil", body: "Una estimació, i la possibilitat d'allargar-la quan hi ha una intervenció." },
  { title: "Fi de vida", body: "Retirada, classificació i destí, amb cadena de custòdia i documents." },
  { title: "Impacte", body: "Kg desviats i CO₂ evitat a partir de l'estoc real del centre, quan n'hi ha." },
  { title: "Comparativa", body: "Entre centres, anònima. En aquest dossier no hi ha rànquing." },
  { title: "Més actius", body: "El primer és el matalàs. El mateix esquema es pot estendre a mobiliari, tèxtils i equipament.", n: 3 },
];

export const FLOW_TILES = [
  {
    title: "Escaneja el QR",
    teaser: "Des del passadís, amb el mòbil.",
    detail: "El codi identifica aquella unitat i obre el seu passaport. No obre un catàleg genèric.",
  },
  {
    title: "Obre el passaport",
    teaser: "On és, quin model, quin estat.",
    detail: "La fitxa ensenya la ubicació, l'estat i l'historial d'aquell matalàs. Hi entra el rol que toca.",
  },
  {
    title: "Inspecció o incidència",
    teaser: "Una ronda, o una alerta.",
    detail: "Es registra la inspecció prevista o una incidència: taca, deformació, humitat, higiene o trencament.",
  },
  {
    title: "Foto i acció",
    teaser: "Queda constància del pas següent.",
    detail: "Les fotos s'adjunten a la fitxa. La fitxa deixa escrit què toca: seguir, manteniment o baixa.",
  },
];

export const INCIDENTS = [
  { title: "Taques", body: "On són i si la funda encara serveix." },
  { title: "Deformació", body: "Si el suport del pacient s'ha perdut." },
  { title: "Humitat", body: "Si ha passat la funda i cal obrir la unitat." },
  { title: "Higiene", body: "L'estat que decideix si es pot tornar a fer servir." },
  { title: "Trencament", body: "Costura, cremallera, nucli o estructura." },
];

export const EXAMPLE_FILE = [
  ["Identificador", "EXEMPLE-214"],
  ["Ubicació", "Planta d'exemple · Llit 12"],
  ["Estat", "En servei"],
  ["Darrera ronda", "Data d'exemple"],
  ["Incidència", "Humitat a la funda"],
  ["Fotos", "S'adjunten al flux real"],
  ["Pas següent", "Manteniment revisa la funda"],
];

export const OUTCOMES = [
  { title: "Traçabilitat", body: "Cada unitat té un recorregut: on ha estat, què se li ha fet i qui ho ha registrat." },
  { title: "Auditoria", body: "L'evidència de l'estat, la neteja i la baixa queda a la fitxa, no en un full a part." },
  { title: "Substitució", body: "Es canvia amb l'historial a la mà, no perquè ningú recorda quan va arribar." },
  { title: "Informe", body: "Residus desviats i CO₂ evitat, per a la memòria de sostenibilitat, amb les dades del centre." },
];

export const EXAMPLE_BARS = [
  { label: "Reutilització interna", note: "mateixa planta o un altre servei", value: 24 },
  { label: "Donació", note: "fora del centre, amb document", value: 6 },
  { label: "Recondicionament", note: "torna al servei", value: 9 },
  { label: "Reciclatge", note: "per material", value: 15 },
  { label: "Disposició", note: "sense via de recuperació", value: 4 },
];

export const EOL_STEPS = [
  { n: "1", title: "Retirada", body: "La unitat surt del llit i queda identificada. No es barreja amb un lot anònim." },
  { n: "2", title: "Classificació", body: "Estat higiènic, materials i si encara pot complir una funció." },
  { n: "3", title: "Destí", body: "Una via, un receptor i un document. La cadena de custòdia tanca la fitxa." },
];

export const DESTINATIONS = [
  "Reutilització interna",
  "Donació",
  "Recondicionament",
  "Reciclatge",
  "Disposició",
];

export const MATERIALS = [
  { title: "Molles d'acer", body: "Estructura. Via de reciclatge pròpia si es separa." },
  { title: "Escumes", body: "Nucli habitual. L'estat higiènic en limita la reutilització." },
  { title: "Làtex", body: "No es tracta igual que l'escuma. Cal saber si hi és." },
  { title: "Fundes", body: "Tèxtil, barrera de fluids i la peça que es neteja entre pacients." },
  { title: "Adhesius", body: "Uneixen capes i compliquen la separació." },
  { title: "Retardants de flama", body: "Poden condicionar què se'n pot fer al final." },
];

export const ROLES = [
  {
    title: "Direcció",
    teaser: "Inventari, baixes i informe.",
    detail: "Veu l'estoc, les baixes documentades, l'impacte i, si n'hi ha, la comparativa anònima entre centres.",
  },
  {
    title: "Hoteleria",
    teaser: "Rondes i higiene de planta.",
    detail: "Registra la inspecció, l'estat higiènic i les incidències de llenceria i neteja.",
  },
  {
    title: "Manteniment",
    teaser: "Deformació, trencament, vida útil.",
    detail: "Obre la intervenció, deixa la foto i actualitza si la unitat segueix o passa a baixa.",
  },
  {
    title: "Compres",
    teaser: "Què s'ha de substituir, i per què.",
    detail: "No rep un número sol: veu quines unitats han arribat al final i quin destí han tingut.",
  },
  {
    title: "Proveïdors",
    teaser: "Model, fitxa i retorn al cicle.",
    detail: "Accés al que els pertoca del passaport i del retorn, sense veure la resta del centre.",
  },
  {
    title: "Gestors de residus",
    teaser: "Classificació i custòdia.",
    detail: "Reben la unitat identificada, el material i el document del traspàs.",
  },
];

export const PILOT_STEPS = [
  { n: "01", title: "Registra una planta", body: "Una unitat o una planta. Prou per veure el flux amb estoc real, sense abastar tot el centre." },
  { n: "02", title: "Etiqueta", body: "Cada matalàs d'aquella planta rep el seu QR. A partir d'aquí té passaport." },
  { n: "03", title: "Primera ronda", body: "Hoteleria i manteniment fan la primera inspecció i deixen les incidències que hi hagi." },
  { n: "04", title: "Primer informe", body: "Estat de l'estoc i, si ja hi ha baixes, el destí. Les xifres surten d'aquella planta, no d'un exemple." },
];
