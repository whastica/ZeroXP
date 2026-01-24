import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { saveOnboardingProgress, getOnboardingProgress, completeOnboarding } from "../services/UserService";
import { useToast } from "./use-toast";
// Si tu hook se llama "use-toast" en lugar de "useToast", cambia la línea de arriba a:
// import { useToast } from "./use-toast";

export const useOnboarding = () => {
  const { user, updateProfile } = useAuth();
  const { toast } = useToast(); // Usar tu hook de toast
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Datos de cada step
  const [formData, setFormData] = useState({
    step1: {
      name: user?.profile?.name || "",
      phone: user?.profile?.phone || "",
      location: user?.profile?.location || "",
      bio: user?.profile?.bio || ""
    },
    step2: {
      education: user?.profile?.education || [],
      availability: user?.profile?.availability || "Inmediata",
      expectedSalary: user?.profile?.expectedSalary || "SMLV"
    },
    step3: {
      interests: user?.profile?.interests || [],
      skills: user?.profile?.skills || [],
      languages: user?.profile?.languages || [{ language: "Español", level: "Nativo" }]
    },
    step4: {
      linkedin: user?.profile?.socialMedia?.linkedin || "",
      instagram: user?.profile?.socialMedia?.instagram || "",
      twitter: user?.profile?.socialMedia?.twitter || "",
      portfolio: user?.profile?.socialMedia?.portfolio || ""
    }
  });

  const [errors, setErrors] = useState({});

  // Cargar progreso guardado al montar
  useEffect(() => {
    if (user?.id) {
      loadProgress();
    }
  }, [user?.id]);

  const loadProgress = async () => {
    if (!user?.id) return;

    setIsLoading(true);
    try {
      const result = await getOnboardingProgress(user.id);
      if (result.success && result.data.lastStep) {
        // Restaurar datos guardados
        const savedData = result.data;
        setFormData({
          step1: savedData.step1 || formData.step1,
          step2: savedData.step2 || formData.step2,
          step3: savedData.step3 || formData.step3,
          step4: savedData.step4 || formData.step4
        });
        // Ir al último step + 1 (o al primero si ya completó)
        setCurrentStep(savedData.lastStep < 4 ? savedData.lastStep + 1 : savedData.lastStep);
      }
    } catch (error) {
      console.error("Error al cargar progreso:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Validaciones por step
  const validateStep = (step) => {
    const newErrors = {};

    switch (step) {
      case 1:
        if (!formData.step1.name.trim()) {
          newErrors.name = "El nombre es requerido";
        }
        if (!formData.step1.phone.trim()) {
          newErrors.phone = "El teléfono es requerido";
        }
        if (!formData.step1.location.trim()) {
          newErrors.location = "La ubicación es requerida";
        }
        break;

      case 2:
        if (formData.step2.education.length === 0) {
          newErrors.education = "Agrega al menos un nivel de educación";
        }
        break;

      case 3:
        if (formData.step3.interests.length === 0) {
          newErrors.interests = "Selecciona al menos un interés";
        }
        if (formData.step3.skills.length === 0) {
          newErrors.skills = "Agrega al menos una habilidad";
        }
        break;

      case 4:
        // Step 4 es opcional, no hay validaciones requeridas
        break;

      default:
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Actualizar datos de un step específico
  const updateStepData = (step, data) => {
    setFormData((prev) => ({
      ...prev,
      [`step${step}`]: {
        ...prev[`step${step}`],
        ...data
      }
    }));
    // Limpiar errores del campo actualizado
    if (errors[Object.keys(data)[0]]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[Object.keys(data)[0]];
        return newErrors;
      });
    }
  };

  // Guardar progreso del step actual
  const saveProgress = async (step) => {
    if (!user?.id) return false;

    setIsSaving(true);
    try {
      const stepData = formData[`step${step}`];
      await saveOnboardingProgress(user.id, step, stepData);
      return true;
    } catch (error) {
      console.error("Error al guardar progreso:", error);
      toast({
        title: "Error",
        description: "No se pudo guardar el progreso. Intenta de nuevo.",
        variant: "destructive"
      });
      return false;
    } finally {
      setIsSaving(false);
    }
  };

  // Ir al siguiente step
  const nextStep = async () => {
    if (!validateStep(currentStep)) {
      toast({
        title: "Campos incompletos",
        description: "Por favor completa todos los campos requeridos.",
        variant: "destructive"
      });
      return;
    }

    // Guardar progreso
    const saved = await saveProgress(currentStep);
    if (!saved) return;

    if (currentStep < 4) {
      setCurrentStep((prev) => prev + 1);
      toast({
        title: "Progreso guardado",
        description: "Tus datos han sido guardados correctamente."
      });
    }
  };

  // Ir al step anterior
  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  // Saltar al step específico
  const goToStep = (step) => {
    if (step >= 1 && step <= 4) {
      setCurrentStep(step);
    }
  };

  // Completar onboarding
  const finishOnboarding = async () => {
    if (!validateStep(currentStep)) {
      toast({
        title: "Campos incompletos",
        description: "Por favor completa todos los campos requeridos.",
        variant: "destructive"
      });
      return false;
    }

    setIsLoading(true);
    try {
      // Guardar último step
      await saveProgress(currentStep);

      // Consolidar todos los datos
      const completeData = {
        name: formData.step1.name,
        phone: formData.step1.phone,
        location: formData.step1.location,
        bio: formData.step1.bio,
        education: formData.step2.education,
        availability: formData.step2.availability,
        expectedSalary: formData.step2.expectedSalary,
        interests: formData.step3.interests,
        skills: formData.step3.skills,
        languages: formData.step3.languages,
        socialMedia: {
          linkedin: formData.step4.linkedin,
          instagram: formData.step4.instagram,
          twitter: formData.step4.twitter,
          portfolio: formData.step4.portfolio
        }
      };

      // Marcar onboarding como completado
      await completeOnboarding(user.id, formData);

      // Actualizar perfil del usuario en el contexto
      updateProfile(completeData);

      toast({
        title: "¡Bienvenido a ZeroXp!",
        description: "Tu perfil ha sido configurado exitosamente."
      });

      return true;
    } catch (error) {
      console.error("Error al completar onboarding:", error);
      toast({
        title: "Error",
        description: "No se pudo completar el registro. Intenta de nuevo.",
        variant: "destructive"
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Saltar onboarding (completar después)
  const skipOnboarding = async () => {
    if (!user?.id) return false;

    try {
      // Guardar progreso actual aunque esté incompleto
      await saveProgress(currentStep);
      
      toast({
        title: "Progreso guardado",
        description: "Puedes completar tu perfil más tarde desde configuración."
      });

      return true;
    } catch (error) {
      console.error("Error al saltar onboarding:", error);
      return false;
    }
  };

  return {
    currentStep,
    formData,
    errors,
    isLoading,
    isSaving,
    updateStepData,
    nextStep,
    prevStep,
    goToStep,
    finishOnboarding,
    skipOnboarding,
    validateStep
  };
};