import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import ThemeToggle from './ThemeToggle'; // asumiendo que ya lo tienes
import MobileMenu from './MobileMenu.jsx';   // opcional, para menu mobile

export default function Navigation({ user, onLogout }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const links = [
    { name: 'Inicio', path: '/' },
    ...(user?.user_type === 'company' ? [{ name: 'Panel Empresa', path: '/empresa' }] : [])
  ];

  return (
    <nav className="bg-white dark:bg-gray-900 shadow sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-bold text-orange-600 dark:text-orange-400">
              ZeroXp
            </Link>
          </div>

          <div className="hidden sm:flex sm:items-center sm:space-x-6">
            {links.map(link => (
              <NavLink
                key={link.name}
                to={link.path}
                className={({ isActive }) =>
                  `text-gray-700 dark:text-gray-200 hover:text-orange-600 dark:hover:text-orange-400 font-medium ${
                    isActive ? 'underline underline-offset-4' : ''
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}

            {user ? (
              <button
                onClick={onLogout}
                className="ml-4 px-3 py-1 rounded bg-red-500 hover:bg-red-600 text-white text-sm"
              >
                Cerrar Sesión
              </button>
            ) : (
              <Link
                to="/login"
                className="ml-4 px-3 py-1 rounded bg-green-500 hover:bg-green-600 text-white text-sm"
              >
                Iniciar Sesión
              </Link>
            )}

            <ThemeToggle />
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center sm:hidden">
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none"
            >
              <span className="sr-only">Abrir menú</span>
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
        <MobileMenu links={links} user={user} onLogout={onLogout} />
      )}
    </nav>
  );
}
