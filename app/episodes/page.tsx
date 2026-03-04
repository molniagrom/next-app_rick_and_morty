"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import {useEpisodes} from "@/app/hooks/useEpisodes";
import s from "./page.module.scss";

export default function EpisodesPage() {
    const [inputValue, setInputValue] = React.useState("");
    const [query, setQuery] = React.useState("");
    const {episodes, loading, error} = useEpisodes(query);

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setQuery(inputValue.trim());
    };

    return (
        <main className={s.page}>
            <section className={s.container}>
                <h1 className={s.title}>Episodes</h1>

                <form className={s.searchForm} onSubmit={onSubmit}>
                    <input
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        className={s.searchInput}
                        placeholder="Search by name or code (e.g. S01E01)"
                    />
                    <button type="submit" className={s.searchButton}>Search</button>
                </form>

                {loading && <p className={s.state}>Loading episodes...</p>}
                {error && <p className={s.state}>Error: {error}</p>}

                {episodes && !loading && !error && episodes.length === 0 && (
                    <p className={s.state}>No episodes found for &quot;{query}&quot;.</p>
                )}

                {episodes && !loading && !error && episodes.length > 0 && (
                    <div className={s.grid}>
                        {episodes.map((episode) => (
                            <Link key={episode.id} href={`/episodes/${episode.id}`} className={s.cardLink}>
                                <article className={s.card}>
                                    {/*For now, the server sends only one placeholder image for all episodes. */}
                                    {episode.previewImage ? (
                                        <Image
                                            src={episode.previewImage}
                                            alt={`Episode ${episode.name}`}
                                            width={320}
                                            height={180}
                                            className={s.previewImage}
                                        />
                                    ) : (
                                        <div className={s.previewFallback}>No image</div>
                                    )}
                                    <h2>{episode.name}</h2>
                                    <p><span>Code:</span> {episode.episode}</p>
                                    <p><span>Air date:</span> {episode.air_date}</p>
                                </article>
                            </Link>
                        ))}
                    </div>
                )}
            </section>
        </main>
    );
}
