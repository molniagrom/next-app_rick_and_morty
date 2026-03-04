"use client";

import React from "react";
import {useLocations} from "@/app/hooks/useLocations";
import s from "./page.module.scss";

export default function LocationsPage() {
    const [inputValue, setInputValue] = React.useState("");
    const [query, setQuery] = React.useState("");
    const [page, setPage] = React.useState(1);
    const {locations, loading, error} = useLocations(query, page);

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setQuery(inputValue.trim());
        setPage(1);
    };

    const onPrevPage = () => setPage((prev) => Math.max(1, prev - 1));
    const onNextPage = () => setPage((prev) => prev + 1);

    return (
        <main className={s.page}>
            <section className={s.container}>
                <h1 className={s.title}>Locations</h1>

                <form className={s.searchForm} onSubmit={onSubmit}>
                    <input
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        className={s.searchInput}
                        placeholder="Search locations by name"
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
                                <article key={location.id} className={s.card}>
                                    <h2>{location.name}</h2>
                                    <p><span>Type:</span> {location.type || "Unknown"}</p>
                                    <p><span>Dimension:</span> {location.dimension || "Unknown"}</p>
                                    <p><span>Residents:</span> {location.residents.length}</p>
                                </article>
                            ))}
                        </div>

                        <div className={s.pagination}>
                            <button
                                type="button"
                                className={s.pageButton}
                                onClick={onPrevPage}
                                disabled={!locations.info.prev}
                            >
                                Previous
                            </button>
                            <span className={s.pageInfo}>
                                Page {page} of {locations.info.pages || 1}
                            </span>
                            <button
                                type="button"
                                className={s.pageButton}
                                onClick={onNextPage}
                                disabled={!locations.info.next}
                            >
                                Next
                            </button>
                        </div>
                    </>
                )}
            </section>
        </main>
    );
}

