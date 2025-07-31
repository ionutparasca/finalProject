import React, { useState } from "react";
import { useUser } from "../contexts/UserContext";
import type { HelpRequest } from "../types/helpRequest";
import { v4 as uuidv4 } from "uuid";

const NewHelpRequestPage: React.FC = () => {
  const { user } = useUser();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Food");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newRequest: HelpRequest = {
      id: uuidv4(),
      title,
      description,
      category: category as HelpRequest["category"],
      createdAt: new Date().toISOString(),
      createdBy: user!.id,
    };

    try {
      const res = await fetch("http://localhost:3001/helpRequests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newRequest),
      });

      if (!res.ok) throw new Error("Eroare la trimiterea cererii.");

      alert("Cerere trimisă cu succes!");
      setTitle("");
      setDescription("");
      setCategory("Food");
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
          >
            <option value="Food">Food</option>
            <option value="Transport">Transport</option>
            <option value="Housing">Housing</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <button type="submit">Trimite</button>
      </form>
    </div>
  );
};

export default NewHelpRequestPage;
