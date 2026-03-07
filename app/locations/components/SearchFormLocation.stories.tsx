import type {Meta, StoryObj} from "@storybook/nextjs";
import {fn} from "storybook/test";
import {SearchFormLocation} from "@/app/locations/components/SearchFormLocation";

const meta = {
    title: "Features/SearchFormLocation",
    component: SearchFormLocation,
    tags: ["autodocs"],
    args: {
        onSearch: fn(),
        initialQuery: "",
        initialType: "",
        initialDimension: "",
    },
    argTypes: {
        initialQuery: {
            control: "text",
            description: "Initial location query.",
        },
        initialType: {
            control: "text",
            description: "Initial location type filter.",
        },
        initialDimension: {
            control: "text",
            description: "Initial dimension filter.",
        },
    },
} satisfies Meta<typeof SearchFormLocation>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Prefilled: Story = {
    args: {
        initialQuery: "Earth",
        initialType: "Planet",
        initialDimension: "Replacement Dimension",
    },
};
