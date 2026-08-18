import type { Meta, StoryObj } from "@storybook/nextjs";
import { Logo } from "./logo";

const meta: Meta<typeof Logo> = {
  title: "UI/Logo",
  component: Logo,
  argTypes: {
    variant: {
        control: "radio",
        options: ["primary", "secondary"],
    },
    size: {
      control: "radio",
      options: ["S", "M", "L"],
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
type Story = StoryObj<typeof Logo>;

export const Default: Story = {
  args: { children: "Travel Guide" },
};

export const Primary: Story = {
  args: { variant: "primary", children: "Travel Guide" },
};

export const Secondary: Story = {
  args: { variant: "secondary", children: "Travel Guide" },
};
