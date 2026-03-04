import {useEffect} from "react";
import axios from "axios";
import {useRickAndMortyStore} from "@/app/store/RickAndMortyStore";
import {EpisodeType} from "@/app/types/types";

export const useEpisodes = (search: string) => {
    const {state, setState} = useRickAndMortyStore();
    const episodesState = state.episodes;

    useEffect(() => {
        const value = search.trim();
        const key = value.toLowerCase();
        const isCodeSearch = /^s\d{1,2}e\d{1,2}$/i.test(value);

        if (episodesState.key === key && (episodesState.loading || episodesState.data !== null)) {
            return;
        }

        setState((prev) => ({
            ...prev,
            episodes: {
                ...prev.episodes,
                key,
                data: null,
                loading: true,
                error: null,
            },
        }));

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
                    setState((prev) => ({
                        ...prev,
                        episodes: {
                            key,
                            data: fetchedEpisodes.map((episode) => ({...episode, previewImage: null})),
                            loading: false,
                            error: null,
                        },
                    }));
                    return;
                }

                const charactersRes = await axios.get(
                    `/api/rickandmorty/character/${firstCharacterIds.join(",")}`
                );
                const charactersData = Array.isArray(charactersRes.data) ? charactersRes.data : [charactersRes.data];
                const imageById = new Map<string, string>(
                    charactersData.map((character: CharacterPreviewType) => [String(character.id), character.image])
                );

                setState((prev) => ({
                    ...prev,
                    episodes: {
                        key,
                        data: fetchedEpisodes.map((episode) => {
                            const firstId = episode.characters[0]?.split("/").at(-1);
                            return {
                                ...episode,
                                previewImage: firstId ? imageById.get(firstId) ?? null : null,
                            };
                        }),
                        loading: false,
                        error: null,
                    },
                }));
            } catch (error) {
                if (axios.isAxiosError(error) && error.response?.status === 404) {
                    setState((prev) => ({
                        ...prev,
                        episodes: {
                            key,
                            data: [],
                            loading: false,
                            error: null,
                        },
                    }));
                    return;
                }
                console.error(error);
                setState((prev) => ({
                    ...prev,
                    episodes: {
                        key,
                        data: [],
                        loading: false,
                        error: "Failed to load episodes",
                    },
                }));
            }
        };

        void fetchEpisodes();
    }, [episodesState.data, episodesState.key, episodesState.loading, search, setState]);

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
