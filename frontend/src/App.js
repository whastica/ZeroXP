import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { AuthProvider, useAuth } from "./context/AuthContext";
import {
  ProtectedRoute,
  CandidateRoute,
  CompanyRoute,
  PublicRoute,
  PublicWithOptionalAuth,
} from "./components/ProtectedRoute";
import { isOnboardingCompleted } from "./services/UserService";

// Components
import Navigation from "./components/Navigation";

// Pages - Public
import Home from "./pages/Home";
import AuthPage from "./pages/AuthPage";

// Pages - Candidates
import MyApplications from "./pages/MyApplications";
import OnboardingPage from "./pages/OnboardingPage";

// Pages - Companies
import CompaniesPage from "./pages/CompaniesPage";
import CompanyDashboard from "./pages/CompanyDashboard";
import CompanyOffersPage from "./pages/CompanyOffersPage";

// ==================== COMPONENTE REQUIREONBOARDING ====================
// Redirige a candidatos sin onboarding completado a /onboarding
const RequireOnboarding = ({ children }) => {
  const { user, isCandidate } = useAuth();

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  // Solo para candidatos: verificar si completó el onboarding
  if (isCandidate() && !isOnboardingCompleted(user.id)) {
    return <Navigate to="/onboarding" replace />;
  }

  return children;
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="App">
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 3000,
              style: {
                background: "#fff",
                color: "#374151",
                borderRadius: "12px",
                padding: "16px",
                boxShadow:
                  "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
              },
              success: {
                iconTheme: {
                  primary: "#f97316",
                  secondary: "#fff",
                },
              },
              error: {
                iconTheme: {
                  primary: "#ef4444",
                  secondary: "#fff",
                },
              },
            }}
          />
          
          <Navigation />

          <Routes>
            {/* ==================== RUTAS PÚBLICAS (SIN LOGIN REQUERIDO) ==================== */}
            
            {/* Home - Accesible para todos */}
            <Route 
              path="/" 
              element={
                <PublicWithOptionalAuth>
                  <Home />
                </PublicWithOptionalAuth>
              } 
            />

            {/* Auth - Solo para usuarios NO logueados */}
            <Route
              path="/auth"
              element={
                <PublicRoute>
                  <AuthPage />
                </PublicRoute>
              }
            />

            {/* Directorio de empresas - Accesible para todos */}
            <Route 
              path="/empresas" 
              element={
                <PublicWithOptionalAuth>
                  <CompaniesPage />
                </PublicWithOptionalAuth>
              } 
            />

            {/* ==================== ONBOARDING (SOLO CANDIDATOS) ==================== */}
            <Route
              path="/onboarding"
              element={
                <CandidateRoute>
                  <OnboardingPage />
                </CandidateRoute>
              }
            />

            {/* ==================== RUTAS PROTEGIDAS - REQUIEREN LOGIN Y ONBOARDING ==================== */}

            {/* Perfil */}
            <Route
              path="/perfil"
              element={
                <RequireOnboarding>
                  <ProtectedRoute>
                    <div className="container-custom py-20 text-center">
                      <h1 className="text-3xl font-bold">Perfil</h1>
                      <p className="text-gray-600 mt-4">Página en construcción</p>
                    </div>
                  </ProtectedRoute>
                </RequireOnboarding>
              }
            />

            {/* Configuración */}
            <Route
              path="/configuracion"
              element={
                <RequireOnboarding>
                  <ProtectedRoute>
                    <div className="container-custom py-20 text-center">
                      <h1 className="text-3xl font-bold">Configuración</h1>
                      <p className="text-gray-600 mt-4">Página en construcción</p>
                    </div>
                  </ProtectedRoute>
                </RequireOnboarding>
              }
            />

            {/* ==================== RUTAS SOLO CANDIDATOS ==================== */}

            {/* Empleos Guardados */}
            <Route
              path="/guardados"
              element={
                <RequireOnboarding>
                  <CandidateRoute>
                    <div className="container-custom py-20 text-center">
                      <h1 className="text-3xl font-bold">Empleos Guardados</h1>
                      <p className="text-gray-600 mt-4">Página en construcción</p>
                    </div>
                  </CandidateRoute>
                </RequireOnboarding>
              }
            />

            {/* Mis Aplicaciones */}
            <Route
              path="/mis-aplicaciones"
              element={
                <RequireOnboarding>
                  <CandidateRoute>
                    <MyApplications />
                  </CandidateRoute>
                </RequireOnboarding>
              }
            />

            {/* ==================== RUTAS SOLO EMPRESAS ==================== */}

            {/* Dashboard de empresa */}
            <Route
              path="/empresa"
              element={
                <CompanyRoute>
                  <CompanyDashboard />
                </CompanyRoute>
              }
            />

            {/* Gestión de ofertas de la empresa */}
            <Route
              path="/empresa/ofertas"
              element={
                <CompanyRoute>
                  <CompanyOffersPage />
                </CompanyRoute>
              }
            />

            {/* ==================== REDIRECTS LEGACY ==================== */}
            <Route path="/applications" element={<Navigate to="/mis-aplicaciones" replace />} />
            <Route path="/saved-jobs" element={<Navigate to="/guardados" replace />} />
            <Route path="/profile" element={<Navigate to="/perfil" replace />} />
            <Route path="/settings" element={<Navigate to="/configuracion" replace />} />
            <Route path="/companies" element={<Navigate to="/empresas" replace />} />
            <Route path="/company/dashboard" element={<Navigate to="/empresa" replace />} />
            <Route path="/company/offers" element={<Navigate to="/empresa/ofertas" replace />} />
            <Route path="/my-jobs" element={<Navigate to="/empresa/ofertas" replace />} />

            {/* ==================== 404 NOT FOUND ==================== */}
            <Route
              path="*"
              element={
                <div className="min-h-screen flex items-center justify-center bg-gray-50">
                  <div className="text-center">
                    <h1 className="text-6xl font-black text-gray-900 mb-4">
                      404
                    </h1>
                    <p className="text-xl text-gray-600 mb-8">
                      Página no encontrada
                    </p>
                    <a
                      href="/"
                      className="px-6 py-3 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-orange-500 to-red-500 hover:scale-105 transition-transform inline-block"
                    >
                      Volver al inicio
                    </a>
                  </div>
                </div>
              }
            />
          </Routes>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;