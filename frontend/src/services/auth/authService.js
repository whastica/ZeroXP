/**
 * Auth Service
 * Maneja la lógica de autenticación y persistencia
 */

import { authenticateUser, registerUser } from '../../data/mockUsers';
import { storageService, STORAGE_KEYS } from './storageService';

class AuthService {
  /**
   * Autentica un usuario
   * @param {string} email
   * @param {string} password
   * @returns {{success: boolean, user?: Object, error?: string}}
   */
  async login(email, password) {
    try {
      const result = authenticateUser(email, password);
      
      if (result.success) {
        this.persistUser(result.user);
        return { success: true, user: result.user };
      }
      
      return { success: false, error: 'Credenciales inválidas' };
    } catch (error) {
      console.error('Error en login:', error);
      return { success: false, error: 'Error al iniciar sesión' };
    }
  }

  /**
   * Registra un nuevo usuario
   * @param {Object} userData - Datos del usuario
   * @returns {{success: boolean, user?: Object, error?: string}}
   */
  async register(userData) {
    try {
      const result = registerUser(userData);
      
      if (result.success) {
        this.persistUser(result.user);
        return { success: true, user: result.user };
      }
      
      return { success: false, error: result.message || 'Error al registrar' };
    } catch (error) {
      console.error('Error en registro:', error);
      return { success: false, error: 'Error al registrar usuario' };
    }
  }

  /**
   * Cierra sesión del usuario
   * @returns {boolean}
   */
  logout() {
    return storageService.removeItem(STORAGE_KEYS.AUTH_USER);
  }

  /**
   * Obtiene el usuario actual desde el storage
   * @returns {Object|null}
   */
  getCurrentUser() {
    return storageService.getItem(STORAGE_KEYS.AUTH_USER);
  }

  /**
   * Persiste el usuario en localStorage
   * @param {Object} user
   * @returns {boolean}
   */
  persistUser(user) {
    return storageService.setItem(STORAGE_KEYS.AUTH_USER, user);
  }

  /**
   * Actualiza el usuario en storage
   * @param {Object} updatedUser
   * @returns {boolean}
   */
  updateUser(updatedUser) {
    return this.persistUser(updatedUser);
  }

  /**
   * Verifica si hay una sesión activa
   * @returns {boolean}
   */
  isAuthenticated() {
    return storageService.hasItem(STORAGE_KEYS.AUTH_USER);
  }
}

// Exportar instancia única
export const authService = new AuthService();