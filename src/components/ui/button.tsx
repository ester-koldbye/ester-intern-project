import type { ButtonHTMLAttributes } from "react";

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "tertiary" | "quaternary";
  size?: "S" | "M" | "L";
};

const variantClasses: Record<NonNullable<ButtonProps["variant"]>, string> = {
  // Orange with white text
  primary: "border-2 border-orange bg-orange text-text-secondary hover:bg-transparent",

  // White with black text
  secondary: "border-2 border-white bg-white text-text-primary hover:bg-orange",
  
  // Orange border with black text
  tertiary: "border-2 border-orange bg-transparent text-text-primary hover:bg-orange",
  
  // Orange border with white text
  quaternary: "border-2 border-orange bg-transparent text-text-secondary hover:bg-orange",
};

// Font size/line-height pulled from the theme.css design tokens (Figma "Font size" / "Line height" groups).
const sizeClasses: Record<NonNullable<ButtonProps["size"]>, string> = {
  S: "min-w-28 px-4 py-3 text-sm leading-2xs",
  M: "min-w-35 px-5.5 py-4.5 text-button leading-xs",
  L: "min-w-40 px-7 py-5 text-md leading-lg",
};

export const Button = ({
  className = "",
  variant = "primary",
  size = "M",
  children,
  ...props
}: ButtonProps) => {
  return (
    <button
      className={`inline-flex cursor-pointer items-center justify-center rounded-[30px] border-solid font-poppins font-semibold tracking-[0.32px] transition-colors ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
