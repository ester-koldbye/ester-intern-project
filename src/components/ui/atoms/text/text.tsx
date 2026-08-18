import type { ComponentPropsWithRef } from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/styles/utils";

/**
 * Body copy, captions, and inline runs of text.
 *
 * `as` is restricted to a small set of plain text containers rather than being
 * fully polymorphic. Every option here takes the same props and carries no
 * implicit semantics beyond "this is text" — widening it invites e.g.
 * `<Text as="button">`, which would quietly produce an unfocusable control.
 * `asChild` stays as the escape hatch for anything outside that set (a router
 * Link, a custom component), matching every other atom in this design system.
 *
 * `size` and `weight` are named after the theme tokens they apply (`sm` →
 * `text-sm`, `base` → `text-base`, `md` → `text-md`), so the prop value tells
 * you exactly which token is in play without a lookup table.
 */

const textVariants = cva("font-poppins", {
  variants: {
    variant: {
      primary: "text-text-primary",
      secondary: "text-text-secondary",
      tertiary: "text-text-tertiary",
      quaternary: "text-text-quaternary",
    },
    // sm: 14px/18px. base: 16px/16px, the only size with letter-spacing in
    // Figma. md: 20px/24px. (No lg/xl — those are Heading's sizes.)
    size: {
      sm: "text-sm leading-sm",
      base: "text-base leading-xs tracking-[0.32px]",
      md: "text-md leading-lg",
    },
    weight: {
      regular: "font-regular",
      semibold: "font-semibold",
      bold: "font-bold",
    },
  },
  defaultVariants: {
    variant: "primary",
    size: "sm",
    weight: "regular",
  },
});

/** Elements that are purely text containers and share the same prop surface. */
type TextElement = "p" | "span" | "div" | "figcaption";

export type TextProps = ComponentPropsWithRef<"p"> &
  VariantProps<typeof textVariants> & {
    as?: TextElement;
    asChild?: boolean;
  };

export const Text = ({
  as = "p",
  variant,
  size,
  weight,
  asChild = false,
  className,
  children,
  ref,
  ...props
}: TextProps) => {
  const Comp = asChild ? Slot : as;

  return (
    <Comp
      data-slot="text"
      className={cn(textVariants({ variant, size, weight, className }))}
      ref={ref}
      {...props}
    >
      {children}
    </Comp>
  );
};

Text.displayName = "Text";
