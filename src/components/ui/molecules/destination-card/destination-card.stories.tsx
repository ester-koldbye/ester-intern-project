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
        imageSrc: "/destinations/australia.JPG",
        label: "Australia",
        href: "/australia",
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

/**
 * Large — a fixed 130×130 thumbnail below `tablet`, then `w-full` with a
 * 589:361 aspect ratio from `tablet` up, so it fluidly fills whatever
 * container it's placed in (on the homepage: one half of a 2-up grid).
 * Wrapped in a max-width container here to show that fill behavior at a
 * realistic size instead of stretching to the whole Storybook canvas.
 */
export const Large: Story = {
    args: { size: "L" },
    decorators: [
        (Story) => (
            <div className="w-full max-w-180">
                <Story />
            </div>
        ),
    ],
};

/**
 * Medium — a fixed 130×130 thumbnail below `tablet`, then `w-full` with a
 * 350:300 aspect ratio from `tablet` up (one third of a 3-up grid on the
 * homepage).
 */
export const Medium: Story = {
    args: { size: "M" },
    decorators: [
        (Story) => (
            <div className="w-full max-w-120">
                <Story />
            </div>
        ),
    ],
};

/** Small — a fixed 130×150 thumbnail at every breakpoint, used as a standalone thumbnail rather than a grid item. Label drops to a smaller, bolder size and the button is skipped entirely — too little room for a 140px pill. */
export const Small: Story = {
    args: { size: "S" },
};

/** All three sizes side by side, each in a container sized like its real usage on the homepage. */
export const AllSizes: Story = {
    render: (args) => (
        <div className="flex flex-wrap items-end gap-6">
            <div className="w-45">
                <DestinationCard {...args} size="L" />
            </div>
            <div className="w-30">
                <DestinationCard {...args} size="M" />
            </div>
            <DestinationCard {...args} size="S" />
        </div>
    ),
};

/**
 * Two `L` cards in the same 2-up grid the homepage uses, and three `M` cards
 * in a 3-up grid — resize the Storybook viewport to see each card fluidly
 * fill its column instead of jumping between fixed widths.
 */
export const FillsGrid: Story = {
    args: { size: "L" },
    parameters: {
        layout: "padded",
    },
    render: (args) => (
        <div className="flex max-w-360 flex-col gap-4">
            <div className="grid grid-cols-2 gap-2">
                <DestinationCard {...args} size="L" label="Australia" href="/australia" />
                <DestinationCard
                    {...args}
                    size="L"
                    imageSrc="/destinations/thailand.JPG"
                    label="Thailand"
                    href="/thailand"
                />
            </div>
            <div className="grid grid-cols-3 gap-2">
                <DestinationCard
                    {...args}
                    size="M"
                    imageSrc="/destinations/indonesia.JPG"
                    label="Indonesia"
                    href="/indonesia"
                />
                <DestinationCard
                    {...args}
                    size="M"
                    imageSrc="/destinations/vietnam.JPG"
                    label="Vietnam"
                    href="/vietnam"
                />
                <DestinationCard
                    {...args}
                    size="M"
                    imageSrc="/destinations/italy.JPG"
                    label="Italy"
                    href="/italy"
                />
            </div>
        </div>
    ),
};

/** Without `href` the card renders with no button at all — purely presentational, e.g. wrap it in your own `Link` from the outside. */
export const NoButton: Story = {
    args: { size: "M", href: undefined },
};
