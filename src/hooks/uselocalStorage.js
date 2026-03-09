import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

// hook genérico para sincronizar un valor con localStorage
export default function useLocalStorage(key, initial) {
  const [value, setValue] = useState(() => {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : initial;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}
