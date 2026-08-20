import type { ComponentPropsWithRef, ReactNode } from "react";
import Link from "next/link";
import type { Route } from "next";
import { cn } from "@/styles/utils";
import { Logo } from "@/components/ui/atoms/logo/logo";
import { NavLink } from "@/components/ui/atoms/nav-link/nav-link";

/**
 * Site footer, e.g. the logo + Home/Countries/Contact links, divider, and
 * copyright/social row at the bottom of every page — Figma's "Footer"
 * component (https://library.relume.io/components/footer-7).
 *
 * Composed from the existing `Logo` and `NavLink` atoms, same convention as
 * `Navigation` — reusing their "secondary" variant since the footer sits on
 * a white background rather than the dark hero. Sizing is mobile-first with
 * a `lg:` override, same convention as `Hero`; unlike `Navigation`
 * (which needs its own tighter breakpoint to fit the nav links), the footer
 * has no dense row to protect, so it uses the shared `lg` token.
 *
 * Facebook/Instagram are the only social icons in Figma, so they're kept as
 * local, inline SVGs rather than a generic icon system — same pattern as
 * `IconButton`'s arrow.
 */

const FacebookIcon = () => (
    <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
    >
        <path
            d="M20 10.0611C20 4.50451 15.5229 0 10 0C4.47715 0 0 4.50451 0 10.0611C0 15.0828 3.65684 19.2452 8.4375 20V12.9694H5.89844V10.0611H8.4375V7.84452C8.4375 5.32296 9.9305 3.93012 12.2146 3.93012C13.3088 3.93012 14.4531 4.12663 14.4531 4.12663V6.60261H13.1922C11.95 6.60261 11.5625 7.37822 11.5625 8.1739V10.0611H14.3359L13.8926 12.9694H11.5625V20C16.3432 19.2452 20 15.083 20 10.0611Z"
            fill="currentColor"
        />
    </svg>
);

const InstagramIcon = () => (
    <svg
        width="18"
        height="18"
        viewBox="0 0 18 18"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
    >
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M13 0H5C2.23858 0 0 2.23858 0 5V13C0 15.7614 2.23858 18 5 18H13C15.7614 18 18 15.7614 18 13V5C18 2.23858 15.7614 0 13 0ZM16.25 13C16.2445 14.7926 14.7926 16.2445 13 16.25H5C3.20735 16.2445 1.75549 14.7926 1.75 13V5C1.75549 3.20735 3.20735 1.75549 5 1.75H13C14.7926 1.75549 16.2445 3.20735 16.25 5V13ZM13.75 5.25C14.3023 5.25 14.75 4.80228 14.75 4.25C14.75 3.69772 14.3023 3.25 13.75 3.25C13.1977 3.25 12.75 3.69772 12.75 4.25C12.75 4.80228 13.1977 5.25 13.75 5.25ZM9 4.5C6.51472 4.5 4.5 6.51472 4.5 9C4.5 11.4853 6.51472 13.5 9 13.5C11.4853 13.5 13.5 11.4853 13.5 9C13.5027 7.8057 13.0294 6.65957 12.1849 5.81508C11.3404 4.97059 10.1943 4.49734 9 4.5ZM6.25 9C6.25 10.5188 7.4812 11.75 9 11.75C10.5188 11.75 11.75 10.5188 11.75 9C11.75 7.4812 10.5188 6.25 9 6.25C7.4812 6.25 6.25 7.4812 6.25 9Z"
            fill="currentColor"
        />
    </svg>
);

export type FooterProps = Omit<ComponentPropsWithRef<"footer">, "children"> & {
    /** Text rendered by the `Logo` atom. Figma's logo is set in caps ("TRAVEL GUIDE"), same default as `Navigation`. */
    logo?: ReactNode;
    logoHref?: string;
    homeHref?: string;
    countriesHref?: string;
    contactHref?: string;
    facebookHref?: string;
    instagramHref?: string;
    /** Defaults to the current year so the copyright doesn't need a manual yearly bump. */
    year?: number;
    owner?: ReactNode;
};

export const Footer = ({
    logo = "TRAVEL GUIDE",
    logoHref = "/",
    homeHref = "/",
    countriesHref = "/countries",
    contactHref = "/contact",
    facebookHref = "https://facebook.com",
    instagramHref = "https://instagram.com",
    year = new Date().getFullYear(),
    owner = "Ester Piazza-Kolbye",
    className,
    ref,
    ...props
}: FooterProps) => {
    return (
        <footer
            data-slot="footer"
            className={cn(
                "px-padding-inline-mobile flex w-full flex-col items-center gap-12 overflow-clip bg-white py-12 lg:gap-20 lg:px-16 lg:py-20",
                className,
            )}
            ref={ref}
            {...props}
        >
            <div className="flex w-full flex-col items-center gap-8">
                <Logo
                    asChild
                    variant="secondary"
                    size="M"
                    className="lg:hidden"
                >
                    <Link href={logoHref as Route} aria-label="Go to homepage">
                        {logo}
                    </Link>
                </Logo>

                <Logo
                    asChild
                    variant="secondary"
                    size="L"
                    className="hidden lg:block"
                >
                    <Link href={logoHref as Route} aria-label="Go to homepage">
                        {logo}
                    </Link>
                </Logo>

                <div className="flex w-full flex-col items-center gap-6 lg:w-auto lg:flex-row lg:justify-center lg:gap-8">
                    <NavLink asChild variant="secondary">
                        <Link href={homeHref as Route}>Home</Link>
                    </NavLink>
                    <NavLink asChild variant="secondary">
                        <Link href={countriesHref as Route}>Countries</Link>
                    </NavLink>
                    <NavLink asChild variant="secondary">
                        <Link href={contactHref as Route}>Contact</Link>
                    </NavLink>
                </div>
            </div>

            <div className="flex w-full flex-col items-center gap-6 pb-4 lg:gap-8 lg:pb-0">
                <div
                    aria-hidden
                    className="border-orange/25 bg-orange/25 h-px w-full border"
                />

                <div className="flex w-full flex-col items-center gap-8 lg:flex-row lg:items-start lg:justify-between">
                    <p className="font-poppins leading-2xs text-text-primary order-2 text-xs font-semibold tracking-[0.24px] lg:order-1">
                        © {year} {owner}
                    </p>
                    <div className="order-1 flex items-center gap-6 lg:order-2">
                        <a
                            href={facebookHref}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Visit our Facebook page"
                            className="text-icon-primary hover:text-text-tertiary flex size-6 items-center justify-center transition-colors"
                        >
                            <FacebookIcon />
                        </a>
                        <a
                            href={instagramHref}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Visit our Instagram page"
                            className="text-icon-primary hover:text-text-tertiary flex size-6 items-center justify-center transition-colors"
                        >
                            <InstagramIcon />
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

Footer.displayName = "Footer";
