"use client";

import type { ComponentPropsWithRef, ReactNode } from "react";
import { cn } from "@/styles/utils";
import { Heading } from "@/components/ui/atoms/heading/heading";
import { Text } from "@/components/ui/atoms/text/text";
import {
    Accordion,
    AccordionItem,
    AccordionTrigger,
    AccordionContent,
} from "@/components/ui/atoms/accordion/accordion";

/**
 * Full-bleed "Foods & Drinks to try" section on a country page: a centered
 * heading over an accordion of dishes (e.g. "Green Curry" expanding into a
 * bulleted list of notes) — Figma's "food&drinks" component
 * (https://library.relume.io/components/faq-10). Marked `'use client'`
 * because the underlying `Accordion` needs interactivity.
 *
 * `items` is a plain array rather than a fixed set of slots, so the number
 * of accordion entries — and how many land in each column — follows
 * whatever's passed in. That means it's ready for fetched data: a page can
 * own its own `FoodDrinksItem[]` (from an API/CMS call) and hand it to
 * `items` as-is, no restructuring needed, the same way `CardsSection`'s
 * `items` works for Tips-style sections. `columns` (default 2, Figma's own
 * split) controls how many columns that list is divided into — Figma's own
 * 5/4 split for 9 items across 2 columns falls out of the same even-ish
 * chunking; it collapses to a single column below `lg` regardless of
 * `columns`.
 *
 * Every item starts closed — `type="multiple"` (so more than one can be open
 * at a time, matching Figma) rather than mirroring Figma's screenshot-time
 * example expansions, which would need per-item state that doesn't belong
 * to the design.
 */

export type FoodDrinksItem = {
    title: ReactNode;
    /** Bullet points shown when expanded. An item with no points still renders its trigger row, just with nothing to expand. */
    points?: string[];
};

const DEFAULT_ITEMS: FoodDrinksItem[] = [
    "Food name",
].map((title) => ({
    title,
    points: ["Food description"],
}));

export type FoodDrinksProps = Omit<
    ComponentPropsWithRef<"section">,
    "children"
> & {
    heading?: ReactNode;
    description?: ReactNode;
    items?: FoodDrinksItem[];
    /** How many columns to split `items` across (`lg` and up only — single column below that regardless). Defaults to 2, matching Figma. */
    columns?: number;
};

export const FoodDrinks = ({
    heading = "Foods & Drinks to try",
    description = "Try at restaurants, night markets or on the street",
    items = DEFAULT_ITEMS,
    columns = 2,
    className,
    ref,
    ...props
}: FoodDrinksProps) => {
    // Even-ish chunking, e.g. 9 items / 2 columns -> 5 then 4, matching
    // Figma's own split; empty columns are dropped so fewer items than
    // `columns` doesn't render blank slots.
    const perColumn = Math.ceil(items.length / Math.max(1, columns));
    const itemColumns = Array.from({ length: columns }, (_, i) =>
        items.slice(i * perColumn, (i + 1) * perColumn),
    ).filter((column) => column.length > 0);

    return (
        <section
            data-slot="food-drinks"
            className={cn(
                "px-padding-block-mobile py-padding-inline-mobile lg:px-padding-xl-block lg:py-padding-xl-inline flex w-full flex-col items-center gap-12 bg-white lg:gap-20",
                className,
            )}
            ref={ref}
            {...props}
        >
            <div className="flex w-full max-w-3xl flex-col items-center gap-6 text-center">
                <Heading level={2} size="xl" weight="semibold">
                    {heading}
                </Heading>
                {description && (
                    <Text as="p" size="sm" weight="bold">
                        {description}
                    </Text>
                )}
            </div>

            <Accordion
                type="multiple"
                className="flex w-full flex-col gap-8 lg:flex-row lg:gap-16"
            >
                {itemColumns.map((column, columnIndex) => (
                    <div
                        // Columns are a pure layout split of one flat list, not separate data — index is fine.
                        key={columnIndex}
                        className="border-dark-brown flex w-full flex-1 flex-col"
                    >
                        {column.map((item, itemIndex) => {
                            const value = `item-${columnIndex}-${itemIndex}`;

                            return (
                                <AccordionItem key={value} value={value}>
                                    <AccordionTrigger>
                                        {item.title}
                                    </AccordionTrigger>
                                    {item.points && item.points.length > 0 && (
                                        <AccordionContent>
                                            <ul className="text-text-primary leading-lg flex list-disc flex-col ps-6 text-base">
                                                {item.points.map(
                                                    (point, pointIndex) => (
                                                        <li key={pointIndex}>
                                                            {point}
                                                        </li>
                                                    ),
                                                )}
                                            </ul>
                                        </AccordionContent>
                                    )}
                                </AccordionItem>
                            );
                        })}
                    </div>
                ))}
            </Accordion>
        </section>
    );
};

FoodDrinks.displayName = "FoodDrinks";
