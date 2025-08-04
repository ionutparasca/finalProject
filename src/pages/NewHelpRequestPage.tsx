import React, { useState } from "react";
import { useUser } from "../contexts/UserContext";
import type { HelpRequest } from "../types/helpRequest";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";

const NewHelpRequestPage: React.FC = () => {
  const { user } = useUser();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Food");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) return;

    const newRequest: HelpRequest = {
      id: uuidv4(),
      title,
      description,
      category,
      createdAt: new Date().toISOString(),
      createdBy: `${user.firstName} ${user.lastName}`,
      userId: user.id,
      userFirstName: user.firstName,
      userLastName: user.lastName,
    };

    try {
      const res = await fetch("http://localhost:3001/helpRequests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newRequest),
      });

      if (!res.ok) throw new Error("Eroare la trimiterea cererii.");

      navigate("/my-requests"); // 🔁 Redirecționare după trimitere
    } catch (err) {
      console.error(err);
      alert("A apărut o eroare.");
    }
  };

  if (!user) return <p>Trebuie să fii logat pentru a accesa această pagină.</p>;

  return (
    <div>
      <h2>Trimite o cerere de ajutor</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Titlu:</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Descriere:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Categorie:</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            <option value="food">🍞 Alimente și gătit</option>
            <option value="transport">🚗 Transport și deplasări</option>
            <option value="housing">🏠 Cazare și locuință</option>
            <option value="health">💊 Sănătate și medicamente</option>
            <option value="companionship">
              🤝 Însoțire / Ajutor emoțional
            </option>
            <option value="childcare">👶 Îngrijire copii</option>
            <option value="pets">🐾 Ajutor cu animale</option>
            <option value="paperwork">📝 Acte și documente</option>
            <option value="technical">💻 Ajutor tehnic</option>
            <option value="other">❓ Alt tip de ajutor</option>
          </select>
          <p style={{ fontSize: "0.9em", color: "gray" }}>
            Alege categoria care descrie cel mai bine tipul de ajutor de care ai
            nevoie.
          </p>
        </div>
        <button type="submit">Trimite</button>
      </form>
    </div>
  );
};

export default NewHelpRequestPage;
