import type { ButtonHTMLAttributes } from "react";

// Extends all native <button> props (onClick, disabled, type, etc.) with our
// own styling options, so this component can be used anywhere a plain
// <button> could be, plus variant/size control.
export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "tertiary" | "quaternary";
  size?: "S" | "M" | "L";
};

// Button variants
// logic below just does `variantClasses[variant]` instead of a big if/else or switch statement.
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

// Button sizes 
const sizeClasses: Record<NonNullable<ButtonProps["size"]>, string> = {
  S: "min-w-28 px-4 py-3 text-sm leading-2xs",
  M: "min-w-35 px-5.5 py-4.5 text-button leading-xs",
  L: "min-w-40 px-7 py-5 text-md leading-lg",
};


export const Button = ({
  className = "",
  variant = "primary", // default look
  size = "M", // default size
  children,
  ...props // any remaining native button props (onClick, disabled, type, aria-*, etc.) get spread onto the <button>
}: ButtonProps) => {
  return (
    <button
      // Base styles that apply to every button (pill shape, flex centering,
      // font, cursor, hover transition) are combined with the variant- and
      // size-specific classes looked up above. `className` is appended last
      // so a caller can override any of these defaults.
      className={`inline-flex cursor-pointer items-center justify-center rounded-[30px] border-solid font-poppins font-semibold tracking-[0.32px] transition-colors ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
