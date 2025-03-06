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

const AdminMeni = () => {
  const [kategorije, setKategorije] = useState([]);
  const [artikli, setArtikli] = useState([]);
  const [izabranaKategorija, setIzabranaKategorija] = useState(null);
  const [noviArtikal, setNoviArtikal] = useState({ naziv: '', cena: '', kategorijaId: '', slika: '' });
  const [poruka, setPoruka] = useState('');

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

  const handleAddProduct = () => {
    fetch('http://localhost:3000/artikli', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(noviArtikal),
    }).then(() => {
      setArtikli(prevArtikli => [...prevArtikli, noviArtikal]);
      setNoviArtikal({ naziv: '', cena: '', kategorijaId: '', slika: '' });
      setPoruka('Artikal uspešno dodat!');
    });
  };

  const handleDeleteProduct = (id) => {
    fetch(`http://localhost:3000/artikli/${id}`, { method: 'DELETE' })
      .then(() => {
        fetch('http://localhost:3000/artikli')
          .then(response => response.json())
          .then(data => {
            setArtikli(data); 
          });
        setPoruka('Artikal uspešno obrisan!');
      });
  };

  const handleEditProduct = (id, updatedArtikal) => {
    fetch(`http://localhost:3000/artikli/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedArtikal),
    }).then(() => {
      fetch('http://localhost:3000/artikli') 
        .then(response => response.json())
        .then(data => setArtikli(data)); 
      setPoruka('Artikal uspešno izmenjen!');
    });
  };

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

  const filteredArtikli = artikli.filter(artikal => artikal.kategorijaId == izabranaKategorija);

  const closeMessage = () => {
    setPoruka('');
  };

  return (
    <div className="korisnik-meni-container">
      <div className="back-button-container">
        <Link to="/login">
          <button className="back-button">Nazad</button>
        </Link>
      </div>
      <div className="korpa-ikona-container">
        <Link to="/korpa">
          <img src={korpaIkona} alt="Korpa" className="korpa-ikona" />
        </Link>
        <p className="korpa-poruka">Vaša korpa</p>
      </div>

      <h2>Administratorski Meni</h2>
      <select onChange={handleKategorijaChange} defaultValue="">
        <option value="">-- Izaberite kategoriju --</option>
        {kategorije.map(kategorija => (
          <option key={kategorija.id} value={kategorija.id}>{kategorija.naziv}</option>
        ))}
      </select>

      <div className="artikli-container">
        {filteredArtikli.map(artikal => (
          <div key={artikal.id} className="artikal">
            <img src={getImage(artikal.naziv)} alt={artikal.naziv} />
            <h3>{artikal.naziv}</h3>
            <p>{artikal.cena} RSD</p>
            <button onClick={() => handleDeleteProduct(artikal.id)}>Obriši</button>
            <button onClick={() => handleEditProduct(artikal.id, { ...artikal, cena: prompt('Nova cena:', artikal.cena) })}>Izmeni</button>
          </div>
        ))}
      </div>

      <h3>Dodaj novi artikal</h3>
      <input type="text" placeholder="Naziv" value={noviArtikal.naziv} onChange={(e) => setNoviArtikal({ ...noviArtikal, naziv: e.target.value })} />
      <input type="number" placeholder="Cena" value={noviArtikal.cena} onChange={(e) => setNoviArtikal({ ...noviArtikal, cena: e.target.value })} />
      <select value={noviArtikal.kategorijaId} onChange={(e) => setNoviArtikal({ ...noviArtikal, kategorijaId: e.target.value })}>
        <option value="">-- Izaberite kategoriju --</option>
        {kategorije.map(kategorija => (
          <option key={kategorija.id} value={kategorija.id}>{kategorija.naziv}</option>
        ))}
      </select>
      <input type="text" placeholder="Putanja do slike" value={noviArtikal.slika} onChange={(e) => setNoviArtikal({ ...noviArtikal, slika: e.target.value })} />
      <button onClick={handleAddProduct}>Dodaj artikal</button>
      {poruka && (
        <div className="poruka-prozorcic">
          <p>{poruka}</p>
          <button onClick={closeMessage}>OK</button>
        </div>
      )}
    </div>
  );
};

export default AdminMeni;
