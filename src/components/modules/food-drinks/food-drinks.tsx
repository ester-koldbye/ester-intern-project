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
 * of accordion entries — and their text — follows whatever's passed in. The
 * two-column split below is just that list divided roughly in half (Figma's
 * own 5/4 split for 9 items falls out of the same math); it collapses to a
 * single column below `lg`.
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
    "Green Curry",
    "Red Curry",
    "Coconut Soup",
    "Mango Sticky Rice",
    "Khao Soi",
    "Pad Kaprow",
    "Tom Yum Soup",
    "Massam Curry",
    "Panang curry",
].map((title) => ({
    title,
    points: ["Typical thai dish with rice on the rice.", "Can be very spicy."],
}));

export type FoodDrinksProps = Omit<
    ComponentPropsWithRef<"section">,
    "children"
> & {
    heading?: ReactNode;
    description?: ReactNode;
    items?: FoodDrinksItem[];
};

export const FoodDrinks = ({
    heading = "Foods & Drinks to try",
    description = "Try at restaurants, night markets or on the street",
    items = DEFAULT_ITEMS,
    className,
    ref,
    ...props
}: FoodDrinksProps) => {
    const half = Math.ceil(items.length / 2);
    const columns = [items.slice(0, half), items.slice(half)];

    return (
        <section
            data-slot="food-drinks"
            className={cn(
                "px-padding-inline-mobile py-padding-block-mobile lg:px-padding-xl-inline lg:py-padding-xl-block flex w-full flex-col items-center gap-12 bg-white lg:gap-20",
                className,
            )}
            ref={ref}
            {...props}
        >
            <div className="flex w-full max-w-3xl flex-col items-center gap-6 text-center">
                <Heading level={2} size="2xl" weight="semibold">
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
                {columns.map((column, columnIndex) => (
                    <div
                        // Columns are a pure layout split of one flat list, not separate data — index is fine.
                        key={columnIndex}
                        className="border-dark-brown flex w-full flex-1 flex-col border-b"
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
