import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';   // ⬅️ aquí está el cambio
import Home from './pages/Home';
import CompanyDashboard from './pages/CompanyDashboard';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('zeroxp_user');
    if (storedUser) setUser(JSON.parse(storedUser));
    setLoading(false);
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem('zeroxp_user', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('zeroxp_user');
  };

  if (loading)
    return <div className="min-h-screen flex items-center justify-center">Cargando...</div>;

  return (
    <AuthProvider value={{ user, login: handleLogin, logout: handleLogout }}>
      <BrowserRouter>

        {/* ⬅️ Nuevo navbar */}
        <Navbar user={user} onLogout={handleLogout} />

        <Routes>
          <Route path="/" element={<Home user={user} />} />
          <Route path="/empresa" element={<CompanyDashboard user={user} />} />
        </Routes>

        <Toaster position="top-right" />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
