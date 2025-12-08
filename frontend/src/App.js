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
    } else {
      // Create a demo candidate user if no user is stored
      const demoUser = {
        id: 'demo_001',
        email: 'juan.perez@example.com',
        name: 'Juan Pérez García',
        user_type: 'candidate',
        phone: '+34 612 345 678',
        created_at: new Date().toISOString()
      };
      setUser(demoUser);
      localStorage.setItem('zeroxp_user', JSON.stringify(demoUser));
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
const JobCard = ({ job, onApply, onReport, onViewDetails, user }) => {
  return (
    <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => onViewDetails(job)}>
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900">{job.title}</h3>
            <p className="text-sm text-gray-600">{job.company_name}</p>
            <p className="text-sm text-gray-500 flex items-center gap-1 mt-1">
              📍 {job.location}
            </p>
          </div>
          <div className="flex gap-2 items-start flex-shrink-0">
            <Badge variant="outline" className="text-green-600 border-green-600">
              Sin Experiencia
            </Badge>
            {user && (
              <Button 
                size="sm" 
                variant="ghost"
                className="text-red-500 hover:text-red-700 p-1 h-6 w-6"
                onClick={(e) => {e.stopPropagation(); onReport(job);}}
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
        
        <div className="flex gap-2 mb-4 flex-wrap">
          {job.job_type && (
            <Badge variant="outline" className="text-xs">
              {job.job_type === 'full-time' ? '⏰ Tiempo Completo' : 
               job.job_type === 'part-time' ? '⏰ Tiempo Parcial' :
               job.job_type === 'contract' ? '📋 Contrato' :
               job.job_type === 'internship' ? '🎓 Prácticas' : '💼 Freelance'}
            </Badge>
          )}
          {job.experience_level && (
            <Badge variant="outline" className="text-xs">
              {job.experience_level === 'entry' ? '👶 Entrada' :
               job.experience_level === 'junior' ? '🌱 Junior' :
               job.experience_level === 'mid' ? '⭐ Mid-Level' : '🏆 Senior'}
            </Badge>
          )}
        </div>
        
        {job.salary_range && (
          <p className="text-sm font-medium text-gray-900 mb-4">
            💰 {job.salary_range}
          </p>
        )}
        
        <div className="flex gap-2">
          <Button 
            size="sm" 
            className="flex-1"
            onClick={(e) => {e.stopPropagation(); onApply(job, 'quick');}}
            disabled={!user || user.user_type !== 'candidate'}
          >
            Aplicar Rápido
          </Button>
          <Button 
            size="sm" 
            variant="outline" 
            onClick={(e) => {e.stopPropagation(); onApply(job, 'standard');}}
            disabled={!user || user.user_type !== 'candidate'}
          >
            Aplicar Estándar
          </Button>
          <Button 
            size="sm" 
            variant="outline" 
            className="text-orange-600 border-orange-600 hover:bg-orange-50"
            onClick={(e) => {e.stopPropagation(); onApply(job, 'premium');}}
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
  const [customData, setCustomData] = useState({
    fullName: user?.name || '',
    email: user?.email || '',
    phone: '',
    linkedin: '',
    cv: null,
    about: ''
  });
  const [cvFileName, setCvFileName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Actualizar datos cuando cambia el usuario
  useEffect(() => {
    setCustomData(prev => ({
      ...prev,
      fullName: user?.name || '',
      email: user?.email || ''
    }));
  }, [user, isOpen]);

  const handleCVChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validar que sea PDF o documento
      const validTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
      if (!validTypes.includes(file.type)) {
        toast.error('Por favor sube un archivo PDF o Word (.pdf, .doc, .docx)');
        return;
      }
      if (file.size > 5 * 1024 * 1024) { // 5MB
        toast.error('El archivo no debe superar 5MB');
        return;
      }
      setCustomData({...customData, cv: file});
      setCvFileName(file.name);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) return;

    // Validar CV obligatorio
    if (!customData.cv) {
      toast.error('El CV es obligatorio para aplicar');
      return;
    }

    // Validar datos básicos
    if (!customData.fullName || !customData.email || !customData.phone) {
      toast.error('Por favor completa: Nombre, Email y Teléfono');
      return;
    }

    setIsSubmitting(true);
    try {
      const formData = new FormData();
      formData.append('user_id', user.id);
      formData.append('job_id', job.id);
      formData.append('application_type', applicationType);
      formData.append('fullName', customData.fullName);
      formData.append('email', customData.email);
      formData.append('phone', customData.phone);
      formData.append('linkedin', customData.linkedin || '');
      formData.append('about', customData.about);
      formData.append('message', message || '');
      formData.append('cv', customData.cv);

      await axios.post(`${API}/jobs/${job.id}/apply`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      toast.success('¡Aplicación enviada exitosamente!');
      onClose();
      // Reset form
      setCustomData({
        fullName: user?.name || '',
        email: user?.email || '',
        phone: '',
        linkedin: '',
        cv: null,
        about: ''
      });
      setCvFileName('');
      setMessage('');
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
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{getModalTitle()}</DialogTitle>
        </DialogHeader>
        
        <div className="mb-4 pb-4 border-b">
          <h4 className="font-medium text-gray-900">{job?.title}</h4>
          <p className="text-sm text-gray-600">{job?.company_name}</p>
          <p className="text-sm text-gray-500">📍 {job?.location}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Datos Básicos - Obligatorios */}
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <p className="text-sm font-medium text-blue-900 mb-3">📋 Datos Básicos (Obligatorios)</p>
            <div className="space-y-3">
              <div>
                <label className="text-xs font-medium text-gray-700 block mb-1">Nombre Completo *</label>
                <Input
                  type="text"
                  placeholder="Tu nombre completo"
                  value={customData.fullName}
                  onChange={(e) => setCustomData({...customData, fullName: e.target.value})}
                  required
                />
              </div>
              <div>
                <label className="text-xs font-medium text-gray-700 block mb-1">Email *</label>
                <Input
                  type="email"
                  placeholder="tu@email.com"
                  value={customData.email}
                  onChange={(e) => setCustomData({...customData, email: e.target.value})}
                  required
                />
              </div>
              <div>
                <label className="text-xs font-medium text-gray-700 block mb-1">Teléfono *</label>
                <Input
                  type="tel"
                  placeholder="+34 123 456 789"
                  value={customData.phone}
                  onChange={(e) => setCustomData({...customData, phone: e.target.value})}
                  required
                />
              </div>
            </div>
          </div>

          {/* CV - Obligatorio */}
          <div className="bg-red-50 p-4 rounded-lg border border-red-200">
            <p className="text-sm font-medium text-red-900 mb-3">📄 Curriculum Vitae (Obligatorio)</p>
            <div className="space-y-2">
              <label className="text-xs font-medium text-gray-700 block">
                Sube tu CV en formato PDF o Word
              </label>
              <div className="border-2 border-dashed border-red-300 rounded-lg p-4 text-center cursor-pointer hover:bg-red-100 transition">
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={handleCVChange}
                  className="hidden"
                  id={`cv-upload-${job?.id}`}
                  required
                />
                <label htmlFor={`cv-upload-${job?.id}`} className="cursor-pointer block">
                  <p className="text-sm text-gray-600">
                    {cvFileName ? (
                      <span className="text-green-600 font-medium">✅ {cvFileName}</span>
                    ) : (
                      <>
                        <span className="text-red-600 font-medium">📎 Selecciona tu CV</span>
                        <br />
                        <span className="text-xs text-gray-500 mt-1">PDF o Word (máx. 5MB)</span>
                      </>
                    )}
                  </p>
                </label>
              </div>
            </div>
          </div>

          {/* LinkedIn - Opcional */}
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <p className="text-sm font-medium text-gray-700 mb-3">💼 LinkedIn (Opcional)</p>
            <Input
              type="url"
              placeholder="https://linkedin.com/in/tuprofile"
              value={customData.linkedin}
              onChange={(e) => setCustomData({...customData, linkedin: e.target.value})}
            />
            <p className="text-xs text-gray-500 mt-2">Completa tu perfil para que el reclutador pueda conocerte mejor</p>
          </div>

          {/* Información Adicional */}
          <div>
            <label className="text-sm font-medium text-gray-700 block mb-2">
              ¿Por qué te interesa este trabajo?
            </label>
            <Textarea
              placeholder="Cuéntanos qué te atrae de esta posición y por qué te consideras un buen candidato..."
              value={customData.about}
              onChange={(e) => setCustomData({...customData, about: e.target.value})}
              className="min-h-24"
            />
          </div>

          {/* Premium - Solo para tipo premium */}
          {applicationType === 'premium' && (
            <>
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-2">
                  Mensaje Personal para el Reclutador ✨
                </label>
                <Textarea
                  placeholder="Escribe un mensaje especial que acompañe tu aplicación y destaque tu candidatura..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="min-h-24"
                />
              </div>
              <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
                <p className="text-sm text-orange-800">
                  💎 <strong>Aplicación Premium ($5 USD)</strong><br/>
                  Tu aplicación será destacada y incluirá un mensaje personal directo al reclutador.
                </p>
              </div>
            </>
          )}

          {/* Info del tipo de aplicación */}
          {applicationType === 'quick' && (
            <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
              <p className="text-xs text-blue-800">
                ⚡ <strong>Aplicación Rápida</strong> - Tus datos y CV serán compartidos con la empresa para contactarte.
              </p>
            </div>
          )}

          {applicationType === 'standard' && (
            <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
              <p className="text-xs text-blue-800">
                ✓ <strong>Aplicación Estándar</strong> - Tu perfil completo y CV serán revisados por la empresa.
              </p>
            </div>
          )}

          {/* Botones */}
          <div className="flex gap-2 pt-4 border-t">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1">
              Cancelar
            </Button>
            <Button 
              type="submit" 
              disabled={isSubmitting || !customData.cv}
              className="flex-1"
            >
              {isSubmitting ? 'Enviando...' : 
               applicationType === 'premium' ? 'Pagar y Aplicar ($5)' : 'Enviar Aplicación'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

// Job Detail Modal Component
const JobDetailModal = ({ isOpen, onClose, job, onApply, user }) => {
  if (!job) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">{job.title}</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          {/* Empresa */}
          <div>
            <p className="text-sm font-semibold text-gray-600">Empresa</p>
            <p className="text-lg text-gray-900">{job.company_name}</p>
          </div>

          {/* Ubicación */}
          <div>
            <p className="text-sm font-semibold text-gray-600">📍 Ubicación</p>
            <p className="text-gray-900">{job.location}</p>
          </div>

          {/* Salario */}
          {job.salary_range && (
            <div>
              <p className="text-sm font-semibold text-gray-600">💰 Salario</p>
              <p className="text-lg font-bold text-green-600">{job.salary_range}</p>
            </div>
          )}

          {/* Tipo y Nivel */}
          <div className="flex gap-4">
            <div>
              <p className="text-sm font-semibold text-gray-600">Tipo de Empleo</p>
              <Badge className="mt-1">
                {job.job_type === 'full-time' ? '⏰ Tiempo Completo' : 
                 job.job_type === 'part-time' ? '⏰ Tiempo Parcial' :
                 job.job_type === 'contract' ? '📋 Contrato' :
                 job.job_type === 'internship' ? '🎓 Prácticas' : '💼 Freelance'}
              </Badge>
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-600">Nivel Requerido</p>
              <Badge className="mt-1">
                {job.experience_level === 'entry' ? '👶 Entrada' :
                 job.experience_level === 'junior' ? '🌱 Junior' :
                 job.experience_level === 'mid' ? '⭐ Mid-Level' : '🏆 Senior'}
              </Badge>
            </div>
          </div>

          {/* Descripción */}
          <div>
            <p className="text-sm font-semibold text-gray-600 mb-2">Descripción del Puesto</p>
            <p className="text-gray-700 leading-relaxed">{job.description}</p>
          </div>

          {/* Requisitos */}
          {job.requirements && (
            <div>
              <p className="text-sm font-semibold text-gray-600 mb-2">Requisitos</p>
              <p className="text-gray-700">{job.requirements}</p>
            </div>
          )}

          {/* Beneficios */}
          {job.benefits && (
            <div>
              <p className="text-sm font-semibold text-gray-600 mb-2">Beneficios</p>
              <p className="text-gray-700">{job.benefits}</p>
            </div>
          )}

          {/* Fecha Límite */}
          {job.deadline && (
            <div className="bg-yellow-50 border border-yellow-200 p-3 rounded-lg">
              <p className="text-sm font-semibold text-yellow-900">⏰ Fecha Límite para Aplicar</p>
              <p className="text-yellow-900">{new Date(job.deadline).toLocaleDateString('es-ES')}</p>
            </div>
          )}

          {/* Botones de Aplicación */}
          <div className="grid grid-cols-3 gap-3 pt-4 border-t">
            <Button 
              className="w-full"
              onClick={() => onApply(job, 'quick')}
              disabled={!user || user.user_type !== 'candidate'}
            >
              Rápida
            </Button>
            <Button 
              variant="outline"
              className="w-full"
              onClick={() => onApply(job, 'standard')}
              disabled={!user || user.user_type !== 'candidate'}
            >
              Estándar
            </Button>
            <Button 
              className="w-full text-orange-600 border-orange-600 hover:bg-orange-50"
              variant="outline"
              onClick={() => onApply(job, 'premium')}
              disabled={!user || user.user_type !== 'candidate'}
            >
              Premium
            </Button>
          </div>

          {!user && (
            <div className="bg-blue-50 border border-blue-200 p-3 rounded-lg">
              <p className="text-sm text-blue-900">👤 Debes iniciar sesión como candidato para aplicar</p>
            </div>
          )}

          {user && user.user_type !== 'candidate' && (
            <div className="bg-red-50 border border-red-200 p-3 rounded-lg">
              <p className="text-sm text-red-900">❌ Solo los candidatos pueden aplicar a trabajos</p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

// Main Home Component
const Home = () => {
  const { user } = React.useContext(AuthContext);
  const [allJobs, setAllJobs] = useState([]); // Todos los jobs sin filtrar
  const [jobs, setJobs] = useState([]); // Jobs que se muestran (filtrados)
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [location, setLocation] = useState('');
  const [selectedJob, setSelectedJob] = useState(null);
  const [applicationType, setApplicationType] = useState(null);
  const [showApplication, setShowApplication] = useState(false);
  const [showReport, setShowReport] = useState(false);
  const [reportJob, setReportJob] = useState(null);
  const [showJobDetail, setShowJobDetail] = useState(false);

  useEffect(() => {
    // Cargar las ofertas de ejemplo directamente sin intentar llamar a API
    loadSampleJobs();
  }, []);

  const loadSampleJobs = () => {
    const sampleJobs = [
          {
            title: 'Desarrollador Frontend Junior',
            description: 'Buscamos un desarrollador frontend passionate sin experiencia previa pero con ganas de aprender. Trabajarás en proyectos reales con mentoring constante.',
            location: 'Madrid, España',
            requirements: 'Conocimiento de HTML, CSS, JavaScript. React es un plus.',
            benefits: 'Flexibilidad horaria, capacitación continua, ambiente amigable',
            salary_range: '€1200-€1500/mes',
            job_type: 'full-time',
            experience_level: 'entry',
            company_name: 'TechStart Madrid',
            deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
          },
          {
            title: 'Asistente de Soporte Técnico',
            description: 'Se busca persona para formar parte del equipo de soporte técnico. No requiere experiencia, proporcionamos toda la capacitación necesaria.',
            location: 'Barcelona, España',
            requirements: 'Comunicación clara, disposición para aprender, buen trato al cliente',
            benefits: 'Formación completa, posibilidad de crecimiento, horario flexible',
            salary_range: '€1000-€1300/mes',
            job_type: 'full-time',
            experience_level: 'entry',
            company_name: 'CloudTech Solutions',
            deadline: new Date(Date.now() + 25 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
          },
          {
            title: 'Community Manager Trainee',
            description: 'Únete a nuestro equipo como Community Manager en formación. Aprenderás gestión de redes sociales desde cero con supervisión diaria.',
            location: 'Valencia, España',
            requirements: 'Pasión por redes sociales, creatividad, disponibilidad',
            benefits: 'Mentoring directo, flexibilidad laboral, oportunidades de viaje',
            salary_range: '€900-€1200/mes',
            job_type: 'part-time',
            experience_level: 'entry',
            company_name: 'Digital Growth Agency',
            deadline: new Date(Date.now() + 20 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            id: 4
          },
          {
            title: 'Data Entry Specialist',
            description: 'Posición ideal para quienes buscan su primer trabajo. Entrada de datos y gestión básica de información con formación inicial.',
            location: 'Madrid, España',
            requirements: 'Atención al detalle, velocidad de escritura, responsabilidad',
            benefits: 'Flexibilidad horaria, trabajo remoto posible, estabilidad',
            salary_range: '€1100-€1400/mes',
            job_type: 'full-time',
            experience_level: 'entry',
            company_name: 'Business Process Solutions',
            deadline: new Date(Date.now() + 35 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            id: 5
          },
          {
            title: 'Asistente de Marketing Digital',
            description: 'Buscamos asistente con interés en marketing digital. No se requiere experiencia, aprenderás sobre email marketing, analytics y más.',
            location: 'Remoto',
            requirements: 'Interés en marketing, organización, creatividad',
            benefits: 'Trabajo remoto 100%, capacitación continua, posibilidad de especialización',
            salary_range: '€1000-€1250/mes',
            job_type: 'full-time',
            experience_level: 'entry',
            company_name: 'MarketBridge',
            deadline: new Date(Date.now() + 28 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            id: 6
          },
          {
            title: 'Asistente Administrativo',
            description: 'Oportunidad para alguien sin experiencia de comenzar en el sector administrativo. Capacitación completa y mentoring.',
            location: 'Bilbao, España',
            requirements: 'Puntualidad, organización, disposición de aprender',
            benefits: 'Ambiente estable, posibilidades de crecimiento, beneficios sociales',
            salary_range: '€950-€1200/mes',
            job_type: 'full-time',
            experience_level: 'entry',
            company_name: 'Corporativo Vasco SL',
            deadline: new Date(Date.now() + 32 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            id: 7
          }
        ];
        
        // Asignar IDs a las ofertas
        sampleJobs.forEach((job, index) => {
          job.id = index + 1;
        });

        // Cargar las ofertas de ejemplo en el estado local
        setAllJobs(sampleJobs);
        setJobs(sampleJobs);
        setLoading(false);
  };

  const fetchJobs = (searchTerm = '', locationTerm = '') => {
    // En modo MVP sin backend, filtrar de los jobs almacenados (allJobs)
    let filtered = allJobs;
    
    if (searchTerm) {
      filtered = filtered.filter(job => 
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (locationTerm) {
      filtered = filtered.filter(job => 
        job.location.toLowerCase().includes(locationTerm.toLowerCase())
      );
    }
    
    setJobs(filtered);
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

  const handleViewJobDetail = (job) => {
    setSelectedJob(job);
    setShowJobDetail(true);
  };

  const handleApplyFromModal = (job, type) => {
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
    setShowJobDetail(false);
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
                onViewDetails={handleViewJobDetail}
                user={user}
              />
            ))}
          </div>
        )}
      </div>

      {/* Job Detail Modal */}
      <JobDetailModal
        isOpen={showJobDetail}
        onClose={() => setShowJobDetail(false)}
        job={selectedJob}
        onApply={handleApplyFromModal}
        user={user}
      />

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
  const [editingJob, setEditingJob] = useState(null);
  const [jobForm, setJobForm] = useState({
    title: '',
    description: '',
    location: '',
    requirements: '',
    benefits: '',
    salary_range: '',
    job_type: 'full-time',
    experience_level: 'entry',
    deadline: ''
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user?.user_type === 'company') {
      fetchCompanyJobs();
    }
  }, [user]);

  const fetchCompanyJobs = async () => {
    try {
      setLoading(true);
      // This would need to be implemented in the backend to filter by company
      const response = await axios.get(`${API}/jobs`);
      // Filter jobs by current user (company)
      const companyJobs = response.data.filter(job => job.user_id === user?.id);
      setJobs(companyJobs);
    } catch (error) {
      toast.error('Error al cargar los trabajos');
      console.error('Error fetching company jobs:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateJob = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('user_id', user.id);
      formData.append('company_name', user.name);
      
      Object.keys(jobForm).forEach(key => {
        formData.append(key, jobForm[key]);
      });

      if (editingJob) {
        // Update existing job
        await axios.put(`${API}/jobs/${editingJob.id}`, formData);
        toast.success('¡Trabajo actualizado exitosamente!');
      } else {
        // Create new job
        await axios.post(`${API}/jobs`, formData);
        toast.success('¡Trabajo publicado exitosamente!');
      }
      
      setShowJobForm(false);
      setEditingJob(null);
      setJobForm({
        title: '',
        description: '',
        location: '',
        requirements: '',
        benefits: '',
        salary_range: '',
        job_type: 'full-time',
        experience_level: 'entry',
        deadline: ''
      });
      fetchCompanyJobs();
    } catch (error) {
      toast.error(error.response?.data?.detail || 'Error al guardar el trabajo');
    }
  };

  const handleEditJob = (job) => {
    setEditingJob(job);
    setJobForm({
      title: job.title,
      description: job.description,
      location: job.location,
      requirements: job.requirements || '',
      benefits: job.benefits || '',
      salary_range: job.salary_range || '',
      job_type: job.job_type || 'full-time',
      experience_level: job.experience_level || 'entry',
      deadline: job.deadline || ''
    });
    setShowJobForm(true);
  };

  const handleDeleteJob = async (jobId) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar esta oferta?')) {
      try {
        await axios.delete(`${API}/jobs/${jobId}`);
        toast.success('Trabajo eliminado exitosamente');
        fetchCompanyJobs();
      } catch (error) {
        toast.error(error.response?.data?.detail || 'Error al eliminar el trabajo');
      }
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
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Panel de Empresa</h1>
              <p className="text-gray-600 mt-2">Gestiona tus ofertas de empleo</p>
            </div>
            <Button 
              onClick={() => {
                setEditingJob(null);
                setJobForm({
                  title: '',
                  description: '',
                  location: '',
                  requirements: '',
                  benefits: '',
                  salary_range: '',
                  job_type: 'full-time',
                  experience_level: 'entry',
                  deadline: ''
                });
                setShowJobForm(true);
              }}
              className="bg-orange-600 hover:bg-orange-700"
            >
              + Publicar Nueva Oferta
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="text-center">
                <p className="text-gray-600 text-sm font-medium">Ofertas Activas</p>
                <p className="text-3xl font-bold text-orange-600 mt-2">{jobs.length}</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="text-center">
                <p className="text-gray-600 text-sm font-medium">Aplicaciones Totales</p>
                <p className="text-3xl font-bold text-blue-600 mt-2">
                  {jobs.reduce((total, job) => total + (job.applications_count || 0), 0)}
                </p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="text-center">
                <p className="text-gray-600 text-sm font-medium">Empresa</p>
                <p className="text-lg font-bold text-gray-900 mt-2">{user?.name || 'Mi Empresa'}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Job Creation Modal */}
        <Dialog open={showJobForm} onOpenChange={setShowJobForm}>
          <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingJob ? 'Editar Oferta' : 'Publicar Nueva Oferta'}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleCreateJob} className="space-y-4">
              {/* Titulo */}
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  Título del Trabajo *
                </label>
                <Input
                  placeholder="Ej: Desarrollador Junior"
                  value={jobForm.title}
                  onChange={(e) => setJobForm({...jobForm, title: e.target.value})}
                  required
                />
              </div>

              {/* Ubicación */}
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  Ubicación *
                </label>
                <Input
                  placeholder="Ej: Madrid, España"
                  value={jobForm.location}
                  onChange={(e) => setJobForm({...jobForm, location: e.target.value})}
                  required
                />
              </div>

              {/* Tipo de Trabajo y Nivel de Experiencia */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">
                    Tipo de Empleo
                  </label>
                  <Select 
                    value={jobForm.job_type} 
                    onValueChange={(value) => setJobForm({...jobForm, job_type: value})}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="full-time">Tiempo Completo</SelectItem>
                      <SelectItem value="part-time">Tiempo Parcial</SelectItem>
                      <SelectItem value="contract">Contrato</SelectItem>
                      <SelectItem value="internship">Prácticas</SelectItem>
                      <SelectItem value="freelance">Freelance</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">
                    Nivel de Experiencia
                  </label>
                  <Select 
                    value={jobForm.experience_level} 
                    onValueChange={(value) => setJobForm({...jobForm, experience_level: value})}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="entry">Entrada</SelectItem>
                      <SelectItem value="junior">Junior</SelectItem>
                      <SelectItem value="mid">Mid-Level</SelectItem>
                      <SelectItem value="senior">Senior</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Descripción */}
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  Descripción del Trabajo *
                </label>
                <Textarea
                  placeholder="Describe la posición, responsabilidades principales..."
                  value={jobForm.description}
                  onChange={(e) => setJobForm({...jobForm, description: e.target.value})}
                  required
                  className="min-h-32"
                />
              </div>

              {/* Requisitos */}
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  Requisitos (opcional)
                </label>
                <Textarea
                  placeholder="Habilidades, conocimientos o requisitos deseados"
                  value={jobForm.requirements}
                  onChange={(e) => setJobForm({...jobForm, requirements: e.target.value})}
                  className="min-h-24"
                />
              </div>

              {/* Beneficios */}
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  Beneficios (opcional)
                </label>
                <Textarea
                  placeholder="Beneficios, ventajas, oportunidades de crecimiento..."
                  value={jobForm.benefits}
                  onChange={(e) => setJobForm({...jobForm, benefits: e.target.value})}
                  className="min-h-24"
                />
              </div>

              {/* Rango Salarial y Deadline */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">
                    Rango Salarial (opcional)
                  </label>
                  <Input
                    placeholder="Ej: €1500-€2000/mes"
                    value={jobForm.salary_range}
                    onChange={(e) => setJobForm({...jobForm, salary_range: e.target.value})}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">
                    Fecha Límite (opcional)
                  </label>
                  <Input
                    type="date"
                    value={jobForm.deadline}
                    onChange={(e) => setJobForm({...jobForm, deadline: e.target.value})}
                  />
                </div>
              </div>

              {/* Botones */}
              <div className="flex gap-2 pt-4">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => {
                    setShowJobForm(false);
                    setEditingJob(null);
                  }} 
                  className="flex-1"
                >
                  Cancelar
                </Button>
                <Button type="submit" className="flex-1 bg-orange-600 hover:bg-orange-700">
                  {editingJob ? 'Actualizar Oferta' : 'Publicar Oferta'}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>

        {/* Jobs List */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[...Array(4)].map((_, i) => (
              <Card key={i} className="animate-pulse">
                <CardContent className="p-6">
                  <div className="h-4 bg-gray-200 rounded mb-4"></div>
                  <div className="h-3 bg-gray-200 rounded mb-4 w-2/3"></div>
                  <div className="h-3 bg-gray-200 rounded mb-4"></div>
                  <div className="flex gap-2">
                    <div className="h-8 bg-gray-200 rounded flex-1"></div>
                    <div className="h-8 bg-gray-200 rounded flex-1"></div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : jobs.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg mb-4">No has publicado ninguna oferta de empleo aún.</p>
            <Button 
              onClick={() => {
                setEditingJob(null);
                setJobForm({
                  title: '',
                  description: '',
                  location: '',
                  requirements: '',
                  benefits: '',
                  salary_range: '',
                  job_type: 'full-time',
                  experience_level: 'entry',
                  deadline: ''
                });
                setShowJobForm(true);
              }}
              className="bg-orange-600 hover:bg-orange-700"
            >
              Crear tu Primera Oferta
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {jobs.map((job) => (
              <Card key={job.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg text-gray-900">{job.title}</CardTitle>
                      <p className="text-sm text-gray-600 mt-1">{job.location}</p>
                    </div>
                    <Badge className="bg-green-100 text-green-800">
                      Activa
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-700 mb-4 line-clamp-2">{job.description}</p>
                  
                  <div className="flex gap-2 mb-4 flex-wrap">
                    <Badge variant="outline" className="text-xs">
                      {job.job_type === 'full-time' ? 'Tiempo Completo' : 
                       job.job_type === 'part-time' ? 'Tiempo Parcial' :
                       job.job_type === 'contract' ? 'Contrato' :
                       job.job_type === 'internship' ? 'Prácticas' : 'Freelance'}
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      {job.experience_level === 'entry' ? 'Entrada' :
                       job.experience_level === 'junior' ? 'Junior' :
                       job.experience_level === 'mid' ? 'Mid-Level' : 'Senior'}
                    </Badge>
                    {job.salary_range && (
                      <Badge variant="outline" className="text-xs">
                        💰 {job.salary_range}
                      </Badge>
                    )}
                  </div>

                  <div className="bg-gray-50 p-3 rounded mb-4">
                    <p className="text-sm">
                      <span className="text-gray-600">Aplicaciones: </span>
                      <span className="font-bold text-orange-600">{job.applications_count || 0}</span>
                    </p>
                  </div>

                  <div className="flex gap-2">
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => handleEditJob(job)}
                      className="flex-1"
                    >
                      Editar
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      className="text-red-600 hover:text-red-700 border-red-200"
                      onClick={() => handleDeleteJob(job.id)}
                    >
                      Eliminar
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
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