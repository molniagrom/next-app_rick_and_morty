import type {Meta, StoryObj} from "@storybook/nextjs";
import {ProgressBar} from "@/components/ProgressBar/ProgressBar";

const meta = {
    title: "UI/ProgressBar",
    component: ProgressBar,
    tags: ["autodocs"],
    args: {
        value: 40,
        max: 100,
        label: "Loading episodes",
    },
    argTypes: {
        value: {
            control: "number",
            description: "Current progress. Omit for indeterminate state.",
        },
        max: {
            control: "number",
            description: "Maximum value for determinate mode.",
        },
        label: {
            control: "text",
            description: "Visible and accessible label.",
        },
    },
} satisfies Meta<typeof ProgressBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Indeterminate: Story = {
    args: {
        value: undefined,
        label: "Fetching data",
    },
};

export const ClampedOverflowValue: Story = {
    args: {
        value: 200,
        max: 100,
        label: "Clamped to max",
    },
};
