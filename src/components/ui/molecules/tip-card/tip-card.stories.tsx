import type { Meta, StoryObj } from "@storybook/nextjs";
import { TipCard } from "./tip-card";

const meta = {
    title: "UI/TipCard",
    component: TipCard,
    tags: ["autodocs"],
    parameters: {
        layout: "centered",
    },
    args: {
        title: "Try streetfood",
        description: "Try the streetfood a local spots - Its so good and way way cheaper",
    },
    decorators: [
        (Story) => (
            <div className="w-80">
                <Story />
            </div>
        ),
    ],
} satisfies Meta<typeof TipCard>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Matches Figma's "Stat" node exactly. */
export const Default: Story = {};

/**
 * `description` is a `ReactNode`, so a multi-entry list (e.g. app
 * recommendations) can be passed as a string with blank lines between
 * entries — `whitespace-pre-line` preserves them.
 */
export const MultiLineDescription: Story = {
    args: {
        title: "Apps for transportation",
        description:
            "Grab (cheap transport)\n\nBold (cheap transport, but it's often more expensive than grab)",
    },
};

/** A row of tips as they'd appear inside the `Tips` module. */
export const Row: Story = {
    decorators: [
        (Story) => (
            <div className="w-240">
                <Story />
            </div>
        ),
    ],
    render: (args) => (
        <div className="flex w-full gap-12">
            <TipCard {...args} />
            <TipCard
                title="Eat spicy food at home"
                description="Before you go, train yourself to eat spicy food (its for your own good)"
            />
        </div>
    ),
};
