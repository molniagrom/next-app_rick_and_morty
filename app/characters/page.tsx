"use client"

import {useCharacters} from "@/app/hooks/useCharacters";
import s from "./page.module.scss"
import CharacterCard from "@/components/CharacterCard/CharacterCard";
import {HeadMeta} from "@/components/HeadMeta/HeadMeta";
import Link from "next/link";


export default function Page() {

    const {characters, loading, error} = useCharacters()

    return (
        <div className={s.page}>
            <HeadMeta title={"Characters"}/>
            <main className={s.container}>
                <section className={s.headerSection}>
                    <h1 className={s.title}>Characters</h1>
                    <p className={s.subtitle}>Browse heroes, villains, aliens, and everything in between.</p>
                </section>

                <section className={s.grid}>
                    {loading && <p className={s.subtitle}>Loading characters...</p>}
                    {error && <p className={s.subtitle}>Error: {error}</p>}
                    {characters && !loading && !error && characters.length === 0 && (
                        <p className={s.subtitle}>Characters not found.</p>
                    )}
                    {characters && !loading && !error && characters.map((character) => (
                        <Link key={character.id} href={`/characters/${character.id}`} className={s.cardLink}>
                            <CharacterCard character={character}/>
                        </Link>
                    ))}
                </section>
            </main>
        </div>
    )
}
