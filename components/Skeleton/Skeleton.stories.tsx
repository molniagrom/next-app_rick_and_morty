import type {Meta, StoryObj} from "@storybook/nextjs";
import {Skeleton} from "@/components/Skeleton/Skeleton";

const meta = {
    title: "UI/Skeleton",
    component: Skeleton,
    tags: ["autodocs"],
    render: (args) => (
        <div style={{width: "320px"}}>
            <style>{".sb-skeleton-visible{height:20px;}"}</style>
            <Skeleton {...args} className={`${args.className ?? ""} sb-skeleton-visible`.trim()}/>
        </div>
    ),
    args: {
        label: "Loading content",
    },
    argTypes: {
        label: {
            control: "text",
            description: "Accessible loading label.",
        },
        className: {
            control: "text",
            description: "Additional CSS class names.",
        },
    },
} satisfies Meta<typeof Skeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WideBlock: Story = {
    args: {
        className: "sb-skeleton-visible",
    },
};

export const ShortBlock: Story = {
    render: (args) => (
        <div style={{width: "120px"}}>
            <style>{".sb-skeleton-visible-short{height:16px;}"}</style>
            <Skeleton {...args} className={`${args.className ?? ""} sb-skeleton-visible-short`.trim()}/>
        </div>
    ),
};
