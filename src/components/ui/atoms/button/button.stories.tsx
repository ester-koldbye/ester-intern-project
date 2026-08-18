import type { Meta, StoryObj } from "@storybook/nextjs";
import { Button } from "./button";

const meta = {
    title: "UI/Button",
    component: Button,
    tags: ["autodocs"],
    parameters: {
        layout: "centered",
    },
    argTypes: {
        variant: {
            control: "radio",
            options: ["primary", "secondary", "tertiary", "quaternary"],
        },
        size: {
            control: "radio",
            options: ["S", "M", "L"],
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
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: { children: "Button" },
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

/** asChild lets consumers map the Button's styling onto their own element, e.g. a router Link. */
export const AsChild: Story = {
    args: {
        asChild: true,
        children: <a href="https://example.com">Link styled as a button</a>,
    },
};

/** Confirms Tailwind 4 tokens from theme.css reach the Storybook preview. */
export const AllVariants: Story = {
    args: { children: "Button" },
    render: () => (
        <div className="flex flex-wrap gap-3">
            <Button>Default</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="tertiary">Tertiary</Button>
            <Button variant="quaternary">Quaternary</Button>
        </div>
    ),
};
