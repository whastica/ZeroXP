import { useState } from "react";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function useAuthForm({ isLogin, userType }) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    companyName: "",
  });

  const [errors, setErrors] = useState({});

  // Validación completa, se puede usar al enviar
  const validateForm = () => {
    const newErrors = {};

    // Email
    if (!formData.email) {
      newErrors.email = "Email requerido";
    } else if (!EMAIL_REGEX.test(formData.email)) {
      newErrors.email = "Email inválido";
    }

    // Password
    if (!formData.password) {
      newErrors.password = "Contraseña requerida";
    } else if (formData.password.length < 6) {
      newErrors.password = "Mínimo 6 caracteres";
    }

    // Registro
    if (!isLogin) {
      if (userType === "candidate" && !formData.name) {
        newErrors.name = "Nombre requerido";
      }
      if (userType === "company" && !formData.companyName) {
        newErrors.companyName = "Nombre de empresa requerido";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Manejo de cambios con validación en tiempo real
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value }));

    // VALIDACIÓN EN TIEMPO REAL
    setErrors((prev) => {
      const newErrors = { ...prev };

      if (name === "email") {
        if (!value) newErrors.email = "Email requerido";
        else if (!EMAIL_REGEX.test(value)) newErrors.email = "Email inválido";
        else delete newErrors.email;
      }

      if (name === "password") {
        if (!value) newErrors.password = "Contraseña requerida";
        else if (value.length < 6) newErrors.password = "Mínimo 6 caracteres";
        else delete newErrors.password;
      }

      if (!isLogin) {
        if (name === "name") {
          if (!value && userType === "candidate") newErrors.name = "Nombre requerido";
          else delete newErrors.name;
        }

        if (name === "companyName") {
          if (!value && userType === "company") newErrors.companyName = "Nombre de empresa requerido";
          else delete newErrors.companyName;
        }
      }

      return newErrors;
    });
  };

  return {
    formData,
    errors,
    handleChange,
    validateForm,
  };
}
