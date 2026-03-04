"use client";

import {useEffect} from "react";
import axios from "axios";
import {EpisodeType} from "@/app/types/types";
import {useRickAndMortyStore} from "@/app/store/RickAndMortyStore";

export const useEpisodeCharacters = (episode: EpisodeType | null) => {
    const {state, actions} = useRickAndMortyStore();
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
            actions.resolveResource("episodeCharacters", episodeId, []);
            return;
        }

        actions.beginResource("episodeCharacters", episodeId);

        axios.get(`/api/rickandmorty/character/${ids.join(",")}`)
            .then((res) => {
                const data = Array.isArray(res.data) ? res.data : [res.data];
                const episodeCharacters = data.map((character: { id: number, name: string }) => ({
                    id: character.id,
                    name: character.name,
                }));

                actions.resolveResource("episodeCharacters", episodeId, episodeCharacters);
            })
            .catch((fetchError) => {
                console.error(fetchError);
                actions.rejectResource("episodeCharacters", episodeId, "Failed to load episode characters", []);
            });
    }, [actions, episode, episodeCharactersState.data, episodeCharactersState.key, episodeCharactersState.loading, episodeId]);

    return {
        characters: episodeCharactersState.key === episodeId ? episodeCharactersState.data ?? [] : [],
        loading: episodeCharactersState.key === episodeId ? episodeCharactersState.loading : false,
        error: episodeCharactersState.key === episodeId ? episodeCharactersState.error : null,
    };
};
