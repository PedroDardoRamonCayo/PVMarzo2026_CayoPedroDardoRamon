import { useState, useContext, useMemo } from 'react';
import { AuthContext } from '../context/AutContext';
import { DataContext } from '../context/DataContext';
import { Container, Card, Alert, Table } from 'react-bootstrap';
import ReservationSummary from '../components/Reservacion/ReservationSummary';
import ReservacionForm from '../components/Reservacion/ReservacionForm';

export default function Reservation() {
  const { user } = useContext(AuthContext);
  const { reservations, setReservations, rooms } = useContext(DataContext);
  const [tipoHabitacion, setTipoHabitacion] = useState('Simple');
  const [fechaDesde, setFechaDesde] = useState('');
  const [fechaHasta, setFechaHasta] = useState('');
  const [reservaConfirmada, setReservaConfirmada] = useState(null);

  const cantidadDias = useMemo(() => {
    if (!fechaDesde || !fechaHasta) return 0;
    const desde = new Date(fechaDesde);
    const hasta = new Date(fechaHasta);
    const diff = Math.ceil((hasta - desde) / (1000 * 60 * 60 * 24));
    return diff > 0 ? diff : 0;
  }, [fechaDesde, fechaHasta]);

  function getReservationRange(res) {
    if (res.fechaDesde && res.fechaHasta) {
      return { start: new Date(res.fechaDesde), end: new Date(res.fechaHasta) };
    }
    if (res.fechaReserva && res.cantidadDias) {
      const start = new Date(res.fechaReserva);
      const end = new Date(start);
      end.setDate(end.getDate() + Number(res.cantidadDias));
      return { start, end };
    }
    return null;
  }

  function rangesOverlap(startA, endA, startB, endB) {
    return startA < endB && startB < endA;
  }

  const habitacionesDisponibles = rooms.filter(room => {
    if (room.tipo !== tipoHabitacion) return false;
    if (!fechaDesde || !fechaHasta || cantidadDias <= 0) return true;

    const requestedStart = new Date(fechaDesde);
    const requestedEnd = new Date(fechaHasta);

    const conflict = reservations.some(res => {
      const sameRoom = res.habitacionCodigo === room.codigo || res.room?.codigo === room.codigo;
      if (!sameRoom) return false;
      const range = getReservationRange(res);
      if (!range) return false;
      return rangesOverlap(requestedStart, requestedEnd, range.start, range.end);
    });

    return !conflict;
  });
  const habitacionSeleccionada = habitacionesDisponibles[0] || null;
  const costoEstimado = habitacionSeleccionada
    ? Number(habitacionSeleccionada.costoPorTipo) * Number(cantidadDias || 0)
    : 0;

  const handleSubmit = e => {
    e.preventDefault();
    if (!habitacionSeleccionada) {
      alert('No hay habitaciones disponibles para el tipo seleccionado');
      return;
    }

    if (!fechaDesde || !fechaHasta || cantidadDias <= 0) {
      alert('Selecciona un rango de fechas valido');
      return;
    }

    const dias = Number(cantidadDias);
    const fechaReserva = new Date().toISOString().slice(0, 10);
    const codigoReserva = `RES-${Date.now()}`;
    const costoTotal = dias * Number(habitacionSeleccionada.costoPorTipo);

    const nuevaReserva = {
      codigo: codigoReserva,
      fechaReserva,
      fechaDesde,
      fechaHasta,
      cantidadDias: dias,
      usuarioDni: user.documento || user.dni,
      habitacionCodigo: habitacionSeleccionada.codigo,
      costoTotal,
      user: user.username,
      passenger: {
        dni: user.documento || user.dni,
        apellido: user.apellido,
        nombre: user.nombre,
        fechaNacimiento: user.fechaNacimiento,
        tipo: user.tipo,
        nacionalidad: user.nacionalidad,
        estado: user.estado,
      },
      room: habitacionSeleccionada,
    };

    setReservations([...reservations, nuevaReserva]);
    setReservaConfirmada(nuevaReserva);
  };

  return (
    <Container className="mt-4">
      <h2>Reserva de habitaciones</h2>
      {reservaConfirmada && <ReservationSummary reservation={reservaConfirmada} />}

      {!reservaConfirmada && (
        <>
          <ReservacionForm
            tipoHabitacion={tipoHabitacion}
            setTipoHabitacion={setTipoHabitacion}
            fechaDesde={fechaDesde}
            setFechaDesde={setFechaDesde}
            fechaHasta={fechaHasta}
            setFechaHasta={setFechaHasta}
            cantidadDias={cantidadDias}
            onSubmit={handleSubmit}
            disabled={!habitacionSeleccionada || cantidadDias <= 0}
          />

          <h4 className="mt-4">Habitaciones disponibles ({tipoHabitacion})</h4>
          {habitacionesDisponibles.length > 0 ? (
            <Table striped bordered hover responsive className="mb-3">
              <thead>
                <tr>
                  <th>Codigo</th>
                  <th>Tipo</th>
                  <th>Servicios</th>
                  <th>Descripcion</th>
                  <th>Costo por tipo</th>
                </tr>
              </thead>
              <tbody>
                {habitacionesDisponibles.map(room => (
                  <tr key={room.codigo}>
                    <td>{room.codigo}</td>
                    <td>{room.tipo}</td>
                    <td>{room.servicios}</td>
                    <td>{room.descripcion}</td>
                    <td>${room.costoPorTipo}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : null}

          {!habitacionSeleccionada && (
            <Alert variant="warning">
              No hay habitaciones disponibles de tipo {tipoHabitacion}.
            </Alert>
          )}

          {habitacionSeleccionada && (
            <Card className="mb-3">
              <Card.Body>
                <Card.Title>Habitacion seleccionada</Card.Title>
                <Card.Text>
                  Codigo: {habitacionSeleccionada.codigo}
                  <br />
                  Tipo: {habitacionSeleccionada.tipo}
                  <br />
                  Servicios: {habitacionSeleccionada.servicios}
                  <br />
                  Descripcion: {habitacionSeleccionada.descripcion}
                  <br />
                  Costo por dia: ${habitacionSeleccionada.costoPorTipo}
                </Card.Text>
              </Card.Body>
            </Card>
          )}

          {habitacionSeleccionada && cantidadDias > 0 && (
            <Alert variant="success">
              Costo final estimado antes de reservar: <strong>${costoEstimado}</strong>
            </Alert>
          )}

        </>
      )}

      {reservations.length > 0 && (
        <>
          <Alert variant="info" className="mt-4">
            Reservas registradas: {reservations.length}
          </Alert>
          <h4>Reservas realizadas</h4>
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>Codigo Reserva</th>
                <th>Fecha Reserva</th>
                <th>Desde</th>
                <th>Hasta</th>
                <th>Dias</th>
                <th>Habitacion</th>
                <th>Tipo</th>
                <th>Costo por tipo</th>
                <th>Costo total</th>
              </tr>
            </thead>
            <tbody>
              {reservations.map(res => (
                <tr key={res.codigo}>
                  <td>{res.codigo}</td>
                  <td>{res.fechaReserva}</td>
                  <td>{res.fechaDesde || '-'}</td>
                  <td>{res.fechaHasta || '-'}</td>
                  <td>{res.cantidadDias}</td>
                  <td>{res.room?.codigo}</td>
                  <td>{res.room?.tipo}</td>
                  <td>${res.room?.costoPorTipo}</td>
                  <td>${res.costoTotal}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </>
      )}
    </Container>
  );
}
