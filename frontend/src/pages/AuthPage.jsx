import React, { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useAuthForm } from "@/hooks/useAuthForm";
import {
  User,
  Building2,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Briefcase,
  Users,
  Loader2,
  AlertCircle,
} from "lucide-react";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [userType, setUserType] = useState("candidate");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { login, register } = useAuth();
  const navigate = useNavigate();

  const {
    formData,
    errors,
    touched,
    handleChange,
    handleBlur,
    validateForm,
    resetForm,
    fillDemoCredentials,
  } = useAuthForm(isLogin, userType);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validar formulario
    if (!validateForm()) {
      toast.error("Por favor corrige los errores en el formulario");
      return;
    }

    setIsLoading(true);

    // Simular delay de red
    await new Promise((resolve) => setTimeout(resolve, 800));

    try {
      if (isLogin) {
        // Login
        const success = login(formData.email, formData.password);
        if (success) {
          toast.success("¡Bienvenido de nuevo!", {
            icon: "👋",
          });
          navigate("/");
        } else {
          toast.error("Credenciales inválidas. Intenta con los usuarios de prueba.");
        }
      } else {
        // Registro
        const userData = {
          email: formData.email,
          password: formData.password,
          name: formData.name,
          user_type: userType,
          ...(userType === "company" && { companyName: formData.companyName }),
        };

        const result = register(userData);
        if (result.success) {
          toast.success("¡Cuenta creada exitosamente!", {
            icon: "🎉",
          });
          navigate("/");
        } else {
          toast.error(result.message || "Error al crear la cuenta");
        }
      }
    } catch (error) {
      toast.error("Ocurrió un error. Intenta nuevamente");
    } finally {
      setIsLoading(false);
    }
  };

  const handleTabChange = (newIsLogin) => {
    setIsLogin(newIsLogin);
    resetForm();
  };

  const handleDemoClick = (type) => {
    fillDemoCredentials(type);
    toast.success(`Credenciales de ${type === "candidate" ? "candidato" : "empresa"} cargadas`, {
      icon: "✨",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50 flex items-center justify-center p-4">
      {/* Patrón decorativo de fondo */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-orange-200 rounded-full blur-3xl opacity-20 transform translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-red-200 rounded-full blur-3xl opacity-20 transform -translate-x-1/2 translate-y-1/2" />
      </div>

      <div className="relative w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        {/* Panel izquierdo - Información */}
        <div className="hidden lg:flex flex-col justify-center space-y-8 p-8">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-100 border border-orange-200 mb-6 animate-fade-in">
              <Sparkles className="w-4 h-4 text-orange-600" />
              <span className="text-sm font-semibold text-orange-700">
                Plataforma #1 en empleos sin experiencia
              </span>
            </div>
            <h1 className="text-5xl font-black text-gray-900 mb-6 leading-tight animate-slide-up">
              Conecta tu{" "}
              <span className="text-gradient-orange">futuro laboral</span>
            </h1>
            <p className="text-lg text-gray-600 leading-relaxed animate-slide-up">
              Únete a miles de candidatos que han encontrado su primer empleo
              o empresas que descubren talento joven.
            </p>
          </div>

          {/* Features */}
          <div className="space-y-4">
            {[
              {
                icon: Briefcase,
                title: "Miles de oportunidades",
                description: "Empleos diseñados para personas sin experiencia",
              },
              {
                icon: Users,
                title: "Proceso simplificado",
                description: "Postulación rápida en menos de 2 minutos",
              },
              {
                icon: CheckCircle2,
                title: "100% verificado",
                description: "Todas las empresas son validadas por nosotros",
              },
            ].map((feature, idx) => (
              <div
                key={idx}
                className="flex items-start gap-4 animate-slide-up"
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-red-500 shadow-lg shadow-orange-500/30 flex-shrink-0">
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Panel derecho - Formulario */}
        <div className="relative animate-scale-in">
          <div className="bg-white rounded-3xl shadow-2xl border border-gray-200 p-8 md:p-10">
            {/* Tabs Login/Registro */}
            <div className="flex gap-2 p-1 bg-gray-100 rounded-xl mb-8">
              <button
                onClick={() => handleTabChange(true)}
                disabled={isLoading}
                className={`flex-1 py-3 px-4 rounded-lg font-semibold text-sm transition-all duration-300 ${
                  isLogin
                    ? "bg-white text-gray-900 shadow-md"
                    : "text-gray-600 hover:text-gray-900"
                } disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                Iniciar sesión
              </button>
              <button
                onClick={() => handleTabChange(false)}
                disabled={isLoading}
                className={`flex-1 py-3 px-4 rounded-lg font-semibold text-sm transition-all duration-300 ${
                  !isLogin
                    ? "bg-white text-gray-900 shadow-md"
                    : "text-gray-600 hover:text-gray-900"
                } disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                Registrarse
              </button>
            </div>

            {/* Selector de tipo de usuario (solo en registro) */}
            {!isLogin && (
              <div className="mb-6 animate-fade-in">
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  ¿Cómo te quieres registrar?
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setUserType("candidate")}
                    disabled={isLoading}
                    className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                      userType === "candidate"
                        ? "border-orange-500 bg-orange-50 scale-105"
                        : "border-gray-200 hover:border-gray-300"
                    } disabled:opacity-50 disabled:cursor-not-allowed`}
                  >
                    <User
                      className={`w-6 h-6 mx-auto mb-2 transition-colors ${
                        userType === "candidate"
                          ? "text-orange-600"
                          : "text-gray-400"
                      }`}
                    />
                    <p
                      className={`text-sm font-semibold ${
                        userType === "candidate"
                          ? "text-orange-600"
                          : "text-gray-600"
                      }`}
                    >
                      Candidato
                    </p>
                  </button>
                  <button
                    type="button"
                    onClick={() => setUserType("company")}
                    disabled={isLoading}
                    className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                      userType === "company"
                        ? "border-orange-500 bg-orange-50 scale-105"
                        : "border-gray-200 hover:border-gray-300"
                    } disabled:opacity-50 disabled:cursor-not-allowed`}
                  >
                    <Building2
                      className={`w-6 h-6 mx-auto mb-2 transition-colors ${
                        userType === "company"
                          ? "text-orange-600"
                          : "text-gray-400"
                      }`}
                    />
                    <p
                      className={`text-sm font-semibold ${
                        userType === "company"
                          ? "text-orange-600"
                          : "text-gray-600"
                      }`}
                    >
                      Empresa
                    </p>
                  </button>
                </div>
              </div>
            )}

            {/* Formulario */}
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Nombre (solo registro) */}
              {!isLogin && (
                <div className="animate-fade-in">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    {userType === "candidate"
                      ? "Nombre completo"
                      : "Nombre de contacto"}
                  </label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      disabled={isLoading}
                      placeholder="Ingresa tu nombre"
                      className={`w-full pl-12 pr-4 py-3 rounded-xl border transition-all ${
                        errors.name && touched.name
                          ? "border-red-500 focus:ring-red-500/20 focus:border-red-500"
                          : "border-gray-300 focus:ring-orange-500/20 focus:border-orange-500"
                      } focus:outline-none focus:ring-2 disabled:opacity-50 disabled:cursor-not-allowed`}
                    />
                    {errors.name && touched.name && (
                      <div className="flex items-center gap-1 mt-1.5 text-red-600 text-xs animate-fade-in">
                        <AlertCircle className="w-3 h-3" />
                        <span>{errors.name}</span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Nombre de empresa (solo registro empresa) */}
              {!isLogin && userType === "company" && (
                <div className="animate-fade-in">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Nombre de la empresa
                  </label>
                  <div className="relative">
                    <Building2 className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      name="companyName"
                      value={formData.companyName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      disabled={isLoading}
                      placeholder="Nombre de tu empresa"
                      className={`w-full pl-12 pr-4 py-3 rounded-xl border transition-all ${
                        errors.companyName && touched.companyName
                          ? "border-red-500 focus:ring-red-500/20 focus:border-red-500"
                          : "border-gray-300 focus:ring-orange-500/20 focus:border-orange-500"
                      } focus:outline-none focus:ring-2 disabled:opacity-50 disabled:cursor-not-allowed`}
                    />
                    {errors.companyName && touched.companyName && (
                      <div className="flex items-center gap-1 mt-1.5 text-red-600 text-xs animate-fade-in">
                        <AlertCircle className="w-3 h-3" />
                        <span>{errors.companyName}</span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Email */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Correo electrónico
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    disabled={isLoading}
                    placeholder="correo@ejemplo.com"
                    className={`w-full pl-12 pr-4 py-3 rounded-xl border transition-all ${
                      errors.email && touched.email
                        ? "border-red-500 focus:ring-red-500/20 focus:border-red-500"
                        : "border-gray-300 focus:ring-orange-500/20 focus:border-orange-500"
                    } focus:outline-none focus:ring-2 disabled:opacity-50 disabled:cursor-not-allowed`}
                  />
                  {errors.email && touched.email && (
                    <div className="flex items-center gap-1 mt-1.5 text-red-600 text-xs animate-fade-in">
                      <AlertCircle className="w-3 h-3" />
                      <span>{errors.email}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Contraseña */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Contraseña
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    disabled={isLoading}
                    placeholder="••••••••"
                    className={`w-full pl-12 pr-12 py-3 rounded-xl border transition-all ${
                      errors.password && touched.password
                        ? "border-red-500 focus:ring-red-500/20 focus:border-red-500"
                        : "border-gray-300 focus:ring-orange-500/20 focus:border-orange-500"
                    } focus:outline-none focus:ring-2 disabled:opacity-50 disabled:cursor-not-allowed`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    disabled={isLoading}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors disabled:opacity-50"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                  {errors.password && touched.password && (
                    <div className="flex items-center gap-1 mt-1.5 text-red-600 text-xs animate-fade-in">
                      <AlertCircle className="w-3 h-3" />
                      <span>{errors.password}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Botón Submit */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full relative inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl text-base font-bold text-white bg-gradient-to-r from-orange-500 to-red-500 shadow-lg shadow-orange-500/30 hover:shadow-xl hover:shadow-orange-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 overflow-hidden group disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Procesando...</span>
                  </>
                ) : (
                  <>
                    <span className="relative z-10">
                      {isLogin ? "Iniciar sesión" : "Crear cuenta"}
                    </span>
                    <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform duration-300" />
                  </>
                )}
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
              </button>
            </form>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-gray-500 font-medium">
                  Usuarios de prueba
                </span>
              </div>
            </div>

            {/* Botones de demo */}
            <div className="space-y-2">
              <button
                type="button"
                onClick={() => handleDemoClick("candidate")}
                disabled={isLoading}
                className="w-full py-2.5 px-4 rounded-lg border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                <User className="w-4 h-4" />
                Probar como Candidato
              </button>
              <button
                type="button"
                onClick={() => handleDemoClick("company")}
                disabled={isLoading}
                className="w-full py-2.5 px-4 rounded-lg border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                <Building2 className="w-4 h-4" />
                Probar como Empresa
              </button>
            </div>

            {/* Footer */}
            {isLogin && (
              <p className="text-center text-sm text-gray-600 mt-6 animate-fade-in">
                ¿Olvidaste tu contraseña?{" "}
                <button
                  type="button"
                  className="text-orange-600 hover:text-orange-700 font-semibold transition-colors"
                  disabled={isLoading}
                >
                  Recupérala aquí
                </button>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}