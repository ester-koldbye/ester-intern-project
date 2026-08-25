import type { ComponentPropsWithRef, ReactNode } from "react";
import Image from "next/image";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/styles/utils";

/**
 * A destination's photo with its name overlaid bottom-left, e.g. the
 * "Australia" card linking into that country's pages.
 *
 * Comes in three sizes (`L`, `M`, `S`) — `S`'s label drops to a smaller,
 * bolder size to stay legible on the much shorter card, so the sizes aren't
 * just a linear resize of one another. Below `lg`, `L`/`M` are fixed
 * small squares (Figma's mobile thumbnail spec). From `lg` up, `L`/`M`
 * switch to `w-full` plus their Figma aspect ratio, so a card fluidly fills
 * whatever grid column it's placed in — 2-up for `L`, 3-up for `M` — instead
 * of jumping between a handful of fixed pixel widths as the viewport grows.
 * `S` stays a fixed small square throughout; it's used as a standalone
 * thumbnail, not as a grid item that needs to fill available width.
 *
 * Purely presentational — `imageSrc` and `label` fully determine its
 * content, so unlike most atoms here it has no `asChild` escape hatch (Radix
 * `Slot` needs a single consumer-supplied child to merge props onto, and this
 * component has none). To make a card clickable, wrap it in `next/link`'s
 * `Link` from the outside: `<Link href="/australia"><DestinationCard .../></Link>`.
 */

const destinationCardVariants = cva(
    "relative block overflow-hidden rounded-card",
    {
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
    },
);

const destinationCardLabelVariants = cva(
    "absolute font-poppins whitespace-nowrap text-text-secondary bottom-4 left-2.5 h-md lg:leading-xl font-semibold tracking-[-0.32px] ",
    {
        variants: {
            size: {
                L: "lg:bottom-6 lg:left-9",
                M: "lg:bottom-6 lg:left-6",
                S: "bottom-4 left-2.5 text-md leading-md font-bold",
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

/**
 * Approximate rendered width per `size`, used to size the photo request.
 * Below `lg` every size is the fixed 130px thumbnail. From `lg` up,
 * `L`/`M` are fluid — sized as a fraction of the viewport matching their grid
 * (2-up/3-up), capped at their share of the 1440px desktop max-width.
 */
const IMAGE_SIZES: Record<DestinationCardSize, string> = {
    L: "(max-width: 1023px) 130px, (max-width: 1439px) 50vw, 720px",
    M: "(max-width: 1023px) 130px, (max-width: 1439px) 33vw, 480px",
    S: "130px",
};

export type DestinationCardProps = Omit<
    ComponentPropsWithRef<"div">,
    "children"
> &
    VariantProps<typeof destinationCardVariants> & {
        /** Background photo for the destination. */
        imageSrc: string;
        /** Alt text for the photo. Defaults to "" (decorative) since `label` already announces the destination name. */
        imageAlt?: string;
        /** Destination name shown bottom-left over the photo, e.g. "Australia". */
        label: ReactNode;
    };

export const DestinationCard = ({
    size = "L",
    imageSrc,
    imageAlt = "",
    label,
    className,
    ref,
    ...props
}: DestinationCardProps) => {
    return (
        <div
            data-slot="destination-card"
            className={cn(destinationCardVariants({ size, className }))}
            ref={ref}
            {...props}
        >
            <Image
                src={imageSrc}
                alt={imageAlt}
                fill
                sizes={IMAGE_SIZES[size ?? "L"]}
                className="object-cover"
            />
            <div
                aria-hidden="true"
                className="absolute inset-x-0 top-[52.63%] bottom-0 bg-linear-to-b from-black/0 to-black/70"
            />
            <span className={cn(destinationCardLabelVariants({ size }))}>
                {label}
            </span>
        </div>
    );
};

DestinationCard.displayName = "DestinationCard";
