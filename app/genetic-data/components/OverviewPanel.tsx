import Link from "next/link";
import CharacterCard from "@/components/CharacterCard/CharacterCard";
import {CharacterType} from "@/app/types/types";
import {OverviewStats} from "@/app/genetic-data/lib/types";
import s from "../page.module.scss";

type OverviewPanelProps = {
    filteredCharactersCount: number;
    overviewStats: OverviewStats;
    mutationIndex: number;
    characters: CharacterType[];
}

export const OverviewPanel = ({
    filteredCharactersCount,
    overviewStats,
    mutationIndex,
    characters,
}: OverviewPanelProps) => {
    return (
        <section className={s.panel}>
            <div className={s.metrics}>
                <article className={s.metric}><span>Total</span><strong>{filteredCharactersCount}</strong></article>
                <article className={s.metric}><span>Species</span><strong>{overviewStats.speciesCount}</strong></article>
                <article className={s.metric}><span>Alive / Dead</span><strong>{overviewStats.alive} / {overviewStats.dead}</strong></article>
                <article className={s.metric}><span>Unknown Type %</span><strong>{overviewStats.unknownTypePercent}%</strong></article>
                <article className={s.metric}><span>Unknown Status</span><strong>{overviewStats.unknownStatus}</strong></article>
                <article className={s.metric}><span>Mutation Index</span><strong>{mutationIndex}%</strong></article>
            </div>

            {characters.length === 0 && <p className={s.state}>No characters for current filters.</p>}

            {characters.length > 0 && (
                <div className={s.grid}>
                    {characters.map((character) => (
                        <Link key={character.id} href={`/characters/${character.id}`} className={s.cardLink}>
                            <CharacterCard character={character}/>
                        </Link>
                    ))}
                </div>
            )}
        </section>
    );
};
