import {useEffect, useState} from "react";
import axios from "axios";
import {Nullablen} from "@/app/types/types";

export const useCharacters = (): { characters: Nullablen<CharacterType[]>, loading: boolean, error: string | null } => {
    const [characters, setCharacters] = useState<null | CharacterType[]>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        axios.get(`/api/rickandmorty/character`)
            .then(res => {
                setCharacters(res.data.results)
                setError(null)
            })
            .catch((fetchError) => {
                console.error("Characters request failed:", fetchError);
                setError("Failed to load characters")
                setCharacters([])
            })
            .finally(() => {
                setLoading(false)
            })
    }, []);

    return {characters, loading, error}
}


export type CharacterType = {
    id: number,
    name: string,
    image: string,
    status: string,
    species: string,
    type: string,
    gender: string,
    origin: {
        name: string,
        url: string,
    },
    location: {
        name: string,
        url: string,
    },
    episode: string[],
    created: string,
}
