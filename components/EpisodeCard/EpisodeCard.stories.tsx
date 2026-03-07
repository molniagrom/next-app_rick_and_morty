import type {Meta, StoryObj} from "@storybook/nextjs";
import {fn} from "storybook/test";
import {EpisodeCard} from "@/components/EpisodeCard/EpisodeCard";
import {mockEpisode} from "@/stories/mocks/entities";

const meta = {
    title: "Cards/EpisodeCard",
    component: EpisodeCard,
    tags: ["autodocs"],
    render: (args) => (
        <div style={{width: "260px", maxWidth: "260px"}}>
            <EpisodeCard {...args}/>
        </div>
    ),
    args: {
        episode: mockEpisode,
        isFavorite: false,
        onToggleFavorite: fn(),
    },
    argTypes: {
        episode: {
            control: "object",
            description: "Episode entity shown in card.",
        },
        isFavorite: {
            control: "boolean",
            description: "Favorite state.",
        },
    },
} satisfies Meta<typeof EpisodeCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Favorite: Story = {
    args: {
        isFavorite: true,
    },
};

export const WithoutPreviewImage: Story = {
    args: {
        episode: {
            ...mockEpisode,
            id: 2,
            previewImage: null,
        },
    },
};
