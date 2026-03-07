"use client";

import {createContext, PropsWithChildren, useContext, useEffect, useMemo, useState} from "react";
import {
    CharacterType,
    EpisodeCharacter,
    EpisodeType,
    LocationsPayload,
    LocationType,
    ResourceState
} from "@/app/types/types";
import {RickAndMortyState, RickAndMortyStoreActions, RickAndMortyStoreValue} from "@/app/types/TypeRickAndMortyStore";

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
    location: emptyResource<LocationType>(),
    favorites: {
        characters: [],
        episodes: [],
        locations: [],
    },
    theme: "dark",
};

const RickAndMortyStoreContext = createContext<RickAndMortyStoreValue | null>(null);
const FAVORITES_STORAGE_KEY = "rick-and-morty-favorites";
const THEME_STORAGE_KEY = "rick-and-morty-theme";

export const RickAndMortyProvider = ({children}: PropsWithChildren) => {
    const [state, setState] = useState<RickAndMortyState>(initialState);
    const [favoritesHydrated, setFavoritesHydrated] = useState(false);

    useEffect(() => {
        try {
            const raw = localStorage.getItem(FAVORITES_STORAGE_KEY);
            if (!raw) {
                setFavoritesHydrated(true);
                return;
            }

            const parsed = JSON.parse(raw) as Partial<RickAndMortyState["favorites"]>;
            setState((prev) => ({
                ...prev,
                favorites: {
                    characters: Array.isArray(parsed.characters) ? parsed.characters : [],
                    episodes: Array.isArray(parsed.episodes) ? parsed.episodes : [],
                    locations: Array.isArray(parsed.locations) ? parsed.locations : [],
                },
            }));
        } catch (error) {
            console.error("Failed to restore favorites from localStorage", error);
        } finally {
            setFavoritesHydrated(true);
        }
    }, []);

    useEffect(() => {
        try {
            const rawTheme = localStorage.getItem(THEME_STORAGE_KEY);
            const restoredTheme = rawTheme === "light" ? "light" : "dark";

            setState((prev) => ({
                ...prev,
                theme: restoredTheme,
            }));
        } catch (error) {
            console.error("Failed to restore theme from localStorage", error);
        }
    }, []);

    useEffect(() => {
        if (!favoritesHydrated) {
            return;
        }

        localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(state.favorites));
    }, [favoritesHydrated, state.favorites]);

    useEffect(() => {
        localStorage.setItem(THEME_STORAGE_KEY, state.theme);
        document.documentElement.setAttribute("data-theme", state.theme);
    }, [state.theme]);

    const actions = useMemo<RickAndMortyStoreActions>(() => ({
        beginResource: (resource, key, resetData = true) => {
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
        toggleFavoriteCharacter: (character) => {
            setState((prev) => {
                const exists = prev.favorites.characters.some((item) => item.id === character.id);
                const nextCharacters = exists
                    ? prev.favorites.characters.filter((item) => item.id !== character.id)
                    : [character, ...prev.favorites.characters];

                return {
                    ...prev,
                    favorites: {
                        ...prev.favorites,
                        characters: nextCharacters,
                    },
                };
            });
        },
        toggleFavoriteEpisode: (episode) => {
            setState((prev) => {
                const exists = prev.favorites.episodes.some((item) => item.id === episode.id);
                const nextEpisodes = exists
                    ? prev.favorites.episodes.filter((item) => item.id !== episode.id)
                    : [episode, ...prev.favorites.episodes];

                return {
                    ...prev,
                    favorites: {
                        ...prev.favorites,
                        episodes: nextEpisodes,
                    },
                };
            });
        },
        toggleFavoriteLocation: (location) => {
            setState((prev) => {
                const exists = prev.favorites.locations.some((item) => item.id === location.id);
                const nextLocations = exists
                    ? prev.favorites.locations.filter((item) => item.id !== location.id)
                    : [location, ...prev.favorites.locations];

                return {
                    ...prev,
                    favorites: {
                        ...prev.favorites,
                        locations: nextLocations,
                    },
                };
            });
        },
        toggleTheme: () => {
            setState((prev) => ({
                ...prev,
                theme: prev.theme === "dark" ? "light" : "dark",
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
