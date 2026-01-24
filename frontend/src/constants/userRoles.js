/**
 * Constantes de Roles de Usuario
 */

export const USER_ROLES = {
  CANDIDATE: 'candidate',
  COMPANY: 'company',
  ADMIN: 'admin',
};

export const USER_ROLE_LABELS = {
  [USER_ROLES.CANDIDATE]: 'Candidato',
  [USER_ROLES.COMPANY]: 'Empresa',
  [USER_ROLES.ADMIN]: 'Administrador',
};

/**
 * Verifica si un usuario tiene un rol específico
 * @param {Object} user - Usuario a verificar
 * @param {string} role - Rol a verificar
 * @returns {boolean}
 */
export const hasRole = (user, role) => {
  return user?.user_type === role;
};

/**
 * Verifica si el usuario es candidato
 * @param {Object} user
 * @returns {boolean}
 */
export const isCandidate = (user) => {
  return hasRole(user, USER_ROLES.CANDIDATE);
};

/**
 * Verifica si el usuario es empresa
 * @param {Object} user
 * @returns {boolean}
 */
export const isCompany = (user) => {
  return hasRole(user, USER_ROLES.COMPANY);
};

/**
 * Verifica si el usuario es admin
 * @param {Object} user
 * @returns {boolean}
 */
export const isAdmin = (user) => {
  return hasRole(user, USER_ROLES.ADMIN);
};