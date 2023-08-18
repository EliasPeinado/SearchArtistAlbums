
export type ArtistType = {
    name: string,
    genres: string[],
    popularity: number,
    id?: string
};

export type AlbumType = {
    imageUrl: string,
    name: string,
    releaseDate: string,
    totalTracks: number,
    id: string,
};

export type TrackType = {
    name: string,
    artists: string[],
    duration: string,
    id: string,
    previewUrl: string
};
