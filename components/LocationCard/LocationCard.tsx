import React from "react";
import {LocationType} from "@/app/types/types";
import {FavoriteButton} from "@/components/FavoriteButton/FavoriteButton";
import s from "./LocationCard.module.scss";

type LocationCardProps = {
    location: LocationType;
    isFavorite: boolean;
    onToggleFavorite: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export const LocationCard = ({location, isFavorite, onToggleFavorite}: LocationCardProps) => {
    return (
        <article className={s.card}>
            <h2>{location.name}</h2>
            <p><span>Type:</span> {location.type || "Unknown"}</p>
            <p><span>Dimension:</span> {location.dimension || "Unknown"}</p>
            <p><span>Residents:</span> {location.residents.length}</p>
            <FavoriteButton
                active={isFavorite}
                onClick={onToggleFavorite}
                title={isFavorite ? "Remove location from favorites" : "Add location to favorites"}
            />
        </article>
    );
};
