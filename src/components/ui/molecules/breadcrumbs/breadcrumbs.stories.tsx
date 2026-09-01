import type { Meta, StoryObj } from "@storybook/nextjs";
import { Breadcrumbs } from "./breadcrumbs";

const meta = {
    title: "UI/Breadcrumbs",
    component: Breadcrumbs,
    tags: ["autodocs"],
    parameters: {
        layout: "centered",
    },
    args: {
        items: [
            { href: "/", label: "Home" },
            { href: "/country", label: "Country" },
            { href: "/country/city", label: "City" },
            { href: "/country/city/recommendation", label: "Recommendation" },
        ],
    },
    decorators: [
        (Story) => (
            <div className="bg-[#DDD5CA4D] p-10">
                <Story />
            </div>
        ),
    ],
} satisfies Meta<typeof Breadcrumbs>;

export default meta;
type Story = StoryObj<typeof meta>;

/** A full breadcrumb trail; the current page ("Recommendation") is shown in blue with no trailing separator. */
export const Default: Story = {};

/** A short, two-crumb trail. */
export const TwoItems: Story = {
    args: {
        items: [
            { href: "/", label: "Home" },
            { href: "/thailand", label: "Thailand" },
        ],
    },
};

/** A single crumb: renders active, with no separator, e.g. on a top-level page. */
export const SingleItem: Story = {
    args: {
        items: [{ href: "/thailand", label: "Thailand" }],
    },
};
