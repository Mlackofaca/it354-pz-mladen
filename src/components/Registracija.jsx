import React, { useState } from 'react';
import '../App.css';

const Registracija = () => {
  const [formData, setFormData] = useState({
    ime: '',
    prezime: '',
    email: '',
    password: ''
  });

  // Funkcija za ažuriranje podataka u formi
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  // Funkcija za slanje forme
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Podaci za registraciju:', formData);
    // Ovde možeš dodati logiku za slanje podataka na backend
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
        <button type="submit">Registruj se</button>
      </form>
    </div>
  );
};

export default Registracija;
