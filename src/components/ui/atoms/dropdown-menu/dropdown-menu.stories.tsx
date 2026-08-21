import type { Meta, StoryObj } from "@storybook/nextjs";
import Link from "next/link";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./dropdown-menu";

const COUNTRIES = ["Australia", "Thailand", "Vietnam", "Italy", "Greece"];

const meta = {
    title: "UI/DropdownMenu",
    component: DropdownMenu,
    tags: ["autodocs"],
    parameters: {
        layout: "centered",
    },
    decorators: [
        (Story) => (
            <div className="bg-dark-brown p-10">
                <Story />
            </div>
        ),
    ],
} satisfies Meta<typeof DropdownMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    render: () => (
        <DropdownMenu defaultOpen>
            <DropdownMenuTrigger>Countries</DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                {COUNTRIES.map((country) => (
                    <DropdownMenuItem key={country} active={country === "Thailand"}>
                        {country}
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    ),
};

export const Closed: Story = {
    render: () => (
        <DropdownMenu>
            <DropdownMenuTrigger>Countries</DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                {COUNTRIES.map((country) => (
                    <DropdownMenuItem key={country} active={country === "Thailand"}>
                        {country}
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    ),
};

/** DropdownMenuTrigger's `secondary` variant, for dark text on light backgrounds. */
export const SecondaryOnLight: Story = {
    decorators: [
        (Story) => (
            <div className="bg-white p-10">
                <Story />
            </div>
        ),
    ],
    render: () => (
        <DropdownMenu defaultOpen>
            <DropdownMenuTrigger variant="secondary">Countries</DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                {COUNTRIES.map((country) => (
                    <DropdownMenuItem key={country} active={country === "Thailand"}>
                        {country}
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    ),
};

/** asChild lets consumers wrap the item styling around their own link/router component, e.g. next/link. */
export const AsLink: Story = {
    render: () => (
        <DropdownMenu defaultOpen>
            <DropdownMenuTrigger>Countries</DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                    <Link href="/thailand">Thailand</Link>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    ),
};