import {CustomSelect} from "@/components/CustomSelect/CustomSelect";
import {CharacterType} from "@/app/types/types";
import {SelectOption} from "@/app/genetic-data/lib/types";
import s from "../page.module.scss";

type ComparisonPanelProps = {
    filteredCharactersCount: number;
    selectedA?: CharacterType;
    selectedB?: CharacterType;
    options: SelectOption[];
    onSelectA: (value: string) => void;
    onSelectB: (value: string) => void;
}

export const ComparisonPanel = ({
    filteredCharactersCount,
    selectedA,
    selectedB,
    options,
    onSelectA,
    onSelectB,
}: ComparisonPanelProps) => {
    return (
        <section className={s.panel}>
            {filteredCharactersCount < 2 && <p className={s.state}>Need at least 2 characters for comparison.</p>}

            {filteredCharactersCount >= 2 && (
                <>
                    <div className={s.compareControls}>
                        <CustomSelect
                            value={selectedA ? String(selectedA.id) : ""}
                            onChange={(value) => onSelectA(value || "")}
                            className={s.select}
                            placeholder="Select character A"
                            options={options}
                        />
                        <CustomSelect
                            value={selectedB ? String(selectedB.id) : ""}
                            onChange={(value) => onSelectB(value || "")}
                            className={s.select}
                            placeholder="Select character B"
                            options={options}
                        />
                    </div>

                    {selectedA && selectedB && (
                        <div className={s.compareGrid}>
                            <article className={s.compareCard}>
                                <h3>{selectedA.name}</h3>
                                <p><span>Species:</span> {selectedA.species}</p>
                                <p><span>Status:</span> {selectedA.status}</p>
                                <p><span>Gender:</span> {selectedA.gender}</p>
                                <p><span>Origin:</span> {selectedA.origin.name}</p>
                                <p><span>Episodes:</span> {selectedA.episode.length}</p>
                            </article>
                            <article className={s.compareCard}>
                                <h3>{selectedB.name}</h3>
                                <p><span>Species:</span> {selectedB.species}</p>
                                <p><span>Status:</span> {selectedB.status}</p>
                                <p><span>Gender:</span> {selectedB.gender}</p>
                                <p><span>Origin:</span> {selectedB.origin.name}</p>
                                <p><span>Episodes:</span> {selectedB.episode.length}</p>
                            </article>
                        </div>
                    )}
                </>
            )}
        </section>
    );
};
