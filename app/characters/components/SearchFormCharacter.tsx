"use client";

import React from "react";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {z} from "zod";
import s from "./SearchFormCharacter.module.scss";

const formSchema = z.object({
    query: z.string().trim().min(1, "Обязательное поле"),
});

type FormValues = z.infer<typeof formSchema>;

type SearchFormCharacterProps = {
    onSearchAction: (query: string) => void | Promise<void>;
    onResetAction: () => void | Promise<void>;
    initialValue?: string;
}

export const SearchFormCharacter = ({onSearchAction, onResetAction, initialValue = ""}: SearchFormCharacterProps) => {
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
                placeholder="Search characters by name"
            />
            <button type="submit" className={s.searchButton} disabled={isSubmitting}>Search</button>
            <button
                type="button"
                className={s.resetButton}
                disabled={isSubmitting}
                onClick={async () => {
                    reset({query: ""});
                    await onResetAction();
                }}
            >
                Back to all characters
            </button>
            {errors.query && <p className={`text-red-500 text-sm ${s.error}`}>{errors.query.message}</p>}
        </form>
    );
};
