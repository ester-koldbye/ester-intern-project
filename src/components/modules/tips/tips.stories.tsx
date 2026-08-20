import type { Meta, StoryObj } from "@storybook/nextjs";
import { Tips } from "./tips";

const meta = {
    title: "Modules/Tips",
    component: Tips,
    tags: ["autodocs"],
    parameters: {
        layout: "fullscreen",
    },
} satisfies Meta<typeof Tips>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Matches Figma's "Tips" node exactly: a 3-up row of quick tips, then a 2-up row of app recommendations. */
export const Default: Story = {};

/** Overriding `rows` for another country's tips. */
export const CustomTips: Story = {
    args: {
        heading: "Tips",
        rows: [
            [
                {
                    title: "Carry small change",
                    description: "Vendors rarely have change for large notes",
                },
                {
                    title: "Learn a few phrases",
                    description: "Locals appreciate the effort, even if you get it wrong",
                },
            ],
        ],
    },
};

/**
 * Below `lg` rows stack into a single column and tip cards go full width —
 * shrink the Storybook viewport to see it.
 */
export const Mobile: Story = {
    parameters: {
        viewport: {
            defaultViewport: "mobile1",
        },
    },
};
