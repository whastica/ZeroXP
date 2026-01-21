import {
  Shield,
  ShieldAlert,
  ShieldCheck,
} from "lucide-react";

/**
 * Calcula la fuerza de una contraseña.
 * @param {string} password
 * @returns {{
 *  strength: number,
 *  label: string,
 *  color: string,
 *  icon: any,
 *  checks: {
 *    length: boolean,
 *    uppercase: boolean,
 *    lowercase: boolean,
 *    number: boolean,
 *    special: boolean
 *  }
 * }}
 */
export function calculatePasswordStrength(password) {
  if (!password) {
    return {
      strength: 0,
      label: "",
      color: "",
      icon: ShieldAlert,
      checks: {},
    };
  }

  let strength = 0;

  const checks = {
    length: password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    number: /[0-9]/.test(password),
    special: /[^A-Za-z0-9]/.test(password),
  };

  if (checks.length) strength += 20;
  if (checks.uppercase) strength += 20;
  if (checks.lowercase) strength += 20;
  if (checks.number) strength += 20;
  if (checks.special) strength += 20;

  let label = "";
  let color = "";
  let icon = ShieldAlert;

  if (strength <= 40) {
    label = "Débil";
    color = "bg-red-500";
    icon = ShieldAlert;
  } else if (strength <= 60) {
    label = "Media";
    color = "bg-yellow-500";
    icon = Shield;
  } else if (strength <= 80) {
    label = "Fuerte";
    color = "bg-blue-500";
    icon = ShieldCheck;
  } else {
    label = "Muy fuerte";
    color = "bg-green-500";
    icon = ShieldCheck;
  }

  return { strength, label, color, icon, checks };
}
