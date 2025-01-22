import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Pocetna from './components/Pocetna';
import Registracija from './components/Registracija';

const KorisnikMeni = () => <h2>Meni za korisnike</h2>;
const AdminMeni = () => <h2>Meni za administratore</h2>;

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Pocetna />} />
        <Route path="/registracija" element={<Registracija />} />
        <Route path="/korisnik-meni" element={<KorisnikMeni />} />
        <Route path="/admin-meni" element={<AdminMeni />} />
      </Routes>
    </Router>
  );
};

export default App;
