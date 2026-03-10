import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AutContext';
import { DataContext } from '../context/DataContext';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import ListRoom from '../components/Rooms/ListRoom';

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
  const { rooms } = useContext(DataContext);
  const navigate = useNavigate();

  const handleReserve = () => {
    if (!user) {
      navigate('/login');
    } else {
      navigate('/reservation');
    }
  };

  const habitacionesDisponibles = rooms.filter(room => room.estado === 'Disponible');

  return (
    <Container fluid className="home-page px-3 px-lg-5">
      <h1 className="my-4 text-center">Bienvenido al Hotel</h1>
      <Row className="g-4 mb-4">
        {fotos.map((f, idx) => (
          <Col key={idx} md={4}>
            <Card className="home-gallery-card">
              <Card.Img className="home-gallery-img" variant="top" src={f.src} />
              <Card.Body>
                <Card.Text>{f.desc}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="mb-0">Habitaciones para rentar</h2>
        <Button variant="primary" onClick={handleReserve}>
          Rentar ahora
        </Button>
      </div>

      {habitacionesDisponibles.length > 0 ? (
        <ListRoom rooms={habitacionesDisponibles} />
      ) : (
        <Card className="p-3">
          <Card.Text className="mb-0">No hay habitaciones disponibles por el momento.</Card.Text>
        </Card>
      )}
    </Container>
  );
}
