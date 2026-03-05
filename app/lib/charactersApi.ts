import axios from "axios";
import {CharacterType} from "@/app/types/types";
import {requestWithRetry} from "@/app/lib/requestWithRetry";
import {isAbortError} from "@/app/lib/errors";

export type CharactersPagePayload = {
    results: CharacterType[];
    totalPages: number;
}

type GetCharactersPageOptions = {
    signal?: AbortSignal;
    retries?: number;
    delay?: number;
    failSilently?: boolean;
}

type GetAllCharactersOptions = {
    signal?: AbortSignal;
}

const parsePagePayload = (data: unknown): CharactersPagePayload => {
    const payload = data as {results?: CharacterType[]; info?: {pages?: number}};
    return {
        results: payload.results ?? [],
        totalPages: Number(payload.info?.pages ?? 1),
    };
};

export const getCharactersPage = async (
    page: number,
    {
        signal,
        retries = 0,
        delay = 250,
        failSilently = false,
    }: GetCharactersPageOptions = {}
): Promise<CharactersPagePayload> => {
    try {
        return await requestWithRetry(
            async () => {
                const response = await axios.get("/api/rickandmorty/character", {
                    params: {page},
                    signal,
                });
                return parsePagePayload(response.data);
            },
            {
                retries,
                delay,
                shouldRetry: (error) => !isAbortError(error),
            }
        );
    } catch (error) {
        if (isAbortError(error)) {
            throw error;
        }

        if (failSilently) {
            console.warn(`Skipped characters page ${page} after retries`, error);
            return {results: [], totalPages: 1};
        }

        throw error;
    }
};

export const getAllCharacters = async ({signal}: GetAllCharactersOptions = {}): Promise<CharacterType[]> => {
    const firstPage = await getCharactersPage(1, {
        signal,
        retries: 3,
        delay: 250,
        failSilently: false,
    });
    const allCharacters: CharacterType[] = [...firstPage.results];

    if (firstPage.totalPages > 1) {
        for (let page = 2; page <= firstPage.totalPages; page += 1) {
            const pagePayload = await getCharactersPage(page, {
                signal,
                retries: 2,
                delay: 250,
                failSilently: true,
            });
            allCharacters.push(...pagePayload.results);
        }
    }

    return allCharacters;
};
