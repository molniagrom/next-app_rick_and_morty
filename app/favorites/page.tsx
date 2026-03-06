"use client";

import React from "react";
import {HeadMeta} from "@/components/HeadMeta/HeadMeta";
import {useRickAndMortyStore} from "@/app/store/RickAndMortyStore";
import {FavoritesTab, FavoritesTabs} from "@/app/favorites/components/FavoritesTabs";
import {FavoritesContent} from "@/app/favorites/components/FavoritesContent";
import s from "./page.module.scss";

const FAVORITES_TABS = [
    {key: "characters", label: "Characters"},
    {key: "locations", label: "Locations"},
    {key: "episodes", label: "Episodes"},
] as const;

export default function FavoritesPage() {
    const [activeTab, setActiveTab] = React.useState<FavoritesTab>("characters");
    const {state, actions} = useRickAndMortyStore();

    const totalFavorites = state.favorites.characters.length + state.favorites.locations.length + state.favorites.episodes.length;

    return (
        <main className={s.page}>
            <HeadMeta title="Favorites"/>
            <section className={s.container}>
                <h1 className={s.title}>Favorites</h1>
                <p className={s.subtitle}>
                    Saved items: {totalFavorites}. Keep your favorite characters, locations and episodes here.
                </p>

                <FavoritesTabs
                    tabs={[...FAVORITES_TABS]}
                    activeTab={activeTab}
                    onChangeTab={setActiveTab}
                />

                <FavoritesContent
                    activeTab={activeTab}
                    favorites={state.favorites}
                    onToggleFavoriteLocation={actions.toggleFavoriteLocation}
                    onToggleFavoriteEpisode={actions.toggleFavoriteEpisode}
                />
            </section>
        </main>
    );
}
