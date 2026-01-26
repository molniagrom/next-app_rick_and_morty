"use client"

import {useCharacters} from "@/app/hooks/useCharacters";
import s from "./page.module.scss"
import CharacterCard from "@/components/CharacterCard/CharacterCard";
import {HeadMeta} from "@/components/HeadMeta/HeadMeta";
import {NavBar} from "@/components/NavBar/NavBar";


export default function Page() {

    const characters = useCharacters()

    return (
        <div>
            <HeadMeta title={"Characters"}/>
            <NavBar/>
            <h2 className={s.title}>Characters</h2>
            <main className={s.global}>
                {characters && characters.map((character) => (
                    <CharacterCard key={character.id} character={character}/>
                ))}
            </main>
        </div>
    )
}