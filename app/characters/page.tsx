"use client"

import {useCharacters} from "@/app/hooks/useCharacters";
import s from "./page.module.scss"
import CharacterCard from "@/components/CharacterCard/CharacterCard";
import {HeadMeta} from "@/components/HeadMeta/HeadMeta";
import Link from "next/link";


export default function Page() {

    const characters = useCharacters()

    return (
        <div>
            <HeadMeta title={"Characters"}/>
            <h2 className={s.title}>Characters</h2>
            <main className={s.global}>
                {characters && characters.map((character) => (
                    <Link key={character.id} href={`/characters/${character.id}`}>
                        <CharacterCard character={character}/>
                    </Link>
                ))}
            </main>
        </div>
    )
}