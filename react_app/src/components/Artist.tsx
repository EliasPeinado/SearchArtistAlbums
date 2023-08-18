import React, { useMemo } from 'react';
import { Row, Col, Card, CardBody } from 'reactstrap';

type ArtistDetailsProps = {
    artist: ArtistType;
};

const ArtistDetails: React.FC<ArtistDetailsProps> = ({ artist }) => {
    const popularityStars = useMemo(() => {
        return Array(5).fill(0).map((_, index) => {
            const threshold = (index + 1) * 20;
            if (artist?.popularity! < threshold - 20) {
                return <span key={index} className="star">☆</span>;
            } else if (artist?.popularity! >= threshold) {
                return <span key={index} className="star">★</span>;
            } else {
                return <span key={index} className="star">★</span>;
            }
        });
    }, [artist?.popularity]);
    
    return (
        <Row className="justify-content-center mt-5">
            <Col md={10}>
                <Card className="shadow-lg mb-5 rounded">
                    <CardBody>
                        <h3 className="font-weight-bold">{artist.name}</h3>
                        <p><strong>Géneros:</strong> {artist.genres?.join(', ')}</p>
                        <div>
                            <strong>Popularidad:</strong>
                            {popularityStars}
                        </div>
                    </CardBody>
                </Card>
            </Col>
        </Row>
    );
}

export default ArtistDetails;
