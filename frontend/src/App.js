import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import axios from 'axios';
import './App.css';

// Import shadcn components
import { Button } from './components/ui/button';
import { Input } from './components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from './components/ui/card';
import { Badge } from './components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './components/ui/select';
import { Textarea } from './components/ui/textarea';
import { toast, Toaster } from 'sonner';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

// Context for user authentication
const AuthContext = React.createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for stored user data
    const storedUser = localStorage.getItem('zeroxp_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('zeroxp_user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('zeroxp_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

// Login/Register Component
const AuthModal = ({ isOpen, onClose }) => {
  const { login } = React.useContext(AuthContext);
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    user_type: 'candidate',
    location: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const endpoint = isLogin ? '/auth/login' : '/auth/register';
      const response = await axios.post(`${API}${endpoint}`, formData);
      
      if (isLogin) {
        login(response.data.user);
        toast.success('¡Bienvenido a ZeroXP!');
        onClose();
      } else {
        toast.success('¡Cuenta creada exitosamente! Ahora inicia sesión.');
        setIsLogin(true);
      }
    } catch (error) {
      toast.error(error.response?.data?.detail || 'Error en la autenticación');
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {isLogin ? 'Iniciar Sesión' : 'Crear Cuenta'}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            required
          />
          <Input
            type="password"
            placeholder="Contraseña"
            value={formData.password}
            onChange={(e) => setFormData({...formData, password: e.target.value})}
            required
          />
          {!isLogin && (
            <>
              <Input
                type="text"
                placeholder="Nombre completo"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
              />
              <Input
                type="text"
                placeholder="Ubicación"
                value={formData.location}
                onChange={(e) => setFormData({...formData, location: e.target.value})}
              />
              <Select 
                value={formData.user_type} 
                onValueChange={(value) => setFormData({...formData, user_type: value})}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="candidate">Candidato</SelectItem>
                  <SelectItem value="company">Empresa</SelectItem>
                </SelectContent>
              </Select>
            </>
          )}
          <Button type="submit" className="w-full">
            {isLogin ? 'Iniciar Sesión' : 'Crear Cuenta'}
          </Button>
          <Button 
            type="button" 
            variant="ghost" 
            className="w-full"
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? '¿No tienes cuenta? Regístrate' : '¿Ya tienes cuenta? Inicia sesión'}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

// Navigation Component
const Navigation = ({ user, onLogout }) => {
  const [showAuth, setShowAuth] = useState(false);

  return (
    <>
      <nav className="bg-white border-b border-gray-200 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-orange-600">ZeroXP</h1>
              <Badge variant="secondary" className="hidden sm:inline-flex">
                Sin experiencia requerida
              </Badge>
            </div>
            <div className="flex items-center space-x-4">
              {user ? (
                <>
                  <span className="text-sm text-gray-700">
                    Hola, {user.name || user.email}
                  </span>
                  <Button variant="outline" onClick={onLogout}>
                    Cerrar Sesión
                  </Button>
                </>
              ) : (
                <Button onClick={() => setShowAuth(true)}>
                  Iniciar Sesión
                </Button>
              )}
            </div>
          </div>
        </div>
      </nav>
      <AuthModal 
        isOpen={showAuth} 
        onClose={() => setShowAuth(false)}
      />
    </>
  );
};

// Job Card Component
const JobCard = ({ job, onApply, onReport, user }) => {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{job.title}</h3>
            <p className="text-sm text-gray-600">{job.company_name}</p>
            <p className="text-sm text-gray-500">{job.location}</p>
          </div>
          <div className="flex gap-2 items-start">
            <Badge variant="outline" className="text-green-600 border-green-600">
              Sin Experiencia
            </Badge>
            {user && (
              <Button 
                size="sm" 
                variant="ghost"
                className="text-red-500 hover:text-red-700 p-1 h-6 w-6"
                onClick={() => onReport(job)}
                title="Reportar trabajo"
              >
                🚩
              </Button>
            )}
          </div>
        </div>
        
        <p className="text-gray-700 text-sm mb-4 line-clamp-3">
          {job.description}
        </p>
        
        {job.salary_range && (
          <p className="text-sm font-medium text-gray-900 mb-4">
            💰 {job.salary_range}
          </p>
        )}
        
        <div className="flex gap-2">
          <Button 
            size="sm" 
            className="flex-1"
            onClick={() => onApply(job, 'quick')}
            disabled={!user || user.user_type !== 'candidate'}
          >
            Aplicar Rápido
          </Button>
          <Button 
            size="sm" 
            variant="outline" 
            onClick={() => onApply(job, 'standard')}
            disabled={!user || user.user_type !== 'candidate'}
          >
            Aplicar Estándar
          </Button>
          <Button 
            size="sm" 
            variant="outline" 
            className="text-orange-600 border-orange-600 hover:bg-orange-50"
            onClick={() => onApply(job, 'premium')}
            disabled={!user || user.user_type !== 'candidate'}
          >
            Premium
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

// Report Job Modal
const ReportModal = ({ isOpen, onClose, job, user }) => {
  const [reason, setReason] = useState('');
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const reasons = [
    'Requiere experiencia excesiva más allá del nivel junior',
    'Identificado como estafa o phishing',
    'Conduce a un curso pagado, bootcamp o oferta no relacionada',
    'Información falsa o engañosa',
    'Otro'
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user || !reason) return;

    setIsSubmitting(true);
    try {
      const formData = new FormData();
      formData.append('user_id', user.id);
      formData.append('reason', reason);
      formData.append('description', description);

      await axios.post(`${API}/jobs/${job.id}/report`, formData);
      toast.success('Reporte enviado exitosamente. Gracias por ayudar a mantener la plataforma segura.');
      onClose();
    } catch (error) {
      toast.error(error.response?.data?.detail || 'Error al enviar el reporte');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Reportar Trabajo Sospechoso</DialogTitle>
        </DialogHeader>
        
        <div className="mb-4">
          <h4 className="font-medium">{job?.title}</h4>
          <p className="text-sm text-gray-600">{job?.company_name}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm font-medium mb-2 block">
              Razón del reporte:
            </label>
            <Select value={reason} onValueChange={setReason}>
              <SelectTrigger>
                <SelectValue placeholder="Selecciona una razón" />
              </SelectTrigger>
              <SelectContent>
                {reasons.map((r) => (
                  <SelectItem key={r} value={r}>{r}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">
              Descripción adicional (opcional):
            </label>
            <Textarea
              placeholder="Proporciona más detalles sobre el problema..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="flex gap-2">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1">
              Cancelar
            </Button>
            <Button 
              type="submit" 
              disabled={isSubmitting || !reason}
              className="flex-1 bg-red-600 hover:bg-red-700"
            >
              {isSubmitting ? 'Enviando...' : 'Enviar Reporte'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

// Application Modal
const ApplicationModal = ({ isOpen, onClose, job, applicationType, user }) => {
  const [message, setMessage] = useState('');
  const [customData, setCustomData] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) return;

    setIsSubmitting(true);
    try {
      const formData = new FormData();
      formData.append('user_id', user.id);
      
      const applicationData = {
        job_id: job.id,
        application_type: applicationType,
        message: message || null,
        custom_data: customData
      };
      
      // Append application data as JSON
      Object.keys(applicationData).forEach(key => {
        if (applicationData[key] !== null && applicationData[key] !== undefined) {
          formData.append(key, typeof applicationData[key] === 'object' ? 
            JSON.stringify(applicationData[key]) : applicationData[key]);
        }
      });

      await axios.post(`${API}/jobs/${job.id}/apply`, formData);
      toast.success('¡Aplicación enviada exitosamente!');
      onClose();
    } catch (error) {
      toast.error(error.response?.data?.detail || 'Error al enviar la aplicación');
    } finally {
      setIsSubmitting(false);
    }
  };

  const getModalTitle = () => {
    switch (applicationType) {
      case 'quick': return 'Aplicación Rápida';
      case 'standard': return 'Aplicación Estándar';
      case 'premium': return 'Aplicación Premium';
      default: return 'Aplicar al Trabajo';
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{getModalTitle()}</DialogTitle>
        </DialogHeader>
        
        <div className="mb-4">
          <h4 className="font-medium">{job?.title}</h4>
          <p className="text-sm text-gray-600">{job?.company_name}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {applicationType === 'quick' && (
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-sm text-blue-800">
                Con la aplicación rápida, la empresa podrá contactarte directamente 
                a tu email: <strong>{user?.email}</strong>
              </p>
            </div>
          )}

          {applicationType === 'standard' && (
            <div className="space-y-3">
              <Input
                placeholder="Nombre completo"
                onChange={(e) => setCustomData({...customData, fullName: e.target.value})}
              />
              <Input
                placeholder="Teléfono"
                onChange={(e) => setCustomData({...customData, phone: e.target.value})}
              />
              <Textarea
                placeholder="Cuéntanos sobre ti y por qué te interesa este trabajo"
                onChange={(e) => setCustomData({...customData, about: e.target.value})}
              />
            </div>
          )}

          {applicationType === 'premium' && (
            <div className="space-y-3">
              <Input
                placeholder="Nombre completo"
                onChange={(e) => setCustomData({...customData, fullName: e.target.value})}
              />
              <Input
                placeholder="Teléfono"
                onChange={(e) => setCustomData({...customData, phone: e.target.value})}
              />
              <Textarea
                placeholder="Cuéntanos sobre ti"
                onChange={(e) => setCustomData({...customData, about: e.target.value})}
              />
              <Textarea
                placeholder="Mensaje personal para el reclutador (incluido con Premium)"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              <div className="bg-orange-50 p-4 rounded-lg">
                <p className="text-sm text-orange-800">
                  💎 <strong>Aplicación Premium ($5 USD)</strong><br/>
                  Tu aplicación será destacada y incluirá un mensaje personal directo al reclutador.
                </p>
              </div>
            </div>
          )}

          <div className="flex gap-2">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1">
              Cancelar
            </Button>
            <Button 
              type="submit" 
              disabled={isSubmitting}
              className="flex-1"
            >
              {isSubmitting ? 'Enviando...' : 
               applicationType === 'premium' ? 'Pagar y Aplicar' : 'Enviar Aplicación'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

// Main Home Component
const Home = () => {
  const { user } = React.useContext(AuthContext);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [location, setLocation] = useState('');
  const [selectedJob, setSelectedJob] = useState(null);
  const [applicationType, setApplicationType] = useState(null);
  const [showApplication, setShowApplication] = useState(false);
  const [showReport, setShowReport] = useState(false);
  const [reportJob, setReportJob] = useState(null);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async (searchTerm = '', locationTerm = '') => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (searchTerm) params.append('search', searchTerm);
      if (locationTerm) params.append('location', locationTerm);
      
      const response = await axios.get(`${API}/jobs?${params}`);
      setJobs(response.data);
    } catch (error) {
      toast.error('Error al cargar los trabajos');
      console.error('Error fetching jobs:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchJobs(search, location);
  };

  const handleApply = (job, type) => {
    if (!user) {
      toast.error('Debes iniciar sesión para aplicar');
      return;
    }
    if (user.user_type !== 'candidate') {
      toast.error('Solo los candidatos pueden aplicar a trabajos');
      return;
    }
    
    setSelectedJob(job);
    setApplicationType(type);
    setShowApplication(true);
  };

  const handleReport = (job) => {
    if (!user) {
      toast.error('Debes iniciar sesión para reportar');
      return;
    }
    
    setReportJob(job);
    setShowReport(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Tu primer trabajo te está esperando
            </h1>
            <p className="text-xl mb-8 opacity-90">
              Encuentra oportunidades laborales diseñadas específicamente para personas sin experiencia previa
            </p>
            
            {/* Search Form */}
            <form onSubmit={handleSearch} className="max-w-4xl mx-auto">
              <div className="flex flex-col sm:flex-row gap-4 bg-white p-4 rounded-lg shadow-lg">
                <Input
                  type="text"
                  placeholder="¿Qué trabajo buscas?"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="flex-1"
                />
                <Input
                  type="text"
                  placeholder="Ubicación"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="sm:w-48"
                />
                <Button type="submit" className="sm:w-32">
                  Buscar
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Jobs Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">
            Trabajos Disponibles
          </h2>
          <Badge variant="outline" className="text-green-600 border-green-600">
            {jobs.length} trabajos encontrados
          </Badge>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <Card key={i} className="animate-pulse">
                <CardContent className="p-6">
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded mb-4 w-2/3"></div>
                  <div className="h-3 bg-gray-200 rounded mb-4"></div>
                  <div className="flex gap-2">
                    <div className="h-8 bg-gray-200 rounded flex-1"></div>
                    <div className="h-8 bg-gray-200 rounded w-20"></div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : jobs.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              No se encontraron trabajos. Intenta con otros términos de búsqueda.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {jobs.map((job) => (
              <JobCard
                key={job.id}
                job={job}
                onApply={handleApply}
                onReport={handleReport}
                user={user}
              />
            ))}
          </div>
        )}
      </div>

      {/* Application Modal */}
      <ApplicationModal
        isOpen={showApplication}
        onClose={() => {
          setShowApplication(false);
          setSelectedJob(null);
          setApplicationType(null);
        }}
        job={selectedJob}
        applicationType={applicationType}
        user={user}
      />

      {/* Report Modal */}
      <ReportModal
        isOpen={showReport}
        onClose={() => {
          setShowReport(false);
          setReportJob(null);
        }}
        job={reportJob}
        user={user}
      />
    </div>
  );
};

// Company Dashboard (Basic)
const CompanyDashboard = () => {
  const { user } = React.useContext(AuthContext);
  const [jobs, setJobs] = useState([]);
  const [showJobForm, setShowJobForm] = useState(false);
  const [jobForm, setJobForm] = useState({
    title: '',
    description: '',
    location: '',
    requirements: '',
    benefits: '',
    salary_range: ''
  });

  useEffect(() => {
    if (user?.user_type === 'company') {
      fetchCompanyJobs();
    }
  }, [user]);

  const fetchCompanyJobs = async () => {
    try {
      // This would need to be implemented in the backend
      const response = await axios.get(`${API}/jobs`);
      setJobs(response.data);
    } catch (error) {
      console.error('Error fetching company jobs:', error);
    }
  };

  const handleCreateJob = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('user_id', user.id);
      
      Object.keys(jobForm).forEach(key => {
        formData.append(key, jobForm[key]);
      });

      await axios.post(`${API}/jobs`, formData);
      toast.success('¡Trabajo publicado exitosamente!');
      setShowJobForm(false);
      setJobForm({
        title: '',
        description: '',
        location: '',
        requirements: '',
        benefits: '',
        salary_range: ''
      });
      fetchCompanyJobs();
    } catch (error) {
      toast.error(error.response?.data?.detail || 'Error al crear el trabajo');
    }
  };

  if (user?.user_type !== 'company') {
    return (
      <div className="max-w-2xl mx-auto px-4 py-12 text-center">
        <h2 className="text-2xl font-bold mb-4">Acceso Restringido</h2>
        <p className="text-gray-600">Esta sección es solo para empresas.</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Panel de Empresa</h1>
        <Button onClick={() => setShowJobForm(true)}>
          Publicar Nuevo Trabajo
        </Button>
      </div>

      {/* Job Creation Modal */}
      <Dialog open={showJobForm} onOpenChange={setShowJobForm}>
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>Publicar Nuevo Trabajo</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleCreateJob} className="space-y-4">
            <Input
              placeholder="Título del trabajo"
              value={jobForm.title}
              onChange={(e) => setJobForm({...jobForm, title: e.target.value})}
              required
            />
            <Input
              placeholder="Ubicación"
              value={jobForm.location}
              onChange={(e) => setJobForm({...jobForm, location: e.target.value})}
              required
            />
            <Textarea
              placeholder="Descripción del trabajo"
              value={jobForm.description}
              onChange={(e) => setJobForm({...jobForm, description: e.target.value})}
              required
            />
            <Textarea
              placeholder="Requisitos (opcional)"
              value={jobForm.requirements}
              onChange={(e) => setJobForm({...jobForm, requirements: e.target.value})}
            />
            <Textarea
              placeholder="Beneficios (opcional)"
              value={jobForm.benefits}
              onChange={(e) => setJobForm({...jobForm, benefits: e.target.value})}
            />
            <Input
              placeholder="Rango salarial (opcional)"
              value={jobForm.salary_range}
              onChange={(e) => setJobForm({...jobForm, salary_range: e.target.value})}
            />
            <div className="flex gap-2">
              <Button type="button" variant="outline" onClick={() => setShowJobForm(false)} className="flex-1">
                Cancelar
              </Button>
              <Button type="submit" className="flex-1">
                Publicar Trabajo
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Jobs List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {jobs.map((job) => (
          <Card key={job.id}>
            <CardHeader>
              <CardTitle className="text-lg">{job.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-2">{job.location}</p>
              <p className="text-sm mb-4 line-clamp-3">{job.description}</p>
              <Badge variant="outline" className="text-green-600 border-green-600">
                Activo
              </Badge>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

// Main App Component
function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('zeroxp_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem('zeroxp_user', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('zeroxp_user');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto mb-4"></div>
          <p>Cargando ZeroXP...</p>
        </div>
      </div>
    );
  }

  return (
    <AuthProvider>
      <div className="App">
        <BrowserRouter>
          <AuthContext.Consumer>
            {({ user: contextUser, login, logout }) => (
              <>
                <Navigation user={contextUser || user} onLogout={logout || handleLogout} />
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/empresa" element={<CompanyDashboard />} />
                </Routes>
                <Toaster position="top-right" />
              </>
            )}
          </AuthContext.Consumer>
        </BrowserRouter>
      </div>
    </AuthProvider>
  );
}

export default App;