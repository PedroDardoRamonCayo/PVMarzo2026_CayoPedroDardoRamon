import { useContext, useState } from 'react';
import { DataContext } from '../context/DataContext';
import { Container, Table, Button, Form, Card } from 'react-bootstrap';

export default function AdminDashboard() {
  const { rooms, setRooms } = useContext(DataContext);
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

  return (
    <Container className="mt-4">
      <h2>Panel de administrador</h2>
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
