import React from "react";
import { User, Phone, MapPin, FileText, Sparkles } from "lucide-react";
import { Input, Label, Textarea } from "../../ui/input.jsx";

const PersonalInfoStep = ({ data, errors, onChange }) => {
  const handleChange = (field, value) => {
    onChange(1, { [field]: value });
  };

  return (
    <div className="space-y-6 animate-slide-up">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-100 to-red-100 mb-4">
          <User className="w-8 h-8 text-orange-600" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900">Información Personal</h2>
        <p className="text-gray-600 mt-2 max-w-lg mx-auto">
          Cuéntanos un poco sobre ti para crear tu perfil profesional
        </p>
      </div>

      {/* Badge informativo */}
      <div className="bg-gradient-to-r from-orange-50 to-red-50 border border-orange-200 rounded-xl p-4 mb-6">
        <div className="flex items-start gap-3">
          <Sparkles className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm text-orange-900 font-semibold mb-1">
              ¡Completa tu perfil al 100%!
            </p>
            <p className="text-xs text-orange-800">
              Los perfiles completos tienen 3 veces más posibilidades de ser contactados por empresas
            </p>
          </div>
        </div>
      </div>

      {/* Nombre completo */}
      <div className="space-y-2">
        <Label htmlFor="name" className="text-sm font-semibold text-gray-900">
          Nombre completo <span className="text-orange-600">*</span>
        </Label>
        <div className="relative">
          <User className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          <Input
            id="name"
            type="text"
            placeholder="Ej: Juan Pérez González"
            value={data.name}
            onChange={(e) => handleChange("name", e.target.value)}
            className={`pl-10 ${errors.name ? 'border-red-500 focus-visible:ring-red-500' : 'focus-visible:ring-orange-500'}`}
          />
        </div>
        {errors.name && (
          <p className="text-sm text-red-600 flex items-center gap-1 bg-red-50 px-3 py-2 rounded-lg">
            <span className="font-semibold">⚠</span> {errors.name}
          </p>
        )}
      </div>

      {/* Teléfono */}
      <div className="space-y-2">
        <Label htmlFor="phone" className="text-sm font-semibold text-gray-900">
          Teléfono <span className="text-orange-600">*</span>
        </Label>
        <div className="relative">
          <Phone className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          <Input
            id="phone"
            type="tel"
            placeholder="Ej: +57 300 123 4567"
            value={data.phone}
            onChange={(e) => handleChange("phone", e.target.value)}
            className={`pl-10 ${errors.phone ? 'border-red-500 focus-visible:ring-red-500' : 'focus-visible:ring-orange-500'}`}
          />
        </div>
        {errors.phone && (
          <p className="text-sm text-red-600 flex items-center gap-1 bg-red-50 px-3 py-2 rounded-lg">
            <span className="font-semibold">⚠</span> {errors.phone}
          </p>
        )}
        <p className="text-xs text-gray-500 flex items-center gap-1">
          <span>💡</span> Las empresas te contactarán por este número
        </p>
      </div>

      {/* Ubicación */}
      <div className="space-y-2">
        <Label htmlFor="location" className="text-sm font-semibold text-gray-900">
          Ubicación <span className="text-orange-600">*</span>
        </Label>
        <div className="relative">
          <MapPin className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          <Input
            id="location"
            type="text"
            placeholder="Ej: Bogotá, Colombia"
            value={data.location}
            onChange={(e) => handleChange("location", e.target.value)}
            className={`pl-10 ${errors.location ? 'border-red-500 focus-visible:ring-red-500' : 'focus-visible:ring-orange-500'}`}
          />
        </div>
        {errors.location && (
          <p className="text-sm text-red-600 flex items-center gap-1 bg-red-50 px-3 py-2 rounded-lg">
            <span className="font-semibold">⚠</span> {errors.location}
          </p>
        )}
      </div>

      {/* Bio (opcional) */}
      <div className="space-y-2">
        <Label htmlFor="bio" className="text-sm font-semibold text-gray-900">
          Sobre ti <span className="text-gray-500 text-xs font-normal">(opcional)</span>
        </Label>
        <div className="relative">
          <FileText className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
          <Textarea
            id="bio"
            placeholder="Cuéntanos un poco sobre ti, tus metas profesionales y qué te motiva a buscar empleo..."
            value={data.bio}
            onChange={(e) => handleChange("bio", e.target.value.slice(0, 500))}
            className="pl-10 min-h-[120px] focus-visible:ring-orange-500"
          />
        </div>
        <div className="flex items-center justify-between text-xs">
          <p className="text-gray-500">
            💡 Un buen resumen personal aumenta tus posibilidades
          </p>
          <p className={`font-medium ${data.bio.length > 450 ? 'text-orange-600' : 'text-gray-500'}`}>
            {data.bio.length}/500
          </p>
        </div>
      </div>

      {/* Tip final */}
      <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-xl">
        <p className="text-sm text-blue-900">
          <strong className="font-bold">✨ Tip:</strong> Mantén tu información actualizada para recibir las mejores oportunidades laborales.
        </p>
      </div>
    </div>
  );
};

export default PersonalInfoStep;