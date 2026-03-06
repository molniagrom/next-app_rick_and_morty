"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import {HeadMeta} from "@/components/HeadMeta/HeadMeta";
import CharacterCard from "@/components/CharacterCard/CharacterCard";
import {useRickAndMortyStore} from "@/app/store/RickAndMortyStore";
import {FavoriteButton} from "@/components/FavoriteButton/FavoriteButton";
import {FavoritesTab, FavoritesTabs} from "@/app/favorites/components/FavoritesTabs";
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
                                        <article className={s.card}>
                                            <h2>{location.name}</h2>
                                            <p><span>Type:</span> {location.type || "Unknown"}</p>
                                            <p><span>Dimension:</span> {location.dimension || "Unknown"}</p>
                                            <p><span>Residents:</span> {location.residents.length}</p>
                                            <FavoriteButton
                                                active
                                                onClick={(event) => {
                                                    event.preventDefault();
                                                    event.stopPropagation();
                                                    actions.toggleFavoriteLocation(location);
                                                }}
                                                title="Remove location from favorites"
                                            />
                                        </article>
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
                                                active
                                                onClick={(event) => {
                                                    event.preventDefault();
                                                    event.stopPropagation();
                                                    actions.toggleFavoriteEpisode(episode);
                                                }}
                                                title="Remove episode from favorites"
                                            />
                                        </article>
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
