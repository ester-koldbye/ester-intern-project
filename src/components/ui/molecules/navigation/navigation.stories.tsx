import type { Meta, StoryObj } from "@storybook/nextjs";
import { Navigation } from "./navigation";

const COUNTRIES = [
    { href: "/australia", label: "Australia" },
    { href: "/thailand", label: "Thailand" },
    { href: "/vietnam", label: "Vietnam" },
    { href: "/italy", label: "Italy" },
    { href: "/greece", label: "Greece" },
];

const meta = {
    title: "UI/Navigation",
    component: Navigation,
    tags: ["autodocs"],
    parameters: {
        layout: "fullscreen",
    },
    args: {
        countries: COUNTRIES,
        activeCountryHref: "/thailand",
    },
    argTypes: {
        variant: {
            control: "radio",
            options: ["primary", "secondary"],
        },
    },
} satisfies Meta<typeof Navigation>;

export default meta;
type Story = StoryObj<typeof meta>;

/** White text over the dark hero header. */
export const Primary: Story = {
    args: { variant: "primary" },
    decorators: [
        (Story) => (
            <div className="bg-dark-brown py-6">
                <Story />
            </div>
        ),
    ],
};

/** Dark text over a light background, e.g. once the page has scrolled past the hero. */
export const Secondary: Story = {
    args: { variant: "secondary" },
    decorators: [
        (Story) => (
            <div className="bg-white py-6">
                <Story />
            </div>
        ),
    ],
};

/**
 * Below the `tablet` breakpoint (1024px) the nav collapses to a hamburger
 * toggle. Shrink the Storybook viewport (or the preview pane) to see it.
 */
export const Mobile: Story = {
    args: { variant: "primary" },
    parameters: {
        viewport: {
            defaultViewport: "mobile1",
        },
    },
    decorators: [
        (Story) => (
            <div className="max-w-sm bg-dark-brown py-6">
                <Story />
            </div>
        ),
    ],
};
