import {useEffect, useState} from "react";
import {CharacterType} from "@/app/types/types";
import {getAllCharacters} from "@/app/lib/charactersApi";
import {isAbortError, toUserMessage} from "@/app/lib/errors";

let cachedCharacters: CharacterType[] | null = null;

export const useAllCharacters = () => {
    const [characters, setCharacters] = useState<CharacterType[] | null>(cachedCharacters);
    const [loading, setLoading] = useState(!cachedCharacters);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (cachedCharacters) {
            return;
        }

        const controller = new AbortController();

        getAllCharacters({signal: controller.signal})
            .then((data) => {
                if (!controller.signal.aborted) {
                    cachedCharacters = data;
                    setCharacters(data);
                }
            })
            .catch((fetchError) => {
                if (isAbortError(fetchError) || controller.signal.aborted) {
                    return;
                }

                console.error("Failed to load all characters", fetchError);
                setError(toUserMessage(fetchError, "Failed to load genetic data."));
            })
            .finally(() => {
                if (!controller.signal.aborted) {
                    setLoading(false);
                }
            });

        return () => {
            controller.abort();
        };
    }, []);

    return {characters, loading, error};
};
