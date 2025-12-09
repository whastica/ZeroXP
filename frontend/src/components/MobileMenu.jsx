import React from 'react';
import { Link, NavLink } from 'react-router-dom';

export default function MobileMenu({ links, user, onLogout }) {
  return (
    <div className="sm:hidden bg-white dark:bg-gray-900 px-4 pt-2 pb-4 space-y-1 shadow">
      {links.map(link => (
        <NavLink
          key={link.name}
          to={link.path}
          className={({ isActive }) =>
            `block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 ${
              isActive ? 'underline' : ''
            }`
          }
        >
          {link.name}
        </NavLink>
      ))}

      {user ? (
        <button
          onClick={onLogout}
          className="w-full text-left px-3 py-2 rounded-md bg-red-500 text-white hover:bg-red-600"
        >
          Cerrar Sesión
        </button>
      ) : (
        <Link
          to="/login"
          className="block px-3 py-2 rounded-md bg-green-500 text-white hover:bg-green-600"
        >
          Iniciar Sesión
        </Link>
      )}
    </div>
  );
}
