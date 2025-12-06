# 🔗 Guía de Integración Backend - ZeroXP MVP

## 📋 Endpoints Requeridos

### Autenticación

#### POST `/api/auth/register`
```json
{
  "email": "user@example.com",
  "password": "password123",
  "name": "John Doe",
  "user_type": "candidate|company",
  "location": "Madrid, Spain"
}
```

**Response (201):**
```json
{
  "id": "uuid",
  "email": "user@example.com",
  "name": "John Doe",
  "user_type": "candidate",
  "location": "Madrid, Spain",
  "created_at": "2025-12-06T10:00:00Z"
}
```

#### POST `/api/auth/login`
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response (200):**
```json
{
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "name": "John Doe",
    "user_type": "candidate",
    "location": "Madrid"
  },
  "token": "jwt_token_here"
}
```

---

### Jobs (Ofertas de Empleo)

#### GET `/api/jobs`
**Query Parameters:**
- `search`: string (búsqueda en título y descripción)
- `location`: string (búsqueda en ubicación)
- `limit`: int (resultados por página, default 100)

**Response (200):**
```json
[
  {
    "id": "uuid",
    "title": "Desarrollador Frontend Junior",
    "description": "Descripción del puesto...",
    "company_name": "TechStart Madrid",
    "location": "Madrid, España",
    "salary_range": "€1200-€1500/mes",
    "job_type": "full-time",
    "experience_level": "entry",
    "requirements": "HTML, CSS, JavaScript",
    "benefits": "Flexibilidad horaria, capacitación",
    "deadline": "2025-12-31",
    "user_id": "uuid_company",
    "applications_count": 5,
    "created_at": "2025-12-06T10:00:00Z"
  }
]
```

#### GET `/api/jobs/{job_id}`
**Response (200):** Job object con detalles completos

#### POST `/api/jobs` (Crear Oferta)
**Headers:** 
- `Content-Type: multipart/form-data`

**Body:**
```
title: "Título del trabajo"
description: "Descripción..."
location: "Ubicación"
company_name: "Nombre de Empresa"
salary_range: "Rango salarial (opcional)"
job_type: "full-time|part-time|contract|internship|freelance"
experience_level: "entry|junior|mid|senior"
requirements: "Requisitos (opcional)"
benefits: "Beneficios (opcional)"
deadline: "2025-12-31 (opcional)"
user_id: "uuid del usuario (empresa)"
```

**Response (201):**
```json
{
  "id": "uuid",
  "title": "Título del trabajo",
  "message": "Trabajo creado exitosamente"
}
```

#### PUT `/api/jobs/{job_id}` (Editar Oferta)
**Headers:** 
- `Content-Type: multipart/form-data`

**Body:** Mismo que POST (actualiza solo campos enviados)

**Response (200):**
```json
{
  "id": "uuid",
  "message": "Trabajo actualizado exitosamente"
}
```

#### DELETE `/api/jobs/{job_id}` (Eliminar Oferta)
**Response (200):**
```json
{
  "message": "Trabajo eliminado exitosamente"
}
```

---

### Aplicaciones

#### POST `/api/jobs/{job_id}/apply` (Aplicar a Oferta)
**Headers:** 
- `Content-Type: multipart/form-data`

**Body:**
```
user_id: "uuid del candidato"
job_id: "uuid de la oferta"
application_type: "quick|standard|premium"
fullName: "Nombre completo"
email: "email@example.com"
phone: "+34 123 456 789"
linkedin: "https://linkedin.com/in/profile (opcional)"
about: "Mensaje personal"
message: "Mensaje premium (si premium)"
cv: [File object - PDF/Word]
```

**Response (201):**
```json
{
  "id": "uuid",
  "job_id": "uuid",
  "user_id": "uuid",
  "application_type": "quick",
  "status": "pending",
  "message": "Aplicación creada exitosamente"
}
```

#### GET `/api/jobs/{job_id}/applications` (Ver Aplicaciones por Oferta)
**Response (200):**
```json
[
  {
    "id": "uuid",
    "fullName": "Juan Pérez",
    "email": "juan@example.com",
    "phone": "+34 123 456 789",
    "linkedin": "https://linkedin.com/in/juan",
    "about": "Me interesa porque...",
    "cv_url": "https://storage.example.com/cv_uuid.pdf",
    "application_type": "quick",
    "status": "pending|reviewed|accepted|rejected",
    "created_at": "2025-12-06T10:00:00Z"
  }
]
```

---

### Reportes

#### POST `/api/jobs/{job_id}/report` (Reportar Oferta)
**Body:**
```json
{
  "user_id": "uuid",
  "reason": "Requiere experiencia excesiva más allá del nivel junior",
  "description": "Detalles adicionales (opcional)"
}
```

**Response (201):**
```json
{
  "id": "uuid",
  "message": "Reporte creado exitosamente"
}
```

---

## 🔐 Modelo de Base de Datos

### Tabla `users`
```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  name VARCHAR(255) NOT NULL,
  user_type VARCHAR(20) NOT NULL CHECK (user_type IN ('candidate', 'company')),
  location VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Tabla `jobs`
```sql
CREATE TABLE jobs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  company_name VARCHAR(255) NOT NULL,
  location VARCHAR(255) NOT NULL,
  salary_range VARCHAR(255),
  job_type VARCHAR(20) DEFAULT 'full-time',
  experience_level VARCHAR(20) DEFAULT 'entry',
  requirements TEXT,
  benefits TEXT,
  deadline DATE,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Tabla `applications`
```sql
CREATE TABLE applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  job_id UUID NOT NULL REFERENCES jobs(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  fullName VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  linkedin VARCHAR(255),
  about TEXT,
  message TEXT,
  cv_path VARCHAR(255) NOT NULL,
  application_type VARCHAR(20) NOT NULL,
  status VARCHAR(20) DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Tabla `job_reports`
```sql
CREATE TABLE job_reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  job_id UUID NOT NULL REFERENCES jobs(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  reason VARCHAR(255) NOT NULL,
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

## 📁 Almacenamiento de Archivos

### Estructura de Carpetas Recomendada
```
storage/
├── cv/
│   ├── {user_id}/
│   │   ├── {application_id}.pdf
│   │   ├── {application_id}.docx
│   │   └── ...
│   └── ...
└── avatars/ (para futuro)
```

### Rutas de CV
```
Frontend: /api/applications/{app_id}/cv (descarga)
Backend: /storage/cv/{user_id}/{app_id}.{ext}
```

---

## ✅ Validaciones Backend Requeridas

### Autenticación
- [ ] Email único por usuario
- [ ] Contraseña mínimo 6 caracteres
- [ ] user_type solo: candidate, company
- [ ] Email con formato válido

### Ofertas
- [ ] Solo empresas pueden crear ofertas
- [ ] Título no vacío
- [ ] Descripción no vacía
- [ ] Ubicación no vacía
- [ ] job_type válido (5 opciones)
- [ ] experience_level válido (4 opciones)

### Aplicaciones
- [ ] Solo candidatos pueden aplicar
- [ ] No pueden aplicar dos veces mismo usuario a misma oferta
- [ ] CV es obligatorio
- [ ] Email y teléfono válidos
- [ ] LinkedIn URL válida (si se completa)
- [ ] Archivo CV: PDF, .doc, .docx
- [ ] Archivo CV máximo 5MB

### Reportes
- [ ] Razón de reporte válida
- [ ] Usuario autenticado

---

## 🔄 Flujo de Datos

```
CANDIDATO
├── Registrarse → POST /api/auth/register
├── Login → POST /api/auth/login
├── Ver ofertas → GET /api/jobs
├── Buscar → GET /api/jobs?search=X&location=Y
├── Aplicar → POST /api/jobs/{id}/apply (con CV)
└── Reportar → POST /api/jobs/{id}/report

EMPRESA
├── Registrarse → POST /api/auth/register
├── Login → POST /api/auth/login
├── Crear oferta → POST /api/jobs
├── Editar oferta → PUT /api/jobs/{id}
├── Eliminar oferta → DELETE /api/jobs/{id}
├── Ver aplicaciones → GET /api/jobs/{id}/applications
└── Actualizar estado → PATCH /api/applications/{id}
```

---

## 🧪 Datos de Prueba

### Usuario Candidato
```json
{
  "email": "candidato@test.com",
  "password": "test123",
  "name": "Juan Pérez",
  "user_type": "candidate",
  "location": "Madrid"
}
```

### Usuario Empresa
```json
{
  "email": "empresa@test.com",
  "password": "test123",
  "name": "TechStart Madrid",
  "user_type": "company",
  "location": "Madrid"
}
```

---

## 🚀 Implementación Backend (FastAPI Ejemplo)

```python
from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import uvicorn

app = FastAPI()

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Rutas de ejemplo
@app.post("/api/auth/register")
async def register(userData: dict):
    # Implementar lógica de registro
    pass

@app.get("/api/jobs")
async def get_jobs(search: str = "", location: str = ""):
    # Implementar lógica de búsqueda
    pass

@app.post("/api/jobs/{job_id}/apply")
async def apply_job(job_id: str, file: UploadFile = File(...)):
    # Implementar lógica de aplicación
    pass

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
```

---

## 📝 Respuesta de Errores Estándar

```json
{
  "detail": "Descripción del error",
  "status_code": 400
}
```

### Códigos HTTP Esperados
- `200` - OK
- `201` - Created
- `400` - Bad Request (validación fallida)
- `401` - Unauthorized (no autenticado)
- `403` - Forbidden (no autorizado)
- `404` - Not Found
- `409` - Conflict (email duplicado)
- `500` - Internal Server Error

---

## 🔐 Seguridad

- [ ] Validar JWT en cada request protegido
- [ ] Hashear contraseñas (bcrypt)
- [ ] Validar tipos de archivo
- [ ] Validar tamaños de archivo
- [ ] Sanitizar inputs
- [ ] Rate limiting en auth endpoints
- [ ] HTTPS en producción
- [ ] CORS configurado correctamente

---

## 📊 Métricas Importantes

- Total de usuarios: `SELECT COUNT(*) FROM users`
- Total de ofertas: `SELECT COUNT(*) FROM jobs`
- Total de aplicaciones: `SELECT COUNT(*) FROM applications`
- Ofertas por empresa: `SELECT user_id, COUNT(*) FROM jobs GROUP BY user_id`
- Aplicaciones por oferta: `SELECT job_id, COUNT(*) FROM applications GROUP BY job_id`

---

**¡Listo para integración! 🚀**
