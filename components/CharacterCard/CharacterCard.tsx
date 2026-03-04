import React from "react";
import Image from "next/image";
import styles from "../CharacterCard.module.scss";
import {CharacterType} from "@/app/types/types";

type CharacterCardProps = {
    character: CharacterType
}

const CharacterCard = ({character}: CharacterCardProps) => {
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
        </div>
    );
};

export default CharacterCard;
