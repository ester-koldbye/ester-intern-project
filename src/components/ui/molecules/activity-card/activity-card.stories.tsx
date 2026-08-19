import type { Meta, StoryObj } from "@storybook/nextjs";
import { ActivityCard } from "./activity-card";


const meta = {
    title: "UI/ActivityCard",
    component: ActivityCard,
    tags: ["autodocs"],
    parameters: {
        layout: "centered",
    },
    args: {
        imageSrc: "/destinations/vietnam.JPG",
        tag: "Hike",
        location: "Link",
        title: "Activity name",
        titleLevel: 3,
        readMoreHref: "/",
    },
    argTypes: {
        layout: {
            control: "radio",
            options: ["vertical", "horizontal"],
        },
        size: {
            control: "radio",
            options: ["L", "M"],
        },
    },
} satisfies Meta<typeof ActivityCard>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Large vertical card — 584×400 image, 32px title, description shown. Matches Figma's "Card 1" desktop view. */
export const Vertical: Story = {
    args: {
        layout: "vertical",
        size: "L",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros.",
    },
};

/** Compact vertical card — 379×300 image, 24px title, no description. Matches Figma's "Card 3". */
export const Compact: Story = {
    args: {
        layout: "vertical",
        size: "M",
    },
};

/** Compact vertical card with the optional description shown — Figma's "Card 3" has one, just hidden by default. */
export const CompactWithDescription: Story = {
    args: {
        layout: "vertical",
        size: "M",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
};

/** Horizontal card — 250×250 square image on the left, no description. Matches Figma's "Card 2". */
export const Horizontal: Story = {
    args: {
        layout: "horizontal",
        size: "M",
    },
};

/** `readMoreHref`/`locationHref` wire the button and the location label to `next/link`/an anchor instead of a plain button. */
export const AsLink: Story = {
    args: {
        layout: "vertical",
        size: "L",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros.",
        locationHref: "https://maps.google.com",
        readMoreHref: "/",
    },
};

/** All three Figma cards side by side, as they appear together in the spec. */
export const AllVariants: Story = {
    render: (args) => (
        <div className="flex flex-wrap items-start gap-6">
            <ActivityCard
                {...args}
                layout="vertical"
                size="L"
                description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros."
            />
            <ActivityCard {...args} layout="vertical" size="M" />
            <ActivityCard {...args} layout="horizontal" size="M" />
        </div>
    ),
};
