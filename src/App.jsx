import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Pocetna from './components/Pocetna'; 
import Registracija from './components/Registracija'; 

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Pocetna />} /> 
        <Route path="/registracija" element={<Registracija />} />
      </Routes>
    </Router>
  );
};

export default App;
