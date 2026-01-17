import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  Briefcase,
  User,
  LogOut,
  Menu,
  X,
  Settings,
  BookmarkIcon,
  FileText,
  Building2,
  Home,
} from "lucide-react";

export default function Navbar() {
  const { user, logout, isCandidate, isCompany } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/auth");
    setShowUserMenu(false);
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="container-custom">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-red-500 shadow-lg shadow-orange-500/30 group-hover:scale-110 transition-transform duration-300">
              <Briefcase className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-black text-gray-900 hidden sm:block">
              ZeroXP
            </span>
          </Link>

          {/* Navigation Links - Desktop */}
          <div className="hidden md:flex items-center gap-1">
            <Link
              to="/"
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                isActive("/")
                  ? "bg-orange-50 text-orange-600"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              <Home className="w-4 h-4" />
              Inicio
            </Link>

            {/* Mostrar "Mis aplicaciones" solo para candidatos en navbar desktop */}
            {isCandidate() && (
              <Link
                to="/applications"
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActive("/applications")
                    ? "bg-orange-50 text-orange-600"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                }`}
              >
                <FileText className="w-4 h-4" />
                Mis aplicaciones
              </Link>
            )}

            {/* Mostrar "Mis ofertas" para empresas */}
            {isCompany() && (
              <Link
                to="/my-jobs"
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActive("/my-jobs")
                    ? "bg-orange-50 text-orange-600"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                }`}
              >
                <FileText className="w-4 h-4" />
                Mis ofertas
              </Link>
            )}
          </div>

          {/* User Section */}
          <div className="flex items-center gap-3">
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-gray-50 transition-all duration-200"
                >
                  <img
                    src={
                      isCandidate()
                        ? user.profile.avatar
                        : user.profile.logo
                    }
                    alt="Avatar"
                    className="w-9 h-9 rounded-full border-2 border-orange-500"
                  />
                  <div className="hidden sm:block text-left">
                    <p className="text-sm font-semibold text-gray-900 leading-tight">
                      {isCandidate()
                        ? user.profile.name
                        : user.profile.companyName}
                    </p>
                    <p className="text-xs text-gray-500">
                      {isCandidate() ? "Candidato" : "Empresa"}
                    </p>
                  </div>
                </button>

                {/* Dropdown Menu */}
                {showUserMenu && (
                  <>
                    <div
                      className="fixed inset-0 z-40"
                      onClick={() => setShowUserMenu(false)}
                    />
                    <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-200 py-2 z-50">
                      <div className="px-4 py-3 border-b border-gray-100">
                        <p className="text-sm font-semibold text-gray-900">
                          {isCandidate()
                            ? user.profile.name
                            : user.profile.companyName}
                        </p>
                        <p className="text-xs text-gray-500">{user.email}</p>
                      </div>

                      <Link
                        to="/profile"
                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                        onClick={() => setShowUserMenu(false)}
                      >
                        {isCandidate() ? (
                          <User className="w-4 h-4" />
                        ) : (
                          <Building2 className="w-4 h-4" />
                        )}
                        Mi perfil
                      </Link>

                      {isCandidate() && (
                        <Link
                          to="/applications"
                          className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                          onClick={() => setShowUserMenu(false)}
                        >
                          <FileText className="w-4 h-4" />
                          Mis aplicaciones
                        </Link>
                      )}

                      <Link
                        to="/settings"
                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                        onClick={() => setShowUserMenu(false)}
                      >
                        <Settings className="w-4 h-4" />
                        Configuración
                      </Link>

                      <div className="border-t border-gray-100 mt-2 pt-2">
                        <button
                          onClick={handleLogout}
                          className="flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors w-full"
                        >
                          <LogOut className="w-4 h-4" />
                          Cerrar sesión
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  to="/auth"
                  className="hidden sm:block px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
                >
                  Iniciar sesión
                </Link>
                <Link
                  to="/auth"
                  className="px-5 py-2 rounded-lg text-sm font-semibold text-white bg-gradient-to-r from-orange-500 to-red-500 shadow-md shadow-orange-500/30 hover:shadow-lg hover:shadow-orange-500/40 hover:scale-105 transition-all duration-300"
                >
                  Registrarse
                </Link>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              {showMobileMenu ? (
                <X className="w-6 h-6 text-gray-600" />
              ) : (
                <Menu className="w-6 h-6 text-gray-600" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {showMobileMenu && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <div className="space-y-1">
              <Link
                to="/"
                className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                  isActive("/")
                    ? "bg-orange-50 text-orange-600"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
                onClick={() => setShowMobileMenu(false)}
              >
                <Home className="w-5 h-5" />
                Inicio
              </Link>

              {isCandidate() && (
                <Link
                  to="/applications"
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                    isActive("/applications")
                      ? "bg-orange-50 text-orange-600"
                      : "text-gray-600 hover:bg-gray-50"
                  }`}
                  onClick={() => setShowMobileMenu(false)}
                >
                  <FileText className="w-5 h-5" />
                  Mis aplicaciones
                </Link>
              )}

              {isCompany() && (
                <Link
                  to="/my-jobs"
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                    isActive("/my-jobs")
                      ? "bg-orange-50 text-orange-600"
                      : "text-gray-600 hover:bg-gray-50"
                  }`}
                  onClick={() => setShowMobileMenu(false)}
                >
                  <FileText className="w-5 h-5" />
                  Mis ofertas
                </Link>
              )}

              {!user && (
                <Link
                  to="/auth"
                  className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors sm:hidden"
                  onClick={() => setShowMobileMenu(false)}
                >
                  <User className="w-5 h-5" />
                  Iniciar sesión
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}