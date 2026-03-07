
import React from "react";
import {Controller, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {z} from "zod";
import {CustomSelect} from "@/components/CustomSelect/CustomSelect";
import {LOCATION_DIMENSIONS, LOCATION_TYPES} from "@/app/constants/locations";
import s from "./SearchFormLocation.module.scss";

const formSchema = z.object({
    query: z.string().trim().min(1, "Обязательное поле"),
    type: z.string().trim(),
    dimension: z.string().trim(),
});

type FormValues = z.infer<typeof formSchema>;

type SearchLocationParams = FormValues;

type SearchFormLocationProps = {
    onSearchAction: (params: SearchLocationParams) => void | Promise<void>;
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
    const {
        register,
        handleSubmit,
        control,
        reset,
        formState: {errors, isSubmitting},
    } = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            query: initialQuery,
            type: initialType,
            dimension: initialDimension,
        },
    });

    React.useEffect(() => {
        reset({
            query: initialQuery,
            type: initialType,
            dimension: initialDimension,
        });
    }, [initialDimension, initialQuery, initialType, reset]);

    return (
        <form
            className={s.searchForm}
            onSubmit={handleSubmit(async (values) => {
                await onSearchAction(values);
            })}
        >
            <input
                {...register("query")}
                className={s.searchInput}
                placeholder="Search by name"
            />
            <Controller
                control={control}
                name="type"
                render={({field}) => (
                    <CustomSelect
                        value={field.value}
                        onChange={field.onChange}
                        className={s.searchInput}
                        placeholder="All types"
                        options={LOCATION_TYPES.map((type) => ({value: type, label: type}))}
                    />
                )}
            />
            <Controller
                control={control}
                name="dimension"
                render={({field}) => (
                    <CustomSelect
                        value={field.value}
                        onChange={field.onChange}
                        className={s.searchInput}
                        placeholder="All dimensions"
                        options={LOCATION_DIMENSIONS.map((dimension) => ({value: dimension, label: dimension}))}
                    />
                )}
            />
            {errors.query && <p className="text-red-500 text-sm">{errors.query.message}</p>}
            <button type="submit" className={s.searchButton} disabled={isSubmitting}>Search</button>
        </form>
    );
};
