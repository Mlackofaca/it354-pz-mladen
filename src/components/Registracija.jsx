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

      const korisnik = korisnici.find((k) => k.email === email);

      if (korisnik) {
        if (korisnik.role === role) {
          console.log('Korisnik uspešno registrovan:', formData);
          if (role === 'administrator') {
            navigate('/admin-meni');
          } else {
            navigate('/korisnik-meni');
          }
        } else {
          setError('Uloga se ne poklapa sa podacima u bazi.');
        }
      } else {
        setError('Korisnik sa tim email-om ne postoji.');
      }
    } catch (err) {
      console.error('Greška pri povezivanju sa serverom:', err);
      setError('Došlo je do greške pri povezivanju sa serverom.');
    }
  };

  return (
    <div className="registracija-container">
      <h2>Registruj se</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="ime">Ime</label>
          <input
            type="text"
            id="ime"
            name="ime"
            value={formData.ime}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="prezime">Prezime</label>
          <input
            type="text"
            id="prezime"
            name="prezime"
            value={formData.prezime}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Lozinka</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="role">Uloga</label>
          <select
            id="role"
            name="role"
            value={formData.role}
            onChange={handleInputChange}
          >
            <option value="korisnik">Korisnik</option>
            <option value="administrator">Administrator</option>
          </select>
        </div>
        {error && <p className="error">{error}</p>}
        <button type="submit">Registruj se</button>
      </form>
    </div>
  );
};

export default Registracija;
