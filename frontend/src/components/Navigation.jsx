import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import MobileMenu from './MobileMenu.jsx';
import { LogOut, Settings, User, Building2 } from 'lucide-react';

export default function Navigation() {
  const { user, logout, isCandidate, isCompany } = useAuth();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  // Links dinámicos según el tipo de usuario
  const getLinks = () => {
    const baseLinks = [
      { name: 'Inicio', path: '/' }
    ];

    if (!user) return baseLinks;

    // Links para candidatos
    if (isCandidate()) {
      return [
        ...baseLinks,
        { name: 'Mis Aplicaciones', path: '/mis-aplicaciones' }
      ];
    }

    // Links para empresas
    if (isCompany()) {
      return [
        ...baseLinks,
        { name: 'Panel Empresa', path: '/empresa' },
        { name: 'Mis Ofertas', path: '/empresa/ofertas' }
      ];
    }

    return baseLinks;
  };

  const links = getLinks();

  const handleLogout = () => {
    logout();
    setMobileOpen(false);
    setShowUserMenu(false);
  };

  const closeMobileMenu = () => {
    setMobileOpen(false);
  };

  const handleLogin = () => {
    navigate('/auth', { state: { mode: 'login' } });
  };

  const handleRegister = () => {
    navigate('/auth', { state: { mode: 'register' } });
  };

  return (
    <nav className="bg-white dark:bg-gray-900 shadow sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-orange-600 dark:text-orange-400">
            ZeroXp
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:gap-1">
            {links.map(link => (
              <NavLink
                key={link.name}
                to={link.path}
                className={({ isActive }) =>
                  `px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive 
                      ? 'bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400' 
                      : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </div>

          {/* User Section */}
          <div className="flex items-center gap-3">
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  title={isCandidate() ? user.profile?.name : user.profile?.companyName}
                >
                  <img
                    src={isCandidate() ? user.profile?.avatar : user.profile?.logo}
                    alt="Avatar"
                    className="w-8 h-8 rounded-full border-2 border-orange-500"
                  />
                </button>

                {/* Dropdown Menu */}
                {showUserMenu && (
                  <>
                    <div
                      className="fixed inset-0 z-40"
                      onClick={() => setShowUserMenu(false)}
                    />
                    <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-900 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-2 z-50">
                      {/* Header */}
                      <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                        <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                          {isCandidate() ? user.profile?.name : user.profile?.companyName}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{user.email}</p>
                      </div>

                      {/* Options */}
                      <Link
                        to="/perfil"
                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                        onClick={() => setShowUserMenu(false)}
                      >
                        {isCandidate() ? (
                          <User className="w-4 h-4" />
                        ) : (
                          <Building2 className="w-4 h-4" />
                        )}
                        Mi perfil
                      </Link>

                      <Link
                        to="/configuracion"
                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                        onClick={() => setShowUserMenu(false)}
                      >
                        <Settings className="w-4 h-4" />
                        Configuración
                      </Link>

                      {/* Separator */}
                      <div className="border-t border-gray-200 dark:border-gray-700 mt-2 pt-2">
                        <button
                          onClick={handleLogout}
                          className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
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
                <button
                  onClick={handleLogin}
                  className="hidden sm:block px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
                >
                  Iniciar sesión
                </button>
                <button
                  onClick={handleRegister}
                  className="px-5 py-2 rounded-lg text-sm font-semibold text-white bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 transition-all"
                >
                  Registrarse
                </button>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Toggle menu"
            >
              <svg
                className="h-6 w-6 text-gray-700 dark:text-gray-200"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {mobileOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      {mobileOpen && (
        <MobileMenu 
          links={links} 
          user={user}
          isCandidate={isCandidate}
          isCompany={isCompany}
          onLogout={handleLogout}
          onClose={closeMobileMenu}
        />
      )}
    </nav>
  );
}