import React, { useCallback, useMemo, useState } from 'react';
import {
    Col, Card, CardBody, CardFooter, Button, Row, ListGroup, ListGroupItem, Badge, Collapse
} from 'reactstrap';
import { getTracksByAlbum } from '../services/Spotify';

type AlbumProps = {
    album: AlbumType;
};

const Album: React.FC<AlbumProps> = ({ album }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [tracks, setTracks] = useState<TrackType[]>([]);
    const [error, setError] = useState<string | null>(null);

    useMemo(async () => {
        try {
            const fetchedTracks = await getTracksByAlbum(album.id);
            setTracks(fetchedTracks);
            setError(null);
        } catch (err: any) {
            setError(err.error as string);
        }
    }, [album.id]);

    const tracksList = useMemo(() => {
        return (<ListGroup className="mt-3">
            {tracks.map((track) => (
                <ListGroupItem key={track.id} className="d-flex flex-column justify-content-center align-items-center">
                    <div className="text-center mb-2" style={{ width: '100%' }}>
                        <strong>{track.name}</strong>
                        <br />
                        <small className="text-muted">{track.artists.join(', ')}</small>
                    </div>
                    <Badge color="secondary" style={{ margin: '0.5rem' }}>{track.duration}</Badge>
                    <div className="d-flex align-items-center justify-content-center" style={{ width: '100%' }}>
                        <div className="track-player">
                            <audio id={track.id} src={track.previewUrl} controls>
                                Tu navegador no soporta el elemento de audio.
                            </audio>
                        </div>
                    </div>
                </ListGroupItem>
            ))}
        </ListGroup>)
    }, [tracks])

    return (
        <Col md={6} className="mb-4">
            <Card className="shadow-lg rounded overflow-hidden">
                <img src={album.imageUrl} alt={album.name} className="card-img-top" />
                <CardBody className="text-center">
                    <h5 className="card-title">{album.name}</h5>
                    <p className="card-text">
                        <strong>Fecha de Lanzamiento:</strong> {album.releaseDate}
                    </p>
                    <p className="card-text">
                        <strong>Canciones:</strong> {album.totalTracks}
                    </p>
                </CardBody>
                <CardFooter>
                    <Row noGutters={true}>
                        <Col md={12}>
                            <Button color="success" onClick={() => setIsOpen(!isOpen)} className="rounded-pill">
                                {isOpen ? 'Ocultar' : 'Listar'} canciones <i className="fa fa-music ml-2"></i>
                            </Button>
                        </Col>
                    </Row>
                </CardFooter>
                {error && <div className="text-danger">{error}</div>}

                <Collapse isOpen={isOpen}>
                    <div className="track-list-content">
                        {tracksList}
                    </div>
                </Collapse>
            </Card>
        </Col>
    );
};

export default Album;
