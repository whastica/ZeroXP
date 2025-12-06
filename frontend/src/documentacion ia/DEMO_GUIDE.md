# 🚀 ZeroXP - Guía de Demostración del MVP

## 📋 Descripción General

ZeroXP es una plataforma de empleo diseñada para conectar personas sin experiencia previa con empresas que buscan talento junior. El MVP incluye funcionalidades para candidatos que quieren aplicar a ofertas y empresas que desean publicar posiciones.

---

## 🎯 Funcionalidades Principales

### Para Candidatos (Búsqueda y Aplicación de Empleos)

1. **Visualizar Ofertas de Empleo**
   - Accede a la página principal
   - Verás una lista de 6 ofertas de ejemplo precargadas
   - Cada oferta muestra:
     - Título del puesto
     - Nombre de la empresa
     - Ubicación
     - Descripción breve
     - Tipo de empleo (Tiempo completo, Parcial, etc.)
     - Nivel de experiencia requerido
     - Rango salarial (si aplica)

2. **Buscar Ofertas**
   - Usa la barra de búsqueda en el hero section
   - Busca por título de trabajo o ubicación
   - Filtra resultados en tiempo real

3. **Aplicar a una Oferta** (3 opciones)
   - **Aplicación Rápida**: Comparte tu información básica
   - **Aplicación Estándar**: Incluye más detalles
   - **Aplicación Premium** ($5): Destaca tu candidatura con mensaje personal

4. **Formulario de Aplicación - Campos Obligatorios:**
   - ✅ **Datos Básicos** (OBLIGATORIOS)
     - Nombre Completo
     - Email
     - Teléfono
   - ✅ **CV** (OBLIGATORIO)
     - Soporta: PDF, .doc, .docx
     - Máximo tamaño: 5MB
   - ⭕ **LinkedIn** (OPCIONAL)
     - Perfil de LinkedIn
   - ⭕ **Mensaje Personal** (Para Premium)
   - ⭕ **Información Adicional**
     - Cuéntanos por qué te interesa el trabajo

5. **Reportar Ofertas Sospechosas**
   - Click en el botón 🚩 de cualquier oferta
   - Selecciona la razón del reporte
   - Agrega descripción opcional
   - Ayuda a mantener la plataforma segura

### Para Empresas (Publicación de Ofertas)

1. **Acceder al Panel de Empresa**
   - Inicia sesión como empresa
   - Navega a `/empresa`
   - Verás el dashboard con estadísticas

2. **Panel de Control**
   - **Estadísticas:**
     - Ofertas activas
     - Total de aplicaciones recibidas
     - Nombre de la empresa
   - **Acciones:**
     - Publicar nuevas ofertas
     - Editar ofertas existentes
     - Eliminar ofertas

3. **Crear/Editar una Oferta**
   - Click en "+ Publicar Nueva Oferta"
   - Completa el formulario:
     - **Información Básica:**
       - Título del trabajo ✅
       - Ubicación ✅
       - Descripción detallada ✅
     - **Tipo y Nivel:**
       - Tipo de empleo (Full-time, Part-time, Contrato, Prácticas, Freelance)
       - Nivel de experiencia (Entrada, Junior, Mid-Level, Senior)
     - **Detalles Opcionales:**
       - Requisitos específicos
       - Beneficios ofrecidos
       - Rango salarial
       - Fecha límite de aplicación

4. **Gestionar Ofertas Publicadas**
   - Visualiza todas tus ofertas
   - **Editar**: Modifica cualquier oferta
   - **Eliminar**: Remueve ofertas (con confirmación)
   - Ve el número de aplicaciones recibidas

---

## 🔐 Autenticación

### Crear Cuenta de Candidato
1. Click en "Iniciar Sesión" en la navbar
2. Click en "¿No tienes cuenta? Regístrate"
3. Completa:
   - Email
   - Contraseña
   - Nombre completo
   - Ubicación
   - Selecciona "Candidato" como tipo de usuario

### Crear Cuenta de Empresa
1. Mismo proceso que candidato
2. En "Tipo de Usuario" selecciona "Empresa"
3. El nombre será el nombre de la empresa

### Iniciar Sesión
1. Usa tus credenciales registradas
2. Serás redirigido automáticamente según tu tipo

---

## 📊 Datos de Ejemplo Precargados

El sistema incluye 6 ofertas de ejemplo:

1. **Desarrollador Frontend Junior** - TechStart Madrid
   - Madrid, España | Full-time | Entrada
   - Rango: €1200-€1500/mes

2. **Asistente de Soporte Técnico** - CloudTech Solutions
   - Barcelona, España | Full-time | Entrada
   - Rango: €1000-€1300/mes

3. **Community Manager Trainee** - Digital Growth Agency
   - Valencia, España | Part-time | Entrada
   - Rango: €900-€1200/mes

4. **Data Entry Specialist** - Business Process Solutions
   - Madrid, España | Full-time | Entrada
   - Rango: €1100-€1400/mes

5. **Asistente de Marketing Digital** - MarketBridge
   - Remoto | Full-time | Entrada
   - Rango: €1000-€1250/mes

6. **Asistente Administrativo** - Corporativo Vasco SL
   - Bilbao, España | Full-time | Entrada
   - Rango: €950-€1200/mes

---

## 🧪 Casos de Uso para Demostración

### Caso 1: Candidato Busca y Aplica
1. Crea cuenta como candidato
2. En la página principal, visualiza las ofertas
3. Busca por ubicación (ej: "Madrid")
4. Selecciona una oferta
5. Click en "Aplicar Rápido/Estándar/Premium"
6. Completa el formulario:
   - Nombre: (auto-rellenado)
   - Email: (auto-rellenado)
   - Teléfono: Ingresa un número
   - CV: Sube un archivo PDF o Word
   - LinkedIn: Opcional, ingresa URL
   - Cuéntanos sobre ti: Escribe un mensaje
7. Click "Enviar Aplicación"
8. Recibirás confirmación ✅

### Caso 2: Empresa Publica Oferta
1. Crea cuenta como empresa
2. Navega a `/empresa`
3. Click "+ Publicar Nueva Oferta"
4. Completa los campos:
   - Título: "Mi Primera Oferta"
   - Ubicación: "Mi Ciudad"
   - Descripción: Detalla el puesto
   - Tipo: Selecciona Tiempo Completo
   - Nivel: Selecciona Entrada
   - Requisitos: Opcional
   - Beneficios: Opcional
   - Rango Salarial: Opcional
   - Fecha Límite: Opcional
5. Click "Publicar Oferta"
6. Verás la oferta en tu lista

### Caso 3: Editar y Eliminar Ofertas
1. En el panel de empresa
2. Busca una oferta en la lista
3. Click "Editar" para modificar
4. Click "Eliminar" para quitar (con confirmación)

---

## 🎨 Componentes UI Utilizados

- **Shadcn/UI** Components
- **Tailwind CSS** para estilos
- **Lucide React** para iconos
- **React Router** para navegación
- **Axios** para peticiones HTTP
- **Sonner** para notificaciones (Toast)
- **React Hook Form** para formularios

---

## 🔄 Flujo de Datos

```
Usuario Candidato
├── Registrarse/Login
├── Ver Ofertas (Home)
├── Buscar Ofertas
├── Reportar Oferta
└── Aplicar a Oferta
    ├── Cargar CV
    ├── Datos Básicos
    ├── LinkedIn (Opcional)
    └── Enviar Aplicación

Usuario Empresa
├── Registrarse/Login
├── Panel (/empresa)
├── Publicar Oferta
├── Editar Oferta
├── Eliminar Oferta
└── Ver Estadísticas
```

---

## 🚀 Próximas Mejoras Planeadas

- [ ] Panel de aplicaciones recibidas para empresas
- [ ] Perfil de usuario con edición
- [ ] Sistema de notificaciones en tiempo real
- [ ] Favoritos de ofertas para candidatos
- [ ] Integración de pagos (Stripe) para Premium
- [ ] Búsqueda avanzada con filtros
- [ ] Sistema de ratings/reviews
- [ ] Chat entre candidatos y empresas
- [ ] Exportar datos de aplicaciones
- [ ] Modulación en componentes React

---

## 🛠️ Stack Técnico

**Frontend:**
- React 19
- React Router 7.5
- Tailwind CSS
- Shadcn/UI
- Axios

**Backend:**
- FastAPI (Python)
- PostgreSQL o SQLite
- JWT para autenticación

---

## 📝 Notas Importantes

1. **CV Obligatorio**: Toda aplicación DEBE incluir un CV
2. **Validación de Email**: Se valida formato de email
3. **Limitación de Archivo**: CV máximo 5MB
4. **Tipos de Archivo**: Solo PDF, .doc, .docx
5. **Datos Guardados**: Se guardan en base de datos backend
6. **Mensajes**: Sistema de Toast para feedback visual

---

## 🆘 Troubleshooting

**Problema: No veo las ofertas**
- Verifica que el backend esté corriendo
- Comprueba la variable `REACT_APP_BACKEND_URL`
- Revisa la consola del navegador

**Problema: No puedo subir CV**
- Verifica el formato (PDF, .doc, .docx)
- Comprueba el tamaño (máximo 5MB)
- Recarga la página e intenta de nuevo

**Problema: Error de autenticación**
- Verifica las credenciales
- Borra localStorage y vuelve a registrarte
- Comprueba que el endpoint `/auth/login` funciona

---

## 📞 Contacto y Soporte

Para preguntas sobre el MVP o reportar bugs, contacta al equipo de desarrollo.

**¡Gracias por usar ZeroXP! 🎉**
