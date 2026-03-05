import {useEffect, useState} from "react";
import axios from "axios";
import {CharacterType} from "@/app/types/types";

let cachedCharacters: CharacterType[] | null = null;

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const isAbortError = (error: unknown) => axios.isAxiosError(error) && error.code === "ERR_CANCELED";

type CharactersPagePayload = {
    results: CharacterType[];
    totalPages: number;
}

const fetchCharactersPage = async (
    page: number,
    signal: AbortSignal,
    retries = 2,
    failSilently = false
): Promise<CharactersPagePayload> => {
    let lastError: unknown;

    for (let attempt = 0; attempt <= retries; attempt += 1) {
        try {
            const response = await axios.get("/api/rickandmorty/character", {
                params: {page},
                signal,
            });
            return {
                results: response.data?.results ?? [],
                totalPages: Number(response.data?.info?.pages ?? 1),
            };
        } catch (error) {
            if (isAbortError(error)) {
                throw error;
            }

            lastError = error;
            if (attempt < retries) {
                await wait(250 * (attempt + 1));
            }
        }
    }

    if (failSilently) {
        console.warn(`Skipped characters page ${page} after retries`, lastError);
        return {results: [], totalPages: 1};
    }

    throw lastError;
};

const fetchAllCharacters = async (signal: AbortSignal) => {
    if (cachedCharacters) {
        return cachedCharacters;
    }

    const firstPage = await fetchCharactersPage(1, signal, 3, false);

    const totalPages = firstPage.totalPages;
    const allCharacters: CharacterType[] = [...firstPage.results];

    if (totalPages > 1) {
        for (let page = 2; page <= totalPages; page += 1) {
            const pageCharacters = await fetchCharactersPage(page, signal, 2, true);
            allCharacters.push(...pageCharacters.results);
        }
    }

    cachedCharacters = allCharacters;
    return allCharacters;
};

export const useAllCharacters = () => {
    const [characters, setCharacters] = useState<CharacterType[] | null>(cachedCharacters);
    const [loading, setLoading] = useState(!cachedCharacters);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (cachedCharacters) {
            return;
        }

        const controller = new AbortController();

        fetchAllCharacters(controller.signal)
            .then((data) => {
                if (!controller.signal.aborted) {
                    setCharacters(data);
                }
            })
            .catch((fetchError) => {
                if (isAbortError(fetchError) || controller.signal.aborted) {
                    return;
                }

                console.error("Failed to load all characters", fetchError);
                setError("Failed to load genetic data.");
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
