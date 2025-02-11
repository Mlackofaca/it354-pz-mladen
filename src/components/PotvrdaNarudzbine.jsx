import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const PotvrdaNarudzbine = () => {
  const [adresa, setAdresa] = useState('');
  const [telefon, setTelefon] = useState('');
  const [email, setEmail] = useState('');
  const [dodatneNapomene, setDodatneNapomene] = useState('');
  const navigate = useNavigate();

  const potvrdi = () => {
    if (!adresa || !telefon || !email) {
      alert('Molimo unesite adresu, broj telefona i email.');
      return;
    }

    if (!/^\d+$/.test(telefon)) {
      alert('Broj telefona može sadržati samo cifre.');
      return;
    }

    if (!email.includes('@')) {
      alert('Email mora sadržati @ znak.');
      return;
    }

    const potvrda = window.confirm('Da li ste sigurni da želite da potvrdite narudžbinu?');
    if (!potvrda) return;

    const vremeDostave = Math.floor(Math.random() * (60 - 15 + 1)) + 15;
    alert(`Vaša narudžbina će stići za približno ${vremeDostave} minuta.`);

    localStorage.removeItem('korpa');
    navigate('/korisnik-meni');
  };

  return (
    <div className="potvrda-container">
      <h2>Potvrda narudžbine</h2>
      <label>Adresa:</label>
      <input 
        type="text" 
        value={adresa} 
        onChange={(e) => setAdresa(e.target.value)}
        placeholder="Unesite adresu"
      />
      
      <label>Broj telefona:</label>
      <input 
        type="text" 
        value={telefon} 
        onChange={(e) => setTelefon(e.target.value)}
        placeholder="Unesite broj telefona"
      />
      
      <label>Email:</label>
      <input 
        type="email" 
        value={email} 
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Unesite email adresu"
      />
      
      <label>Dodatne napomene:</label>
      <textarea 
        value={dodatneNapomene} 
        onChange={(e) => setDodatneNapomene(e.target.value)}
        placeholder="Unesite dodatne napomene (opciono)"
      ></textarea>
      
      <button onClick={potvrdi}>Potvrdi narudžbinu</button>
    </div>
  );
};

export default PotvrdaNarudzbine;
