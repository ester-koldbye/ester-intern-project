import type { Meta, StoryObj } from "@storybook/nextjs";
import {
    Accordion,
    AccordionItem,
    AccordionTrigger,
    AccordionContent,
} from "./accordion";

const meta = {
    title: "UI/Accordion",
    component: Accordion,
    tags: ["autodocs"],
    parameters: {
        layout: "padded",
    },
    args: {
        // Radix's `type` is a discriminated union with no default of its own.
        type: "multiple",
    },
} satisfies Meta<typeof Accordion>;

export default meta;
type Story = StoryObj<typeof meta>;

/** `type="multiple"` — more than one item can be open at once, matching Figma. */
export const Default: Story = {
    args: {
        defaultValue: ["green-curry"],
    },
    render: (args) => (
        <Accordion {...args} className="w-120">
            <AccordionItem value="green-curry">
                <AccordionTrigger>Green Curry</AccordionTrigger>
                <AccordionContent>
                    <ul className="text-text-primary leading-lg flex list-disc flex-col ps-6 text-base">
                        <li>Typical thai dish with rice on the rice.</li>
                        <li>Can be very spicy.</li>
                    </ul>
                </AccordionContent>
            </AccordionItem>
            <AccordionItem value="red-curry">
                <AccordionTrigger>Red Curry</AccordionTrigger>
            </AccordionItem>
        </Accordion>
    ),
};

/** `type="single"` with `collapsible` — the usual "only one open" FAQ behaviour. */
export const SingleOpen: Story = {
    args: {
        type: "single",
        collapsible: true,
    },
    render: (args) => (
        <Accordion {...args} className="w-120">
            <AccordionItem value="green-curry">
                <AccordionTrigger>Green Curry</AccordionTrigger>
                <AccordionContent>
                    <ul className="text-text-primary leading-lg flex list-disc flex-col ps-6 text-base">
                        <li>Typical thai dish with rice on the rice.</li>
                        <li>Can be very spicy.</li>
                    </ul>
                </AccordionContent>
            </AccordionItem>
            <AccordionItem value="red-curry">
                <AccordionTrigger>Red Curry</AccordionTrigger>
                <AccordionContent>
                    <ul className="text-text-primary leading-lg flex list-disc flex-col ps-6 text-base">
                        <li>Milder than green curry.</li>
                    </ul>
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    ),
};

/** An item with no `AccordionContent` still renders its trigger row, just with nothing to expand. */
export const NoContent: Story = {
    render: (args) => (
        <Accordion {...args} className="w-120">
            <AccordionItem value="khao-soi">
                <AccordionTrigger>Khao Soi</AccordionTrigger>
            </AccordionItem>
        </Accordion>
    ),
};
