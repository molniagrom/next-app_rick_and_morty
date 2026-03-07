"use client";

import React from "react";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {z} from "zod";
import s from "./SearchForm.module.scss";

const formSchema = z.object({
    query: z.string().trim().min(1, "Обязательное поле"),
});

type FormValues = z.infer<typeof formSchema>;

type SearchFormEpisodeProps = {
    onSearchAction: (query: string) => void | Promise<void>;
    placeholder?: string;
    buttonLabel?: string;
    initialValue?: string;
}

export const SearchFormEpisode = ({
    onSearchAction,
    placeholder = "Search by name or code (e.g. S01E01)",
    buttonLabel = "Search",
    initialValue = "",
}: SearchFormEpisodeProps) => {
    const {
        register,
        handleSubmit,
        reset,
        formState: {errors, isSubmitting},
    } = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            query: initialValue,
        },
    });

    React.useEffect(() => {
        reset({query: initialValue});
    }, [initialValue, reset]);

    return (
        <form
            className={s.searchForm}
            onSubmit={handleSubmit(async ({query}) => {
                await onSearchAction(query);
            })}
        >
            <input
                {...register("query")}
                className={s.searchInput}
                placeholder={placeholder}
            />
            {errors.query && <p className="text-red-500 text-sm">{errors.query.message}</p>}
            <button type="submit" className={s.searchButton} disabled={isSubmitting}>{buttonLabel}</button>
        </form>
    );
};
