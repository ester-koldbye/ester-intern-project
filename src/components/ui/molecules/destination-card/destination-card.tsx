import type { ComponentPropsWithRef, ReactNode } from "react";
import Image from "next/image";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/styles/utils";

/**
 * A destination's photo with its name overlaid bottom-left, e.g. the
 * "Australia" card linking into that country's pages.
 *
 * Comes in three fixed sizes (`L` 589×361, `M` 384×361, `S` 160×150) rather
 * than scaling fluidly — `S`'s label drops to a smaller, bolder size to stay
 * legible on the much shorter card, so the sizes aren't just a linear resize
 * of one another.
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
                L: "h-[361px] w-[589px]",
                M: "h-[361px] w-[384px]",
                S: "h-[150px] w-[160px]",
            },
        },
        defaultVariants: {
            size: "L",
        },
    },
);

const destinationCardLabelVariants = cva(
    "absolute font-poppins whitespace-nowrap text-text-secondary",
    {
        variants: {
            size: {
                L: "bottom-6 left-9 text-xl leading-xl font-semibold tracking-[-0.32px]",
                M: "bottom-6 left-6 text-xl leading-xl font-semibold tracking-[-0.32px]",
                S: "bottom-4 left-2.5 text-lg leading-lg font-bold",
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

/** Rendered width per `size`, matching each fixed card width — used to size the photo request. */
const IMAGE_SIZES: Record<DestinationCardSize, string> = {
    L: "589px",
    M: "384px",
    S: "160px",
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
