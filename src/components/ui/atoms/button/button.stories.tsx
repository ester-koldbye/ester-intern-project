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
            options: ["primary", "secondary", "outline"],
        },
        textColor: {
            control: "radio",
            options: ["dark", "light"],
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
    args: { variant: "primary", textColor: "dark", children: "Primary" }, 
};

export const Secondary: Story = {
    args: { variant: "secondary", textColor: "dark", children: "Secondary" }, 
};

export const Outline: Story = {
    args: { variant: "outline", textColor: "dark", children: "Outline" },
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
            <Button variant="primary">Default</Button> {/* orange, hover bliver outline med sort tekst */}
            <Button variant="secondary" textColor="dark">Secondary</Button> {/* hvid med sort tekst */}
            <Button variant="outline" textColor="dark">Outline (Dark)</Button> {/* outline, sort tekst */}
            <Button variant="outline" textColor="light">Outline (Light)</Button> {/* outline, hvid tekst */}
        </div>
    ),
};
