import React from "react";
import { Linkedin, Instagram, Twitter, Globe, Sparkles, CheckCircle } from "lucide-react";
import { Input, Label } from "../../ui/input.jsx";

const SocialMediaStep = ({ data, onChange }) => {
  const handleChange = (field, value) => {
    onChange(4, { [field]: value });
  };

  const completedFields = [
    data.linkedin,
    data.instagram,
    data.twitter,
    data.portfolio
  ].filter(Boolean).length;

  return (
    <div className="space-y-8 animate-slide-up">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-100 to-red-100 mb-4">
          <Globe className="w-8 h-8 text-orange-600" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900">Redes Sociales</h2>
        <p className="text-gray-600 mt-2 max-w-lg mx-auto">
          Conecta tus perfiles profesionales para destacar ante las empresas
        </p>
        
        {/* Contador de progreso */}
        <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200">
          <CheckCircle className="w-4 h-4 text-blue-600" />
          <span className="text-sm font-semibold text-blue-900">
            {completedFields} de 4 redes agregadas
          </span>
        </div>
      </div>

      {/* Info card */}
      <div className="bg-gradient-to-r from-orange-50 to-red-50 border border-orange-200 rounded-xl p-5">
        <div className="flex items-start gap-3">
          <Sparkles className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm text-orange-900 font-bold mb-1">
              💡 Aumenta tus oportunidades
            </p>
            <p className="text-xs text-orange-800">
              Los candidatos con redes sociales completas tienen <strong>2.5 veces más posibilidades</strong> de ser contactados por reclutadores.
            </p>
          </div>
        </div>
      </div>

      {/* LinkedIn */}
      <div className="space-y-2">
        <Label htmlFor="linkedin" className="text-sm font-semibold text-gray-900 flex items-center gap-2">
          <Linkedin className="w-5 h-5 text-[#0077B5]" />
          LinkedIn
          <span className="ml-auto text-xs font-normal text-gray-500">Opcional</span>
        </Label>
        <Input
          id="linkedin"
          type="text"
          placeholder="https://linkedin.com/in/tu-perfil"
          value={data.linkedin}
          onChange={(e) => handleChange("linkedin", e.target.value)}
          className="focus-visible:ring-[#0077B5] focus-visible:border-[#0077B5]"
        />
        <p className="text-xs text-gray-500 flex items-center gap-1">
          <span>💼</span> Red profesional más usada por reclutadores
        </p>
      </div>

      {/* Instagram */}
      <div className="space-y-2">
        <Label htmlFor="instagram" className="text-sm font-semibold text-gray-900 flex items-center gap-2">
          <Instagram className="w-5 h-5 text-[#E4405F]" />
          Instagram
          <span className="ml-auto text-xs font-normal text-gray-500">Opcional</span>
        </Label>
        <div className="relative">
          <span className="absolute left-3 top-2.5 text-gray-400 font-medium">@</span>
          <Input
            id="instagram"
            type="text"
            placeholder="tu_usuario"
            value={data.instagram.replace("@", "")}
            onChange={(e) => handleChange("instagram", `@${e.target.value.replace("@", "")}`)}
            className="pl-8 focus-visible:ring-[#E4405F] focus-visible:border-[#E4405F]"
          />
        </div>
        <p className="text-xs text-gray-500 flex items-center gap-1">
          <span>📸</span> Muestra tu personalidad y estilo de vida
        </p>
      </div>

      {/* Twitter */}
      <div className="space-y-2">
        <Label htmlFor="twitter" className="text-sm font-semibold text-gray-900 flex items-center gap-2">
          <Twitter className="w-5 h-5 text-[#1DA1F2]" />
          Twitter / X
          <span className="ml-auto text-xs font-normal text-gray-500">Opcional</span>
        </Label>
        <div className="relative">
          <span className="absolute left-3 top-2.5 text-gray-400 font-medium">@</span>
          <Input
            id="twitter"
            type="text"
            placeholder="tu_usuario"
            value={data.twitter.replace("@", "")}
            onChange={(e) => handleChange("twitter", `@${e.target.value.replace("@", "")}`)}
            className="pl-8 focus-visible:ring-[#1DA1F2] focus-visible:border-[#1DA1F2]"
          />
        </div>
        <p className="text-xs text-gray-500 flex items-center gap-1">
          <span>🐦</span> Red profesional para compartir ideas
        </p>
      </div>

      {/* Portfolio/Website */}
      <div className="space-y-2">
        <Label htmlFor="portfolio" className="text-sm font-semibold text-gray-900 flex items-center gap-2">
          <Globe className="w-5 h-5 text-orange-600" />
          Portafolio o sitio web
          <span className="ml-auto text-xs font-normal text-gray-500">Opcional</span>
        </Label>
        <Input
          id="portfolio"
          type="url"
          placeholder="https://tu-portafolio.com"
          value={data.portfolio}
          onChange={(e) => handleChange("portfolio", e.target.value)}
          className="focus-visible:ring-orange-500"
        />
        <p className="text-xs text-gray-500 flex items-center gap-1">
          <span>🌐</span> Sitio personal, blog o portafolio de proyectos
        </p>
      </div>

      {/* Beneficios */}
      <div className="mt-8 space-y-4 p-5 bg-gradient-to-br from-gray-50 to-white border-2 border-gray-200 rounded-xl">
        <h3 className="font-bold text-gray-900 flex items-center gap-2 text-base">
          <CheckCircle className="w-5 h-5 text-green-600" />
          Beneficios de agregar tus redes
        </h3>
        <ul className="space-y-3">
          <li className="flex items-start gap-3 text-sm text-gray-700">
            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-green-100 flex items-center justify-center text-green-600 font-bold text-xs">
              ✓
            </span>
            <span>
              Las empresas pueden conocer mejor tu <strong className="text-gray-900">personalidad y profesionalismo</strong>
            </span>
          </li>
          <li className="flex items-start gap-3 text-sm text-gray-700">
            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-xs">
              ✓
            </span>
            <span>
              Demuestra tu <strong className="text-gray-900">presencia digital y adaptación tecnológica</strong>
            </span>
          </li>
          <li className="flex items-start gap-3 text-sm text-gray-700">
            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 font-bold text-xs">
              ✓
            </span>
            <span>
              Facilita que <strong className="text-gray-900">reclutadores te contacten por múltiples canales</strong>
            </span>
          </li>
        </ul>
      </div>

      {/* Nota final */}
      <div className="text-center pt-4 pb-2">
        <p className="text-sm text-gray-500 flex items-center justify-center gap-2">
          <span>🔒</span>
          Este paso es <strong className="text-gray-700">completamente opcional</strong>. 
          Puedes saltarlo y agregarlo después.
        </p>
      </div>
    </div>
  );
};

export default SocialMediaStep;