import type { Meta, StoryObj } from "@storybook/nextjs";
import { Heading } from "./heading";

const meta = {
    title: "Typography/Heading",
    component: Heading,
    tags: ["autodocs"],
    parameters: {
        layout: "centered",
    },
    args: {
        level: 2,
        children: "Heading",
    },
    argTypes: {
        level: {
            control: "radio",
            options: [1, 2, 3, 4],
            description: "Picks the element. Chosen from the surrounding outline, never from how big it should look.",
        },
        size: {
            control: "radio",
            options: ["2xl", "xl", "lg", "md"],
            description: "Picks the appearance. Defaults from level; passing it always wins.",
        },
        variant: {
            control: "radio",
            options: ["primary", "secondary", "tertiary", "quaternary"],
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

export const Default: Story = {};

/** Every size at a fixed level, so the scale is comparable in isolation. */
export const Sizes: Story = {
    render: () => (
        <div className="flex flex-col gap-4">
            <Heading level={2} size="2xl">
                2xl — the largest step
            </Heading>
            <Heading level={2} size="xl">
                xl — section titles
            </Heading>
            <Heading level={2} size="lg">
                lg — sub-sections
            </Heading>
            <Heading level={2} size="md">
                md — in-page callouts
            </Heading>
        </div>
    ),
};

/**
 * The reason `level` and `size` are split. Every heading here is an h2 — one
 * flat, valid slice of a document outline — yet they range from a page title
 * down to a callout. Without the split, the middle two would have to become
 * an h3 and an h4 purely to look right, silently breaking the outline for
 * screen readers.
 */
export const LevelIsIndependentOfSize: Story = {
    render: () => (
        <div className="flex flex-col gap-4">
            <Heading level={2} size="2xl">
                h2, 2xl size
            </Heading>
            <Heading level={2} size="lg">
                h2, lg size
            </Heading>
            <Heading level={2} size="md">
                h2, md size
            </Heading>
        </div>
    ),
};

/** Omitting size gives each level a sensible default, which is the common case. */
export const DefaultsPerLevel: Story = {
    render: () => (
        <div className="flex flex-col gap-4">
            <Heading level={1}>level 1 — defaults to 2xl</Heading>
            <Heading level={2}>level 2 — defaults to xl</Heading>
            <Heading level={3}>level 3 — defaults to lg</Heading>
            <Heading level={4}>level 4 — defaults to md</Heading>
        </div>
    ),
};

/** Variant is a token decision (the same four colors Button/Logo/NavLink/Text expose), so it lives in the API. */
export const Variants: Story = {
    render: () => (
        <div className="flex flex-col gap-4">
            <Heading level={2} variant="primary">
                primary — default heading color
            </Heading>
            <Heading level={2} variant="quaternary">
                quaternary — de-emphasised heading
            </Heading>
            <Heading level={2} variant="secondary" className="bg-dark-brown p-2">
                secondary — white, for dark backgrounds
            </Heading>
            <Heading level={2} variant="tertiary">
                tertiary — orange, for accents
            </Heading>
        </div>
    ),
};

/** asChild lets consumers map the Heading's styling onto their own element, e.g. a router Link. */
export const AsChild: Story = {
    args: {
        asChild: true,
        level: 2,
        children: <a href="https://example.com">Heading styled link</a>,
    },
};
