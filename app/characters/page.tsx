"use client"

import {useCharacters} from "@/app/hooks/useCharacters";
import s from "./page.module.scss"
import {HeadMeta} from "@/components/HeadMeta/HeadMeta";
import {CharactersGrid} from "@/app/characters/components/CharactersGrid";


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

                <CharactersGrid characters={characters} loading={loading} error={error}/>
            </main>
        </div>
    )
}
