import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AutContext';

/**
 * Privately render children only if there is a logged in user.
 * If no user, redirect to /login.
 * If allowedRoles array is provided, also check that user.rol is included;
 * otherwise redirect to home (/).
 */
export default function PrivateRoute({ children, allowedRoles }) {
  const { user } = useContext(AuthContext);

  if (!user) {
    // no session
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.rol)) {
    // logged in but not permitted for this route
    return <Navigate to="/" replace />;
  }

  return children;
}
