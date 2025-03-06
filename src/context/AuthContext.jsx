import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (email, password, role) => {
    fetch('http://localhost:3000/korisnici')
      .then(response => response.json())
      .then(korisnici => {
        const foundUser = korisnici.find(
          (k) => k.email === email && k.password === password && k.role === role
        );
        if (foundUser) {
          setUser(foundUser);
        } else {
          alert('Podaci se ne podudaraju sa podacima u bazi.');
        }
      })
      .catch(err => alert('Greška pri povezivanju sa serverom.'));
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
