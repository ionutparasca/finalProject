import React, { useState } from "react";
import { useUser } from "../contexts/UserContext";

const LoginPage: React.FC = () => {
  const { login } = useUser();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `http://localhost:3001/users?email=${email}&password=${password}`
      );
      const users = await response.json();

      if (users.length > 0) {
        const user = users[0];
        login(user);
        alert("Autentificare reușită!");
      } else {
        alert("Email sau parolă greșită.");
      }
    } catch (error) {
      console.error("Eroare la autentificare:", error);
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
