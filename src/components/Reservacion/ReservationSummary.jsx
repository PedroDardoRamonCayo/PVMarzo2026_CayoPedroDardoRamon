import { Card } from 'react-bootstrap';

export default function ReservationSummary({ reservation }) {
	return (
		<Card className="mb-4 border-success">
			<Card.Body>
				<Card.Title>Reserva confirmada</Card.Title>
				<h5 className="mt-3">Datos del pasajero</h5>
				<p>
					DNI: {reservation.passenger.dni}
					<br />
					Apellido y nombre: {reservation.passenger.apellido}, {reservation.passenger.nombre}
					<br />
					Fecha de nacimiento: {reservation.passenger.fechaNacimiento}
					<br />
					Tipo: {reservation.passenger.tipo}
					<br />
					Nacionalidad: {reservation.passenger.nacionalidad}
					<br />
					Estado: {reservation.passenger.estado}
				</p>

				<h5>Datos de la habitacion</h5>
				<p>
					Codigo: {reservation.room.codigo}
					<br />
					Tipo: {reservation.room.tipo}
					<br />
					Servicios: {reservation.room.servicios}
					<br />
					Descripcion: {reservation.room.descripcion}
					<br />
					Costo por tipo: ${reservation.room.costoPorTipo}
					<br />
					Estado: {reservation.room.estado}
				</p>

				<h5>Datos de la reserva</h5>
				<p>
					Codigo: {reservation.codigo}
					<br />
					Fecha reserva: {reservation.fechaReserva}
					<br />
					Desde: {reservation.fechaDesde || '-'}
					<br />
					Hasta: {reservation.fechaHasta || '-'}
					<br />
					Cantidad de dias: {reservation.cantidadDias}
				</p>

				<h4>Costo total: ${reservation.costoTotal}</h4>
			</Card.Body>
		</Card>
	);
}
