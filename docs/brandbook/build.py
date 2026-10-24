import re, asyncio
from playwright.async_api import async_playwright
def rgb(h): h=h.lstrip('#'); return tuple(int(h[i:i+2],16) for i in (0,2,4))
def lin(c):
    c=c/255; return c/12.92 if c<=0.03928 else ((c+0.055)/1.055)**2.4
def L(h): r,g,b=rgb(h); return 0.2126*lin(r)+0.7152*lin(g)+0.0722*lin(b)
def cr(a,b): la,lb=sorted([L(a),L(b)],reverse=True); return (la+0.05)/(lb+0.05)
html=open('brandbook.html').read()
idx=[("01","Essència i to de veu","03"),("02","Logotip: versions","04"),("02","Logotip: protecció, mida i usos incorrectes","05"),("03","Color: paleta i proporcions","06"),("03","Color: tints i contrast","07"),("04","Tipografia","08"),("05","Components d’interfície","09"),("05","Gràfics","10"),("06","Imatgeria i iconografia","11"),("07","Honestedat de dades","12"),("08","Aplicacions","13"),("09","Fitxa ràpida","14")]
html=html.replace("${INDEX}","".join(f'<div style="display:flex;gap:4mm;align-items:baseline;border-top:1px solid var(--bd);padding-top:3mm"><span class="eyebrow" style="width:8mm">{n}</span><span style="font-family:\'Cabinet Grotesk\';font-weight:800;font-size:13pt;letter-spacing:-.01em;flex:1">{t}</span><span class="small">{p}</span></div>' for n,t,p in idx))
G=rgb('#1A5336'); tints=""
for p in [100,80,60,40,20,10,5]:
    t=p/100; c='#%02X%02X%02X'%tuple(round(g*t+255*(1-t)) for g in G)
    txt='#fff' if cr('#FFFFFF',c)>=4.5 else '#062A18'
    tints+=f'<div><div style="height:22mm;border-radius:3mm;background:{c};border:1px solid rgba(6,42,24,.08);display:flex;align-items:flex-end;padding:1.5mm;font-size:7pt;font-weight:600;color:{txt}">{p}%</div><p style="font-size:7pt;margin-top:1mm;color:var(--t3)">{c}</p></div>'
html=html.replace("${TINTS}",tints)
pairs=[('#FFFFFF','#1A5336','Blanc / Order Green'),('#062A18','#FAFAFA','Dark Green / Fons'),('#062A18','#FFFFFF','Dark Green / Blanc'),('#1A5336','#FAFAFA','Order Green / Fons'),('#FFFFFF','#062A18','Blanc / Dark Green'),('#1A5336','#E5F2EA','Order Green / Tint'),('#24503A','#FFFFFF','Text 2 / Blanc'),('#4A6558','#FAFAFA','Text 4 / Fons'),('#1A5336','#062A18','Order / Dark Green')]
rows=""
for a,b,n in pairs:
    r=cr(a,b); lvl='AAA' if r>=7 else ('AA' if r>=4.5 else ('AA gran' if r>=3 else 'No apte'))
    cls='bad' if r<3 else 'ok'
    rows+=f'<tr><td>{n}</td><td><span style="display:inline-block;background:{b};color:{a};border:1px solid var(--bd);border-radius:999px;padding:.6mm 3mm;font-weight:600;font-size:8pt">Aa Benlligat</span></td><td><b>{r:.2f}:1</b></td><td class="{cls}">{lvl}</td></tr>'.replace('.',',',0)
html=html.replace("${CONTRAST}",rows)
bars=[("Reutilitzar","Neteja i torna al servei",38,False),("Renovar","Canvi de funda o capes",24,False),("Reciclar","Separació per materials",30,False),("Recuperat","Total que no va a abocador",92,True)]
b='<div style="margin-top:7mm;display:grid;gap:7mm">'
for l,n,v,acc in bars:
    col='#1A5336' if acc else '#062A18'
    b+=f'<div style="display:grid;grid-template-columns:38mm 1fr 14mm;align-items:center;gap:3mm"><div><div style="font-weight:500;font-size:10.5pt">{l}</div><div style="font-size:7.5pt;color:var(--t4)">{n}</div></div><div style="height:9mm;border-radius:999px;background:#E7EFEA;overflow:hidden"><div style="height:100%;width:{v}%;border-radius:999px;background:{col}"></div></div><div class="disp" style="font-size:20pt;color:{col};text-align:right">{v}%</div></div>'
b+='</div>'
html=html.replace("${BARS}",b)
icons={'Fulla':'<path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/>',
 'QR':'<rect width="5" height="5" x="3" y="3" rx="1"/><rect width="5" height="5" x="16" y="3" rx="1"/><rect width="5" height="5" x="3" y="16" rx="1"/><path d="M21 16h-3a2 2 0 0 0-2 2v3"/><path d="M21 21v.01"/><path d="M12 7v3a2 2 0 0 1-2 2H7"/><path d="M3 12h.01"/><path d="M12 3h.01"/><path d="M12 16v.01"/><path d="M16 12h1"/><path d="M21 12v.01"/><path d="M12 21v-1"/>',
 'Reciclar':'<path d="M7 19H4.815a1.83 1.83 0 0 1-1.57-.881 1.785 1.785 0 0 1-.004-1.784L7.196 9.5"/><path d="M11 19h8.203a1.83 1.83 0 0 0 1.556-.89 1.784 1.784 0 0 0 0-1.775l-1.226-2.12"/><path d="m14 16-3 3 3 3"/><path d="M8.293 13.596 7.196 9.5 3.1 10.598"/><path d="m9.344 5.811 1.093-1.892A1.83 1.83 0 0 1 11.985 3a1.784 1.784 0 0 1 1.546.888l3.943 6.843"/><path d="m13.378 9.633 4.096 1.098 1.097-4.096"/>',
 'Inspecció':'<path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>',
 'Llit':'<path d="M2 4v16"/><path d="M2 8h18a2 2 0 0 1 2 2v10"/><path d="M2 17h20"/><path d="M6 8v9"/>'}
ic=""
for i,(n,p) in enumerate(icons.items()):
    box='background:#1A5336;' if i==0 else 'background:#fff;border:1px solid var(--bd);'
    st='#fff' if i==0 else '#1A5336'
    ic+=f'<div style="text-align:center"><div style="width:18mm;height:18mm;border-radius:5mm;{box}display:grid;place-items:center"><svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="{st}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">{p}</svg></div><p style="font-size:7pt;color:var(--t3);margin-top:1mm">{n}</p></div>'
html=html.replace("${ICONS}",ic)
dl=""
for l,v in [("Matalassos en servei","—"),("Inspeccions pendents","—"),("Incidències obertes","—"),("Baixes del període","—")]:
    dl+=f'<div style="display:flex;justify-content:space-between;font-size:7pt;border-bottom:1px solid var(--bd);padding-bottom:1mm;color:var(--t2)"><span>{l}</span><b style="color:var(--d)">{v}</b></div>'
html=html.replace("${DOCLINES}",dl)
assert "${" not in html
open('brandbook.build.html','w').write(html)
async def main():
    async with async_playwright() as p:
        try: br=await p.chromium.launch()
        except Exception: br=await p.chromium.launch(executable_path='/usr/bin/google-chrome')
        pg=await br.new_page()
        await pg.goto('file:///workspace/benlligat/brandbook/brandbook.build.html')
        await pg.evaluate("document.fonts.ready")
        await pg.wait_for_timeout(500)
        fonts=await pg.evaluate("[...document.fonts].filter(f=>f.status=='loaded').map(f=>f.family+' '+f.weight)")
        print('loaded fonts',fonts)
        # overflow check
        ov=await pg.evaluate("""[...document.querySelectorAll('.page')].map((p,i)=>{const r=p.getBoundingClientRect();let bad=[];p.querySelectorAll('*').forEach(e=>{if(e.closest('.foot')||e.tagName=='svg'||e.closest('svg'))return;const b=e.getBoundingClientRect();if(b.width&&(b.bottom>r.bottom-17*3.78||b.right>r.right-2))bad.push(e.tagName+'.'+e.className+':'+(e.textContent||'').slice(0,30))});return [i+1,bad.slice(0,4)]}).filter(x=>x[1].length)""")
        print('overflow',ov)
        await pg.pdf(path='Benlligat-Brand-Book.pdf',width='297mm',height='210mm',print_background=True,prefer_css_page_size=True)
        await br.close()
asyncio.run(main())
