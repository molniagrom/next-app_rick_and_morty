import type {Meta, StoryObj} from "@storybook/nextjs";
import {fn} from "storybook/test";
import {FavoritesTabs, FavoritesTabOption} from "@/app/favorites/components/FavoritesTabs";

const tabs: FavoritesTabOption[] = [
    {key: "characters", label: "Characters"},
    {key: "locations", label: "Locations"},
    {key: "episodes", label: "Episodes"},
];

const meta = {
    title: "Features/FavoritesTabs",
    component: FavoritesTabs,
    tags: ["autodocs"],
    args: {
        tabs,
        activeTab: "characters",
        onChangeTab: fn(),
    },
    argTypes: {
        activeTab: {
            control: "radio",
            options: ["characters", "locations", "episodes"],
            description: "Current selected tab.",
        },
        tabs: {
            control: "object",
            description: "Tab options.",
        },
    },
} satisfies Meta<typeof FavoritesTabs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const LocationsActive: Story = {
    args: {
        activeTab: "locations",
    },
};
