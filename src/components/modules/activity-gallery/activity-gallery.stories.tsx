import type { Meta, StoryObj } from "@storybook/nextjs";
import { ActivityGallery, ActivityInfoIcons } from "./activity-gallery";

const meta = {
    title: "Modules/ActivityGallery",
    component: ActivityGallery,
    tags: ["autodocs"],
    parameters: {
        layout: "fullscreen",
    },
    args: {
        heading: "Wat Arun",
        images: [
            { src: "/destinations/thailand/bangkok.jpg", alt: "Wat Arun temple at sunset" },
            { src: "/destinations/thailand/chiang-mai.jpg", alt: "" },
            { src: "/destinations/thailand/koh-tao.JPG", alt: "" },
            { src: "/destinations/thailand/pai.JPG", alt: "" },
            { src: "/destinations/thailand/krabi.JPG", alt: "" },
            { src: "/destinations/thailand/phiphi.jpg", alt: "" },
        ],
        info: [
            { id: "type", icon: ActivityInfoIcons.type, typeTitle: "Type", title: "Temple" },
            { id: "visited", typeTitle: "Visited", title: "December 2022" },
            { id: "price", icon: ActivityInfoIcons.price, typeTitle: "Price", title: "We didn't pay", description: "But it does cost money" },
            { id: "dresscode", icon: ActivityInfoIcons.dresscode, typeTitle: "Dresscode", title: "You have do cover up" },
        ],
    },
} satisfies Meta<typeof ActivityGallery>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Matches Figma's activity detail frame: H1, a 6-photo gallery, and a 4-row info panel. Click a thumbnail to swap the main photo. */
export const Default: Story = {};

/** `info` is a flat list — fewer rows (e.g. an activity with no dresscode) just render fewer, no gaps or placeholders. */
export const FewerInfoRows: Story = {
    args: {
        info: [
            { id: "type", icon: ActivityInfoIcons.type, typeTitle: "Type", title: "Beach" },
            { id: "visited", typeTitle: "Visited", title: "March 2023" },
        ],
    },
};

/** `images` with a single photo skips the thumbnail row entirely rather than showing one lone, unclickable thumbnail. */
export const SinglePhoto: Story = {
    args: {
        images: [{ src: "/destinations/thailand/bangkok.jpg", alt: "Wat Arun temple at sunset" }],
    },
};

/** Below `lg` the gallery and info panel stack instead of sitting side by side. */
export const Mobile: Story = {
    parameters: {
        viewport: {
            defaultViewport: "mobile1",
        },
    },
};
