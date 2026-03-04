"use client";

import {useEffect} from "react";
import axios from "axios";
import {useParams} from "next/navigation";
import {useRickAndMortyStore} from "@/app/store/RickAndMortyStore";

export const useCharacter = () => {
    const {state, actions} = useRickAndMortyStore();
    const params = useParams();
    const id = String(params?.id ?? "");
    const characterState = state.character;

    useEffect(() => {
        if (!id) {
            return;
        }

        if (characterState.key === id && (characterState.loading || characterState.data !== null)) {
            return;
        }

        actions.beginResource("character", id);

        axios.get(`/api/rickandmorty/character/${id}`)
            .then(res => {
                actions.resolveResource("character", id, res.data);
            })
            .catch(err => {
                console.error(err);
                actions.rejectResource("character", id, "Failed to load character", null);
            });
    }, [actions, characterState.data, characterState.key, characterState.loading, id]);

    return {
        character: characterState.key === id ? characterState.data : null,
        loading: id ? (characterState.key === id ? characterState.loading : true) : false,
        error: characterState.key === id ? characterState.error : null,
    };
}

