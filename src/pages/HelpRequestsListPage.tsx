import React, { useEffect, useState } from "react";
import type { HelpRequest } from "../types/helpRequest";
import { Link } from "react-router-dom";

const HelpRequestsListPage: React.FC = () => {
  const [requests, setRequests] = useState<HelpRequest[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:3001/helpRequests")
      .then((res) => res.json())
      .then((data) => {
        setRequests(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Eroare la încărcarea cererilor:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Se încarcă cererile...</p>;

  if (requests.length === 0) return <p>Nu există nicio cerere trimisă.</p>;

  return (
    <div>
      <h2>Toate cererile trimise</h2>
      <ul>
        {requests.map((request) => (
          <li
            key={request.id}
            style={{
              border: "1px solid #ccc",
              marginBottom: "10px",
              padding: "10px",
            }}
          >
            <h3>{request.title}</h3>
            <p>{request.description}</p>
            <p>
              <strong>Trimis de:</strong> {request.userFirstName}{" "}
              {request.userLastName}
            </p>

            {/* Butonul de detalii */}
            <Link to={`/help-requests/${request.id}`}>
              <button>Vezi detalii</button>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HelpRequestsListPage;
