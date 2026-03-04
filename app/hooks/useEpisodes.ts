import {useEffect} from "react";
import axios from "axios";
import {useRickAndMortyStore} from "@/app/store/RickAndMortyStore";
import {EpisodeType} from "@/app/types/types";

export const useEpisodes = (search: string) => {
    const {state, actions} = useRickAndMortyStore();
    const episodesState = state.episodes;

    useEffect(() => {
        const value = search.trim();
        const key = value.toLowerCase();
        const isCodeSearch = /^s\d{1,2}e\d{1,2}$/i.test(value);

        if (episodesState.key === key && (episodesState.loading || episodesState.data !== null)) {
            return;
        }

        actions.beginResource("episodes", key);

        const fetchEpisodes = async () => {
            try {
                const res = await axios.get(`/api/rickandmorty/episode`, {
                    params: value ? (isCodeSearch ? {episode: value} : {name: value}) : undefined,
                });

                const fetchedEpisodes: EpisodeType[] = res.data.results;
                const firstCharacterIds = Array.from(
                    new Set(
                        fetchedEpisodes
                            .map((episode) => episode.characters[0]?.split("/").at(-1))
                            .filter((id): id is string => Boolean(id))
                    )
                );

                if (firstCharacterIds.length === 0) {
                    actions.resolveResource(
                        "episodes",
                        key,
                        fetchedEpisodes.map((episode) => ({...episode, previewImage: null}))
                    );
                    return;
                }

                const charactersRes = await axios.get(
                    `/api/rickandmorty/character/${firstCharacterIds.join(",")}`
                );
                const charactersData = Array.isArray(charactersRes.data) ? charactersRes.data : [charactersRes.data];
                const imageById = new Map<string, string>(
                    charactersData.map((character: CharacterPreviewType) => [String(character.id), character.image])
                );

                actions.resolveResource(
                    "episodes",
                    key,
                    fetchedEpisodes.map((episode) => {
                        const firstId = episode.characters[0]?.split("/").at(-1);
                        return {
                            ...episode,
                            previewImage: firstId ? imageById.get(firstId) ?? null : null,
                        };
                    })
                );
            } catch (error) {
                if (axios.isAxiosError(error) && error.response?.status === 404) {
                    actions.resolveResource("episodes", key, []);
                    return;
                }
                console.error(error);
                actions.rejectResource("episodes", key, "Failed to load episodes", []);
            }
        };

        void fetchEpisodes();
    }, [actions, episodesState.data, episodesState.key, episodesState.loading, search]);

    const normalizedSearch = search.trim().toLowerCase();

    return {
        episodes: episodesState.key === normalizedSearch ? episodesState.data : null,
        loading: episodesState.key === normalizedSearch ? episodesState.loading : true,
        error: episodesState.key === normalizedSearch ? episodesState.error : null,
    };
};

type CharacterPreviewType = {
    id: number,
    image: string,
}
