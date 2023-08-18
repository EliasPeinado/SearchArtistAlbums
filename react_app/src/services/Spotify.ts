import axios from 'axios';

export const searchArtistByName = async (artistName: string) => {
  try {
    const response = await axios.post('http://localhost:3001/spotify/get-artist-id', {
      artistName: artistName
    });

    if (response.status === 200 && response.data) {
      return response.data;
    } else {
      throw new Error('No se recibieron datos válidos del servidor.');
    }
  } catch (error: any) {
    console.error('Error al buscar el artista:', error);
    throw error.response.data;
  }
};



export const getAlbumsByArtist = async (artistId: string) => {
  try {
    const response = await axios.post('http://localhost:3001/spotify/get-albums-by-artist', {
      artistId: artistId
    });

    if (response.status === 200 && response.data) {
      return response.data;
    } else {
      throw new Error('No se recibieron datos válidos del servidor.');
    }
  } catch (error: any) {
    console.error('Error al obtener los álbumes del artista:', error);
    throw error.response.data;

  }
};


export const getTracksByAlbum = async (albumId: string) => {
  try {
    const response = await axios.post('http://localhost:3001/spotify/get-tracks-by-album', {
      albumId: albumId
    });

    if (response.status === 200 && response.data) {
      return response.data;
    } else {
      throw new Error('No se recibieron datos válidos del servidor.');
    }
  } catch (error: any) {
    console.error('Error al obtener las canciones del álbum:', error);
    throw error.response.data;

  }
};


export const getTracksByAlbums = async (albumId: string) => {
  try {
    const response = await axios.post('http://localhost:3001/spotify/get-tracks-by-album', {
      albumId: albumId
    });

    if (response.status === 200 && response.data) {
      return response.data;
    } else {
      throw new Error('No se recibieron datos válidos del servidor.');
    }
  } catch (error: any) {
    console.error('Error al obtener las canciones del album:', error);
    throw error.response.data;

  }
};