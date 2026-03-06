"use client";

import React from "react";
import axios from "axios";
import Link from "next/link";
import {HeadMeta} from "@/components/HeadMeta/HeadMeta";
import {useLocation} from "@/app/hooks/useLocation";
import {Loader} from "@/components/Loader/Loader";
import s from "./page.module.scss";

export default function LocationPage() {
    const {location, loading, error} = useLocation();
    const [residentNames, setResidentNames] = React.useState<Record<string, string>>({});
    const [residentsLoading, setResidentsLoading] = React.useState(false);

    React.useEffect(() => {
        if (!location) {
            return;
        }

        const residentIds = location.residents
            .map((residentUrl) => residentUrl.split("/").at(-1))
            .filter((id): id is string => Boolean(id));

        if (residentIds.length === 0) {
            setResidentNames({});
            return;
        }

        setResidentsLoading(true);
        axios.get(`/api/rickandmorty/character/${residentIds.join(",")}`)
            .then((res) => {
                const data = Array.isArray(res.data) ? res.data : [res.data];
                const namesById: Record<string, string> = {};

                data.forEach((character: { id: number, name: string }) => {
                    namesById[String(character.id)] = character.name;
                });

                setResidentNames(namesById);
            })
            .catch((fetchError) => {
                console.error(fetchError);
                setResidentNames({});
            })
            .finally(() => {
                setResidentsLoading(false);
            });
    }, [location]);

    if (loading) {
        return (
            <div className={s.page}>
                <HeadMeta title={"Loading location..."}/>
                <main className={s.stateBox}>
                    <Loader label="Loading location"/>
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
                        {residentsLoading && <p className={s.emptyResidents}><Loader label="Loading residents"/></p>}
                        {location.residents.length > 0 && !residentsLoading && (
                            <ul className={s.residentsList}>
                                {location.residents.map((residentUrl) => {
                                    const residentId = residentUrl.split("/").at(-1);
                                    if (!residentId) {
                                        return null;
                                    }

                                    return (
                                        <li key={residentUrl}>
                                            <Link href={`/characters/${residentId}`} className={s.characterLink}>
                                                {residentNames[residentId] ?? `Character #${residentId}`}
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
