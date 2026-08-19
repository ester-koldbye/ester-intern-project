import type { Meta, StoryObj } from "@storybook/nextjs";
import { HeroContent } from "./hero-content";

const meta = {
    title: "UI/HeroContent",
    component: HeroContent,
    tags: ["autodocs"],
    parameters: {
        layout: "fullscreen",
    },
    args: {
        buttons: [
            {
                key: "countries",
                label: "Countries",
                variant: "secondary",
                href: "/countries",
            },
            { key: "cities", label: "Cities", href: "/cities" },
        ],
    },
    decorators: [
        (Story) => (
            <div className="bg-dark-brown py-15">
                <Story />
            </div>
        ),
    ],
} satisfies Meta<typeof HeroContent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

/** Figma's Desktop variant of "landing hero text" shows more than two pills — `buttons` supports any number. */
export const ManyButtons: Story = {
    args: {
        buttons: [
            {
                key: "countries",
                label: "Countries",
                variant: "secondary",
                href: "/countries",
            },
            { key: "cities", label: "Cities", href: "/cities" },
            { key: "thailand", label: "Thailand", href: "/thailand" },
            { key: "vietnam", label: "Vietnam", href: "/vietnam" },
            { key: "italy", label: "Italy", href: "/italy" },
            { key: "greece", label: "Greece", href: "/greece" },
        ],
    },
};

export const CustomCopy: Story = {
    args: {
        heading: "Where to next?",
        description: "A running list of the places I'd send a friend.",
        buttons: [
            {
                key: "explore",
                label: "Explore",
                variant: "secondary",
                href: "/explore",
            },
        ],
    },
};
