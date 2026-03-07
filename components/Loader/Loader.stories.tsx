import type {Meta, StoryObj} from "@storybook/nextjs";
import {Loader} from "@/components/Loader/Loader";

const meta = {
    title: "UI/Loader",
    component: Loader,
    tags: ["autodocs"],
    args: {
        label: "Loading",
    },
    argTypes: {
        label: {
            control: "text",
            description: "Accessible label for screen readers.",
        },
        className: {
            control: "text",
            description: "Additional CSS class names.",
        },
    },
} satisfies Meta<typeof Loader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const CustomLabel: Story = {
    args: {
        label: "Loading characters",
    },
};

export const LargeContainer: Story = {
    render: (args) => (
        <div style={{display: "grid", placeItems: "center", width: "8rem", height: "8rem"}}>
            <Loader {...args}/>
        </div>
    ),
};
