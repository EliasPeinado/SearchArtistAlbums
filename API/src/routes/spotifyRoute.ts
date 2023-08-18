import express from 'express';
import { getAlbumsByArtistId, getArtistId, getTracksByAlbumId } from '../services/spotifyService';

const router = express.Router();
module.exports = (app: any) => {
    app.use('/spotify', router);
};
router.post('/get-artist-id', async (req, res) => {
    const { artistName } = req.body;

    if (!artistName) {
        return res.status(400).json({ error: 'El campo artistName es obligatorio.' });
    }

    try {
        const artistId = await getArtistId(artistName);
        res.status(200).send(artistId);
    } catch (error: any) {
        res.status(500).json({ error: 'Error al obtener el ID del artista. Detalles: ' + error.message });
    }
});

router.post('/get-albums-by-artist', async (req, res) => {
    const { artistId } = req.body;

    if (!artistId) {
        return res.status(400).json({ error: 'El campo artistId es obligatorio.' });
    }

    try {
        const albums = await getAlbumsByArtistId(artistId);
        res.status(200).json(albums);
    } catch (error: any) {
        res.status(500).json({ error: 'Error al obtener los álbumes del artista. Detalles: ' + error.message });
    }
});

router.post('/get-tracks-by-album', async (req, res) => {
    const { albumId } = req.body;

    if (!albumId) {
        return res.status(400).json({ error: 'El campo albumId es obligatorio.' });
    }

    try {
        const tracks = await getTracksByAlbumId(albumId);
        res.status(200).json(tracks);
    } catch (error: any) {
        res.status(500).json({ error: 'Error al obtener las pistas del álbum. Detalles: ' + error.message });
    }
});

export default router;
