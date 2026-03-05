import {CharacterType} from "@/app/types/types";

export type TabKey = "overview" | "comparisons" | "anomalies";

export type AnomalyItem = {
    count: number;
    names: string[];
    species: string;
    gender: string;
    status: string;
}

export type OverviewStats = {
    alive: number;
    dead: number;
    unknownStatus: number;
    speciesCount: number;
    unknownTypePercent: number;
}

export type SelectOption = {
    value: string;
    label: string;
}

export type ComparisonSelection = {
    selectedA?: CharacterType;
    selectedB?: CharacterType;
    options: SelectOption[];
}
