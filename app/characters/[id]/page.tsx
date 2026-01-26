"use client";

import React from 'react';
import {HeadMeta} from "@/components/HeadMeta/HeadMeta";
import CharacterCard from "@/components/CharacterCard/CharacterCard";
import {useCharacter} from "@/app/hooks/useCharacter";

export default function CharacterPage() {

    const { character, loading, error } = useCharacter();

    if (loading) {
        return (
            <div>
                <HeadMeta title={"Loading..."}/>
                <div style={{ textAlign: 'center', padding: '50px' }}>
                    <h2>Loading character...</h2>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div>
                <HeadMeta title={"Error"}/>
                <div style={{ textAlign: 'center', padding: '50px' }}>
                    <h2>Error: {error}</h2>
                </div>
            </div>
        );
    }

    return (
        <div>
            <HeadMeta title={character ? character.name : "Character"}/>
            {character && <CharacterCard character={character}/>}
        </div>
    );
};
