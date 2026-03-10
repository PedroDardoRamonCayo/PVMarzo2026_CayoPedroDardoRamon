import { useContext } from 'react';
import { DataContext } from '../context/DataContext';
import { AuthContext } from '../context/AutContext';

export default function useAut() {
  const { users, setUsers } = useContext(DataContext);
  const { login } = useContext(AuthContext);

  function registrarUsuario(nuevo) {
    const existe = users.find(
      u =>
        u.username === nuevo.username ||
        u.email === nuevo.email ||
        u.dni === nuevo.dni
    );
    if (existe) {
      return { success: false, message: 'Usuario, correo o DNI ya registrado' };
    }

    setUsers([...users, { ...nuevo, rol: nuevo.tipo }]);
    return { success: true };
  }

  function loginUsuario({ identifier, password }) {
    const usuario = users.find(
      u =>
        (u.username === identifier || u.email === identifier) &&
        u.password === password
    );
    if (!usuario) {
      return { success: false, message: 'Usuario o contraseña incorrecta' };
    }
    if (usuario.estado === 'Inactivo') {
      return { success: false, message: 'El usuario se encuentra inactivo' };
    }
    login(usuario);
    return { success: true, user: usuario };
  }

  return { registrarUsuario, loginUsuario };
}
