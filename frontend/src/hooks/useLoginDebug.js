/**
 * Hook temporal para hacer debugging del login
 * Úsalo en AuthPage.jsx para ver qué está pasando
 */

import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export const useLoginDebug = () => {
  const { login, user, isCandidate, isCompany } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (email, password) => {
    console.group('🔐 DEBUG LOGIN');
    console.log('1. Intentando login con:', { email, password: '***' });

    try {
      const success = await login(email, password);
      console.log('2. Resultado del login:', success);

      if (success) {
        console.log('3. Login exitoso ✅');
        
        // Esperar un tick para que el estado se actualice
        setTimeout(() => {
          const currentUser = user;
          console.log('4. Usuario actual:', currentUser);
          console.log('5. Es candidato?', isCandidate());
          console.log('6. Es empresa?', isCompany());

          // Redirigir según el tipo de usuario
          if (isCompany()) {
            console.log('7. Redirigiendo a /empresa');
            toast.success(`¡Bienvenido ${currentUser?.profile?.companyName}!`);
            navigate('/empresa');
          } else if (isCandidate()) {
            console.log('7. Redirigiendo a /');
            toast.success(`¡Bienvenido ${currentUser?.profile?.name}!`);
            navigate('/');
          } else {
            console.warn('7. ⚠️ Usuario sin tipo específico');
            toast.success('¡Bienvenido!');
            navigate('/');
          }
        }, 100);

      } else {
        console.error('3. Login fallido ❌');
        toast.error('Credenciales inválidas');
      }
    } catch (error) {
      console.error('ERROR en login:', error);
      toast.error('Error al iniciar sesión');
    }

    console.groupEnd();
  };

  return { handleLogin };
};