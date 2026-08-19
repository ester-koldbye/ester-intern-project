import type { Meta, StoryObj } from "@storybook/nextjs";
import { IconButton } from "./icon-button";

const meta = {
    title: "UI/IconButton",
    component: IconButton,
    tags: ["autodocs"],
    parameters: {
        layout: "centered",
    },
    args: {
        variant: "primary",
    },
    argTypes: {
        variant: {
            control: "radio",
            options: ["primary", "secondary"],
        },
        direction: {
            control: "radio",
            options: ["right", "left"],
        },
        asChild: {
            control: "boolean",
        },
    },
    decorators: [
        (Story) => (
            <div className="bg-[#DDD5CA4D] p-10">
                <Story />
            </div>
        ),
    ],
} satisfies Meta<typeof IconButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Primary: Story = {
    args: { variant: "primary" },
};

export const Secondary: Story = {
    args: { variant: "secondary" },
};

/** asChild lets consumers map the IconButton's styling onto their own element, e.g. a router Link. */
export const AsChild: Story = {
    args: {
        asChild: true,
        children: (
            <a href="https://example.com" aria-label="Next">
                <svg width="17" height="14" viewBox="0 0 16.7067 13.9856" fill="none" aria-hidden="true">
                    <path d="M0 6.99278H15.646M9.18352 0.530333L15.646 6.99278L9.18352 13.4553" stroke="currentColor" strokeWidth="1.5" />
                </svg>
            </a>
        ),
    },
};

/** Confirms Tailwind 4 tokens from theme.css reach the Storybook preview. */
export const AllVariants: Story = {
    render: () => (
        <div className="flex flex-wrap gap-3">
            <IconButton aria-label="Default" />
            <IconButton variant="secondary" aria-label="Secondary" />
        </div>
    ),
};
