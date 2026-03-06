import React from "react";
import Image from "next/image";
import {EpisodeType} from "@/app/types/types";
import {FavoriteButton} from "@/components/FavoriteButton/FavoriteButton";
import s from "./EpisodeCard.module.scss";

type EpisodeCardProps = {
    episode: EpisodeType;
    isFavorite: boolean;
    onToggleFavorite: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export const EpisodeCard = ({episode, isFavorite, onToggleFavorite}: EpisodeCardProps) => {
    return (
        <article className={s.card}>
            {episode.previewImage ? (
                <Image
                    src={episode.previewImage}
                    alt={`Episode ${episode.name}`}
                    width={320}
                    height={180}
                    className={s.previewImage}
                />
            ) : (
                <div className={s.previewFallback}>No image</div>
            )}
            <h2>{episode.name}</h2>
            <p><span>Code:</span> {episode.episode}</p>
            <p><span>Air date:</span> {episode.air_date}</p>
            <FavoriteButton
                active={isFavorite}
                onClick={onToggleFavorite}
                title={isFavorite ? "Remove episode from favorites" : "Add episode to favorites"}
            />
        </article>
    );
};
