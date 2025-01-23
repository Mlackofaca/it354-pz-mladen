import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

const KorisnikMeni = () => {
  const [kategorije, setKategorije] = useState([]);
  const [artikli, setArtikli] = useState([]);
  const [izabranaKategorija, setIzabranaKategorija] = useState(null);
  const [korpa, setKorpa] = useState([]);
  
  useEffect(() => {
    // Dohvati kategorije
    fetch('http://localhost:3000/kategorije')
      .then(response => response.json())
      .then(data => setKategorije(data));

    // Dohvati artikle
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

  return (
    <div className="korisnik-meni-container">
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
            <img src={`path_to_images/${artikal.naziv}.jpg`} alt={artikal.naziv} />
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

      <div className="korpa-icon">
        <Link to="/korpa">
          <img src="path_to_cart_icon.png" alt="Korpa" />
          <span>{korpa.length}</span>
        </Link>
      </div>
    </div>
  );
};

export default KorisnikMeni;
