import type { ComponentPropsWithRef, ReactNode } from "react";
import Link from "next/link";
import type { Route } from "next";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/styles/utils";
import {
    Heading,
    type HeadingProps,
} from "@/components/ui/atoms/heading/heading";
import { Button } from "@/components/ui/atoms/button/button";

/**
 * A destination's photo with a dark tint, its name and a "See guide" button
 * centered near the bottom, e.g. the "Australia" card linking into that
 * country's pages. See Figma node 173-5569.
 *
 * Comes in three sizes (`L`, `M`, `S`) — `S`'s label drops to a smaller,
 * bolder size to stay legible on the much shorter card, and skips the visible
 * button (there's no room for a 140px-wide pill on a 130px-wide thumbnail);
 * the whole card is still the link when `href` is set. Below `lg`, `L`/`M`
 * are fixed small squares (Figma's mobile
 * thumbnail spec). From `lg` up, `L`/`M` switch to `w-full` plus their Figma
 * aspect ratio, so a card fluidly fills whatever grid column it's placed in
 * — 2-up for `L`, 3-up for `M` — instead of jumping between a handful of
 * fixed pixel widths as the viewport grows. `S` stays a fixed small square
 * throughout; it's used as a standalone thumbnail, not as a grid item that
 * needs to fill available width.
 *
 * `href` makes the *whole card* the link (via `next/link`), same as it used
 * to be wrapped from the outside — clicking the photo, the name, or the "See
 * guide" pill all navigate. The pill itself is rendered as a `<span>` (via
 * `Button`'s `asChild`) rather than a second, nested `<a>`: an anchor can't
 * contain another anchor, so one link with a button-styled label inside it is
 * the valid version of "the card and its button both go to the country".
 * Omit `href` (e.g. for `S`) to render a purely presentational card.
 */

const destinationCardVariants = cva("block overflow-hidden rounded-card", {
    variants: {
        size: {
            L: "h-auto w-full aspect-[589/361]",
            M: "h-auto w-full aspect-[589/361]",
            S: "h-[130px] w-[130px]",
        },
    },
    defaultVariants: {
        size: "L",
    },
});

const destinationCardContentVariants = cva(
    "flex h-full w-full flex-col justify-end bg-cover bg-center",
    {
        variants: {
            size: {
                L: "items-center gap-6 p-6 text-center lg:gap-10 lg:p-10",
                M: "items-center gap-6 p-6 text-center lg:gap-10 lg:p-10",
                S: "items-start gap-1 p-2.5",
            },
        },
        defaultVariants: {
            size: "L",
        },
    },
);

type DestinationCardSize = NonNullable<
    VariantProps<typeof destinationCardVariants>["size"]
>;

/** Heading size per card size — `S` stays small and static, `L`/`M` get the
 * larger, fluid heading scale so the name reads at Figma's ~40px on desktop. */
const LABEL_SIZES: Record<
    DestinationCardSize,
    NonNullable<HeadingProps["size"]>
> = {
    L: "xl",
    M: "xl",
    S: "md",
};

/**
 * Approximate rendered width per `size`, used to size the photo request.
 * Below `lg` every size is the fixed 130px thumbnail. From `lg` up, `L`/`M`
 * are fluid — sized as a fraction of the viewport matching their grid
 * (2-up/3-up), capped at their share of the 1440px desktop max-width.
 */
// const IMAGE_SIZES: Record<DestinationCardSize, string> = {
//     L: "(max-width: 1023px) 130px, (max-width: 1439px) 50vw, 720px",
//     M: "(max-width: 1023px) 130px, (max-width: 1439px) 33vw, 480px",
//     S: "130px",
// };

export type DestinationCardProps = Omit<
    ComponentPropsWithRef<"div">,
    "children"
> &
    VariantProps<typeof destinationCardVariants> & {
        /** Background photo for the destination. */
        imageSrc: string;
        /** Alt text for the photo. Defaults to "" (decorative) since `label` already announces the destination name. */
        imageAlt?: string;
        /** Destination name shown over the photo, e.g. "Australia". */
        label: ReactNode;
        /** URL for the destination's page. Renders the "See guide" button when set; omit for a purely presentational card. */
        href?: Route | string;
        /** Button label. Defaults to "See guide". */
        buttonLabel?: ReactNode;
    };

export const DestinationCard = ({
    size = "L",
    imageSrc,
    label,
    href,
    buttonLabel = "See guide",
    className,
    ref,
    ...props
}: DestinationCardProps) => {
    const cardClassName = cn(destinationCardVariants({ size, className }));

    const content = (
        <>
            <div
                className={cn(destinationCardContentVariants({ size }))}
                style={{
                    backgroundImage: `linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.2)), url(${imageSrc})`,
                }}
            >
                <Heading
                    level={3}
                    size={LABEL_SIZES[size ?? "M"]}
                    variant="secondary"
                    className="w-full"
                >
                    {label}
                </Heading>

                {href && size !== "S" && (
                    // A visual button, not a real link/button element — the
                    // whole card below is already the `<a>`, and an anchor
                    // can't contain another interactive element.
                    <Button asChild variant="overlay">
                        <span>{buttonLabel}</span>
                    </Button>
                )}
            </div>
        </>
    );

    if (href) {
        return (
            <Link
                data-slot="destination-card"
                href={href as Route}
                className={cardClassName}
                ref={ref as ComponentPropsWithRef<"a">["ref"]}
                {...(props as Omit<ComponentPropsWithRef<"a">, "href">)}
            >
                {content}
            </Link>
        );
    }

    return (
        <div
            data-slot="destination-card"
            className={cardClassName}
            ref={ref}
            {...props}
        >
            {content}
        </div>
    );
};

DestinationCard.displayName = "DestinationCard";
