import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';

const Registracija = () => {
  const [formData, setFormData] = useState({
    ime: '',
    prezime: '',
    email: '',
    password: '',
    role: 'korisnik',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { ime, prezime, email, password, role } = formData;

    if (!ime || !prezime || !email || !password) {
      setError('Molimo popunite sva polja.');
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/korisnici');
      const korisnici = await response.json();

      const korisnikPostoji = korisnici.some((k) => k.email === email);

      if (korisnikPostoji) {
        setError('Korisnik sa ovim email-om već postoji.');
        return;
      }

      const noviKorisnik = { ime, prezime, email, password, role };
      await fetch('http://localhost:3000/korisnici', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(noviKorisnik),
      });

      navigate('/login');
    } catch (err) {
      console.error('Greška pri povezivanju sa serverom:', err);
      setError('Došlo je do greške pri registraciji.');
    }
  };

  return (
    <div className="registracija-container">
      <h2>Registracija</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="ime">Ime</label>
          <input type="text" id="ime" name="ime" value={formData.ime} onChange={handleInputChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="prezime">Prezime</label>
          <input type="text" id="prezime" name="prezime" value={formData.prezime} onChange={handleInputChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" value={formData.email} onChange={handleInputChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="password">Lozinka</label>
          <input type="password" id="password" name="password" value={formData.password} onChange={handleInputChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="role">Uloga</label>
          <select id="role" name="role" value={formData.role} onChange={handleInputChange}>
            <option value="korisnik">Korisnik</option>
            <option value="administrator">Administrator</option>
          </select>
        </div>
        {error && <p className="error">{error}</p>}
        <button type="submit">Registruj se</button>
      </form>
      <p>Već imate nalog?</p>
      <button onClick={() => navigate('/login')}>Prijavi se</button>
    </div>
  );
};

export default Registracija;
