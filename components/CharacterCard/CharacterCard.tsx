import React from 'react';
import { CharacterType } from "@/app/hooks/useCharacters";
import Image from "next/image";
import styles from '../CharacterCard.module.scss';

type CharacterCardProps = {
    character: CharacterType
}

const CharacterCard = ({ character }: CharacterCardProps) => {
    return (
        <div className={styles.card}>
            <div className={styles.name}>{character.name}</div>
            <Image
                src={character.image}
                alt={`Picture of ${character.name}`}
                width={300}
                height={300}
                className={styles.characterImage}
                style={{ width: '100%', height: 'auto' }} // Делает изображение адаптивным внутри карточки
            />
        </div>
    );
};

export default CharacterCard;