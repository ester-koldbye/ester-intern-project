import type { ComponentPropsWithRef, ReactNode } from "react";
import { cn } from "@/styles/utils";
import { BreadcrumbItem } from "@/components/ui/atoms/breadcrumb-item/breadcrumb-item"; // Henter BreadcrumbItem til at bruge i Breadcrumbs-komponenten

/**
 * A full breadcrumb trail, e.g. `Home / Country / City / Recommendation`.
 *
 * Composes `BreadcrumbItem` atoms from a flat list of crumbs: every crumb
 * renders as a link, the last one is marked `isActive` and skips its
 * trailing "/" separator, matching `BreadcrumbItem`'s own trail convention.
 * For anything more bespoke than a linear "current page is the last item"
 * trail, compose `BreadcrumbItem`s by hand instead of using this molecule.
 */

export type Crumb = {
    /** Unique key and link target for this crumb. */
    href: string;
    label: ReactNode;
};

export type BreadcrumbsProps = Omit<
    ComponentPropsWithRef<"nav">,
    "children"
> & {
    items: Crumb[];
};

export const Breadcrumbs = ({
    items,
    className,
    ref,
    ...props
}: BreadcrumbsProps) => {
    return (
        <div className="padding-block-responsive padding-inline-responsive">
            <nav
                aria-label="Breadcrumb"
                data-slot="breadcrumbs"
                className={cn(className)}
                ref={ref}
                {...props}
            >
                <ol className="flex flex-wrap items-center">
                    {items.map((item, index) => {
                        const isLast = index === items.length - 1;

                        return (
                            <li key={item.href}>
                                <BreadcrumbItem
                                    href={item.href}
                                    isActive={isLast}
                                    showSeparator={!isLast}
                                >
                                    {item.label}
                                </BreadcrumbItem>
                            </li>
                        );
                    })}
                </ol>
            </nav>
        </div>
    );
};

Breadcrumbs.displayName = "Breadcrumbs";
