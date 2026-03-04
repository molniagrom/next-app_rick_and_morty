"use client";

import {createContext, Dispatch, PropsWithChildren, SetStateAction, useContext, useMemo, useState} from "react";
import {CharacterType, EpisodeCharacter, EpisodeType, ResourceState} from "@/app/types/types";

export type RickAndMortyState = {
    characters: ResourceState<CharacterType[]>,
    character: ResourceState<CharacterType>,
    episodes: ResourceState<EpisodeType[]>,
    episode: ResourceState<EpisodeType>,
    episodeCharacters: ResourceState<EpisodeCharacter[]>,
}

type RickAndMortyStoreValue = {
    state: RickAndMortyState,
    setState: Dispatch<SetStateAction<RickAndMortyState>>,
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
};

const RickAndMortyStoreContext = createContext<RickAndMortyStoreValue | null>(null);

export const RickAndMortyProvider = ({children}: PropsWithChildren) => {
    const [state, setState] = useState<RickAndMortyState>(initialState);
    const value = useMemo(() => ({state, setState}), [state]);

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
