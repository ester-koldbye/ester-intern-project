import type { ComponentPropsWithRef } from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/styles/utils";

const buttonVariants = cva(
  "inline-flex cursor-pointer items-center justify-center rounded-[30px] border-solid font-poppins font-semibold tracking-[0.32px] transition-colors",
  {
    variants: {
      variant: {
        primary: "border-2 border-orange bg-orange text-text-secondary hover:transparent",
        secondary: "border-2 border-white bg-white text-text-primary hover:bg-orange",
        outline: "border-2 border-orange bg-transparent hover:bg-orange",
      },
      textColor: {
        dark: "text-text-primary",
        light: "text-text-secondary",
      },
      size: {
        S: "min-w-28 px-4 py-3 text-sm leading-2xs",
        M: "min-w-35 px-5.5 py-4.5 text-base leading-xs",
        L: "min-w-40 px-7 py-5 text-md leading-lg",
      },
    },
    compoundVariants: [
      { variant: "outline", textColor: "dark", className: "hover:text-text-primary" },
      { variant: "outline", textColor: "light", className: "hover:text-text-secondary" },

      {variant: "primary", textColor: "dark", className: "hover:text-text-primary"},
      {variant: "primary", textColor: "light", className: "hover:text-text-secondary"},
    ],
    defaultVariants: {
      variant: "primary",
      textColor: "dark",
      size: "M",
    },
  },
);

// Extends all native <button> props (onClick, disabled, type, etc.) with our
// own styling options, so this component can be used anywhere a plain
// <button> could be, plus variant/size control.
export type ButtonProps = ComponentPropsWithRef<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  };

export const Button = ({
  variant,
  textColor,
  size,
  asChild = false,
  className,
  children,
  ref,
  ...props // any remaining native button props (onClick, disabled, type, aria-*, etc.) get spread onto the <button>
}: ButtonProps) => {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      className={cn(buttonVariants({ variant, textColor, size, className }))}
      ref={ref}
      {...props}
    >
      {children}
    </Comp>
  );
};

Button.displayName = "Button";
