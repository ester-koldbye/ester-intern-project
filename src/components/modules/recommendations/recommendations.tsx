"use client";

import { Fragment, useState } from "react";
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
 * split:
 *
 * - Items marked `favorite` render first, capped at 4 (Figma's "max one
 *   large + three small"), under "My favorite {category}" — a hero card plus
 *   a stacked column beside it (`FeaturedGroup`). Any favorites beyond the
 *   4th fall back into the grid below rather than being dropped.
 * - Everything else (non-favorites, plus any favorite overflow) renders
 *   under "Other {category}" as a 3-column grid on desktop, 1 on mobile
 *   (`GridGroup`) — skipped entirely if nothing's left over.
 * - A category with no favorites at all skips the "My favorite"/"Other"
 *   split and just shows "{category label}" over all of its items: as the
 *   same grid once there are 2+ of them, or — matching Figma's own "Going
 *   out spots" example, which has exactly one item and nothing marked
 *   favorite — as a single full-width hero card (`FeaturedGroup` naturally
 *   renders just the hero when given one item, no stacked column beside it).
 *
 * Multiple visible category groups (i.e. "View all") are separated by a thin
 * divider, also per Figma.
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

/**
 * Hero card + a stacked column of up to 3 cards beside it — Figma's "max one
 * large + three small". Used both for a category's favorites and, when it
 * has none, its full item list (in which case there's usually just the
 * hero, rendered full-width with no stacked column beside it).
 */
const FeaturedGroup = ({
    items,
    cardTitleLevel,
}: {
    items: RecommendationItem[];
    cardTitleLevel: HeadingLevel;
}) => {
    const [hero, ...rest] = items;
    if (!hero) return null;
    // Capped here too (not just by the caller) so the component holds its
    // own "1 large + 3 small" contract regardless of how many items it's given.
    const stacked = rest.slice(0, 3);

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
                // `@container` lets the "responsive" cards below measure this
                // column's own width rather than the viewport's — so they
                // stay vertical while it's narrow (e.g. stacked under the
                // hero on mobile) and go horizontal once `lg:flex-1` gives
                // them real room, regardless of screen size.
                <div className="@container flex w-full flex-col items-start gap-8 lg:flex-1">
                    {stacked.map((item) => (
                        <ActivityCard
                            key={item.id}
                            layout="responsive"
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

/**
 * A grid of compact cards — 3 columns on desktop, 1 on mobile, per Figma.
 * Used for a category's non-favorites (plus any favorite overflow past
 * `FeaturedGroup`'s cap of 4), and for a whole category with no favorites at
 * all once it has 2+ items (below that, `FeaturedGroup` handles it instead).
 */
const GridGroup = ({
    items,
    cardTitleLevel,
}: {
    items: RecommendationItem[];
    cardTitleLevel: HeadingLevel;
}) => (
    <div className="grid w-full grid-cols-1 gap-x-8 gap-y-8 lg:grid-cols-3 lg:gap-y-16">
        {items.map((item) => (
            <ActivityCard
                key={item.id}
                layout="vertical"
                size="M"
                titleLevel={cardTitleLevel}
                className="w-full"
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
            // `FeaturedGroup`'s own cap (1 hero + 3 stacked) — computed here
            // too so the leftovers can be routed into the grid instead of
            // silently dropped.
            const heroFavorites = favorites.slice(0, 4);
            const heroFavoriteIds = new Set(heroFavorites.map((item) => item.id));
            const gridItems = categoryItems.filter((item) => !heroFavoriteIds.has(item.id));
            return { category, categoryItems, heroFavorites, gridItems };
        })
        // Categories with nothing to show yet (e.g. not fetched/added for this city) are skipped rather than rendering an empty heading.
        .filter((group) => group.categoryItems.length > 0);

    return (
        <section
            data-slot="recommendations"
            className={cn(
                "padding-block-responsive padding-inline-responsive flex w-full flex-col items-start gap-6 lg:gap-8 bg-white",
                className,
            )}
            ref={ref}
            {...props}
        >
            <Heading level={2} size="xl" weight="bold">
                View all {selectedCategory ? selectedCategory.label : recommendationsLabel}
            </Heading>

            <div className="flex w-full flex-col items-start gap-6 lg:grid lg:grid-cols-[1fr_auto] lg:gap-8">
                {/* Results: one group per visible category. Mobile shows the category filters first (below), desktop mirrors Figma with results on the left. */}
                <div className="order-2 flex w-full flex-1 flex-col items-start gap-8 lg:order-1 lg:gap-16">
                    {categoryGroups.length === 0 ? (
                        <Text size="sm" weight="semibold" textColor="grey">
                            No recommendations in this category yet.
                        </Text>
                    ) : (
                        categoryGroups.map(({ category, categoryItems, heroFavorites, gridItems }, index) => (
                            <Fragment key={category.id}>
                                {/* Divider between category groups (only relevant under "View all", where there's more than one). */}
                                {index > 0 && <div className="h-px w-full bg-orange/25" aria-hidden="true" />}
                                <div className="flex w-full flex-col items-start gap-8 lg:gap-16">
                                    {heroFavorites.length > 0 ? (
                                        <>
                                            <div className="flex w-full flex-col items-start gap-10">
                                                <Heading level={3} size="xl" weight="semibold">
                                                    My favorite {category.name}
                                                </Heading>
                                                <FeaturedGroup items={heroFavorites} cardTitleLevel={cardTitleLevel} />
                                            </div>
                                            {/* Non-favorites, plus any favorite past FeaturedGroup's cap of 4. */}
                                            {gridItems.length > 0 && (
                                                <div className="flex w-full flex-col items-start gap-10">
                                                    <Heading level={3} size="xl" weight="semibold">
                                                        Other {category.name}
                                                    </Heading>
                                                    <GridGroup items={gridItems} cardTitleLevel={cardTitleLevel} />
                                                </div>
                                            )}
                                        </>
                                    ) : (
                                        <div className="flex w-full flex-col items-start gap-10">
                                            <Heading level={3} size="xl" weight="semibold">
                                                {category.label}
                                            </Heading>
                                            {/* Figma's "Going out spots": a single item with no favorites
                                                gets one full-width hero card rather than a lopsided grid. */}
                                            {categoryItems.length < 2 ? (
                                                <FeaturedGroup items={categoryItems} cardTitleLevel={cardTitleLevel} />
                                            ) : (
                                                <GridGroup items={categoryItems} cardTitleLevel={cardTitleLevel} />
                                            )}
                                        </div>
                                    )}
                                </div>
                            </Fragment>
                        ))
                    )}
                </div>

                {/* Category filters */}
                <div className="order-1 flex w-full flex-col items-start gap-6 lg:order-2 lg:w-40 lg:shrink-0">
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
