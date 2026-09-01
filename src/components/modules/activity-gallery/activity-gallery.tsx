"use client";

import { useState } from "react";
import type { ComponentPropsWithRef, ReactNode } from "react";
import Image from "next/image";
import { cn } from "@/styles/utils";
import {
    Heading,
    type HeadingLevel,
} from "@/components/ui/atoms/heading/heading";
import {
    InfoItem,
    type InfoItemProps,
} from "@/components/ui/molecules/info-item/info-item";

/**
 * Top-of-page hero for a single activity's own detail page, e.g. "Wat Arun":
 * an H1, a photo gallery (one large image with a row of clickable
 * thumbnails), and a practical-info panel next to it — Figma's activity
 * detail frame (node 17:5775).
 *
 * `images` is a flat array rather than a fixed "main + 6 thumbnails" shape,
 * so a gallery can have as many (or as few) photos as an activity actually
 * has; the first one shows by default and clicking any thumbnail swaps it
 * into the main slot. `info` is likewise a flat list of `InfoItem`-shaped
 * rows (Type/Visited/Price/Dresscode in Figma, but not fixed to those) —
 * both are ready for fetched data: an activity page can own its own
 * `Activity` (from an API/CMS call, see `src/lib/activities.ts`) and hand
 * its `images`/`info` straight to this component.
 *
 * Marked `'use client'` for the gallery's thumbnail-click interactivity.
 */

export type ActivityGalleryImage = {
    src: string;
    alt?: string;
};

export type ActivityInfoItem = Pick<
    InfoItemProps,
    "icon" | "typeTitle" | "title" | "description"
> & {
    /** Unique key for the list. */
    id: string;
};

/** "Type" row icon — a question mark, for "what kind of activity is this". */
const QuestionIcon = () => (
    <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
    >
        <path
            transform="translate(4.3 1.49)"
            d="M4.36865 13.0168L3.03532 13.0128V11.6754H4.37665L4.36865 13.0168ZM3.04067 10.3295V8.74281C3.04067 7.97614 3.386 7.33614 3.79867 6.82881C4.208 6.32481 4.72867 5.89748 5.16867 5.55081C5.45633 5.32407 5.68733 5.03355 5.84344 4.7022C5.99954 4.37086 6.07647 4.00775 6.06814 3.64157C6.05982 3.27538 5.96647 2.91615 5.79547 2.59224C5.62447 2.26832 5.3805 1.9886 5.08284 1.77517C4.78517 1.56174 4.44195 1.42043 4.0803 1.36242C3.71864 1.30441 3.34845 1.33127 2.99896 1.4409C2.64947 1.55052 2.33026 1.7399 2.06653 1.99408C1.8028 2.24825 1.60177 2.56027 1.47933 2.90548L1.25667 3.53414L0 3.09014L0.222 2.46148C0.513339 1.64001 1.08552 0.94788 1.83754 0.507257C2.58956 0.0666344 3.47307 -0.0941481 4.33211 0.0532909C5.19114 0.20073 5.97048 0.64691 6.53254 1.31307C7.0946 1.97923 7.40325 2.82254 7.404 3.69414C7.40418 4.25352 7.2773 4.80563 7.03293 5.30881C6.78856 5.81199 6.43308 6.25309 5.99333 6.59881C5.55667 6.94281 5.14067 7.29214 4.83333 7.67081C4.528 8.04548 4.374 8.39548 4.374 8.74348V10.3295H3.04067Z"
            fill="currentColor"
        />
    </svg>
);

/** "Price" row icon — a money bag with a dollar sign, assembled from Figma's exported path fragments (bag outline, drawstring loop, $ curve, $ bar). */
const MoneyBagIcon = () => (
    <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
    >
        <path
            transform="translate(1.5 2.5) scale(0.82)"
            d="M11.6672 6.84212V5.51219C11.6672 2.79925 9.46797 0.6 6.75503 0.6C4.04209 0.6 1.84284 2.79925 1.84284 5.51219V9.96712C1.15159 9.99578 0.6 10.5652 0.6 11.2635C0.6 11.9801 1.18091 12.561 1.8975 12.561H11.6126C12.3292 12.561 12.9101 11.9801 12.9101 11.2635C12.9101 10.5652 12.3585 9.99575 11.6673 9.96712H10.8859"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <path
            transform="translate(6.2 0.8) scale(0.7)"
            d="M0.790968 3.48166L0.607749 2.11503C0.522499 1.30528 1.15741 0.6 1.97162 0.6C2.78584 0.6 3.42075 1.30528 3.3355 2.11503L3.15228 3.48166"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <path
            transform="translate(6.3 5) scale(0.95)"
            d="M2.51333 1.33906C2.32577 1.07178 1.85415 0.873157 1.23771 1.05884C0.671709 1.22934 0.418052 2.13513 1.1563 2.48322C1.27215 2.53784 1.56899 2.65447 2.01683 2.81278C3.01921 3.16709 3.05218 4.48359 1.86249 4.58753C1.46608 4.62216 0.900802 4.51559 0.600021 4.14219M1.63221 4.629V4.93575M1.63221 0.6V0.964688"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <path
            transform="translate(6.9 10.3) scale(0.9)"
            d="M0.6 0.6H1.91044"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
);

/** "Dresscode" row icon — a "no photography"-style privacy/cover-up glyph. */
const PrivacyIcon = () => (
    <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
    >
        <path
            transform="translate(2.333 0.667)"
            d="M5.33333 7.33333V0H6.66667V7.33333H5.33333ZM2.66667 7.33333V0.666667H4V7.33333H2.66667ZM5.66667 14.6667C4.08889 14.6667 2.75 14.1167 1.65 13.0167C0.55 11.9167 0 10.5778 0 9V2H1.33333V9C1.33333 10.2111 1.75289 11.2362 2.592 12.0753C3.43111 12.9144 4.456 13.3338 5.66667 13.3333C6.87733 13.3329 7.90244 12.9133 8.742 12.0747C9.58156 11.236 10.0009 10.2111 10 9V6.66667C9.81111 6.66667 9.65289 6.73067 9.52533 6.85867C9.39778 6.98667 9.33378 7.14489 9.33333 7.33333V10H7.33333C6.96667 10 6.65289 10.1307 6.392 10.392C6.13111 10.6533 6.00044 10.9671 6 11.3333V12H4.66667V11.3333C4.66667 10.6 4.92778 9.97222 5.45 9.45C5.97222 8.92778 6.6 8.66667 7.33333 8.66667H8V1.33333H9.33333V5.45C9.44444 5.41667 9.55289 5.38889 9.65867 5.36667C9.76444 5.34444 9.87822 5.33333 10 5.33333H11.3333V9C11.3333 10.5778 10.7833 11.9167 9.68333 13.0167C8.58333 14.1167 7.24444 14.6667 5.66667 14.6667Z"
            fill="currentColor"
        />
    </svg>
);

/** Ready-made icons matching Figma's own four info rows, for convenience — `info` isn't limited to these. */
export const ActivityInfoIcons = {
    type: <QuestionIcon />,
    price: <MoneyBagIcon />,
    dresscode: <PrivacyIcon />,
    // "Visited" needs no entry: InfoItem's own default icon is already this same clock glyph.
};

export type ActivityGalleryProps = Omit<
    ComponentPropsWithRef<"section">,
    "children"
> & {
    /** The activity's name. */
    heading: ReactNode;
    /** Heading level for `heading`. Defaults to 1 (this section is the page's own title); pass 2 if a page-level `Hero` already renders the H1 above it. */
    headingLevel?: HeadingLevel;
    images: ActivityGalleryImage[];
    info: ActivityInfoItem[];
};

export const ActivityGallery = ({
    heading,
    headingLevel = 1,
    images,
    info,
    className,
    ref,
    ...props
}: ActivityGalleryProps) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const activeImage = images[activeIndex];

    return (
        <section
            data-slot="activity-gallery"
            className={cn(
                "padding-block-responsive padding-inline-responsive flex w-full flex-col items-start gap-10 bg-white lg:gap-15",
                className,
            )}
            ref={ref}
            {...props}
        >
            <Heading level={headingLevel} size="2xl" weight="bold">
                {heading}
            </Heading>

            <div className="flex w-full flex-col items-start gap-8 lg:flex-row lg:items-center lg:gap-7.5">
                {/* Gallery: large active photo + a row of clickable thumbnails */}
                <div className="flex w-full flex-1 flex-col items-start gap-2.5">
                    {activeImage && (
                        <div className="relative h-64 w-full overflow-hidden rounded-card lg:h-115">
                            <Image
                                src={activeImage.src}
                                alt={activeImage.alt ?? ""}
                                fill
                                sizes="(min-width: 1024px) 60vw, 100vw"
                                priority
                                className="object-cover"
                            />
                        </div>
                    )}

                    {images.length > 1 && (
                        <div className="flex w-full items-center gap-2.5">
                            {images.map((image, index) => (
                                <button
                                    key={image.src}
                                    type="button"
                                    onClick={() => setActiveIndex(index)}
                                    aria-label={`Show photo ${index + 1} of ${images.length}`}
                                    aria-current={index === activeIndex}
                                    className={cn(
                                        "relative h-25 w-full flex-1 shrink-0 overflow-hidden rounded-[15px] border-4 transition-colors",
                                        index === activeIndex
                                            ? "border-blue"
                                            : "border-transparent",
                                    )}
                                >
                                    <Image
                                        src={image.src}
                                        alt=""
                                        fill
                                        sizes="100px"
                                        className="object-cover"
                                    />
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* Practical info: Type/Visited/Price/... rows, whatever `info` contains */}
                <div className="bg-light-blue border-[rgba(22,82,125,0.08)] flex w-full flex-col items-start gap-7.5 rounded-card border p-10 lg:w-90 lg:shrink-0">
                    {info.map((item) => (
                        <InfoItem
                            key={item.id}
                            icon={item.icon}
                            typeTitle={item.typeTitle}
                            title={item.title}
                            description={item.description}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

ActivityGallery.displayName = "ActivityGallery";
