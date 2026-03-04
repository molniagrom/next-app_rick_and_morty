import {useEffect} from "react";
import axios from "axios";
import {useRickAndMortyStore} from "@/app/store/RickAndMortyStore";

export const useCharacters = () => {
    const {state, setState} = useRickAndMortyStore();
    const charactersState = state.characters;

    useEffect(() => {
        if (charactersState.loading || charactersState.data !== null) {
            return;
        }

        setState((prev) => ({
            ...prev,
            characters: {
                ...prev.characters,
                key: "all",
                loading: true,
                error: null,
            },
        }));

        axios.get(`/api/rickandmorty/character`)
            .then(res => {
                setState((prev) => ({
                    ...prev,
                    characters: {
                        key: "all",
                        data: res.data.results,
                        loading: false,
                        error: null,
                    },
                }));
            })
            .catch((fetchError) => {
                console.error("Characters request failed:", fetchError);
                setState((prev) => ({
                    ...prev,
                    characters: {
                        key: "all",
                        data: [],
                        loading: false,
                        error: "Failed to load characters",
                    },
                }));
            });
    }, [charactersState.data, charactersState.loading, setState]);

    return {
        characters: charactersState.data,
        loading: charactersState.loading || charactersState.data === null,
        error: charactersState.error,
    };
}
