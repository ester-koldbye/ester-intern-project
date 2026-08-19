import type { Meta, StoryObj } from "@storybook/nextjs";
import { InfoItem } from "./info-item";

const meta = {
    title: "UI/InfoItem",
    component: InfoItem,
    tags: ["autodocs"],
    parameters: {
        layout: "centered",
    },
    args: {
        typeTitle: "Visited",
        title: "December 2022",
        description: "Use your phone or print your voucher",
    },
} satisfies Meta<typeof InfoItem>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Matches Figma's "Group 254" node exactly. */
export const Default: Story = {};

/** A custom `icon` node in place of the default clock glyph. */
export const CustomIcon: Story = {
    args: {
        typeTitle: "Free cancellation",
        title: "December 2022",
        description: "Cancel up to 24 hours in advance for a full refund",
        icon: (
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path
                    d="M8 15C11.866 15 15 11.866 15 8C15 4.13401 11.866 1 8 1C4.13401 1 1 4.13401 1 8C1 11.866 4.13401 15 8 15Z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                />
                <path d="M5.5 8L7.25 9.75L10.75 6.25" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        ),
    },
};

/** A few rows stacked, as they'd appear in an activity's practical-info list. */
export const List: Story = {
    render: (args) => (
        <div className="flex w-72.25 flex-col gap-6">
            <InfoItem {...args} />
            <InfoItem typeTitle="Price" title="We didn't pay" description="But it does cost money" />
        </div>
    ),
};
