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
  const [greska, setGreska] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

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
    if (!kolicina || kolicina <= 0) {
      setGreska("Morate uneti validnu količinu!");
      return;
    }
    setGreska("");
    const updatedKorpa = [...korpa, { ...artikal, kolicina }];
    setKorpa(updatedKorpa);
    localStorage.setItem('korpa', JSON.stringify(updatedKorpa)); 
  };
  

  const handleKorpaClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleRemoveFromCart = (artikalId) => {
    setKorpa(prevKorpa => prevKorpa.filter(item => item.id !== artikalId));
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

  const calculateTotal = () => {
    return korpa.reduce((total, artikal) => total + (artikal.cena * artikal.kolicina), 0);
  };

  return (
    <div className="korisnik-meni-container">
      <div className="back-button-container">
        <Link to="/login">
          <button className="back-button">Nazad</button>
        </Link>
      </div>

      <div className="korpa-icon" onClick={handleKorpaClick}>
        <img src={korpaIkona} alt="Korpa" className="korpa-ikona" />
        <span>{korpa.length}</span>
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

      {greska && <p className="greska">{greska}</p>}

      <div className="artikli-container">
        {filteredArtikli.map(artikal => (
          <div key={artikal.id} className="artikal">
            <img src={getImage(artikal.naziv)} alt={artikal.naziv} />
            <div className="artikal-info">
              <h3>{artikal.naziv}</h3>
              <p>{artikal.cena} RSD</p>
            </div>
            <input type="number" min="1" placeholder="Količina" id={`kolicina-${artikal.id}`} />
            <button onClick={() => {
              const kolicina = parseInt(document.getElementById(`kolicina-${artikal.id}`).value, 10);
              handleAddToCart(artikal, kolicina);
            }}>
              Dodaj u korpu
            </button>
          </div>
        ))}
      </div>
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Vaša korpa</h2>
            <ul>
              {korpa.length > 0 ? (
                korpa.map((artikal, index) => (
                  <li key={index}>
                    {artikal.naziv} - {artikal.kolicina} kom
                    <button 
                      className="remove-button" 
                      onClick={() => handleRemoveFromCart(artikal.id)}>
                      Obriši
                    </button>
                  </li>
                ))
              ) : (
                <p>Korpa je prazna</p>
              )}
            </ul>
            <div className="total-sum">
              <h3>Ukupna cena: {calculateTotal()} RSD</h3>
            </div>
            <div className="modal-actions">
              <button onClick={handleCloseModal}>Nastavite sa naručivanjem</button>
              <Link to="/korpa">
                <button>Idi na korpu</button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default KorisnikMeni;
