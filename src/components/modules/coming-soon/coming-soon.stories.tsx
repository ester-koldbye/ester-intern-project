import type { Meta, StoryObj } from "@storybook/nextjs";
import { ComingSoon } from "./coming-soon";

const meta = {
    title: "Modules/ComingSoon",
    component: ComingSoon,
    tags: ["autodocs"],
    parameters: {
        layout: "fullscreen",
    },
} satisfies Meta<typeof ComingSoon>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Shown on a real destination (e.g. `/australia`) that's linkable but has no write-up yet. */
export const Default: Story = {};

/** Heading and description can be tailored per destination, e.g. naming the country/city. */
export const CustomCopy: Story = {
    args: {
        heading: "Australia — coming soon",
        description: "Still working through the photos from this trip. Tips and recommendations are on their way.",
    },
};
