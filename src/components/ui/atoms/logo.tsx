import type { HTMLAttributes } from "react";

// Text-only logo for now. Extends native <span> props so it behaves like
// any other inline element (className, aria-*, etc.), with a size option
// on top for use in different contexts (e.g. header vs. footer).
export type LogoProps = HTMLAttributes<HTMLSpanElement> & {
    variant?: "primary" | "secondary";
    size?: "S" | "M" | "L";
};

// Logo variants
const variantClasses: Record<NonNullable<LogoProps["variant"]>, string> = {
    primary: "text-text-secondary",
    secondary: "text-text-primary",
}

// Logo sizes
const sizeClasses: Record<NonNullable<LogoProps["size"]>, string> = {
  S: "text-sm",
  M: "text-md",
  L: "text-xl",
};

export const Logo = ({
  className = "",
  variant = "primary",
  size = "M",
  children,
  ...props
}: LogoProps) => {
  return (
    <span
      className={`font-poppins font-bold tracking-[0.32px] ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      {...props}
    >
      {children}
    </span>
  );
};
