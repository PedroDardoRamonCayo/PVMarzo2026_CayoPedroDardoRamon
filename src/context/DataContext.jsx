import { createContext, useState, useEffect } from 'react';

export const DataContext = createContext();

export function DataProvider({ children }) {
  const [users, setUsers] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    const u = localStorage.getItem('users');
    const r = localStorage.getItem('rooms');
    const res = localStorage.getItem('reservations');
    if (u) setUsers(JSON.parse(u));
    if (r) setRooms(JSON.parse(r));
    if (res) setReservations(JSON.parse(res));
  }, []);

  useEffect(() => {
    localStorage.setItem('users', JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    localStorage.setItem('rooms', JSON.stringify(rooms));
  }, [rooms]);

  useEffect(() => {
    localStorage.setItem('reservations', JSON.stringify(reservations));
  }, [reservations]);

  return (
    <DataContext.Provider value={{ users, setUsers, rooms, setRooms, reservations, setReservations }}>
      {children}
    </DataContext.Provider>
  );
}
