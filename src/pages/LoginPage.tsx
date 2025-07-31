import React, { useState } from "react";
import { useUser } from "../contexts/UserContext";
import { useNavigate } from "react-router-dom";

const LoginPage: React.FC = () => {
  const { login } = useUser();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch(
        `http://localhost:3001/users?email=${email}&password=${password}`
      );
      const data = await res.json();

      if (data.length === 0) {
        alert("Email sau parolă greșite.");
        return;
      }

      login(data[0]);
      alert("Autentificare reușită!");
      navigate("/profile");
    } catch (err) {
      console.error(err);
      alert("A apărut o eroare.");
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
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
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;
