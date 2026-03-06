"use client";

import React from "react";
import Image from "next/image";
import styles from "../CharacterCard.module.scss";
import {CharacterType} from "@/app/types/types";
import {useRickAndMortyStore} from "@/app/store/RickAndMortyStore";
import {FavoriteButton} from "@/components/FavoriteButton/FavoriteButton";

type CharacterCardProps = {
    character: CharacterType
}

const CharacterCard = ({character}: CharacterCardProps) => {
    const {state, actions} = useRickAndMortyStore();
    const isFavorite = state.favorites.characters.some((item) => item.id === character.id);

    const onToggleFavorite = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        event.stopPropagation();
        actions.toggleFavoriteCharacter(character);
    };

    return (
        <div className={styles.card}>
            <div className={styles.name}>{character.name}</div>
            <Image
                src={character.image}
                alt={`Picture of ${character.name}`}
                width={300}
                height={300}
                className={styles.characterImage}
                style={{width: "100%", height: "auto"}}
            />
            <FavoriteButton
                active={isFavorite}
                onClick={onToggleFavorite}
                title={isFavorite ? "Remove from favorites" : "Add to favorites"}
            />
        </div>
    );
};

export default CharacterCard;
