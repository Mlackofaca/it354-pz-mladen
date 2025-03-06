import React from 'react';
import { Link } from 'react-router-dom'; 
import '../App.css';

const Pocetna = () => {
  return (
    <div className="pocetna-container">
      <h1 className="naslov">Dobrodošli u našu prodavnicu hrane!</h1>

      <div className="login-forma">
        <h2>Login</h2>  
        <Link to="/login">
          <button>Prijavi se</button>  
        </Link>
      </div>
    </div>
  );
};

export default Pocetna;
