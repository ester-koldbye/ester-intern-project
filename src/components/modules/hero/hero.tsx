import type { ComponentPropsWithRef } from "react";
import Image from "next/image";
import { cn } from "@/styles/utils";
import {
    Navigation,
    type NavigationProps,
} from "@/components/ui/molecules/navigation/navigation";
import {
    HeroContent,
    type HeroContentProps,
} from "@/components/ui/molecules/hero-content/hero-content";

/**
 * Full-bleed page hero, e.g. the "Welcome to my travel recommendations"
 * banner over the ocean photo on the homepage — Figma's "Hero" component.
 *
 * Composed from the existing `Navigation` and `HeroContent` molecules over a
 * background photo, rather than reimplementing either. The two dark overlays
 * (a flat tint plus a top-to-bottom fade) match Figma's own layered
 * gradients so text stays legible against any photo.
 *
 * Sizing is mobile-first with a `lg:` override, same convention as
 * `Navigation` and `HeroContent`. Figma splits this into separate
 * Desktop/Mobile pixel heights (and a shorter "no buttons" variant); rather
 * than hardcoding each as its own fixed-height variant, `min-h-*` plus
 * `HeroContent`'s own optional `buttons` gives the same range of looks and
 * still flexes with real (longer/shorter, translated, etc.) copy.
 */

export type HeroProps = Omit<ComponentPropsWithRef<"section">, "children"> &
    Pick<
        NavigationProps,
        | "countries"
        | "activeCountryHref"
        | "logoHref"
        | "homeHref"
        | "contactHref"
    > &
    Pick<HeroContentProps, "heading" | "description" | "buttons"> & {
        /** Background photo. Defaults to the homepage's own `/hero.jpg`. */
        backgroundSrc?: string;
        backgroundAlt?: string;
    };

export const Hero = ({
    backgroundSrc = "/hero.jpg",
    backgroundAlt = "",
    countries,
    activeCountryHref,
    logoHref,
    homeHref,
    contactHref,
    heading,
    description,
    buttons,
    className,
    ref,
    ...props
}: HeroProps) => {
    return (
        <section
            data-slot="hero"
            className={cn(
                "gap-padding-xl-inline relative isolate flex flex-col overflow-hidden h-full min-h-130 lg:min-h-175",
                className,
            )}
            ref={ref}
            {...props}
        >
            <Image
                src={backgroundSrc}
                alt={backgroundAlt}
                fill
                priority
                sizes="100vw"
                className="-z-20 object-cover"
            />
            {/* Flat tint + top-to-bottom fade, matching Figma's layered gradients so the nav/heading stay legible over any photo. */}
            <div
                aria-hidden
                className="absolute inset-0 -z-10 bg-black/30 lg:bg-black/40"
            />
            <div
                aria-hidden
                className="absolute inset-0 -z-10 bg-linear-to-b from-black/50 to-black/0"
            />

            <Navigation
                variant="primary"
                countries={countries}
                activeCountryHref={activeCountryHref}
                logoHref={logoHref}
                homeHref={homeHref}
                contactHref={contactHref}
                className="pt-padding-block-mobile lg:pt-10"
            />

            <HeroContent
                heading={heading}
                description={description}
                buttons={buttons}
                className="padding-block-responsive padding-inline-responsive lg:pb-15"
            />
        </section>
    );
};

Hero.displayName = "Hero";
