import type { AnchorHTMLAttributes, ReactNode } from "react";

// Extends all native <a> props (href, target, rel, onClick, etc.) with our
// own styling options, so this component can be used anywhere a plain
// <a> could be, plus variant control.
export type NavLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
    variant?: "primary" | "secondary";
    icon?: ReactNode;
    iconPosition?: "right" | "left"; // default "right" (icon after text), but can be set to "left" (icon before text) if desired
};

// NavLink variants
const variantClasses: Record<NonNullable<NavLinkProps["variant"]>, string> = {
    primary: "text-text-secondary hover:text-text-tertiary",
    secondary: "text-text-primary hover:text-text-tertiary",
}

// 
export const NavLink = ({
    className = "",
    variant = "primary", // default look
    icon,
    iconPosition = "right", // default position
    children,
    ...props // any remaining native anchor props (href, target, rel, onClick, aria-*, etc.) get spread onto the <a>
}: NavLinkProps) => {
    return (
        <a
            className={`inline-flex items-center gap-2 font-poppins font-semibold tracking-[0.32px] transition-colors ${variantClasses[variant]} ${className}`}
            {...props}
        >
            {icon && iconPosition === "left" && icon}
            {children}
            {icon && iconPosition === "right" && icon}
        </a>
    );
};