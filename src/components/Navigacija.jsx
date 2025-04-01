import React from 'react';
import { Link } from 'react-router-dom';
import { useTema } from '../context/TemaContext'; 
import '../App.css';

const Navigacija = () => {
  const { tema, promeniTemu } = useTema();

  return (
    <nav className="navigacija">
      <ul>
        <li><Link to="/">Početna</Link></li>
        <li><Link to="/registracija">Registracija</Link></li>
        <li><Link to="/login">Login</Link></li>
        <li><Link to="/korisnik-meni">Meni</Link></li>
        <li><Link to="/korpa">Korpa</Link></li>
        <li>
          <button onClick={promeniTemu} className="tema-dugme">
            {tema === "svetla" ? "Tamna Tema" : "Svetla Tema"}
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Navigacija;
