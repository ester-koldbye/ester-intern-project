import type { Meta, StoryObj } from "@storybook/nextjs";
import { Hero } from "./hero";

const COUNTRIES = [
    { href: "/australia", label: "Australia" },
    { href: "/thailand", label: "Thailand" },
    { href: "/vietnam", label: "Vietnam" },
    { href: "/italy", label: "Italy" },
    { href: "/greece", label: "Greece" },
];

const meta = {
    title: "Modules/Hero",
    component: Hero,
    tags: ["autodocs"],
    parameters: {
        layout: "fullscreen",
    },
    args: {
        countries: COUNTRIES,
        activeCountryHref: "/thailand",
        buttons: [
            { key: "countries", label: "Countries", variant: "primary", href: "/countries" },
            { key: "cities", label: "Cities", href: "/cities" },
        ],
    },
} satisfies Meta<typeof Hero>;

export default meta;
type Story = StoryObj<typeof meta>;

/** The homepage hero: nav, heading, copy and the "Countries / Cities" pill row over the photo. */
export const Default: Story = {};

/** Figma's Desktop "landing hero text" variant shows several pills — `buttons` supports any number. */
export const ManyButtons: Story = {
    args: {
        buttons: [
            { key: "countries", label: "Countries", variant: "primary", href: "/countries" },
            { key: "cities-1", label: "Cities", href: "/cities" },
            { key: "cities-2", label: "Cities", href: "/cities" },
            { key: "cities-3", label: "Cities", href: "/cities" },
            { key: "cities-4", label: "Cities", href: "/cities" },
            { key: "cities-5", label: "Cities", href: "/cities" },
        ],
    },
};

/** Figma's shorter "landing hero text" variant, e.g. for an inner-page header: no pill row. */
export const NoButtons: Story = {
    args: {
        heading: "Short headline",
        description: "My recommendations from my backpacker trip",
        buttons: [],
    },
};

/**
 * Below the `tablet` breakpoint (1024px) the nav collapses to a hamburger
 * toggle and copy/pills shrink — shrink the Storybook viewport to see it.
 */
export const Mobile: Story = {
    parameters: {
        viewport: {
            defaultViewport: "mobile1",
        },
    },
};
