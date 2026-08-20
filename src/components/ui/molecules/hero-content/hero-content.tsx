import type { ComponentPropsWithRef, ReactNode } from "react";
import Link from "next/link";
import type { Route } from "next";
import { cn } from "@/styles/utils";
import { Heading } from "@/components/ui/atoms/heading/heading";
import { Text } from "@/components/ui/atoms/text/text";
import { SectionNav } from "@/components/ui/molecules/section-nav/section-nav";
import type { ButtonProps } from "@/components/ui/atoms/button/button";

/**
 * Hero heading, supporting copy and a row of pill buttons, e.g. the
 * "Welcome to my travel recommendations" block over the homepage hero photo.
 *
 * `buttons` is an open-ended list rather than a fixed "primary + secondary"
 * pair — Figma's own Desktop variant of this component shows several pills
 * in the row (e.g. "Countries", "Cities", ...), so callers can add as many
 * as the page needs. Each entry picks its own look via `variant` (Button's
 * own "primary"/"secondary"), rather than this component inferring
 * "first = active" from position.
 *
 * Sizing is mobile-first with a `lg:` (1024px) override on the copy and
 * the pills, matching the Desktop/Mobile split in Figma's "landing hero
 * text" component. A single responsive element rather than Navigation's
 * dual-render, since only sizing/spacing changes between the two here, not
 * structure.
 *
 * `buttons` defaults to none — Figma also has a shorter "landing hero text"
 * variant with no pill row at all (e.g. for inner-page headers), which this
 * covers by simply omitting the prop rather than needing a separate variant.
 */

export type HeroButton = Partial<Pick<ButtonProps, "variant">> & {
    /** Unique key for the list — also used as the link target when `href` is set. */
    key: string;
    label: ReactNode;
    href?: string;
    onClick?: () => void;
};

export type HeroContentProps = Omit<
    ComponentPropsWithRef<"div">,
    "children"
> & {
    heading?: ReactNode;
    description?: ReactNode;
    buttons?: HeroButton[];
};

export const HeroContent = ({
    heading = "Welcome to my travel recommendations",
    description = "My recommendations from my backpacker trip and vacations:)",
    buttons = [],
    className,
    ref,
    ...props
}: HeroContentProps) => {
    return (
        <div
            className={cn(
                "px-padding-inline-mobile lg:gap-padding-block-mobile lg:px-padding-xl-inline flex flex-col items-start gap-5",
                className,
            )}
            ref={ref}
            {...props}
        >
            <Heading
                level={1}
                size="xl"
                weight="semibold"
                variant="secondary"
                className="leading-xl lg:leading-2xl w-full tracking-[-0.32px] lg:max-w-154.75 lg:text-2xl lg:font-bold lg:tracking-[-0.56px]"
            >
                {heading}
            </Heading>

            <Text
                textColor="light"
                size="sm"
                weight="semibold"
                className="lg:text-md lg:leading-lg w-full lg:max-w-225"
            >
                {description}
            </Text>

            <SectionNav
                items={buttons.map(({ key, label, href }) => ({
                    id: key,
                    label: href ? (
                        <Link href={href as Route}>{label}</Link>
                    ) : (
                        label
                    ),
                }))}
                variant="secondary"
                size="M"
                className="flex flex-wrap items-center gap-3 pt-5 pb-5 lg:pb-0"
            />
        </div>
    );
};

HeroContent.displayName = "HeroContent";
