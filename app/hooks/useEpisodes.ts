import {useEffect, useState} from "react";
import axios from "axios";
import {Nullablen} from "@/app/types/types";

export const useEpisodes = (search: string): Nullablen<EpisodeType[]> => {
    const [episodes, setEpisodes] = useState<null | EpisodeType[]>(null);

    useEffect(() => {
        const value = search.trim();
        const isCodeSearch = /^s\d{1,2}e\d{1,2}$/i.test(value);

        axios
            .get(`${process.env.NEXT_PUBLIC_RICK_AND_MORTY_API_URL}/episode`, {
                params: value ? (isCodeSearch ? {episode: value} : {name: value}) : undefined,
            })
            .then((res) => {
                setEpisodes(res.data.results);
            })
            .catch((error) => {
                if (axios.isAxiosError(error) && error.response?.status === 404) {
                    setEpisodes([]);
                    return;
                }
                console.error(error);
                setEpisodes([]);
            });
    }, [search]);

    return episodes;
};

export type EpisodeType = {
    id: number,
    url: string,
    name: string,
    air_date: string,
    episode: string,
    characters: string[],
    created: string,
}
