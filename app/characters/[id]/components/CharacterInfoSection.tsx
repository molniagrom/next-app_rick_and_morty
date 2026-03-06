import {CharacterType} from "@/app/types/types";
import {ReactNode} from "react";
import s from "../page.module.scss";

type CharacterInfoSectionProps = {
    character: CharacterType;
    children?: ReactNode;
}

export const CharacterInfoSection = ({character, children}: CharacterInfoSectionProps) => {
    return (
        <section className={s.infoSection}>
            <h1 className={s.title}>{character.name}</h1>
            <div className={s.metaGrid}>
                <article className={s.metaItem}>
                    <span className={s.label}>Status</span>
                    <span className={s.value}>{character.status}</span>
                </article>
                <article className={s.metaItem}>
                    <span className={s.label}>Species</span>
                    <span className={s.value}>{character.species}</span>
                </article>
                <article className={s.metaItem}>
                    <span className={s.label}>Type</span>
                    <span className={s.value}>{character.type || "Unknown"}</span>
                </article>
                <article className={s.metaItem}>
                    <span className={s.label}>Gender</span>
                    <span className={s.value}>{character.gender}</span>
                </article>
                <article className={s.metaItem}>
                    <span className={s.label}>Origin</span>
                    <span className={s.value}>{character.origin?.name ?? "Unknown"}</span>
                </article>
                <article className={s.metaItem}>
                    <span className={s.label}>Last Known Location</span>
                    <span className={s.value}>{character.location?.name ?? "Unknown"}</span>
                </article>
                <article className={s.metaItem}>
                    <span className={s.label}>Episodes</span>
                    <span className={s.value}>{character.episode?.length ?? 0}</span>
                </article>
            </div>
            {children}
        </section>
    );
};
