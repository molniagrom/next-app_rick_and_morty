"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import {HeadMeta} from "@/components/HeadMeta/HeadMeta";
import {useCharacter} from "@/app/hooks/useCharacter";
import s from "./page.module.scss";

export default function CharacterPage() {
    const {character, loading, error} = useCharacter();

    if (loading) {
        return (
            <div className={s.page}>
                <HeadMeta title={"Loading..."}/>
                <main className={s.stateBox}>
                    <h2>Loading character...</h2>
                </main>
            </div>
        );
    }

    if (error || !character) {
        return (
            <div className={s.page}>
                <HeadMeta title={"Error"}/>
                <main className={s.stateBox}>
                    <h2>Error: {error ?? "Character not found"}</h2>
                    <Link href="/characters" className={s.backLink}>Back to Characters</Link>
                </main>
            </div>
        );
    }

    return (
        <div className={s.page}>
            <HeadMeta title={character.name}/>
            <main className={s.container}>
                <section className={s.imageSection}>
                    <Image
                        src={character.image}
                        alt={character.name}
                        width={640}
                        height={640}
                        className={s.heroImage}
                        unoptimized
                        style={{width: "100%", height: "auto"}}
                        priority
                    />
                </section>

                <section className={s.infoSection}>
                    <h1 className={s.title}>{character.name}</h1>
                    <div className={s.metaGrid}>
                        <article className={s.metaItem}>
                            <span className={s.label}>Status</span>
                            <span className={s.value}>{character.status}</span>
                        </article>
                        <article className={s.metaItem}>
                            <span className={s.label}>Species</span>
                            <span className={s.value}>{character.species}</span>
                        </article>
                        <article className={s.metaItem}>
                            <span className={s.label}>Type</span>
                            <span className={s.value}>{character.type || "Unknown"}</span>
                        </article>
                        <article className={s.metaItem}>
                            <span className={s.label}>Gender</span>
                            <span className={s.value}>{character.gender}</span>
                        </article>
                        <article className={s.metaItem}>
                            <span className={s.label}>Origin</span>
                            <span className={s.value}>{character.origin?.name ?? "Unknown"}</span>
                        </article>
                        <article className={s.metaItem}>
                            <span className={s.label}>Last Known Location</span>
                            <span className={s.value}>{character.location?.name ?? "Unknown"}</span>
                        </article>
                        <article className={s.metaItem}>
                            <span className={s.label}>Episodes</span>
                            <span className={s.value}>{character.episode?.length ?? 0}</span>
                        </article>
                    </div>
                    <Link href="/characters" className={s.backLink}>Back to Characters</Link>
                </section>
            </main>
        </div>
    );
}
