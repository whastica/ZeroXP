# 🔧 Setup e Instalación - ZeroXP Frontend

## 📋 Requisitos Previos

- Node.js 16+ 
- npm o yarn
- Backend ZeroXP ejecutándose

---

## 🚀 Instalación Inicial

### 1. Instalar Dependencias

```bash
npm install
```

o con yarn:

```bash
yarn install
```

### 2. Configurar Variables de Entorno

Crea un archivo `.env` en la raíz del proyecto:

```env
REACT_APP_BACKEND_URL=http://localhost:8000
REACT_APP_API_URL=http://localhost:8000/api
```

**Nota:** Ajusta `localhost:8000` según donde esté tu backend

### 3. Iniciar el Servidor de Desarrollo

```bash
npm start
```

El proyecto abrirá automáticamente en `http://localhost:3000`

---

## 📦 Dependencias Principales

```json
{
  "react": "^19.0.0",
  "react-router-dom": "^7.5.1",
  "axios": "^1.8.4",
  "sonner": "^latest",
  "@radix-ui/*": "various",
  "tailwindcss": "^latest",
  "shadcn/ui": "components"
}
```

---

## 🔄 Estructura del Proyecto

```
frontend/
├── src/
│   ├── App.js              ← Archivo principal (modificado)
│   ├── App.css
│   ├── index.js
│   ├── components/
│   │   └── ui/             ← Componentes Shadcn
│   ├── hooks/
│   │   └── use-toast.js
│   └── lib/
│       └── utils.js
├── public/
│   └── index.html
├── .env                    ← Variables de entorno
├── package.json
├── tailwind.config.js
├── DEMO_GUIDE.md           ← Guía de demostración (NUEVO)
└── CHANGELOG.md            ← Cambios implementados (NUEVO)
```

---

## 🧪 Pruebas Locales

### Simulación de Candidato

1. Abre el navegador en `http://localhost:3000`
2. Click "Iniciar Sesión" → "Regístrate"
3. Completa:
   - Email: `candidato@test.com`
   - Contraseña: `test123`
   - Nombre: `Juan Pérez`
   - Ubicación: `Madrid`
   - Tipo: `Candidato`
4. Click "Crear Cuenta"
5. Verás las ofertas en la página principal
6. Selecciona una y prueba aplicar con CV

### Simulación de Empresa

1. Click "Iniciar Sesión" → "Regístrate"
2. Completa:
   - Email: `empresa@test.com`
   - Contraseña: `test123`
   - Nombre: `Mi Empresa`
   - Ubicación: `Madrid`
   - Tipo: `Empresa`
3. Navega a `http://localhost:3000/empresa`
4. Click "+ Publicar Nueva Oferta"
5. Completa el formulario y publica

---

## 🐛 Troubleshooting

### Error: "Cannot find module"

```bash
# Limpia cache y reinstala
rm -rf node_modules package-lock.json
npm install
```

### Error: "BACKEND_URL is undefined"

Verifica que `.env` está en la raíz del proyecto y contiene:
```
REACT_APP_BACKEND_URL=http://localhost:8000
```

### Error: "CORS"

El backend debe permitir requests desde `http://localhost:3000`:
```python
# FastAPI
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

### Error: "No se cargan las ofertas"

1. Verifica que el backend está ejecutándose
2. Comprueba la URL en `.env`
3. Revisa la consola del navegador (F12)
4. Revisa los logs del backend

---

## 📱 Build para Producción

```bash
npm run build
```

Genera carpeta `build/` lista para deployar

---

## 🚀 Deploy Sugerido

### Opción 1: Vercel (Recomendado)

```bash
# Instala Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Opción 2: Netlify

```bash
# Instala Netlify CLI
npm i -g netlify-cli

# Deploy
netlify deploy --prod --dir=build
```

### Opción 3: Manual (GitHub Pages)

```bash
npm run build
# Copia contenido de build/ a tu hosting
```

---

## 📝 Variables de Entorno

| Variable | Valor | Requerido |
|----------|-------|----------|
| `REACT_APP_BACKEND_URL` | `http://localhost:8000` | ✅ |
| `REACT_APP_API_URL` | `http://localhost:8000/api` | ⭕ |

---

## 🎯 Checklist Pre-Lanzamiento

- [ ] Backend ejecutándose en puerto 8000
- [ ] Variables de entorno configuradas
- [ ] `npm install` completado
- [ ] `npm start` sin errores
- [ ] Candidato puede registrarse
- [ ] Empresa puede registrarse
- [ ] Ofertas visibles en home
- [ ] Candidato puede aplicar con CV
- [ ] Empresa puede publicar oferta
- [ ] Empresa puede editar oferta
- [ ] Empresa puede eliminar oferta

---

## 🔐 Seguridad

- ✅ Validación de archivo de CV en frontend
- ✅ Almacenamiento seguro en localStorage (user data)
- ✅ HTTPS recomendado en producción
- ✅ CORS configurado
- ⚠️ Backend debe validar también todos los datos

---

## 📊 Performance

- Páginas: ~50KB gzipped
- Tiempo de carga inicial: ~2-3 segundos
- Lazy loading de imágenes (si aplica)
- Componentes optimizados con React.memo (si es necesario)

---

## 🆘 Contacto

Para reportar bugs o pedir ayuda, abre un issue en GitHub

---

**¡Listo para desarrollo! 🎉**
