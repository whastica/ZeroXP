import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import ThemeToggle from './ThemeToggle';
import MobileMenu from './MobileMenu.jsx';

export default function Navigation() {
  const { user, logout, isCandidate, isCompany } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);

  // Links dinámicos según el tipo de usuario
  const getLinks = () => {
    const baseLinks = [
      { name: 'Inicio', path: '/' },
      { name: 'Empresas', path: '/empresas' }
    ];

    if (!user) return baseLinks;

    // Links para candidatos
    if (isCandidate()) {
      return [
        ...baseLinks,
        { name: 'Mis Aplicaciones', path: '/mis-aplicaciones' },
        { name: 'Trabajos Guardados', path: '/guardados' }
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
  };

  return (
    <nav className="bg-white dark:bg-gray-900 shadow sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-bold text-orange-600 dark:text-orange-400">
              ZeroXp
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden sm:flex sm:items-center sm:space-x-6">
            {links.map(link => (
              <NavLink
                key={link.name}
                to={link.path}
                className={({ isActive }) =>
                  `text-gray-700 dark:text-gray-200 hover:text-orange-600 dark:hover:text-orange-400 font-medium transition-colors ${
                    isActive ? 'text-orange-600 dark:text-orange-400 underline underline-offset-4' : ''
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}

            {/* User Menu */}
            {user ? (
              <div className="flex items-center space-x-3 ml-4">
                {/* User Avatar/Name */}
                <div className="flex items-center space-x-2">
                  <img
                    src={user.profile?.avatar || user.profile?.logo || 'https://api.dicebear.com/7.x/avataaars/svg?seed=default'}
                    alt={user.profile?.name || user.profile?.companyName}
                    className="w-8 h-8 rounded-full border-2 border-orange-500"
                  />
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
                    {user.profile?.name || user.profile?.companyName}
                  </span>
                </div>

                {/* Logout Button */}
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 rounded-lg bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white text-sm font-semibold transition-all hover:scale-105"
                >
                  Cerrar Sesión
                </button>
              </div>
            ) : (
              <Link
                to="/auth"
                className="ml-4 px-4 py-2 rounded-lg bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white text-sm font-semibold transition-all hover:scale-105"
              >
                Iniciar Sesión
              </Link>
            )}

            <ThemeToggle />
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center space-x-2 sm:hidden">
            <ThemeToggle />
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none"
              aria-label="Toggle menu"
            >
              <svg
                className="h-6 w-6"
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
          onLogout={handleLogout}
          onClose={() => setMobileOpen(false)}
        />
      )}
    </nav>
  );
}