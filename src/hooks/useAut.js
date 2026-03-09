import { useContext } from 'react';
import { DataContext } from '../context/DataContext';
import { AuthContext } from '../context/AutContext';

// hook que expone funciones de registro y login
export default function useAut() {
  const { users, setUsers } = useContext(DataContext);
  const { login } = useContext(AuthContext);

  function registrarUsuario(nuevo) {
    const existe = users.find(u => u.username === nuevo.username);
    if (existe) {
      return { success: false, message: 'El usuario ya existe' };
    }
    setUsers([...users, nuevo]);
    return { success: true };
  }

  function loginUsuario({ username, password }) {
    const usuario = users.find(
      u => u.username === username && u.password === password
    );
    if (!usuario) {
      return { success: false, message: 'Usuario o contraseña incorrecta' };
    }
    login(usuario);
    return { success: true, user: usuario };
  }

  return { registrarUsuario, loginUsuario };
}
