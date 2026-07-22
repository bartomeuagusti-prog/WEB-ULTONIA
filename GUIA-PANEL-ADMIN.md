# Guía — Panel admin y dominio (Benlligat / WEB-ULTONIA)

## Qué se ha añadido

- **Formulario conectado al backend**: las solicitudes de demo ya no se guardan en el
  navegador (`localStorage`), sino en la base de datos (MongoDB) vía `POST /api/leads`.
- **Panel de administración** en la ruta **`/admin`**: login con contraseña + tabla con
  todas las solicitudes (fecha, nombre, hotel, correo, mensaje) y opción de borrar.
- Endpoints nuevos en `backend/server.py`:
  - `POST /api/leads` — público, recibe una solicitud.
  - `POST /api/admin/login` — devuelve un token si la contraseña es correcta.
  - `GET /api/admin/leads` — lista de solicitudes (requiere token).
  - `DELETE /api/admin/leads/{id}` — borrar una solicitud (requiere token).

## Contraseña del panel

Se define en `backend/.env` con la variable `ADMIN_PASSWORD`.
Valor actual de desarrollo: **`benlligat2026`** — cámbialo antes de publicar.
También hay `JWT_SECRET`: pon una cadena larga y aleatoria en producción.

Tu jefe entra en `https://EL-DOMINIO/admin`, escribe la contraseña y ve las solicitudes.

## Arrancar en local

Necesitas MongoDB corriendo en local (o una cuenta gratis de MongoDB Atlas y poner su
URL en `MONGO_URL` dentro de `backend/.env`).

```bash
# Backend
cd backend
python3 -m venv venv && source venv/bin/activate
pip install -r requirements.txt
uvicorn server:app --reload --port 8001

# Frontend (en otra terminal)
cd frontend
npm install --legacy-peer-deps
npm start          # abre http://localhost:3000  (panel en /localhost:3000/admin)
```

## Vincular el dominio de tu jefe

Los pasos exactos dependen de DÓNDE se publique la web. Dos caminos habituales:

### Opción A — Publicar en Emergent (lo más rápido)
1. En Emergent, pulsa **Deploy / Publish** en el proyecto.
2. En los ajustes del despliegue busca **Custom domain / Dominio propio**.
3. Añade el dominio de tu jefe (ej. `benlligat.com`). Emergent te dará unos registros DNS.
4. En el panel del dominio (donde tu jefe lo compró: GoDaddy, IONOS, Namecheap…),
   crea esos registros:
   - un registro **CNAME** (o **A**) apuntando al valor que te dé Emergent,
   - normalmente también `www` → mismo destino.
5. Espera a que propague (minutos a 24 h) y el certificado HTTPS se genera solo.

### Opción B — Frontend en Vercel/Netlify + backend en Railway
1. **Backend** (Railway): sube `backend/`, define las variables `MONGO_URL`, `DB_NAME`,
   `ADMIN_PASSWORD`, `JWT_SECRET`, `CORS_ORIGINS`. Usa MongoDB Atlas para `MONGO_URL`.
2. **Frontend** (Vercel/Netlify): conecta el repo, carpeta `frontend`, build `npm run build`,
   y define `REACT_APP_BACKEND_URL` = la URL pública del backend de Railway.
3. En Vercel/Netlify → **Domains** → añade el dominio de tu jefe y sigue sus registros DNS
   (te indican el CNAME/A exacto a poner en el registrador del dominio).

> Para cualquiera de las dos: el dominio se compra/gestiona en un **registrador**
> (GoDaddy, IONOS…). Vincular = crear los registros **DNS** que te da la plataforma de
> hosting. HTTPS es automático en las tres plataformas.

## Datos que hacen falta de tu jefe

- El **nombre del dominio** (ej. `benlligat.com`).
- Acceso al **registrador** donde está comprado (para tocar los DNS), o que él añada
  los registros que le pases.
