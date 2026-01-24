import React, { useState } from "react";
import { GraduationCap, Plus, Trash2, DollarSign, Calendar, Award, Sparkles } from "lucide-react";
import { Input, Label, Textarea } from "../../ui/input.jsx";
import { Button } from "../../ui/Button";

const CVUploadStep = ({ data, errors, onChange }) => {
  const [newEducation, setNewEducation] = useState({
    institution: "",
    degree: "",
    year: "",
    description: ""
  });

  const handleChange = (field, value) => {
    onChange(2, { [field]: value });
  };

  const addEducation = () => {
    if (!newEducation.institution || !newEducation.degree || !newEducation.year) {
      return;
    }

    const updatedEducation = [...data.education, { ...newEducation, id: Date.now() }];
    handleChange("education", updatedEducation);
    
    // Resetear formulario
    setNewEducation({
      institution: "",
      degree: "",
      year: "",
      description: ""
    });
  };

  const removeEducation = (id) => {
    const updatedEducation = data.education.filter(edu => edu.id !== id);
    handleChange("education", updatedEducation);
  };

  return (
    <div className="space-y-8 animate-slide-up">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-100 to-red-100 mb-4">
          <GraduationCap className="w-8 h-8 text-orange-600" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900">Educación y Disponibilidad</h2>
        <p className="text-gray-600 mt-2 max-w-lg mx-auto">
          Comparte tu formación académica y expectativas laborales
        </p>
      </div>

      {/* Educación agregada */}
      {data.education.length > 0 && (
        <div className="space-y-3">
          <Label className="text-sm font-semibold text-gray-900 flex items-center gap-2">
            <Award className="w-4 h-4 text-orange-600" />
            Tu educación ({data.education.length})
          </Label>
          {data.education.map((edu) => (
            <div
              key={edu.id}
              className="p-5 border-2 border-gray-200 rounded-xl bg-gradient-to-br from-white to-gray-50 hover:border-orange-300 transition-all group"
            >
              <div className="flex justify-between items-start gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center flex-shrink-0">
                      <GraduationCap className="w-4 h-4 text-white" />
                    </div>
                    <h4 className="font-bold text-gray-900 text-lg">{edu.degree}</h4>
                  </div>
                  <p className="text-sm text-gray-700 font-medium">{edu.institution}</p>
                  <p className="text-xs text-orange-600 mt-1 font-semibold">📅 {edu.year}</p>
                  {edu.description && (
                    <p className="text-sm text-gray-600 mt-2 bg-white px-3 py-2 rounded-lg border border-gray-200">
                      {edu.description}
                    </p>
                  )}
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeEducation(edu.id)}
                  className="text-red-600 hover:text-red-700 hover:bg-red-50 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Agregar educación */}
      <div className="space-y-4 p-6 border-2 border-dashed border-gray-300 rounded-xl bg-gray-50 hover:border-orange-400 hover:bg-orange-50/50 transition-all">
        <Label className="text-base font-bold text-gray-900 flex items-center gap-2">
          <Plus className="w-5 h-5 text-orange-600" />
          Agregar educación <span className="text-orange-600">*</span>
        </Label>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="institution" className="text-sm font-semibold text-gray-700">
              Institución educativa
            </Label>
            <Input
              id="institution"
              placeholder="Ej: Colegio San José"
              value={newEducation.institution}
              onChange={(e) =>
                setNewEducation({ ...newEducation, institution: e.target.value })
              }
              className="focus-visible:ring-orange-500"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="degree" className="text-sm font-semibold text-gray-700">
              Título o grado obtenido
            </Label>
            <Input
              id="degree"
              placeholder="Ej: Bachiller"
              value={newEducation.degree}
              onChange={(e) =>
                setNewEducation({ ...newEducation, degree: e.target.value })
              }
              className="focus-visible:ring-orange-500"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="year" className="text-sm font-semibold text-gray-700">
              Año de finalización
            </Label>
            <Input
              id="year"
              placeholder="Ej: 2023"
              value={newEducation.year}
              onChange={(e) =>
                setNewEducation({ ...newEducation, year: e.target.value })
              }
              className="focus-visible:ring-orange-500"
            />
          </div>

          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="edu-description" className="text-sm font-semibold text-gray-700">
              Descripción <span className="text-gray-500 text-xs font-normal">(opcional)</span>
            </Label>
            <Textarea
              id="edu-description"
              placeholder="Logros destacados, reconocimientos, proyectos especiales..."
              value={newEducation.description}
              onChange={(e) =>
                setNewEducation({ ...newEducation, description: e.target.value })
              }
              className="min-h-[80px] focus-visible:ring-orange-500"
            />
          </div>
        </div>

        <Button
          onClick={addEducation}
          className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold shadow-orange hover:shadow-orange-lg transition-all"
          disabled={!newEducation.institution || !newEducation.degree || !newEducation.year}
        >
          <Plus className="w-4 h-4 mr-2" />
          Agregar educación
        </Button>
      </div>

      {errors.education && (
        <p className="text-sm text-red-600 flex items-center gap-1 bg-red-50 px-3 py-2 rounded-lg">
          <span className="font-semibold">⚠</span> {errors.education}
        </p>
      )}

      {/* Disponibilidad y Salario */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
        {/* Disponibilidad */}
        <div className="space-y-2">
          <Label htmlFor="availability" className="text-sm font-semibold text-gray-900 flex items-center gap-2">
            <Calendar className="w-4 h-4 text-orange-600" />
            Disponibilidad para empezar
          </Label>
          <select
            id="availability"
            value={data.availability}
            onChange={(e) => handleChange("availability", e.target.value)}
            className="flex h-10 w-full rounded-lg border-2 border-gray-300 bg-white px-3 py-2 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:border-orange-500 hover:border-orange-300"
          >
            <option value="Inmediata">✅ Inmediata</option>
            <option value="1 semana">📅 En 1 semana</option>
            <option value="2 semanas">📅 En 2 semanas</option>
            <option value="1 mes">📅 En 1 mes</option>
            <option value="A convenir">💬 A convenir</option>
          </select>
        </div>

        {/* Salario esperado */}
        <div className="space-y-2">
          <Label htmlFor="expectedSalary" className="text-sm font-semibold text-gray-900 flex items-center gap-2">
            <DollarSign className="w-4 h-4 text-orange-600" />
            Expectativa salarial
          </Label>
          <select
            id="expectedSalary"
            value={data.expectedSalary}
            onChange={(e) => handleChange("expectedSalary", e.target.value)}
            className="flex h-10 w-full rounded-lg border-2 border-gray-300 bg-white px-3 py-2 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:border-orange-500 hover:border-orange-300"
          >
            <option value="SMLV">💰 SMLV (Salario mínimo)</option>
            <option value="1-1.5 SMLV">💰 1 - 1.5 SMLV</option>
            <option value="1.5-2 SMLV">💰 1.5 - 2 SMLV</option>
            <option value="2-3 SMLV">💰 2 - 3 SMLV</option>
            <option value="+3 SMLV">💰 Más de 3 SMLV</option>
            <option value="A convenir">💬 A convenir</option>
          </select>
        </div>
      </div>

      {/* Tip informativo */}
      <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl">
        <div className="flex items-start gap-3">
          <Sparkles className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm text-blue-900 font-semibold mb-1">
              ¿Sabías qué?
            </p>
            <p className="text-xs text-blue-800">
              Los candidatos que detallan su formación académica tienen un 40% más de respuestas de empresas. ¡Agrega toda tu educación!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CVUploadStep;