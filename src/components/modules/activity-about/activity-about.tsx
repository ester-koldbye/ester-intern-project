import type { ComponentPropsWithRef, ReactNode } from "react";
import { cn } from "@/styles/utils";
import {
    Heading,
    type HeadingLevel,
} from "@/components/ui/atoms/heading/heading";
import { Text } from "@/components/ui/atoms/text/text";

/**
 * "About recommendation" section on an activity detail page: a bulleted
 * description, a Pros/Cons pair, an "Open in Google Maps" link, and an
 * embedded map — Figma's activity-detail frame (node 17:5780), shown below
 * `ActivityGallery` on `/[country]/[city]/[activity]`.
 *
 * Figma's own map is a static London screenshot baked into the design file
 * — not usable as-is since it wouldn't match whichever activity/city this
 * section is actually rendering for. Instead `mapQuery` (e.g. "Wat Arun,
 * Bangkok, Thailand") drives a live Google Maps embed and the "Open in
 * Google Maps" link, so the map always matches the real activity rather
 * than shipping one fixed screenshot. No API key needed — both use Google's
 * plain query-based URLs.
 *
 * `pros`/`cons` are each optional and independently omittable: a section
 * with no downsides yet still renders its "Pros" column alone, and the
 * divider + Pros/Cons row disappears entirely if neither is provided —
 * ready for an activity whose data just doesn't have them yet.
 */

export type ActivityAboutProps = Omit<
    ComponentPropsWithRef<"section">,
    "children"
> & {
    descriptionHeading?: ReactNode;
    /** Bulleted description points, e.g. "Very pretty temple." */
    description: ReactNode[];
    prosHeading?: ReactNode;
    pros?: ReactNode[];
    consHeading?: ReactNode;
    cons?: ReactNode[];
    /** Heading level for "Description" — "Pros"/"Cons" sit one level below. Defaults to 2 (this page's own H1 is `ActivityGallery`'s heading). */
    headingLevel?: HeadingLevel;
    mapLabel?: ReactNode;
    /** Address or place name used to build both the map embed and the "Open in Google Maps" link, e.g. "Wat Arun, Bangkok, Thailand". */
    mapQuery: string;
};

const nextLevel = (level: HeadingLevel): HeadingLevel =>
    (level < 4 ? level + 1 : level) as HeadingLevel;

export const ActivityAbout = ({
    descriptionHeading = "Description",
    description,
    prosHeading = "Pros",
    pros,
    consHeading = "Cons",
    cons,
    headingLevel = 2,
    mapLabel = "Open in Google Maps",
    mapQuery,
    className,
    ref,
    ...props
}: ActivityAboutProps) => {
    const hasProsOrCons =
        (pros && pros.length > 0) || (cons && cons.length > 0);
    const subHeadingLevel = nextLevel(headingLevel);

    return (
        <section
            data-slot="activity-about"
            className={cn(
                "bg-bg-light-blue padding-block-responsive padding-inline-responsive flex w-full items-center justify-center",
                className,
            )}
            ref={ref}
            {...props}
        >
            <div className="flex w-full max-w-192.5 flex-col items-center gap-3.5">
                <div className="flex w-full flex-col items-start gap-7.5 pb-7.5">
                    <div className="flex flex-col items-start gap-2.5">
                        <Heading level={headingLevel} size="xl" weight="bold">
                            {descriptionHeading}
                        </Heading>
                        <ul className="text-text-primary leading-sm flex list-disc flex-col gap-1 ps-5 text-sm font-semibold">
                            {description.map((point, index) => (
                                <li key={index}>{point}</li>
                            ))}
                        </ul>
                    </div>

                    {hasProsOrCons && (
                        <>
                            <div
                                aria-hidden
                                className="border-blue/25 bg-blue/25 h-px w-full border"
                            />
                            <div className="flex w-full items-start gap-19.5">
                                {pros && pros.length > 0 && (
                                    <div className="flex flex-col items-start gap-2.5">
                                        <Heading
                                            level={subHeadingLevel}
                                            size="lg"
                                            weight="bold"
                                        >
                                            {prosHeading}
                                        </Heading>
                                        <ul className="text-text-primary leading-sm flex list-disc flex-col gap-1 ps-5 text-sm font-semibold whitespace-nowrap">
                                            {pros.map((point, index) => (
                                                <li key={index}>{point}</li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                                {cons && cons.length > 0 && (
                                    <div className="flex flex-col items-start gap-2.5">
                                        <Heading
                                            level={subHeadingLevel}
                                            size="lg"
                                            weight="bold"
                                        >
                                            {consHeading}
                                        </Heading>
                                        <ul className="text-text-primary leading-sm flex list-disc flex-col gap-1 ps-5 text-sm font-semibold whitespace-nowrap">
                                            {cons.map((point, index) => (
                                                <li key={index}>{point}</li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        </>
                    )}
                </div>

                <Text
                    asChild
                    size="sm"
                    weight="semibold"
                    textColor="blue"
                    className="w-full"
                >
                    <a
                        href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(mapQuery)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        {mapLabel}
                    </a>
                </Text>

                <div className="h-85 w-full overflow-hidden rounded-[10px]">
                    <iframe
                        src={`https://www.google.com/maps?q=${encodeURIComponent(mapQuery)}&output=embed`}
                        title={`Map showing ${mapQuery}`}
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        className="h-full w-full border-0"
                    />
                </div>
            </div>
        </section>
    );
};

ActivityAbout.displayName = "ActivityAbout";
