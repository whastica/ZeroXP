import React, { useEffect, useState } from 'react';
import { Card, CardHeader, CardContent, CardTitle, Badge, Button } from '../components/ui';
import { toast } from 'react-hot-toast';
import JobCard from '../components/JobCard';
import JobDetailModal from '../components/JobDetailModal';
import { useJobsReducer } from '../hooks/useJobsReducer';
import { useAuth } from '../context/AuthContext';

export default function CompanyDashboard() {
  const { user } = useAuth();
  const [state, dispatch] = useJobsReducer();
  const [companyJobs, setCompanyJobs] = useState([]);

  /**
   * -------------------------------
   * MOCK: Datos de trabajos
   * -------------------------------
   */
  const MOCK_JOBS = [
    {
      id: 1,
      title: 'Desarrollador Frontend React',
      location: 'Madrid',
      description: 'Buscamos frontend con experiencia en React, Hooks y Tailwind.',
      job_type: 'full-time',
      experience_level: 'junior',
      applications_count: 12,
    },
    {
      id: 2,
      title: 'Asistente de Soporte Técnico',
      location: 'Barcelona',
      description: 'Soporte básico al cliente por chat y correo.',
      job_type: 'full-time',
      experience_level: 'entry',
      applications_count: 5,
    },
    {
      id: 3,
      title: 'Community Manager',
      location: 'Valencia',
      description: 'Gestión de redes sociales y creación de contenido.',
      job_type: 'part-time',
      experience_level: 'entry',
      applications_count: 8,
    },
    {
      id: 4,
      title: 'Data Analyst Jr.',
      location: 'Sevilla',
      description: 'Análisis de datos, PowerBI, Excel avanzado.',
      job_type: 'full-time',
      experience_level: 'junior',
      applications_count: 4,
    },
  ];

  /**
   * -------------------------------
   * useEffect CORREGIDO
   * -------------------------------
   * Espera a que user exista antes de validar
   * Carga trabajos mockeados si el usuario es empresa
   */
  useEffect(() => {
    if (user === null) return; // Esperar a que cargue el contexto

    if (!user) {
      toast.error('Debes iniciar sesión.');
      return;
    }

    if (user.user_type !== 'company') {
      toast.error('Solo las empresas pueden acceder a este panel.');
      return;
    }

    // Cargar mock data
    setCompanyJobs(MOCK_JOBS);
  }, [user]);

  /**
   * -------------------------------
   * Acciones
   * -------------------------------
   */

  const handleViewDetails = (job) => {
    dispatch({ type: 'SHOW_JOB_DETAIL', payload: job });
  };

  const handleCreateJob = () => {
    toast.success('Función de crear trabajo aún no implementada (mock).');
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-[#0f0f0f] p-6 pt-28">
      <div className="max-w-7xl mx-auto">
        {/* HEADER */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100">
            Panel de Empresa
          </h1>

          <Button
            onClick={handleCreateJob}
            className="bg-orange-600 hover:bg-orange-700 text-white"
          >
            Crear Nuevo Trabajo
          </Button>
        </div>

        {/* LISTADO DE TRABAJOS */}
        {companyJobs.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400 text-center mt-12">
            No hay trabajos publicados todavía.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {companyJobs.map((job) => (
              <JobCard
                key={job.id}
                job={job}
                user={user}
                onViewDetails={() => handleViewDetails(job)}
                onApply={() => toast('Aplicar mock')}
                onReport={() => toast('Reporte mock')}
              />
            ))}
          </div>
        )}

        {/* MODAL DE DETALLES */}
        <JobDetailModal
          isOpen={state.showJobDetail}
          onClose={() => dispatch({ type: 'HIDE_JOB_DETAIL' })}
          job={state.selectedJob}
          user={user}
          onApply={() => toast.success('Aplicación enviada (mock).')}
        />
      </div>
    </div>
  );
}
