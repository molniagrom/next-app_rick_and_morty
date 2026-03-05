import React from "react";

export type SelectOption = {
    value: string,
    label: React.ReactNode,
    className?: string,
}

export type CustomSelectProps = {
    value: string,
    onChange: (value: string) => void,
    options: SelectOption[],
    placeholder: string,
    className?: string,
}