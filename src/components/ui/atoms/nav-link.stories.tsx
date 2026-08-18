import type { Meta, StoryObj } from "@storybook/nextjs";
import { NavLink } from "./nav-link";

// Small arrow icon for the icon stories, matching IconButton's arrow.
const ArrowIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="7" height="11" viewBox="0 0 7 11" fill="none">
        <path d="M0.353516 10.3535L5.35352 5.35352L0.353516 0.353516" stroke="currentColor"/>
    </svg>  
);

const meta: Meta<typeof NavLink> = {
    title: "UI/NavLink",
    component: NavLink,
    argTypes: {
        variant: {
            control: "radio",
            options: ["primary", "secondary"],
        },
        iconPosition: {
            control: "radio",
            options: ["left", "right"],
        },
        icon: {
            control: false, // ReactNode, not controllable — see WithIcon stories
        },
    },
    decorators: [
        (Story) => (
            <div className="bg-[#DDD5CA4D] p-10">
                <Story />
            </div>
        ),
    ],
};

export default meta;
type Story = StoryObj<typeof NavLink>;

export const Default: Story = {
    args: { children: "NavLink" }
};

export const Primary: Story = {
    args: { variant: "primary", children: "Primary" },
};

export const Secondary: Story = {
    args: { variant: "secondary", children: "Secondary" },
};

export const WithIcon: Story = {
    args: { children: "NavLink", icon: <ArrowIcon /> },
};

export const WithIconLeft: Story = {
    args: { children: "NavLink", icon: <ArrowIcon />, iconPosition: "left" },
};