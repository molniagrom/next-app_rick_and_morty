"use client";

import {useEffect} from "react";
import axios from "axios";
import {useParams} from "next/navigation";
import {useRickAndMortyStore} from "@/app/store/RickAndMortyStore";

export const useLocation = () => {
    const {state, actions} = useRickAndMortyStore();
    const params = useParams();
    const id = String(params?.id ?? "");
    const locationState = state.location;

    useEffect(() => {
        if (!id) {
            return;
        }

        if (locationState.key === id && (locationState.loading || locationState.data !== null)) {
            return;
        }

        actions.beginResource("location", id);

        axios.get(`/api/rickandmorty/location/${id}`)
            .then((res) => {
                actions.resolveResource("location", id, res.data);
            })
            .catch((err) => {
                console.error(err);
                actions.rejectResource("location", id, "Failed to load location", null);
            });
    }, [actions, id, locationState.data, locationState.key, locationState.loading]);

    return {
        location: locationState.key === id ? locationState.data : null,
        loading: id ? (locationState.key === id ? locationState.loading : true) : false,
        error: locationState.key === id ? locationState.error : null,
    };
};
