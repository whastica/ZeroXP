import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { AuthProvider, useAuth } from "./context/AuthContext";
import {
  ProtectedRoute,
  CandidateRoute,
  CompanyRoute,
  PublicRoute,
} from "./components/ProtectedRoute";
import { isOnboardingCompleted } from "./services/UserService";

// Components
import Navbar from "./components/Navbar";

// Pages - Public
import Home from "./pages/Home";
import AuthPage from "./pages/AuthPage";

// Pages - Candidates
import MyApplications from "./pages/MyApplications";
import OnboardingPage from "./pages/OnboardingPage";
// import SavedJobs from "./pages/SavedJobs";
// import Profile from "./pages/Profile";
// import Settings from "./pages/Settings";

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
          <Navbar />
          <Routes>
            {/* ==================== RUTAS PÚBLICAS ==================== */}
            <Route 
              path="/" 
              element={
                <RequireOnboarding>
                  <Home />
                </RequireOnboarding>
              } 
            />
            <Route
              path="/auth"
              element={
                <PublicRoute>
                  <AuthPage />
                </PublicRoute>
              }
            />
            {/* Directorio de empresas (accesible para todos) */}
            <Route 
              path="/companies" 
              element={
                <RequireOnboarding>
                  <CompaniesPage />
                </RequireOnboarding>
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

            {/* ==================== RUTAS PROTEGIDAS (TODOS) ==================== */}
            <Route
              path="/profile"
              element={
                <RequireOnboarding>
                  <ProtectedRoute>
                    {/* <Profile /> */}
                    <div className="container-custom py-20 text-center">
                      <h1 className="text-3xl font-bold">Perfil</h1>
                      <p className="text-gray-600 mt-4">Página en construcción</p>
                    </div>
                  </ProtectedRoute>
                </RequireOnboarding>
              }
            />
            <Route
              path="/settings"
              element={
                <RequireOnboarding>
                  <ProtectedRoute>
                    {/* <Settings /> */}
                    <div className="container-custom py-20 text-center">
                      <h1 className="text-3xl font-bold">Configuración</h1>
                      <p className="text-gray-600 mt-4">Página en construcción</p>
                    </div>
                  </ProtectedRoute>
                </RequireOnboarding>
              }
            />

            {/* ==================== RUTAS SOLO CANDIDATOS ==================== */}
            <Route
              path="/saved-jobs"
              element={
                <RequireOnboarding>
                  <CandidateRoute>
                    {/* <SavedJobs /> */}
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
              path="/applications"
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
              path="/company/dashboard"
              element={
                <CompanyRoute>
                  <CompanyDashboard />
                </CompanyRoute>
              }
            />
            {/* Gestión de ofertas de la empresa */}
            <Route
              path="/company/offers"
              element={
                <CompanyRoute>
                  <CompanyOffersPage />
                </CompanyRoute>
              }
            />
            {/* Alias para compatibilidad - redirige a /company/offers */}
            <Route
              path="/my-jobs"
              element={
                <CompanyRoute>
                  <CompanyOffersPage />
                </CompanyRoute>
              }
            />

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