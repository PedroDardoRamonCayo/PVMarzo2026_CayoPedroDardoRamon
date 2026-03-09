import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div>
      <h1>Bienvenido al Hotel</h1>
      <nav>
        <Link to="/register">Registro</Link> | <Link to="/login">Login</Link>
      </nav>
    </div>
  );
}
