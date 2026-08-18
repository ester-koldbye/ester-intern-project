import type { ComponentPropsWithRef } from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/styles/utils";

/**
 * A single link in a breadcrumb trail, e.g. `Home / Country / City / Recommendation`.
 *
 * Every item — including the current page — renders as a link; `isActive`
 * only changes its color to orange and marks it `aria-current="page"`, it
 * does not change the underlying element. Each item renders its own trailing
 * "/" separator so consumers don't have to interleave a separate element
 * between links; pass `showSeparator={false}` on the last item in a trail.
 */

const breadcrumbItemVariants = cva(
  "font-poppins font-regular text-sm leading-sm transition-colors",
  {
    variants: {
      isActive: {
        true: "text-text-tertiary hover:font-semibold",
        false: "text-text-primary hover:font-semibold hover:text-text-tertiary",
      },
    },
    defaultVariants: {
      isActive: false,
    },
  },
);

export type BreadcrumbItemProps = ComponentPropsWithRef<"a"> &
  VariantProps<typeof breadcrumbItemVariants> & {
    asChild?: boolean;
    /** Renders a trailing "/" separator after the link. Default true; set to false on the last item in a breadcrumb trail. */
    showSeparator?: boolean;
  };

export const BreadcrumbItem = ({
  isActive = false,
  asChild = false,
  showSeparator = true,
  className,
  children,
  ref,
  ...props
}: BreadcrumbItemProps) => {
  const Comp = asChild ? Slot : "a";

  return (
    <>
      <Comp
        data-slot="breadcrumb-item"
        aria-current={isActive ? "page" : undefined}
        className={cn(breadcrumbItemVariants({ isActive, className }))}
        ref={ref}
        {...props}
      >
        {children}
      </Comp>
      {/* Slot requires a single child, so asChild consumers own their own separator. */}
      {showSeparator && !asChild && (
        <span aria-hidden="true" className="mx-2 text-text-primary">
          /
        </span>
      )}
    </>
  );
};

BreadcrumbItem.displayName = "BreadcrumbItem";
