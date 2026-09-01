import type { ComponentPropsWithRef } from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/styles/utils";

// Round icon-only button (arrow by default), e.g. "next" controls on a carousel
const iconButtonVariants = cva(
    "inline-flex size-[43px] shrink-0 cursor-pointer items-center justify-center rounded-full border-solid drop-shadow-[0px_0px_7px_rgba(0,0,0,0.25)] transition-colors",
    {
        variants: {
            variant: {
                // Solid blue circle with white arrow
                primary:
                    "border-2 border-blue bg-blue text-white hover:bg-transparent hover:text-blue",

                // Faint blue circle with blue arrow
                secondary:
                    "border-2 border-blue/25 bg-blue/25 text-blue hover:border-blue/50 hover:bg-blue/50",
            },
            direction: {
                right: "",
                left: "[&_svg]:rotate-180",
            },
        },
        defaultVariants: {
            variant: "primary",
            direction: "right",
        },
    },
);

const ArrowIcon = () => (
    <svg
        width="17"
        height="14"
        viewBox="0 0 16.7067 13.9856"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
    >
        <path
            d="M0 6.99278H15.646M9.18352 0.530333L15.646 6.99278L9.18352 13.4553"
            stroke="currentColor"
            strokeWidth="1.5"
        />
    </svg>
);

export type IconButtonProps = ComponentPropsWithRef<"button"> &
    VariantProps<typeof iconButtonVariants> & {
        asChild?: boolean;
    };

export const IconButton = ({
    variant,
    direction,
    asChild = false,
    className,
    children,
    ref,
    ...props
}: IconButtonProps) => {
    const Comp = asChild ? Slot : "button";

    return (
        <Comp
            className={cn(
                iconButtonVariants({ variant, direction, className }),
            )}
            ref={ref}
            {...props}
        >
            {children ?? <ArrowIcon />}
        </Comp>
    );
};

IconButton.displayName = "IconButton";
