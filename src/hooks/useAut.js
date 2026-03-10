import { useContext } from 'react';
import { DataContext } from '../context/DataContext';
import { AuthContext } from '../context/AutContext';

export default function useAut() {
  const { users, setUsers } = useContext(DataContext);
  const { login } = useContext(AuthContext);

  function registrarUsuario(nuevo) {
    const existe = users.find(u => u.username === nuevo.username);
    if (existe) {
      return { success: false, message: 'El usuario ya existe' };
    }
    // store additional basic info as well
    setUsers([...users, nuevo]);
    return { success: true };
  }

  function loginUsuario({ identifier, password }) {
    // identifier puede ser nombre de usuario o correo
    const usuario = users.find(
      u =>
        (u.username === identifier || u.email === identifier) &&
        u.password === password
    );
    if (!usuario) {
      return { success: false, message: 'Usuario o contraseña incorrecta' };
    }
    login(usuario);
    return { success: true, user: usuario };
  }

  return { registrarUsuario, loginUsuario };
}
