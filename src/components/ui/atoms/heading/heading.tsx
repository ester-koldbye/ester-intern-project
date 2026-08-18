import type { ComponentPropsWithRef, ElementType } from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/styles/utils";

const headingVariants = cva("font-poppins font-bold tracking-[0.32px] text-text-primary", {
  variants: {
    size: {
      MD: "text-md",
      LG: "text-lg",
      XL: "text-xl",
      XXL: "text-2xl",
    },
  },
  defaultVariants: {
    size: "XXL",
  },
});

export type HeadingLevel = 1 | 2 | 3 | 4;

const LEVEL_TAGS: Record<HeadingLevel, ElementType> = {
  1: "h1",
  2: "h2",
  3: "h3",
  4: "h4",
};

const LEVEL_SIZES: Record<HeadingLevel, NonNullable<VariantProps<typeof headingVariants>["size"]>> = {
  1: "XXL",
  2: "XL",
  3: "LG",
  4: "MD",
};

export type HeadingProps = ComponentPropsWithRef<"h1"> &
  VariantProps<typeof headingVariants> & {
    asChild?: boolean;
    level?: HeadingLevel;
  };

export const Heading = ({
  level,
  size,
  asChild = false,
  className,
  children,
  ref,
  ...props
}: HeadingProps) => {
  // `size` is a purely visual override — `level` still decides the rendered
  // tag (h1-h4) so semantics and appearance can be set independently.
  const resolvedSize = size ?? (level ? LEVEL_SIZES[level] : undefined);
  const Comp = asChild ? Slot : level ? LEVEL_TAGS[level] : "h2";

  return (
    <Comp
      data-slot="heading"
      className={cn(headingVariants({ size: resolvedSize, className }))}
      ref={ref}
      {...props}
    >
      {children}
    </Comp>
  );
};

Heading.displayName = "Heading";
