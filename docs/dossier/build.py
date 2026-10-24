"""Genera frontend/public/dossier/Benlligat-Dossier.pdf (A4, 1 pàgina).

Ús:  FONT_DIR=/ruta/a/fonts python3 docs/dossier/build.py
FONT_DIR ha de contenir CabinetGrotesk-500.ttf (Fontshare) i Outfit.ttf (Google Fonts).
Les fonts no es versionen al repo; Chrome les incrusta al PDF.
"""
import asyncio, html as H, os, pathlib
from playwright.async_api import async_playwright

HERE = pathlib.Path(__file__).resolve().parent
OUT = HERE.parent.parent / "frontend/public/dossier/Benlligat-Dossier.pdf"
FONT_DIR = os.environ.get("FONT_DIR", "/workspace/benlligat/brandbook/fonts")

# Mateix contingut que frontend/src/pages/deckContent.js (preguntes 1-8 i pilot).
CARDS = [
    ("Per què els matalassos importen a l'hospital?", "Perquè són una ", "superfície clínica", " i un residu voluminós.",
     ["Higiene, fluids i control d'infeccions: el matalàs es neteja entre pacients.",
      "En els d'alleujament de la pressió, el model i la deformació importen.",
      "De baixa, ocupa, pesa i barreja materials."]),
    ("Què fa Benlligat?", "Dona ", "identitat a cada matalàs", " per fer el seguiment durant tota la seva vida útil.",
     ["Identificador únic en un QR amb GS1 Digital Link.",
      "Passaport: on és, quin model és i en quin estat està, alineat amb els principis del passaport digital europeu."]),
    ("Com es fa, a peu de llit?", "Un QR obre el passaport i ", "deixa escrita la decisió", ".",
     ["Escaneja el QR, obre el passaport, registra inspecció o incidència.",
      "Foto i acció següent: seguir, manteniment o baixa."]),
    ("Què queda registrat?", "L'estat, la incidència i ", "què s'ha de fer després", ".",
     ["Taques, deformació, humitat, higiene i trencament.",
      "Rondes programades, no només una revisió quan ja falla."]),
    ("Què obté el centre?", "Traçabilitat, evidència i ", "un informe que es pot defensar", ".",
     ["Auditoria: l'evidència d'estat, neteja i baixa queda a la fitxa.",
      "Residus desviats i CO₂ evitat per a la memòria de sostenibilitat, amb dades del centre."]),
    ("Què passa a la baixa?", "Es retira, es classifica i ", "el destí queda documentat", ".",
     ["Reutilització interna, donació, recondicionament, reciclatge o disposició.",
      "Cadena de custòdia; l'estat higiènic decideix si es pot reutilitzar."]),
    ("De què està fet, i per què importa?", "El destí depèn del ", "material i de l'estat higiènic", ".",
     ["Molles d'acer, escumes, làtex, fundes, adhesius i retardants de flama.",
      "La composició real és la del model, no una llista universal."]),
    ("Qui hi entra, i a què?", "Cada rol veu ", "la feina que li toca", ".",
     ["Direcció, hoteleria, manteniment, compres, proveïdors i gestors de residus.",
      "Cadascú accedeix només al que li pertoca."]),
]
STEPS = [
    ("01", "Registra una planta", "Prou per veure el flux amb estoc real."),
    ("02", "Etiqueta", "Cada matalàs rep el seu QR i té passaport."),
    ("03", "Primera ronda", "Hoteleria i manteniment fan la primera inspecció."),
    ("04", "Primer informe", "Estat de l'estoc i destí de les baixes, d'aquella planta."),
]
e = H.escape
cards = "".join(
    f'<article class="card"><p class="q">Pregunta <b>{i}</b> de 8</p><h2 class="disp">{e(q)}</h2>'
    f'<p class="a">{e(a1)}<span class="acc">{e(acc)}</span>{e(a2)}</p>'
    f'<ul>{"".join(f"<li>{e(b)}</li>" for b in bullets)}</ul></article>'
    for i, (q, a1, acc, a2, bullets) in enumerate(CARDS, 1))
steps = "".join(f'<div><span class="n">{n}</span><b>{e(t)}</b><p>{e(b)}</p></div>' for n, t, b in STEPS)
src = (HERE / "dossier.html").read_text()
src = src.replace("${CARDS}", cards).replace("${STEPS}", steps).replace("${FONT_DIR}", "file://" + FONT_DIR)
assert "${" not in src
build = HERE / "dossier.build.html"
build.write_text(src)

async def main():
    async with async_playwright() as p:
        try:
            br = await p.chromium.launch()
        except Exception:
            br = await p.chromium.launch(executable_path="/usr/bin/google-chrome")
        pg = await br.new_page(viewport={"width": 794, "height": 1123})
        await pg.goto(build.as_uri())
        await pg.evaluate("document.fonts.ready")
        await pg.wait_for_timeout(400)
        print("fonts", await pg.evaluate("[...document.fonts].filter(f=>f.status=='loaded').map(f=>f.family+' '+f.weight)"))
        # El contingut no pot desbordar la pàgina A4.
        print("overflow px", await pg.evaluate("(()=>{const p=document.querySelector('.page');return p.scrollHeight-p.clientHeight})()"))
        OUT.parent.mkdir(parents=True, exist_ok=True)
        await pg.pdf(path=str(OUT), width="210mm", height="297mm", print_background=True, prefer_css_page_size=True)
        await br.close()
    build.unlink()
    print("wrote", OUT)

asyncio.run(main())
