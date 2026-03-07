import type {Meta, StoryObj} from "@storybook/nextjs";
import CharacterCard from "@/components/CharacterCard/CharacterCard";
import {mockCharacter} from "@/stories/mocks/entities";

const meta = {
    title: "Cards/CharacterCard",
    component: CharacterCard,
    tags: ["autodocs"],
    render: (args) => (
        <div style={{width: "260px", maxWidth: "260px"}}>
            <CharacterCard {...args}/>
        </div>
    ),
    args: {
        character: mockCharacter,
    },
    argTypes: {
        character: {
            description: "Character entity shown in card.",
            control: "object",
        },
    },
} satisfies Meta<typeof CharacterCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const LongName: Story = {
    args: {
        character: {
            ...mockCharacter,
            id: 9001,
            name: "Rick Sanchez from the Extremely Verbose and Unexpected Dimension",
        },
    },
};
