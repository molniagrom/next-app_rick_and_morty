import React from "react";
import s from "./CustomSelect.module.scss";
import {CustomSelectProps} from "@/components/CustomSelect/TypeCustomSelect";

export const CustomSelect = ({value, onChange, options, placeholder, className}: CustomSelectProps) => {
    const [isOpen, setIsOpen] = React.useState(false);
    const rootRef = React.useRef<HTMLDivElement | null>(null);
    const selectedOption = options.find((option) => option.value === value);
    const classes = className ? `${s.wrapper} ${className}` : s.wrapper;

    React.useEffect(() => {
        const onOutsideClick = (event: MouseEvent) => {
            if (!rootRef.current?.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        const onEsc = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", onOutsideClick);
        document.addEventListener("keydown", onEsc);

        return () => {
            document.removeEventListener("mousedown", onOutsideClick);
            document.removeEventListener("keydown", onEsc);
        };
    }, []);

    return (
        <div className={classes} ref={rootRef}>
            <button
                type="button"
                className={`${s.trigger} ${isOpen ? s.triggerOpen : ""}`}
                onClick={() => setIsOpen((prev) => !prev)}
                aria-expanded={isOpen}
                aria-label={placeholder}
            >
                <span className={value ? s.value : s.placeholder}>
                    {selectedOption ? selectedOption.label : placeholder}
                </span>
                <span className={`${s.chevron} ${isOpen ? s.chevronOpen : ""}`}/>
            </button>

            <ul className={`${s.menu} ${isOpen ? s.menuOpen : ""}`} role="listbox">
                <li>
                    <button
                        type="button"
                        className={`${s.option} ${!value ? s.selected : ""}`}
                        onClick={() => {
                            onChange("");
                            setIsOpen(false);
                        }}
                    >
                        {placeholder}
                    </button>
                </li>
                {options.map((option) => (
                    <li key={option.value}>
                        <button
                            type="button"
                            className={`${s.option} ${option.className ?? ""} ${option.value === value ? s.selected : ""}`}
                            onClick={() => {
                                onChange(option.value);
                                setIsOpen(false);
                            }}
                        >
                            {option.label}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};
