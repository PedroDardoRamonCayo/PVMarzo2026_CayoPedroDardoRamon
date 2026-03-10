import { useState, useMemo } from 'react';

function validaCampos(campos) {
  const {
    username,
    password,
    dni,
    nombre,
    apellido,
    email,
    identifier,
    fechaNacimiento,
    nacionalidad,
  } = campos;
  const esUsernameValido =
    username && username.length > 3 && /^[^0-9]+$/.test(username);
  const esPasswordValida = password && password.length > 3;
  const esDniValido = dni && /^[0-9]{7,10}$/.test(dni.trim());
  const esNombreValido = nombre && nombre.trim().length > 0;
  const esApellidoValido = apellido && apellido.trim().length > 0;
  const esEmailValido =
    email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
  const esIdentifierValido = identifier && identifier.trim().length > 3;
  const esFechaNacimientoValida =
    fechaNacimiento && new Date(fechaNacimiento) < new Date();
  const esNacionalidadValida = nacionalidad && nacionalidad.trim().length > 0;
  return {
    username: esUsernameValido,
    password: esPasswordValida,
    dni: esDniValido,
    nombre: esNombreValido,
    apellido: esApellidoValido,
    email: esEmailValido,
    identifier: esIdentifierValido,
    fechaNacimiento: esFechaNacimientoValida,
    nacionalidad: esNacionalidadValida,
  };
}

export default function useValidacionFormulario(campos, tipo) {
  const [tocado, setTocado] = useState({});

  const esValido = useMemo(() => {
    if (tipo === 'usuario' || tipo === 'login') return validaCampos(campos);
    return {};
  }, [campos, tipo]);

  function marcarTocado(field) {
    setTocado(prev => ({ ...prev, [field]: true }));
  }

  return { esValido, tocado, marcarTocado };
}