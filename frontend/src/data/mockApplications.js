// data/mockApplications.js
import { mockJobs } from './mockJobs';

/**
 * Mock de aplicaciones de usuarios a empleos
 * Estructura que simula las aplicaciones guardadas en el perfil del candidato
 */
export const mockApplications = [
  {
    id: "app_001",
    userId: "candidate_001", // Referencia al usuario que aplicó
    jobId: 1, // Referencia al trabajo de mockJobs
    appliedDate: "2025-01-10T14:30:00Z",
    status: "pending", // pending, interview, rejected, accepted
    applicationMethod: "quick", // quick (aplicación rápida), detailed (aplicación detallada)
    viewedByCompany: true,
    viewedAt: "2025-01-11T09:15:00Z",
    applicationData: {
      // Datos enviados en la aplicación
      fullName: "Juan Pérez",
      email: "juan@example.com",
      phone: "+57 300 123 4567",
      resumeUrl: "/uploads/resumes/juan_perez_cv.pdf",
      linkedinUrl: "linkedin.com/in/juanperez",
      coverLetter: "Estoy muy interesado en esta posición porque...",
      availability: "Inmediata"
    },
    companyNotes: "", // Notas internas de la empresa
    timeline: [
      {
        status: "pending",
        date: "2025-01-10T14:30:00Z",
        note: "Aplicación recibida"
      },
      {
        status: "viewed",
        date: "2025-01-11T09:15:00Z",
        note: "Revisada por empresa"
      }
    ]
  },
  {
    id: "app_002",
    userId: "candidate_001",
    jobId: 3,
    appliedDate: "2025-01-08T10:20:00Z",
    status: "interview",
    applicationMethod: "detailed",
    viewedByCompany: true,
    viewedAt: "2025-01-09T11:30:00Z",
    applicationData: {
      fullName: "Juan Pérez",
      email: "juan@example.com",
      phone: "+57 300 123 4567",
      resumeUrl: "/uploads/resumes/juan_perez_cv.pdf",
      linkedinUrl: "linkedin.com/in/juanperez",
      coverLetter: "Mi experiencia en redes sociales personales...",
      availability: "Inmediata",
      portfolio: "https://juanperez.com/portfolio"
    },
    companyNotes: "Candidato prometedor, agendar entrevista",
    interviewDetails: {
      scheduled: true,
      date: "2025-01-20T15:00:00Z",
      type: "virtual", // virtual, presencial
      meetingLink: "https://meet.google.com/abc-defg-hij",
      interviewer: "Carlos Rodríguez - HR Manager"
    },
    timeline: [
      {
        status: "pending",
        date: "2025-01-08T10:20:00Z",
        note: "Aplicación recibida"
      },
      {
        status: "viewed",
        date: "2025-01-09T11:30:00Z",
        note: "Revisada por empresa"
      },
      {
        status: "interview",
        date: "2025-01-12T16:45:00Z",
        note: "Entrevista programada para el 20 de enero"
      }
    ]
  },
  {
    id: "app_003",
    userId: "candidate_001",
    jobId: 5,
    appliedDate: "2025-01-05T16:45:00Z",
    status: "rejected",
    applicationMethod: "quick",
    viewedByCompany: true,
    viewedAt: "2025-01-06T10:00:00Z",
    applicationData: {
      fullName: "Juan Pérez",
      email: "juan@example.com",
      phone: "+57 300 123 4567",
      resumeUrl: "/uploads/resumes/juan_perez_cv.pdf",
      availability: "Inmediata"
    },
    companyNotes: "Perfil no se ajusta a requerimientos técnicos",
    rejectionReason: "En esta ocasión decidimos continuar con otros candidatos que cuentan con experiencia específica en testing automatizado.",
    timeline: [
      {
        status: "pending",
        date: "2025-01-05T16:45:00Z",
        note: "Aplicación recibida"
      },
      {
        status: "viewed",
        date: "2025-01-06T10:00:00Z",
        note: "Revisada por empresa"
      },
      {
        status: "rejected",
        date: "2025-01-07T14:20:00Z",
        note: "Proceso finalizado"
      }
    ]
  },
  {
    id: "app_004",
    userId: "candidate_001",
    jobId: 2,
    appliedDate: "2025-01-14T09:30:00Z",
    status: "pending",
    applicationMethod: "detailed",
    viewedByCompany: false,
    applicationData: {
      fullName: "Juan Pérez",
      email: "juan@example.com",
      phone: "+57 300 123 4567",
      resumeUrl: "/uploads/resumes/juan_perez_cv.pdf",
      linkedinUrl: "linkedin.com/in/juanperez",
      coverLetter: "Tengo gran interés en el área de soporte técnico...",
      availability: "Inmediata"
    },
    timeline: [
      {
        status: "pending",
        date: "2025-01-14T09:30:00Z",
        note: "Aplicación recibida"
      }
    ]
  },
  {
    id: "app_005",
    userId: "candidate_001",
    jobId: 6,
    appliedDate: "2025-01-12T11:15:00Z",
    status: "accepted",
    applicationMethod: "quick",
    viewedByCompany: true,
    viewedAt: "2025-01-13T08:00:00Z",
    applicationData: {
      fullName: "Juan Pérez",
      email: "juan@example.com",
      phone: "+57 300 123 4567",
      resumeUrl: "/uploads/resumes/juan_perez_cv.pdf",
      availability: "Inmediata"
    },
    companyNotes: "Excelente candidato, ofrecer posición",
    offerDetails: {
      position: "Asistente Administrativo Digital",
      salary: "$1,300,000 COP",
      startDate: "2025-02-01",
      contractType: "Término indefinido",
      benefits: ["Seguro médico", "Capacitaciones", "Bonos de desempeño"]
    },
    timeline: [
      {
        status: "pending",
        date: "2025-01-12T11:15:00Z",
        note: "Aplicación recibida"
      },
      {
        status: "viewed",
        date: "2025-01-13T08:00:00Z",
        note: "Revisada por empresa"
      },
      {
        status: "interview",
        date: "2025-01-14T10:00:00Z",
        note: "Entrevista realizada"
      },
      {
        status: "accepted",
        date: "2025-01-15T15:30:00Z",
        note: "Oferta laboral enviada"
      }
    ]
  }
];

/**
 * Función helper para obtener aplicaciones de un usuario específico
 * @param {string} userId - ID del usuario candidato
 * @returns {Array} Array de aplicaciones con información del trabajo
 */
export const getApplicationsByUserId = (userId) => {
  return mockApplications
    .filter(app => app.userId === userId)
    .map(app => {
      // Buscar el trabajo correspondiente
      const job = mockJobs.find(j => j.id === app.jobId);
      
      // Calcular días desde la aplicación
      const appliedDate = new Date(app.appliedDate);
      const today = new Date();
      const daysAgo = Math.floor((today - appliedDate) / (1000 * 60 * 60 * 24));
      
      return {
        ...app,
        job: job || null, // Incluir toda la información del trabajo
        daysAgo
      };
    })
    .sort((a, b) => new Date(b.appliedDate) - new Date(a.appliedDate)); // Más recientes primero
};

/**
 * Función para agregar una nueva aplicación
 * @param {Object} applicationData - Datos de la aplicación
 * @returns {Object} Nueva aplicación creada
 */
export const addApplication = (applicationData) => {
  const newApplication = {
    id: `app_${Date.now()}`,
    userId: applicationData.userId,
    jobId: applicationData.jobId,
    appliedDate: new Date().toISOString(),
    status: "pending",
    applicationMethod: applicationData.applicationMethod || "quick",
    viewedByCompany: false,
    applicationData: applicationData.data,
    timeline: [
      {
        status: "pending",
        date: new Date().toISOString(),
        note: "Aplicación recibida"
      }
    ]
  };
  
  mockApplications.push(newApplication);
  return newApplication;
};

/**
 * Función para retirar/cancelar una aplicación
 * @param {string} applicationId - ID de la aplicación
 * @returns {boolean} true si se eliminó correctamente
 */
export const withdrawApplication = (applicationId) => {
  const index = mockApplications.findIndex(app => app.id === applicationId);
  
  if (index !== -1) {
    mockApplications.splice(index, 1);
    return true;
  }
  
  return false;
};

/**
 * Función para actualizar el estado de una aplicación
 * @param {string} applicationId - ID de la aplicación
 * @param {string} newStatus - Nuevo estado
 * @param {Object} additionalData - Datos adicionales (opcional)
 * @returns {Object} Aplicación actualizada
 */
export const updateApplicationStatus = (applicationId, newStatus, additionalData = {}) => {
  const application = mockApplications.find(app => app.id === applicationId);
  
  if (!application) {
    return null;
  }
  
  application.status = newStatus;
  application.timeline.push({
    status: newStatus,
    date: new Date().toISOString(),
    note: additionalData.note || `Estado actualizado a ${newStatus}`
  });
  
  // Agregar datos adicionales según el estado
  if (newStatus === 'interview' && additionalData.interviewDetails) {
    application.interviewDetails = additionalData.interviewDetails;
  }
  
  if (newStatus === 'accepted' && additionalData.offerDetails) {
    application.offerDetails = additionalData.offerDetails;
  }
  
  if (newStatus === 'rejected' && additionalData.rejectionReason) {
    application.rejectionReason = additionalData.rejectionReason;
  }
  
  return application;
};

/**
 * Función para verificar si un usuario ya aplicó a un trabajo
 * @param {string} userId - ID del usuario
 * @param {number} jobId - ID del trabajo
 * @returns {boolean} true si ya aplicó
 */
export const hasUserApplied = (userId, jobId) => {
  return mockApplications.some(app => app.userId === userId && app.jobId === jobId);
};

/**
 * Función para obtener estadísticas de aplicaciones de un usuario
 * @param {string} userId - ID del usuario
 * @returns {Object} Objeto con estadísticas
 */
export const getApplicationStats = (userId) => {
  const userApps = mockApplications.filter(app => app.userId === userId);
  
  return {
    total: userApps.length,
    pending: userApps.filter(app => app.status === 'pending').length,
    interview: userApps.filter(app => app.status === 'interview').length,
    rejected: userApps.filter(app => app.status === 'rejected').length,
    accepted: userApps.filter(app => app.status === 'accepted').length,
    viewedByCompany: userApps.filter(app => app.viewedByCompany).length
  };
};