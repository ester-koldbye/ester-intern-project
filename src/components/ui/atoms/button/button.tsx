import type { ComponentPropsWithRef } from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/styles/utils";

/**
 * Pill-shaped call-to-action button, e.g. "Explore Now" on the hero.
 *
 * `asChild` (via Radix `Slot`) lets consumers render it as e.g. a `next/link`
 * `<Link>` instead of a `<button>`, keeping the same look for links and
 * actions alike.
 */
const buttonVariants = cva(
    "border-2 inline-flex cursor-pointer items-center justify-center rounded-[30px] border-solid font-poppins font-semibold tracking-[0.32px] transition-colors",
    {
        variants: {
            variant: {
                primary:
                    "border-blue bg-blue text-text-secondary hover:bg-transparent",
                secondary:
                    "border-white bg-white text-text-primary hover:bg-blue hover:border-blue hover:text-text-secondary",
                outline:
                    "border-blue bg-transparent hover:bg-blue hover:text-text-secondary",
                // Thicker border + a dark scrim fill (so the label stays
                // readable over a photo) that solidifies to blue on hover,
                // with a bolder, uppercase label. See Figma node 173-6373
                // (default) / 173-6375 (hover).
                overlay:
                    "border-blue bg-dark-brown-50 font-bold uppercase hover:bg-blue",
            },
            textColor: {
                dark: "text-text-primary",
                light: "text-text-secondary",
            },
            size: {
                S: "min-w-28 px-4 py-3 text-sm leading-2xs",
                M: "min-w-35 px-4 py-3 text-sm leading-xs",
                L: "min-w-40 px-7 py-5 text-sm leading-lg",
            },
        },
        compoundVariants: [
            // outline's hover is fixed (bg-blue + white text) regardless of
            // textColor, so it lives on the variant itself rather than here.
            {
                variant: "primary",
                textColor: "dark",
                className: "hover:text-text-primary",
            },
            {
                variant: "primary",
                textColor: "light",
                className: "hover:text-text-secondary",
            },
            // overlay's label is always white — the scrim/blue backgrounds
            // it's designed for never pair with dark text — regardless of
            // textColor.
            {
                variant: "overlay",
                className: "text-text-secondary",
            },
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
            className={cn(
                buttonVariants({ variant, textColor, size, className }),
            )}
            ref={ref}
            {...props}
        >
            {children}
        </Comp>
    );
};

Button.displayName = "Button";
