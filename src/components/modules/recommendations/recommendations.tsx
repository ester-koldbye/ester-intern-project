"use client";

import { useState } from "react";
import type { ComponentPropsWithRef, ReactNode } from "react";
import { cva } from "class-variance-authority";
import { cn } from "@/styles/utils";
import { Heading, type HeadingLevel } from "@/components/ui/atoms/heading/heading";
import { Text } from "@/components/ui/atoms/text/text";
import {
    ActivityCard,
    type ActivityCardProps,
} from "@/components/ui/molecules/activity-card/activity-card";

/**
 * "My recommendations" section on a city page: a filterable, per-category
 * list of `ActivityCard`s split into a "Categories" sidebar and a results
 * area — Figma's "City recoms" component
 * (https://library.relume.io/components/blog-17), specifically its "View
 * all"/"All my recommendations" state (node 12:29021).
 *
 * The H2 tracks the selected filter: "All my recommendations" for "View
 * all", or "All {category label}" (e.g. "All Activities") once one is
 * picked. Under each visible category, an H3 sub-heading follows Figma's own
 * split: items marked `favorite` render first as "My favorite {category}"
 * (a hero card + a stacked column beside it), then any non-favorites render
 * as "Other {category}" (a wrapping grid) below that. A category with no
 * favorites at all skips the split and just shows "{category label}" over
 * all of its items in the hero+stack layout — matching Figma's own "Going
 * out spots" example, which has nothing marked as a favorite.
 *
 * `items` is a flat array (each with its own `category` and optional
 * `favorite` flag) rather than pre-split per category/group, so it's ready
 * for fetched data: a city page can own its own `RecommendationItem[]` (from
 * an API/CMS call) and hand it straight to `items` — which groups end up
 * showing, and how many cards land in the hero+stack vs. the grid, all
 * follow whatever's passed in. `categories` is a separate, explicit list
 * (defaulting to Figma's four) rather than derived from `items`, so a city
 * can define its own filter set independent of how much data currently
 * exists for each one.
 *
 * Marked `'use client'` for the category filter's interactive state.
 */

export type RecommendationCategory = {
    /** Matches `RecommendationItem.category`. Also used as the React key. */
    id: string;
    /** Shown in the "Categories" sidebar and in the "All {label}" H2 once this category is selected, e.g. "Activities". */
    label: ReactNode;
    /** Lowercase form used inside generated sub-headings, e.g. "activities" in "My favorite activities" / "Other activities". */
    name: string;
};

export type RecommendationItem = Pick<
    ActivityCardProps,
    | "imageSrc"
    | "imageAlt"
    | "tag"
    | "location"
    | "locationHref"
    | "title"
    | "description"
    | "readMoreLabel"
    | "readMoreHref"
    | "onReadMoreClick"
> & {
    /** Unique key for the list. */
    id: string;
    /** Matches a `RecommendationCategory.id` to group/filter this item into that category. */
    category: string;
    /** Marks this as one of the traveller's favorites within its category — shown under "My favorite {category}", above "Other {category}". */
    favorite?: boolean;
};

/** Strips the list-only fields (`id`, `category`, `favorite`) so the rest can be spread straight onto `ActivityCard`. */
const toCardProps = ({ id, category, favorite, ...cardProps }: RecommendationItem) => cardProps;

const ALL_CATEGORY = "all";

const DEFAULT_CATEGORIES: RecommendationCategory[] = [
    { id: "activities", label: "Activities", name: "activities" },
    { id: "where-to-eat", label: "Where to eat", name: "where to eat" },
    { id: "going-out", label: "Going out", name: "going out" },
    { id: "accommodations", label: "Accommodations", name: "accommodations" },
];

const categoryButtonVariants = cva(
    "font-poppins text-text-primary w-full rounded-sm px-4 py-3 text-left text-base tracking-[0.32px] transition-colors hover:bg-light-grey",
    {
        variants: {
            active: {
                true: "bg-light-grey font-bold",
                false: "font-regular",
            },
        },
        defaultVariants: {
            active: false,
        },
    },
);

/** Hero card + a stacked column of horizontal cards beside it. Used both for a category's favorites and, when it has none, its full item list. */
const FeaturedGroup = ({
    items,
    cardTitleLevel,
}: {
    items: RecommendationItem[];
    cardTitleLevel: HeadingLevel;
}) => {
    const [hero, ...stacked] = items;
    if (!hero) return null;

    return (
        <div className="flex w-full flex-col items-start gap-8 lg:flex-row">
            <ActivityCard
                layout="vertical"
                size="L"
                titleLevel={cardTitleLevel}
                className="w-full lg:flex-1"
                {...toCardProps(hero)}
            />
            {stacked.length > 0 && (
                <div className="flex w-full flex-col items-start gap-6 lg:flex-1">
                    {stacked.map((item) => (
                        <ActivityCard
                            key={item.id}
                            layout="horizontal"
                            size="M"
                            titleLevel={cardTitleLevel}
                            className="w-full"
                            {...toCardProps(item)}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

/** A wrapping grid of compact cards. Used for a category's non-favorites. */
const GridGroup = ({
    items,
    cardTitleLevel,
}: {
    items: RecommendationItem[];
    cardTitleLevel: HeadingLevel;
}) => (
    <div className="flex w-full flex-wrap gap-8">
        {items.map((item) => (
            <ActivityCard
                key={item.id}
                layout="vertical"
                size="M"
                titleLevel={cardTitleLevel}
                {...toCardProps(item)}
            />
        ))}
    </div>
);

export type RecommendationsProps = Omit<
    ComponentPropsWithRef<"section">,
    "children"
> & {
    /** The "All ___" H2's subject while "View all" is selected, e.g. "All my recommendations". Replaced by the selected category's `label` once one is picked. */
    recommendationsLabel?: ReactNode;
    /** Filter options shown in the "Categories" sidebar, in order. "View all" is added automatically. Defaults to Figma's four. */
    categories?: RecommendationCategory[];
    items: RecommendationItem[];
    /** Heading level for each card's title. Cards sit one level below this section's own H3 sub-headings — defaults to 4. */
    cardTitleLevel?: HeadingLevel;
};

export const Recommendations = ({
    recommendationsLabel = "my recommendations",
    categories = DEFAULT_CATEGORIES,
    items,
    cardTitleLevel = 4,
    className,
    ref,
    ...props
}: RecommendationsProps) => {
    const [activeCategory, setActiveCategory] = useState<string>(ALL_CATEGORY);
    const selectedCategory = categories.find((category) => category.id === activeCategory);

    // Every category under "View all", or just the selected one when
    // filtered — same per-category group rendering either way, just fewer
    // groups to loop over.
    const visibleCategories =
        activeCategory === ALL_CATEGORY
            ? categories
            : categories.filter((category) => category.id === activeCategory);

    const categoryGroups = visibleCategories
        .map((category) => {
            const categoryItems = items.filter((item) => item.category === category.id);
            const favorites = categoryItems.filter((item) => item.favorite);
            const others = categoryItems.filter((item) => !item.favorite);
            return { category, categoryItems, favorites, others };
        })
        // Categories with nothing to show yet (e.g. not fetched/added for this city) are skipped rather than rendering an empty heading.
        .filter((group) => group.categoryItems.length > 0);

    return (
        <section
            data-slot="recommendations"
            className={cn(
                "py-padding-block-mobile px-padding-inline-mobile md:py-padding-m-block md:px-padding-m-inline lg:py-padding-xl-block lg:px-padding-xl-inline flex w-full flex-col items-start gap-12 bg-white lg:gap-20",
                className,
            )}
            ref={ref}
            {...props}
        >
            <Heading level={2} size="xl" weight="bold">
                View all {selectedCategory ? selectedCategory.label : recommendationsLabel}
            </Heading>

            <div className="flex w-full flex-col items-start gap-8 lg:flex-row lg:gap-11">
                {/* Results: one group per visible category. Mobile shows the category filters first (below), desktop mirrors Figma with results on the left. */}
                <div className="order-2 flex w-full flex-1 flex-col items-start gap-16 lg:order-1">
                    {categoryGroups.length === 0 ? (
                        <Text size="sm" weight="semibold" textColor="grey">
                            No recommendations in this category yet.
                        </Text>
                    ) : (
                        categoryGroups.map(({ category, categoryItems, favorites, others }) => (
                            <div
                                key={category.id}
                                className="flex w-full flex-col items-start gap-16"
                            >
                                {favorites.length > 0 ? (
                                    <>
                                        <div className="flex w-full flex-col items-start gap-10">
                                            <Heading level={3} size="xl" weight="semibold">
                                                My favorite {category.name}
                                            </Heading>
                                            <FeaturedGroup items={favorites} cardTitleLevel={cardTitleLevel} />
                                        </div>
                                        {others.length > 0 && (
                                            <div className="flex w-full flex-col items-start gap-10">
                                                <Heading level={3} size="xl" weight="semibold">
                                                    Other {category.name}
                                                </Heading>
                                                <GridGroup items={others} cardTitleLevel={cardTitleLevel} />
                                            </div>
                                        )}
                                    </>
                                ) : (
                                    <div className="flex w-full flex-col items-start gap-10">
                                        <Heading level={3} size="xl" weight="semibold">
                                            {category.label}
                                        </Heading>
                                        <FeaturedGroup items={categoryItems} cardTitleLevel={cardTitleLevel} />
                                    </div>
                                )}
                            </div>
                        ))
                    )}
                </div>

                {/* Category filters */}
                <div className="order-1 flex w-full flex-col items-start gap-6 lg:order-2 lg:w-60 lg:shrink-0">
                    <Text
                        as="span"
                        size="base"
                        weight="bold"
                        className="tracking-[0.32px]"
                    >
                        Categories
                    </Text>
                    <div className="flex w-full flex-col items-start">
                        <button
                            type="button"
                            aria-pressed={activeCategory === ALL_CATEGORY}
                            onClick={() => setActiveCategory(ALL_CATEGORY)}
                            className={cn(
                                categoryButtonVariants({
                                    active: activeCategory === ALL_CATEGORY,
                                }),
                            )}
                        >
                            View all
                        </button>
                        {categories.map((category) => (
                            <button
                                key={category.id}
                                type="button"
                                aria-pressed={activeCategory === category.id}
                                onClick={() => setActiveCategory(category.id)}
                                className={cn(
                                    categoryButtonVariants({
                                        active: activeCategory === category.id,
                                    }),
                                )}
                            >
                                {category.label}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

Recommendations.displayName = "Recommendations";
