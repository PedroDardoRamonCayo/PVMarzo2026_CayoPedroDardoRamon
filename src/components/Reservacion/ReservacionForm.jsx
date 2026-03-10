import { Form, Button } from 'react-bootstrap';

export default function ReservacionForm({
	tipoHabitacion,
	setTipoHabitacion,
	fechaDesde,
	setFechaDesde,
	fechaHasta,
	setFechaHasta,
	cantidadDias,
	onSubmit,
	disabled,
}) {
	return (
		<Form onSubmit={onSubmit}>
			<Form.Group className="mb-3">
				<Form.Label>Tipo de habitacion</Form.Label>
				<Form.Select
					value={tipoHabitacion}
					onChange={e => setTipoHabitacion(e.target.value)}
				>
					<option value="Simple">Simple</option>
					<option value="Doble">Doble</option>
					<option value="Triple">Triple</option>
					<option value="Premium">Premium</option>
				</Form.Select>
			</Form.Group>

			<Form.Group className="mb-3">
				<Form.Label>Desde</Form.Label>
				<Form.Control
					type="date"
					value={fechaDesde}
					onChange={e => setFechaDesde(e.target.value)}
					required
				/>
			</Form.Group>

			<Form.Group className="mb-3">
				<Form.Label>Hasta</Form.Label>
				<Form.Control
					type="date"
					value={fechaHasta}
					onChange={e => setFechaHasta(e.target.value)}
					required
				/>
			</Form.Group>

			<Form.Group className="mb-3">
				<Form.Label>Cantidad de dias</Form.Label>
				<Form.Control
					type="number"
					min="1"
					value={cantidadDias}
					readOnly
				/>
			</Form.Group>

			<Button type="submit" disabled={disabled}>
				Finalizar reserva
			</Button>
		</Form>
	);
}
