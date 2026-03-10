import { useContext } from 'react';
import { AuthContext } from '../context/AutContext';
import { DataContext } from '../context/DataContext';
import { Container, Card, Row, Col, Alert } from 'react-bootstrap';

export default function PassengerDashboard() {
  const { user } = useContext(AuthContext);
  const { reservations } = useContext(DataContext);

  const myReservations = reservations.filter(
    r =>
      r.user === user?.username ||
      r.usuarioDni === user?.documento ||
      r.usuarioDni === user?.dni
  );

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
                  <Card.Title>Reserva {r.codigo}</Card.Title>
                  <ul>
                    <li>Fecha: {r.fechaReserva}</li>
                    <li>Desde: {r.fechaDesde || '-'}</li>
                    <li>Hasta: {r.fechaHasta || '-'}</li>
                    <li>Dias: {r.cantidadDias}</li>
                    <li>Habitacion: {r.room?.codigo} ({r.room?.tipo})</li>
                    <li>Total: ${r.costoTotal}</li>
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
