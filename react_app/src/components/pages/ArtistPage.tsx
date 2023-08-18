import React, { useState, useCallback, useMemo } from 'react';
import {
  Container,
  Row,
  Col,
  Form,
  FormGroup,
  Input,
  Button
} from 'reactstrap';
import { getAlbumsByArtist, searchArtistByName } from '../../services/Spotify';
import './ArtistPage.css';
import Artist from '../Artist';
import Albums from '../Albums';

const ArtistPage: React.FC = () => {
  const [artistName, setArtistName] = useState<string>('');
  const [artist, setArtist] = useState<ArtistType | null>(null);
  const [albums, setAlbums] = useState<AlbumType[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();

    if (!artistName.trim()) {
      setError("Por favor, introduce el nombre del artista.");
      return;
    }

    setError(null);

    try {
      const artistData = await searchArtistByName(artistName);
      setArtist(artistData);

      if (artistData?.id) {
        const artistAlbums = await getAlbumsByArtist(artistData.id);

        setAlbums(artistAlbums);
      }
    } catch (error: any) {
      console.error("Error al buscar el artista y sus álbumes:", error);
      setError(error.error as string);

    }
  }, [artistName]);

  return (
    <Container className="mt-5">

      <div className="jumbotron">
        <h1 className="display-4">Buscador de Álbumes</h1>
        <p className="lead">
          Ingresa el nombre de tu artista favorito y descubre todos sus álbumes.
        </p>
      </div>

      <Row className="justify-content-center mt-5">
        <Col md={6}>
          <Form onSubmit={handleSearch}>
            <FormGroup>
              <Input
                type="text"
                value={artistName}
                onChange={(e) => setArtistName(e.target.value)}
                placeholder="Nombre del cantante"
                className="rounded-pill"
                invalid={!!error}
              />
              {error && <div className="text-danger">{error}</div>}
            </FormGroup>
            <Button color="info" type="submit" className="btn-block rounded-pill">
              Buscar
            </Button>
          </Form>
        </Col>
      </Row>

      {artist && <Artist artist={artist} />}

      {albums.length > 0 && <Albums albums={albums} />}

    </Container>
  );
};

export default ArtistPage;


