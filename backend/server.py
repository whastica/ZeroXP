from fastapi import FastAPI, APIRouter, HTTPException, Form, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict, EmailStr
from typing import List, Optional
import uuid
from datetime import datetime, timezone
from enum import Enum

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

# Enums
class UserType(str, Enum):
    candidate = "candidate"
    company = "company"

class ApplicationType(str, Enum):
    quick = "quick"
    standard = "standard" 
    premium = "premium"

class JobStatus(str, Enum):
    active = "active"
    closed = "closed"
    reported = "reported"

# Models
class User(BaseModel):
    model_config = ConfigDict(extra="ignore")
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    email: EmailStr
    password_hash: str
    user_type: UserType
    name: Optional[str] = None
    location: Optional[str] = None
    skills: Optional[List[str]] = []
    linkedin_url: Optional[str] = None
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class UserCreate(BaseModel):
    email: EmailStr
    password: str
    user_type: UserType
    name: Optional[str] = None
    location: Optional[str] = None

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class Company(BaseModel):
    model_config = ConfigDict(extra="ignore")
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    user_id: str
    name: str
    description: Optional[str] = None
    website: Optional[str] = None
    linkedin_url: Optional[str] = None
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class Job(BaseModel):
    model_config = ConfigDict(extra="ignore")
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    company_id: str
    title: str
    description: str
    location: str
    requirements: Optional[str] = None
    benefits: Optional[str] = None
    salary_range: Optional[str] = None
    no_experience_required: bool = True  # Always true for this platform
    status: JobStatus = JobStatus.active
    custom_fields: Optional[List[dict]] = []  # For standard applications
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class JobCreate(BaseModel):
    title: str
    description: str
    location: str
    requirements: Optional[str] = None
    benefits: Optional[str] = None
    salary_range: Optional[str] = None
    custom_fields: Optional[List[dict]] = []

class Application(BaseModel):
    model_config = ConfigDict(extra="ignore")
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    job_id: str
    user_id: str
    application_type: ApplicationType
    message: Optional[str] = None  # For premium applications
    custom_data: Optional[dict] = {}  # For standard applications
    resume_url: Optional[str] = None
    payment_id: Optional[str] = None  # For premium applications
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class ApplicationCreate(BaseModel):
    job_id: str
    application_type: ApplicationType
    message: Optional[str] = None
    custom_data: Optional[dict] = {}

class JobReport(BaseModel):
    model_config = ConfigDict(extra="ignore")
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    job_id: str
    user_id: str
    reason: str
    description: Optional[str] = None
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class JobReportCreate(BaseModel):
    job_id: str
    reason: str
    description: Optional[str] = None

# Helper functions
def prepare_for_mongo(data):
    if isinstance(data, dict):
        for key, value in data.items():
            if isinstance(value, datetime):
                data[key] = value.isoformat()
            elif isinstance(value, dict):
                data[key] = prepare_for_mongo(value)
    return data

def parse_from_mongo(item):
    if isinstance(item, dict):
        for key, value in item.items():
            if key.endswith('_at') and isinstance(value, str):
                try:
                    item[key] = datetime.fromisoformat(value)
                except ValueError:
                    pass
            elif isinstance(value, dict):
                item[key] = parse_from_mongo(value)
    return item

# Auth Routes (Simple email/password for MVP)
@api_router.post("/auth/register")
async def register_user(user_data: UserCreate):
    # Check if user exists
    existing_user = await db.users.find_one({"email": user_data.email}, {"_id": 0})
    if existing_user:
        raise HTTPException(status_code=400, detail="Email ya está registrado")
    
    # Create user dict with password hash
    user_dict = user_data.model_dump()
    user_dict["password_hash"] = user_data.password  # TODO: Implement proper hashing
    user_dict.pop("password", None)  # Remove the plain password
    
    # Create User object
    user = User(**user_dict)
    
    # Save to database
    user_dict = prepare_for_mongo(user.model_dump())
    await db.users.insert_one(user_dict)
    
    return {"message": "Usuario registrado exitosamente", "user_id": user.id}

@api_router.post("/auth/login")
async def login_user(login_data: UserLogin):
    # Find user
    user = await db.users.find_one({"email": login_data.email}, {"_id": 0})
    if not user or user["password_hash"] != login_data.password:
        raise HTTPException(status_code=401, detail="Credenciales inválidas")
    
    # Return user data (in production, return JWT token)
    return {"message": "Login exitoso", "user": parse_from_mongo(user)}

# Job Routes
@api_router.get("/jobs", response_model=List[Job])
async def get_jobs(search: Optional[str] = None, location: Optional[str] = None):
    query = {"status": "active"}
    
    if search:
        query["$or"] = [
            {"title": {"$regex": search, "$options": "i"}},
            {"description": {"$regex": search, "$options": "i"}}
        ]
    
    if location:
        query["location"] = {"$regex": location, "$options": "i"}
    
    jobs = await db.jobs.find(query, {"_id": 0}).to_list(100)
    
    # Get company info for each job
    for job in jobs:
        company = await db.companies.find_one({"id": job["company_id"]}, {"_id": 0})
        if company:
            job["company_name"] = company["name"]
        job = parse_from_mongo(job)
    
    return jobs

@api_router.get("/jobs/{job_id}", response_model=Job)
async def get_job(job_id: str):
    job = await db.jobs.find_one({"id": job_id}, {"_id": 0})
    if not job:
        raise HTTPException(status_code=404, detail="Trabajo no encontrado")
    
    # Get company info
    company = await db.companies.find_one({"id": job["company_id"]}, {"_id": 0})
    if company:
        job["company_name"] = company["name"]
        job["company_website"] = company.get("website")
    
    return parse_from_mongo(job)

@api_router.post("/jobs")
async def create_job(
    user_id: str = Form(...),
    title: str = Form(...),
    description: str = Form(...),
    location: str = Form(...),
    requirements: Optional[str] = Form(None),
    benefits: Optional[str] = Form(None),
    salary_range: Optional[str] = Form(None)
):
    # Check if user is a company
    user = await db.users.find_one({"id": user_id}, {"_id": 0})
    if not user or user["user_type"] != "company":
        raise HTTPException(status_code=403, detail="Solo las empresas pueden publicar trabajos")
    
    # Get company
    company = await db.companies.find_one({"user_id": user_id}, {"_id": 0})
    if not company:
        raise HTTPException(status_code=404, detail="Perfil de empresa no encontrado")
    
    # Create job
    job_data = {
        "company_id": company["id"],
        "title": title,
        "description": description,
        "location": location,
        "requirements": requirements,
        "benefits": benefits,
        "salary_range": salary_range
    }
    job = Job(**job_data)
    job_dict = prepare_for_mongo(job.model_dump())
    await db.jobs.insert_one(job_dict)
    
    return {"message": "Trabajo creado exitosamente", "job_id": job.id}

# Application Routes
@api_router.post("/jobs/{job_id}/apply")
async def apply_to_job(job_id: str, application_data: ApplicationCreate, user_id: str = Form(...)):
    # Check if job exists
    job = await db.jobs.find_one({"id": job_id}, {"_id": 0})
    if not job:
        raise HTTPException(status_code=404, detail="Trabajo no encontrado")
    
    # Check if user already applied
    existing_app = await db.applications.find_one({
        "job_id": job_id, 
        "user_id": user_id
    }, {"_id": 0})
    if existing_app:
        raise HTTPException(status_code=400, detail="Ya has aplicado a este trabajo")
    
    # Create application
    application = Application(**application_data.model_dump(), user_id=user_id)
    app_dict = prepare_for_mongo(application.model_dump())
    await db.applications.insert_one(app_dict)
    
    return {"message": "Aplicación enviada exitosamente", "application_id": application.id}

# Report Routes
@api_router.post("/jobs/{job_id}/report")
async def report_job(job_id: str, report_data: JobReportCreate, user_id: str = Form(...)):
    # Check if job exists
    job = await db.jobs.find_one({"id": job_id}, {"_id": 0})
    if not job:
        raise HTTPException(status_code=404, detail="Trabajo no encontrado")
    
    # Create report
    report = JobReport(**report_data.model_dump(), user_id=user_id)
    report_dict = prepare_for_mongo(report.model_dump())
    await db.job_reports.insert_one(report_dict)
    
    return {"message": "Reporte enviado exitosamente"}

# Company Routes
@api_router.post("/companies")
async def create_company(
    user_id: str = Form(...),
    name: str = Form(...),
    description: Optional[str] = Form(None),
    website: Optional[str] = Form(None),
    linkedin_url: Optional[str] = Form(None)
):
    # Check if user is company type
    user = await db.users.find_one({"id": user_id}, {"_id": 0})
    if not user or user["user_type"] != "company":
        raise HTTPException(status_code=403, detail="Solo usuarios de tipo empresa pueden crear perfiles de empresa")
    
    # Check if company already exists
    existing_company = await db.companies.find_one({"user_id": user_id}, {"_id": 0})
    if existing_company:
        raise HTTPException(status_code=400, detail="Ya tienes un perfil de empresa")
    
    # Create company
    company_data = {
        "user_id": user_id,
        "name": name,
        "description": description,
        "website": website,
        "linkedin_url": linkedin_url
    }
    company = Company(**company_data)
    company_dict = prepare_for_mongo(company.model_dump())
    await db.companies.insert_one(company_dict)
    
    return {"message": "Perfil de empresa creado exitosamente", "company_id": company.id}

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