import React from 'react';
import { Link } from 'react-router-dom';
import "../App.css";

const Navigacija = () => {
  return (
    <nav className="navigacija">
      <ul>
        <li>
          <Link to="/">Početna</Link>
        </li>
        <li>
          <Link to="/registracija">Registracija</Link>  
        </li>
        <li>
          <Link to="/login">Login</Link>  
        </li>
        <li>
          <Link to="/korisnik-meni">Meni</Link>
        </li>
        <li>
          <Link to="/korpa">Korpa</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navigacija;
