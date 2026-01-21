import { useState } from 'react';

export const useAuthForm = (isLogin, userType) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    companyName: '',
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  // Validación de email
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) return 'El correo es requerido';
    if (!emailRegex.test(email)) return 'Ingresa un correo válido';
    return '';
  };

  // Validación de contraseña
  const validatePassword = (password) => {
    if (!password) return 'La contraseña es requerida';
    if (password.length < 6) return 'Mínimo 6 caracteres';
    return '';
  };

  // Validación de nombre
  const validateName = (name) => {
    if (!name) return 'El nombre es requerido';
    if (name.length < 2) return 'Mínimo 2 caracteres';
    return '';
  };

  // Validación de nombre de empresa
  const validateCompanyName = (companyName) => {
    if (!companyName) return 'El nombre de la empresa es requerido';
    if (companyName.length < 2) return 'Mínimo 2 caracteres';
    return '';
  };

  // Validar campo específico
  const validateField = (name, value) => {
    let error = '';

    switch (name) {
      case 'email':
        error = validateEmail(value);
        break;
      case 'password':
        error = validatePassword(value);
        break;
      case 'name':
        error = validateName(value);
        break;
      case 'companyName':
        error = validateCompanyName(value);
        break;
      default:
        break;
    }

    return error;
  };

  // Validar todo el formulario
  const validateForm = () => {
    const newErrors = {};

    // Email y password siempre son requeridos
    newErrors.email = validateEmail(formData.email);
    newErrors.password = validatePassword(formData.password);

    // Validaciones adicionales para registro
    if (!isLogin) {
      newErrors.name = validateName(formData.name);
      
      if (userType === 'company') {
        newErrors.companyName = validateCompanyName(formData.companyName);
      }
    }

    // Filtrar errores vacíos
    const filteredErrors = Object.entries(newErrors).reduce((acc, [key, value]) => {
      if (value) acc[key] = value;
      return acc;
    }, {});

    setErrors(filteredErrors);
    return Object.keys(filteredErrors).length === 0;
  };

  // Manejar cambio de input
  const handleChange = (e) => {
    const { name, value } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));

    // Validar en tiempo real si el campo ya fue tocado
    if (touched[name]) {
      const error = validateField(name, value);
      setErrors(prev => ({
        ...prev,
        [name]: error,
      }));
    }
  };

  // Manejar blur (cuando el usuario sale del campo)
  const handleBlur = (e) => {
    const { name, value } = e.target;
    
    setTouched(prev => ({
      ...prev,
      [name]: true,
    }));

    const error = validateField(name, value);
    setErrors(prev => ({
      ...prev,
      [name]: error,
    }));
  };

  // Resetear formulario
  const resetForm = () => {
    setFormData({
      email: '',
      password: '',
      name: '',
      companyName: '',
    });
    setErrors({});
    setTouched({});
  };

  // Llenar credenciales de demo
  const fillDemoCredentials = (type) => {
    if (type === 'candidate') {
      setFormData({
        email: 'juan@example.com',
        password: 'password123',
        name: '',
        companyName: '',
      });
    } else {
      setFormData({
        email: 'contacto@techcorp.com',
        password: 'password123',
        name: '',
        companyName: '',
      });
    }
    setErrors({});
    setTouched({});
  };

  return {
    formData,
    errors,
    touched,
    handleChange,
    handleBlur,
    validateForm,
    resetForm,
    fillDemoCredentials,
    setFormData,
  };
};