import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import AuthForm from "../components/auth/AuthForm";
import { useAuthForm } from "../hooks/useAuthForm";
import { useAuthSubmit } from "../hooks/useAuthSubmit";
import { usePasswordRecovery } from "../hooks/usePasswordRecovery";
import PasswordRecoveryModal from "../components/auth/PasswordRecoveryModal";

const AuthPage = () => {
  const location = useLocation();
  
  // Leer el modo desde location.state, por defecto "login"
  const initialMode = location.state?.mode === "register" ? false : true;
  
  const [isLogin, setIsLogin] = useState(initialMode);
  const [userType, setUserType] = useState("candidate");
  const [isLoading, setIsLoading] = useState(false);

  // Actualizar isLogin cuando cambie el estado de navegación
  useEffect(() => {
    if (location.state?.mode) {
      setIsLogin(location.state.mode === "login");
    }
  }, [location.state]);

  const toggleMode = () => setIsLogin((prev) => !prev);

  const { formData, errors, handleChange, validateForm } = useAuthForm({
    isLogin,
    userType,
  });

  const { submit } = useAuthSubmit({
    isLogin,
    userType,
    formData,
    validateForm,
  });

  const recovery = usePasswordRecovery();

  const handleSubmit = (e) => {
    e.preventDefault();
    submit(setIsLoading);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-md p-6">
        <AuthForm
          isLogin={isLogin}
          userType={userType}
          formData={formData}
          errors={errors}
          isLoading={isLoading}
          onChange={handleChange}
          onSubmit={handleSubmit}
          onUserTypeChange={setUserType}
          onToggleMode={toggleMode}
          recovery={{
            isOpen: recovery.isOpen,
            email: recovery.email,
            onEmailChange: recovery.setEmail,
            onClose: recovery.closeModal,
            onSubmit: (e) => {
              e.preventDefault();
              recovery.submitRecovery();
            },
            isLoading: recovery.isLoading,
            openModal: recovery.openModal,
          }}
        />
      </div>
      <PasswordRecoveryModal
        isOpen={recovery.isOpen}
        email={recovery.email}
        onEmailChange={recovery.setEmail}
        onClose={recovery.closeModal}
        onSubmit={(e) => {
          e.preventDefault();
          recovery.submitRecovery();
        }}
        isLoading={recovery.isLoading}
      />
    </div>
  );
};

export default AuthPage;