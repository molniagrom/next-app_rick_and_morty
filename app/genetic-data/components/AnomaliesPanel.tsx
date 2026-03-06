import Link from "next/link";
import {AnomalyItem} from "@/app/genetic-data/lib/types";
import s from "../page.module.scss";

type AnomaliesPanelProps = {
    anomaliesCount: number;
    items: AnomalyItem[];
}

export const AnomaliesPanel = ({anomaliesCount, items}: AnomaliesPanelProps) => {

    return (
        <section className={s.panel}>
            {anomaliesCount === 0 && <p className={s.state}>No rare combinations for current filters.</p>}

            {items.length > 0 && (
                <div className={s.anomalyList}>
                    {items.map((item) => (
                        <Link
                            key={`${item.species}-${item.gender}-${item.status}`}
                            href={`/genetic-data/anomalies/${encodeURIComponent(item.species)}/${encodeURIComponent(item.gender)}/${encodeURIComponent(item.status)}`}
                            className={s.cardLink}
                        >
                            <article className={s.anomalyCard}>
                                <h3>{item.species}</h3>
                                <p><span>Gender:</span> {item.gender}</p>
                                <p><span>Status:</span> {item.status}</p>
                                <p><span>Matches:</span> {item.count}</p>
                                <p><span>Examples:</span> {item.names.join(", ")}</p>
                            </article>
                        </Link>
                    ))}
                </div>
            )}
        </section>
    );
};
