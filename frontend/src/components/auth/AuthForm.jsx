import { Mail, User, Building2 } from "lucide-react";
import PasswordInput from "./PasswordInput";
import PasswordStrengthIndicator from "./PasswordStrengthIndicator";
import { calculatePasswordStrength } from "@/utils/auth/passwordStrength";

const AuthForm = ({
  isLogin,
  userType,
  formData,
  errors,
  isLoading,
  onChange,
  onSubmit,
  onUserTypeChange,
  onToggleMode,
  recovery,
}) => {
  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <h2 className="text-2xl font-bold text-center text-gray-900">
        {isLogin ? "Iniciar sesión" : "Crear cuenta"}
      </h2>

      {/* Selector tipo usuario */}
      {!isLogin && (
        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => onUserTypeChange("candidate")}
            className={`p-3 rounded-lg border-2 transition ${
              userType === "candidate"
                ? "border-orange-500 bg-orange-50 text-orange-600"
                : "border-gray-200 text-gray-600"
            }`}
          >
            <User className="w-5 h-5 mx-auto mb-1" />
            Candidato
          </button>

          <button
            type="button"
            onClick={() => onUserTypeChange("company")}
            className={`p-3 rounded-lg border-2 transition ${
              userType === "company"
                ? "border-orange-500 bg-orange-50 text-orange-600"
                : "border-gray-200 text-gray-600"
            }`}
          >
            <Building2 className="w-5 h-5 mx-auto mb-1" />
            Empresa
          </button>
        </div>
      )}

      {/* Nombre */}
      {!isLogin && (
        <div>
          <label className="block text-sm font-semibold mb-1">
            {userType === "candidate"
              ? "Nombre completo"
              : "Nombre de contacto"}
          </label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              name="name"
              value={formData.name}
              onChange={onChange}
              className="w-full pl-10 pr-3 py-2.5 border rounded-lg"
            />
          </div>
          {errors.name && (
            <p className="text-xs text-red-600 mt-1">{errors.name}</p>
          )}
        </div>
      )}

      {/* Empresa */}
      {!isLogin && userType === "company" && (
        <div>
          <label className="block text-sm font-semibold mb-1">
            Nombre de la empresa
          </label>
          <div className="relative">
            <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              name="companyName"
              value={formData.companyName}
              onChange={onChange}
              className="w-full pl-10 pr-3 py-2.5 border rounded-lg"
            />
          </div>
          {errors.companyName && (
            <p className="text-xs text-red-600 mt-1">
              {errors.companyName}
            </p>
          )}
        </div>
      )}

      {/* Email */}
      <div>
        <label className="block text-sm font-semibold mb-1">
          Correo electrónico
        </label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            name="email"
            type="email"
            value={formData.email}
            onChange={onChange}
            className="w-full pl-10 pr-3 py-2.5 border rounded-lg"
          />
        </div>
        {errors.email && (
          <p className="text-xs text-red-600 mt-1">{errors.email}</p>
        )}
      </div>

      {/* 🔐 Contraseña (MEJORADA) */}
      <div>
        <PasswordInput
          value={formData.password}
          onChange={onChange}
          error={errors.password}
          disabled={isLoading}
        />

        {!isLogin && formData.password && (
          <PasswordStrengthIndicator
            strengthData={calculatePasswordStrength(formData.password)}
          />
        )}
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={isLoading}
        className="w-full py-3 rounded-lg bg-orange-500 text-white font-bold hover:bg-orange-600 disabled:opacity-50"
      >
        {isLoading
          ? "Procesando..."
          : isLogin
          ? "Iniciar sesión"
          : "Crear cuenta"}
      </button>

      {/* Recovery */}
      {isLogin && recovery && (
        <p className="text-center text-sm text-gray-600">
          ¿Olvidaste tu contraseña?{" "}
          <button
            type="button"
            onClick={recovery.openModal} // abre el modal
            className="text-orange-600 font-semibold"
          >
            Recupérala aquí
          </button>
        </p>
      )}

      {/* Toggle */}
      <p className="text-center text-sm">
        {isLogin ? "¿No tienes cuenta?" : "¿Ya tienes cuenta?"}{" "}
        <button
          type="button"
          onClick={onToggleMode} // cambia entre login y register
          className="text-orange-600 font-semibold"
        >
          {isLogin ? "Regístrate" : "Inicia sesión"}
        </button>
      </p>

    </form>
  );
};

export default AuthForm;
