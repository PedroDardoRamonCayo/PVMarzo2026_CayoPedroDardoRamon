import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AutContext';

/**
 * Renderiza los hijos sólo si hay un usuario autenticado.
 * Si no hay usuario, redirige a /login.
 * Si se pasan allowedRoles, también verifica que el rol del usuario
 * esté incluido; de lo contrario redirige al inicio (/).
 */
export default function PrivateRoute({ children, allowedRoles }) {
  const { user } = useContext(AuthContext);

  if (!user) {
    // sin sesión activa
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.rol)) {
    // usuario logueado pero sin rol permitido para esta ruta
    return <Navigate to="/" replace />;
  }

  return children;
}
