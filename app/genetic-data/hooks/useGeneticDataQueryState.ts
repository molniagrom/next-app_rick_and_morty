"use client";

import {useCallback} from "react";
import {usePathname, useRouter, useSearchParams} from "next/navigation";
import {parsePage, parseTab} from "@/app/genetic-data/lib/calculations";

export const useGeneticDataQueryState = () => {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const state = {
        tab: parseTab(searchParams.get("tab")),
        query: searchParams.get("search") ?? "",
        speciesFilter: searchParams.get("species") ?? "",
        genderFilter: searchParams.get("gender") ?? "",
        statusFilter: searchParams.get("status") ?? "",
        rawPage: parsePage(searchParams.get("page")),
        compareA: searchParams.get("a") ?? "",
        compareB: searchParams.get("b") ?? "",
    };

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

    return {state, updateParams};
};
