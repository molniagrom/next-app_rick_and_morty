import Link from "next/link";
import CharacterCard from "@/components/CharacterCard/CharacterCard";
import {CharacterType, Nullablen} from "@/app/types/types";
import {CHARACTERS_SKELETON_COUNT} from "@/app/constants/pagination";
import {Skeleton} from "@/components/Skeleton/Skeleton";
import s from "../page.module.scss";

type CharactersGridProps = {
    characters: Nullablen<CharacterType[]>;
    loading: boolean;
    error: string | null;
}

export const CharactersGrid = ({characters, loading, error}: CharactersGridProps) => {
    const stateClassName = `${s.subtitle} ${s.gridState}`;

    if (loading) {
        return (
            <section className={s.grid}>
                {Array.from({length: CHARACTERS_SKELETON_COUNT}).map((_, index) => (
                    <Skeleton key={index} className={s.cardSkeleton} label="Loading character card"/>
                ))}
            </section>
        );
    }

    return (
        <section className={s.grid}>
            {error && <p className={stateClassName}>Error: {error}</p>}
            {characters && !loading && !error && characters.length === 0 && (
                <p className={stateClassName}>Characters not found.</p>
            )}
            {characters && !loading && !error && characters.map((character) => (
                <Link key={character.id} href={`/characters/${character.id}`} className={s.cardLink}>
                    <CharacterCard character={character}/>
                </Link>
            ))}
        </section>
    );
};
