import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AutContext';
import { Container, Form, Button, Row, Col, Card } from 'react-bootstrap';

const habitaciones = [
  { id: 1, nombre: 'Individual', precio: 50 },
  { id: 2, nombre: 'Doble', precio: 75 },
  { id: 3, nombre: 'Suite', precio: 150 },
];

export default function Reservation() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [seleccion, setSeleccion] = useState(
    habitaciones.map(h => ({ ...h, dias: 1, cantidad: 0 }))
  );

  const handleChange = (idx, field, value) => {
    setSeleccion(prev => {
      const nuevos = [...prev];
      nuevos[idx][field] = Number(value);
      return nuevos;
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    // calcular costo o pasar a otro paso
    if (!user) {
      navigate('/register');
      return;
    }
    // aquí podríamos enviar la reserva o mostrar resumen
    navigate('/passenger');
  };

  return (
    <Container className="mt-4">
      <h2>Selecciona tu habitación</h2>
      <Form onSubmit={handleSubmit}>
        <Row className="g-3">
          {seleccion.map((h, idx) => (
            <Col md={4} key={h.id}>
              <Card>
                <Card.Body>
                  <Card.Title>{h.nombre}</Card.Title>
                  <Card.Text>Precio por día: ${h.precio}</Card.Text>
                  <Form.Group>
                    <Form.Label>Cantidad</Form.Label>
                    <Form.Control
                      type="number"
                      min="0"
                      value={h.cantidad}
                      onChange={e => handleChange(idx, 'cantidad', e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group className="mt-2">
                    <Form.Label>Días</Form.Label>
                    <Form.Control
                      type="number"
                      min="1"
                      value={h.dias}
                      onChange={e => handleChange(idx, 'dias', e.target.value)}
                    />
                  </Form.Group>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
        <Button type="submit" className="mt-4">
          Continuar
        </Button>
      </Form>
    </Container>
  );
}