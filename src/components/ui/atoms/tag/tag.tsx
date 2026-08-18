import type { ComponentPropsWithRef } from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/styles/utils";

/**
 * Small uppercase pill label, e.g. a category badge overlaid on an image.
 *
 * Figma only defines two versions: a dark fill with white text, and a white
 * fill with dark text — one flat `variant` axis bundling both background and
 * text color together, the same way Button's variants do.
 */

const tagVariants = cva(
  "inline-flex items-center rounded-sm p-1 font-poppins text-xs leading-xs font-bold tracking-[0.24px] uppercase",
  {
    variants: {
      variant: {
        dark: "bg-icon-primary text-text-secondary",
        light: "bg-white text-text-primary",
      },
    },
    defaultVariants: {
      variant: "dark",
    },
  },
);

export type TagProps = ComponentPropsWithRef<"span"> &
  VariantProps<typeof tagVariants> & {
    asChild?: boolean;
  };

export const Tag = ({
  variant,
  asChild = false,
  className,
  children,
  ref,
  ...props
}: TagProps) => {
  const Comp = asChild ? Slot : "span";

  return (
    <Comp
      data-slot="tag"
      className={cn(tagVariants({ variant, className }))}
      ref={ref}
      {...props}
    >
      {children}
    </Comp>
  );
};

Tag.displayName = "Tag";
