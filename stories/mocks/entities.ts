import {CharacterType, EpisodeType, LocationType} from "@/app/types/types";

export const mockCharacter: CharacterType = {
    id: 1,
    name: "Rick Sanchez",
    image: "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
    status: "Alive",
    species: "Human",
    type: "",
    gender: "Male",
    origin: {
        name: "Earth (C-137)",
        url: "https://rickandmortyapi.com/api/location/1",
    },
    location: {
        name: "Citadel of Ricks",
        url: "https://rickandmortyapi.com/api/location/3",
    },
    episode: ["https://rickandmortyapi.com/api/episode/1"],
    created: "2017-11-04T18:48:46.250Z",
};

export const mockLocation: LocationType = {
    id: 20,
    name: "Earth (Replacement Dimension)",
    type: "Planet",
    dimension: "Replacement Dimension",
    residents: [
        "https://rickandmortyapi.com/api/character/1",
        "https://rickandmortyapi.com/api/character/2",
    ],
    url: "https://rickandmortyapi.com/api/location/20",
    created: "2017-11-10T12:42:04.162Z",
};

export const mockEpisode: EpisodeType = {
    id: 1,
    name: "Pilot",
    air_date: "December 2, 2013",
    episode: "S01E01",
    characters: [
        "https://rickandmortyapi.com/api/character/1",
        "https://rickandmortyapi.com/api/character/2",
    ],
    url: "https://rickandmortyapi.com/api/episode/1",
    created: "2017-11-10T12:56:33.798Z",
    previewImage: "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
};

export const mockFavorites = {
    characters: [mockCharacter],
    locations: [mockLocation],
    episodes: [mockEpisode],
};
