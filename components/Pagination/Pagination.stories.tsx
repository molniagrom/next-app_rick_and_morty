import type {Meta, StoryObj} from "@storybook/nextjs";
import {fn} from "storybook/test";
import {Pagination} from "@/components/Pagination/Pagination";

const meta = {
    title: "UI/Pagination",
    component: Pagination,
    tags: ["autodocs"],
    args: {
        currentPage: 3,
        totalPages: 10,
        onSetPage: fn(),
        scrollToTopOnChange: false,
    },
    argTypes: {
        currentPage: {
            control: "number",
            description: "Active page.",
        },
        totalPages: {
            control: "number",
            description: "Total number of pages.",
        },
        disablePrevious: {
            control: "boolean",
            description: "Force disable previous button.",
        },
        disableNext: {
            control: "boolean",
            description: "Force disable next button.",
        },
    },
} satisfies Meta<typeof Pagination>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const FirstPage: Story = {
    args: {
        currentPage: 1,
    },
};

export const LastPage: Story = {
    args: {
        currentPage: 10,
    },
};

export const HiddenIfSinglePage: Story = {
    args: {
        currentPage: 1,
        totalPages: 1,
    },
};
