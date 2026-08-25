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
 * itself internally. `layout="vertical"`/`"horizontal"` are the same kind of
 * fixed choice, always rendering the same way regardless of available space.
 *
 * `layout="responsive"` is the one exception: it starts `vertical` and
 * switches to `horizontal` once its container has room (≥584px, the
 * horizontal card's Figma width), via a CSS container query — so it needs an
 * ancestor with the `@container` class (`container-type: inline-size`) to
 * measure against. Without one, a container query never matches anything and
 * the card just stays vertical, e.g.:
 *
 *   <div className="@container ...">
 *     <ActivityCard layout="responsive" size="M" ... />
 *   </div>
 */

export type ActivityCardLayout = "vertical" | "horizontal" | "responsive";
export type ActivityCardSize = "L" | "M";

/** Every layout/size combo as one key, for the width/height lookups below. */
const variantKey = (layout: ActivityCardLayout, size: ActivityCardSize) => `${layout}_${size}` as const;

// Container-query breakpoint shared by every "responsive" entry below: the
// point at which there's enough room for the 250px square image plus a
// legible text column next to it (≈ the horizontal card's own 584px width).
const RESPONSIVE_BREAKPOINT = "@[584px]" as const;

// Root wrapper: sets flex direction (stacked for vertical, side-by-side for
// horizontal). Width depends on `size` too, so it isn't a cva variant here —
// see `activityCardWidth` below instead.
const activityCardVariants = cva("flex items-start gap-6", {
    variants: {
        layout: {
            vertical: "flex-col",
            horizontal: "flex-row items-center",
            // Starts like `vertical`, then switches to `horizontal`'s row +
            // centered alignment once the container is wide enough.
            responsive: `flex-col ${RESPONSIVE_BREAKPOINT}:flex-row ${RESPONSIVE_BREAKPOINT}:items-center`,
        },
    },
    defaultVariants: {
        layout: "vertical",
    },
});

// Card width per Figma spec: every combo is 584px except the compact
// vertical/M card (378.67px, rounded to 379px). `responsive` fills its
// container instead — the whole point is to adapt to whatever space it's
// given, rather than assume a fixed size.
const activityCardWidth: Record<ReturnType<typeof variantKey>, string> = {
    vertical_L: "w-[584px]",
    vertical_M: "w-[379px]",
    horizontal_L: "w-[584px]",
    horizontal_M: "w-[584px]",
    responsive_L: "w-full",
    responsive_M: "w-full",
};

// Base styling for the Image wrapper div — `layout` alone decides whether it
// stretches full-width (vertical/responsive). Actual dimensions come from
// `activityCardImageSize` below, keyed by every layout/size pair.
const activityCardImageVariants = cva("relative shrink-0 overflow-hidden rounded-card", {
    variants: {
        layout: {
            vertical: "w-full",
            horizontal: "",
            responsive: "w-full",
        },
    },
    defaultVariants: {
        layout: "vertical",
    },
});

// Image dimensions per Figma spec, keyed by layout/size. `responsive` mixes
// the two: `vertical`'s fixed height (full width) below the breakpoint,
// `horizontal`'s fixed square above it.
const activityCardImageSize: Record<ReturnType<typeof variantKey>, string> = {
    vertical_L: "h-[400px]",
    vertical_M: "h-[300px]",
    horizontal_L: "size-[250px]",
    horizontal_M: "size-[250px]",
    responsive_L: `h-[400px] ${RESPONSIVE_BREAKPOINT}:size-[250px]`,
    responsive_M: `h-[300px] ${RESPONSIVE_BREAKPOINT}:size-[250px]`,
};

// Location pin icon used next to the location link below. Inlined as SVG
// (rather than an icon library import) so its `currentColor` fill picks up
// the surrounding text color automatically.
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
        size?: ActivityCardSize; /* card scale — see activityCardWidth/activityCardImageSize */
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

            {/* Row 2: title and description.
                Per Figma spec, only the L card's title is semibold with
                tightened tracking; the M card falls back to Heading's own
                default weight (bold) by leaving `weight` unset. */}
            <div className="flex w-full flex-col items-start gap-3">
                <Heading
                    level={titleLevel}
                    size="lg"
                    weight={size === "L" ? "semibold" : undefined}
                    className={cn("w-full", size === "L" && "tracking-[-0.32px]")}
                >
                    {title}
                </Heading>

                {/* Paragraph is skipped when no description is provided */}
                {description && (
                    <Text size="base" weight="semibold" className="w-full">
                        {description}
                    </Text>
                )}
            </div>
        </div>
    );

    // `readMoreHref` decides whether this renders as a real link or a plain
    // button with a click handler. When it's a link, `asChild` makes `Button`
    // pass its own styling down to the `Link` instead of rendering a `<button>`
    // wrapping it — so there's exactly one focusable, one semantically-correct
    // element. `onClick` only applies in the plain-button case (a link ignores it).
    const readMoreButton = (
        <Button
            asChild={!!readMoreHref}
            variant="outline"
            textColor="dark"
            size="M"
            className="shrink-0"
            onClick={readMoreHref ? undefined : onReadMoreClick}
        >
            {readMoreHref ? <Link href={readMoreHref as Route}>{readMoreLabel}</Link> : readMoreLabel}
        </Button>
    );

    // `layout` defaults to "vertical" above, but cva's own typing still
    // allows `null` (to explicitly opt out of the variant) — fall back the
    // same way here so it's always a valid key into the lookups below.
    const resolvedLayout = layout ?? "vertical";
    const key = variantKey(resolvedLayout, size);

    // "horizontal" and "responsive" both need the info/title block and the
    // button wrapped in their own right-hand column (image left, column
    // right, once "responsive" has crossed its breakpoint). Only "vertical"
    // renders them as flat siblings instead.
    const isColumnLayout = resolvedLayout !== "vertical";

    return (
        <div
            data-slot="activity-card"
            className={cn(activityCardVariants({ layout }), activityCardWidth[key], className)}
            ref={ref}
            {...props}
        >
            {/* Photo. `fill` + the wrapper's own height/width (set by
                activityCardImageSize above) size the image; only the
                object-fit behavior lives here. */}
            <div className={cn(activityCardImageVariants({ layout }), activityCardImageSize[key])}>
                <Image src={imageSrc} alt={imageAlt} fill sizes="(min-width: 584px) 584px, 100vw" className="object-cover" />
            </div>

            {isColumnLayout ? (
                // Figma spec: 16px gap between info/title and button. For
                // "responsive", that only applies once it's actually a
                // column (past the breakpoint) — below it, it should read
                // exactly like "vertical"'s 24px flat-sibling gap.
                <div
                    className={cn(
                        "flex w-full flex-1 flex-col items-start",
                        resolvedLayout === "responsive" ? `gap-6 ${RESPONSIVE_BREAKPOINT}:gap-4` : "gap-4",
                    )}
                >
                    {infoAndTitle}
                    {readMoreButton}
                </div>
            ) : (
                // Vertical: no extra wrapper needed — image, info/title block
                // and button are already three flat siblings, stacked by the
                // root's own `flex-col` (see activityCardVariants above).
                <>
                    {infoAndTitle}
                    {readMoreButton}
                </>
            )}
        </div>
    );
};

ActivityCard.displayName = "ActivityCard";
