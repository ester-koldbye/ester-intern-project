import type { Meta, StoryObj } from "@storybook/nextjs";
import { Recommendations, type RecommendationItem } from "./recommendations";

const ITEMS: RecommendationItem[] = [
    // Activities: 5 favorites — FeaturedGroup's own cap (1 hero + 3 stacked)
    // kicks in, so the 5th ("chinatown") spills into "Other activities"
    // alongside the 2 genuine non-favorites, rather than being dropped.
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
        id: "muay-thai-stadium",
        category: "activities",
        favorite: true,
        imageSrc: "/destinations/thailand/koh-tao.JPG",
        tag: "Stadium",
        location: "Bangkok",
        locationHref: "https://maps.google.com",
        title: "Rajadamnern Muay Thai Stadium",
        readMoreHref: "/",
    },
    {
        id: "khao-san-road-activities",
        category: "activities",
        favorite: true,
        imageSrc: "/destinations/thailand/koh-phangan.jpg",
        tag: "Famous street",
        location: "Bangkok",
        locationHref: "https://maps.google.com",
        title: "Khao San Road",
        readMoreHref: "/",
    },
    {
        id: "chinatown",
        category: "activities",
        favorite: true,
        imageSrc: "/destinations/thailand/krabi.JPG",
        tag: "Famous street",
        location: "Bangkok",
        locationHref: "https://maps.google.com",
        title: "Chinatown",
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
        id: "sleeping-buddha",
        category: "activities",
        imageSrc: "/destinations/thailand/pai.JPG",
        tag: "Temple",
        location: "Bangkok",
        locationHref: "https://maps.google.com",
        title: "The Sleeping Buddha",
        readMoreHref: "/",
    },
    // Where to eat: no favorites, and 3 items — enough to show the fallback
    // 3-column/1-column grid rather than a hero+stack.
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
    {
        id: "seven-eleven",
        category: "where-to-eat",
        imageSrc: "/destinations/thailand/koh-samui.jpg",
        tag: "Restaurant",
        location: "Bangkok",
        locationHref: "https://maps.google.com",
        title: "7/11",
        readMoreHref: "/",
    },
    {
        id: "corgi-cafe",
        category: "where-to-eat",
        imageSrc: "/destinations/thailand/krabi.JPG",
        tag: "Cafe",
        location: "Bangkok",
        locationHref: "https://maps.google.com",
        title: "Corgi In The Garden",
        readMoreHref: "/",
    },
    // Going out: a single item, no favorites — matches Figma's own "Going out
    // spots" example: one full-width hero card, not a lopsided grid.
    {
        id: "khao-san-road",
        category: "going-out",
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
 * "View all": every category with data gets its own group, separated by a
 * thin divider. Activities has 5 favorites, so it splits into "My favorite
 * activities" (hero + 3 stacked — Figma's cap) and "Other activities" (the
 * 5th favorite plus the 2 genuine non-favorites, in the 3-column grid);
 * Where to eat has no favorites but 3 items, so it's "Where to eat" straight
 * over the same grid; Going out has one item and no favorites, so it's "Going
 * out" over a single full-width hero card. Accommodations has no data at
 * all, so it doesn't render.
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
