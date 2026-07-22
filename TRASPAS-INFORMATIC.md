# Traspàs tècnic — Web Benlligat (benlligat.com)

Document per a l'informàtic que desplegarà i mantindrà la web.

## 1. Què és

Landing de **Benlligat** amb formulari de sol·licitud de demo i un **panell
d'administració** per veure les sol·licituds rebudes.

- **Frontend**: React 18/19 (Create React App + CRACO + Tailwind). Carpeta `frontend/`.
- **Backend**: FastAPI (Python) + MongoDB (Motor). Carpeta `backend/`.
- **Codi**: repositori GitHub `WEB-ULTONIA`.

## 2. Panell d'administració

- URL: **`https://benlligat.com/admin`**
- Login amb contrasenya. Mostra les sol·licituds del formulari (data, nom, hotel,
  correu, missatge) i permet esborrar-les.
- Contrasenya actual: **`benlligat2026`** → **es pot canviar** en qualsevol moment
  editant la variable `ADMIN_PASSWORD` (veure secció 4).

## 3. Endpoints del backend (prefix `/api`)

| Mètode | Ruta | Accés | Funció |
|--------|------|-------|--------|
| POST | `/api/leads` | públic | Rep una sol·licitud del formulari |
| POST | `/api/admin/login` | públic | Retorna un token si la contrasenya és correcta |
| GET | `/api/admin/leads` | token admin | Llista de sol·licituds |
| DELETE | `/api/admin/leads/{id}` | token admin | Esborra una sol·licitud |

Autenticació admin: JWT (Bearer token) signat amb `JWT_SECRET`, caducitat 12 h.

## 4. Variables d'entorn

### Backend (`backend/.env` en local, o variables del proveïdor en producció)
```
MONGO_URL="mongodb://..."          # URL de MongoDB (Atlas o servidor propi)
DB_NAME="benlligat"
CORS_ORIGINS="https://benlligat.com"   # en producció, millor concret que "*"
ADMIN_PASSWORD="benlligat2026"     # contrasenya del panell /admin (canviable)
JWT_SECRET="<cadena-llarga-i-aleatoria>"   # posar-ne una de nova en producció
```

### Frontend (`frontend/.env`)
```
REACT_APP_BACKEND_URL=https://<url-publica-del-backend>
```
> Important: el frontend fa servir `REACT_APP_BACKEND_URL` per parlar amb el backend.
> S'ha de fixar ABANS del `build` (a CRA les variables s'incrusten en compilar).

Hi ha fitxers `.env.example` a `backend/` i `frontend/` com a plantilla. Els `.env`
reals estan al `.gitignore` (no es pugen a GitHub).

## 5. Com desplegar

### Backend
```bash
cd backend
python3 -m venv venv && source venv/bin/activate
pip install -r requirements.txt
uvicorn server:app --host 0.0.0.0 --port 8001
```
Cal una instància de **MongoDB** (MongoDB Atlas té pla gratuït) i posar la seva URL a
`MONGO_URL`.

### Frontend
```bash
cd frontend
npm install --legacy-peer-deps
npm run build          # genera la carpeta build/ (fitxers estàtics a servir)
```
Servir `frontend/build/` amb qualsevol servidor estàtic o CDN. En SPA, totes les rutes
han de redirigir a `index.html` (perquè `/admin` funcioni en recarregar).

> Nota: el projecte originalment venia de la plataforma **Emergent** (imatge
> `fastapi_react_mongo_shadcn`), on frontend + backend + Mongo s'executen junts. Es pot
> desplegar allà directament o en la infraestructura que preferiu.

## 6. Vincular el domini benlligat.com

1. Un cop desplegada la web, la plataforma d'allotjament dona **un valor de destí**.
2. Al DNS de `benlligat.com` cal crear:
   - `www` → **CNAME** → `<valor de destí>`
   - `benlligat.com` (apex) → **A** o **CNAME/ALIAS** → `<valor de destí>`
3. HTTPS es genera automàticament a la majoria de plataformes.

## 7. Checklist mínim de posada en marxa

- [ ] Crear base de dades MongoDB i obtenir `MONGO_URL`.
- [ ] Desplegar backend amb les variables de la secció 4.
- [ ] Fixar `REACT_APP_BACKEND_URL` i fer `build` del frontend.
- [ ] Desplegar el frontend (estàtic) amb fallback a `index.html`.
- [ ] Posar un `JWT_SECRET` nou i, si es vol, canviar `ADMIN_PASSWORD`.
- [ ] Apuntar el domini benlligat.com (secció 6).
- [ ] Provar: enviar el formulari i comprovar que apareix a `/admin`.
