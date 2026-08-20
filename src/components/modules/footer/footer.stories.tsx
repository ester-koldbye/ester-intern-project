import type { Meta, StoryObj } from "@storybook/nextjs";
import { Footer } from "./footer";

const meta = {
    title: "Modules/Footer",
    component: Footer,
    tags: ["autodocs"],
    parameters: {
        layout: "fullscreen",
    },
    args: {
        // Fixed for stable snapshots — the component itself defaults to the current year.
        year: 2026,
    },
} satisfies Meta<typeof Footer>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Logo, Home/Countries/Contact links, divider, and copyright/social row. */
export const Default: Story = {};

/** Overriding the owner name and copyright year. */
export const CustomOwner: Story = {
    args: {
        owner: "Ester Piazza-Kolbye",
        year: 2025,
    },
};

/**
 * Below the `tablet` breakpoint (1024px) the layout stacks: smaller logo,
 * links in a column, and the social icons above the copyright line — shrink
 * the Storybook viewport to see it.
 */
export const Mobile: Story = {
    parameters: {
        viewport: {
            defaultViewport: "mobile1",
        },
    },
};
