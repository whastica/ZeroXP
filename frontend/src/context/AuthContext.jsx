import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { authService } from "../services/auth/authService";
import { jobActionsService } from "../services/jobs/JobActionsService";
import { isCandidate, isCompany } from "../constants/userRoles";

const AuthContext = createContext(undefined);

/**
 * Hook para consumir el contexto de autenticación
 * @throws {Error} Si se usa fuera del AuthProvider
 */
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe ser usado dentro de un AuthProvider");
  }
  return context;
};

/**
 * Provider de Autenticación
 * Maneja el estado global del usuario autenticado
 */
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // ============================================================
  // INICIALIZACIÓN
  // ============================================================
  
  useEffect(() => {
    const loadUser = () => {
      try {
        const storedUser = authService.getCurrentUser();
        if (storedUser) {
          setUser(storedUser);
        }
      } catch (error) {
        console.error("Error al cargar usuario:", error);
        authService.logout();
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  // ============================================================
  // AUTENTICACIÓN
  // ============================================================

  /**
   * Inicia sesión
   * @param {string} email
   * @param {string} password
   * @returns {Promise<boolean>}
   */
  const login = useCallback(async (email, password) => {
    try {
      const result = await authService.login(email, password);
      
      if (result.success) {
        setUser(result.user);
        return true;
      }
      
      return false;
    } catch (error) {
      console.error("Error en login:", error);
      return false;
    }
  }, []);

  /**
   * Registra un nuevo usuario
   * @param {Object} userData
   * @returns {Promise<{success: boolean, user?: Object, message?: string}>}
   */
  const register = useCallback(async (userData) => {
    try {
      const result = await authService.register(userData);
      
      if (result.success) {
        setUser(result.user);
        return { success: true, user: result.user };
      }
      
      return { success: false, message: result.error };
    } catch (error) {
      console.error("Error en registro:", error);
      return { success: false, message: "Error al registrar usuario" };
    }
  }, []);

  /**
   * Cierra sesión
   */
  const logout = useCallback(() => {
    authService.logout();
    setUser(null);
  }, []);

  // ============================================================
  // PERFIL
  // ============================================================

  /**
   * Actualiza el perfil del usuario
   * @param {Object} updatedData - Datos a actualizar en el perfil
   * @returns {boolean}
   */
  const updateProfile = useCallback((updatedData) => {
    if (!user) return false;

    try {
      const updatedUser = {
        ...user,
        profile: {
          ...user.profile,
          ...updatedData,
        },
      };

      setUser(updatedUser);
      authService.updateUser(updatedUser);
      return true;
    } catch (error) {
      console.error("Error al actualizar perfil:", error);
      return false;
    }
  }, [user]);

  // ============================================================
  // VERIFICACIONES DE ROL
  // ============================================================

  const checkIsCandidate = useCallback(() => {
    return isCandidate(user);
  }, [user]);

  const checkIsCompany = useCallback(() => {
    return isCompany(user);
  }, [user]);

  // ============================================================
  // ACCIONES DE TRABAJOS (Solo Candidatos)
  // ============================================================

  /**
   * Guarda o remueve un trabajo de favoritos
   * @param {string} jobId
   * @returns {{saved: boolean, message: string}}
   */
  const saveJob = useCallback((jobId) => {
    if (!user) return { saved: false, message: "Usuario no autenticado" };

    try {
      const result = jobActionsService.toggleSaveJob(user, jobId);
      updateProfile({ savedJobs: result.savedJobs });
      
      return {
        saved: result.saved,
        message: result.message
      };
    } catch (error) {
      console.error("Error al guardar trabajo:", error);
      return { saved: false, message: error.message };
    }
  }, [user, updateProfile]);

  /**
   * Verifica si un trabajo está guardado
   * @param {string} jobId
   * @returns {boolean}
   */
  const isJobSaved = useCallback((jobId) => {
    return jobActionsService.isJobSaved(user, jobId);
  }, [user]);

  /**
   * Aplica a un trabajo
   * @param {string} jobId
   * @param {Object} applicationData
   * @returns {{success: boolean, message: string}}
   */
  const applyToJob = useCallback((jobId, applicationData) => {
    if (!user) return { success: false, message: "Usuario no autenticado" };

    try {
      const result = jobActionsService.applyToJob(user, jobId, applicationData);
      
      if (result.success) {
        updateProfile({ applications: result.applications });
      }
      
      return {
        success: result.success,
        message: result.message
      };
    } catch (error) {
      console.error("Error al aplicar a trabajo:", error);
      return { success: false, message: error.message };
    }
  }, [user, updateProfile]);

  /**
   * Verifica si el usuario ya aplicó a un trabajo
   * @param {string} jobId
   * @returns {boolean}
   */
  const hasAppliedToJob = useCallback((jobId) => {
    return jobActionsService.hasAppliedToJob(user, jobId);
  }, [user]);

  // ============================================================
  // VALOR DEL CONTEXTO
  // ============================================================

  const value = {
    // Estado
    user,
    loading,
    
    // Autenticación
    login,
    register,
    logout,
    
    // Perfil
    updateProfile,
    
    // Verificaciones de rol
    isCandidate: checkIsCandidate,
    isCompany: checkIsCompany,
    
    // Acciones de trabajos
    saveJob,
    isJobSaved,
    applyToJob,
    hasAppliedToJob,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};