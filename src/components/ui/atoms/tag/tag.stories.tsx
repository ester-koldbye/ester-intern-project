import type { Meta, StoryObj } from "@storybook/nextjs";
import { Tag } from "./tag";

const meta = {
    title: "Typography/Tag",
    component: Tag,
    tags: ["autodocs"],
    parameters: {
        layout: "centered",
    },
    args: {
        children: "Tag",
    },
    argTypes: {
        variant: {
            control: "radio",
            options: ["dark", "light"],
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
} satisfies Meta<typeof Tag>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

/** Dark fill, white text — the version overlaid on an image. */
export const Dark: Story = {
    args: { variant: "dark", children: "Featured" },
};

/** White fill, dark text — the version used on a light surface. */
export const Light: Story = {
    args: { variant: "light", children: "Featured" },
};

export const BothVariants: Story = {
    render: () => (
        <div className="flex gap-3">
            <Tag variant="dark">Dark</Tag>
            <Tag variant="light">Light</Tag>
        </div>
    ),
};

/** asChild lets consumers map the Tag's styling onto their own element, e.g. a router Link. */
export const AsChild: Story = {
    args: {
        asChild: true,
        children: <a href="https://example.com">Tag styled link</a>,
    },
};
