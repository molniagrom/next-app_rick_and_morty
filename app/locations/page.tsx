"use client";

import React from "react";
import {useLocations} from "@/app/hooks/useLocations";
import Link from "next/link";
import s from "./page.module.scss";
import {CustomSelect} from "@/components/CustomSelect/CustomSelect";
import {LOCATION_DIMENSIONS, LOCATION_TYPES} from "@/app/constants/locations";
import {Pagination} from "@/components/Pagination/Pagination";
import {useRickAndMortyStore} from "@/app/store/RickAndMortyStore";
import {LocationCard} from "@/components/LocationCard/LocationCard";

export default function LocationsPage() {
    const [inputValue, setInputValue] = React.useState("");
    const [inputType, setInputType] = React.useState("");
    const [inputDimension, setInputDimension] = React.useState("");
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

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setQuery(inputValue.trim());
        setType(inputType.trim());
        setDimension(inputDimension.trim());
        setPage(1);
    };

    return (
        <main className={s.page}>
            <section className={s.container}>
                <h1 className={s.title}>Locations</h1>

                <form className={s.searchForm} onSubmit={onSubmit}>
                    <input
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        className={s.searchInput}
                        placeholder="Search by name"
                    />
                    <CustomSelect
                        value={inputType}
                        onChange={setInputType}
                        className={s.searchInput}
                        placeholder="All types"
                        options={LOCATION_TYPES.map((type) => ({value: type, label: type}))}
                    />
                    <CustomSelect
                        value={inputDimension}
                        onChange={setInputDimension}
                        className={s.searchInput}
                        placeholder="All dimensions"
                        options={LOCATION_DIMENSIONS.map((dimension) => ({value: dimension, label: dimension}))}
                    />
                    <button type="submit" className={s.searchButton}>Search</button>
                </form>

                {loading && <p className={s.state}>Loading locations...</p>}
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

