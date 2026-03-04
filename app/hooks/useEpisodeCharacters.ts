"use client";

import {useEffect} from "react";
import axios from "axios";
import {EpisodeType} from "@/app/types/types";
import {useRickAndMortyStore} from "@/app/store/RickAndMortyStore";

export const useEpisodeCharacters = (episode: EpisodeType | null) => {
    const {state, setState} = useRickAndMortyStore();
    const episodeCharactersState = state.episodeCharacters;
    const episodeId = episode ? String(episode.id) : "";

    useEffect(() => {
        if (!episode || !episodeId) {
            return;
        }

        if (
            episodeCharactersState.key === episodeId
            && (episodeCharactersState.loading || episodeCharactersState.data !== null)
        ) {
            return;
        }

        const ids = episode.characters
            .map((characterUrl) => characterUrl.split("/").at(-1))
            .filter((id): id is string => Boolean(id));

        if (ids.length === 0) {
            setState((prev) => ({
                ...prev,
                episodeCharacters: {
                    key: episodeId,
                    data: [],
                    loading: false,
                    error: null,
                },
            }));
            return;
        }

        setState((prev) => ({
            ...prev,
            episodeCharacters: {
                ...prev.episodeCharacters,
                key: episodeId,
                data: null,
                loading: true,
                error: null,
            },
        }));

        axios.get(`/api/rickandmorty/character/${ids.join(",")}`)
            .then((res) => {
                const data = Array.isArray(res.data) ? res.data : [res.data];
                const episodeCharacters = data.map((character: { id: number, name: string }) => ({
                    id: character.id,
                    name: character.name,
                }));

                setState((prev) => ({
                    ...prev,
                    episodeCharacters: {
                        key: episodeId,
                        data: episodeCharacters,
                        loading: false,
                        error: null,
                    },
                }));
            })
            .catch((fetchError) => {
                console.error(fetchError);
                setState((prev) => ({
                    ...prev,
                    episodeCharacters: {
                        key: episodeId,
                        data: [],
                        loading: false,
                        error: "Failed to load episode characters",
                    },
                }));
            });
    }, [episode, episodeCharactersState.data, episodeCharactersState.key, episodeCharactersState.loading, episodeId, setState]);

    return {
        characters: episodeCharactersState.key === episodeId ? episodeCharactersState.data ?? [] : [],
        loading: episodeCharactersState.key === episodeId ? episodeCharactersState.loading : false,
        error: episodeCharactersState.key === episodeId ? episodeCharactersState.error : null,
    };
};
