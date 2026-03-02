"use client";

import {useEffect, useState} from "react";
import axios from "axios";
import {useParams} from "next/navigation";
import {EpisodeType} from "@/app/hooks/useEpisodes";
import {Nullablen} from "@/app/types/types";

export const useEpisode = (): { episode: Nullablen<EpisodeType>, loading: boolean, error: string | null } => {
    const [episode, setEpisode] = useState<null | EpisodeType>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const params = useParams();
    const id = params?.id;

    useEffect(() => {
        if (!id) {
            return;
        }

        axios.get(`${process.env.NEXT_PUBLIC_RICK_AND_MORTY_API_URL}/episode/${id}`)
            .then((res) => {
                setEpisode(res.data);
                setError(null);
                setLoading(false);
            })
            .catch((err) => {
                console.error(err);
                setError("Failed to load episode");
                setLoading(false);
            });
    }, [id]);

    return {episode, loading, error};
};
