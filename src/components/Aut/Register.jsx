import React, { useState } from 'react';
import { Form, Button, Container, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import useAut from '../../hooks/useAut';
import useValidacionFormulario from '../../hooks/useValidacionFormulario';

export default function Register() {
  const { registrarUsuario } = useAut();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [documento, setDocumento] = useState('');
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const campos = { username, password, documento, nombre, apellido, email };
  const { esValido, tocado, marcarTocado } = useValidacionFormulario(campos, 'usuario');

  const handleSubmit = e => {
    e.preventDefault();
    if (!username || !password || !documento || !nombre || !apellido || !email) {
      alert('Completa todos los campos');
      return;
    }
    if (
      !esValido.username ||
      !esValido.password ||
      !esValido.documento ||
      !esValido.nombre ||
      !esValido.apellido ||
      !esValido.email
    ) {
      alert('Por favor corrige los errores del formulario');
      return;
    }

    const nuevoUsuario = { username, password, documento, nombre, apellido, email, rol: 'Pasajero' };
    const resultado = registrarUsuario(nuevoUsuario);
    if (resultado.success) {
      alert('Usuario registrado con éxito');
      navigate('/login');
    } else {
      alert(resultado.message);
    }
  };

  return (
    <Container className="mt-4">
      <Card className="p-4">
        <Card.Title>Registro</Card.Title>
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
            <Form.Label>🪪 Documento</Form.Label>
            <Form.Control
              type="text"
              placeholder="Número de documento"
              value={documento}
              onChange={e => setDocumento(e.target.value)}
              onBlur={() => marcarTocado('documento')}
              isValid={tocado.documento && esValido.documento}
              isInvalid={tocado.documento && !esValido.documento}
              required
            />
            <Form.Control.Feedback type="invalid">
              Debe ingresar el documento.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>🧑 Nombre</Form.Label>
            <Form.Control
              type="text"
              placeholder="Nombre"
              value={nombre}
              onChange={e => setNombre(e.target.value)}
              onBlur={() => marcarTocado('nombre')}
              isValid={tocado.nombre && esValido.nombre}
              isInvalid={tocado.nombre && !esValido.nombre}
              required
            />
            <Form.Control.Feedback type="invalid">
              Debe ingresar el nombre.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>🧑‍🦱 Apellido</Form.Label>
            <Form.Control
              type="text"
              placeholder="Apellido"
              value={apellido}
              onChange={e => setApellido(e.target.value)}
              onBlur={() => marcarTocado('apellido')}
              isValid={tocado.apellido && esValido.apellido}
              isInvalid={tocado.apellido && !esValido.apellido}
              required
            />
            <Form.Control.Feedback type="invalid">
              Debe ingresar el apellido.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>📧 Correo electrónico</Form.Label>
            <Form.Control
              type="email"
              placeholder="ejemplo@dominio.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              onBlur={() => marcarTocado('email')}
              isValid={tocado.email && esValido.email}
              isInvalid={tocado.email && !esValido.email}
              required
            />
            <Form.Control.Feedback type="invalid">
              Ingresa un correo válido.
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
              {password.trim().length === 0
                ? 'La contraseña es obligatoria.'
                : 'Debe ingresar más de 3 caracteres.'}
            </Form.Control.Feedback>
          </Form.Group>

          <Button
            type="submit"
            variant="primary"
            className="w-100"
            disabled={
              !username ||
              !password ||
              !documento ||
              !nombre ||
              !apellido ||
              !email ||
              !esValido.username ||
              !esValido.password ||
              !esValido.documento ||
              !esValido.nombre ||
              !esValido.apellido ||
              !esValido.email
            }
          >
            Registrarse
          </Button>
          <div className="text-center mt-2">
            ¿Ya tienes cuenta?{' '}
            <span
              className="text-primary"
              style={{ cursor: 'pointer', textDecoration: 'underline' }}
              onClick={() => navigate('/login')}
            >
              Inicia sesión
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
