import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, Badge } from '../components/ui';
import { 
  Briefcase, 
  Calendar, 
  Clock, 
  MapPin, 
  Eye,
  X,
  Search,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  XCircle,
  Loader,
  ExternalLink,
  Video,
  FileText
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { getApplicationsByUserId, withdrawApplication, getApplicationStats } from '../data/mockApplications';
import { toast } from 'react-hot-toast';

const statusConfig = {
  pending: {
    label: "En revisión",
    color: "bg-yellow-100 text-yellow-800 border-yellow-300",
    icon: Clock,
    iconColor: "text-yellow-600"
  },
  interview: {
    label: "Entrevista programada",
    color: "bg-blue-100 text-blue-800 border-blue-300",
    icon: Video,
    iconColor: "text-blue-600"
  },
  rejected: {
    label: "No seleccionado",
    color: "bg-red-100 text-red-800 border-red-300",
    icon: XCircle,
    iconColor: "text-red-600"
  },
  accepted: {
    label: "Oferta recibida",
    color: "bg-green-100 text-green-800 border-green-300",
    icon: CheckCircle,
    iconColor: "text-green-600"
  }
};

export default function MyApplications() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [applications, setApplications] = useState([]);
  const [filteredApps, setFilteredApps] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (!user || user.user_type !== 'candidate') {
      setLoading(false);
      return;
    }

    // Simular carga de datos
    setTimeout(() => {
      const userApps = getApplicationsByUserId(user.id);
      const userStats = getApplicationStats(user.id);
      
      setApplications(userApps);
      setFilteredApps(userApps);
      setStats(userStats);
      setLoading(false);
    }, 800);
  }, [user]);

  useEffect(() => {
    let filtered = applications;

    // Filtrar por estado
    if (filter !== 'all') {
      filtered = filtered.filter(app => app.status === filter);
    }

    // Filtrar por búsqueda
    if (searchTerm) {
      filtered = filtered.filter(app => 
        app.job?.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.job?.company_name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredApps(filtered);
  }, [filter, searchTerm, applications]);

  const handleWithdrawApplication = (appId) => {
    if (window.confirm('¿Estás seguro de que deseas retirar esta aplicación?')) {
      const success = withdrawApplication(appId);
      
      if (success) {
        setApplications(prev => prev.filter(app => app.id !== appId));
        setStats(getApplicationStats(user.id));
        toast.success('Aplicación retirada exitosamente');
      } else {
        toast.error('Error al retirar la aplicación');
      }
    }
  };

  const handleViewJob = (jobId) => {
    // Navegar al home con scroll a trabajos (implementación simple)
    navigate('/');
    // Nota: Podrías mejorar esto abriendo el JobDetailModal directamente
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center">
        <div className="text-center">
          <Loader className="w-12 h-12 text-orange-500 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Cargando tus aplicaciones...</p>
        </div>
      </div>
    );
  }

  if (!user || user.user_type !== 'candidate') {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center">
        <Card className="max-w-md">
          <CardContent className="text-center py-12">
            <AlertCircle className="w-16 h-16 text-orange-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Acceso restringido
            </h2>
            <p className="text-gray-600">
              Esta sección está disponible solo para candidatos.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-8 md:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Mis Aplicaciones
          </h1>
          <p className="text-gray-600">
            Gestiona y dale seguimiento a todas tus postulaciones
          </p>
        </div>

        {/* Stats Cards */}
        {stats && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Total aplicaciones</p>
                    <p className="text-3xl font-bold text-gray-900">{stats.total}</p>
                  </div>
                  <div className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center">
                    <Briefcase className="w-6 h-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">En revisión</p>
                    <p className="text-3xl font-bold text-gray-900">{stats.pending}</p>
                  </div>
                  <div className="w-12 h-12 bg-yellow-500 rounded-xl flex items-center justify-center">
                    <Clock className="w-6 h-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Entrevistas</p>
                    <p className="text-3xl font-bold text-gray-900">{stats.interview}</p>
                  </div>
                  <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Ofertas</p>
                    <p className="text-3xl font-bold text-gray-900">{stats.accepted}</p>
                  </div>
                  <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center">
                    <CheckCircle className="w-6 h-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Filters and Search */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Buscar por puesto o empresa..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Status Filters */}
            <div className="flex gap-2 overflow-x-auto">
              <FilterButton 
                active={filter === 'all'} 
                onClick={() => setFilter('all')}
                count={stats?.total || 0}
              >
                Todas
              </FilterButton>
              <FilterButton 
                active={filter === 'pending'} 
                onClick={() => setFilter('pending')}
                count={stats?.pending || 0}
              >
                En revisión
              </FilterButton>
              <FilterButton 
                active={filter === 'interview'} 
                onClick={() => setFilter('interview')}
                count={stats?.interview || 0}
              >
                Entrevistas
              </FilterButton>
              <FilterButton 
                active={filter === 'rejected'} 
                onClick={() => setFilter('rejected')}
                count={stats?.rejected || 0}
              >
                No seleccionado
              </FilterButton>
              <FilterButton 
                active={filter === 'accepted'} 
                onClick={() => setFilter('accepted')}
                count={stats?.accepted || 0}
              >
                Ofertas
              </FilterButton>
            </div>
          </div>
        </div>

        {/* Applications List */}
        {filteredApps.length === 0 ? (
          <Card className="text-center py-16">
            <CardContent>
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gray-100 mb-6">
                <Briefcase className="w-10 h-10 text-gray-400" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                No hay aplicaciones
              </h3>
              <p className="text-gray-600 mb-6 max-w-md mx-auto">
                {searchTerm || filter !== 'all' 
                  ? "No se encontraron aplicaciones con los filtros seleccionados."
                  : "Aún no has aplicado a ningún empleo. ¡Comienza tu búsqueda ahora!"}
              </p>
              <button 
                onClick={() => {
                  if (searchTerm || filter !== 'all') {
                    setSearchTerm('');
                    setFilter('all');
                  } else {
                    navigate('/');
                  }
                }}
                className="px-6 py-3 bg-orange-500 text-white rounded-lg font-semibold hover:bg-orange-600 transition-colors"
              >
                {searchTerm || filter !== 'all' ? 'Limpiar filtros' : 'Buscar empleos'}
              </button>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {filteredApps.map(app => (
              <ApplicationCard 
                key={app.id} 
                application={app}
                onWithdraw={handleWithdrawApplication}
                onViewJob={handleViewJob}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// Filter Button Component
function FilterButton({ active, onClick, count, children }) {
  return (
    <button
      onClick={onClick}
      className={`
        px-4 py-2 rounded-lg font-medium text-sm whitespace-nowrap transition-all
        ${active 
          ? 'bg-orange-500 text-white shadow-md' 
          : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
        }
      `}
    >
      {children} ({count})
    </button>
  );
}

// Application Card Component
function ApplicationCard({ application, onWithdraw, onViewJob }) {
  const status = statusConfig[application.status];
  const StatusIcon = status.icon;
  const job = application.job;

  if (!job) {
    return null;
  }

  return (
    <Card className="hover:shadow-lg transition-shadow duration-300 border-l-4 border-l-orange-500">
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Company Logo/Initial */}
          <div className="flex-shrink-0">
            <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center text-white font-bold text-2xl border-2 border-gray-200">
              {job.company_name.charAt(0)}
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 min-w-0">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3 mb-3">
              <div className="flex-1">
                <h3 
                  className="text-xl font-bold text-gray-900 mb-1 hover:text-orange-600 cursor-pointer"
                  onClick={() => onViewJob(job.id)}
                >
                  {job.title}
                </h3>
                <p className="text-gray-600 font-medium mb-2">{job.company_name}</p>
                
                <div className="flex flex-wrap gap-3 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {job.location}
                  </div>
                  <div className="flex items-center gap-1">
                    <Briefcase className="w-4 h-4" />
                    {job.job_type === 'full-time' ? 'Tiempo completo' : 'Medio tiempo'}
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    Aplicado hace {application.daysAgo} {application.daysAgo === 1 ? 'día' : 'días'}
                  </div>
                </div>
              </div>

              {/* Status Badge */}
              <div className="flex flex-col gap-2 items-start md:items-end">
                <Badge className={`${status.color} border px-3 py-1 flex items-center gap-1.5`}>
                  <StatusIcon className={`w-4 h-4 ${status.iconColor}`} />
                  {status.label}
                </Badge>
                
                {application.viewedByCompany && (
                  <div className="flex items-center gap-1 text-xs text-gray-500">
                    <Eye className="w-3 h-3" />
                    Vista por empresa
                  </div>
                )}
              </div>
            </div>

            {/* Additional Info based on status */}
            <div className="mb-4 space-y-2">
              <div className="flex items-center gap-4 text-sm flex-wrap">
                <Badge variant="outline" className="bg-gray-50">
                  Aplicación {application.applicationMethod === 'quick' ? 'rápida' : 'detallada'}
                </Badge>
                
                {application.status === 'pending' && (
                  <div className="flex items-center gap-1 text-gray-600">
                    <AlertCircle className="w-4 h-4" />
                    Esperando respuesta
                  </div>
                )}
              </div>

              {/* Interview Details */}
              {application.status === 'interview' && application.interviewDetails && (
                <div className="mt-3 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="flex items-start gap-3">
                    <Video className="w-5 h-5 text-blue-600 mt-0.5" />
                    <div className="flex-1">
                      <p className="font-semibold text-blue-900 mb-1">
                        Entrevista {application.interviewDetails.type === 'virtual' ? 'Virtual' : 'Presencial'}
                      </p>
                      <p className="text-sm text-blue-800 mb-2">
                        {new Date(application.interviewDetails.date).toLocaleDateString('es-ES', { 
                          weekday: 'long', 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </p>
                      {application.interviewDetails.meetingLink && (
                        <a 
                          href={application.interviewDetails.meetingLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-blue-600 hover:text-blue-800 font-medium inline-flex items-center gap-1"
                        >
                          Unirse a la reunión <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Offer Details */}
              {application.status === 'accepted' && application.offerDetails && (
                <div className="mt-3 p-4 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                    <div className="flex-1">
                      <p className="font-semibold text-green-900 mb-2">
                        ¡Felicitaciones! Recibiste una oferta laboral
                      </p>
                      <div className="space-y-1 text-sm text-green-800">
                        <p><strong>Salario:</strong> {application.offerDetails.salary}</p>
                        <p><strong>Fecha de inicio:</strong> {new Date(application.offerDetails.startDate).toLocaleDateString('es-ES')}</p>
                        <p><strong>Tipo de contrato:</strong> {application.offerDetails.contractType}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Rejection Details */}
              {application.status === 'rejected' && application.rejectionReason && (
                <div className="mt-3 p-4 bg-gray-50 border border-gray-200 rounded-lg">
                  <p className="text-sm text-gray-700">
                    <strong className="text-gray-900">Retroalimentación:</strong> {application.rejectionReason}
                  </p>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="flex flex-wrap gap-3">
              <button 
                onClick={() => onViewJob(job.id)}
                className="px-4 py-2 bg-orange-500 text-white rounded-lg font-medium hover:bg-orange-600 transition-colors flex items-center gap-2"
              >
                <Eye className="w-4 h-4" />
                Ver oferta
              </button>
              
              {application.applicationData.resumeUrl && (
                <button className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  Ver mi aplicación
                </button>
              )}
              
              {(application.status === 'pending' || application.status === 'interview') && (
                <button 
                  onClick={() => onWithdraw(application.id)}
                  className="px-4 py-2 bg-white border border-red-300 text-red-600 rounded-lg font-medium hover:bg-red-50 transition-colors flex items-center gap-2"
                >
                  <X className="w-4 h-4" />
                  Retirar aplicación
                </button>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}