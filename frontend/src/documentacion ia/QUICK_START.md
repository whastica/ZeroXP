# 🚀 GUÍA DE EJECUCIÓN RÁPIDA - ZeroXP MVP

## ⚡ 5 Minutos para Verlo Funcionando

### Paso 1: Preparar el Backend

```bash
# En la carpeta de tu backend (FastAPI)
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate

pip install fastapi uvicorn sqlalchemy python-dotenv python-multipart

# Crear archivo main.py con endpoints básicos
# (Ver BACKEND_INTEGRATION.md para detalles)

# Ejecutar
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

### Paso 2: Preparar el Frontend

```bash
# En la carpeta frontend (d:\Proyectos\ZeroXp\frontend)

# 1. Instalar dependencias
npm install

# 2. Crear .env
# Crear archivo .env en la raíz con:
REACT_APP_BACKEND_URL=http://localhost:8000
REACT_APP_API_URL=http://localhost:8000/api

# 3. Ejecutar
npm start
```

### Paso 3: Abrir en Navegador

```
http://localhost:3000
```

**¡Deberías ver la página principal con 6 ofertas!**

---

## 📋 Checklist Rápido

- [ ] Backend ejecutándose en puerto 8000
- [ ] Variables de entorno (.env) configuradas
- [ ] `npm install` completado sin errores
- [ ] `npm start` ejecutándose
- [ ] Navegador abre http://localhost:3000
- [ ] Ves la página con 6 ofertas de empleo

---

## 🎯 Flujo Rápido de Prueba

### 1. Registrarse como Candidato
```
1. Click "Iniciar Sesión"
2. Click "¿No tienes cuenta? Regístrate"
3. Completa:
   - Email: juan@test.com
   - Contraseña: test123
   - Nombre: Juan Pérez
   - Ubicación: Madrid
   - Tipo: Candidato
4. Click "Crear Cuenta"
```

### 2. Ver Ofertas
```
1. Verás 6 ofertas en la página principal
2. Cada una con:
   - Título del puesto
   - Empresa
   - Ubicación
   - Descripción
   - Tipo y nivel de experiencia
   - Rango salarial
```

### 3. Aplicar a una Oferta
```
1. Selecciona una oferta
2. Click "Aplicar Rápido" o "Aplicar Estándar"
3. Modal de aplicación aparece
4. Se auto-rellenan: Nombre y Email
5. Completa:
   - Teléfono: +34 123 456 789
   - CV: Crea un PDF o Word simple
   - LinkedIn: https://linkedin.com (opcional)
   - Cuéntanos sobre ti: Escribe un mensaje
6. Click "Enviar Aplicación"
7. ¡Verás: ✅ Aplicación enviada!
```

### 4. Registrarse como Empresa (Nuevo navegador o incógnito)
```
1. Click "Iniciar Sesión"
2. Click "Regístrate"
3. Completa:
   - Email: empresa@test.com
   - Contraseña: test123
   - Nombre: Mi Empresa
   - Ubicación: Madrid
   - Tipo: Empresa
4. Click "Crear Cuenta"
```

### 5. Publicar una Oferta
```
1. Ir a: http://localhost:3000/empresa
2. Click "+ Publicar Nueva Oferta"
3. Modal se abre
4. Completa:
   - Título: "Mi Primera Oferta"
   - Ubicación: "Barcelona"
   - Descripción: "Buscamos alguien con..."
   - Tipo: Tiempo Completo
   - Nivel: Entrada
5. Click "Publicar Oferta"
6. ¡Verás: ✅ Trabajo publicado!
7. Tu oferta aparece en el panel
8. Los candidatos la ven en homepage
```

---

## 🎬 Video Mental - Lo que Pasa

```
PASO 1 - Home Page
├─ Hero section con barra de búsqueda
├─ Grid 3 columnas de ofertas
├─ Cada oferta es un card con detalles
└─ Botones: Aplicar Rápido, Estándar, Premium

PASO 2 - Candidato Aplica
├─ Click "Aplicar"
├─ Modal se abre
├─ Datos pre-rellenados (nombre, email)
├─ Usuario sube CV
├─ Usuario completa LinkedIn (opt)
├─ Usuario escribe mensaje
└─ Click "Enviar" → ✅ Éxito

PASO 3 - Empresa Publica
├─ Ir a /empresa
├─ Ver panel con estadísticas
├─ Click "+ Publicar"
├─ Formulario largo
├─ Click "Publicar"
└─ Oferta aparece en homepage

PASO 4 - Vueltas a Home
├─ La nueva oferta de la empresa aparece
├─ Candidatos ven todas las ofertas
├─ Pueden buscar por título/ubicación
├─ Sistema funcionando ✅
```

---

## 🐛 Si Hay Problemas

### Error: "BACKEND_URL is undefined"
```
Solución:
1. Asegúrate que .env está en raíz de frontend
2. Contiene: REACT_APP_BACKEND_URL=http://localhost:8000
3. Reinicia: npm start
```

### Error: "Cannot GET /jobs"
```
Solución:
1. Verifica que backend está ejecutándose
2. Asegúrate que está en puerto 8000
3. Revisa consola del navegador (F12)
```

### Error: "CORS error"
```
Solución:
En tu backend FastAPI agrega:
from fastapi.middleware.cors import CORSMiddleware
app.add_middleware(CORSMiddleware, allow_origins=["http://localhost:3000"], ...)
```

### Error: "File too large"
```
Solución:
El CV debe ser menor a 5MB
Asegúrate de subir un archivo pequeño
```

### Error: "Invalid file type"
```
Solución:
Solo PDF, .doc, .docx son soportados
No puedes subir .txt, .jpg, etc.
```

---

## ✅ Verificación de Funcionalidad

Abre consola del navegador (F12) y verifica:

```javascript
// Debería haber 6 ofertas
console.log('Número de ofertas:', document.querySelectorAll('[class*="card"]').length)
// Resultado: 6 ofertas

// Busca funcionando
const searchInput = document.querySelector('input[placeholder*="¿Qué"]')
searchInput.value = 'Frontend'
// La búsqueda filtra ofertas

// Modal de aplicación
const applyButtons = document.querySelectorAll('button:contains("Aplicar")')
// Muchos botones deberían existir
```

---

## 🎯 Demostración Completa (15 minutos)

### Escenario 1: Candidato sin Experiencia
```
1. (0 min) Abrir http://localhost:3000
2. (1 min) Ver 6 ofertas precargadas
3. (2 min) Registrarse como candidato
4. (3 min) Buscar ofertas por ubicación
5. (4 min) Ver detalles de una oferta
6. (5 min) Aplicar con CV
7. (6 min) Ver confirmación
```

### Escenario 2: Empresa Publica
```
1. (7 min) Logout o nueva sesión
2. (8 min) Registrarse como empresa
3. (9 min) Ir a /empresa
4. (10 min) Ver panel y estadísticas
5. (11 min) Publicar nueva oferta
6. (12 min) Ver oferta en panel
7. (13 min) Logout y ver oferta en homepage
8. (14 min) Mostrar que candidato puede aplicar
9. (15 min) Fin
```

---

## 📊 Lo que Mostrar

### Candidatos:
✅ Buscar ofertas por título y ubicación
✅ Ver detalles de cada oferta
✅ Aplicar con 3 tipos diferentes
✅ Subir CV (obligatorio)
✅ Agregar LinkedIn (opcional)
✅ Escribir mensaje personal
✅ Recibir confirmación

### Empresas:
✅ Panel con estadísticas
✅ Publicar nueva oferta
✅ Editar oferta
✅ Eliminar oferta
✅ Ver contador de aplicaciones
✅ Gestión de ofertas completa

---

## 💡 Tips para la Demostración

### Crear Datos de Prueba
```bash
# CV de prueba: Crear un PDF simple con:
- Nombre: Juan Pérez
- Email: test@test.com
- Educación: Autodidacta
- Experiencia: Ninguna

# LinkedIn de prueba:
https://linkedin.com/in/juanperez

# Teléfono de prueba:
+34 666 666 666
```

### Mostrar Validaciones
```
1. Intenta subir .txt como CV → Error
2. Intenta subir >5MB → Error
3. Intenta enviar sin CV → Error
4. Intenta enviar sin teléfono → Error
```

### Mostrar Responsividad
```
1. Abre dev tools (F12)
2. Toggle device toolbar (Ctrl+Shift+M)
3. Prueba en: Mobile, Tablet, Desktop
4. Muestra que todo es responsive
```

---

## 🎁 Bonus: Acciones Rápidas

### Ver todas las ofertas en consola
```javascript
fetch('http://localhost:8000/api/jobs')
  .then(r => r.json())
  .then(data => console.log('Ofertas:', data))
```

### Buscar en home
```javascript
// En la barra de búsqueda, escribe "Frontend"
// Debería filtrar y mostrar solo ofertas Frontend
```

### Ver aplicaciones
```javascript
// Si tienes backend, en consola:
fetch('http://localhost:8000/api/applications')
  .then(r => r.json())
  .then(data => console.log('Aplicaciones:', data))
```

---

## 📝 Notas Importantes

1. **Datos Persistentes**: Se guardan en backend
2. **Almacenamiento Local**: Usuario logueado en localStorage
3. **Seed Data**: Se crea automáticamente al primer load
4. **Responsive**: Funciona en móvil, tablet, desktop

---

## 🎉 Éxito!

Si seguiste todos los pasos y ves:
- ✅ 6 ofertas en homepage
- ✅ Puedes registrarte
- ✅ Puedes aplicar con CV
- ✅ Puedes publicar ofertas

**¡Tu MVP ZeroXP está funcionando perfectamente! 🚀**

---

**Tiempo estimado: 5-15 minutos**
**Complejidad: Baja**
**Resultado: MVP 100% funcional**

¡Adelante! 💪
