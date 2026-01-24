/**
 * Hook useJobActions
 * Encapsula toda la lógica de acciones sobre trabajos
 */

import { useCallback } from 'react';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

export const useJobActions = () => {
  const { saveJob, isJobSaved, applyToJob, hasAppliedToJob, isCandidate } = useAuth();

  /**
   * Guarda o remueve un trabajo con feedback visual
   * @param {string} jobId
   */
  const handleSaveJob = useCallback((jobId) => {
    if (!isCandidate()) {
      toast.error('Solo los candidatos pueden guardar trabajos');
      return;
    }

    const result = saveJob(jobId);
    
    if (result.saved) {
      toast.success('💾 Trabajo guardado');
    } else {
      toast.success('🗑️ Trabajo removido de guardados');
    }
  }, [saveJob, isCandidate]);

  /**
   * Aplica a un trabajo con feedback visual
   * @param {string} jobId
   * @param {Object} applicationData
   * @returns {Promise<boolean>}
   */
  const handleApplyToJob = useCallback(async (jobId, applicationData) => {
    if (!isCandidate()) {
      toast.error('Solo los candidatos pueden aplicar a trabajos');
      return false;
    }

    const result = applyToJob(jobId, applicationData);
    
    if (result.success) {
      toast.success('🎉 Aplicación enviada exitosamente');
      return true;
    } else {
      toast.error(result.message);
      return false;
    }
  }, [applyToJob, isCandidate]);

  /**
   * Verifica el estado de un trabajo (guardado y aplicado)
   * @param {string} jobId
   * @returns {{isSaved: boolean, hasApplied: boolean}}
   */
  const getJobStatus = useCallback((jobId) => {
    return {
      isSaved: isJobSaved(jobId),
      hasApplied: hasAppliedToJob(jobId)
    };
  }, [isJobSaved, hasAppliedToJob]);

  return {
    handleSaveJob,
    handleApplyToJob,
    isJobSaved,
    hasAppliedToJob,
    getJobStatus
  };
};