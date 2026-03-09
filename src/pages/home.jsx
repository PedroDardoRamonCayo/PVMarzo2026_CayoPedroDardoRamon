import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AutContext';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';

const fotos = [
  {
    src: '/portada.jpg',
    desc: 'Descubre nuestras instalaciones frente al mar, con vistas inolvidables y comodidad total.',
  },
  {
    src: '/1.jpg',
    desc: 'Relájate en nuestras salas comunes decoradas con estilo y calidez.',
  },
  {
    src: '/2.jpg',
    desc: 'Habitaciones amplias y luminosas para un descanso placentero.',
  },
];

export default function Home() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleReserve = () => {
    if (!user) {
      navigate('/login');
    } else {
      navigate('/reservation');
    }
  };

  return (
    <Container>
      <h1 className="my-4 text-center">Bienvenido al Hotel</h1>
      <Row className="g-4">
        {fotos.map((f, idx) => (
          <Col key={idx} md={4}>
            <Card>
              <Card.Img variant="top" src={f.src} />
              <Card.Body>
                <Card.Text>{f.desc}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}
