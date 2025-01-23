import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Pocetna from './components/Pocetna';
import Registracija from './components/Registracija';
import KorisnikMeni from './components/KorisnikMeni';
import AdminMeni from './components/AdminMeni';
import Korpa from './components/Korpa';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Pocetna />} />
        <Route path="/registracija" element={<Registracija />} />
        <Route path="/korisnik-meni" element={<KorisnikMeni />} />
        <Route path="/admin-meni" element={<AdminMeni />} />
        <Route path="/korpa" element={<Korpa />} />
      </Routes>
    </Router>
  );
};

export default App;
