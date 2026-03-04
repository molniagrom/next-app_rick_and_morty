"use client";

import {useEffect} from "react";
import axios from "axios";
import {useParams} from "next/navigation";
import {useRickAndMortyStore} from "@/app/store/RickAndMortyStore";

export const useEpisode = () => {
    const {state, setState} = useRickAndMortyStore();
    const params = useParams();
    const id = String(params?.id ?? "");
    const episodeState = state.episode;

    useEffect(() => {
        if (!id) {
            return;
        }

        if (episodeState.key === id && (episodeState.loading || episodeState.data !== null)) {
            return;
        }

        setState((prev) => ({
            ...prev,
            episode: {
                ...prev.episode,
                key: id,
                data: null,
                loading: true,
                error: null,
            },
        }));

        axios.get(`/api/rickandmorty/episode/${id}`)
            .then((res) => {
                setState((prev) => ({
                    ...prev,
                    episode: {
                        key: id,
                        data: res.data,
                        loading: false,
                        error: null,
                    },
                }));
            })
            .catch((err) => {
                console.error(err);
                setState((prev) => ({
                    ...prev,
                    episode: {
                        key: id,
                        data: null,
                        loading: false,
                        error: "Failed to load episode",
                    },
                }));
            });
    }, [episodeState.data, episodeState.key, episodeState.loading, id, setState]);

    return {
        episode: episodeState.key === id ? episodeState.data : null,
        loading: id ? (episodeState.key === id ? episodeState.loading : true) : false,
        error: episodeState.key === id ? episodeState.error : null,
    };
};
