export function normalizeRole(role) {
  const raw = String(role || '')
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');

  if (['administrador', 'admin', 'administrator'].includes(raw)) {
    return 'Administrador';
  }

  if (['pasajero', 'passenger', 'cliente', 'usuario'].includes(raw)) {
    return 'Pasajero';
  }

  return '';
}

export function getUserRole(user) {
  return normalizeRole(user?.tipo || user?.rol);
}