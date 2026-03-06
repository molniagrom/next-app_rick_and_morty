"use client";

import React, {use, useMemo} from "react";
import Link from "next/link";
import {HeadMeta} from "@/components/HeadMeta/HeadMeta";
import CharacterCard from "@/components/CharacterCard/CharacterCard";
import {useAllCharacters} from "@/app/hooks/useAllCharacters";
import {ProgressBar} from "@/components/ProgressBar/ProgressBar";
import s from "./page.module.scss";

type AnomalyPageProps = {
    params: Promise<{
        species: string;
        gender: string;
        status: string;
    }>;
}

const decodeSegment = (value: string) => {
    try {
        return decodeURIComponent(value);
    } catch {
        return value;
    }
};

const normalizeField = (value: string | undefined) => value || "Unknown";

export default function AnomalyPage({params}: AnomalyPageProps) {
    const {characters, loading, error} = useAllCharacters();
    const resolvedParams = use(params);

    const species = decodeSegment(resolvedParams.species);
    const gender = decodeSegment(resolvedParams.gender);
    const status = decodeSegment(resolvedParams.status);
    const title = `${species} | ${gender} | ${status}`;
    const allCharacters = useMemo(() => characters ?? [], [characters]);

    const matches = useMemo(() => (
        allCharacters.filter((character) => (
            normalizeField(character.species) === species
            && normalizeField(character.gender) === gender
            && normalizeField(character.status) === status
        ))
    ), [allCharacters, gender, species, status]);

    const stats = useMemo(() => {
        const origins = new Set<string>();
        const locations = new Set<string>();
        const typeSet = new Set<string>();
        let totalEpisodes = 0;

        matches.forEach((character) => {
            origins.add(character.origin?.name || "Unknown");
            locations.add(character.location?.name || "Unknown");
            typeSet.add(character.type.trim() || "Unknown");
            totalEpisodes += character.episode.length;
        });

        return {
            avgEpisodes: matches.length ? Math.round((totalEpisodes / matches.length) * 10) / 10 : 0,
            uniqueOrigins: origins.size,
            uniqueLocations: locations.size,
            uniqueTypes: typeSet.size,
        };
    }, [matches]);

    if (loading) {
        return (
            <main className={s.page}>
                <HeadMeta title="Loading anomaly..."/>
                <section className={s.container}>
                    <div className={s.loadingState}>
                        <ProgressBar label="Loading anomaly details"/>
                    </div>
                </section>
            </main>
        );
    }

    if (error) {
        return (
            <main className={s.page}>
                <HeadMeta title="Anomaly error"/>
                <section className={s.container}>
                    <p className={s.state}>Error: {error}</p>
                    <Link href="/genetic-data?tab=anomalies" className={s.backLink}>Back to anomalies</Link>
                </section>
            </main>
        );
    }

    return (
        <main className={s.page}>
            <HeadMeta title={`Anomaly: ${title}`}/>
            <section className={s.container}>
                <Link href="/genetic-data?tab=anomalies" className={s.backLink}>Back to anomalies</Link>
                <h1 className={s.title}>Anomaly details</h1>
                <p className={s.subtitle}>{title}</p>

                <section className={s.metrics}>
                    <article className={s.metric}>
                        <span>Matches</span>
                        <strong>{matches.length}</strong>
                    </article>
                    <article className={s.metric}>
                        <span>Avg episodes</span>
                        <strong>{stats.avgEpisodes}</strong>
                    </article>
                    <article className={s.metric}>
                        <span>Unique origins</span>
                        <strong>{stats.uniqueOrigins}</strong>
                    </article>
                    <article className={s.metric}>
                        <span>Unique locations</span>
                        <strong>{stats.uniqueLocations}</strong>
                    </article>
                    <article className={s.metric}>
                        <span>Unique types</span>
                        <strong>{stats.uniqueTypes}</strong>
                    </article>
                </section>

                {matches.length === 0 ? (
                    <p className={s.state}>No characters found for this anomaly.</p>
                ) : (
                    <section className={s.grid}>
                        {matches.map((character) => (
                            <Link key={character.id} href={`/characters/${character.id}`} className={s.cardLink}>
                                <CharacterCard character={character}/>
                            </Link>
                        ))}
                    </section>
                )}
            </section>
        </main>
    );
}
