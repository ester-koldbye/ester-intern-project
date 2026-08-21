import type { Meta, StoryObj } from "@storybook/nextjs";
import { ActivityAbout } from "./activity-about";

const meta = {
    title: "Modules/ActivityAbout",
    component: ActivityAbout,
    tags: ["autodocs"],
    parameters: {
        layout: "fullscreen",
    },
    args: {
        description: [
            "Very pretty temple.",
            "Perfect sunset spot.",
            "You can take the local boat taxa to get there.",
        ],
        pros: [
            "Free to look at from outside",
            "Right on the river, great photo spot",
            "Rarely crowded before 9am",
        ],
        cons: [
            "Steep steps if you climb the central prang",
            "Strict dress code enforced at the entrance",
        ],
        mapQuery: "Wat Arun, Bangkok, Thailand",
    },
} satisfies Meta<typeof ActivityAbout>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Matches Figma's "About recommendation" frame: description, a Pros/Cons pair, and a live map for `mapQuery`. */
export const Default: Story = {};

/** With no `pros`/`cons` passed, the divider and the whole row disappear — just the description and map remain. */
export const DescriptionOnly: Story = {
    args: {
        pros: undefined,
        cons: undefined,
    },
};

/** `pros` and `cons` are independent — an activity with only upsides still renders its "Pros" column alone. */
export const ProsOnly: Story = {
    args: {
        cons: undefined,
    },
};
