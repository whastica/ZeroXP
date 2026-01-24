/**
 * Hook useAuthSubmit
 * Maneja el submit de login y registro con redirección correcta
 */

import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

export function useAuthSubmit({ isLogin, userType, formData, validateForm }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, register, user } = useAuth();

  const submit = async (setIsLoading) => {
    // Validar formulario
    if (!validateForm()) {
      toast.error("Por favor corrige los errores en el formulario");
      return;
    }

    setIsLoading(true);

    // Delay simulado para UX
    await new Promise((r) => setTimeout(r, 800));

    try {
      if (isLogin) {
        // ==================== LOGIN ====================
        const success = await login(formData.email, formData.password);
        
        if (!success) {
          throw new Error("Credenciales inválidas");
        }

        // Pequeño delay para asegurar que el estado del user se actualice
        await new Promise((r) => setTimeout(r, 200));

        // Obtener la ruta de donde venía (si existe)
        const from = location.state?.from?.pathname;

        // Determinar a dónde redirigir según el tipo de usuario
        let redirectPath = "/";

        // Necesitamos verificar el user actualizado desde localStorage
        // porque el estado de React puede no haberse actualizado aún
        const storedUser = localStorage.getItem("auth_user");
        if (storedUser) {
          const userData = JSON.parse(storedUser);
          
          if (userData.user_type === "company") {
            redirectPath = "/empresa";
            toast.success(`¡Bienvenido ${userData.profile?.companyName}! 🏢`);
          } else if (userData.user_type === "candidate") {
            // Si venía de una ruta específica, ir ahí
            if (from && from !== "/auth") {
              redirectPath = from;
            } else {
              redirectPath = "/";
            }
            toast.success(`¡Bienvenido ${userData.profile?.name}! 🎉`);
          }
        } else {
          toast.success("¡Bienvenido de nuevo!");
        }

        console.log("📍 Redirigiendo a:", redirectPath);
        navigate(redirectPath, { replace: true });

      } else {
        // ==================== REGISTRO ====================
        const userData = {
          email: formData.email,
          password: formData.password,
          user_type: userType,
          ...(userType === "candidate"
            ? { name: formData.name }
            : { 
                name: formData.contactName || formData.name,
                companyName: formData.companyName 
              }
          ),
        };

        const result = await register(userData);

        if (!result.success) {
          throw new Error(result.message || "Error al crear cuenta");
        }

        // Pequeño delay para asegurar que el estado se actualice
        await new Promise((r) => setTimeout(r, 200));

        // Determinar a dónde redirigir después del registro
        let redirectPath = "/";

        if (userType === "company") {
          redirectPath = "/empresa";
          toast.success("¡Cuenta de empresa creada exitosamente! 🏢");
        } else {
          // Para candidatos, ir al onboarding
          redirectPath = "/onboarding";
          toast.success("¡Cuenta creada! Completa tu perfil 🎯");
        }

        console.log("📍 Redirigiendo a:", redirectPath);
        navigate(redirectPath, { replace: true });
      }

    } catch (err) {
      console.error("❌ Error en auth:", err);
      toast.error(err.message || "Ocurrió un error");
    } finally {
      setIsLoading(false);
    }
  };

  return { submit };
}