import Link from "next/link";
import CharacterCard from "@/components/CharacterCard/CharacterCard";
import {LocationCard} from "@/components/LocationCard/LocationCard";
import {EpisodeCard} from "@/components/EpisodeCard/EpisodeCard";
import {EpisodeType, LocationType} from "@/app/types/types";
import {RickAndMortyState} from "@/app/types/TypeRickAndMortyStore";
import {FavoritesTab} from "@/app/favorites/components/FavoritesTabs";
import s from "../page.module.scss";

type FavoritesContentProps = {
    activeTab: FavoritesTab;
    favorites: RickAndMortyState["favorites"];
    onToggleFavoriteLocation: (location: LocationType) => void;
    onToggleFavoriteEpisode: (episode: EpisodeType) => void;
}

export const FavoritesContent = ({
    activeTab,
    favorites,
    onToggleFavoriteLocation,
    onToggleFavoriteEpisode,
}: FavoritesContentProps) => {
    if (activeTab === "characters") {
        if (favorites.characters.length === 0) {
            return <p className={s.state}>No favorite characters yet.</p>;
        }

        return (
            <section className={s.grid}>
                {favorites.characters.map((character) => (
                    <Link key={character.id} href={`/characters/${character.id}`} className={s.cardLink}>
                        <CharacterCard character={character}/>
                    </Link>
                ))}
            </section>
        );
    }

    if (activeTab === "locations") {
        if (favorites.locations.length === 0) {
            return <p className={s.state}>No favorite locations yet.</p>;
        }

        return (
            <section className={s.grid}>
                {favorites.locations.map((location) => (
                    <Link key={location.id} href={`/locations/${location.id}`} className={s.cardLink}>
                        <LocationCard
                            location={location}
                            isFavorite
                            onToggleFavorite={(event) => {
                                event.preventDefault();
                                event.stopPropagation();
                                onToggleFavoriteLocation(location);
                            }}
                        />
                    </Link>
                ))}
            </section>
        );
    }

    if (favorites.episodes.length === 0) {
        return <p className={s.state}>No favorite episodes yet.</p>;
    }

    return (
        <section className={s.grid}>
            {favorites.episodes.map((episode) => (
                <Link key={episode.id} href={`/episodes/${episode.id}`} className={s.cardLink}>
                    <EpisodeCard
                        episode={episode}
                        isFavorite
                        onToggleFavorite={(event) => {
                            event.preventDefault();
                            event.stopPropagation();
                            onToggleFavoriteEpisode(episode);
                        }}
                    />
                </Link>
            ))}
        </section>
    );
};
