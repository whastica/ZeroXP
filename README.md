# 🎯 TalentFirst

> Portal de empleos exclusivo para desarrolladores junior sin experiencia

[![Estado](https://img.shields.io/badge/estado-en%20desarrollo-yellow)]()
[![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.2-green)]()
[![React](https://img.shields.io/badge/React-18-blue)]()
[![License](https://img.shields.io/badge/license-MIT-blue.svg)]()

[🌐 Demo en Vivo](https://talentfirst.com) • [📹 Video Demo](https://youtube.com/...) • [📧 Contacto](mailto:tu@email.com)

---

## 📖 Sobre el Proyecto

**El Problema:**  
Recién graduados en tecnología aplican a ofertas etiquetadas como "junior" pero que requieren 3-5 años de experiencia. Plataformas como LinkedIn e Indeed no filtran efectivamente por nivel de experiencia real.

**La Solución:**  
TalentFirst es una plataforma donde SOLO se publican ofertas para personas sin experiencia laboral previa. Las empresas son verificadas manualmente y los candidatos pueden aplicar con un solo clic.

**Estado Actual:** 🚧 MVP en desarrollo activo  
**Deployment Previsto:** Mediados de febrero 2025

---

## ✨ Características

### Implementadas ✅
- Autenticación JWT para candidatos y empresas
- CRUD completo de ofertas de empleo
- Sistema de aplicaciones con seguimiento de estado
- Dashboard para empresas (visualizar aplicaciones)
- Panel de candidatos (ver mis aplicaciones)
- Carga de CV en PDF

### En Desarrollo 🚧
- Notificaciones por email (Sendgrid)
- Filtros avanzados (ubicación, stack tecnológico)
- Sistema de matching automático
- Deployment en Railway
- Tests de integración (coverage >60%)

### Roadmap 🗺️
- Exportar reportes para empresas
- API pública para partners
- Métricas y analytics
- App móvil (React Native)

---

## 🛠️ Stack Tecnológico

### Backend
- **Framework:** Spring Boot 3.2.x
- **Lenguaje:** Java 17
- **Base de Datos:** MySQL 8.0
- **Autenticación:** JWT con Spring Security
- **Testing:** JUnit 5 + Mockito
- **Build:** Maven

### Frontend
- **Framework:** React 18
- **Lenguaje:** TypeScript
- **Estilos:** Tailwind CSS v4
- **Routing:** React Router v6
- **State:** Context API
- **Build:** Vite

### DevOps
- **Hosting:** Railway (Backend) + Vercel (Frontend)
- **CI/CD:** GitHub Actions (próximamente)
- **Storage:** AWS S3 (CVs)

---

## 🚀 Instalación y Configuración

### Prerrequisitos
- Java 17+
- Node.js 18+
- MySQL 8.0+
- Maven 3.8+

### Backend

1. **Clonar el repositorio:**
```bash
git clone https://github.com/tuusuario/talentfirst.git
cd talentfirst/backend
```

2. **Configurar variables de entorno:**
```bash
cp .env.example .env
# Edita .env con tus credenciales
```

3. **Ejecutar migraciones:**
```bash
mvn flyway:migrate
```

4. **Iniciar servidor:**
```bash
mvn spring-boot:run
```

El servidor estará disponible en `http://localhost:8080`

### Frontend

1. **Navegar al directorio:**
```bash
cd ../frontend
```

2. **Instalar dependencias:**
```bash
npm install
```

3. **Configurar variables:**
```bash
cp .env.example .env
# Edita VITE_API_URL con la URL de tu backend
```

4. **Iniciar desarrollo:**
```bash
npm run dev
```

La aplicación estará en `http://localhost:5173`

---

## 📊 Arquitectura
```
┌─────────────┐      HTTP/REST      ┌──────────────┐
│   React     │ ←─────────────────→ │ Spring Boot  │
│  Frontend   │      JSON/JWT       │   Backend    │
└─────────────┘                     └──────────────┘
                                            │
                                            ▼
                                    ┌──────────────┐
                                    │    MySQL     │
                                    │   Database   │
                                    └──────────────┘
```

### Modelo de Datos (Simplificado)
```sql
Usuario
  ├── id (PK)
  ├── email
  ├── password (hashed)
  ├── rol (CANDIDATO | EMPRESA)
  └── timestamps

Oferta
  ├── id (PK)
  ├── empresa_id (FK → Usuario)
  ├── titulo
  ├── descripcion
  ├── requisitos
  ├── salario (opcional)
  └── timestamps

Aplicacion
  ├── id (PK)
  ├── candidato_id (FK → Usuario)
  ├── oferta_id (FK → Oferta)
  ├── cv_url
  ├── estado (PENDIENTE | REVISADO | RECHAZADO)
  └── timestamps
```

---

## 🧪 Testing
```bash
# Backend - Ejecutar todos los tests
mvn test

# Backend - Con coverage
mvn test jacoco:report

# Frontend - Unit tests
npm run test

# Frontend - E2E (Cypress)
npm run test:e2e
```

**Coverage Actual:** 45% (objetivo: 70%)

---

## 📸 Screenshots

### Landing Page
![Landing](docs/images/landing.png)

### Dashboard Candidato
![Dashboard Candidato](docs/images/dashboard-candidate.png)

### Dashboard Empresa
![Dashboard Empresa](docs/images/dashboard-company.png)

---

## 🎥 Video Demo

[![Video Demo](https://img.youtube.com/vi/YOUR_VIDEO_ID/0.jpg)](https://youtube.com/watch?v=YOUR_VIDEO_ID)

*Haz clic en la imagen para ver el video completo (2:30 min)*

---

## 🗺️ Roadmap de Desarrollo

- [x] **Semana 1-2:** Setup + Autenticación
- [x] **Semana 3-4:** CRUD ofertas y aplicaciones
- [x] **Semana 5:** Dashboards básicos
- [ ] **Semana 6:** Deployment + Usuarios reales
- [ ] **Semana 7:** Notificaciones + Mejoras UX
- [ ] **Semana 8+:** Escalabilidad + Features avanzados

---

## 🤝 Contribuciones

Este es un proyecto personal en desarrollo, pero feedback es bienvenido:

1. Abre un Issue describiendo el bug o mejora
2. (Opcional) Haz un Fork y crea un Pull Request
3. Asegúrate de que los tests pasen

---

## 📝 Notas del Desarrollador

**¿Por qué construí esto?**  
Como recién graduado, experimenté de primera mano la frustración de aplicar a ofertas "junior" que no lo son. TalentFirst es mi forma de resolver este problema mientras demuestro mis capacidades técnicas.

**Aprendizajes clave:**
- Diseño de APIs RESTful con Spring Boot
- Autenticación JWT y manejo seguro de contraseñas
- Arquitectura frontend escalable con React
- Deployment de aplicaciones fullstack
- Trabajo con usuarios reales y feedback iterativo

---

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver archivo [LICENSE](LICENSE) para más detalles.

---

## 📬 Contacto

**Tu Nombre**  
- Email: tu@email.com  
- LinkedIn: [linkedin.com/in/tuusuario](https://linkedin.com/in/tuusuario)  
- Portfolio: [tuportfolio.com](https://tuportfolio.com)

---

<p align="center">
  Hecho con ❤️ y ☕ por [Tu Nombre]
</p># Here are your Instructions
