import {
    CharacterType,
    EpisodeCharacter,
    EpisodeType,
    LocationsPayload,
    LocationType,
    ResourceState
} from "@/app/types/types";
import {Dispatch, SetStateAction} from "react";

export type RickAndMortyState = {
    characters: ResourceState<CharacterType[]>,
    character: ResourceState<CharacterType>,
    episodes: ResourceState<EpisodeType[]>,
    episode: ResourceState<EpisodeType>,
    episodeCharacters: ResourceState<EpisodeCharacter[]>,
    locations: ResourceState<LocationsPayload>,
    location: ResourceState<LocationType>,
    favorites: {
        characters: CharacterType[],
        episodes: EpisodeType[],
        locations: LocationType[],
    },
}

export type RickAndMortyStoreValue = {
    state: RickAndMortyState,
    setState: Dispatch<SetStateAction<RickAndMortyState>>,
    actions: RickAndMortyStoreActions,
}

export type ResourceMap = {
    characters: CharacterType[],
    character: CharacterType,
    episodes: EpisodeType[],
    episode: EpisodeType,
    episodeCharacters: EpisodeCharacter[],
    locations: LocationsPayload,
    location: LocationType,
}

export type ResourceKey = keyof ResourceMap;

export type RickAndMortyStoreActions = {
    beginResource: <K extends ResourceKey>(resource: K, key: string, resetData?: boolean) => void,
    resolveResource: <K extends ResourceKey>(resource: K, key: string, data: ResourceMap[K]) => void,
    rejectResource: <K extends ResourceKey>(
        resource: K,
        key: string,
        error: string,
        fallbackData: ResourceMap[K] | null
    ) => void,
    toggleFavoriteCharacter: (character: CharacterType) => void,
    toggleFavoriteEpisode: (episode: EpisodeType) => void,
    toggleFavoriteLocation: (location: LocationType) => void,
}
