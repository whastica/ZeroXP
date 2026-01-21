import React from "react";

export default function AuthTabs({ isLogin, onChange }) {
  return (
    <div className="flex mb-6 rounded-lg bg-gray-100 p-1">
      <button
        type="button"
        onClick={() => onChange(true)}
        className={`flex-1 py-2 text-sm font-semibold rounded-md transition-all ${
          isLogin
            ? "bg-white text-gray-900 shadow"
            : "text-gray-500 hover:text-gray-700"
        }`}
      >
        Iniciar sesión
      </button>

      <button
        type="button"
        onClick={() => onChange(false)}
        className={`flex-1 py-2 text-sm font-semibold rounded-md transition-all ${
          !isLogin
            ? "bg-white text-gray-900 shadow"
            : "text-gray-500 hover:text-gray-700"
        }`}
      >
        Registrarse
      </button>
    </div>
  );
}
