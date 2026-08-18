import type { Meta, StoryObj } from "@storybook/nextjs";
import { BreadcrumbItem } from "./breadcrumb-item";

const meta = {
    title: "UI/BreadcrumbItem",
    component: BreadcrumbItem,
    tags: ["autodocs"],
    parameters: {
        layout: "centered",
    },
    args: {
        children: "Breadcrumb item",
        href: "#",
    },
    argTypes: {
        isActive: {
            control: "boolean",
        },
        showSeparator: {
            control: "boolean",
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
} satisfies Meta<typeof BreadcrumbItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

/** The regular, non-current state — dark brown text. */
export const Inactive: Story = {
    args: { isActive: false, children: "Country" },
};

/** The current-page state — orange text and `aria-current="page"`. */
export const Active: Story = {
    args: { isActive: true, children: "Recommendation" },
};

/** Last item in a trail: no trailing "/" separator. */
export const WithoutSeparator: Story = {
    args: { isActive: true, children: "Recommendation", showSeparator: false },
};

/** asChild lets consumers map the item's styling onto their own element, e.g. a router Link. */
export const AsChild: Story = {
    args: {
        asChild: true,
        children: <a href="https://example.com">BreadcrumbItem styled link</a>,
    },
};

/** A two-item trail: "Home / Thailand", the current page shown in orange with no trailing separator. */
export const TwoItemTrail: Story = {
    render: () => (
        <nav aria-label="Breadcrumb">
            <ol className="flex items-center">
                <li>
                    <BreadcrumbItem href="/">Home</BreadcrumbItem>
                </li>
                <li>
                    <BreadcrumbItem href="/thailand" isActive showSeparator={false}>
                        Thailand
                    </BreadcrumbItem>
                </li>
            </ol>
        </nav>
    ),
};

/** A full breadcrumb trail composed from individual items, only the last of which skips the separator. */
export const BreadcrumbTrail: Story = {
    render: () => (
        <nav aria-label="Breadcrumb">
            <ol className="flex items-center">
                <li>
                    <BreadcrumbItem href="/">Home</BreadcrumbItem>
                </li>
                <li>
                    <BreadcrumbItem href="/country">Country</BreadcrumbItem>
                </li>
                <li>
                    <BreadcrumbItem href="/country/city">City</BreadcrumbItem>
                </li>
                <li>
                    <BreadcrumbItem href="/country/city/recommendation" isActive showSeparator={false}>
                        Recommendation
                    </BreadcrumbItem>
                </li>
            </ol>
        </nav>
    ),
};
