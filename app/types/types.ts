export type Nullablen<T> = T | null

export type CharacterType = {
    id: number,
    name: string,
    image: string,
    status: string,
    species: string,
    type: string,
    gender: string,
    origin: {
        name: string,
        url: string,
    },
    location: {
        name: string,
        url: string,
    },
    episode: string[],
    created: string,
}

export type EpisodeType = {
    id: number,
    url: string,
    name: string,
    air_date: string,
    episode: string,
    characters: string[],
    created: string,
    previewImage?: string | null,
}

export type EpisodeCharacter = {
    id: number,
    name: string,
}

export type ResourceState<T> = {
    key: string | null,
    data: Nullablen<T>,
    loading: boolean,
    error: string | null,
}
