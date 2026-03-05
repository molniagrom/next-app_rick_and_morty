"use client";

import Link from "next/link";
import {HeadMeta} from "@/components/HeadMeta/HeadMeta";
import {useLocation} from "@/app/hooks/useLocation";
import s from "./page.module.scss";

export default function LocationPage() {
    const {location, loading, error} = useLocation();

    if (loading) {
        return (
            <div className={s.page}>
                <HeadMeta title={"Loading location..."}/>
                <main className={s.stateBox}>
                    <h2>Loading location...</h2>
                </main>
            </div>
        );
    }

    if (error || !location) {
        return (
            <div className={s.page}>
                <HeadMeta title={"Location Error"}/>
                <main className={s.stateBox}>
                    <h2>{error ?? "Location not found"}</h2>
                    <Link href="/locations" className={s.backLink}>Back to Locations</Link>
                </main>
            </div>
        );
    }

    return (
        <div className={s.page}>
            <HeadMeta title={location.name}/>
            <main className={s.container}>
                <section className={s.infoCard}>
                    <h1 className={s.title}>{location.name}</h1>
                    <p><span>Type:</span> {location.type || "Unknown"}</p>
                    <p><span>Dimension:</span> {location.dimension || "Unknown"}</p>
                    <p><span>Residents:</span> {location.residents.length}</p>
                    <p><span>Created:</span> {new Date(location.created).toLocaleDateString()}</p>

                    <div className={s.residentsBlock}>
                        <span className={s.residentsLabel}>Residents links:</span>
                        {location.residents.length === 0 && <p className={s.emptyResidents}>No residents found.</p>}
                        {location.residents.length > 0 && (
                            <ul className={s.residentsList}>
                                {location.residents.map((residentUrl) => {
                                    const residentId = residentUrl.split("/").at(-1);
                                    if (!residentId) {
                                        return null;
                                    }

                                    return (
                                        <li key={residentUrl}>
                                            <Link href={`/characters/${residentId}`} className={s.characterLink}>
                                                Character #{residentId}
                                            </Link>
                                        </li>
                                    );
                                })}
                            </ul>
                        )}
                    </div>

                    <Link href="/locations" className={s.backLink}>Back to Locations</Link>
                </section>
            </main>
        </div>
    );
}
