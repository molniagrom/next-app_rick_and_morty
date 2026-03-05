import {CustomSelect} from "@/components/CustomSelect/CustomSelect";
import {SelectOption} from "@/app/genetic-data/lib/types";
import s from "../page.module.scss";

type FiltersProps = {
    query: string;
    speciesFilter: string;
    genderFilter: string;
    statusFilter: string;
    speciesOptions: SelectOption[];
    genderOptions: SelectOption[];
    statusOptions: SelectOption[];
    onUpdateParams: (updates: Record<string, string | null>) => void;
}

export const Filters = ({
    query,
    speciesFilter,
    genderFilter,
    statusFilter,
    speciesOptions,
    genderOptions,
    statusOptions,
    onUpdateParams,
}: FiltersProps) => {
    return (
        <div className={s.filters}>
            <input
                className={s.searchInput}
                placeholder="Search by character name"
                value={query}
                onChange={(event) => onUpdateParams({search: event.target.value, page: "1"})}
            />
            <CustomSelect
                value={speciesFilter}
                onChange={(value) => onUpdateParams({species: value || null, page: "1"})}
                className={s.select}
                placeholder="All species"
                options={speciesOptions}
            />
            <CustomSelect
                value={genderFilter}
                onChange={(value) => onUpdateParams({gender: value || null, page: "1"})}
                className={s.select}
                placeholder="All genders"
                options={genderOptions}
            />
            <CustomSelect
                value={statusFilter}
                onChange={(value) => onUpdateParams({status: value || null, page: "1"})}
                className={s.select}
                placeholder="All statuses"
                options={statusOptions}
            />
            <button
                type="button"
                className={s.resetButton}
                onClick={() => onUpdateParams({search: null, species: null, gender: null, status: null, page: "1"})}
            >
                Reset filters
            </button>
        </div>
    );
};
