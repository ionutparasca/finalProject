import React from "react";
import "../styles/common.css";

const AboutPage: React.FC = () => {
  return (
    <div className="about-container">
      <h2>Despre Comunitate360</h2>
      <p>
        Această aplicație a fost creată pentru a conecta persoanele aflate în
        nevoie cu cei care pot ajuta. Scopul nostru este de a încuraja
        solidaritatea și implicarea activă în comunitate.
      </p>

      <p>
        Funcționalitățile includ:
        <ul className="about-list">
          <li>✅ Crearea de cereri de ajutor personalizate</li>
          <li>✅ Comentarii și comunicare între utilizatori</li>
          <li>✅ Autentificare și gestionare profil</li>
        </ul>
      </p>

      <p>
        Ne dorim să oferim un mediu sigur, ușor de utilizat și adaptat pentru
        toate tipurile de utilizatori. Platforma este în continuă dezvoltare și
        apreciem orice feedback constructiv.
      </p>

      <p
        style={{
          marginTop: "2rem",
          textAlign: "center",
          fontStyle: "italic",
          color: "#666",
        }}
      >
        Mulțumim că faci parte din Comunitate360!
      </p>
    </div>
  );
};

export default AboutPage;
