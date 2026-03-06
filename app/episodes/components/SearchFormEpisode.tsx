"use client";

import React from "react";
import s from "./SearchForm.module.scss";

type SearchFormEpisodeProps = {
    onSearch: (query: string) => void;
    placeholder?: string;
    buttonLabel?: string;
    initialValue?: string;
}

export const SearchFormEpisode = ({
    onSearch,
    placeholder = "Search by name or code (e.g. S01E01)",
    buttonLabel = "Search",
    initialValue = "",
}: SearchFormEpisodeProps) => {
    const [value, setValue] = React.useState(initialValue);

    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        onSearch(value.trim());
    };

    return (
        <form className={s.searchForm} onSubmit={onSubmit}>
            <input
                value={value}
                onChange={(event) => setValue(event.target.value)}
                className={s.searchInput}
                placeholder={placeholder}
            />
            <button type="submit" className={s.searchButton}>{buttonLabel}</button>
        </form>
    );
};
