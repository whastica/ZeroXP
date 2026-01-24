import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight, Check, X, Sparkles } from "lucide-react";
import { Button } from "../ui/Button";
import ProgressBar from "./ProgressBar";
import PersonalInfoStep from "./steps/PersonalInfoStep";
import CVUploadStep from "./steps/CVUploadStep";
import InterestsStep from "./steps/InterestsStep";
import SocialMediaStep from "./steps/SocialMediaStep";
import { useOnboarding } from "../../hooks/useOnboarding";

const STEPS = [
  { number: 1, label: "Datos personales", component: PersonalInfoStep },
  { number: 2, label: "Educación", component: CVUploadStep },
  { number: 3, label: "Intereses", component: InterestsStep },
  { number: 4, label: "Redes sociales", component: SocialMediaStep }
];

const OnboardingWizard = ({ onComplete, onSkip }) => {
  const navigate = useNavigate();
  const {
    currentStep,
    formData,
    errors,
    isLoading,
    isSaving,
    updateStepData,
    nextStep,
    prevStep,
    finishOnboarding,
    skipOnboarding
  } = useOnboarding();

  const CurrentStepComponent = STEPS[currentStep - 1].component;
  const isLastStep = currentStep === STEPS.length;
  const isFirstStep = currentStep === 1;

  const handleNext = async () => {
    await nextStep();
  };

  const handleFinish = async () => {
    const success = await finishOnboarding();
    if (success) {
      onComplete?.();
      navigate("/");
    }
  };

  const handleSkip = async () => {
    const success = await skipOnboarding();
    if (success) {
      onSkip?.();
      navigate("/");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 via-white to-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        {/* Card principal con animación */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden animate-fade-in">
          
          {/* Header con gradiente */}
          <div className="relative bg-gradient-to-r from-orange-500 to-red-500 text-white p-6 md:p-8">
            {/* Patrón decorativo */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full blur-3xl" />
            </div>
            
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                    <Sparkles className="w-6 h-6" />
                  </div>
                  <div>
                    <h1 className="text-2xl md:text-3xl font-black">Completa tu perfil</h1>
                    <p className="text-white/90 text-sm">Solo te tomará unos minutos</p>
                  </div>
                </div>
                <button
                  onClick={handleSkip}
                  className="text-sm font-semibold text-white/90 hover:text-white transition-colors flex items-center gap-1 px-4 py-2 rounded-lg hover:bg-white/10"
                  disabled={isSaving || isLoading}
                >
                  <X className="w-4 h-4" />
                  Completar después
                </button>
              </div>

              <ProgressBar
                currentStep={currentStep}
                totalSteps={STEPS.length}
                steps={STEPS}
              />
            </div>
          </div>

          {/* Content */}
          <div className="p-6 md:p-8 lg:p-10 min-h-[500px]">
            {isLoading ? (
              <div className="flex items-center justify-center h-full">
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-orange-500 to-red-500 mb-4">
                    <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-white"></div>
                  </div>
                  <p className="text-gray-600 font-medium">Cargando tu información...</p>
                </div>
              </div>
            ) : (
              <CurrentStepComponent
                data={formData[`step${currentStep}`]}
                errors={errors}
                onChange={updateStepData}
              />
            )}
          </div>

          {/* Footer */}
          <div className="p-6 md:p-8 border-t bg-gray-50 flex flex-col sm:flex-row items-center justify-between gap-4">
            <Button
              onClick={prevStep}
              variant="outline"
              disabled={isFirstStep || isSaving || isLoading}
              className="w-full sm:w-auto border-2 hover:border-orange-300 hover:bg-orange-50"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Anterior
            </Button>

            <div className="flex gap-3 w-full sm:w-auto">
              {isLastStep ? (
                <Button
                  onClick={handleFinish}
                  disabled={isSaving || isLoading}
                  className="w-full sm:min-w-[180px] bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold shadow-orange hover:shadow-orange-lg transition-all hover:scale-105"
                >
                  {isSaving || isLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Guardando...
                    </>
                  ) : (
                    <>
                      <Check className="w-5 h-5 mr-2" />
                      Finalizar
                    </>
                  )}
                </Button>
              ) : (
                <Button
                  onClick={handleNext}
                  disabled={isSaving || isLoading}
                  className="w-full sm:min-w-[180px] bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold shadow-orange hover:shadow-orange-lg transition-all hover:scale-105"
                >
                  {isSaving ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Guardando...
                    </>
                  ) : (
                    <>
                      Siguiente
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </>
                  )}
                </Button>
              )}
            </div>
          </div>

          {/* Save indicator */}
          {isSaving && (
            <div className="px-6 py-3 bg-blue-50 border-t border-blue-200 animate-slide-up">
              <div className="flex items-center justify-center gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                <p className="text-sm text-blue-900 font-medium">
                  💾 Guardando tu progreso automáticamente...
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Info adicional debajo */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            🔒 Tu información está segura y privada
          </p>
        </div>
      </div>
    </div>
  );
};

export default OnboardingWizard;