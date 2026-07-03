import { C } from "../constants/colors";

type Variant = "primary" | "secondary" | "ghost" | "danger";
type Size = "sm" | "md";

interface Props {
  children?: React.ReactNode;
  variant?: Variant;
  size?: Size;
  icon?: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
}

const variantStyles: Record<Variant, string> = {
  primary:   "text-white hover:opacity-90",
  secondary: "border hover:bg-gray-50",
  ghost:     "hover:bg-gray-100",
  danger:    "text-white hover:opacity-90",
};

export function Btn({ children, variant = "primary", size = "md", icon, onClick, disabled }: Props) {
  const sizeClass = size === "sm" ? "px-3 py-1.5 text-xs" : "px-4 py-2 text-sm";
  const bg =
    variant === "primary"   ? C.blue :
    variant === "danger"    ? C.red  : "transparent";
  const borderColor = variant === "secondary" ? C.border : "transparent";
  const textColor =
    variant === "secondary" ? C.text :
    variant === "ghost"     ? C.muted : undefined;

  return (
    <button
      className={`inline-flex items-center gap-2 font-medium rounded-lg transition-all cursor-pointer ${sizeClass} ${variantStyles[variant]}`}
      style={{ backgroundColor: bg, border: `1px solid ${borderColor}`, color: textColor }}
      onClick={onClick}
      disabled={disabled}
    >
      {icon && icon}
      {children}
    </button>
  );
}
