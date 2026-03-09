import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div>
      <h1>Bienvenido al Hotel</h1>
      <nav>
        <Link to="/login">Login</Link> | <Link to="/register">Registro</Link>
      </nav>
    </div>
  );
}
