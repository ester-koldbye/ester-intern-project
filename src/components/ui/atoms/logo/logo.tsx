import type { ComponentPropsWithRef } from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/styles/utils";

// Site logo/wordmark, e.g. "TRAVEL GUIDE" in the header and footer
const logoVariants = cva("font-syne font-bold tracking-[0.32px]", {
  variants: {
    variant: {
      primary: "text-text-secondary",
      secondary: "text-text-primary",
    },
    size: {
      S: "text-base",
      M: "text-md",
      L: "text-xl",
    },
  },
  defaultVariants: {
    variant: "primary",
    size: "M",
  },
});

// Text-only logo for now. Extends native <span> props so it behaves like
// any other inline element (className, aria-*, etc.), with a size option
// on top for use in different contexts (e.g. header vs. footer).
export type LogoProps = ComponentPropsWithRef<"span"> &
  VariantProps<typeof logoVariants> & {
    asChild?: boolean;
  };

export const Logo = ({
  variant,
  size,
  asChild = false,
  className,
  children,
  ref,
  ...props
}: LogoProps) => {
  const Comp = asChild ? Slot : "span";

  return (
    <Comp
      className={cn(logoVariants({ variant, size, className }))}
      ref={ref}
      {...props}
    >
      {children}
    </Comp>
  );
};

Logo.displayName = "Logo";
