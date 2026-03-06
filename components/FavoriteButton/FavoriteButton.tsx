import React from "react";
import s from "./FavoriteButton.module.scss";

type FavoriteButtonProps = {
    active: boolean;
    onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
    title: string;
}

export const FavoriteButton = ({active, onClick, title}: FavoriteButtonProps) => {
    return (
        <button
            type="button"
            className={`${s.favoriteButton} ${active ? s.active : ""}`}
            onClick={onClick}
            aria-label={title}
            aria-pressed={active}
            title={title}
        >
            {active ? "♥" : "♡"}
        </button>
    );
};
