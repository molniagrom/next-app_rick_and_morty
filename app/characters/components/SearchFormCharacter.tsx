"use client";

import React from "react";
import s from "./SearchFormCharacter.module.scss";

type SearchFormCharacterProps = {
    onSearchAction: (query: string) => void;
    initialValue?: string;
}

export const SearchFormCharacter = ({onSearchAction, initialValue = ""}: SearchFormCharacterProps) => {
    const [value, setValue] = React.useState(initialValue);

    React.useEffect(() => {
        setValue(initialValue);
    }, [initialValue]);

    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        onSearchAction(value.trim());
    };

    return (
        <form className={s.searchForm} onSubmit={onSubmit}>
            <input
                value={value}
                onChange={(event) => setValue(event.target.value)}
                className={s.searchInput}
                placeholder="Search characters by name"
            />
            <button type="submit" className={s.searchButton}>Search</button>
        </form>
    );
};
