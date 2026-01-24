import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Loader2 } from "lucide-react";

// Componente de carga
const LoadingScreen = () => (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 via-white to-red-50">
    <div className="text-center">
      <Loader2 className="w-12 h-12 text-orange-500 animate-spin mx-auto mb-4" />
      <p className="text-gray-600 font-medium">Cargando...</p>
    </div>
  </div>
);

// Ruta protegida básica (requiere estar autenticado)
export const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <LoadingScreen />;
  }

  if (!user) {
    // Redirigir a auth guardando la ubicación actual
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  return children;
};

// Ruta protegida solo para candidatos
export const CandidateRoute = ({ children }) => {
  const { user, loading, isCandidate } = useAuth();
  const location = useLocation();

  if (loading) {
    return <LoadingScreen />;
  }

  if (!user) {
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  if (!isCandidate()) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center p-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 mb-4">
            <span className="text-3xl">⛔</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Acceso denegado
          </h2>
          <p className="text-gray-600 mb-6">
            Esta página es solo para candidatos
          </p>
          <button
            onClick={() => window.history.back()}
            className="px-6 py-2.5 rounded-lg text-sm font-semibold text-white bg-gradient-to-r from-orange-500 to-red-500 hover:scale-105 transition-transform"
          >
            Volver
          </button>
        </div>
      </div>
    );
  }

  return children;
};

// Ruta protegida solo para empresas
export const CompanyRoute = ({ children }) => {
  const { user, loading, isCompany } = useAuth();
  const location = useLocation();

  if (loading) {
    return <LoadingScreen />;
  }

  if (!user) {
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  if (!isCompany()) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center p-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 mb-4">
            <span className="text-3xl">⛔</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Acceso denegado
          </h2>
          <p className="text-gray-600 mb-6">
            Esta página es solo para empresas
          </p>
          <button
            onClick={() => window.history.back()}
            className="px-6 py-2.5 rounded-lg text-sm font-semibold text-white bg-gradient-to-r from-orange-500 to-red-500 hover:scale-105 transition-transform"
          >
            Volver
          </button>
        </div>
      </div>
    );
  }

  return children;
};

// Ruta pública (solo para no autenticados, como login/register)
// Redirige al home o dashboard si ya está logueado
export const PublicRoute = ({ children }) => {
  const { user, loading, isCompany } = useAuth();
  const location = useLocation();

  if (loading) {
    return <LoadingScreen />;
  }

  if (user) {
    // Redirigir según el tipo de usuario
    const from = location.state?.from?.pathname;
    
    // Si viene de una página específica, ir ahí
    if (from && from !== '/auth') {
      return <Navigate to={from} replace />;
    }
    
    // Si es empresa, ir al panel de empresa
    if (isCompany()) {
      return <Navigate to="/empresa" replace />;
    }
    
    // Si es candidato, ir al home
    return <Navigate to="/" replace />;
  }

  return children;
};

// Nueva: Ruta que permite tanto usuarios autenticados como no autenticados
// Útil para páginas como Home, Empresas, etc.
export const PublicWithOptionalAuth = ({ children }) => {
  const { loading } = useAuth();

  if (loading) {
    return <LoadingScreen />;
  }

  // Permite acceso a todos (con o sin autenticación)
  return children;
};