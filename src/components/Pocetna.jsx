import React from 'react';
import { Link } from 'react-router-dom'; 
import '../App.css';

const Pocetna = () => {
  return (
    <div className="pocetna-container">
      <h1 className="naslov">Dobrodošli u našu prodavnicu hrane!</h1>

      <div className="registracija-forma">
        <h2>Registracija</h2>
        <Link to="/registracija">
          <button>Registruj se</button>
        </Link>
      </div>
    </div>
  );
};

export default Pocetna;
