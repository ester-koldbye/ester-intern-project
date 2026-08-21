import type { ComponentPropsWithRef, MouseEventHandler, ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Route } from "next";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/styles/utils";
import { Tag } from "@/components/ui/atoms/tag/tag";
import { Heading, type HeadingLevel } from "@/components/ui/atoms/heading/heading";
import { Text } from "@/components/ui/atoms/text/text";
import { Button } from "@/components/ui/atoms/button/button";

/**
 * An activity's photo, category tag, location, title, optional description
 * and a "Read more" button, e.g. a "Hike" card linking into that activity's
 * page.
 *
 * `layout` picks image placement (`vertical` stacks the photo on top,
 * `horizontal` puts a square photo on the left) and `size` picks the scale
 * (`L` is the hero-sized card, `M` the compact one used in grids and lists).
 * `description` is genuinely optional — passing nothing omits the paragraph
 * entirely rather than reserving space for it, since Figma shows both cards
 * with and without one.
 *
 * Like `DestinationCard`, sizes are fixed rather than fluid: a page picks
 * `size="L"` or `size="M"` per breakpoint instead of the card resizing
 * itself internally.
 */

const activityCardVariants = cva("flex items-start gap-6", {
    variants: {
        layout: {
            vertical: "w-[584px] flex-col",
            horizontal: "w-[584px] flex-row items-center",
        },
        size: {
            L: "",
            M: "",
        },
    },
    compoundVariants: [
        // Card 3's spec width (378.67px) — the compact vertical card.
        { layout: "vertical", size: "M", className: "w-[379px]" },
    ],
    defaultVariants: {
        layout: "vertical",
        size: "L",
    },
});

// Styling for the Image wrapper div
const activityCardImageVariants = cva("relative shrink-0 overflow-hidden rounded-card", {
    variants: {
        layout: {
            vertical: "w-full",
            horizontal: "",
        },
        size: {
            L: "",
            M: "",
        },
    },
    compoundVariants: [
        { layout: "vertical", size: "L", className: "h-[400px]" },
        { layout: "vertical", size: "M", className: "h-[300px]" },
        { layout: "horizontal", size: "M", className: "size-[250px]" },
        { layout: "horizontal", size: "L", className: "size-[250px]" },
    ],
    defaultVariants: {
        layout: "vertical",
        size: "L",
    },
});

// LOCATION PIN ICON
const PinIcon = (props: ComponentPropsWithRef<"svg">) => (
    <svg width="14" height="18" viewBox="0 0 14 18" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" {...props}>
        <path
            d="M7 18C7 18 14 11.6033 14 6.75C14 4.95979 13.2625 3.2429 11.9497 1.97703C10.637 0.711159 8.85652 0 7 0C5.14348 0 3.36301 0.711159 2.05025 1.97703C0.737498 3.2429 0 4.95979 0 6.75C0 11.6033 7 18 7 18ZM7 10.125C6.07174 10.125 5.1815 9.76942 4.52513 9.13649C3.86875 8.50355 3.5 7.64511 3.5 6.75C3.5 5.85489 3.86875 4.99645 4.52513 4.36351C5.1815 3.73058 6.07174 3.375 7 3.375C7.92826 3.375 8.8185 3.73058 9.47487 4.36351C10.1313 4.99645 10.5 5.85489 10.5 6.75C10.5 7.64511 10.1313 8.50355 9.47487 9.13649C8.8185 9.76942 7.92826 10.125 7 10.125Z"
            fill="currentColor"
        />
    </svg>
);

export type ActivityCardProps = Omit<ComponentPropsWithRef<"div">, "title"> &
    VariantProps<typeof activityCardVariants> & {
        imageSrc: string; /* activity image */
        imageAlt?: string; /* alt text for image */
        tag: ReactNode; /* tag for the activity */
        location: ReactNode; /* Location name */
        locationHref?: string; /* URL for the location link */
        title: ReactNode; /* activity title */
        titleLevel: HeadingLevel; /* Heading level for the activity title */
        description?: ReactNode; /* description for the activity */
        readMoreLabel?: ReactNode; /* Read more label */
        readMoreHref?: Route | string; /* URL for the read more button */
        onReadMoreClick?: MouseEventHandler<HTMLButtonElement>; /* only used when `readMoreHref` is omitted */
    };

export const ActivityCard = ({
    layout = "vertical",
    size = "L",
    imageSrc,
    imageAlt = "",
    tag,
    location,
    locationHref,
    title,
    titleLevel,
    description,
    readMoreLabel = "Read more",
    readMoreHref,
    onReadMoreClick,
    className,
    ref,
    ...props
}: ActivityCardProps) => {
    // Tag/location + title/description, grouped as one unit so it can sit
    // either as a direct sibling of the button (vertical) or share a column
    // with it (horizontal) — see the two layouts below.
    const infoAndTitle = (
        <div className="flex w-full flex-col items-start gap-4">
            <div className="flex w-full items-center justify-between gap-2.5">
                {/* Row 1: category tag + location */}
                <Tag variant="dark">{tag}</Tag>

                {locationHref && (
                    <a href={locationHref} className="flex shrink-0 items-center gap-2.5 text-text-primary">
                        <PinIcon className="h-4.5 w-3.5 shrink-0" />
                        <Text as="span" size="sm" weight="semibold" className="whitespace-nowrap">
                            {location}
                        </Text>
                    </a>
                )}
            </div>

            {/* Row 2: title and description */}
            <div className="flex w-full flex-col items-start gap-2">
                {size === "L" ? (
                    <Heading level={titleLevel} size="lg" weight="semibold" className="w-full tracking-[-0.32px]">
                        {title}
                    </Heading>
                ) : (
                    <Heading level={titleLevel} size="lg" className="w-full">
                        {title}
                    </Heading>
                )}

                {/* Paragraph is skipped when no description is provided */}
                {description && (
                    <Text size="sm" weight="semibold" className="w-full">
                        {description}
                    </Text>
                )}
            </div>
        </div>
    );

    // `readMoreHref` decides whenther this renders as a real link or a plain button with a click handler
    // `asChild` + `Link` makes `Button`hand its own styling down to the <Link>
    const readMoreButton = readMoreHref ? (
        <Button asChild variant="outline" textColor="dark" size="M" className="shrink-0">
            <Link href={readMoreHref as Route}>{readMoreLabel}</Link>
        </Button>
    ) : (
        <Button variant="outline" textColor="dark" size="M" className="shrink-0" onClick={onReadMoreClick}>
            {readMoreLabel}
        </Button>
    );

    return (
        <div
            data-slot="activity-card"
            className={cn(activityCardVariants({ layout, size, className }))}
            ref={ref}
            {...props}
        >
            {/* Photo - variant classes can change based on layout and size */}
            <div className={cn(activityCardImageVariants({ layout, size }))}>
                <Image src={imageSrc} alt={imageAlt} fill sizes="(min-width: 584px) 584px, 100vw" className="object-cover" />
            </div>

            {layout === "horizontal" ? (
                // Figma nests the title group and the button in one right-hand
                // column (16px gap) rather than as siblings of the image.
                <div className="flex w-full flex-1 flex-col items-start gap-4">
                    {infoAndTitle}
                    {readMoreButton}
                </div>
            ) : (
                // Vertical layout: image, info/title block and are three flat sibling stacked by 'activityCardVariants' flex-col.
                <>
                    {infoAndTitle}
                    {readMoreButton}
                </>
            )}
        </div>
    );
};

ActivityCard.displayName = "ActivityCard";
