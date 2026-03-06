import {useEffect} from "react";
import axios from "axios";
import {useRickAndMortyStore} from "@/app/store/RickAndMortyStore";

const totalPagesCache = new Map<string, number>();

export const useCharacters = (page: number) => {
    const {state, actions} = useRickAndMortyStore();
    const charactersState = state.characters;
    const key = `page:${page}`;
    const totalPages = totalPagesCache.get(key) ?? 1;

    useEffect(() => {
        if (charactersState.key === key && (charactersState.loading || charactersState.data !== null)) {
            return;
        }

        actions.beginResource("characters", key);
        axios.get("/api/rickandmorty/character", {
            params: {page},
        })
            .then((response) => {
                totalPagesCache.set(key, Number(response.data?.info?.pages ?? 1));
                actions.resolveResource("characters", key, response.data.results);
            })
            .catch((fetchError) => {
                console.error("Characters request failed:", fetchError);
                actions.rejectResource("characters", key, "Failed to load characters", []);
            });
    }, [actions, charactersState.data, charactersState.key, charactersState.loading, key, page]);

    return {
        characters: charactersState.key === key ? charactersState.data : null,
        loading: charactersState.key === key ? charactersState.loading : true,
        error: charactersState.key === key ? charactersState.error : null,
        totalPages,
    };
};
