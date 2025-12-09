import React, { createContext, useContext } from 'react';

const AuthContext = createContext(null);

/**
 * Proveedor de autenticación para envolver la app.
 * Recibe value con:
 * - user: usuario actual o null
 * - login: función para loguear
 * - logout: función para cerrar sesión
 */
export const AuthProvider = ({ children, value }) => {
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

/**
 * Hook para acceder fácilmente al contexto de autenticación.
 */
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe usarse dentro de un AuthProvider');
  }
  return context;
};
