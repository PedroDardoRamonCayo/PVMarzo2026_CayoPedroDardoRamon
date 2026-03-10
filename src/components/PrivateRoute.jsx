import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AutContext';
import { getUserRole, normalizeRole } from '../utils/role';

export default function PrivateRoute({ children, allowedRoles }) {
  const { user } = useContext(AuthContext);
  const userRole = getUserRole(user);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const normalizedAllowedRoles = (allowedRoles || []).map(normalizeRole);

  if (normalizedAllowedRoles.length > 0 && !normalizedAllowedRoles.includes(userRole)) {
    return <Navigate to="/" replace />;
  }

  return children;
}