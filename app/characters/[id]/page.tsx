"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import {HeadMeta} from "@/components/HeadMeta/HeadMeta";
import {useCharacter} from "@/app/hooks/useCharacter";
import {CharacterInfoSection} from "@/app/characters/[id]/components/CharacterInfoSection";
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

                <CharacterInfoSection character={character}>
                    <Link href="/characters" className={s.backLink}>Back to Characters</Link>
                </CharacterInfoSection>
            </main>
        </div>
    );
}
