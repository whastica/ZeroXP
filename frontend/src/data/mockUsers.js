// data/mockUsers.js

export const mockUsers = [
  // Usuario Candidato
  {
    id: "candidate_001",
    email: "juan@example.com",
    password: "password123",
    user_type: "candidate",
    profile: {
      name: "Juan Pérez",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Juan",
      phone: "+57 300 123 4567",
      location: "Bogotá, Colombia",
      bio: "Joven profesional apasionado por aprender y crecer. Busco mi primera oportunidad laboral para demostrar mis capacidades y compromiso.",
      skills: [
        "Trabajo en equipo",
        "Comunicación efectiva",
        "Proactividad",
        "Puntualidad",
        "Manejo de Office básico"
      ],
      education: [
        {
          institution: "Colegio San José",
          degree: "Bachiller",
          year: "2023",
          description: "Graduado con honores"
        }
      ],
      interests: [
        "Atención al cliente",
        "Ventas",
        "Tecnología",
        "Aprendizaje continuo"
      ],
      availability: "Inmediata",
      expectedSalary: "SMLV",
      languages: [
        { language: "Español", level: "Nativo" },
        { language: "Inglés", level: "Básico" }
      ],
      socialMedia: {
        linkedin: "linkedin.com/in/juanperez",
        instagram: "@juanperez"
      },
      savedJobs: [], // IDs de trabajos guardados
      applications: [] // Historial de aplicaciones
    },
    createdAt: "2024-01-15T10:30:00Z",
    lastLogin: "2024-12-16T08:15:00Z",
    isActive: true,
    emailVerified: true
  },

  // Usuario Empresa
  {
    id: "company_001",
    email: "contacto@techcorp.com",
    password: "password123",
    user_type: "company",
    profile: {
      companyName: "TechCorp Solutions",
      logo: "https://api.dicebear.com/7.x/initials/svg?seed=TC&backgroundColor=f97316",
      industry: "Tecnología",
      size: "50-200 empleados",
      location: "Bogotá, Colombia",
      website: "https://techcorp.com",
      description: "Empresa líder en soluciones tecnológicas innovadoras. Nos especializamos en desarrollo de software y consultoría IT. Buscamos talento joven con ganas de aprender y crecer profesionalmente.",
      foundedYear: 2015,
      benefits: [
        "Capacitación continua",
        "Ambiente laboral flexible",
        "Oportunidades de crecimiento",
        "Bonos por desempeño",
        "Seguro médico",
        "Horarios flexibles"
      ],
      culture: [
        "Innovación",
        "Trabajo en equipo",
        "Inclusión y diversidad",
        "Balance vida-trabajo"
      ],
      contactPerson: {
        name: "María González",
        position: "HR Manager",
        email: "maria@techcorp.com",
        phone: "+57 601 234 5678"
      },
      socialMedia: {
        linkedin: "linkedin.com/company/techcorp",
        twitter: "@techcorp",
        facebook: "facebook.com/techcorp"
      },
      verified: true,
      rating: 4.5,
      reviewsCount: 127,
      jobsPosted: [
        {
          id: "job_001",
          title: "Asistente de Soporte Técnico",
          status: "active",
          applicants: 45,
          postedDate: "2024-12-10"
        },
        {
          id: "job_002",
          title: "Recepcionista",
          status: "active",
          applicants: 32,
          postedDate: "2024-12-12"
        }
      ]
    },
    createdAt: "2023-06-20T14:00:00Z",
    lastLogin: "2024-12-16T09:00:00Z",
    isActive: true,
    emailVerified: true,
    subscriptionPlan: "premium" // free, basic, premium
  }
];

// Función helper para buscar usuario por email
export const findUserByEmail = (email) => {
  return mockUsers.find(user => user.email.toLowerCase() === email.toLowerCase());
};

// Función helper para autenticar usuario
export const authenticateUser = (email, password) => {
  const user = findUserByEmail(email);
  
  if (!user) {
    return { success: false, message: "Usuario no encontrado" };
  }
  
  if (user.password !== password) {
    return { success: false, message: "Contraseña incorrecta" };
  }
  
  if (!user.isActive) {
    return { success: false, message: "Cuenta desactivada" };
  }
  
  // No devolver la contraseña
  const { password: _, ...userWithoutPassword } = user;
  
  return { 
    success: true, 
    user: userWithoutPassword,
    message: "Login exitoso"
  };
};

// Función para registrar nuevo usuario (simulado)
export const registerUser = (userData) => {
  // En un app real, esto haría una petición al backend
  const newUser = {
    id: `${userData.user_type}_${Date.now()}`,
    email: userData.email,
    password: userData.password,
    user_type: userData.user_type,
    profile: userData.user_type === "candidate" ? {
      name: userData.name,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${userData.name}`,
      location: "",
      bio: "",
      skills: [],
      education: [],
      interests: [],
      availability: "Inmediata",
      savedJobs: [],
      applications: []
    } : {
      companyName: userData.companyName,
      logo: `https://api.dicebear.com/7.x/initials/svg?seed=${userData.companyName}`,
      industry: "",
      size: "",
      location: "",
      description: "",
      benefits: [],
      culture: [],
      contactPerson: {
        name: userData.name,
        email: userData.email
      },
      verified: false,
      jobsPosted: []
    },
    createdAt: new Date().toISOString(),
    lastLogin: new Date().toISOString(),
    isActive: true,
    emailVerified: false
  };
  
  // Simular que se guarda en la "base de datos"
  mockUsers.push(newUser);
  
  const { password: _, ...userWithoutPassword } = newUser;
  
  return {
    success: true,
    user: userWithoutPassword,
    message: "Usuario registrado exitosamente"
  };
};