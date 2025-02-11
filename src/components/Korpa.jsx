import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import margarita from '../slike/margarita.jpg';
import pepperoni from '../slike/pepperoni.jpg';
import carbonara from '../slike/carbonara.jpg';
import lasagna from '../slike/lasagna.jpg';
import tiramisu from '../slike/tiramisu.jpg';
import panna from '../slike/panna.jpg';

const Korpa = () => {
  const [korpa, setKorpa] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedKorpa = JSON.parse(localStorage.getItem('korpa')) || [];
    setKorpa(storedKorpa);
  }, []);

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

  const ukloniProizvod = (id) => {
    const novaKorpa = korpa.filter(item => item.id !== id);
    setKorpa(novaKorpa);
    localStorage.setItem('korpa', JSON.stringify(novaKorpa));
  };

  const ukloniNekolikoProizvoda = (id, broj) => {
    const novaKorpa = korpa.map(item => 
      item.id === id ? { ...item, kolicina: item.kolicina - broj } : item
    ).filter(item => item.kolicina > 0);
    setKorpa(novaKorpa);
    localStorage.setItem('korpa', JSON.stringify(novaKorpa));
  };

  const ukupnaCena = korpa.reduce((sum, item) => sum + item.cena * item.kolicina, 0);

  const potvrdiNarudzbinu = () => {
    const potvrda = window.confirm("Da li ste sigurni da hocete da potvrdite narudzbinu?");
    if (potvrda) {
      navigate('/potvrda-narudzbine');
    }
  };

  return (
    <div className="korpa-container">
      <div className="back-button-container">
        <Link to="/korisnik-meni">
          <button className="back-button">Nazad</button>
        </Link>
      </div>

      <h2>Vaša korpa</h2>
      <div className="korpa-items">
        {korpa.length > 0 ? (
          korpa.map((item, index) => (
            <div key={index} className="korpa-item">
              <img src={getImage(item.naziv)} alt={item.naziv} />
              <h3>{item.naziv}</h3>
              <p>Količina: {item.kolicina}</p>
              <p>Cena: {item.cena * item.kolicina} RSD</p>

              {item.kolicina > 1 ? (
                <div>
                  <button
                    onClick={() => {
                      const brojZaUklanjanje = prompt("Unesite koliko želite da izbrišete:", 1);
                      if (brojZaUklanjanje) {
                        ukloniNekolikoProizvoda(item.id, parseInt(brojZaUklanjanje, 10));
                      }
                    }}
                  >
                    Izbaci neki proizvod
                  </button>
                </div>
              ) : (
                <button onClick={() => ukloniProizvod(item.id)}>Izbaci proizvod</button>
              )}
            </div>
          ))
        ) : (
          <p>Korpa je prazna</p>
        )}
      </div>

      {korpa.length > 0 && (
        <div className="ukupna-cena-container">
          <h3>Ukupna cena: {ukupnaCena} RSD</h3>
          <button className="potvrdi-narudzbinu-button" onClick={potvrdiNarudzbinu}>
            Potvrdi narudžbinu
          </button>
        </div>
      )}
    </div>
  );
};

export default Korpa;
