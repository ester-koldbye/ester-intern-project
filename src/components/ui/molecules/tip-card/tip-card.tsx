import type { ComponentPropsWithRef, ReactNode } from "react";
import { cn } from "@/styles/utils";
import { Text } from "@/components/ui/atoms/text/text";

/**
 * A single travel tip: a bold title over a muted description, set off by a
 * left border rule — e.g. "Try streetfood / Try the streetfood a local
 * spots" in the country page's Tips section. Meant to repeat in a row
 * wherever a list of these appears, same convention as `InfoItem`.
 *
 * `description` takes a `ReactNode` rather than being restricted to a single
 * line, since some tips (e.g. "Apps for transportation") list several
 * options — pass a string with blank lines between entries and `whitespace-pre-line`
 * (the default rendering) preserves them, or pass your own markup.
 *
 * Title sits at Figma's "LG Bold" style (24px/24px, weight 600), which falls
 * outside `Text`'s sm/base/md scale, so it's set directly from the theme
 * tokens rather than through that atom.
 */

export type TipCardProps = ComponentPropsWithRef<"div"> & {
    title: ReactNode;
    description: ReactNode;
};

export const TipCard = ({
    title,
    description,
    className,
    ref,
    ...props
}: TipCardProps) => {
    return (
        <div
            data-slot="tip-card"
            className={cn(
                "border-dark-brown flex w-full flex-1 flex-col gap-2 border-l-2 pl-4 md:pl-8",
                className,
            )}
            ref={ref}
            {...props}
        >
            <p className="font-poppins text-text-primary text-md leading-md md:text-lg md:leading-lg font-bold">
                {title}
            </p>
            <Text as="div" size="md" weight="semibold" className="text-base lg:text-md whitespace-pre-line">
                {description}
            </Text>
        </div>
    );
};

TipCard.displayName = "TipCard";
