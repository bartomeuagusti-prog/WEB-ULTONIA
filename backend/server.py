from fastapi import FastAPI, APIRouter, Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict, EmailStr
from typing import List, Optional
import uuid
import jwt
from datetime import datetime, timezone, timedelta


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Configuración del panel admin
ADMIN_PASSWORD = os.environ.get('ADMIN_PASSWORD', 'canvia-aquesta-clau')
JWT_SECRET = os.environ.get('JWT_SECRET', 'canvia-aquest-secret-molt-llarg')
JWT_ALGORITHM = 'HS256'
JWT_EXPIRE_HOURS = 12

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

# Seguridad: token Bearer para las rutas de admin
bearer_scheme = HTTPBearer(auto_error=False)


def require_admin(creds: Optional[HTTPAuthorizationCredentials] = Depends(bearer_scheme)):
    """Valida el token JWT del admin. Lanza 401 si no es válido."""
    if creds is None:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="No autoritzat")
    try:
        payload = jwt.decode(creds.credentials, JWT_SECRET, algorithms=[JWT_ALGORITHM])
        if payload.get("role") != "admin":
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="No autoritzat")
    except jwt.PyJWTError:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Sessió caducada o invàlida")
    return True


# Define Models
class StatusCheck(BaseModel):
    model_config = ConfigDict(extra="ignore")  # Ignore MongoDB's _id field
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class StatusCheckCreate(BaseModel):
    client_name: str


# --- Leads del formulari de contacte ---
class Lead(BaseModel):
    model_config = ConfigDict(extra="ignore")

    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    nom: str
    hotel: str = ""
    email: str
    missatge: str = ""
    ts: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class LeadCreate(BaseModel):
    nom: str = Field(..., min_length=1, max_length=200)
    hotel: str = Field("", max_length=200)
    email: EmailStr
    missatge: str = Field("", max_length=2000)


class AdminLogin(BaseModel):
    password: str


# Add your routes to the router instead of directly to app
@api_router.get("/")
async def root():
    return {"message": "Hello World"}


# --- Endpoint públic: rebre un lead del formulari ---
@api_router.post("/leads", response_model=Lead)
async def create_lead(input: LeadCreate):
    lead = Lead(**input.model_dump())
    doc = lead.model_dump()
    doc['ts'] = doc['ts'].isoformat()
    await db.leads.insert_one(doc)
    logger.info("Nou lead rebut: %s (%s)", lead.nom, lead.email)
    return lead


# --- Login d'admin: contrasenya -> token ---
@api_router.post("/admin/login")
async def admin_login(input: AdminLogin):
    if input.password != ADMIN_PASSWORD:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Contrasenya incorrecta")
    token = jwt.encode(
        {
            "role": "admin",
            "exp": datetime.now(timezone.utc) + timedelta(hours=JWT_EXPIRE_HOURS),
        },
        JWT_SECRET,
        algorithm=JWT_ALGORITHM,
    )
    return {"token": token}


# --- Llista de leads (només admin) ---
@api_router.get("/admin/leads", response_model=List[Lead])
async def list_leads(_: bool = Depends(require_admin)):
    leads = await db.leads.find({}, {"_id": 0}).sort("ts", -1).to_list(2000)
    for lead in leads:
        if isinstance(lead.get('ts'), str):
            lead['ts'] = datetime.fromisoformat(lead['ts'])
    return leads


# --- Esborrar un lead (només admin) ---
@api_router.delete("/admin/leads/{lead_id}")
async def delete_lead(lead_id: str, _: bool = Depends(require_admin)):
    result = await db.leads.delete_one({"id": lead_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Lead no trobat")
    return {"ok": True}

@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.model_dump()
    status_obj = StatusCheck(**status_dict)
    
    # Convert to dict and serialize datetime to ISO string for MongoDB
    doc = status_obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    
    _ = await db.status_checks.insert_one(doc)
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    # Exclude MongoDB's _id field from the query results
    status_checks = await db.status_checks.find({}, {"_id": 0}).to_list(1000)
    
    # Convert ISO string timestamps back to datetime objects
    for check in status_checks:
        if isinstance(check['timestamp'], str):
            check['timestamp'] = datetime.fromisoformat(check['timestamp'])
    
    return status_checks

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()