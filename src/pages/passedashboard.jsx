import { useContext } from 'react';
import { AuthContext } from '../context/AutContext';
import { DataContext } from '../context/DataContext';
import { Container, Card, Row, Col, Alert, Button, Table } from 'react-bootstrap';

export default function PassengerDashboard() {
  const { user } = useContext(AuthContext);
  const { reservations, setReservations } = useContext(DataContext);

  const cancelarReserva = codigoReserva => {
    const confirmar = window.confirm('¿Deseas cancelar esta reserva?');
    if (!confirmar) return;
    setReservations(prev => prev.filter(r => r.codigo !== codigoReserva));
  };

  const myReservations = reservations.filter(
    r =>
      r.user === user?.username ||
      r.usuarioDni === user?.documento ||
      r.usuarioDni === user?.dni
  );

  return (
    <Container className="mt-4">
      <h2>Panel del pasajero</h2>

      <Card className="mb-3">
        <Card.Body>
          <strong>Usuario:</strong> {user?.username}
          <br />
          <strong>DNI:</strong> {user?.documento || user?.dni}
          <br />
          <strong>Nombre:</strong> {user?.apellido}, {user?.nombre}
        </Card.Body>
      </Card>

      {myReservations.length === 0 ? (
        <Alert variant="info">No hay reservas</Alert>
      ) : (
        <>
          <Row className="mb-3">
            <Col md={4}>
              <Card>
                <Card.Body>
                  <Card.Title>Reservas activas</Card.Title>
                  <h3>{myReservations.length}</h3>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>Codigo reserva</th>
                <th>Fecha reserva</th>
                <th>Cantidad dias</th>
                <th>Habitacion</th>
                <th>Tipo</th>
                <th>Costo por tipo</th>
                <th>Costo total</th>
                <th>Accion</th>
              </tr>
            </thead>
            <tbody>
              {myReservations.map(r => (
                <tr key={r.codigo}>
                  <td>{r.codigo}</td>
                  <td>{r.fechaReserva}</td>
                  <td>{r.cantidadDias}</td>
                  <td>{r.room?.codigo || r.habitacionCodigo}</td>
                  <td>{r.room?.tipo || '-'}</td>
                  <td>${r.room?.costoPorTipo ?? '-'}</td>
                  <td>${r.costoTotal}</td>
                  <td>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => cancelarReserva(r.codigo)}
                    >
                      Cancelar
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </>
      )}
    </Container>
  );
}
