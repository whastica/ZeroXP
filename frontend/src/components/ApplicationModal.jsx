// src/components/ApplicationModal.jsx
import React, { Fragment, useState, useEffect } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Button } from '@/components/ui/Button';
import { toast } from 'react-hot-toast';
import { Upload, Linkedin, User, Mail, Phone, FileText } from 'lucide-react';

export default function ApplicationModal({ 
  isOpen, 
  onClose, 
  job, 
  applicationType, 
  user,
  onSubmit // Nueva prop para manejar el envío
}) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    resumeUrl: '',
    linkedinUrl: '',
    coverLetter: '',
    availability: 'Inmediata',
    portfolio: ''
  });

  // Prellenar datos del usuario cuando el modal se abre
  useEffect(() => {
    if (isOpen && user) {
      setFormData({
        fullName: user.profile?.name || '',
        email: user.email || '',
        phone: user.profile?.phone || '',
        resumeUrl: '',
        linkedinUrl: user.profile?.socialMedia?.linkedin || '',
        coverLetter: '',
        availability: user.profile?.availability || 'Inmediata',
        portfolio: ''
      });
    }
  }, [isOpen, user]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!user) {
      toast.error('Debes iniciar sesión');
      return;
    }

    // Validaciones básicas
    if (!formData.fullName || !formData.email || !formData.phone) {
      toast.error('Por favor completa todos los campos obligatorios');
      return;
    }

    // Validación de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error('Por favor ingresa un email válido');
      return;
    }

    // Preparar los datos de la aplicación
    const applicationData = {
      fullName: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      resumeUrl: formData.resumeUrl || '/uploads/default_cv.pdf',
      availability: formData.availability
    };

    // Si es aplicación detallada, incluir campos adicionales
    if (applicationType === 'detailed') {
      applicationData.linkedinUrl = formData.linkedinUrl;
      applicationData.coverLetter = formData.coverLetter;
      applicationData.portfolio = formData.portfolio;
    }

    try {
      // Llamar a la función onSubmit pasada desde Home
      if (onSubmit) {
        onSubmit(applicationData);
      } else {
        // Fallback si no hay onSubmit (para compatibilidad)
        toast.success(`Aplicación enviada a ${job?.title}`);
        onClose();
      }

      // Resetear formulario
      setFormData({
        fullName: user.profile?.name || '',
        email: user.email || '',
        phone: user.profile?.phone || '',
        resumeUrl: '',
        linkedinUrl: user.profile?.socialMedia?.linkedin || '',
        coverLetter: '',
        availability: user.profile?.availability || 'Inmediata',
        portfolio: ''
      });

    } catch (error) {
      console.error('Error en el envío:', error);
      toast.error('Error al enviar la aplicación');
    }
  };

  const handleClose = () => {
    // Resetear formulario al cerrar
    setFormData({
      fullName: user?.profile?.name || '',
      email: user?.email || '',
      phone: user?.profile?.phone || '',
      resumeUrl: '',
      linkedinUrl: user?.profile?.socialMedia?.linkedin || '',
      coverLetter: '',
      availability: user?.profile?.availability || 'Inmediata',
      portfolio: ''
    });
    onClose();
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={handleClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-2xl bg-white rounded-2xl p-6 md:p-8 shadow-xl">
                
                {/* Header */}
                <div className="mb-6">
                  <Dialog.Title className="text-2xl font-bold text-gray-900 mb-2">
                    {applicationType === 'quick' ? 'Aplicación Rápida' : 'Aplicación Detallada'}
                  </Dialog.Title>
                  <p className="text-gray-600">
                    Aplicando a: <span className="font-semibold text-orange-600">{job?.title}</span>
                  </p>
                  <p className="text-sm text-gray-500">
                    {job?.company_name}
                  </p>
                </div>

                {/* Formulario */}
                <form onSubmit={handleSubmit} className="space-y-5">
                  
                  {/* Información básica (siempre visible) */}
                  <div className="space-y-4">
                    <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                      <User className="w-5 h-5 text-orange-500" />
                      Información Personal
                    </h3>

                    {/* Nombre completo */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Nombre completo <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        placeholder="Juan Pérez"
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="juan@ejemplo.com"
                          required
                          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        />
                      </div>
                    </div>

                    {/* Teléfono */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Teléfono <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="+57 300 123 4567"
                          required
                          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        />
                      </div>
                    </div>

                    {/* Disponibilidad */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Disponibilidad
                      </label>
                      <select
                        value={formData.availability}
                        onChange={(e) => setFormData({ ...formData, availability: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      >
                        <option value="Inmediata">Inmediata</option>
                        <option value="2 semanas">2 semanas</option>
                        <option value="1 mes">1 mes</option>
                        <option value="Negociable">Negociable</option>
                      </select>
                    </div>

                    {/* CV Upload (simulado) */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Curriculum Vitae {applicationType === 'quick' && <span className="text-gray-500">(opcional)</span>}
                      </label>
                      <div className="flex items-center gap-3">
                        <input
                          type="text"
                          value={formData.resumeUrl}
                          onChange={(e) => setFormData({ ...formData, resumeUrl: e.target.value })}
                          placeholder="URL de tu CV o dejalo vacío para usar el predeterminado"
                          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        />
                        <button
                          type="button"
                          className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors flex items-center gap-2"
                        >
                          <Upload className="w-4 h-4" />
                          Subir
                        </button>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        Formatos aceptados: PDF, DOC, DOCX (máx. 5MB)
                      </p>
                    </div>
                  </div>

                  {/* Campos adicionales para aplicación detallada */}
                  {applicationType === 'detailed' && (
                    <div className="space-y-4 pt-4 border-t border-gray-200">
                      <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                        <FileText className="w-5 h-5 text-orange-500" />
                        Información Adicional
                      </h3>

                      {/* LinkedIn */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          LinkedIn <span className="text-gray-500">(opcional)</span>
                        </label>
                        <div className="relative">
                          <Linkedin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                          <input
                            type="url"
                            value={formData.linkedinUrl}
                            onChange={(e) => setFormData({ ...formData, linkedinUrl: e.target.value })}
                            placeholder="linkedin.com/in/tuusuario"
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                          />
                        </div>
                      </div>

                      {/* Portafolio */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Portafolio / Sitio Web <span className="text-gray-500">(opcional)</span>
                        </label>
                        <input
                          type="url"
                          value={formData.portfolio}
                          onChange={(e) => setFormData({ ...formData, portfolio: e.target.value })}
                          placeholder="https://tuportafolio.com"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        />
                      </div>

                      {/* Carta de presentación */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Carta de presentación
                        </label>
                        <textarea
                          value={formData.coverLetter}
                          onChange={(e) => setFormData({ ...formData, coverLetter: e.target.value })}
                          placeholder="Cuéntanos por qué estás interesado en esta posición y qué puedes aportar al equipo..."
                          rows={5}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none"
                        />
                        <p className="text-xs text-gray-500 mt-1">
                          {formData.coverLetter.length}/500 caracteres
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Información adicional */}
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <p className="text-sm text-blue-800">
                      <strong>Nota:</strong> Tu información será compartida únicamente con la empresa {job?.company_name} para evaluar tu aplicación.
                    </p>
                  </div>

                  {/* Botones */}
                  <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 pt-4">
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={handleClose}
                      className="w-full sm:w-auto"
                    >
                      Cancelar
                    </Button>
                    <Button 
                      type="submit" 
                      className="w-full sm:w-auto bg-orange-600 hover:bg-orange-700 text-white"
                    >
                      {applicationType === 'quick' ? 'Aplicar Ahora' : 'Enviar Aplicación'}
                    </Button>
                  </div>
                </form>

              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}