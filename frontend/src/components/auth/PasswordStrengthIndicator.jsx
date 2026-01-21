import React from "react";
import { CheckCircle2 } from "lucide-react";

export default function PasswordStrengthIndicator({ strengthData }) {
  if (!strengthData) return null;

  const {
    strength,
    label,
    color,
    icon: Icon,
    checks = {},
  } = strengthData;

  return (
    <div className="mt-3 space-y-2 animate-fade-in">
      <div className="flex items-center gap-3">
        <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className={`h-full ${color} transition-all duration-300`}
            style={{ width: `${strength}%` }}
          />
        </div>

        <div className="flex items-center gap-1.5 min-w-[100px]">
          <Icon className="w-4 h-4" />
          <span className="text-xs font-semibold">{label}</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 text-xs">
        <Check label="Mínimo 8 caracteres" active={checks.length} />
        <Check label="Mayúscula" active={checks.uppercase} />
        <Check label="Número" active={checks.number} />
        <Check label="Carácter especial" active={checks.special} />
      </div>
    </div>
  );
}

function Check({ label, active }) {
  return (
    <div className={`flex items-center gap-1.5 ${active ? "text-green-600" : "text-gray-400"}`}>
      <CheckCircle2 className="w-3 h-3" />
      <span>{label}</span>
    </div>
  );
}
