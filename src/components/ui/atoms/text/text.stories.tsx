import type { Meta, StoryObj } from "@storybook/nextjs";
import { Text } from "./text";

const SAMPLE = "One shot. One moment. The final period ran to a shootout before the title was settled.";

const meta = {
    title: "Typography/Text",
    component: Text,
    tags: ["autodocs"],
    parameters: {
        layout: "centered",
    },
    args: {
        children: SAMPLE,
    },
    argTypes: {
        as: {
            control: "radio",
            options: ["p", "span", "div", "figcaption"],
            description: "Restricted on purpose — every option is a plain text container with the same prop surface. Use asChild for anything outside this set.",
        },
        variant: {
            control: "radio",
            options: ["primary", "secondary", "tertiary", "quaternary"],
        },
        size: {
            control: "radio",
            options: ["sm", "base", "md"],
        },
        weight: {
            control: "radio",
            options: ["regular", "semibold", "bold"],
        },
        asChild: {
            control: "boolean",
        },
    },
    decorators: [
        (Story) => (
            <div className="max-w-2xl bg-[#DDD5CA4D] p-10">
                <Story />
            </div>
        ),
    ],
} satisfies Meta<typeof Text>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

/** Every size at a fixed weight, so the scale is comparable in isolation. */
export const Sizes: Story = {
    render: () => (
        <div className="flex flex-col gap-4">
            <Text size="md">md — 20px / 24px, e.g. lead paragraphs</Text>
            <Text size="base">base — 16px / 16px, the only size with letter-spacing</Text>
            <Text size="sm">sm — 14px / 18px, the default body copy</Text>
        </div>
    ),
};

/** Weight is independent of size — a design decision made per instance, not baked into the scale. */
export const Weights: Story = {
    render: () => (
        <div className="flex flex-col gap-4">
            <Text weight="regular">regular — default body copy</Text>
            <Text weight="semibold">semibold — emphasis within a paragraph</Text>
            <Text weight="bold">bold — strong emphasis</Text>
        </div>
    ),
};

/** Quaternary is a token decision (Text-Quaternary in Figma), so it lives in the API rather than at each call site. */
export const Variants: Story = {
    render: () => (
        <div className="flex flex-col gap-4">
            <Text variant="primary">primary — full contrast body copy</Text>
            <Text variant="quaternary">quaternary — de-emphasised, muted body copy</Text>
            <Text variant="secondary" className="bg-dark-brown p-2">
                secondary — white, for dark backgrounds
            </Text>
            <Text variant="tertiary">tertiary — orange, for accents/links</Text>
        </div>
    ),
};

/** The `as` prop covers the common text-container elements without reaching for asChild. */
export const AsOtherElements: Story = {
    render: () => (
        <div className="flex flex-col gap-4">
            <figure className="flex flex-col gap-2">
                <div className="h-24 rounded-lg bg-light-grey" />
                <Text as="figcaption" size="sm" variant="quaternary">
                    figcaption — how an image block renders its caption
                </Text>
            </figure>
            <div>
                <Text as="span" size="sm" variant="quaternary">
                    span — inline, for text inside another line
                </Text>
            </div>
        </div>
    ),
};

/** asChild lets consumers map the Text's styling onto their own element, e.g. a router Link. */
export const AsChild: Story = {
    args: {
        asChild: true,
        children: <a href="https://example.com">Text styled link</a>,
    },
};
