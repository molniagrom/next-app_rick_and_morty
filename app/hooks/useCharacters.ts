import {useEffect, useState} from "react";
import axios from "axios";
import {Nullablen} from "@/app/types/types";

export const useCharacters = (): Nullablen<CharacterType[]> => {
    const [characters, setCharacters] = useState<null | CharacterType[]>(null)

    useEffect(() => {
        axios.get('https://rickandmortyapi.com/api/character').then(res => {
            setCharacters(res.data.results)
        })
    }, []);

    return characters
}


export type CharacterType = {
    id: number,
    name: string,
    image: string,
}
