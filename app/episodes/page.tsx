"use client";

import React, {useMemo} from "react";
import Link from "next/link";
import {useEpisodes} from "@/app/hooks/useEpisodes";
import {Pagination} from "@/components/Pagination/Pagination";
import {useRickAndMortyStore} from "@/app/store/RickAndMortyStore";
import {EpisodeCard} from "@/components/EpisodeCard/EpisodeCard";
import {Skeleton} from "@/components/Skeleton/Skeleton";
import {SearchFormEpisode} from "@/app/episodes/components/SearchFormEpisode";
import {EPISODES_PAGE_SIZE} from "@/app/constants/pagination";
import s from "./page.module.scss";

export default function EpisodesPage() {
    const [query, setQuery] = React.useState("");
    const [page, setPage] = React.useState(1);
    const {episodes, loading, error} = useEpisodes(query);
    const {state, actions} = useRickAndMortyStore();
    const totalPages = Math.max(1, Math.ceil((episodes?.length ?? 0) / EPISODES_PAGE_SIZE));
    const currentPage = Math.min(page, totalPages);

    const favoriteEpisodeIds = useMemo(
        () => new Set(state.favorites.episodes.map((episode) => episode.id)),
        [state.favorites.episodes]
    );

    const paginatedEpisodes = useMemo(() => {
        if (!episodes) {
            return [];
        }

        const start = (currentPage - 1) * EPISODES_PAGE_SIZE;
        return episodes.slice(start, start + EPISODES_PAGE_SIZE);
    }, [currentPage, episodes]);

    const onSearch = (nextQuery: string) => {
        setQuery(nextQuery);
        setPage(1);
    };

    return (
        <main className={s.page}>
            <section className={s.container}>
                <h1 className={s.title}>Episodes</h1>

                <SearchFormEpisode
                    onSearchAction={onSearch}
                />

                {loading && (
                    <div className={s.grid}>
                        {Array.from({length: EPISODES_PAGE_SIZE}).map((_, index) => (
                            <Skeleton key={index} className={s.cardSkeleton} label="Loading episode card"/>
                        ))}
                    </div>
                )}
                {error && <p className={s.state}>Error: {error}</p>}

                {episodes && !loading && !error && episodes.length === 0 && (
                    <p className={s.state}>No episodes found for &quot;{query}&quot;.</p>
                )}

                {episodes && !loading && !error && episodes.length > 0 && (
                    <>
                        <div className={s.grid}>
                            {paginatedEpisodes.map((episode) => (
                                <Link key={episode.id} href={`/episodes/${episode.id}`} className={s.cardLink}>
                                    <EpisodeCard
                                        episode={episode}
                                        isFavorite={favoriteEpisodeIds.has(episode.id)}
                                        onToggleFavorite={(event) => {
                                            event.preventDefault();
                                            event.stopPropagation();
                                            actions.toggleFavoriteEpisode(episode);
                                        }}
                                    />
                                </Link>
                            ))}
                        </div>

                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onSetPage={(nextPage) => setPage(Math.max(1, Math.min(nextPage, totalPages)))}
                        />
                    </>
                )}
            </section>
        </main>
    );
}
