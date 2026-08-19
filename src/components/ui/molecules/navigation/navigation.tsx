"use client";

import { useState } from "react";
import type { ComponentPropsWithRef, ReactNode } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import Link from "next/link";
import type { Route } from "next";
import { cn } from "@/styles/utils";
import { Logo } from "@/components/ui/atoms/logo/logo";
import { NavLink } from "@/components/ui/atoms/nav-link/nav-link";
import { Button } from "@/components/ui/atoms/button/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/atoms/dropdown-menu/dropdown-menu";

/**
 * Site header navigation, e.g. "Travel guide" logo + Home / Countries / Contact.
 *
 * Composed entirely from existing atoms — `Logo`, `NavLink`, `DropdownMenu` and
 * `Button` — rather than introducing new styling. `variant` mirrors those
 * atoms' own "primary"/"secondary" naming and is passed straight through:
 * "primary" for white text on the dark hero header, "secondary" for dark text
 * on light backgrounds. Below 43rem (688px) — this component's own
 * breakpoint, not the shared `tablet` token in theme.css, since the nav needs
 * more room than the rest of the design system before it collapses — the
 * desktop row gives way to a hamburger toggle that reveals the same links
 * stacked in a dropdown panel. Figma only specifies the collapsed mobile
 * state, so the open panel's layout (not its content) is this component's
 * own addition.
 */

const hamburgerBarVariants = cva("block h-0.5 w-6 rounded-full transition-transform", {
    variants: {
        variant: {
            primary: "bg-icon-secondary",
            secondary: "bg-icon-primary",
        },
    },
    defaultVariants: {
        variant: "primary",
    },
});

const mobilePanelVariants = cva(
    "absolute inset-x-0 top-full z-50 flex flex-col items-start gap-4 p-padding-inline-mobile shadow-[0px_4px_20px_rgba(0,0,0,0.1)] min-[43rem]:hidden",
    {
        variants: {
            variant: {
                primary: "bg-dark-brown",
                secondary: "bg-white",
            },
        },
        defaultVariants: {
            variant: "primary",
        },
    },
);

export type NavCountry = {
    /** Unique key and link target for this country, e.g. "/thailand". */
    href: string;
    label: ReactNode;
};

export type NavigationProps = Omit<ComponentPropsWithRef<"nav">, "children"> &
    VariantProps<typeof hamburgerBarVariants> & {
        /** Countries listed in the "Countries" dropdown. */
        countries: NavCountry[];
        /** Marks the current country in the dropdown, e.g. while browsing Thailand pages. */
        activeCountryHref?: string;
        /** Text rendered by the `Logo` atom. Figma's logo is set in caps ("TRAVEL GUIDE"); the atom itself doesn't transform case, so that casing is baked into the default here. */
        logo?: ReactNode;
        logoHref?: string;
        homeHref?: string;
        contactHref?: string;
    };

export const Navigation = ({
    variant = "primary",
    countries,
    activeCountryHref,
    logo = "TRAVEL GUIDE",
    logoHref = "/",
    homeHref = "/",
    contactHref = "/contact",
    className,
    ref,
    ...props
}: NavigationProps) => {
    const [mobileOpen, setMobileOpen] = useState(false);
    // Contact button: outline with white text on the primary/dark nav,
    // outline with black text on the secondary/light nav — per Figma.
    const contactTextColor = variant === "primary" ? "light" : "dark";
    const closeMobileMenu = () => setMobileOpen(false);

    return (
        <nav
            data-slot="navigation"
            className={cn(
                "relative flex w-full items-center justify-between px-padding-inline-mobile min-[43rem]:px-padding-xl-inline",
                className,
            )}
            ref={ref}
            {...props}
        >
            <Logo asChild variant={variant} size="L" className="hidden min-[43rem]:inline">
                <Link href={logoHref as Route} aria-label="Go to homepage">
                    {logo}
                </Link>
            </Logo>
            <Logo asChild variant={variant} size="M" className="min-[43rem]:hidden">
                <Link href={logoHref as Route} aria-label="Go to homepage">
                    {logo}
                </Link>
            </Logo>

            {/* DESKTOP NAVIGATION (43rem and up) */}
            <div className="hidden items-center gap-11.25 min-[43rem]:flex">
                <div className="flex items-center gap-7.75">
                    <NavLink asChild variant={variant}>
                        <Link href={homeHref as Route}>Home</Link>
                    </NavLink>

                    <DropdownMenu>
                        <DropdownMenuTrigger variant={variant}>Countries</DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            {countries.map((country) => (
                                <DropdownMenuItem key={country.href} asChild active={country.href === activeCountryHref}>
                                    <Link href={country.href as Route}>{country.label}</Link>
                                </DropdownMenuItem>
                            ))}
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>

                <Button asChild variant="outline" textColor={contactTextColor} size="M">
                    <Link href={contactHref as Route}>Contact</Link>
                </Button>
            </div>

            {/* MOBILE BURGER NAVIGATION hamburger toggle (below 43rem) */}
            <button
                type="button"
                className="flex flex-col items-center justify-center gap-1.5 min-[43rem]:hidden"
                aria-expanded={mobileOpen}
                aria-controls="navigation-mobile-menu"
                aria-label={mobileOpen ? "Close menu" : "Open menu"}
                onClick={() => setMobileOpen((open) => !open)}
            >
                <span className={cn(hamburgerBarVariants({ variant }), mobileOpen && "translate-y-2 rotate-45")} />
                <span className={cn(hamburgerBarVariants({ variant }), mobileOpen && "-translate-y-2 -rotate-45")} />
            </button>

            {/* Mobile menu panel */}
            {mobileOpen && (
                <div id="navigation-mobile-menu" className={cn(mobilePanelVariants({ variant }))}>
                    <NavLink asChild variant={variant}>
                        <Link href={homeHref as Route} onClick={closeMobileMenu}>
                            Home
                        </Link>
                    </NavLink>

                    <DropdownMenu>
                        <DropdownMenuTrigger variant={variant}>Countries</DropdownMenuTrigger>
                        <DropdownMenuContent align="start">
                            {countries.map((country) => (
                                <DropdownMenuItem key={country.href} asChild active={country.href === activeCountryHref}>
                                    <Link href={country.href as Route} onClick={closeMobileMenu}>
                                        {country.label}
                                    </Link>
                                </DropdownMenuItem>
                            ))}
                        </DropdownMenuContent>
                    </DropdownMenu>

                    <Button asChild variant="outline" textColor={contactTextColor} size="M">
                        <Link href={contactHref as Route} onClick={closeMobileMenu}>
                            Contact
                        </Link>
                    </Button>
                </div>
            )}
        </nav>
    );
};

Navigation.displayName = "Navigation";
