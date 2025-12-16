import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./context/AuthContext";
import {
  ProtectedRoute,
  CandidateRoute,
  CompanyRoute,
  PublicRoute,
} from "./components/ProtectedRoute";

// Components
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import AuthPage from "./pages/AuthPage";
// import SavedJobs from "./pages/SavedJobs";
// import Applications from "./pages/Applications";
// import Profile from "./pages/Profile";
// import MyJobs from "./pages/MyJobs"; // Para empresas
// import Settings from "./pages/Settings";

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
            {/* Rutas públicas */}
            <Route path="/" element={<Home />} />

            <Route
              path="/auth"
              element={
                <PublicRoute>
                  <AuthPage />
                </PublicRoute>
              }
            />

            {/* Rutas protegidas (cualquier usuario autenticado) */}
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  {/* <Profile /> */}
                  <div className="container-custom py-20 text-center">
                    <h1 className="text-3xl font-bold">Perfil</h1>
                    <p className="text-gray-600 mt-4">Página en construcción</p>
                  </div>
                </ProtectedRoute>
              }
            />

            <Route
              path="/settings"
              element={
                <ProtectedRoute>
                  {/* <Settings /> */}
                  <div className="container-custom py-20 text-center">
                    <h1 className="text-3xl font-bold">Configuración</h1>
                    <p className="text-gray-600 mt-4">Página en construcción</p>
                  </div>
                </ProtectedRoute>
              }
            />

            {/* Rutas solo para candidatos */}
            <Route
              path="/saved-jobs"
              element={
                <CandidateRoute>
                  {/* <SavedJobs /> */}
                  <div className="container-custom py-20 text-center">
                    <h1 className="text-3xl font-bold">Empleos Guardados</h1>
                    <p className="text-gray-600 mt-4">Página en construcción</p>
                  </div>
                </CandidateRoute>
              }
            />

            <Route
              path="/applications"
              element={
                <CandidateRoute>
                  {/* <Applications /> */}
                  <div className="container-custom py-20 text-center">
                    <h1 className="text-3xl font-bold">Mis Aplicaciones</h1>
                    <p className="text-gray-600 mt-4">Página en construcción</p>
                  </div>
                </CandidateRoute>
              }
            />

            {/* Rutas solo para empresas */}
            <Route
              path="/my-jobs"
              element={
                <CompanyRoute>
                  {/* <MyJobs /> */}
                  <div className="container-custom py-20 text-center">
                    <h1 className="text-3xl font-bold">Mis Ofertas de Empleo</h1>
                    <p className="text-gray-600 mt-4">Página en construcción</p>
                  </div>
                </CompanyRoute>
              }
            />

            {/* 404 Not Found */}
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