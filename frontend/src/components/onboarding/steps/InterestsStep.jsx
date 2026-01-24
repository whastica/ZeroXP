import React, { useState } from "react";
import { Heart, Briefcase, Languages, Plus, X } from "lucide-react";
import { Input, Label } from "../../ui/input.jsx";
import { Button } from "../../ui/Button";
import { cn } from "@/lib/utils";

const SUGGESTED_INTERESTS = [
  "Atención al cliente",
  "Ventas",
  "Tecnología",
  "Administración",
  "Marketing",
  "Logística",
  "Educación",
  "Salud",
  "Turismo",
  "Gastronomía"
];

const SUGGESTED_SKILLS = [
  "Trabajo en equipo",
  "Comunicación efectiva",
  "Proactividad",
  "Puntualidad",
  "Resolución de problemas",
  "Manejo de Office",
  "Atención al detalle",
  "Organización",
  "Adaptabilidad",
  "Servicio al cliente"
];

const InterestsStep = ({ data, errors, onChange }) => {
  const [customInterest, setCustomInterest] = useState("");
  const [customSkill, setCustomSkill] = useState("");

  const handleChange = (field, value) => {
    onChange(3, { [field]: value });
  };

  // Intereses
  const toggleInterest = (interest) => {
    const current = data.interests || [];
    if (current.includes(interest)) {
      handleChange("interests", current.filter((i) => i !== interest));
    } else {
      handleChange("interests", [...current, interest]);
    }
  };

  const addCustomInterest = () => {
    if (customInterest.trim() && !data.interests.includes(customInterest.trim())) {
      handleChange("interests", [...data.interests, customInterest.trim()]);
      setCustomInterest("");
    }
  };

  // Habilidades
  const toggleSkill = (skill) => {
    const current = data.skills || [];
    if (current.includes(skill)) {
      handleChange("skills", current.filter((s) => s !== skill));
    } else {
      handleChange("skills", [...current, skill]);
    }
  };

  const addCustomSkill = () => {
    if (customSkill.trim() && !data.skills.includes(customSkill.trim())) {
      handleChange("skills", [...data.skills, customSkill.trim()]);
      setCustomSkill("");
    }
  };

  // Idiomas
  const addLanguage = () => {
    const newLanguage = { language: "", level: "Básico" };
    handleChange("languages", [...data.languages, newLanguage]);
  };

  const updateLanguage = (index, field, value) => {
    const updated = [...data.languages];
    updated[index] = { ...updated[index], [field]: value };
    handleChange("languages", updated);
  };

  const removeLanguage = (index) => {
    const updated = data.languages.filter((_, i) => i !== index);
    handleChange("languages", updated);
  };

  return (
    <div className="space-y-8 animate-slide-up">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-100 to-red-100 mb-4">
          <Heart className="w-8 h-8 text-orange-600" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900">Intereses y Habilidades</h2>
        <p className="text-gray-600 mt-2 max-w-lg mx-auto">
          Selecciona tus áreas de interés y habilidades principales para ayudarnos a encontrar las mejores oportunidades
        </p>
      </div>

      {/* Intereses */}
      <div className="space-y-4">
        <Label className="text-base font-bold flex items-center gap-2 text-gray-900">
          <Heart className="w-5 h-5 text-orange-600" />
          Intereses laborales <span className="text-orange-600">*</span>
        </Label>
        <p className="text-sm text-gray-600">
          Selecciona al menos un área de interés
        </p>
        <div className="flex flex-wrap gap-2.5">
          {SUGGESTED_INTERESTS.map((interest) => (
            <button
              key={interest}
              type="button"
              onClick={() => toggleInterest(interest)}
              className={cn(
                "px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200",
                data.interests.includes(interest)
                  ? "bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-orange hover:shadow-orange-lg hover:scale-105"
                  : "bg-white text-gray-700 border-2 border-gray-200 hover:border-orange-300 hover:bg-orange-50 hover:scale-105"
              )}
            >
              {interest}
            </button>
          ))}
        </div>

        {/* Intereses personalizados agregados */}
        {data.interests.filter((i) => !SUGGESTED_INTERESTS.includes(i)).length > 0 && (
          <div className="flex flex-wrap gap-2.5 pt-2 pb-2 px-4 bg-orange-50 rounded-xl border border-orange-200">
            <span className="text-xs font-semibold text-orange-700 w-full mb-1">
              Tus intereses personalizados:
            </span>
            {data.interests
              .filter((i) => !SUGGESTED_INTERESTS.includes(i))
              .map((interest) => (
                <span
                  key={interest}
                  className="px-4 py-2 rounded-lg text-sm font-semibold bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-sm flex items-center gap-2 group hover:shadow-orange transition-all"
                >
                  {interest}
                  <button
                    onClick={() => toggleInterest(interest)}
                    className="hover:bg-white/20 rounded-full p-0.5 transition-colors"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </span>
              ))}
          </div>
        )}

        {/* Agregar interés personalizado */}
        <div className="flex gap-2">
          <Input
            placeholder="Agregar otro interés..."
            value={customInterest}
            onChange={(e) => setCustomInterest(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addCustomInterest())}
            className="flex-1"
          />
          <Button 
            onClick={addCustomInterest} 
            variant="outline" 
            size="icon"
            className="border-orange-300 text-orange-600 hover:bg-orange-50"
          >
            <Plus className="w-4 h-4" />
          </Button>
        </div>

        {errors.interests && (
          <p className="text-sm text-red-600 flex items-center gap-1 bg-red-50 px-3 py-2 rounded-lg">
            <span className="font-semibold">⚠</span> {errors.interests}
          </p>
        )}
      </div>

      {/* Habilidades */}
      <div className="space-y-4">
        <Label className="text-base font-bold flex items-center gap-2 text-gray-900">
          <Briefcase className="w-5 h-5 text-orange-600" />
          Habilidades <span className="text-orange-600">*</span>
        </Label>
        <p className="text-sm text-gray-600">
          Selecciona al menos una habilidad que te destaque
        </p>
        <div className="flex flex-wrap gap-2.5">
          {SUGGESTED_SKILLS.map((skill) => (
            <button
              key={skill}
              type="button"
              onClick={() => toggleSkill(skill)}
              className={cn(
                "px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200",
                data.skills.includes(skill)
                  ? "bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-md hover:shadow-lg hover:scale-105"
                  : "bg-white text-gray-700 border-2 border-gray-200 hover:border-blue-300 hover:bg-blue-50 hover:scale-105"
              )}
            >
              {skill}
            </button>
          ))}
        </div>

        {/* Habilidades personalizadas agregadas */}
        {data.skills.filter((s) => !SUGGESTED_SKILLS.includes(s)).length > 0 && (
          <div className="flex flex-wrap gap-2.5 pt-2 pb-2 px-4 bg-blue-50 rounded-xl border border-blue-200">
            <span className="text-xs font-semibold text-blue-700 w-full mb-1">
              Tus habilidades personalizadas:
            </span>
            {data.skills
              .filter((s) => !SUGGESTED_SKILLS.includes(s))
              .map((skill) => (
                <span
                  key={skill}
                  className="px-4 py-2 rounded-lg text-sm font-semibold bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-sm flex items-center gap-2 group hover:shadow-md transition-all"
                >
                  {skill}
                  <button
                    onClick={() => toggleSkill(skill)}
                    className="hover:bg-white/20 rounded-full p-0.5 transition-colors"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </span>
              ))}
          </div>
        )}

        {/* Agregar habilidad personalizada */}
        <div className="flex gap-2">
          <Input
            placeholder="Agregar otra habilidad..."
            value={customSkill}
            onChange={(e) => setCustomSkill(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addCustomSkill())}
            className="flex-1"
          />
          <Button 
            onClick={addCustomSkill} 
            variant="outline" 
            size="icon"
            className="border-blue-300 text-blue-600 hover:bg-blue-50"
          >
            <Plus className="w-4 h-4" />
          </Button>
        </div>

        {errors.skills && (
          <p className="text-sm text-red-600 flex items-center gap-1 bg-red-50 px-3 py-2 rounded-lg">
            <span className="font-semibold">⚠</span> {errors.skills}
          </p>
        )}
      </div>

      {/* Idiomas */}
      <div className="space-y-4 pt-4 border-t border-gray-200">
        <Label className="text-base font-bold flex items-center gap-2 text-gray-900">
          <Languages className="w-5 h-5 text-orange-600" />
          Idiomas
        </Label>
        <p className="text-sm text-gray-600">
          Indica los idiomas que manejas y tu nivel
        </p>

        <div className="space-y-3">
          {data.languages.map((lang, index) => (
            <div key={index} className="flex gap-2 items-start p-4 bg-gray-50 rounded-xl border border-gray-200">
              <Input
                placeholder="Idioma"
                value={lang.language}
                onChange={(e) => updateLanguage(index, "language", e.target.value)}
                className="flex-1"
              />
              <select
                value={lang.level}
                onChange={(e) => updateLanguage(index, "level", e.target.value)}
                className="flex h-9 rounded-md border border-gray-300 bg-white px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:border-orange-500"
              >
                <option value="Básico">Básico</option>
                <option value="Intermedio">Intermedio</option>
                <option value="Avanzado">Avanzado</option>
                <option value="Nativo">Nativo</option>
              </select>
              {data.languages.length > 1 && (
                <Button
                  onClick={() => removeLanguage(index)}
                  variant="ghost"
                  size="icon"
                  className="text-red-600 hover:bg-red-50"
                >
                  <X className="w-4 h-4" />
                </Button>
              )}
            </div>
          ))}
        </div>

        <Button 
          onClick={addLanguage} 
          variant="outline" 
          className="w-full border-dashed border-2 border-gray-300 hover:border-orange-400 hover:bg-orange-50 text-gray-700"
        >
          <Plus className="w-4 h-4 mr-2" />
          Agregar idioma
        </Button>
      </div>
    </div>
  );
};

export default InterestsStep;