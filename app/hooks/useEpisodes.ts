import {useEffect, useState} from "react";
import axios from "axios";
import {Nullablen} from "@/app/types/types";

export const useEpisodes = (search: string): Nullablen<EpisodeType[]> => {
    const [episodes, setEpisodes] = useState<null | EpisodeType[]>(null);

    useEffect(() => {
        const value = search.trim();
        const isCodeSearch = /^s\d{1,2}e\d{1,2}$/i.test(value);

        const fetchEpisodes = async () => {
            try {
                const res = await axios.get(`${process.env.NEXT_PUBLIC_RICK_AND_MORTY_API_URL}/episode`, {
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
                    setEpisodes(fetchedEpisodes.map((episode) => ({...episode, previewImage: null})));
                    return;
                }

                const charactersRes = await axios.get(
                    `${process.env.NEXT_PUBLIC_RICK_AND_MORTY_API_URL}/character/${firstCharacterIds.join(",")}`
                );
                const charactersData = Array.isArray(charactersRes.data) ? charactersRes.data : [charactersRes.data];
                const imageById = new Map<string, string>(
                    charactersData.map((character: CharacterPreviewType) => [String(character.id), character.image])
                );

                setEpisodes(
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
                    setEpisodes([]);
                    return;
                }
                console.error(error);
                setEpisodes([]);
            }
        };

        void fetchEpisodes();
    }, [search]);

    return episodes;
};

type CharacterPreviewType = {
    id: number,
    image: string,
}

export type EpisodeType = {
    id: number,
    url: string,
    name: string,
    air_date: string,
    episode: string,
    characters: string[],
    created: string,
    previewImage?: string | null,
}
