import { useState, useContext, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AutContext';
import { DataContext } from '../context/DataContext';
import { Container, Form, Button, Row, Col, Card, Alert } from 'react-bootstrap';

const habitaciones = [
  { id: 1, nombre: 'Individual', precio: 50 },
  { id: 2, nombre: 'Doble', precio: 75 },
  { id: 3, nombre: 'Suite', precio: 150 },
];

export default function Reservation() {
  const { user } = useContext(AuthContext);
  const { reservations, setReservations } = useContext(DataContext);
  const navigate = useNavigate();
  const [seleccion, setSeleccion] = useState(
    habitaciones.map(h => ({ ...h, cantidad: 0 }))
  );
  const [desde, setDesde] = useState('');
  const [hasta, setHasta] = useState('');

  const diasTotales = useMemo(() => {
    if (!desde || !hasta) return 0;
    const d1 = new Date(desde);
    const d2 = new Date(hasta);
    const diff = Math.ceil((d2 - d1) / (1000 * 60 * 60 * 24));
    return diff > 0 ? diff : 0;
  }, [desde, hasta]);

  // calculate existing reservation info
  const reservedSuites = useMemo(() => {
    return reservations.reduce((acc, r) => {
      const room = r.rooms.find(h => h.id === 3);
      return acc + (room ? room.cantidad : 0);
    }, 0);
  }, [reservations]);

  const reservedDates = useMemo(() => {
    return reservations.map(r => `${r.desde} → ${r.hasta}`);
  }, [reservations]);

  const handleChange = (idx, field, value) => {
    setSeleccion(prev => {
      const nuevos = [...prev];
      nuevos[idx][field] = Number(value);
      return nuevos;
    });
  };

  const totalCost = useMemo(() => {
    return seleccion.reduce(
      (acc, h) => acc + h.cantidad * diasTotales * h.precio,
      0
    );
  }, [seleccion, diasTotales]);

  const handleSubmit = e => {
    e.preventDefault();
    if (!user) {
      navigate('/login');
      return;
    }
    // build reservation object
    const nueva = {
      desde,
      hasta,
      rooms: seleccion.filter(h => h.cantidad > 0),
      user: user.username,
    };
    setReservations([...reservations, nueva]);
    alert('Gracias por su reserva');
    navigate('/');
  };

  return (
    <Container className="mt-4">
      <h2>Reservas actuales</h2>
      {reservations.length === 0 ? (
        <Alert variant="info">No hay reservas todavía.</Alert>
      ) : (
        <div className="mb-3">
          {reservedDates.map((d, i) => (
            <div key={i}>{d}</div>
          ))}
          <div className="mt-2">
            Suites reservadas en total: <strong>{reservedSuites}</strong>
          </div>
        </div>
      )}
      <hr />
      <h2>Selecciona tus fechas</h2>
      <Form onSubmit={handleSubmit}>
        <Row className="g-3 mb-3">
          <Col md={6}>
            <Form.Group>
              <Form.Label>Desde</Form.Label>
              <Form.Control
                type="date"
                value={desde}
                onChange={e => setDesde(e.target.value)}
                required
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group>
              <Form.Label>Hasta</Form.Label>
              <Form.Control
                type="date"
                value={hasta}
                onChange={e => setHasta(e.target.value)}
                required
              />
            </Form.Group>
          </Col>
        </Row>
        {diasTotales > 0 && (
          <p>
            Total de d�as: <strong>{diasTotales}</strong>
          </p>
        )}
        <Row className="g-3">
          {seleccion.map((h, idx) => (
            <Col md={4} key={h.id}>
              <Card>
                <Card.Body>
                  <Card.Title>{h.nombre}</Card.Title>
                  <Card.Text>Precio por d�a: ${h.precio}</Card.Text>
                  <Form.Group>
                    <Form.Label>Cantidad</Form.Label>
                    <Form.Control
                      type="number"
                      min="0"
                      value={h.cantidad}
                      onChange={e => handleChange(idx, 'cantidad', e.target.value)}
                    />
                  </Form.Group>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
        {diasTotales > 0 && (
          <h4 className="mt-3">Total a pagar: ${totalCost}</h4>
        )}
        <Button type="submit" className="mt-4" disabled={diasTotales === 0}>
          Finalizar reserva
        </Button>
      </Form>
    </Container>
  );
}
