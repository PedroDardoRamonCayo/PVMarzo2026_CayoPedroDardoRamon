import React, { useState } from 'react';
import { Form, Button, Container, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import useAut from '../../hooks/useAut';
import useValidacionFormulario from '../../hooks/useValidacionFormulario';

export default function Login() {
  const { loginUsuario } = useAut();
  const [identifier, setIdentifier] = useState(''); // username or email
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const campos = { identifier, password };
  const { esValido, tocado, marcarTocado } = useValidacionFormulario(campos, 'login');

  const handleSubmit = e => {
    e.preventDefault();
    if (!identifier || !password) {
      alert('Completa usuario/correo y contraseña');
      return;
    }
    if (!esValido.identifier || !esValido.password) {
      alert('Por favor corrige los errores del formulario');
      return;
    }

    const resultado = loginUsuario({ identifier, password });
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
            <Form.Label>👤 Usuario o correo</Form.Label>
            <Form.Control
              type="text"
              placeholder="Nombre de usuario o correo"
              value={identifier}
              onChange={e => setIdentifier(e.target.value)}
              onBlur={() => marcarTocado('identifier')}
              isValid={tocado.identifier && esValido.identifier}
              isInvalid={tocado.identifier && !esValido.identifier}
              required
            />
            <Form.Control.Feedback type="invalid">
              Debe ingresar usuario o correo válido.
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

          <Button
            type="submit"
            variant="primary"
            className="w-100"
            disabled={
              !identifier ||
              !password ||
              !esValido.identifier ||
              !esValido.password
            }
          >
            Ingresar
          </Button>
          <div className="text-center mt-2">
            ¿No tienes cuenta?{' '}
            <span
              className="text-primary"
              style={{ cursor: 'pointer', textDecoration: 'underline' }}
              onClick={() => navigate('/register')}
            >
              Regístrate
            </span>
          </div>
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
