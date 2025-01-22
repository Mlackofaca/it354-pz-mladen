import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';

const Registracija = () => {
  const [formData, setFormData] = useState({
    ime: '',
    prezime: '',
    email: '',
    password: '',
    role: 'korisnik', // Podrazumevano korisnik
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Funkcija za ažuriranje podataka u formi
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Funkcija za slanje forme
  const handleSubmit = (e) => {
    e.preventDefault();

    // Proveravamo da li su sva polja popunjena
    const { ime, prezime, email, password, role } = formData;
    if (!ime || !prezime || !email || !password) {
      setError('Molimo popunite sva polja.');
      return;
    }

    // Simuliramo slanje podataka na backend
    console.log('Podaci za registraciju:', formData);

    // Proveravamo da li je korisnik ili administrator i preusmeravamo
    if (role === 'administrator') {
      navigate('/admin-meni'); // Stranica za administratore
    } else {
      navigate('/korisnik-meni'); // Stranica za korisnike
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
