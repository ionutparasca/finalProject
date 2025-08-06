import React, { useEffect, useState } from "react";
import { useUser } from "../contexts/UserContext";
import type { HelpRequest } from "../types/helpRequest";
import { Link } from "react-router-dom";
import "../styles/common.css";

const MyHelpRequestsPage: React.FC = () => {
  const { user } = useUser();
  const [myRequests, setMyRequests] = useState<HelpRequest[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editedTitle, setEditedTitle] = useState("");
  const [editedDescription, setEditedDescription] = useState("");

  useEffect(() => {
    if (!user) return;

    const fetchMyRequests = async () => {
      try {
        const res = await fetch(
          `http://localhost:3001/helpRequests?userId=${user.id}`
        );
        if (!res.ok) throw new Error("Eroare la încărcarea cererilor.");

        const data = await res.json();
        setMyRequests(data);
      } catch (err) {
        console.error(err);
        alert("A apărut o eroare.");
      }
    };

    fetchMyRequests();
  }, [user]);

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`http://localhost:3001/helpRequests/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Eroare la ștergere.");
      setMyRequests((prev) => prev.filter((req) => req.id !== id));
    } catch (err) {
      console.error(err);
      alert("A apărut o eroare la ștergere.");
    }
  };

  const handleEdit = (req: HelpRequest) => {
    setEditingId(req.id);
    setEditedTitle(req.title);
    setEditedDescription(req.description);
  };

  const handleUpdate = async (id: string) => {
    try {
      const updated = { title: editedTitle, description: editedDescription };
      const res = await fetch(`http://localhost:3001/helpRequests/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updated),
      });
      if (!res.ok) throw new Error("Eroare la actualizare.");

      setMyRequests((prev) =>
        prev.map((req) => (req.id === id ? { ...req, ...updated } : req))
      );
      setEditingId(null);
    } catch (err) {
      console.error(err);
      alert("A apărut o eroare la actualizare.");
    }
  };

  if (!user)
    return (
      <p className="center-text">
        Trebuie să fii logat pentru a vedea această pagină.
      </p>
    );

  return (
    <div className="list-container">
      <h2>Cererile Mele</h2>
      {myRequests.length === 0 ? (
        <p>Nu ai trimis nicio cerere.</p>
      ) : (
        <ul className="request-list">
          {myRequests.map((req) => (
            <li key={req.id} className="request-card">
              {editingId === req.id ? (
                <>
                  <input
                    value={editedTitle}
                    onChange={(e) => setEditedTitle(e.target.value)}
                  />
                  <textarea
                    value={editedDescription}
                    onChange={(e) => setEditedDescription(e.target.value)}
                    rows={3}
                  />
                  <div className="button-group">
                    <button onClick={() => handleUpdate(req.id)}>
                      Salvează
                    </button>
                    <button onClick={() => setEditingId(null)}>Anulează</button>
                  </div>
                </>
              ) : (
                <>
                  <strong>{req.title}</strong>
                  <p>{req.description}</p>
                  <div className="button-group">
                    <Link to={`/help-requests/${req.id}`}>
                      <button>Vezi detalii</button>
                    </Link>
                    <button onClick={() => handleEdit(req)}>Editează</button>
                    <button onClick={() => handleDelete(req.id)}>Șterge</button>
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MyHelpRequestsPage;
