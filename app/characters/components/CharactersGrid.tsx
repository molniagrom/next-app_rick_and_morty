import Link from "next/link";
import CharacterCard from "@/components/CharacterCard/CharacterCard";
import {CharacterType, Nullablen} from "@/app/types/types";
import s from "../page.module.scss";

type CharactersGridProps = {
    characters: Nullablen<CharacterType[]>;
    loading: boolean;
    error: string | null;
}

export const CharactersGrid = ({characters, loading, error}: CharactersGridProps) => {
    return (
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
    );
};
