import type { Meta, StoryObj } from "@storybook/nextjs";
import { IconButton } from "./icon-button";

const meta: Meta<typeof IconButton> = {
    title: "UI/IconButton",
    component: IconButton,
    args: {
        variant: "primary",
    },
    argTypes: {
        variant: {
            control: "radio",
            options: ["primary", "secondary"],
        },
    },
    decorators: [
        (Story) => (
            <div className="bg-[#DDD5CA4D] p-10">
                <Story />
            </div>
        ),
    ],
};

export default meta;
type Story = StoryObj<typeof IconButton>;

export const Default: Story = {};

export const Primary: Story = {
    args: { variant: "primary" },
};

export const Secondary: Story = {
    args: { variant: "secondary" },
};


/** Confirms Tailwind 4 tokens from globals.css reach the Storybook preview. */
export const AllVariants: Story = {
    render: () => (
        <div className="flex flex-wrap gap-3">
            <IconButton>Default</IconButton>
            <IconButton variant="secondary">Secondary</IconButton>
        </div>
    )
}