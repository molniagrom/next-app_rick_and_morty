import React from 'react';
import {CharacterType} from "@/app/hooks/useCharacters";
import Image from "next/image";

type CharacterCardProps = {
    character: CharacterType
}

const CharacterCard = ({character}: CharacterCardProps) => {
    return (
        <div>
            <div>{character.name}</div>
            <Image
                src={character.image}
                alt={`Picture of ${character.name}`}
                width={300}
                height={300}
            />
        </div>
    );
};

export default CharacterCard;