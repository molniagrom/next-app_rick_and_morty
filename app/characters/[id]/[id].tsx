import React from 'react';
import {HeadMeta} from "@/components/HeadMeta/HeadMeta";
import CharacterCard from "@/components/CharacterCard/CharacterCard";
import {useCharacter} from "@/app/hooks/useCharacter";

export const Character = () => {

    const character = useCharacter();

    return (
        <div>
            <HeadMeta title={"Character"}/>
            {character && <CharacterCard character={character}/>}
        </div>
    );
};
