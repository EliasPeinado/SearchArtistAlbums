import React from 'react';
import { Row, Col } from 'reactstrap';
import Album from './Album'; // Asegúrate de tener la ruta correcta al importar



type AlbumsProps = {
    albums: AlbumType[];
};

const Albums: React.FC<AlbumsProps> = ({ albums }) => {
    return <Row className="justify-content-center mt-5">
        <Col md={10}>
            <h4 className="mb-4 text-center font-weight-bold">Álbumes:</h4>
            <Row>
                {albums.map((album) => (
                    <Album key={album.id} album={album} />
                ))}
            </Row>
        </Col>
    </Row>
}


export default Albums;
