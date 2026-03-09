import { useContext } from 'react';
import { AuthContext } from '../context/AutContext';
import { DataContext } from '../context/DataContext';
import { Container, Card, Row, Col, Alert } from 'react-bootstrap';

export default function PassengerDashboard() {
  const { user } = useContext(AuthContext);
  const { reservations } = useContext(DataContext);

  const myReservations = reservations.filter(r => r.user === user?.username);

  return (
    <Container className="mt-4">
      <h2>Mi usuario: {user?.username}</h2>
      {myReservations.length === 0 ? (
        <Alert variant="info">No hay reservas</Alert>
      ) : (
        <Row className="g-3">
          {myReservations.map((r, i) => (
            <Col md={6} key={i}>
              <Card>
                <Card.Body>
                  <Card.Title>{r.desde} → {r.hasta}</Card.Title>
                  <ul>
                    {r.rooms.map(room => (
                      <li key={room.id}>{room.nombre} x {room.cantidad}</li>
                    ))}
                  </ul>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
}
