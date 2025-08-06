import React, { useState } from "react";
import { useUser } from "../contexts/UserContext";
import type { HelpRequest } from "../types/helpRequest";
import { v4 as uuidv4 } from "uuid";
import "../styles/common.css";

type Category = {
  value: string;
  label: string;
  subcategories: string[];
};

const categories: Category[] = [
  {
    value: "Food",
    label: "🍞 Mâncare",
    subcategories: ["Cumpărături", "Livrare", "Masă caldă"],
  },
  {
    value: "Transport",
    label: "🚌 Transport",
    subcategories: [
      "Transport local",
      "Însotire la spital",
      "Deplasare urgentă",
    ],
  },
  {
    value: "Housing",
    label: "🏠 Cazare",
    subcategories: [
      "Adăpost temporar",
      "Cazare de urgență",
      "Ajutor pentru chirie",
    ],
  },
  {
    value: "Health",
    label: "🏥 Sănătate",
    subcategories: [
      "Programare medic",
      "Ridicare rețetă",
      "Îngrijire la domiciliu",
    ],
  },
  {
    value: "Education",
    label: "📚 Educație",
    subcategories: ["Ajutor teme", "Traduceri", "Cursuri online"],
  },
  {
    value: "Other",
    label: "❓ Altceva",
    subcategories: [],
  },
];

const NewHelpRequestPage: React.FC = () => {
  const { user } = useUser();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Food");
  const [subcategory, setSubcategory] = useState("");

  const selectedCategory = categories.find((cat) => cat.value === category);

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

      alert("Cerere trimisă cu succes!");
      setTitle("");
      setDescription("");
      setCategory("Food");
      setSubcategory("");
    } catch (err) {
      console.error(err);
      alert("A apărut o eroare.");
    }
  };

  if (!user) return <p>Trebuie să fii logat pentru a accesa această pagină.</p>;

  return (
    <div className="form-container">
      <h2>Trimite o cerere de ajutor</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Titlu:</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Descriere:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Categorie:</label>
          <select
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);
              setSubcategory("");
            }}
          >
            {categories.map((cat) => (
              <option key={cat.value} value={cat.value}>
                {cat.label}
              </option>
            ))}
          </select>
        </div>

        {selectedCategory && selectedCategory.subcategories.length > 0 && (
          <div className="form-group">
            <label>Subcategorie:</label>
            <select
              value={subcategory}
              onChange={(e) => setSubcategory(e.target.value)}
            >
              <option value="">Alege subcategoria</option>
              {selectedCategory.subcategories.map((sub) => (
                <option key={sub} value={sub}>
                  {sub}
                </option>
              ))}
            </select>
          </div>
        )}

        <button type="submit">Trimite</button>
      </form>
    </div>
  );
};

export default NewHelpRequestPage;
