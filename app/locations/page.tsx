"use client";

import React from "react";
import {useLocations} from "@/app/hooks/useLocations";
import Link from "next/link";
import s from "./page.module.scss";
import {Pagination} from "@/components/Pagination/Pagination";
import {useRickAndMortyStore} from "@/app/store/RickAndMortyStore";
import {LocationCard} from "@/components/LocationCard/LocationCard";
import {Skeleton} from "@/components/Skeleton/Skeleton";
import {SearchFormLocation} from "@/app/locations/components/SearchFormLocation";
import {LOCATIONS_SKELETON_COUNT} from "@/app/constants/pagination";

export default function LocationsPage() {
    const [query, setQuery] = React.useState("");
    const [type, setType] = React.useState("");
    const [dimension, setDimension] = React.useState("");
    const [page, setPage] = React.useState(1);
    const {locations, loading, error} = useLocations(query, page, type, dimension);
    const {state, actions} = useRickAndMortyStore();
    const favoriteLocationIds = React.useMemo(
        () => new Set(state.favorites.locations.map((location) => location.id)),
        [state.favorites.locations]
    );

    const onSearch = ({query, type, dimension}: { query: string, type: string, dimension: string }) => {
        setQuery(query);
        setType(type);
        setDimension(dimension);
        setPage(1);
    };

    return (
        <main className={s.page}>
            <section className={s.container}>
                <h1 className={s.title}>Locations</h1>

                <SearchFormLocation onSearchAction={onSearch}/>

                {loading && (
                    <div className={s.grid}>
                        {Array.from({length: LOCATIONS_SKELETON_COUNT}).map((_, index) => (
                            <Skeleton key={index} className={s.cardSkeleton} label="Loading location card"/>
                        ))}
                    </div>
                )}
                {error && <p className={s.state}>Error: {error}</p>}

                {locations && !loading && !error && locations.results.length === 0 && (
                    <p className={s.state}>No locations found for &quot;{query}&quot;.</p>
                )}

                {locations && !loading && !error && locations.results.length > 0 && (
                    <>
                        <div className={s.grid}>
                            {locations.results.map((location) => (
                                <Link key={location.id} href={`/locations/${location.id}`} className={s.cardLink}>
                                    <LocationCard
                                        location={location}
                                        isFavorite={favoriteLocationIds.has(location.id)}
                                        onToggleFavorite={(event) => {
                                            event.preventDefault();
                                            event.stopPropagation();
                                            actions.toggleFavoriteLocation(location);
                                        }}
                                    />
                                </Link>
                            ))}
                        </div>

                        <Pagination
                            currentPage={page}
                            totalPages={locations.info.pages || 1}
                            onSetPage={(nextPage) => setPage(Math.max(1, Math.min(nextPage, locations.info.pages || 1)))}
                            disablePrevious={!locations.info.prev}
                            disableNext={!locations.info.next}
                        />
                    </>
                )}
            </section>
        </main>
    );
}

