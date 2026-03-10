import { useContext, useState } from 'react';
import { DataContext } from '../context/DataContext';
import { Container, Table, Button, Form, Card, Row, Col } from 'react-bootstrap';

export default function AdminDashboard() {
  const { rooms, setRooms, reservations } = useContext(DataContext);
  const [form, setForm] = useState({
    codigo: '',
    tipo: 'Simple',
    servicios: '',
    descripcion: '',
    costoPorTipo: '',
    estado: 'Disponible',
  });

  const toggleEstado = codigo => {
    setRooms(
      rooms.map(room =>
        room.codigo === codigo
          ? {
              ...room,
              estado: room.estado === 'Disponible' ? 'No Disponible' : 'Disponible',
            }
          : room
      )
    );
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (!form.codigo || !form.servicios || !form.descripcion || !form.costoPorTipo) {
      alert('Completa todos los campos de la habitacion');
      return;
    }
    if (rooms.some(r => r.codigo === form.codigo)) {
      alert('El codigo de habitacion ya existe');
      return;
    }
    setRooms([
      ...rooms,
      {
        ...form,
        costoPorTipo: Number(form.costoPorTipo),
      },
    ]);
    setForm({
      codigo: '',
      tipo: 'Simple',
      servicios: '',
      descripcion: '',
      costoPorTipo: '',
      estado: 'Disponible',
    });
  };

  const disponibles = rooms.filter(r => r.estado === 'Disponible').length;
  const noDisponibles = rooms.filter(r => r.estado !== 'Disponible').length;

  return (
    <Container className="mt-4">
      <h2>Panel de administrador</h2>

      <Row className="g-3 mb-3">
        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title>Habitaciones</Card.Title>
              <div>Total: {rooms.length}</div>
              <div>Disponibles: {disponibles}</div>
              <div>No disponibles: {noDisponibles}</div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title>Reservas</Card.Title>
              <div>Total registradas: {reservations.length}</div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <h4>Habitaciones</h4>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Codigo</th>
            <th>Tipo</th>
            <th>Servicios</th>
            <th>Descripcion</th>
            <th>Costo</th>
            <th>Estado</th>
            <th>Accion</th>
          </tr>
        </thead>
        <tbody>
          {rooms.map(room => (
            <tr key={room.codigo}>
              <td>{room.codigo}</td>
              <td>{room.tipo}</td>
              <td>{room.servicios}</td>
              <td>{room.descripcion}</td>
              <td>${room.costoPorTipo}</td>
              <td>{room.estado}</td>
              <td>
                <Button size="sm" onClick={() => toggleEstado(room.codigo)}>
                  Cambiar estado
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <h4 className="mt-4">Reservas realizadas</h4>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Codigo reserva</th>
            <th>Fecha reserva</th>
            <th>Cantidad dias</th>
            <th>Usuario (DNI)</th>
            <th>Habitacion</th>
            <th>Tipo</th>
            <th>Costo por tipo</th>
            <th>Costo total</th>
          </tr>
        </thead>
        <tbody>
          {reservations.length === 0 ? (
            <tr>
              <td colSpan={8}>No hay reservas registradas.</td>
            </tr>
          ) : (
            reservations.map(res => (
              <tr key={res.codigo}>
                <td>{res.codigo}</td>
                <td>{res.fechaReserva}</td>
                <td>{res.cantidadDias}</td>
                <td>{res.usuarioDni}</td>
                <td>{res.room?.codigo || res.habitacionCodigo}</td>
                <td>{res.room?.tipo || '-'}</td>
                <td>${res.room?.costoPorTipo ?? '-'}</td>
                <td>${res.costoTotal}</td>
              </tr>
            ))
          )}
        </tbody>
      </Table>

      <Card className="p-3">
        <h4>Alta de habitacion</h4>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-2">
            <Form.Label>Codigo</Form.Label>
            <Form.Control
              value={form.codigo}
              onChange={e => setForm({ ...form, codigo: e.target.value })}
            />
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Label>Tipo</Form.Label>
            <Form.Select
              value={form.tipo}
              onChange={e => setForm({ ...form, tipo: e.target.value })}
            >
              <option value="Simple">Simple</option>
              <option value="Doble">Doble</option>
              <option value="Triple">Triple</option>
              <option value="Premium">Premium</option>
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Label>Servicios</Form.Label>
            <Form.Control
              value={form.servicios}
              onChange={e => setForm({ ...form, servicios: e.target.value })}
            />
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Label>Descripcion</Form.Label>
            <Form.Control
              value={form.descripcion}
              onChange={e => setForm({ ...form, descripcion: e.target.value })}
            />
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Label>Costo por tipo</Form.Label>
            <Form.Control
              type="number"
              min="1"
              value={form.costoPorTipo}
              onChange={e => setForm({ ...form, costoPorTipo: e.target.value })}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Estado</Form.Label>
            <Form.Select
              value={form.estado}
              onChange={e => setForm({ ...form, estado: e.target.value })}
            >
              <option value="Disponible">Disponible</option>
              <option value="No Disponible">No Disponible</option>
            </Form.Select>
          </Form.Group>
          <Button type="submit">Agregar habitacion</Button>
        </Form>
      </Card>
    </Container>
  );
}
