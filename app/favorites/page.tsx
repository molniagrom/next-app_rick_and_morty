"use client";

import React from "react";
import Link from "next/link";
import {HeadMeta} from "@/components/HeadMeta/HeadMeta";
import CharacterCard from "@/components/CharacterCard/CharacterCard";
import {useRickAndMortyStore} from "@/app/store/RickAndMortyStore";
import {FavoritesTab, FavoritesTabs} from "@/app/favorites/components/FavoritesTabs";
import {LocationCard} from "@/components/LocationCard/LocationCard";
import {EpisodeCard} from "@/components/EpisodeCard/EpisodeCard";
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

                {activeTab === "characters" && (
                    <>
                        {state.favorites.characters.length === 0 ? (
                            <p className={s.state}>No favorite characters yet.</p>
                        ) : (
                            <section className={s.grid}>
                                {state.favorites.characters.map((character) => (
                                    <Link key={character.id} href={`/characters/${character.id}`} className={s.cardLink}>
                                        <CharacterCard character={character}/>
                                    </Link>
                                ))}
                            </section>
                        )}
                    </>
                )}

                {activeTab === "locations" && (
                    <>
                        {state.favorites.locations.length === 0 ? (
                            <p className={s.state}>No favorite locations yet.</p>
                        ) : (
                            <section className={s.grid}>
                                {state.favorites.locations.map((location) => (
                                    <Link key={location.id} href={`/locations/${location.id}`} className={s.cardLink}>
                                        <LocationCard
                                            location={location}
                                            isFavorite
                                            onToggleFavorite={(event) => {
                                                event.preventDefault();
                                                event.stopPropagation();
                                                actions.toggleFavoriteLocation(location);
                                            }}
                                        />
                                    </Link>
                                ))}
                            </section>
                        )}
                    </>
                )}

                {activeTab === "episodes" && (
                    <>
                        {state.favorites.episodes.length === 0 ? (
                            <p className={s.state}>No favorite episodes yet.</p>
                        ) : (
                            <section className={s.grid}>
                                {state.favorites.episodes.map((episode) => (
                                    <Link key={episode.id} href={`/episodes/${episode.id}`} className={s.cardLink}>
                                        <EpisodeCard
                                            episode={episode}
                                            isFavorite
                                            onToggleFavorite={(event) => {
                                                event.preventDefault();
                                                event.stopPropagation();
                                                actions.toggleFavoriteEpisode(episode);
                                            }}
                                        />
                                    </Link>
                                ))}
                            </section>
                        )}
                    </>
                )}


            </section>
        </main>
    );
}
