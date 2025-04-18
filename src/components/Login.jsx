import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; 
import '../App.css';

const Login = () => {
  const [formData, setFormData] = useState({
    ime: '',
    prezime: '',
    email: '',
    password: '',
    role: 'korisnik',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth(); // koristi login iz AuthContext-a

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

      const korisnik = korisnici.find(
        (k) =>
          k.email === email &&
          k.ime === ime &&
          k.prezime === prezime &&
          k.password === password &&
          k.role === role
      );

      if (korisnik) {
        console.log('Korisnik uspešno prijavljen:', formData);
        login(email, password, role); 
        if (role === 'administrator') {
          navigate('/admin-meni');
        } else {
          navigate('/korisnik-meni');
        }
      } else {
        setError('Podaci se ne podudaraju sa podacima u bazi.');
      }
    } catch (err) {
      console.error('Greška pri povezivanju sa serverom:', err);
      setError('Došlo je do greške pri povezivanju sa serverom.');
    }
  };

  return (
    <div className="login-container">
      <h2>Prijavi se</h2>
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
        <button type="submit">Prijavi se</button>
      </form>
    </div>
  );
};

export default Login;
