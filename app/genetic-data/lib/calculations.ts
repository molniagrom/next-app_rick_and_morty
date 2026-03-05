import {CharacterType} from "@/app/types/types";
import {AnomalyItem, ComparisonSelection, OverviewStats, SelectOption, TabKey} from "@/app/genetic-data/lib/types";

export const TABS: TabKey[] = ["overview", "comparisons", "anomalies"];
export const OVERVIEW_PAGE_SIZE = 12;
export const ANOMALIES_PAGE_SIZE = 8;

export const toLabel = (tab: TabKey) => tab[0].toUpperCase() + tab.slice(1);

export const parseTab = (rawTab: string | null): TabKey => {
    if (rawTab && TABS.includes(rawTab as TabKey)) {
        return rawTab as TabKey;
    }

    return "overview";
};

export const parsePage = (rawPage: string | null) => {
    const page = Number(rawPage);
    return Number.isFinite(page) && page > 0 ? Math.floor(page) : 1;
};

export const getUniqueOptions = (
    characters: CharacterType[],
    pick: (character: CharacterType) => string
): SelectOption[] => {
    const values = new Set<string>();
    characters.forEach((character) => values.add(pick(character) || "Unknown"));

    return Array.from(values)
        .sort((a, b) => a.localeCompare(b))
        .map((value) => ({value, label: value}));
};

export const filterCharacters = (
    characters: CharacterType[],
    filters: {query: string; species: string; gender: string; status: string}
) => {
    const normalizedQuery = filters.query.trim().toLowerCase();

    return characters.filter((character) => {
        const nameMatches = normalizedQuery ? character.name.toLowerCase().includes(normalizedQuery) : true;
        const speciesMatches = filters.species ? character.species === filters.species : true;
        const genderMatches = filters.gender ? character.gender === filters.gender : true;
        const statusMatches = filters.status ? character.status === filters.status : true;

        return nameMatches && speciesMatches && genderMatches && statusMatches;
    });
};

export const buildAnomalies = (characters: CharacterType[]): AnomalyItem[] => {
    const grouped = new Map<string, AnomalyItem>();

    characters.forEach((character) => {
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
};

export const calculateOverviewStats = (characters: CharacterType[]): OverviewStats => {
    const alive = characters.filter((character) => character.status === "Alive").length;
    const dead = characters.filter((character) => character.status === "Dead").length;
    const unknownStatus = characters.filter((character) => character.status === "unknown").length;
    const speciesCount = new Set(characters.map((character) => character.species)).size;
    const withCustomType = characters.filter((character) => character.type.trim().length > 0).length;
    const unknownTypePercent = characters.length
        ? Math.round(((characters.length - withCustomType) / characters.length) * 100)
        : 0;

    return {alive, dead, unknownStatus, speciesCount, unknownTypePercent};
};

export const calculateMutationIndex = (characters: CharacterType[]) => {
    if (characters.length === 0) {
        return 0;
    }

    const withCustomType = characters.filter((character) => character.type.trim().length > 0).length;
    const unknownOrigin = characters.filter((character) => character.origin.name.toLowerCase() === "unknown").length;
    const deadCount = characters.filter((character) => character.status === "Dead").length;
    const rawScore = ((withCustomType * 2) + unknownOrigin + deadCount) / (characters.length * 4);

    return Math.min(100, Math.round(rawScore * 100));
};

export const getActiveTotalPages = (tab: TabKey, filteredCount: number, anomaliesCount: number) => {
    if (tab === "overview") {
        return Math.max(1, Math.ceil(filteredCount / OVERVIEW_PAGE_SIZE));
    }

    if (tab === "anomalies") {
        return Math.max(1, Math.ceil(anomaliesCount / ANOMALIES_PAGE_SIZE));
    }

    return 1;
};

export const paginate = <T,>(items: T[], page: number, pageSize: number) => {
    const start = (page - 1) * pageSize;
    return items.slice(start, start + pageSize);
};

export const resolveComparisonSelection = (
    filteredCharacters: CharacterType[],
    compareA: string,
    compareB: string
): ComparisonSelection => {
    const options = filteredCharacters.map((character) => ({value: String(character.id), label: character.name}));
    const fallbackA = filteredCharacters[0]?.id;
    const fallbackB = filteredCharacters.find((character) => character.id !== fallbackA)?.id ?? fallbackA;
    const selectedAId = options.some((option) => option.value === compareA) ? Number(compareA) : fallbackA;
    const selectedBId = options.some((option) => option.value === compareB) ? Number(compareB) : fallbackB;
    const selectedA = filteredCharacters.find((character) => character.id === selectedAId);
    const selectedB = filteredCharacters.find((character) => character.id === selectedBId);

    return {selectedA, selectedB, options};
};
