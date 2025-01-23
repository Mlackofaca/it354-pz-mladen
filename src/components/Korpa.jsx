import React from 'react';

const Korpa = () => {
  const [korpa, setKorpa] = React.useState([]);

  React.useEffect(() => {
    const storedKorpa = JSON.parse(localStorage.getItem('korpa')) || [];
    setKorpa(storedKorpa);
  }, []);

  return (
    <div className="korpa-container">
      <h2>Vaša korpa</h2>
      <div className="korpa-items">
        {korpa.map((item, index) => (
          <div key={index} className="korpa-item">
            <h3>{item.naziv}</h3>
            <p>Količina: {item.kolicina}</p>
            <p>Cena: {item.cena * item.kolicina} RSD</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Korpa;
