"use client"

import React from "react";
import {useCharacters} from "@/app/hooks/useCharacters";
import s from "./page.module.scss"
import {HeadMeta} from "@/components/HeadMeta/HeadMeta";
import {CharactersGrid} from "@/app/characters/components/CharactersGrid";
import {Pagination} from "@/components/Pagination/Pagination";


export default function Page() {
    const [page, setPage] = React.useState(1);

    const {characters, loading, error, totalPages} = useCharacters(page)

    return (
        <div className={s.page}>
            <HeadMeta title={"Characters"}/>
            <main className={s.container}>
                <section className={s.headerSection}>
                    <h1 className={s.title}>Characters</h1>
                    <p className={s.subtitle}>Browse heroes, villains, aliens, and everything in between.</p>
                </section>

                <CharactersGrid characters={characters} loading={loading} error={error}/>
                {!loading && !error && (
                    <Pagination
                        currentPage={page}
                        totalPages={totalPages}
                        onSetPage={(nextPage) => setPage(Math.max(1, Math.min(nextPage, totalPages)))}
                    />
                )}
            </main>
        </div>
    )
}
