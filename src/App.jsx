import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navigacija from './components/Navigacija';
import Pocetna from './components/Pocetna';
import Login from './components/Login'; 
import Registracija from './components/Registracija'; 
import KorisnikMeni from './components/KorisnikMeni';
import Korpa from './components/Korpa';
import PotvrdaNarudzbine from './components/PotvrdaNarudzbine';
import AdminMeni from './components/AdminMeni'; 

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Navigacija />
        <Routes>
          <Route path="/" element={<Pocetna />} />
          <Route path="/registracija" element={<Registracija />} /> 
          <Route path="/login" element={<Login />} /> 
          <Route path="/korisnik-meni" element={<KorisnikMeni />} />
          <Route path="/korpa" element={<Korpa />} />
          <Route path="/potvrda-narudzbine" element={<PotvrdaNarudzbine />} />
          <Route path="/admin-meni" element={<AdminMeni />} /> 
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
