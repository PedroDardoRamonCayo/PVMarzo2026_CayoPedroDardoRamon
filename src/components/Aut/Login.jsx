import React, { useState } from 'react';
import { Form, Button, Container, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import useAut from '../../hooks/useAut';
import useValidacionFormulario from '../../hooks/useValidacionFormulario';

export default function Login() {
  const { loginUsuario } = useAut();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const campos = { username, password };
  const { esValido, tocado, marcarTocado } = useValidacionFormulario(campos, 'usuario');

  const handleSubmit = e => {
    e.preventDefault();
    if (!username || !password) {
      alert('Completa todos los campos');
      return;
    }
    if (!esValido.username || !esValido.password) {
      alert('Por favor corrige los errores del formulario');
      return;
    }

    const resultado = loginUsuario({ username, password });
    if (resultado.success) {
      navigate('/passenger');
    } else {
      alert(resultado.message);
    }
  };

  return (
    <Container className="mt-4">
      <Card className="p-4">
        <Card.Title>Login</Card.Title>
        <Form onSubmit={handleSubmit} noValidate>
          <Form.Group className="mb-3">
            <Form.Label>👤 Usuario</Form.Label>
            <Form.Control
              type="text"
              placeholder="Nombre de usuario"
              value={username}
              onChange={e => setUsername(e.target.value)}
              onBlur={() => marcarTocado('username')}
              isValid={tocado.username && esValido.username}
              isInvalid={tocado.username && !esValido.username}
              required
            />
            <Form.Control.Feedback type="invalid">
              Debe ingresar más de 3 caracteres sin números.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>🔒 Contraseña</Form.Label>
            <Form.Control
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={e => setPassword(e.target.value)}
              onBlur={() => marcarTocado('password')}
              isValid={tocado.password && esValido.password}
              isInvalid={tocado.password && !esValido.password}
              required
            />
            <Form.Control.Feedback type="invalid">
              Debe ingresar más de 3 caracteres.
            </Form.Control.Feedback>
          </Form.Group>

          <Button type="submit" variant="primary" className="w-100">
            Ingresar
          </Button>
          <Button
            variant="secondary"
            className="w-100 mt-2"
            onClick={() => navigate('/')}
          >
            Cancelar
          </Button>
        </Form>
      </Card>
    </Container>
  );
}
