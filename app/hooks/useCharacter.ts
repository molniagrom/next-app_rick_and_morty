"use client";

import {useEffect} from "react";
import axios from "axios";
import {useParams} from "next/navigation";
import {useRickAndMortyStore} from "@/app/store/RickAndMortyStore";

export const useCharacter = () => {
    const {state, setState} = useRickAndMortyStore();
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

        setState((prev) => ({
            ...prev,
            character: {
                ...prev.character,
                key: id,
                loading: true,
                error: null,
                data: null,
            },
        }));

        axios.get(`/api/rickandmorty/character/${id}`)
            .then(res => {
                setState((prev) => ({
                    ...prev,
                    character: {
                        key: id,
                        data: res.data,
                        loading: false,
                        error: null,
                    },
                }));
            })
            .catch(err => {
                console.error(err);
                setState((prev) => ({
                    ...prev,
                    character: {
                        key: id,
                        data: null,
                        loading: false,
                        error: "Failed to load character",
                    },
                }));
            });
    }, [characterState.data, characterState.key, characterState.loading, id, setState]);

    return {
        character: characterState.key === id ? characterState.data : null,
        loading: id ? (characterState.key === id ? characterState.loading : true) : false,
        error: characterState.key === id ? characterState.error : null,
    };
}

