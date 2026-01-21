import React, { useState } from "react";

export default function PasswordInput({
  label = "Contraseña",
  value,
  onChange,
  name = "password",
  placeholder = "••••••••",
  error,
}) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="space-y-1">
      <label className="block text-sm font-medium text-gray-700">
        {label}
      </label>

      <div className="relative">
        <input
          type={showPassword ? "text" : "password"}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
            error
              ? "border-red-500 focus:ring-red-400"
              : "border-gray-300 focus:ring-indigo-400"
          }`}
        />

        <button
          type="button"
          onClick={() => setShowPassword((prev) => !prev)}
          className="absolute inset-y-0 right-3 text-sm text-gray-500 hover:text-gray-700"
        >
          {showPassword ? "Ocultar" : "Mostrar"}
        </button>
      </div>

      {error && (
        <p className="text-sm text-red-600">{error}</p>
      )}
    </div>
  );
}
