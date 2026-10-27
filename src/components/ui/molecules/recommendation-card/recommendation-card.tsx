import type { ComponentPropsWithRef, MouseEventHandler, ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Route } from "next";
import { cn } from "@/styles/utils";
import { Tag } from "@/components/ui/atoms/tag/tag";
import { Heading, type HeadingLevel } from "@/components/ui/atoms/heading/heading";
import { Text } from "@/components/ui/atoms/text/text";
import { Button } from "@/components/ui/atoms/button/button";

/**
 * An activity's photo, category tag, location, title, optional description
 * and a "Read more" button — e.g. a "Hike" card linking into that activity's
 * page.
 *
 * Fully responsive with no props or wrapper required: the photo stacks
 * above the text on narrow screens, and sits beside it from `sm` up. Just
 * drop it in.
 *
 * `description` is genuinely optional — passing nothing omits the paragraph
 * entirely rather than reserving space for it.
 */

// LOCATION PIN
const PinIcon = (props: ComponentPropsWithRef<"svg">) => (
    <svg width="14" height="18" viewBox="0 0 14 18" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" {...props}>
        <path
            d="M7 18C7 18 14 11.6033 14 6.75C14 4.95979 13.2625 3.2429 11.9497 1.97703C10.637 0.711159 8.85652 0 7 0C5.14348 0 3.36301 0.711159 2.05025 1.97703C0.737498 3.2429 0 4.95979 0 6.75C0 11.6033 7 18 7 18ZM7 10.125C6.07174 10.125 5.1815 9.76942 4.52513 9.13649C3.86875 8.50355 3.5 7.64511 3.5 6.75C3.5 5.85489 3.86875 4.99645 4.52513 4.36351C5.1815 3.73058 6.07174 3.375 7 3.375C7.92826 3.375 8.8185 3.73058 9.47487 4.36351C10.1313 4.99645 10.5 5.85489 10.5 6.75C10.5 7.64511 10.1313 8.50355 9.47487 9.13649C8.8185 9.76942 7.92826 10.125 7 10.125Z"
            fill="currentColor"
        />
    </svg>
);

/** Props for RecommendationCard: div props + the card's own content/link fields. */
export type RecommendationCardProps = Omit<ComponentPropsWithRef<"div">, "title"> & {
    imageSrc: string; /* activity image */
    imageAlt?: string; /* alt text for image */
    tag: ReactNode; /* tag for the activity */
    location: ReactNode; /* location name */
    locationHref?: string; /* URL for the location link */
    title: ReactNode; /* activity title */
    titleLevel: HeadingLevel; /* heading level for the activity title */
    description?: ReactNode; /* description for the activity */
    readMoreLabel?: ReactNode; /* "Read more" label */
    readMoreHref?: Route | string; /* URL for the read more button */
    onReadMoreClick?: MouseEventHandler<HTMLButtonElement>; /* only used when `readMoreHref` is omitted */
};

/** The component itself: destructures the props above, with defaults for the optional ones. */
export const RecommendationCard = ({
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
}: RecommendationCardProps) => (
    <article
        data-slot="recommendation-card"
        className={cn("flex w-full flex-col items-start gap-6 sm:flex-row sm:items-center", className)}
        ref={ref}
        {...props}
    >
        {/* Photo. `fill` + this wrapper's own size place the image; only object-fit lives here. */}
        <div className="relative aspect-3/2 w-full shrink-0 overflow-hidden rounded-card sm:aspect-square sm:w-64">
            <Image 
                src={imageSrc} alt={imageAlt} 
                fill 
                sizes="(min-width: 640px) 256px, 100vw" 
                className="object-cover" />
        </div>

        <div className="flex w-full flex-1 flex-col items-start gap-4">
            {/* Tag + location */}
            <div className="flex w-full items-center justify-between gap-2.5">
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

            {/* Title + optional description */}
            <div className="flex w-full flex-col items-start gap-3">
                <Heading level={titleLevel} size="lg" className="w-full">
                    {title}
                </Heading>

                {description && (
                    <Text size="base" weight="semibold" className="w-full">
                        {description}
                    </Text>
                )}
            </div>

            {/* `readMoreHref` decides whether this renders as a real link or a
                plain button with a click handler. When it's a link, `asChild`
                makes `Button` pass its own styling down to the `Link` instead
                of rendering a `<button>` wrapping it — so there's exactly one
                focusable, one semantically-correct element. `onClick` only
                applies in the plain-button case (a link ignores it). */}
            <Button
                asChild={!!readMoreHref}
                variant="outline"
                className="shrink-0"
                onClick={readMoreHref ? undefined : onReadMoreClick}
            >
                {readMoreHref ? <Link href={readMoreHref as Route}>{readMoreLabel}</Link> : readMoreLabel}
            </Button>
        </div>
    </article>
);

RecommendationCard.displayName = "RecommendationCard";
