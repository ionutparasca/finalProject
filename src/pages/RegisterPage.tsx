import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

const RegisterPage: React.FC = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const defaultAvatar = `https://api.dicebear.com/8.x/fun-emoji/svg?seed=${firstName}${lastName}`;

    const newUser = {
      id: uuidv4(),
      firstName,
      lastName,
      email,
      password,
      profileImage: profileImage || defaultAvatar, // 👈 aici folosim avatar implicit dacă e gol
    };

    try {
      const res = await fetch("http://localhost:3001/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      });

      if (!res.ok) throw new Error("Eroare la înregistrare.");

      alert("Cont creat cu succes!");
      navigate("/login");
    } catch (err) {
      console.error(err);
      alert("A apărut o eroare.");
    }
  };

  return (
    <div>
      <h2>Înregistrare</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Prenume:</label>
          <input
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Nume:</label>
          <input
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Parolă:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <label>URL poză profil:</label>
          <input
            value={profileImage}
            onChange={(e) => setProfileImage(e.target.value)}
            placeholder="https://i.pravatar.cc/150?u=ionut"
          />
        </div>
        <button type="submit">Creează cont</button>
      </form>
    </div>
  );
};

export default RegisterPage;
