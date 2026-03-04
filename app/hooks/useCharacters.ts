import {useEffect} from "react";
import axios from "axios";
import {useRickAndMortyStore} from "@/app/store/RickAndMortyStore";

export const useCharacters = () => {
    const {state, actions} = useRickAndMortyStore();
    const charactersState = state.characters;

    useEffect(() => {
        if (charactersState.loading || charactersState.data !== null) {
            return;
        }

        actions.beginResource("characters", "all", false);

        axios.get(`/api/rickandmorty/character`)
            .then(res => {
                actions.resolveResource("characters", "all", res.data.results);
            })
            .catch((fetchError) => {
                console.error("Characters request failed:", fetchError);
                actions.rejectResource("characters", "all", "Failed to load characters", []);
            });
    }, [actions, charactersState.data, charactersState.loading]);

    return {
        characters: charactersState.data,
        loading: charactersState.loading || charactersState.data === null,
        error: charactersState.error,
    };
}
