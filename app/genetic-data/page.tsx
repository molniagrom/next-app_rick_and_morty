"use client";

import React, {useCallback, useEffect, useMemo} from "react";
import Link from "next/link";
import {usePathname, useRouter, useSearchParams} from "next/navigation";
import {HeadMeta} from "@/components/HeadMeta/HeadMeta";
import {CustomSelect} from "@/components/CustomSelect/CustomSelect";
import CharacterCard from "@/components/CharacterCard/CharacterCard";
import {useAllCharacters} from "@/app/hooks/useAllCharacters";
import {CharacterType} from "@/app/types/types";
import s from "./page.module.scss";

type TabKey = "overview" | "comparisons" | "anomalies";

const TABS: TabKey[] = ["overview", "comparisons", "anomalies"];
const OVERVIEW_PAGE_SIZE = 12;
const ANOMALIES_PAGE_SIZE = 8;

const parseTab = (rawTab: string | null): TabKey => {
    if (rawTab && TABS.includes(rawTab as TabKey)) {
        return rawTab as TabKey;
    }

    return "overview";
};

const parsePage = (rawPage: string | null) => {
    const page = Number(rawPage);
    return Number.isFinite(page) && page > 0 ? Math.floor(page) : 1;
};

const toLabel = (tab: TabKey) => tab[0].toUpperCase() + tab.slice(1);

const mutationIndex = (characters: CharacterType[]) => {
    if (characters.length === 0) {
        return 0;
    }

    const withCustomType = characters.filter((character) => character.type.trim().length > 0).length;
    const unknownOrigin = characters.filter((character) => character.origin.name.toLowerCase() === "unknown").length;
    const deadCount = characters.filter((character) => character.status === "Dead").length;
    const rawScore = ((withCustomType * 2) + unknownOrigin + deadCount) / (characters.length * 4);

    return Math.min(100, Math.round(rawScore * 100));
};

export default function GeneticDataPage() {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const {characters, loading, error} = useAllCharacters();

    const tab = parseTab(searchParams.get("tab"));
    const query = searchParams.get("search") ?? "";
    const speciesFilter = searchParams.get("species") ?? "";
    const genderFilter = searchParams.get("gender") ?? "";
    const statusFilter = searchParams.get("status") ?? "";
    const rawPage = parsePage(searchParams.get("page"));
    const compareA = searchParams.get("a") ?? "";
    const compareB = searchParams.get("b") ?? "";

    const updateParams = useCallback((updates: Record<string, string | null>) => {
        const params = new URLSearchParams(searchParams.toString());

        Object.entries(updates).forEach(([key, value]) => {
            if (!value) {
                params.delete(key);
            } else {
                params.set(key, value);
            }
        });

        const queryString = params.toString();
        router.replace(queryString ? `${pathname}?${queryString}` : pathname, {scroll: false});
    }, [pathname, router, searchParams]);

    const allCharacters = useMemo(() => characters ?? [], [characters]);

    const speciesOptions = useMemo(() => {
        const values = new Set<string>();
        allCharacters.forEach((character) => values.add(character.species || "Unknown"));
        return Array.from(values).sort((a, b) => a.localeCompare(b));
    }, [allCharacters]);

    const genderOptions = useMemo(() => {
        const values = new Set<string>();
        allCharacters.forEach((character) => values.add(character.gender || "Unknown"));
        return Array.from(values).sort((a, b) => a.localeCompare(b));
    }, [allCharacters]);

    const statusOptions = useMemo(() => {
        const values = new Set<string>();
        allCharacters.forEach((character) => values.add(character.status || "Unknown"));
        return Array.from(values).sort((a, b) => a.localeCompare(b));
    }, [allCharacters]);

    const filteredCharacters = useMemo(() => {
        const normalizedQuery = query.trim().toLowerCase();

        return allCharacters.filter((character) => {
            const nameMatches = normalizedQuery ? character.name.toLowerCase().includes(normalizedQuery) : true;
            const speciesMatches = speciesFilter ? character.species === speciesFilter : true;
            const genderMatches = genderFilter ? character.gender === genderFilter : true;
            const statusMatches = statusFilter ? character.status === statusFilter : true;

            return nameMatches && speciesMatches && genderMatches && statusMatches;
        });
    }, [allCharacters, genderFilter, query, speciesFilter, statusFilter]);

    const anomalies = useMemo(() => {
        const grouped = new Map<string, {count: number; names: string[]; species: string; gender: string; status: string;}>();

        filteredCharacters.forEach((character) => {
            const species = character.species || "Unknown";
            const gender = character.gender || "Unknown";
            const status = character.status || "Unknown";
            const key = `${species}|${gender}|${status}`;

            if (!grouped.has(key)) {
                grouped.set(key, {count: 0, names: [], species, gender, status});
            }

            const current = grouped.get(key)!;
            current.count += 1;
            if (current.names.length < 3) {
                current.names.push(character.name);
            }
        });

        return Array.from(grouped.values())
            .filter((item) => item.count <= 2)
            .sort((a, b) => a.count - b.count || a.species.localeCompare(b.species));
    }, [filteredCharacters]);

    const activeTotalPages = useMemo(() => {
        if (tab === "overview") {
            return Math.max(1, Math.ceil(filteredCharacters.length / OVERVIEW_PAGE_SIZE));
        }

        if (tab === "anomalies") {
            return Math.max(1, Math.ceil(anomalies.length / ANOMALIES_PAGE_SIZE));
        }

        return 1;
    }, [anomalies.length, filteredCharacters.length, tab]);

    const currentPage = Math.min(rawPage, activeTotalPages);

    useEffect(() => {
        if (currentPage !== rawPage) {
            updateParams({page: String(currentPage)});
        }
    }, [currentPage, rawPage, updateParams]);

    const overviewPageCharacters = useMemo(() => {
        const start = (currentPage - 1) * OVERVIEW_PAGE_SIZE;
        return filteredCharacters.slice(start, start + OVERVIEW_PAGE_SIZE);
    }, [currentPage, filteredCharacters]);

    const anomalyPageItems = useMemo(() => {
        const start = (currentPage - 1) * ANOMALIES_PAGE_SIZE;
        return anomalies.slice(start, start + ANOMALIES_PAGE_SIZE);
    }, [anomalies, currentPage]);

    const compareOptions = useMemo(
        () => filteredCharacters.map((character) => ({value: String(character.id), label: character.name})),
        [filteredCharacters]
    );

    const fallbackA = filteredCharacters[0]?.id;
    const fallbackB = filteredCharacters.find((character) => character.id !== fallbackA)?.id ?? fallbackA;

    const selectedAId = compareOptions.some((option) => option.value === compareA) ? Number(compareA) : fallbackA;
    const selectedBId = compareOptions.some((option) => option.value === compareB) ? Number(compareB) : fallbackB;
    const selectedA = filteredCharacters.find((character) => character.id === selectedAId);
    const selectedB = filteredCharacters.find((character) => character.id === selectedBId);

    const overviewStats = useMemo(() => {
        const alive = filteredCharacters.filter((character) => character.status === "Alive").length;
        const dead = filteredCharacters.filter((character) => character.status === "Dead").length;
        const unknownStatus = filteredCharacters.filter((character) => character.status === "unknown").length;
        const speciesCount = new Set(filteredCharacters.map((character) => character.species)).size;
        const withCustomType = filteredCharacters.filter((character) => character.type.trim().length > 0).length;
        const unknownTypePercent = filteredCharacters.length
            ? Math.round(((filteredCharacters.length - withCustomType) / filteredCharacters.length) * 100)
            : 0;

        return {alive, dead, unknownStatus, speciesCount, unknownTypePercent};
    }, [filteredCharacters]);

    const setPage = (page: number) => updateParams({page: String(page)});

    return (
        <main className={s.page}>
            <HeadMeta title="Genetic Data"/>
            <section className={s.container}>
                <h1 className={s.title}>Genetic Data</h1>
                <p className={s.subtitle}>
                    DNA Explorer dashboard with filters, comparison tools and anomaly detection.
                </p>

                <div className={s.filters}>
                    <input
                        className={s.searchInput}
                        placeholder="Search by character name"
                        value={query}
                        onChange={(event) => updateParams({search: event.target.value, page: "1"})}
                    />
                    <CustomSelect
                        value={speciesFilter}
                        onChange={(value) => updateParams({species: value || null, page: "1"})}
                        className={s.select}
                        placeholder="All species"
                        options={speciesOptions.map((item) => ({value: item, label: item}))}
                    />
                    <CustomSelect
                        value={genderFilter}
                        onChange={(value) => updateParams({gender: value || null, page: "1"})}
                        className={s.select}
                        placeholder="All genders"
                        options={genderOptions.map((item) => ({value: item, label: item}))}
                    />
                    <CustomSelect
                        value={statusFilter}
                        onChange={(value) => updateParams({status: value || null, page: "1"})}
                        className={s.select}
                        placeholder="All statuses"
                        options={statusOptions.map((item) => ({value: item, label: item}))}
                    />
                    <button
                        type="button"
                        className={s.resetButton}
                        onClick={() => updateParams({search: null, species: null, gender: null, status: null, page: "1"})}
                    >
                        Reset filters
                    </button>
                </div>

                <div className={s.tabs}>
                    {TABS.map((tabKey) => (
                        <button
                            key={tabKey}
                            className={`${s.tab} ${tab === tabKey ? s.tabActive : ""}`}
                            onClick={() => updateParams({tab: tabKey === "overview" ? null : tabKey, page: "1"})}
                            type="button"
                        >
                            {toLabel(tabKey)}
                        </button>
                    ))}
                </div>

                {loading && (
                    <div className={s.skeletonGrid}>
                        {Array.from({length: 6}).map((_, index) => (
                            <div key={index} className={s.skeleton}/>
                        ))}
                    </div>
                )}

                {error && <p className={s.stateError}>Error: {error}</p>}

                {!loading && !error && tab === "overview" && (
                    <section className={s.panel}>
                        <div className={s.metrics}>
                            <article className={s.metric}><span>Total</span><strong>{filteredCharacters.length}</strong></article>
                            <article className={s.metric}><span>Species</span><strong>{overviewStats.speciesCount}</strong></article>
                            <article className={s.metric}><span>Alive / Dead</span><strong>{overviewStats.alive} / {overviewStats.dead}</strong></article>
                            <article className={s.metric}><span>Unknown Type %</span><strong>{overviewStats.unknownTypePercent}%</strong></article>
                            <article className={s.metric}><span>Unknown Status</span><strong>{overviewStats.unknownStatus}</strong></article>
                            <article className={s.metric}><span>Mutation Index</span><strong>{mutationIndex(filteredCharacters)}%</strong></article>
                        </div>

                        {overviewPageCharacters.length === 0 && <p className={s.state}>No characters for current filters.</p>}

                        {overviewPageCharacters.length > 0 && (
                            <div className={s.grid}>
                                {overviewPageCharacters.map((character) => (
                                    <Link key={character.id} href={`/characters/${character.id}`} className={s.cardLink}>
                                        <CharacterCard character={character}/>
                                    </Link>
                                ))}
                            </div>
                        )}
                    </section>
                )}

                {!loading && !error && tab === "comparisons" && (
                    <section className={s.panel}>
                        {filteredCharacters.length < 2 && (
                            <p className={s.state}>Need at least 2 characters for comparison.</p>
                        )}

                        {filteredCharacters.length >= 2 && (
                            <>
                                <div className={s.compareControls}>
                                    <CustomSelect
                                        value={selectedA ? String(selectedA.id) : ""}
                                        onChange={(value) => updateParams({a: value || null})}
                                        className={s.select}
                                        placeholder="Select character A"
                                        options={compareOptions}
                                    />
                                    <CustomSelect
                                        value={selectedB ? String(selectedB.id) : ""}
                                        onChange={(value) => updateParams({b: value || null})}
                                        className={s.select}
                                        placeholder="Select character B"
                                        options={compareOptions}
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
                )}

                {!loading && !error && tab === "anomalies" && (
                    <section className={s.panel}>
                        {anomalies.length === 0 && <p className={s.state}>No rare combinations for current filters.</p>}

                        {anomalyPageItems.length > 0 && (
                            <div className={s.anomalyList}>
                                {anomalyPageItems.map((item) => (
                                    <article key={`${item.species}-${item.gender}-${item.status}`} className={s.anomalyCard}>
                                        <h3>{item.species}</h3>
                                        <p><span>Gender:</span> {item.gender}</p>
                                        <p><span>Status:</span> {item.status}</p>
                                        <p><span>Matches:</span> {item.count}</p>
                                        <p><span>Examples:</span> {item.names.join(", ")}</p>
                                    </article>
                                ))}
                            </div>
                        )}
                    </section>
                )}

                {!loading && !error && tab !== "comparisons" && activeTotalPages > 1 && (
                    <div className={s.pagination}>
                        <button type="button" className={s.pageButton} onClick={() => setPage(currentPage - 1)} disabled={currentPage === 1}>
                            Previous
                        </button>
                        <span className={s.pageInfo}>Page {currentPage} of {activeTotalPages}</span>
                        <button
                            type="button"
                            className={s.pageButton}
                            onClick={() => setPage(currentPage + 1)}
                            disabled={currentPage === activeTotalPages}
                        >
                            Next
                        </button>
                    </div>
                )}
            </section>
        </main>
    );
}
