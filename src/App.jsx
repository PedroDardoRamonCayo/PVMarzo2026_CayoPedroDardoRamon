import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AutContext';
import { DataProvider } from './context/DataContext';

import Home from './pages/home';
import Login from './components/Aut/Login';
import Register from './components/Aut/Register';
import PassengerDashboard from './pages/passedashboard';
import AdminDashboard from './pages/admindashboard';
import NotFound from './pages/notfound';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <AuthProvider>
      <DataProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/passenger"
              element={
                <PrivateRoute allowedRoles={["Pasajero"]}>
                  <PassengerDashboard />
                </PrivateRoute>
              }
            />
            <Route
              path="/admin"
              element={
                <PrivateRoute allowedRoles={["Administrador"]}>
                  <AdminDashboard />
                </PrivateRoute>
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </DataProvider>
    </AuthProvider>
  );
}

export default App
