"use client";

import React from "react";
import axios from "axios";
import Link from "next/link";
import {HeadMeta} from "@/components/HeadMeta/HeadMeta";
import {useEpisode} from "@/app/hooks/useEpisode";
import s from "./page.module.scss";

type EpisodeCharacter = {
    id: number,
    name: string,
}

export default function EpisodePage() {
    const {episode, loading, error} = useEpisode();
    const [characters, setCharacters] = React.useState<EpisodeCharacter[]>([]);

    React.useEffect(() => {
        if (!episode) {
            return;
        }

        const ids = episode.characters
            .map((characterUrl) => characterUrl.split("/").at(-1))
            .filter((id): id is string => Boolean(id));

        if (ids.length === 0) {
            setCharacters([]);
            return;
        }

        axios.get(`${process.env.NEXT_PUBLIC_RICK_AND_MORTY_API_URL}/character/${ids.join(",")}`)
            .then((res) => {
                const data = Array.isArray(res.data) ? res.data : [res.data];
                const episodeCharacters = data.map((character: EpisodeCharacter) => ({
                    id: character.id,
                    name: character.name,
                }));
                setCharacters(episodeCharacters);
            })
            .catch((fetchError) => {
                console.error(fetchError);
                setCharacters([]);
            });
    }, [episode]);

    if (loading) {
        return (
            <div className={s.page}>
                <HeadMeta title={"Loading episode..."}/>
                <main className={s.stateBox}>
                    <h2>Loading episode...</h2>
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
                        {characters.length === 0 && <p className={s.emptyCharacters}>No characters found.</p>}
                        {characters.length > 0 && (
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
