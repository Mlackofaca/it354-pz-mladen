import { createContext, useContext, useState, useEffect } from "react";

const TemaContext = createContext();

export const TemaProvider = ({ children }) => {
  const [tema, setTema] = useState(localStorage.getItem("tema") || "svetla");

  useEffect(() => {
    document.documentElement.setAttribute("data-tema", tema);
    localStorage.setItem("tema", tema);
  }, [tema]);

  const promeniTemu = () => {
    setTema((prevTema) => (prevTema === "svetla" ? "tamna" : "svetla"));
  };

  return (
    <TemaContext.Provider value={{ tema, promeniTemu }}>
      {children}
    </TemaContext.Provider>
  );
};

export const useTema = () => useContext(TemaContext);
