import type {Meta, StoryObj} from "@storybook/nextjs";
import {fn} from "storybook/test";
import {LocationCard} from "@/components/LocationCard/LocationCard";
import {mockLocation} from "@/stories/mocks/entities";

const meta = {
    title: "Cards/LocationCard",
    component: LocationCard,
    tags: ["autodocs"],
    render: (args) => (
        <div style={{width: "260px", maxWidth: "260px"}}>
            <LocationCard {...args}/>
        </div>
    ),
    args: {
        location: mockLocation,
        isFavorite: false,
        onToggleFavorite: fn(),
    },
    argTypes: {
        location: {
            control: "object",
            description: "Location entity shown in card.",
        },
        isFavorite: {
            control: "boolean",
            description: "Favorite state.",
        },
    },
} satisfies Meta<typeof LocationCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Favorite: Story = {
    args: {
        isFavorite: true,
    },
};

export const UnknownFields: Story = {
    args: {
        location: {
            ...mockLocation,
            id: 21,
            type: "",
            dimension: "",
            residents: [],
        },
    },
};
