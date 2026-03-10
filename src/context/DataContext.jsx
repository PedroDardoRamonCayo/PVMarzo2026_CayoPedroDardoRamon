import { createContext, useState, useEffect } from 'react';

export const DataContext = createContext();

const ROOMS_SEED = [
  {
    codigo: 'HAB-001',
    tipo: 'Simple',
    servicios: 'WiFi, TV, Bano privado',
    descripcion: 'Habitacion comoda para 1 pasajero.',
    costoPorTipo: 50,
    estado: 'Disponible',
  },
  {
    codigo: 'HAB-002',
    tipo: 'Simple',
    servicios: 'WiFi, TV, Bano privado',
    descripcion: 'Habitacion simple con cama queen.',
    costoPorTipo: 50,
    estado: 'Disponible',
  },
  {
    codigo: 'HAB-003',
    tipo: 'Simple',
    servicios: 'WiFi, TV, Ventilador de techo',
    descripcion: 'Habitacion simple economica.',
    costoPorTipo: 50,
    estado: 'Disponible',
  },
  {
    codigo: 'HAB-004',
    tipo: 'Simple',
    servicios: 'WiFi, TV, Aire acondicionado',
    descripcion: 'Habitacion simple superior.',
    costoPorTipo: 50,
    estado: 'Disponible',
  },
  {
    codigo: 'HAB-005',
    tipo: 'Doble',
    servicios: 'WiFi, TV, Aire acondicionado',
    descripcion: 'Ideal para 2 pasajeros.',
    costoPorTipo: 80,
    estado: 'Disponible',
  },
  {
    codigo: 'HAB-006',
    tipo: 'Doble',
    servicios: 'WiFi, TV, Frigobar',
    descripcion: 'Doble con frigobar y balcon.',
    costoPorTipo: 80,
    estado: 'Disponible',
  },
  {
    codigo: 'HAB-007',
    tipo: 'Doble',
    servicios: 'WiFi, TV, Bano privado',
    descripcion: 'Doble clasica para parejas.',
    costoPorTipo: 80,
    estado: 'Disponible',
  },
  {
    codigo: 'HAB-008',
    tipo: 'Doble',
    servicios: 'WiFi, TV, Aire acondicionado',
    descripcion: 'Doble amplia con vista al jardin.',
    costoPorTipo: 80,
    estado: 'Disponible',
  },
  {
    codigo: 'HAB-009',
    tipo: 'Triple',
    servicios: 'WiFi, TV, Frigobar',
    descripcion: 'Espaciosa para 3 pasajeros.',
    costoPorTipo: 110,
    estado: 'Disponible',
  },
  {
    codigo: 'HAB-010',
    tipo: 'Triple',
    servicios: 'WiFi, TV, Aire acondicionado',
    descripcion: 'Triple familiar con gran espacio.',
    costoPorTipo: 110,
    estado: 'Disponible',
  },
  {
    codigo: 'HAB-011',
    tipo: 'Triple',
    servicios: 'WiFi, TV, Bano privado',
    descripcion: 'Triple estandar para grupos.',
    costoPorTipo: 110,
    estado: 'Disponible',
  },
  {
    codigo: 'HAB-012',
    tipo: 'Triple',
    servicios: 'WiFi, TV, Frigobar',
    descripcion: 'Triple confortable con frigobar.',
    costoPorTipo: 110,
    estado: 'Disponible',
  },
  {
    codigo: 'HAB-013',
    tipo: 'Premium',
    servicios: 'WiFi, TV, Jacuzzi, Vista al mar',
    descripcion: 'Experiencia premium.',
    costoPorTipo: 180,
    estado: 'Disponible',
  },
  {
    codigo: 'HAB-014',
    tipo: 'Premium',
    servicios: 'WiFi, TV, Jacuzzi, Cava de vinos',
    descripcion: 'Premium de lujo para ocasiones especiales.',
    costoPorTipo: 180,
    estado: 'Disponible',
  },
  {
    codigo: 'HAB-015',
    tipo: 'Premium',
    servicios: 'WiFi, TV, Jacuzzi, Terraza privada',
    descripcion: 'Premium con terraza y vista panoramica.',
    costoPorTipo: 180,
    estado: 'Disponible',
  },
  {
    codigo: 'HAB-016',
    tipo: 'Premium',
    servicios: 'WiFi, TV, Jacuzzi, Vista al mar',
    descripcion: 'Premium presidencial.',
    costoPorTipo: 180,
    estado: 'Disponible',
  },
];

export function DataProvider({ children }) {
  const [users, setUsers] = useState([]);
  const [rooms, setRooms] = useState(ROOMS_SEED);
  const [reservations, setReservations] = useState([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const u = localStorage.getItem('users');
    const r = localStorage.getItem('rooms');
    const res = localStorage.getItem('reservations');

    try {
      if (u) {
        const parsedUsers = JSON.parse(u);
        if (Array.isArray(parsedUsers)) setUsers(parsedUsers);
      }
    } catch {
      setUsers([]);
    }

    try {
      if (r) {
        const parsedRooms = JSON.parse(r);
        if (Array.isArray(parsedRooms) && parsedRooms.length > 0) {
          setRooms(parsedRooms);
        } else {
          setRooms(ROOMS_SEED);
        }
      } else {
        setRooms(ROOMS_SEED);
      }
    } catch {
      setRooms(ROOMS_SEED);
    }

    try {
      if (res) {
        const parsedReservations = JSON.parse(res);
        if (Array.isArray(parsedReservations)) setReservations(parsedReservations);
      }
    } catch {
      setReservations([]);
    }

    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem('users', JSON.stringify(users));
  }, [users, hydrated]);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem('rooms', JSON.stringify(rooms));
  }, [rooms, hydrated]);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem('reservations', JSON.stringify(reservations));
  }, [reservations, hydrated]);

  return (
    <DataContext.Provider value={{ users, setUsers, rooms, setRooms, reservations, setReservations }}>
      {children}
    </DataContext.Provider>
  );
}
