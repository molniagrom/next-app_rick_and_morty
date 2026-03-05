import {useEffect, useMemo} from "react";
import axios from "axios";
import {LocationsPayload} from "@/app/types/types";
import {useRickAndMortyStore} from "@/app/store/RickAndMortyStore";

export const useLocations = (query: string, page: number, type: string, dimension: string) => {
    const {state, actions} = useRickAndMortyStore();
    const locationsState = state.locations;
    const trimmedQuery = query.trim();
    const trimmedType = type.trim();
    const trimmedDimension = dimension.trim();
    const key = useMemo(
        () => `${trimmedQuery.toLowerCase()}|${trimmedType.toLowerCase()}|${trimmedDimension.toLowerCase()}|${page}`,
        [page, trimmedDimension, trimmedQuery, trimmedType]
    );

    useEffect(() => {
        if (locationsState.key === key && (locationsState.loading || locationsState.data !== null)) {
            return;
        }

        actions.beginResource("locations", key);

        axios.get(`/api/rickandmorty/location`, {
            params: {
                page,
                ...(trimmedQuery ? {name: trimmedQuery} : {}),
                ...(trimmedType ? {type: trimmedType} : {}),
                ...(trimmedDimension ? {dimension: trimmedDimension} : {}),
            },
        })
            .then((res) => {
                actions.resolveResource("locations", key, res.data as LocationsPayload);
            })
            .catch((error) => {
                if (axios.isAxiosError(error) && error.response?.status === 404) {
                    actions.resolveResource("locations", key, {
                        info: {
                            count: 0,
                            pages: 0,
                            next: null,
                            prev: null,
                        },
                        results: [],
                    });
                    return;
                }

                console.error(error);
                actions.rejectResource("locations", key, "Failed to load locations", {
                    info: {
                        count: 0,
                        pages: 0,
                        next: null,
                        prev: null,
                    },
                    results: [],
                });
            });
    }, [
        actions,
        key,
        locationsState.data,
        locationsState.key,
        locationsState.loading,
        page,
        trimmedDimension,
        trimmedQuery,
        trimmedType,
    ]);

    return {
        locations: locationsState.key === key ? locationsState.data : null,
        loading: locationsState.key === key ? locationsState.loading : true,
        error: locationsState.key === key ? locationsState.error : null,
    };
};
