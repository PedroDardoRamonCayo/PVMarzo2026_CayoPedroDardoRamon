import { useState, useMemo } from 'react';

// reglas simples de validación para el formulario de usuario
function validaCampos(campos) {
  const { username, password } = campos;
  const esUsernameValido =
    username && username.length > 3 && /^[^0-9]+$/.test(username);
  const esPasswordValida = password && password.length > 3;
  return {
    username: esUsernameValido,
    password: esPasswordValida,
  };
}

export default function useValidacionFormulario(campos, tipo) {
  const [tocado, setTocado] = useState({});

  const esValido = useMemo(() => {
    if (tipo === 'usuario') return validaCampos(campos);
    return {};
  }, [campos, tipo]);

  function marcarTocado(field) {
    setTocado(prev => ({ ...prev, [field]: true }));
  }

  return { esValido, tocado, marcarTocado };
}