import type { ComponentPropsWithRef, ElementType } from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/styles/utils";

/**
 * Headings, with semantics and appearance as separate props.
 *
 * `level` picks the element (h1–h4) and `size` picks how big it looks. They
 * are deliberately independent. Document outlines have to nest without
 * skipping — an h2 cannot follow an h4 — while layouts routinely want a small
 * h2 or a large h3. Tying the two together turns every visual exception into
 * a heading-order bug, and heading order is how screen reader users navigate
 * a page.
 *
 *   <Heading level={2} size="2xl">  // an h2 that reads as a page title
 *   <Heading level={2} size="md">   // an h2 that sits quietly in a card
 *
 * `level` has no default — it's the one decision that can't be made correctly
 * from inside this component, since it depends on what surrounds the heading.
 * `size` does default, derived from `level`, so the common case stays short;
 * passing `size` explicitly always wins.
 *
 * `size` is named after the theme token it applies (`2xl` → `text-2xl`), so
 * the prop value tells you exactly which token is in play.
 */

const headingVariants = cva("font-poppins tracking-[0.32px]", {
  variants: {
    variant: {
      primary: "text-text-primary",
      secondary: "text-text-secondary",
      tertiary: "text-text-tertiary",
      quaternary: "text-text-quaternary",
    },
    size: {
      "2xl": "text-2xl",
      xl: "text-xl",
      lg: "text-lg",
      md: "text-md",
    },
    weight: {
      regular: "font-regular",
      semibold: "font-semibold",
      bold: "font-bold",
    },
  },
  defaultVariants: {
    variant: "primary",
    weight: "bold",
  },
});

type HeadingSize = NonNullable<VariantProps<typeof headingVariants>["size"]>;

export type HeadingLevel = 1 | 2 | 3 | 4;

/** Element per level, as a lookup rather than a built-up string, so the union stays typed. */
const LEVEL_TAGS: Record<HeadingLevel, ElementType> = {
  1: "h1",
  2: "h2",
  3: "h3",
  4: "h4",
};

/** Sensible default appearance for each level, overridden by an explicit `size`. */
const LEVEL_SIZES: Record<HeadingLevel, HeadingSize> = {
  1: "2xl",
  2: "xl",
  3: "lg",
  4: "md",
};

export type HeadingProps = ComponentPropsWithRef<"h1"> &
  VariantProps<typeof headingVariants> & {
    asChild?: boolean;
    level?: HeadingLevel;
  };

export const Heading = ({
  level,
  size,
  variant,
  weight,
  asChild = false,
  className,
  children,
  ref,
  ...props
}: HeadingProps) => {
  const Comp = asChild ? Slot : level ? LEVEL_TAGS[level] : "h2";

  return (
    <Comp
      data-slot="heading"
      className={cn(headingVariants({ size: size ?? (level ? LEVEL_SIZES[level] : "2xl"), variant, weight, className }))}
      ref={ref}
      {...props}
    >
      {children}
    </Comp>
  );
};

Heading.displayName = "Heading";
