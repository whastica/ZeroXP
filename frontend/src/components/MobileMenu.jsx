import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { LogOut, Settings, User, Building2 } from 'lucide-react';

export default function MobileMenu({ links, user, isCandidate, isCompany, onLogout, onClose }) {
  return (
    <div className="md:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 shadow">
      {/* User Header (si hay sesión) */}
      {user && (
        <div className="px-4 py-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
          <div className="flex items-center gap-3">
            <img
              src={isCandidate() ? user.profile?.avatar : user.profile?.logo}
              alt="Avatar"
              className="w-10 h-10 rounded-full border-2 border-orange-500"
            />
            <div>
              <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                {isCandidate() ? user.profile?.name : user.profile?.companyName}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">{user.email}</p>
            </div>
          </div>
        </div>
      )}

      {/* Navigation Links */}
      <div className="px-3 py-3 space-y-1">
        {links.map(link => (
          <NavLink
            key={link.name}
            to={link.path}
            className={({ isActive }) =>
              `block px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400'
                  : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800'
              }`
            }
            onClick={onClose}
          >
            {link.name}
          </NavLink>
        ))}
      </div>

      {/* User Options (si hay sesión) */}
      {user && (
        <>
          <div className="px-3 py-2 space-y-1 border-t border-gray-200 dark:border-gray-700">
            <Link
              to="/perfil"
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              onClick={onClose}
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
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              onClick={onClose}
            >
              <Settings className="w-4 h-4" />
              Configuración
            </Link>
          </div>

          {/* Logout Button */}
          <div className="px-3 py-2 border-t border-gray-200 dark:border-gray-700">
            <button
              onClick={() => {
                onLogout();
                onClose();
              }}
              className="flex items-center gap-3 w-full px-4 py-3 rounded-lg text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              Cerrar sesión
            </button>
          </div>
        </>
      )}

      {/* Sin sesión */}
      {!user && (
        <div className="px-3 py-3 border-t border-gray-200 dark:border-gray-700">
          <Link
            to="/auth"
            className="block w-full px-4 py-3 rounded-lg text-sm font-semibold text-white bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 transition-all text-center"
            onClick={onClose}
          >
            Registrarse
          </Link>
        </div>
      )}
    </div>
  );
}
