import type { ComponentPropsWithRef, ReactNode } from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/styles/utils";

const navLinkVariants = cva("inline-flex items-center gap-2 font-poppins font-semibold tracking-[0.32px] transition-colors", {
  variants: {
    variant: {
      primary: "text-text-secondary hover:text-text-tertiary",
      secondary: "text-text-primary hover:text-text-tertiary",
    },
  },
  defaultVariants: {
    variant: "primary",
  },
});

// Extends all native <a> props (href, target, rel, onClick, etc.) with our
// own styling options, so this component can be used anywhere a plain
// <a> could be, plus variant control.
export type NavLinkProps = ComponentPropsWithRef<"a"> &
  VariantProps<typeof navLinkVariants> & {
    asChild?: boolean;
    icon?: ReactNode;
    iconPosition?: "right" | "left"; // default "right" (icon after text), but can be set to "left" (icon before text) if desired
  };

export const NavLink = ({
  variant,
  asChild = false,
  icon,
  iconPosition = "right", // default position
  className,
  children,
  ref,
  ...props // any remaining native anchor props (href, target, rel, onClick, aria-*, etc.) get spread onto the <a>
}: NavLinkProps) => {
  const Comp = asChild ? Slot : "a";

  return (
    <Comp
      className={cn(navLinkVariants({ variant, className }))}
      ref={ref}
      {...props}
    >
      {asChild ? (
        children
      ) : (
        <>
          {icon && iconPosition === "left" && icon}
          {children}
          {icon && iconPosition === "right" && icon}
        </>
      )}
    </Comp>
  );
};

NavLink.displayName = "NavLink";
