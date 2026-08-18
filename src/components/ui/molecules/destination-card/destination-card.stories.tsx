import type { Meta, StoryObj } from "@storybook/nextjs";
import { DestinationCard } from "./destination-card";


const meta = {
    title: "UI/DestinationCard",
    component: DestinationCard,
    tags: ["autodocs"],
    parameters: {
        layout: "centered",
    },
    args: {
        imageSrc: "/destinations/australia.jpg",
        label: "Australia",
    },
    argTypes: {
        size: {
            control: "select",
            options: ["L", "M", "S"],
        },
    },
} satisfies Meta<typeof DestinationCard>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Large — 589×361, the default size. */
export const Large: Story = {
    args: { size: "L" },
};

/** Medium — 384×361. */
export const Medium: Story = {
    args: { size: "M" },
};

/** Small — 160×150. Label drops to a smaller, bolder size to stay legible on the shorter card. */
export const Small: Story = {
    args: { size: "S" },
};

/** All three sizes side by side, as they appear together in the Figma spec. */
export const AllSizes: Story = {
    render: (args) => (
        <div className="flex flex-wrap items-end gap-6">
            <DestinationCard {...args} size="L" />
            <DestinationCard {...args} size="M" />
            <DestinationCard {...args} size="S" />
        </div>
    ),
};

/** Cards are purely presentational; wrap in a link (e.g. `next/link`'s `Link`) to make one navigable. */
export const AsLink: Story = {
    args: { size: "M" },
    render: (args) => (
        <a href="/australia">
            <DestinationCard {...args} />
        </a>
    ),
};
