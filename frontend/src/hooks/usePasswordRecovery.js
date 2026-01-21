import { useState } from "react";
import { toast } from "react-hot-toast";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function usePasswordRecovery() {
  const [email, setEmail] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const openModal = () => setIsOpen(true);

  const closeModal = () => {
    setIsOpen(false);
    setEmail("");
  };

  const submitRecovery = async () => {
    if (!EMAIL_REGEX.test(email)) {
      toast.error("Por favor ingresa un correo válido");
      return;
    }

    try {
      setIsLoading(true);

      // Simulación request
      await new Promise((resolve) => setTimeout(resolve, 1500));

      toast.success(
        "Se ha enviado un correo con instrucciones para recuperar tu contraseña",
        {
          duration: 4000,
        }
      );

      closeModal();
    } catch {
      toast.error("Error al enviar el correo de recuperación");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    email,
    setEmail,
    isOpen,
    isLoading,
    openModal,
    closeModal,
    submitRecovery,
  };
}
