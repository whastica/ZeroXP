/**
 * Hook useProfile
 * Maneja todas las operaciones relacionadas con el perfil del usuario
 */

import { useCallback } from 'react';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

export const useProfile = () => {
  const { user, updateProfile } = useAuth();

  /**
   * Actualiza el perfil con feedback visual
   * @param {Object} data - Datos a actualizar
   * @param {Object} options - Opciones adicionales
   * @param {boolean} options.showToast - Mostrar notificación
   * @param {string} options.successMessage - Mensaje personalizado de éxito
   * @returns {boolean}
   */
  const handleUpdateProfile = useCallback((data, options = {}) => {
    const {
      showToast = true,
      successMessage = 'Perfil actualizado exitosamente'
    } = options;

    const success = updateProfile(data);

    if (success && showToast) {
      toast.success(successMessage);
    } else if (!success && showToast) {
      toast.error('Error al actualizar el perfil');
    }

    return success;
  }, [updateProfile]);

  /**
   * Actualiza información personal
   * @param {Object} personalInfo
   */
  const updatePersonalInfo = useCallback((personalInfo) => {
    return handleUpdateProfile(personalInfo, {
      successMessage: 'Información personal actualizada'
    });
  }, [handleUpdateProfile]);

  /**
   * Actualiza redes sociales
   * @param {Object} socialMedia
   */
  const updateSocialMedia = useCallback((socialMedia) => {
    return handleUpdateProfile({ socialMedia }, {
      successMessage: 'Redes sociales actualizadas'
    });
  }, [handleUpdateProfile]);

  /**
   * Actualiza intereses
   * @param {Array} interests
   */
  const updateInterests = useCallback((interests) => {
    return handleUpdateProfile({ interests }, {
      successMessage: 'Intereses actualizados'
    });
  }, [handleUpdateProfile]);

  /**
   * Actualiza CV
   * @param {Object} cvData
   */
  const updateCV = useCallback((cvData) => {
    return handleUpdateProfile({ cv: cvData }, {
      successMessage: 'CV actualizado exitosamente'
    });
  }, [handleUpdateProfile]);

  /**
   * Obtiene el perfil completo del usuario
   * @returns {Object|null}
   */
  const getProfile = useCallback(() => {
    return user?.profile || null;
  }, [user]);

  /**
   * Verifica si el perfil está completo
   * @returns {boolean}
   */
  const isProfileComplete = useCallback(() => {
    if (!user?.profile) return false;

    const profile = user.profile;
    const requiredFields = ['firstName', 'lastName', 'email'];

    return requiredFields.every(field => 
      profile[field] && profile[field].trim() !== ''
    );
  }, [user]);

  /**
   * Calcula el porcentaje de completitud del perfil
   * @returns {number} - Porcentaje de 0 a 100
   */
  const getProfileCompleteness = useCallback(() => {
    if (!user?.profile) return 0;

    const profile = user.profile;
    const fields = [
      'firstName',
      'lastName',
      'email',
      'phone',
      'location',
      'bio',
      'cv',
      'socialMedia',
      'interests'
    ];

    const completedFields = fields.filter(field => {
      const value = profile[field];
      if (Array.isArray(value)) return value.length > 0;
      if (typeof value === 'object') return Object.keys(value || {}).length > 0;
      return value && value.trim() !== '';
    });

    return Math.round((completedFields.length / fields.length) * 100);
  }, [user]);

  return {
    profile: user?.profile || null,
    updateProfile: handleUpdateProfile,
    updatePersonalInfo,
    updateSocialMedia,
    updateInterests,
    updateCV,
    getProfile,
    isProfileComplete,
    getProfileCompleteness
  };
};