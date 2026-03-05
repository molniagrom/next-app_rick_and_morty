"use client";

import React, {useEffect, useMemo} from "react";
import {HeadMeta} from "@/components/HeadMeta/HeadMeta";
import {useAllCharacters} from "@/app/hooks/useAllCharacters";
import {useGeneticDataQueryState} from "@/app/genetic-data/hooks/useGeneticDataQueryState";
import {
    ANOMALIES_PAGE_SIZE,
    OVERVIEW_PAGE_SIZE,
    buildAnomalies,
    calculateMutationIndex,
    calculateOverviewStats,
    filterCharacters,
    getActiveTotalPages,
    getUniqueOptions,
    paginate,
    resolveComparisonSelection,
} from "@/app/genetic-data/lib/calculations";
import {Filters} from "@/app/genetic-data/components/Filters";
import {Tabs} from "@/app/genetic-data/components/Tabs";
import {OverviewPanel} from "@/app/genetic-data/components/OverviewPanel";
import {ComparisonPanel} from "@/app/genetic-data/components/ComparisonPanel";
import {AnomaliesPanel} from "@/app/genetic-data/components/AnomaliesPanel";
import {Pagination} from "@/app/genetic-data/components/Pagination";
import s from "./page.module.scss";

export default function GeneticDataPage() {
    const {characters, loading, error} = useAllCharacters();
    const {state, updateParams} = useGeneticDataQueryState();

    const allCharacters = useMemo(() => characters ?? [], [characters]);

    const speciesOptions = useMemo(
        () => getUniqueOptions(allCharacters, (character) => character.species),
        [allCharacters]
    );
    const genderOptions = useMemo(
        () => getUniqueOptions(allCharacters, (character) => character.gender),
        [allCharacters]
    );
    const statusOptions = useMemo(
        () => getUniqueOptions(allCharacters, (character) => character.status),
        [allCharacters]
    );

    const filteredCharacters = useMemo(() => filterCharacters(allCharacters, {
        query: state.query,
        species: state.speciesFilter,
        gender: state.genderFilter,
        status: state.statusFilter,
    }), [allCharacters, state.genderFilter, state.query, state.speciesFilter, state.statusFilter]);

    const anomalies = useMemo(() => buildAnomalies(filteredCharacters), [filteredCharacters]);
    const activeTotalPages = useMemo(
        () => getActiveTotalPages(state.tab, filteredCharacters.length, anomalies.length),
        [anomalies.length, filteredCharacters.length, state.tab]
    );

    const currentPage = Math.min(state.rawPage, activeTotalPages);

    useEffect(() => {
        if (currentPage !== state.rawPage) {
            updateParams({page: String(currentPage)});
        }
    }, [currentPage, state.rawPage, updateParams]);

    const overviewPageCharacters = useMemo(
        () => paginate(filteredCharacters, currentPage, OVERVIEW_PAGE_SIZE),
        [currentPage, filteredCharacters]
    );
    const anomalyPageItems = useMemo(
        () => paginate(anomalies, currentPage, ANOMALIES_PAGE_SIZE),
        [anomalies, currentPage]
    );

    const comparison = useMemo(
        () => resolveComparisonSelection(filteredCharacters, state.compareA, state.compareB),
        [filteredCharacters, state.compareA, state.compareB]
    );

    const overviewStats = useMemo(() => calculateOverviewStats(filteredCharacters), [filteredCharacters]);
    const mutationIndex = useMemo(() => calculateMutationIndex(filteredCharacters), [filteredCharacters]);

    return (
        <main className={s.page}>
            <HeadMeta title="Genetic Data"/>
            <section className={s.container}>
                <h1 className={s.title}>Genetic Data</h1>
                <p className={s.subtitle}>DNA Explorer dashboard with filters, comparison tools and anomaly detection.</p>

                <Filters
                    query={state.query}
                    speciesFilter={state.speciesFilter}
                    genderFilter={state.genderFilter}
                    statusFilter={state.statusFilter}
                    speciesOptions={speciesOptions}
                    genderOptions={genderOptions}
                    statusOptions={statusOptions}
                    onUpdateParams={updateParams}
                />

                <Tabs
                    tab={state.tab}
                    onChangeTab={(tab) => updateParams({tab: tab === "overview" ? null : tab, page: "1"})}
                />

                {loading && (
                    <div className={s.skeletonGrid}>
                        {Array.from({length: 6}).map((_, index) => (
                            <div key={index} className={s.skeleton}/>
                        ))}
                    </div>
                )}

                {error && <p className={s.stateError}>Error: {error}</p>}

                {!loading && !error && state.tab === "overview" && (
                    <OverviewPanel
                        filteredCharactersCount={filteredCharacters.length}
                        overviewStats={overviewStats}
                        mutationIndex={mutationIndex}
                        characters={overviewPageCharacters}
                    />
                )}

                {!loading && !error && state.tab === "comparisons" && (
                    <ComparisonPanel
                        filteredCharactersCount={filteredCharacters.length}
                        selectedA={comparison.selectedA}
                        selectedB={comparison.selectedB}
                        options={comparison.options}
                        onSelectA={(value) => updateParams({a: value || null})}
                        onSelectB={(value) => updateParams({b: value || null})}
                    />
                )}

                {!loading && !error && state.tab === "anomalies" && (
                    <AnomaliesPanel
                        anomaliesCount={anomalies.length}
                        items={anomalyPageItems}
                    />
                )}

                {!loading && !error && state.tab !== "comparisons" && (
                    <Pagination
                        currentPage={currentPage}
                        totalPages={activeTotalPages}
                        onSetPage={(page) => updateParams({page: String(page)})}
                    />
                )}
            </section>
        </main>
    );
}
