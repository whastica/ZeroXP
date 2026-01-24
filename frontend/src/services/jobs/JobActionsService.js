/**
 * Job Actions Service
 * Maneja las acciones relacionadas con trabajos (guardar, aplicar)
 */

import { isCandidate } from '../../constants/userRoles';

class JobActionsService {
  /**
   * Guarda o remueve un trabajo de favoritos
   * @param {Object} user - Usuario actual
   * @param {string} jobId - ID del trabajo
   * @returns {{saved: boolean, savedJobs: Array, message: string}}
   */
  toggleSaveJob(user, jobId) {
    if (!isCandidate(user)) {
      throw new Error('Solo los candidatos pueden guardar trabajos');
    }

    const savedJobs = user.profile?.savedJobs || [];
    const isAlreadySaved = savedJobs.includes(jobId);

    if (isAlreadySaved) {
      const updatedSavedJobs = savedJobs.filter(id => id !== jobId);
      return {
        saved: false,
        savedJobs: updatedSavedJobs,
        message: 'Trabajo removido de guardados'
      };
    } else {
      const updatedSavedJobs = [...savedJobs, jobId];
      return {
        saved: true,
        savedJobs: updatedSavedJobs,
        message: 'Trabajo guardado exitosamente'
      };
    }
  }

  /**
   * Verifica si un trabajo está guardado
   * @param {Object} user - Usuario actual
   * @param {string} jobId - ID del trabajo
   * @returns {boolean}
   */
  isJobSaved(user, jobId) {
    if (!isCandidate(user)) return false;
    const savedJobs = user?.profile?.savedJobs || [];
    return savedJobs.includes(jobId);
  }

  /**
   * Aplica a un trabajo
   * @param {Object} user - Usuario actual
   * @param {string} jobId - ID del trabajo
   * @param {Object} applicationData - Datos de la aplicación
   * @returns {{success: boolean, application?: Object, applications?: Array, message: string}}
   */
  applyToJob(user, jobId, applicationData = {}) {
    if (!isCandidate(user)) {
      return {
        success: false,
        message: 'Solo los candidatos pueden aplicar a trabajos'
      };
    }

    const applications = user.profile?.applications || [];

    // Verificar si ya aplicó
    const hasApplied = applications.some(app => app.jobId === jobId);
    if (hasApplied) {
      return {
        success: false,
        message: 'Ya aplicaste a este trabajo'
      };
    }

    // Crear nueva aplicación
    const newApplication = {
      id: `app_${Date.now()}`,
      jobId,
      appliedAt: new Date().toISOString(),
      status: 'pending',
      ...applicationData
    };

    const updatedApplications = [...applications, newApplication];

    return {
      success: true,
      application: newApplication,
      applications: updatedApplications,
      message: 'Aplicación enviada exitosamente'
    };
  }

  /**
   * Verifica si el usuario ya aplicó a un trabajo
   * @param {Object} user - Usuario actual
   * @param {string} jobId - ID del trabajo
   * @returns {boolean}
   */
  hasAppliedToJob(user, jobId) {
    if (!isCandidate(user)) return false;
    const applications = user?.profile?.applications || [];
    return applications.some(app => app.jobId === jobId);
  }

  /**
   * Obtiene la aplicación de un usuario a un trabajo específico
   * @param {Object} user - Usuario actual
   * @param {string} jobId - ID del trabajo
   * @returns {Object|null}
   */
  getApplicationByJobId(user, jobId) {
    if (!isCandidate(user)) return null;
    const applications = user?.profile?.applications || [];
    return applications.find(app => app.jobId === jobId) || null;
  }

  /**
   * Obtiene todas las aplicaciones del usuario
   * @param {Object} user - Usuario actual
   * @returns {Array}
   */
  getAllApplications(user) {
    if (!isCandidate(user)) return [];
    return user?.profile?.applications || [];
  }

  /**
   * Obtiene todos los trabajos guardados del usuario
   * @param {Object} user - Usuario actual
   * @returns {Array}
   */
  getAllSavedJobs(user) {
    if (!isCandidate(user)) return [];
    return user?.profile?.savedJobs || [];
  }
}

// Exportar instancia única
export const jobActionsService = new JobActionsService();