import { Row, Col } from 'react-bootstrap';
import CardRoom from './CardRoom';

export default function ListRoom({ rooms }) {
	return (
		<Row className="g-3">
			{rooms.map(room => (
				<Col md={6} lg={4} key={room.codigo}>
					<CardRoom room={room} />
				</Col>
			))}
		</Row>
	);
}