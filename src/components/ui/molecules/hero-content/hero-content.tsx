import type { ComponentPropsWithRef, ReactNode } from "react";
import Link from "next/link";
import type { Route } from "next";
import { cn } from "@/styles/utils";
import { Heading } from "@/components/ui/atoms/heading/heading";
import { Text } from "@/components/ui/atoms/text/text";
import { Button, type ButtonProps } from "@/components/ui/atoms/button/button";

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
 * Sizing is mobile-first with a `tablet:` (1024px) override on the copy and
 * the pills, matching the Desktop/Mobile split in Figma's "landing hero
 * text" component. A single responsive element rather than Navigation's
 * dual-render, since only sizing/spacing changes between the two here, not
 * structure.
 */

export type HeroButton = Pick<ButtonProps, "variant"> & {
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
    buttons: HeroButton[];
};

// Figma's Desktop pill matches Button's own "M" size exactly, so only the
// Mobile pill (smaller than any existing Button size) needs overriding here.
const pillClassName =
    "min-w-19.5 p-2.5 text-xs tracking-[0.24px] tablet:min-w-35 tablet:px-5.5 tablet:py-4.5 tablet:text-base tablet:tracking-[0.32px]";

export const HeroContent = ({
    heading = "Welcome to my travel recommendations",
    description = "My recommendations from my backpacker trip and vacations:)",
    buttons,
    className,
    ref,
    ...props
}: HeroContentProps) => {
    return (
        <div
            className={cn(
                "px-padding-inline-mobile tablet:gap-7.5 tablet:px-padding-xl-inline flex flex-col items-start gap-5",
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
                className="leading-xl tablet:max-w-154.75 tablet:text-2xl tablet:leading-2xl tablet:font-bold tablet:tracking-[-0.56px] w-full tracking-[-0.32px]"
            >
                {heading}
            </Heading>

            <Text
                textColor="light"
                size="sm"
                weight="semibold"
                className="tablet:max-w-225 tablet:text-md tablet:leading-lg w-full"
            >
                {description}
            </Text>

            <div className="tablet:pb-0 flex flex-wrap items-center gap-3 pt-5 pb-5">
                {buttons.map(
                    ({ key, label, href, onClick, variant = "secondary" }) =>
                        href ? (
                            <Button
                                key={key}
                                asChild
                                variant={variant}
                                className={pillClassName}
                            >
                                <Link href={href as Route}>{label}</Link>
                            </Button>
                        ) : (
                            <Button
                                key={key}
                                type="button"
                                variant={variant}
                                onClick={onClick}
                                className={pillClassName}
                            >
                                {label}
                            </Button>
                        ),
                )}
            </div>
        </div>
    );
};

HeroContent.displayName = "HeroContent";
