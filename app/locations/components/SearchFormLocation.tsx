
import React from "react";
import {CustomSelect} from "@/components/CustomSelect/CustomSelect";
import {LOCATION_DIMENSIONS, LOCATION_TYPES} from "@/app/constants/locations";
import s from "./SearchFormLocation.module.scss";

type SearchLocationParams = {
    query: string;
    type: string;
    dimension: string;
}

type SearchFormLocationProps = {
    onSearchAction: (params: SearchLocationParams) => void;
    initialQuery?: string;
    initialType?: string;
    initialDimension?: string;
}

export const SearchFormLocation = ({
    onSearchAction,
    initialQuery = "",
    initialType = "",
    initialDimension = "",
}: SearchFormLocationProps) => {
    const [queryValue, setQueryValue] = React.useState(initialQuery);
    const [typeValue, setTypeValue] = React.useState(initialType);
    const [dimensionValue, setDimensionValue] = React.useState(initialDimension);

    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        onSearchAction({
            query: queryValue.trim(),
            type: typeValue.trim(),
            dimension: dimensionValue.trim(),
        });
    };

    return (
        <form className={s.searchForm} onSubmit={onSubmit}>
            <input
                value={queryValue}
                onChange={(event) => setQueryValue(event.target.value)}
                className={s.searchInput}
                placeholder="Search by name"
            />
            <CustomSelect
                value={typeValue}
                onChange={setTypeValue}
                className={s.searchInput}
                placeholder="All types"
                options={LOCATION_TYPES.map((type) => ({value: type, label: type}))}
            />
            <CustomSelect
                value={dimensionValue}
                onChange={setDimensionValue}
                className={s.searchInput}
                placeholder="All dimensions"
                options={LOCATION_DIMENSIONS.map((dimension) => ({value: dimension, label: dimension}))}
            />
            <button type="submit" className={s.searchButton}>Search</button>
        </form>
    );
};
