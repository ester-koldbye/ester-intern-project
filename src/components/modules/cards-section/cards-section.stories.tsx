import type { Meta, StoryObj } from "@storybook/nextjs";
import { CardsSection, type CardsSectionProps } from "./cards-section";
import { TipCard } from "@/components/ui/molecules/tip-card/tip-card";

// CardsSection is generic over its item type, so it's typed here for one
// concrete shape (a TipCard-like item) rather than via `typeof CardsSection`,
// which would erase `items`/`renderItem` down to `unknown`.
type MissedItem = { title: string; description: string };

const meta: Meta<CardsSectionProps<MissedItem>> = {
    title: "Modules/CardsSection",
    component: CardsSection,
    tags: ["autodocs"],
    parameters: {
        layout: "fullscreen",
    },
};

export default meta;
type Story = StoryObj<CardsSectionProps<MissedItem>>;

/** Same shell `Tips` is built on, but with a different heading and content — e.g. a "What did we miss" section. */
export const WhatDidWeMiss: Story = {
    args: {
        heading: "What did we miss?",
        items: [
            {
                title: "Better rain gear",
                description: "Monsoon season hit harder than expected — pack a proper poncho, not just an umbrella.",
            },
            {
                title: "Motorbike lessons before arriving",
                description: "Renting one is cheap and common, but we wish we'd practiced before hitting real traffic.",
            },
            {
                title: "More local SIM data",
                description: "We kept running out of data mid-trip — get a bigger plan than you think you need.",
            },
        ],
        renderItem: (item) => (
            <TipCard title={item.title} description={item.description} />
        ),
    },
};

/** With only one item, `items` still just maps to a single card — no manual row grouping needed. */
export const SingleItem: Story = {
    args: {
        heading: "One more thing",
        items: [
            {
                title: "Bring a padlock",
                description: "Handy for hostel lockers and daypacks alike.",
            },
        ],
        renderItem: (item) => (
            <TipCard title={item.title} description={item.description} />
        ),
    },
};
