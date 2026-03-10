import React, { useState } from 'react';
import { Form, Button, Container, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import useAut from '../../hooks/useAut';
import useValidacionFormulario from '../../hooks/useValidacionFormulario';

export default function Register() {
  const { registrarUsuario } = useAut();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [dni, setDni] = useState('');
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [email, setEmail] = useState('');
  const [fechaNacimiento, setFechaNacimiento] = useState('');
  const [tipo, setTipo] = useState('Pasajero');
  const [nacionalidad, setNacionalidad] = useState('Argentina');
  const [estado, setEstado] = useState('Activo');
  const navigate = useNavigate();

  const campos = { username, password, dni, nombre, apellido, email, fechaNacimiento, nacionalidad };
  const { esValido, tocado, marcarTocado } = useValidacionFormulario(campos, 'usuario');

  const handleSubmit = e => {
    e.preventDefault();
    if (!username || !password || !dni || !nombre || !apellido || !email || !fechaNacimiento || !tipo || !nacionalidad || !estado) {
      alert('Completa todos los campos');
      return;
    }
    if (
      !esValido.username ||
      !esValido.password ||
      !esValido.dni ||
      !esValido.nombre ||
      !esValido.apellido ||
      !esValido.email ||
      !esValido.fechaNacimiento ||
      !esValido.nacionalidad
    ) {
      alert('Por favor corrige los errores del formulario');
      return;
    }

    const nuevoUsuario = {
      username,
      password,
      dni,
      nombre,
      apellido,
      fechaNacimiento,
      tipo,
      nacionalidad,
      estado,
      email,
    };
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
            <Form.Label>🪪 DNI</Form.Label>
            <Form.Control
              type="text"
              placeholder="Numero de DNI"
              value={dni}
              onChange={e => setDni(e.target.value)}
              onBlur={() => marcarTocado('dni')}
              isValid={tocado.dni && esValido.dni}
              isInvalid={tocado.dni && !esValido.dni}
              required
            />
            <Form.Control.Feedback type="invalid">
              Debe ingresar un DNI valido.
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
            <Form.Label>🎂 Fecha de nacimiento</Form.Label>
            <Form.Control
              type="date"
              value={fechaNacimiento}
              onChange={e => setFechaNacimiento(e.target.value)}
              onBlur={() => marcarTocado('fechaNacimiento')}
              isValid={tocado.fechaNacimiento && esValido.fechaNacimiento}
              isInvalid={tocado.fechaNacimiento && !esValido.fechaNacimiento}
              required
            />
            <Form.Control.Feedback type="invalid">
              Debe ingresar una fecha valida.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>🧾 Tipo de usuario</Form.Label>
            <Form.Select value={tipo} onChange={e => setTipo(e.target.value)}>
              <option value="Pasajero">Pasajero</option>
              <option value="Administrador">Administrador</option>
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>🌎 Nacionalidad</Form.Label>
            <Form.Select
              value={nacionalidad}
              onChange={e => setNacionalidad(e.target.value)}
              onBlur={() => marcarTocado('nacionalidad')}
              isValid={tocado.nacionalidad && esValido.nacionalidad}
              isInvalid={tocado.nacionalidad && !esValido.nacionalidad}
            >
              <option value="Argentina">Argentina</option>
              <option value="Uruguaya">Uruguaya</option>
              <option value="Brasilenia">Brasilenia</option>
              <option value="Chilena">Chilena</option>
              <option value="Otra">Otra</option>
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>✅ Estado</Form.Label>
            <Form.Select value={estado} onChange={e => setEstado(e.target.value)}>
              <option value="Activo">Activo</option>
              <option value="Inactivo">Inactivo</option>
            </Form.Select>
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
              !dni ||
              !nombre ||
              !apellido ||
              !email ||
              !fechaNacimiento ||
              !esValido.username ||
              !esValido.password ||
              !esValido.dni ||
              !esValido.nombre ||
              !esValido.apellido ||
              !esValido.email ||
              !esValido.fechaNacimiento ||
              !esValido.nacionalidad
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
