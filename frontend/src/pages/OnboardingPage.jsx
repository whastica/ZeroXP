import React from "react";
import { useNavigate } from "react-router-dom";
import OnboardingWizard from "../components/onboarding/OnboardingWizard";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../hooks/use-toast";
// Si tu hook se llama "use-toast", cambia la línea de arriba

const OnboardingPage = () => {
  const navigate = useNavigate();
  const { user, isCandidate } = useAuth();
  const { toast } = useToast();

  // Redirigir si no es candidato o no está autenticado
  React.useEffect(() => {
    if (!user) {
      navigate("/auth");
      return;
    }

    if (!isCandidate()) {
      toast({
        title: "Acceso denegado",
        description: "El onboarding solo está disponible para candidatos.",
        variant: "destructive"
      });
      navigate("/");
    }
  }, [user, isCandidate, navigate]);

  const handleComplete = () => {
    toast({
      title: "¡Perfil completado! 🎉",
      description: "Ya puedes empezar a buscar y aplicar a ofertas de trabajo."
    });
  };

  const handleSkip = () => {
    toast({
      title: "Progreso guardado",
      description: "Puedes completar tu perfil más tarde desde tu configuración."
    });
  };

  if (!user || !isCandidate()) {
    return null;
  }

  return (
    <OnboardingWizard
      onComplete={handleComplete}
      onSkip={handleSkip}
    />
  );
};

export default OnboardingPage;