import React, { useEffect, useState } from "react";
import type { HelpRequest } from "../types/helpRequest";
import { Link } from "react-router-dom";
import "../styles/common.css";

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
    <div className="list-container">
      <h2>Toate cererile trimise</h2>
      <ul className="help-request-list">
        {requests.map((request) => (
          <li key={request.id} className="help-request-card">
            <h3>{request.title}</h3>
            <p>{request.description}</p>
            <p>
              <strong>Trimis de:</strong> {request.userFirstName}{" "}
              {request.userLastName}
            </p>
            <p>
              <strong>Data:</strong>{" "}
              {request.createdAt && !isNaN(Date.parse(request.createdAt))
                ? new Date(request.createdAt).toLocaleString()
                : "Dată indisponibilă"}
            </p>
            <Link to={`/help-requests/${request.id}`}>
              <button className="small-button">Vezi detalii</button>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HelpRequestsListPage;
