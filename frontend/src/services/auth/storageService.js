/**
 * Storage Service
 * Abstracción para manejo de localStorage con manejo de errores
 */

const STORAGE_KEYS = {
  AUTH_USER: 'auth_user',
  THEME: 'theme',
};

class StorageService {
  /**
   * Guarda un item en localStorage
   * @param {string} key - Clave del item
   * @param {any} value - Valor a guardar (se serializa automáticamente)
   * @returns {boolean} - True si se guardó exitosamente
   */
  setItem(key, value) {
    try {
      const serializedValue = JSON.stringify(value);
      localStorage.setItem(key, serializedValue);
      return true;
    } catch (error) {
      console.error(`Error guardando ${key} en localStorage:`, error);
      return false;
    }
  }

  /**
   * Obtiene un item de localStorage
   * @param {string} key - Clave del item
   * @returns {any|null} - Valor deserializado o null
   */
  getItem(key) {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.error(`Error leyendo ${key} de localStorage:`, error);
      return null;
    }
  }

  /**
   * Elimina un item de localStorage
   * @param {string} key - Clave del item
   * @returns {boolean} - True si se eliminó exitosamente
   */
  removeItem(key) {
    try {
      localStorage.removeItem(key);
      return true;
    } catch (error) {
      console.error(`Error eliminando ${key} de localStorage:`, error);
      return false;
    }
  }

  /**
   * Limpia todo el localStorage
   * @returns {boolean}
   */
  clear() {
    try {
      localStorage.clear();
      return true;
    } catch (error) {
      console.error('Error limpiando localStorage:', error);
      return false;
    }
  }

  /**
   * Verifica si una clave existe
   * @param {string} key
   * @returns {boolean}
   */
  hasItem(key) {
    return localStorage.getItem(key) !== null;
  }
}

// Exportar instancia única (Singleton)
export const storageService = new StorageService();
export { STORAGE_KEYS };