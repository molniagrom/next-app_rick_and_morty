"use client";

import {useEffect, useState} from "react";
import axios from "axios";
import {Nullablen} from "@/app/types/types";
import {CharacterType} from "@/app/hooks/useCharacters";
import {useParams} from "next/navigation";

export const useCharacter = (): { character: Nullablen<CharacterType>, loading: boolean, error: string | null } => {
    const [character, setCharacter] = useState<null | CharacterType>(null)
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const params = useParams();
    const id = params?.id;

    useEffect(() => {
        if (id) {
            setLoading(true);
            setError(null);
            axios.get(`https://rickandmortyapi.com/api/character/${id}`)
                .then(res => {
                    setCharacter(res.data);
                    setLoading(false);
                })
                .catch(err => {
                    setError('Failed to load character');
                    setLoading(false);
                    console.error(err);
                });
        }
    }, [id]);

    return { character, loading, error };
}

