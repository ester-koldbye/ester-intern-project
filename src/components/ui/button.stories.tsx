import type { Meta, StoryObj } from "@storybook/nextjs";
import { Button } from "./button";

const meta: Meta<typeof Button> = {
    title: "UI/Button",
    component: Button,
    argTypes: {
        variant: {
            control: "radio",
            options: ["primary", "secondary", "tertiary"],
        },
        size: {
            control: "radio",
            options: ["S", "M", "L"],
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
type Story = StoryObj<typeof Button>;

export const Default: Story = {
    args: { children: "Button"}
};

export const Primary: Story = {
    args: { variant: "primary", children: "Primary" },
};

export const Secondary: Story = {
    args: { variant: "secondary", children: "Secondary" },
};

export const Tertiary: Story = {
    args: { variant: "tertiary", children: "Tertiary" },
};

export const Quaternary: Story = {
    args: { variant: "quaternary", children: "Quaternary" },
};


/** Confirms Tailwind 4 tokens from globals.css reach the Storybook preview. */
export const AllVariants: Story = {
    args: { children: 'Button' },
    render: () => (
        <div className="flex flex-wrap gap-3">
            <Button>Default</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="tertiary">Tertiary</Button>
            <Button variant="quaternary">Quaternary</Button>
        </div>
    )
}