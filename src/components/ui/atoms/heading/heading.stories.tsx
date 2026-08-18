import type { Meta, StoryObj } from "@storybook/nextjs";
import { Heading } from "./heading";

const meta = {
    title: "UI/Heading",
    component: Heading,
    tags: ["autodocs"],
    parameters: {
        layout: "centered",
    },
    argTypes: {
        size: {
            control: "radio",
            options: ["MD", "LG", "XL", "XXL"],
        },
        level: {
            control: "radio",
            options: [1, 2, 3, 4],
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
} satisfies Meta<typeof Heading>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: { children: "Heading" }
};

export const MD: Story = {
    args: { size: "MD", children: "Medium Heading" },
};

export const LG: Story = {
    args: { size: "LG", children: "Large Heading" },
};

export const XL: Story = {
    args: { size: "XL", children: "Extra Large Heading" },
};

export const XXL: Story = {
    args: { size: "XXL", children: "Extra Extra Large Heading" },
};

export const Level1: Story = {
    args: { level: 1, children: "Heading Level 1" },
};

export const Level2: Story = {
    args: { level: 2, children: "Heading Level 2" },
};

export const Level3: Story = {
    args: { level: 3, children: "Heading Level 3" },
};

export const Level4: Story = {
    args: { level: 4, children: "Heading Level 4" },
};

/** asChild lets consumers map the Heading's styling onto their own element, e.g. a router Link. */
export const AsChild: Story = {
    args: {
        asChild: true,
        level: 2,
        children: <a href="https://example.com">Heading styled link</a>,
    },
};