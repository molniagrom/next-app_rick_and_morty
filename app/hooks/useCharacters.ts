import {useEffect} from "react";
import {useRickAndMortyStore} from "@/app/store/RickAndMortyStore";
import {getCharactersPage} from "@/app/lib/charactersApi";
import {isAbortError, toUserMessage} from "@/app/lib/errors";

export const useCharacters = () => {
    const {state, actions} = useRickAndMortyStore();
    const charactersState = state.characters;

    useEffect(() => {
        if (charactersState.loading || charactersState.data !== null) {
            return;
        }

        actions.beginResource("characters", "all", false);
        const controller = new AbortController();

        getCharactersPage(1, {signal: controller.signal, retries: 2, delay: 250})
            .then((payload) => {
                if (controller.signal.aborted) {
                    return;
                }
                actions.resolveResource("characters", "all", payload.results);
            })
            .catch((fetchError) => {
                if (isAbortError(fetchError) || controller.signal.aborted) {
                    return;
                }

                console.error("Characters request failed:", fetchError);
                actions.rejectResource(
                    "characters",
                    "all",
                    toUserMessage(fetchError, "Failed to load characters") ?? "Failed to load characters",
                    []
                );
            });

        return () => {
            controller.abort();
        };
    }, [actions, charactersState.data, charactersState.loading]);

    return {
        characters: charactersState.data,
        loading: charactersState.loading || charactersState.data === null,
        error: charactersState.error,
    };
}
