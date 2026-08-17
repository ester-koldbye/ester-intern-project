import type { ComponentPropsWithRef } from "react";
import { cn } from "@/styles/utils";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

const buttonVariants = cva("base-classes", {
    variants: {
        variant: {
            primary: "variant-classes",
            secondary: "variant-classes",
        },
        colorScheme: {
            onLight: "",
            onDark: "",
        },
        size: {
            s: "size-classes",
            m: "size-classes",
        },
    },
    compoundVariants: [
        {
            colorScheme: "onLight",
            variant: "primary",
            className: "compound-classes",
        },
    ],
    defaultVariants: {
        variant: "primary",
        colorScheme: "onLight",
        size: "m",
    },
});

type ButtonProps = ComponentPropsWithRef<"button"> &
    VariantProps<typeof buttonVariants> & {
        asChild?: boolean;
    };

const Button = ({
    variant,
    size,
    colorScheme,
    asChild = false,
    className,
    children,
    ref,
    ...props
}: ButtonProps) => {
    const Comp = asChild ? Slot : "button";

    return (
        <Comp
            className={cn(
                buttonVariants({ variant, size, colorScheme, className }),
            )}
            ref={ref}
            {...props}
        >
            {children}
        </Comp>
    );
};

Button.displayName = "Button";

export { Button };
