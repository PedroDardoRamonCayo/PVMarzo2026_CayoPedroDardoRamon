import { Card, Badge } from 'react-bootstrap';

export default function CardRoom({ room }) {
	return (
		<Card className="h-100">
			<Card.Body>
				<Card.Title>{room.tipo}</Card.Title>
				<Card.Subtitle className="mb-2 text-muted">Codigo: {room.codigo}</Card.Subtitle>
				<Card.Text>{room.descripcion}</Card.Text>
				<Card.Text>Servicios: {room.servicios}</Card.Text>
				<Card.Text>Costo: ${room.costoPorTipo}</Card.Text>
				<Badge bg={room.estado === 'Disponible' ? 'success' : 'secondary'}>
					{room.estado}
				</Badge>
			</Card.Body>
		</Card>
	);
}
