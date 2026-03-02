"use client";

import Link from "next/link";
import {HeadMeta} from "@/components/HeadMeta/HeadMeta";
import {useEpisode} from "@/app/hooks/useEpisode";
import s from "./page.module.scss";

export default function EpisodePage() {
    const {episode, loading, error} = useEpisode();

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
                    <p><span>Characters in episode:</span> {episode.characters.length}</p>
                    <p><span>Created:</span> {new Date(episode.created).toLocaleDateString()}</p>
                    <Link href="/episodes" className={s.backLink}>Back to Episodes</Link>
                </section>
            </main>
        </div>
    );
}
