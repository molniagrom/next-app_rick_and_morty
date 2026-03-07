import type {Meta, StoryObj} from "@storybook/nextjs";
import {fn} from "storybook/test";
import {FavoritesContent} from "@/app/favorites/components/FavoritesContent";
import {mockEpisode, mockFavorites, mockLocation} from "@/stories/mocks/entities";

const meta = {
    title: "Features/FavoritesContent",
    component: FavoritesContent,
    tags: ["autodocs"],
    args: {
        activeTab: "characters",
        favorites: mockFavorites,
        onToggleFavoriteLocation: fn(),
        onToggleFavoriteEpisode: fn(),
    },
    argTypes: {
        activeTab: {
            control: "radio",
            options: ["characters", "locations", "episodes"],
            description: "Current tab content.",
        },
        favorites: {
            control: "object",
            description: "Favorites grouped by entity type.",
        },
    },
} satisfies Meta<typeof FavoritesContent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Characters: Story = {};

export const Locations: Story = {
    args: {
        activeTab: "locations",
    },
};

export const Episodes: Story = {
    args: {
        activeTab: "episodes",
    },
};

export const EmptyLocationState: Story = {
    args: {
        activeTab: "locations",
        favorites: {
            ...mockFavorites,
            locations: [],
        },
    },
};

export const EmptyEpisodeState: Story = {
    args: {
        activeTab: "episodes",
        favorites: {
            ...mockFavorites,
            episodes: [],
        },
    },
};

export const ComplexData: Story = {
    args: {
        activeTab: "locations",
        favorites: {
            ...mockFavorites,
            locations: [
                mockLocation,
                {
                    ...mockLocation,
                    id: 77,
                    name: "Interdimensional Customs",
                    type: "Customs",
                },
            ],
            episodes: [
                mockEpisode,
                {
                    ...mockEpisode,
                    id: 11,
                    name: "Ricksy Business",
                    episode: "S01E11",
                },
            ],
        },
    },
};
