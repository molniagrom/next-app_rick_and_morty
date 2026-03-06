"use client";

import React from "react";
import Link from "next/link";
import {HeadMeta} from "@/components/HeadMeta/HeadMeta";
import {useEpisode} from "@/app/hooks/useEpisode";
import {useEpisodeCharacters} from "@/app/hooks/useEpisodeCharacters";
import {Loader} from "@/components/Loader/Loader";
import s from "./page.module.scss";

export default function EpisodePage() {
    const {episode, loading, error} = useEpisode();
    const {characters, loading: charactersLoading, error: charactersError} = useEpisodeCharacters(episode);

    if (loading) {
        return (
            <div className={s.page}>
                <HeadMeta title={"Loading episode..."}/>
                <main className={s.stateBox}>
                    <Loader label="Loading episode"/>
                </main>
            </div>
        );
    }

    if (error || !episode) {
        return (
            <div className={s.page}>
                <HeadMeta title={"Episode Error"}/>
                <main className={s.stateBox}>
                    <h2>{error ?? "Episode not found"}</h2>
                    <Link href="/episodes" className={s.backLink}>Back to Episodes</Link>
                </main>
            </div>
        );
    }

    return (
        <div className={s.page}>
            <HeadMeta title={episode.name}/>
            <main className={s.container}>
                <section className={s.infoCard}>
                    <h1 className={s.title}>{episode.name}</h1>
                    <p><span>Episode code:</span> {episode.episode}</p>
                    <p><span>Air date:</span> {episode.air_date}</p>
                    <p><span>Created:</span> {new Date(episode.created).toLocaleDateString()}</p>

                    <div className={s.charactersBlock}>
                        <span className={s.charactersLabel}>Characters in episode:</span>
                        {charactersLoading && <p className={s.emptyCharacters}><Loader label="Loading episode characters"/></p>}
                        {charactersError && <p className={s.emptyCharacters}>Error: {charactersError}</p>}
                        {!charactersLoading && !charactersError && characters.length === 0 && (
                            <p className={s.emptyCharacters}>No characters found.</p>
                        )}
                        {!charactersLoading && !charactersError && characters.length > 0 && (
                            <ul className={s.charactersList}>
                                {characters.map((character) => (
                                    <li key={character.id}>
                                        <Link href={`/characters/${character.id}`} className={s.characterLink}>
                                            {character.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>

                    <Link href="/episodes" className={s.backLink}>Back to Episodes</Link>
                </section>
            </main>
        </div>
    );
}
