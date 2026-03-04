"use client";

import {useEffect} from "react";
import axios from "axios";
import {useParams} from "next/navigation";
import {useRickAndMortyStore} from "@/app/store/RickAndMortyStore";

export const useEpisode = () => {
    const {state, actions} = useRickAndMortyStore();
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

        actions.beginResource("episode", id);

        axios.get(`/api/rickandmorty/episode/${id}`)
            .then((res) => {
                actions.resolveResource("episode", id, res.data);
            })
            .catch((err) => {
                console.error(err);
                actions.rejectResource("episode", id, "Failed to load episode", null);
            });
    }, [actions, episodeState.data, episodeState.key, episodeState.loading, id]);

    return {
        episode: episodeState.key === id ? episodeState.data : null,
        loading: id ? (episodeState.key === id ? episodeState.loading : true) : false,
        error: episodeState.key === id ? episodeState.error : null,
    };
};
