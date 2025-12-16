import { Card, CardContent } from "../components/ui";
import { MapPin, Building2, Clock, ArrowRight, Sparkles } from "lucide-react";

export default function JobCard({ job, onViewDetails }) {
  return (
    <Card
      onClick={() => onViewDetails(job)}
      className="
        group
        cursor-pointer
        bg-white
        border border-gray-200
        rounded-xl
        shadow-sm
        hover:shadow-xl
        hover:border-orange-300
        hover:-translate-y-1
        transition-all
        duration-500
        ease-out
        overflow-hidden
        relative
        h-full
      "
    >
      {/* Decorative gradient overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-50/0 via-transparent to-red-50/0 group-hover:from-orange-50/50 group-hover:to-red-50/30 transition-all duration-500 pointer-events-none" />
      
      {/* Subtle border glow effect */}
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-orange-400/20 to-red-400/20 blur-xl" />
      </div>

      <CardContent className="relative p-5 flex flex-col h-full">
        {/* Header con badge y título */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-3">
            <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-orange-600 bg-gradient-to-r from-orange-50 to-orange-100 px-2.5 py-1 rounded-full border border-orange-200/50 shadow-sm">
              <Sparkles className="w-2.5 h-2.5" />
              {job.job_type === "full-time" ? "Tiempo completo" : "Medio tiempo"}
            </span>
            
            {/* Indicador de "nuevo" si aplica */}
            {job.isNew && (
              <span className="text-[10px] font-medium text-green-600 bg-green-50 px-2 py-0.5 rounded-full border border-green-200/50">
                Nuevo
              </span>
            )}
          </div>
          
          <h3 className="text-base font-bold text-gray-900 leading-tight group-hover:text-orange-600 transition-colors duration-300 line-clamp-2">
            {job.title}
          </h3>
        </div>

        {/* Company & Location con mejor espaciado */}
        <div className="space-y-2 mb-3">
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center w-6 h-6 rounded-lg bg-gray-100 group-hover:bg-orange-100 transition-colors duration-300">
              <Building2 className="w-3 h-3 text-gray-600 group-hover:text-orange-600 transition-colors duration-300" />
            </div>
            <span className="text-xs font-medium text-gray-700 truncate">{job.company_name}</span>
          </div>
          
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center w-6 h-6 rounded-lg bg-gray-100 group-hover:bg-orange-100 transition-colors duration-300">
              <MapPin className="w-3 h-3 text-gray-600 group-hover:text-orange-600 transition-colors duration-300" />
            </div>
            <span className="text-xs font-medium text-gray-700 truncate">{job.location}</span>
          </div>
        </div>

        {/* Description con mejor tipografía */}
        <p className="text-xs text-gray-600 line-clamp-2 mb-4 leading-relaxed">
          {job.description}
        </p>

        {/* Divider sutil */}
        <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent mb-3" />

        {/* Footer mejorado */}
        <div className="mt-auto flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-[10px] font-medium text-gray-500">
            <Clock className="w-3 h-3" />
            <span>Abierta</span>
          </div>
          
          <button
            className="
              relative
              inline-flex
              items-center
              gap-1.5
              text-xs
              font-semibold
              px-3.5
              py-2
              rounded-lg
              text-white
              bg-gradient-to-r
              from-orange-500
              to-red-500
              shadow-md
              shadow-orange-500/30
              group-hover:shadow-lg
              group-hover:shadow-orange-500/40
              group-hover:scale-105
              transition-all
              duration-300
              overflow-hidden
            "
          >
            <span className="relative z-10">Ver más</span>
            <ArrowRight className="w-3 h-3 relative z-10 group-hover:translate-x-1 transition-transform duration-300" />
            
            {/* Efecto de brillo animado */}
            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          </button>
        </div>
      </CardContent>
    </Card>
  );
}