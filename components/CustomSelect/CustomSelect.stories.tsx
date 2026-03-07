import React from "react";
import type {Meta, StoryObj} from "@storybook/nextjs";
import {fn} from "storybook/test";
import {CustomSelect} from "@/components/CustomSelect/CustomSelect";
import {SelectOption} from "@/components/CustomSelect/TypeCustomSelect";

const options: SelectOption[] = [
    {value: "alive", label: "Alive"},
    {value: "dead", label: "Dead"},
    {value: "unknown", label: "Unknown"},
];

const meta = {
    title: "UI/CustomSelect",
    component: CustomSelect,
    tags: ["autodocs"],
    args: {
        value: "",
        placeholder: "Select status",
        options,
        onChange: fn(),
    },
    argTypes: {
        value: {
            control: "text",
            description: "Selected option value.",
        },
        placeholder: {
            control: "text",
            description: "Text shown for empty value.",
        },
    },
    render: (args) => {
        const [value, setValue] = React.useState(args.value);

        return (
            <div style={{width: "280px"}}>
                <CustomSelect
                    {...args}
                    value={value}
                    onChange={(nextValue) => {
                        setValue(nextValue);
                        args.onChange(nextValue);
                    }}
                />
            </div>
        );
    },
} satisfies Meta<typeof CustomSelect>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Selected: Story = {
    args: {
        value: "alive",
    },
};

export const LongOptionLabels: Story = {
    args: {
        options: [
            {value: "cluster", label: "Planetary Cluster with Extended Annotation"},
            {value: "station", label: "Interdimensional Space Station"},
            {value: "microverse", label: "Autonomous Microverse"},
        ],
        placeholder: "Select location type",
    },
};
