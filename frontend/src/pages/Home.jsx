import React, { useEffect } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import SearchBar from "@/components/SearchBar";
import JobCard from "@/components/JobCard";
import JobDetailModal from "@/components/JobDetailModal";
import ApplicationModal from "@/components/ApplicationModal";
import ReportModal from "@/components/ReportModal";
import { useJobsReducer } from "@/hooks/useJobsReducer";
import { Card, CardContent, Badge } from "@/components/ui";
import { useAuth } from "@/context/AuthContext";
import { mockJobs } from "@/data/mockJobs";
import { addApplication, hasUserApplied } from "@/data/mockApplications";
import { Sparkles, Briefcase, TrendingUp, Users } from "lucide-react";

export default function Home() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [state, dispatch] = useJobsReducer();

  useEffect(() => {
    dispatch({ type: "SET_JOBS", payload: mockJobs });
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    dispatch({
      type: "FILTER_JOBS",
      payload: {
        searchTerm: state.search,
        locationTerm: state.location,
      },
    });
  };

  const handleApply = (job, type) => {
    if (!user) {
      return toast.error("Debes iniciar sesión para aplicar");
    }
    if (user.user_type !== "candidate") {
      return toast.error("Solo candidatos pueden aplicar");
    }

    // Verificar si ya aplicó a este trabajo
    if (hasUserApplied(user.id, job.id)) {
      return toast.error("Ya has aplicado a esta oferta");
    }

    dispatch({ type: "SET_SELECTED_JOB", payload: job });
    dispatch({ type: "SET_APPLICATION_TYPE", payload: type });
    dispatch({ type: "SHOW_APPLICATION_MODAL" });
  };

  const handleReport = (job) => {
    if (!user) {
      return toast.error("Debes iniciar sesión para reportar");
    }
    dispatch({ type: "SHOW_REPORT_MODAL", payload: job });
  };

  const handleViewDetails = (job) => {
    dispatch({ type: "SHOW_JOB_DETAIL", payload: job });
  };

  // Función que se ejecuta cuando se envía exitosamente la aplicación
  const handleApplicationSubmit = (applicationData) => {
    try {
      // Crear la aplicación en el sistema
      const newApplication = addApplication({
        userId: user.id,
        jobId: state.selectedJob.id,
        applicationMethod: state.applicationType,
        data: applicationData,
      });

      // Cerrar el modal
      dispatch({ type: "HIDE_APPLICATION_MODAL" });

      // Mostrar mensaje de éxito con opción de ver aplicaciones
      toast.success(
        (t) => (
          <div>
            <p className="font-semibold mb-2">
              ¡Aplicación enviada exitosamente!
            </p>
            <button
              onClick={() => {
                toast.dismiss(t.id);
                navigate("/applications");
              }}
              className="text-orange-600 hover:text-orange-700 font-medium text-sm underline"
            >
              Ver mis aplicaciones →
            </button>
          </div>
        ),
        { duration: 5000 }
      );

      return newApplication;
    } catch (error) {
      console.error("Error al enviar aplicación:", error);
      toast.error("Error al enviar la aplicación. Intenta de nuevo.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section Mejorado */}
      <div className="hero-section relative bg-gradient-to-br from-orange-500 via-orange-600 to-red-600 text-white py-20 md:py-28 overflow-hidden">
        {/* Patrón decorativo de fondo */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl transform translate-x-1/3 -translate-y-1/3" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl transform -translate-x-1/3 translate-y-1/3" />
          <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-white rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2 opacity-5" />
        </div>

        {/* Contenido del Hero */}
        <div className="relative z-10 container-custom">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            {/* Badge superior */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm border border-white/30">
              <Sparkles className="w-4 h-4" />
              <span className="text-sm font-semibold">
                +1,000 empleos disponibles esta semana
              </span>
            </div>

            {/* Título principal */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight">
              Tu primer trabajo te está{" "}
              <span className="relative inline-block">
                esperando
                <svg
                  className="absolute -bottom-2 left-0 w-full"
                  height="12"
                  viewBox="0 0 200 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2 10C50 3 100 1 198 10"
                    stroke="white"
                    strokeWidth="3"
                    strokeLinecap="round"
                    opacity="0.5"
                  />
                </svg>
              </span>
            </h1>

            {/* Subtítulo */}
            <p className="text-xl md:text-2xl text-white/90 leading-relaxed max-w-2xl mx-auto">
              Conectamos talento joven con empresas que valoran tu potencial.
              <strong className="font-bold"> Sin experiencia requerida.</strong>
            </p>

            {/* Stats rápidos */}
            <div className="flex flex-wrap justify-center gap-6 md:gap-8 pt-4">
              {[
                { icon: Briefcase, label: "Empleos activos", value: "1,000+" },
                { icon: Users, label: "Candidatos registrados", value: "5,000+" },
                { icon: TrendingUp, label: "Tasa de éxito", value: "85%" },
              ].map((stat, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-3 px-4 py-2 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20"
                >
                  <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-white/20">
                    <stat.icon className="w-5 h-5" />
                  </div>
                  <div className="text-left">
                    <p className="text-2xl font-bold">{stat.value}</p>
                    <p className="text-xs text-white/80">{stat.label}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* SearchBar */}
            <div className="pt-6">
              <SearchBar
                search={state.search}
                location={state.location}
                setSearch={(v) => dispatch({ type: "SET_SEARCH", payload: v })}
                setLocation={(v) =>
                  dispatch({ type: "SET_LOCATION", payload: v })
                }
                onSearch={handleSearch}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Jobs Section */}
      <div className="container-custom py-16 md:py-20">
        {/* Header de la sección */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-10">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              Oportunidades destacadas
            </h2>
            <p className="text-gray-600">
              Encuentra el trabajo perfecto para iniciar tu carrera profesional
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Badge
              variant="outline"
              className="text-green-600 border-green-600 bg-green-50 px-4 py-2 text-sm font-semibold"
            >
              ✨ {state.jobs.length} empleos disponibles
            </Badge>
          </div>
        </div>

        {/* Loading State Mejorado */}
        {state.loading ? (
          <div className="jobs-grid">
            {[...Array(6)].map((_, i) => (
              <Card key={i} className="card-base animate-pulse">
                <CardContent className="p-7 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="h-6 w-24 bg-gray-200 rounded-full" />
                    <div className="h-4 w-16 bg-gray-200 rounded-full" />
                  </div>
                  <div className="h-6 w-3/4 bg-gray-200 rounded" />
                  <div className="space-y-2">
                    <div className="h-4 w-full bg-gray-200 rounded" />
                    <div className="h-4 w-full bg-gray-200 rounded" />
                  </div>
                  <div className="h-4 w-full bg-gray-200 rounded" />
                  <div className="h-4 w-2/3 bg-gray-200 rounded" />
                  <div className="flex items-center justify-between pt-4">
                    <div className="h-4 w-24 bg-gray-200 rounded" />
                    <div className="h-10 w-28 bg-gray-200 rounded-lg" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : state.jobs.length === 0 ? (
          /* Estado vacío mejorado */
          <div className="text-center py-16">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gray-100 mb-6">
              <Briefcase className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              No encontramos empleos
            </h3>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              Intenta ajustar tus filtros de búsqueda o explora otras
              ubicaciones para encontrar más oportunidades.
            </p>
            <button
              onClick={() => {
                dispatch({ type: "SET_SEARCH", payload: "" });
                dispatch({ type: "SET_LOCATION", payload: "" });
                dispatch({ type: "SET_JOBS", payload: mockJobs });
              }}
              className="btn-primary"
            >
              Ver todos los empleos
            </button>
          </div>
        ) : (
          /* Grid de Jobs */
          <div className="jobs-grid">
            {state.jobs.map((job) => (
              <JobCard
                key={job.id}
                job={job}
                onViewDetails={handleViewDetails}
              />
            ))}
          </div>
        )}

        {/* CTA Section */}
        {state.jobs.length > 0 && (
          <div className="mt-16 text-center">
            <div className="inline-block bg-gradient-to-r from-orange-50 to-red-50 rounded-2xl p-8 md:p-12 border border-orange-200/50">
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                ¿No encuentras lo que buscas?
              </h3>
              <p className="text-gray-600 mb-6 max-w-xl mx-auto">
                Regístrate para recibir alertas personalizadas cuando
                publiquemos empleos que coincidan con tus intereses.
              </p>
              <button className="btn-primary">Crear alerta de empleo</button>
            </div>
          </div>
        )}
      </div>

      {/* Modals */}
      <JobDetailModal
        isOpen={state.showJobDetail}
        onClose={() => dispatch({ type: "HIDE_JOB_DETAIL" })}
        job={state.selectedJob}
        onApply={handleApply}
        user={user}
      />

      <ApplicationModal
        isOpen={state.showApplication}
        onClose={() => dispatch({ type: "HIDE_APPLICATION_MODAL" })}
        job={state.selectedJob}
        applicationType={state.applicationType}
        user={user}
        onSubmit={handleApplicationSubmit}
      />

      <ReportModal
        isOpen={state.showReport}
        onClose={() => dispatch({ type: "HIDE_REPORT_MODAL" })}
        job={state.reportJob}
        user={user}
      />
    </div>
  );
}