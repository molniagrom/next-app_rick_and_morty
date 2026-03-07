import type {Meta, StoryObj} from "@storybook/nextjs";
import {fn} from "storybook/test";
import {SearchFormEpisode} from "@/app/episodes/components/SearchFormEpisode";

const meta = {
    title: "Features/SearchFormEpisode",
    component: SearchFormEpisode,
    tags: ["autodocs"],
    args: {
        onSearch: fn(),
        placeholder: "Search by name or code (e.g. S01E01)",
        buttonLabel: "Search",
        initialValue: "",
    },
    argTypes: {
        placeholder: {
            control: "text",
            description: "Input placeholder.",
        },
        buttonLabel: {
            control: "text",
            description: "Submit button label.",
        },
        initialValue: {
            control: "text",
            description: "Initial input value.",
        },
    },
} satisfies Meta<typeof SearchFormEpisode>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Prefilled: Story = {
    args: {
        initialValue: "S01E01",
    },
};
