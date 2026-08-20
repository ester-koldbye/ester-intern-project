import type { Meta, StoryObj } from "@storybook/nextjs";
import { Heading } from "@/components/ui/atoms/heading/heading";
import { Text } from "@/components/ui/atoms/text/text";
import { SectionNav } from "./section-nav";

const meta = {
    title: "Modules/SectionNav",
    component: SectionNav,
    tags: ["autodocs"],
    parameters: {
        layout: "padded",
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
    },
    args: {
        items: [
            { id: "overview", label: "Overview" },
            { id: "itinerary", label: "Itinerary" },
            { id: "included", label: "What's included" },
            { id: "reviews", label: "Reviews" },
        ],
    },
} satisfies Meta<typeof SectionNav>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Buttons for four H2 sections. */
export const Default: Story = {
    decorators: [
        (Story) => (
            <div className="bg-dark-brown p-6">
                <Story />
            </div>
        ),
    ],
};

/** Only two H2s on the page — add or remove `items` to match. */
export const TwoItems: Story = {
    args: {
        items: [
            { id: "overview", label: "Overview" },
            { id: "reviews", label: "Reviews" },
        ],
    },
    decorators: [
        (Story) => (
            <div className="bg-dark-brown p-6">
                <Story />
            </div>
        ),
    ],
};

/** No H2s to link to yet: the module renders nothing rather than an empty nav. */
export const NoItems: Story = {
    args: { items: [] },
};

/**
 * Wired up to real H2s on the "page": clicking a button smooth-scrolls to,
 * and focuses, the matching section below.
 */
export const WithSections: Story = {
    decorators: [
        (Story) => (
            <div className="bg-dark-brown p-6">
                <Story />
            </div>
        ),
    ],
    render: (args) => (
        <div className="flex flex-col gap-8">
            <SectionNav {...args} />
            {args.items.map((item) => (
                <section key={item.id} id={item.id} className="scroll-mt-4 rounded-lg bg-[#DDD5CA4D] p-10">
                    <Heading level={2}>{item.label}</Heading>
                    <Text className="mt-2">Section content for &ldquo;{item.label}&rdquo; goes here.</Text>
                </section>
            ))}
        </div>
    ),
};
