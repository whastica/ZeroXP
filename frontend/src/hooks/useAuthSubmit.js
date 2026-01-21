import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export function useAuthSubmit({ isLogin, userType, formData, validateForm }) {
  const { login, register } = useAuth();
  const navigate = useNavigate();

  const submit = async (setIsLoading) => {
    if (!validateForm()) {
      toast.error("Por favor corrige los errores en el formulario");
      return;
    }

    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 800));

    try {
      if (isLogin) {
        const success = login(formData.email, formData.password);
        if (!success) throw new Error("Credenciales inválidas");
        toast.success("¡Bienvenido de nuevo!");
      } else {
        const result = register({
          ...formData,
          user_type: userType,
        });

        if (!result.success) throw new Error(result.message);
        toast.success("¡Cuenta creada exitosamente!");
      }

      navigate("/");
    } catch (err) {
      toast.error(err.message || "Ocurrió un error");
    } finally {
      setIsLoading(false);
    }
  };

  return { submit };
}
