"use client";

import {createContext, Dispatch, PropsWithChildren, SetStateAction, useContext, useMemo, useState} from "react";
import {CharacterType, EpisodeCharacter, EpisodeType, LocationsPayload, ResourceState} from "@/app/types/types";

export type RickAndMortyState = {
    characters: ResourceState<CharacterType[]>,
    character: ResourceState<CharacterType>,
    episodes: ResourceState<EpisodeType[]>,
    episode: ResourceState<EpisodeType>,
    episodeCharacters: ResourceState<EpisodeCharacter[]>,
    locations: ResourceState<LocationsPayload>,
}

type RickAndMortyStoreValue = {
    state: RickAndMortyState,
    setState: Dispatch<SetStateAction<RickAndMortyState>>,
    actions: RickAndMortyStoreActions,
}

type ResourceMap = {
    characters: CharacterType[],
    character: CharacterType,
    episodes: EpisodeType[],
    episode: EpisodeType,
    episodeCharacters: EpisodeCharacter[],
    locations: LocationsPayload,
}

type ResourceKey = keyof ResourceMap;

type RickAndMortyStoreActions = {
    beginResource: <K extends ResourceKey>(resource: K, key: string, resetData?: boolean) => void,
    resolveResource: <K extends ResourceKey>(resource: K, key: string, data: ResourceMap[K]) => void,
    rejectResource: <K extends ResourceKey>(
        resource: K,
        key: string,
        error: string,
        fallbackData: ResourceMap[K] | null
    ) => void,
}

const emptyResource = <T,>(): ResourceState<T> => ({
    key: null,
    data: null,
    loading: false,
    error: null,
});

const initialState: RickAndMortyState = {
    characters: emptyResource<CharacterType[]>(),
    character: emptyResource<CharacterType>(),
    episodes: emptyResource<EpisodeType[]>(),
    episode: emptyResource<EpisodeType>(),
    episodeCharacters: emptyResource<EpisodeCharacter[]>(),
    locations: emptyResource<LocationsPayload>(),
};

const RickAndMortyStoreContext = createContext<RickAndMortyStoreValue | null>(null);

export const RickAndMortyProvider = ({children}: PropsWithChildren) => {
    const [state, setState] = useState<RickAndMortyState>(initialState);
    const actions = useMemo<RickAndMortyStoreActions>(() => ({
        beginResource: (resource, key, resetData = true) => {
            debugger
            setState((prev) => ({
                ...prev,
                [resource]: {
                    ...prev[resource],
                    key,
                    loading: true,
                    error: null,
                    data: resetData ? null : prev[resource].data,
                },
            }));
        },
        resolveResource: (resource, key, data) => {
            setState((prev) => ({
                ...prev,
                [resource]: {
                    key,
                    data,
                    loading: false,
                    error: null,
                },
            }));
        },
        rejectResource: (resource, key, error, fallbackData) => {
            setState((prev) => ({
                ...prev,
                [resource]: {
                    key,
                    data: fallbackData,
                    loading: false,
                    error,
                },
            }));
        },
    }), []);
    const value = useMemo(() => ({state, setState, actions}), [actions, state]);

    return (
        <RickAndMortyStoreContext.Provider value={value}>
            {children}
        </RickAndMortyStoreContext.Provider>
    );
};

export const useRickAndMortyStore = () => {
    const context = useContext(RickAndMortyStoreContext);

    if (!context) {
        throw new Error("useRickAndMortyStore must be used inside RickAndMortyProvider");
    }

    return context;
};
