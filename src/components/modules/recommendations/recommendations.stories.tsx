import type { Meta, StoryObj } from "@storybook/nextjs";
import { Recommendations, type RecommendationItem } from "./recommendations";

const ITEMS: RecommendationItem[] = [
    // Activities: two favorites (hero + one stacked) plus two others (grid).
    {
        id: "wat-arun",
        category: "activities",
        favorite: true,
        imageSrc: "/destinations/thailand/chiang-mai.jpg",
        tag: "Temple",
        location: "Bangkok",
        locationHref: "https://maps.google.com",
        title: "Wat Arun",
        description: "A steep but short hike up to one of Thailand's most famous temples, with a view over the whole city.",
        readMoreHref: "/",
    },
    {
        id: "grand-palace",
        category: "activities",
        favorite: true,
        imageSrc: "/destinations/thailand/bangkok.jpg",
        tag: "Famous street",
        location: "Bangkok",
        locationHref: "https://maps.google.com",
        title: "Grand Palace",
        readMoreHref: "/",
    },
    {
        id: "floating-market",
        category: "activities",
        imageSrc: "/destinations/thailand/koh-phangan.jpg",
        tag: "Market",
        location: "Bangkok",
        locationHref: "https://maps.google.com",
        title: "Floating Market",
        readMoreHref: "/",
    },
    {
        id: "chinatown",
        category: "activities",
        imageSrc: "/destinations/thailand/krabi.JPG",
        tag: "Famous street",
        location: "Bangkok",
        locationHref: "https://maps.google.com",
        title: "Chinatown",
        readMoreHref: "/",
    },
    // Where to eat: no favorites yet, so it's a plain "Where to eat" heading over a hero+stack of everything.
    {
        id: "night-bazaar",
        category: "where-to-eat",
        imageSrc: "/destinations/thailand/bangkok.jpg",
        tag: "Famous street",
        location: "Bangkok",
        locationHref: "https://maps.google.com",
        title: "Night bazaar street food",
        readMoreHref: "/",
    },
    // Going out: a single favorite, nothing else — matches Figma's own "Going out spots" example.
    {
        id: "khao-san-road",
        category: "going-out",
        favorite: true,
        imageSrc: "/destinations/thailand/koh-phangan.jpg",
        tag: "Famous street",
        location: "Bangkok",
        locationHref: "https://maps.google.com",
        title: "Khao San Road",
        readMoreHref: "/",
    },
];

const meta = {
    title: "Modules/Recommendations",
    component: Recommendations,
    tags: ["autodocs"],
    parameters: {
        layout: "fullscreen",
    },
    args: {
        items: ITEMS,
    },
} satisfies Meta<typeof Recommendations>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * "View all": every category with data gets its own group. Activities has
 * favorites, so it splits into "My favorite activities" + "Other
 * activities"; Where to eat has none, so it's just "Where to eat" over a
 * hero+stack of everything; Going out has one favorite and nothing else, so
 * only "My favorite going out" shows, no "Other" heading. Accommodations has
 * no data at all, so it doesn't render.
 */
export const Default: Story = {};

/**
 * Clicking a category updates the H2 to "All {category}" and narrows the
 * results to just that category's own group (still split into
 * favorites/other the same way).
 */
export const FilterByCategory: Story = {};

/** A category with no matching items yet still renders nothing for it (no crash, no empty heading) — useful once `items` comes from a fetch that might return nothing for a given city/category. */
export const EmptyCategory: Story = {
    args: {
        items: [],
    },
};

/** Below `lg` the category filters move above the results, and cards stack full-width. */
export const Mobile: Story = {
    parameters: {
        viewport: {
            defaultViewport: "mobile1",
        },
    },
};
