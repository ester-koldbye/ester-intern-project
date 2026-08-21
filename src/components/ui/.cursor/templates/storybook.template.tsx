import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./component.template";

// Template for a new Storybook file. Copy this file and rename to match your component.

// Story showing Button with controls for its variants
export const StoryButton: StoryObj<typeof Button> = {
    name: "Button",
    args: {
        children: "Hello world",
        variant: "primary",
    },
    argTypes: {
        size: {
            control: { type: "select" },
            options: ["S", "M"],
        },
        variant: {
            control: { type: "select" },
            options: ["primary", "secondary"],
        },
        colorScheme: {
            control: { type: "select" },
            options: ["onLight", "onDark"],
        },
    },
    render: (props) => <Button {...props}>Button title</Button>,
};

// Storybook config for this component
const meta: Meta<typeof Button> = {
    component: Button,
    title: "Primitives/Buttons",
    parameters: {
        layout: "centered",
    },
};

export default meta;
