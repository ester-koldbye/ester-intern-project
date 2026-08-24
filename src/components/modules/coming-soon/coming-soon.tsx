import type { ComponentPropsWithRef, ReactNode } from "react";
import { cn } from "@/styles/utils";
import { Heading } from "@/components/ui/atoms/heading/heading";
import { Text } from "@/components/ui/atoms/text/text";

/**
 * Placeholder shown on a real, linkable destination (country or city) that
 * doesn't have its write-up ready yet — as opposed to an unknown slug, which
 * 404s via `notFound()` instead. Lets the home page/"Cities I visited" grid
 * link to every known destination without every page needing full content
 * from day one; a destination starts showing this and switches to its real
 * page automatically once `content` is added for it in `src/lib/destinations.ts`.
 */

export type ComingSoonProps = Omit<ComponentPropsWithRef<"section">, "children"> & {
    heading?: ReactNode;
    description?: ReactNode;
};

export const ComingSoon = ({
    heading = "Coming soon",
    description = "We haven't written up this destination yet — check back soon!",
    className,
    ref,
    ...props
}: ComingSoonProps) => {
    return (
        <section
            data-slot="coming-soon"
            className={cn(
                "px-padding-block-mobile py-padding-inline-mobile lg:px-padding-xl-block lg:py-padding-xl-inline flex w-full flex-col items-center gap-4 bg-white text-center",
                className,
            )}
            ref={ref}
            {...props}
        >
            <Heading level={2} size="2xl" weight="semibold">
                {heading}
            </Heading>
            {description && (
                <Text as="p" size="md" weight="semibold" textColor="grey" className="max-w-xl">
                    {description}
                </Text>
            )}
        </section>
    );
};

ComingSoon.displayName = "ComingSoon";
