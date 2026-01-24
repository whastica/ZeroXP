// services/UserService.js

// Simula el guardado del progreso del onboarding
export const saveOnboardingProgress = (userId, step, data) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // En una app real, esto haría una petición al backend
      const storageKey = `onboarding_progress_${userId}`;
      const currentProgress = JSON.parse(localStorage.getItem(storageKey) || '{}');
      
      const updatedProgress = {
        ...currentProgress,
        [`step${step}`]: {
          ...data,
          completedAt: new Date().toISOString()
        },
        lastStep: step,
        updatedAt: new Date().toISOString()
      };
      
      localStorage.setItem(storageKey, JSON.stringify(updatedProgress));
      
      resolve({
        success: true,
        data: updatedProgress,
        message: 'Progreso guardado exitosamente'
      });
    }, 300);
  });
};

// Obtiene el progreso del onboarding
export const getOnboardingProgress = (userId) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const storageKey = `onboarding_progress_${userId}`;
      const progress = JSON.parse(localStorage.getItem(storageKey) || '{}');
      
      resolve({
        success: true,
        data: progress
      });
    }, 200);
  });
};

// Completa el onboarding y actualiza el perfil del usuario
export const completeOnboarding = (userId, allData) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Marcar onboarding como completado
      const storageKey = `onboarding_progress_${userId}`;
      const progress = {
        ...allData,
        completed: true,
        completedAt: new Date().toISOString()
      };
      
      localStorage.setItem(storageKey, JSON.stringify(progress));
      
      resolve({
        success: true,
        data: progress,
        message: 'Onboarding completado exitosamente'
      });
    }, 300);
  });
};

// Verifica si el usuario ya completó el onboarding
export const isOnboardingCompleted = (userId) => {
  const storageKey = `onboarding_progress_${userId}`;
  const progress = JSON.parse(localStorage.getItem(storageKey) || '{}');
  return progress.completed === true;
};

// Limpia el progreso del onboarding (útil para testing)
export const clearOnboardingProgress = (userId) => {
  const storageKey = `onboarding_progress_${userId}`;
  localStorage.removeItem(storageKey);
};