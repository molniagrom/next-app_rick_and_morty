import {useEffect, useState} from "react";
import axios from "axios";
import {Nullablen} from "@/app/types/types";

export const useCharacters = (): Nullablen<CharacterType[]> => {
    const [characters, setCharacters] = useState<null | CharacterType[]>(null)

    useEffect(() => {
        axios.get(`${process.env.NEXT_PUBLIC_RICK_AND_MORTY_API_URL}/character`).then(res => {
            setCharacters(res.data.results)
        })
    }, []);

    return characters
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
