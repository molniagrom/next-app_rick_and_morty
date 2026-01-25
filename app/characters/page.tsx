"use client"

import {useCharacters} from "@/app/hooks/useCharacters";
import s from "./page.module.css"
import CharacterCard from "@/components/CharacterCard";
import {HeadMeta} from "@/components/HeadMeta";


export default function Page() {

const characters = useCharacters()

    return (
        <div>
            <HeadMeta title={"Characters"}/>
            <main className={s.global}>
                {characters && characters.map((character) => (
                    <CharacterCard key={character.id} character={character}/>
                ))}
            </main>
        </div>
    )
}
