import type { Meta, StoryObj } from "@storybook/nextjs";
import { Logo } from "./logo";

const meta = {
    title: "UI/Logo",
    component: Logo,
    tags: ["autodocs"],
    parameters: {
        layout: "centered",
    },
    argTypes: {
        variant: {
            control: "radio",
            options: ["primary", "secondary"],
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
} satisfies Meta<typeof Logo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: { children: "Travel Guide" },
};

export const Primary: Story = {
    args: { variant: "primary", children: "Travel Guide" },
};

export const Secondary: Story = {
    args: { variant: "secondary", children: "Travel Guide" },
};

/** asChild lets consumers map the Logo's styling onto their own element, e.g. a router Link. */
export const AsChild: Story = {
    args: {
        asChild: true,
        children: <a href="https://example.com">Travel Guide</a>,
    },
};
