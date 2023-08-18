import axios from 'axios';
import { AlbumType, ArtistType, TrackType } from '../types';
import { inserAny as insertRegister } from '../repositories/registerRepository';


const SPOTIFY_API_URL = 'https://api.spotify.com/v1';
const SPOTIFY_TOKEN_URL = 'https://accounts.spotify.com/api/token';

let cachedToken: string | null = null;

const getToken = async () => {
    if (cachedToken)
        return cachedToken;


    try {
        const credentials = `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`;
        const encodedCredentials = Buffer.from(credentials).toString('base64');

        const response = await axios.post(SPOTIFY_TOKEN_URL, 'grant_type=client_credentials', {
            headers: {
                'Authorization': `Basic ${encodedCredentials}`,
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        });

        cachedToken = response.data.access_token;

        setTimeout(() => { cachedToken = null; }, (response.data.expires_in - 60) * 1000);

        return cachedToken;
    } catch (error) {
        console.error('Error obteniendo token de Spotify:', error);
        throw new Error('No se pudo obtener el token de Spotify.');
    }
};

export const getArtistId = async (artistName: string) => {
    insertRegister(artistName)

    const token = await getToken();
    try {
        const response = await axios.get(`${SPOTIFY_API_URL}/search?q=${artistName}&type=artist`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });
        if (response.data.artists.items.length === 0) {
            throw new Error('Artista no encontrado.');
        }

        const artist = response.data.artists.items[0];
        return {
            popularity: artist.popularity,
            genres: artist.genres,
            name: artist.name,
            id: artist.id

        } as ArtistType
    } catch (error) {
        console.error('Error al obtener ID del artista:', error);
        throw error;
    }
};

export const getAlbumsByArtistId = async (artistId: string) => {
    const token = await getToken();
    try {
        const response = await axios.get(`${SPOTIFY_API_URL}/artists/${artistId}/albums`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });


        return response.data.items.map((item: any) => {
            return ({
                id: item.id,
                imageUrl: item.images[0].url,
                name: item.name,
                releaseDate: item.release_date,
                totalTracks: item.total_tracks
            } as AlbumType)
        });
    } catch (error) {
        console.error('Error al obtener álbumes del artista:', error);
        throw error;
    }
};

export const getTracksByAlbumId = async (albumId: string) => {
    const token = await getToken();
    try {
        const response = await axios.get(`${SPOTIFY_API_URL}/albums/${albumId}/tracks`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });
        const tracks = response.data.items;

        return tracks.map((track: any) => {
            return ({
                artists: track.artists.map((artist: any) => artist.name),
                duration: `${Math.floor((track.duration_ms / 1000) / 60)}:${(Math.floor(track.duration_ms / 1000) % 60).toString().padStart(2, '0')}`,
                id: track.id,
                name: track.name,
                previewUrl: track.preview_url
            } as TrackType)
        })
    } catch (error) {
        console.error('Error al obtener canciones del álbum:', error);
        throw error;
    }
};
