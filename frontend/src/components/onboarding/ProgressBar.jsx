import React from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

const ProgressBar = ({ currentStep, totalSteps, steps }) => {
  const progressPercentage = ((currentStep - 1) / (totalSteps - 1)) * 100;

  return (
    <div className="w-full mb-8">
      {/* Línea de progreso */}
      <div className="relative">
        {/* Línea de fondo */}
        <div className="absolute top-5 left-0 w-full h-1 bg-gray-200 rounded-full">
          {/* Línea de progreso con gradiente naranja */}
          <div
            className="h-full bg-gradient-to-r from-orange-500 to-red-500 rounded-full transition-all duration-500 ease-out shadow-orange"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>

        {/* Steps */}
        <div className="relative flex justify-between">
          {steps.map((step, index) => {
            const stepNumber = index + 1;
            const isCompleted = stepNumber < currentStep;
            const isCurrent = stepNumber === currentStep;

            return (
              <div key={stepNumber} className="flex flex-col items-center">
                <div
                  className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 relative z-10 border-2",
                    isCompleted && "bg-gradient-to-br from-orange-500 to-red-500 border-orange-500 text-white shadow-orange",
                    isCurrent && "bg-gradient-to-br from-orange-500 to-red-500 border-orange-500 text-white ring-4 ring-orange-100 shadow-orange-lg scale-110",
                    !isCompleted && !isCurrent && "bg-white border-gray-300 text-gray-400"
                  )}
                >
                  {isCompleted ? (
                    <Check className="w-5 h-5" />
                  ) : (
                    <span>{stepNumber}</span>
                  )}
                </div>
                
                <div className="mt-3 text-center max-w-[100px]">
                  <p
                    className={cn(
                      "text-xs font-semibold transition-colors",
                      (isCompleted || isCurrent) ? "text-orange-600" : "text-gray-400"
                    )}
                  >
                    {step.label}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Indicador de progreso textual */}
      <div className="mt-6 text-center">
        <p className="text-sm text-gray-600 font-medium">
          Paso <span className="text-orange-600 font-bold">{currentStep}</span> de {totalSteps}
        </p>
        <div className="mt-2 w-32 mx-auto bg-gray-200 rounded-full h-1.5">
          <div 
            className="bg-gradient-to-r from-orange-500 to-red-500 h-1.5 rounded-full transition-all duration-500"
            style={{ width: `${(currentStep / totalSteps) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;