import { useState, useMemo } from 'react';

function validaCampos(campos) {
  const { username, password, documento, nombre, apellido, email, identifier } = campos;
  const esUsernameValido =
    username && username.length > 3 && /^[^0-9]+$/.test(username);
  const esPasswordValida = password && password.length > 3;
  const esDocumentoValido =
    documento && /^[0-9]{8}$/.test(documento.trim());
  const esNombreValido = nombre && nombre.trim().length > 0;
  const esApellidoValido = apellido && apellido.trim().length > 0;
  const esEmailValido =
    email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
  const esIdentifierValido = identifier && identifier.trim().length > 3;
  return {
    username: esUsernameValido,
    password: esPasswordValida,
    documento: esDocumentoValido,
    nombre: esNombreValido,
    apellido: esApellidoValido,
    email: esEmailValido,
    identifier: esIdentifierValido,
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