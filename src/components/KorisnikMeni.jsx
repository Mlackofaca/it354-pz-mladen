import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

import margarita from '../slike/margarita.jpg';
import pepperoni from '../slike/pepperoni.jpg';
import carbonara from '../slike/carbonara.jpg';
import lasagna from '../slike/lasagna.jpg';
import tiramisu from '../slike/tiramisu.jpg';
import panna from '../slike/panna.jpg';
import korpaIkona from '../slike/korpa.jpg'; 

const KorisnikMeni = () => {
  const [kategorije, setKategorije] = useState([]);
  const [artikli, setArtikli] = useState([]);
  const [izabranaKategorija, setIzabranaKategorija] = useState(null);
  const [korpa, setKorpa] = useState([]);
  
  useEffect(() => {
    fetch('http://localhost:3000/kategorije')
      .then(response => response.json())
      .then(data => setKategorije(data));

    fetch('http://localhost:3000/artikli')
      .then(response => response.json())
      .then(data => setArtikli(data));
  }, []);
  
  const handleKategorijaChange = (event) => {
    setIzabranaKategorija(event.target.value);
  };

  const handleAddToCart = (artikal, kolicina) => {
    setKorpa(prevKorpa => [...prevKorpa, { ...artikal, kolicina }]);
  };

  const filteredArtikli = artikli.filter(artikal => artikal.kategorijaId == izabranaKategorija);
  const getImage = (naziv) => {
    switch(naziv.toLowerCase()) {
      case 'margarita':
        return margarita;
      case 'pepperoni':
        return pepperoni;
      case 'carbonara':
        return carbonara;
      case 'lasagna':
        return lasagna;
      case 'tiramisu':
        return tiramisu;
      case 'panna':
        return panna;
      default:
        return null;  
    }
  };

  return (
    <div className="korisnik-meni-container">
      
      <div className="back-button-container">
        <Link to="/registracija">
          <button className="back-button">Nazad</button>
        </Link>
      </div>

      <div className="korpa-icon">
        <Link to="/korpa">
          <img src={korpaIkona} alt="Korpa" className="korpa-ikona" />
          <span>{korpa.length}</span>
        </Link>
      </div>

      <h2>Izaberite kategoriju hrane</h2>
      <select onChange={handleKategorijaChange} defaultValue="">
        <option value="">-- Izaberite kategoriju --</option>
        {kategorije.map(kategorija => (
          <option key={kategorija.id} value={kategorija.id}>
            {kategorija.naziv}
          </option>
        ))}
      </select>

      <div className="artikli-container">
        {filteredArtikli.map(artikal => (
          <div key={artikal.id} className="artikal">
            <img src={getImage(artikal.naziv)} alt={artikal.naziv} />
            <h3>{artikal.naziv}</h3>
            <p>{artikal.cena} RSD</p>
            <input type="number" min="1" placeholder="Količina" id={`kolicina-${artikal.id}`} />
            <button onClick={() => {
              const kolicina = document.getElementById(`kolicina-${artikal.id}`).value;
              handleAddToCart(artikal, kolicina);
            }}>
              Dodaj u korpu
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default KorisnikMeni;
