"use client"

import React from "react";
import {usePathname, useRouter, useSearchParams} from "next/navigation";
import {useCharacters} from "@/app/hooks/useCharacters";
import s from "./page.module.scss"
import {HeadMeta} from "@/components/HeadMeta/HeadMeta";
import {CharactersGrid} from "@/app/characters/components/CharactersGrid";
import {Pagination} from "@/components/Pagination/Pagination";
import {SearchFormCharacter} from "@/app/characters/components/SearchFormCharacter";


export default function Page() {
    return (
        <React.Suspense fallback={<CharactersPageFallback/>}>
            <CharactersPageContent/>
        </React.Suspense>
    );
}

function CharactersPageContent() {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const initialQuery = searchParams.get("query") ?? "";
    const initialPageRaw = Number(searchParams.get("page") ?? "1");
    const initialPage = Number.isFinite(initialPageRaw) && initialPageRaw > 0 ? Math.floor(initialPageRaw) : 1;

    const [query, setQuery] = React.useState(initialQuery);
    const [page, setPage] = React.useState(initialPage);

    const {characters, loading, error, totalPages} = useCharacters(page, query);

    const syncUrl = React.useCallback((nextQuery: string, nextPage: number) => {
        const params = new URLSearchParams();
        const normalizedQuery = nextQuery.trim();

        if (normalizedQuery) {
            params.set("query", normalizedQuery);
        }
        if (nextPage > 1) {
            params.set("page", String(nextPage));
        }

        const queryString = params.toString();
        router.replace(queryString ? `${pathname}?${queryString}` : pathname, {scroll: false});
    }, [pathname, router]);

    const onSearch = (nextQuery: string) => {
        const normalizedQuery = nextQuery.trim();
        setQuery(normalizedQuery);
        setPage(1);
        syncUrl(normalizedQuery, 1);
    };

    const onReset = () => {
        setQuery("");
        setPage(1);
        syncUrl("", 1);
    };

    const detailsSearch = React.useMemo(() => {
        const params = new URLSearchParams();

        if (query.trim()) {
            params.set("query", query.trim());
        }
        if (page > 1) {
            params.set("page", String(page));
        }

        const queryString = params.toString();
        return queryString ? `?${queryString}` : "";
    }, [page, query]);

    return (
        <div className={s.page}>
            <HeadMeta title={"Characters"}/>
            <main className={s.container}>
                <section className={s.headerSection}>
                    <h1 className={s.title}>Characters</h1>
                    <p className={s.subtitle}>Browse heroes, villains, aliens, and everything in between.</p>
                </section>

                <SearchFormCharacter
                    onSearchAction={onSearch}
                    onResetAction={onReset}
                    initialValue={query}
                />

                <CharactersGrid
                    characters={characters}
                    loading={loading}
                    error={error}
                    detailsSearch={detailsSearch}
                />
                {!loading && !error && (
                    <Pagination
                        currentPage={page}
                        totalPages={totalPages}
                        onSetPage={(nextPage) => {
                            const safePage = Math.max(1, Math.min(nextPage, totalPages));
                            setPage(safePage);
                            syncUrl(query, safePage);
                        }}
                    />
                )}
            </main>
        </div>
    );
}

function CharactersPageFallback() {
    return (
        <div className={s.page}>
            <HeadMeta title={"Characters"}/>
            <main className={s.container}>
                <section className={s.headerSection}>
                    <h1 className={s.title}>Characters</h1>
                    <p className={s.subtitle}>Loading page...</p>
                </section>
            </main>
        </div>
    );
}
