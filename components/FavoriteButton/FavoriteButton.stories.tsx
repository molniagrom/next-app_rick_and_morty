import type {Meta, StoryObj} from "@storybook/nextjs";
import {fn} from "storybook/test";
import {FavoriteButton} from "@/components/FavoriteButton/FavoriteButton";

const meta = {
    title: "UI/FavoriteButton",
    component: FavoriteButton,
    tags: ["autodocs"],
    args: {
        active: false,
        title: "Add to favorites",
        onClick: fn(),
    },
    argTypes: {
        active: {
            control: "boolean",
            description: "Current favorite state.",
        },
        title: {
            control: "text",
            description: "Button title and aria label.",
        },
        onClick: {
            description: "Click handler.",
        },
    },
} satisfies Meta<typeof FavoriteButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Active: Story = {
    args: {
        active: true,
        title: "Remove from favorites",
    },
};

export const LongTitle: Story = {
    args: {
        title: "Toggle favorite state for this entity with a very long control label",
    },
};
