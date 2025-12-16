import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  MapPin,
  Building2,
  Briefcase,
  Calendar,
  Bookmark,
  Share2,
  CheckCircle2,
  Sparkles,
  Users,
  TrendingUp,
} from "lucide-react";
import { useState } from "react";

export default function JobDetailModal({
  isOpen,
  onClose,
  job,
  onApply,
  user,
}) {
  const [isSaved, setIsSaved] = useState(false);

  if (!job) return null;

  const handleSave = () => {
    setIsSaved(!isSaved);
    console.log("Oferta guardada:", job.id);
  };

  const handleShare = () => {
    console.log("Compartir oferta:", job.id);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className="
          max-w-3xl
          max-h-[90vh]
          overflow-y-auto
          bg-white
          border-0
          rounded-3xl
          shadow-2xl
          p-0
          gap-0
        "
      >
        {/* Hero Header con gradiente */}
        <div className="relative bg-gradient-to-br from-orange-500 via-orange-600 to-red-600 px-8 pt-8 pb-24 overflow-hidden">
          {/* Patrón decorativo de fondo */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2" />
          </div>

          <DialogHeader className="relative z-10 space-y-4">
            {/* Badges superiores */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-orange-900 bg-white/90 backdrop-blur-sm px-3.5 py-1.5 rounded-full shadow-sm">
                <Sparkles className="w-3.5 h-3.5" />
                {job.job_type === "full-time" ? "Tiempo completo" : "Medio tiempo"}
              </span>
              
              <span className="inline-flex items-center gap-1.5 text-xs font-medium text-white bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-full border border-white/30">
                <Users className="w-3.5 h-3.5" />
                Sin experiencia requerida
              </span>
            </div>

            {/* Título principal */}
            <DialogTitle className="text-3xl md:text-4xl font-bold text-white leading-tight pr-8">
              {job.title}
            </DialogTitle>

            {/* Company & Location */}
            <div className="flex flex-wrap gap-x-6 gap-y-3 text-white/90">
              <div className="flex items-center gap-2.5">
                <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-white/20 backdrop-blur-sm border border-white/30">
                  <Building2 className="w-4.5 h-4.5" />
                </div>
                <span className="text-sm font-medium">{job.company_name}</span>
              </div>
              
              <div className="flex items-center gap-2.5">
                <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-white/20 backdrop-blur-sm border border-white/30">
                  <MapPin className="w-4.5 h-4.5" />
                </div>
                <span className="text-sm font-medium">{job.location}</span>
              </div>
            </div>
          </DialogHeader>
        </div>

        {/* Tarjeta de información flotante */}
        <div className="relative -mt-16 mx-6 md:mx-8">
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 space-y-6">
            {/* Stats/Details grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="flex items-start gap-3 p-4 rounded-xl bg-gradient-to-br from-orange-50 to-orange-100/50 border border-orange-200/50">
                <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-orange-500 shadow-sm">
                  <Briefcase className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-xs font-medium text-orange-600 mb-0.5">Nivel</p>
                  <p className="text-sm font-bold text-gray-900 capitalize">
                    {job.experience_level}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 rounded-xl bg-gradient-to-br from-blue-50 to-blue-100/50 border border-blue-200/50">
                <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-blue-500 shadow-sm">
                  <Calendar className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-xs font-medium text-blue-600 mb-0.5">Fecha límite</p>
                  <p className="text-sm font-bold text-gray-900">
                    {job.deadline}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 rounded-xl bg-gradient-to-br from-green-50 to-green-100/50 border border-green-200/50">
                <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-green-500 shadow-sm">
                  <TrendingUp className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-xs font-medium text-green-600 mb-0.5">Postulantes</p>
                  <p className="text-sm font-bold text-gray-900">
                    {job.applicants || "15+"} personas
                  </p>
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />

            {/* Description section */}
            <section className="space-y-3">
              <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                <div className="w-1 h-6 bg-gradient-to-b from-orange-500 to-red-500 rounded-full" />
                Descripción del puesto
              </h3>
              <p className="text-sm text-gray-700 leading-relaxed pl-3">
                {job.description}
              </p>
            </section>

            {/* Beneficios o info adicional (ejemplo) */}
            <section className="space-y-3">
              <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                <div className="w-1 h-6 bg-gradient-to-b from-orange-500 to-red-500 rounded-full" />
                Lo que ofrecemos
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pl-3">
                {[
                  "Capacitación inicial",
                  "Ambiente de trabajo inclusivo",
                  "Oportunidades de crecimiento",
                  "Horarios flexibles",
                ].map((benefit, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-sm text-gray-700">
                    <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" />
                    <span>{benefit}</span>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>

        {/* Footer con acciones */}
        <div className="sticky bottom-0 bg-gradient-to-t from-white via-white to-transparent pt-6 pb-6 px-6 md:px-8 mt-6">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            {/* Acción principal */}
            <button
              onClick={() => onApply(job, "full")}
              className="
                flex-1
                relative
                inline-flex
                items-center
                justify-center
                gap-2
                px-6
                py-3.5
                rounded-xl
                text-sm
                font-bold
                text-white
                bg-gradient-to-r
                from-orange-500
                to-red-500
                shadow-lg
                shadow-orange-500/30
                hover:shadow-xl
                hover:shadow-orange-500/40
                hover:scale-[1.02]
                active:scale-[0.98]
                transition-all
                duration-300
                overflow-hidden
                group
              "
            >
              <span className="relative z-10">Postularme ahora</span>
              <Sparkles className="w-4 h-4 relative z-10 group-hover:rotate-12 transition-transform duration-300" />
              
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
            </button>

            {/* Acción secundaria */}
            <button
              onClick={() => onApply(job, "quick")}
              className="
                flex-1
                px-6
                py-3.5
                rounded-xl
                text-sm
                font-semibold
                text-gray-700
                bg-gray-100
                hover:bg-gray-200
                active:scale-[0.98]
                transition-all
                duration-200
              "
            >
              Solicitud rápida
            </button>

            {/* Acciones terciarias */}
            <div className="flex gap-2">
              <button
                onClick={handleSave}
                className={`
                  px-4
                  py-3.5
                  rounded-xl
                  text-sm
                  font-medium
                  border
                  transition-all
                  duration-200
                  hover:scale-105
                  active:scale-95
                  ${isSaved 
                    ? 'border-orange-300 bg-orange-50 text-orange-600' 
                    : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
                  }
                `}
              >
                <Bookmark className={`w-5 h-5 ${isSaved ? 'fill-current' : ''}`} />
              </button>

              <button
                onClick={handleShare}
                className="
                  px-4
                  py-3.5
                  rounded-xl
                  text-sm
                  font-medium
                  border
                  border-gray-300
                  bg-white
                  text-gray-700
                  hover:bg-gray-50
                  hover:scale-105
                  active:scale-95
                  transition-all
                  duration-200
                "
              >
                <Share2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}