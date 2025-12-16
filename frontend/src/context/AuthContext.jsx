import React, { createContext, useContext, useState, useEffect } from "react";
import { authenticateUser, registerUser } from "../data/mockUsers";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe ser usado dentro de un AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Cargar usuario desde localStorage al montar el componente
  useEffect(() => {
    const loadUser = () => {
      try {
        const storedUser = localStorage.getItem("auth_user");
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.error("Error al cargar usuario:", error);
        localStorage.removeItem("auth_user");
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  // Login
  const login = (email, password) => {
    const result = authenticateUser(email, password);

    if (result.success) {
      setUser(result.user);
      localStorage.setItem("auth_user", JSON.stringify(result.user));
      return true;
    }

    return false;
  };

  // Register
  const register = (userData) => {
    const result = registerUser(userData);

    if (result.success) {
      setUser(result.user);
      localStorage.setItem("auth_user", JSON.stringify(result.user));
      return { success: true, user: result.user };
    }

    return { success: false, message: result.message };
  };

  // Logout
  const logout = () => {
    setUser(null);
    localStorage.removeItem("auth_user");
  };

  // Update user profile
  const updateProfile = (updatedData) => {
    const updatedUser = {
      ...user,
      profile: {
        ...user.profile,
        ...updatedData,
      },
    };

    setUser(updatedUser);
    localStorage.setItem("auth_user", JSON.stringify(updatedUser));
    return true;
  };

  // Check if user is candidate
  const isCandidate = () => {
    return user?.user_type === "candidate";
  };

  // Check if user is company
  const isCompany = () => {
    return user?.user_type === "company";
  };

  // Add job to saved jobs (solo para candidatos)
  const saveJob = (jobId) => {
    if (!isCandidate()) return false;

    const savedJobs = user.profile.savedJobs || [];
    
    if (savedJobs.includes(jobId)) {
      // Ya está guardado, removerlo
      const updatedSavedJobs = savedJobs.filter(id => id !== jobId);
      updateProfile({ savedJobs: updatedSavedJobs });
      return { saved: false, message: "Trabajo removido de guardados" };
    } else {
      // Agregar a guardados
      const updatedSavedJobs = [...savedJobs, jobId];
      updateProfile({ savedJobs: updatedSavedJobs });
      return { saved: true, message: "Trabajo guardado exitosamente" };
    }
  };

  // Check if job is saved
  const isJobSaved = (jobId) => {
    if (!isCandidate()) return false;
    const savedJobs = user?.profile?.savedJobs || [];
    return savedJobs.includes(jobId);
  };

  // Apply to job (solo para candidatos)
  const applyToJob = (jobId, applicationData) => {
    if (!isCandidate()) return false;

    const applications = user.profile.applications || [];
    
    // Verificar si ya aplicó
    if (applications.some(app => app.jobId === jobId)) {
      return { success: false, message: "Ya aplicaste a este trabajo" };
    }

    const newApplication = {
      id: `app_${Date.now()}`,
      jobId,
      appliedAt: new Date().toISOString(),
      status: "pending", // pending, reviewed, accepted, rejected
      ...applicationData
    };

    const updatedApplications = [...applications, newApplication];
    updateProfile({ applications: updatedApplications });

    return { success: true, message: "Aplicación enviada exitosamente" };
  };

  // Check if user has applied to job
  const hasAppliedToJob = (jobId) => {
    if (!isCandidate()) return false;
    const applications = user?.profile?.applications || [];
    return applications.some(app => app.jobId === jobId);
  };

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    updateProfile,
    isCandidate,
    isCompany,
    saveJob,
    isJobSaved,
    applyToJob,
    hasAppliedToJob,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

/*Email: juan@example.com
Password: password123

Email: contacto@techcorp.com
Password: password123*/