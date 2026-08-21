import type { Meta, StoryObj } from "@storybook/nextjs";
import { FoodDrinks } from "./food-drinks";

const meta = {
    title: "Modules/FoodDrinks",
    component: FoodDrinks,
    tags: ["autodocs"],
    parameters: {
        layout: "fullscreen",
    },
} satisfies Meta<typeof FoodDrinks>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Matches Figma's "food&drinks" node: 9 dishes split 5/4 across two columns. */
export const Default: Story = {};

/**
 * `items` is a plain array — pass however many entries a country needs and
 * the two-column split follows automatically. Here: 4 items, an uneven 2/2
 * split.
 */
export const FewerItems: Story = {
    args: {
        heading: "Drinks to try",
        description: "A short local drinks list",
        items: [
            {
                title: "Thai Iced Tea",
                points: ["Sweet, milky, served over ice."],
            },
            { title: "Chang Beer", points: ["The local lager."] },
            {
                title: "Fresh Coconut",
                points: ["Sold straight off the cart, best ice-cold."],
            },
            { title: "Cha Yen" },
        ],
    },
};

/** `columns` controls the split independently of item count — 3 columns here instead of the default 2. */
export const ThreeColumns: Story = {
    args: {
        columns: 3,
    },
};

/** Items don't need `points` — a trigger with nothing to expand still renders correctly. */
export const NoAnswers: Story = {
    args: {
        items: [
            { title: "Green Curry" },
            { title: "Red Curry" },
            { title: "Coconut Soup" },
        ],
    },
};

/**
 * Below `lg` the two columns stack into one — shrink the Storybook viewport
 * to see it.
 */
export const Mobile: Story = {
    parameters: {
        viewport: {
            defaultViewport: "mobile1",
        },
    },
};
