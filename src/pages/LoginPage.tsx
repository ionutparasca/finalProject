import React, { useState } from "react";
import { z } from "zod";
import { useNavigate } from "react-router-dom";
import { useUser } from "../contexts/UserContext";
import "../styles/common.css";

const schema = z.object({
  email: z.string().email("Email invalid"),
  password: z.string().min(6, "Parola trebuie să aibă cel puțin 6 caractere"),
});

type FormData = z.infer<typeof schema>;

const LoginPage: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>(
    {}
  );
  const navigate = useNavigate();
  const { login } = useUser();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const result = schema.safeParse(formData);
    if (!result.success) {
      const zodErrors = result.error as z.ZodError;
      const newErrors: Partial<Record<keyof FormData, string>> = {};

      zodErrors.issues.forEach((err) => {
        const field = err.path[0] as keyof FormData;
        newErrors[field] = err.message;
      });

      setErrors(newErrors);
      return;
    }

    try {
      const res = await fetch(
        `http://localhost:3001/users?email=${formData.email}`
      );
      const data = await res.json();
      const user = data[0];

      if (!user || user.password !== formData.password) {
        alert("Email sau parolă incorectă.");
        return;
      }

      login(user);
      alert("Autentificare reușită!");
      navigate("/profile");
    } catch (err) {
      console.error(err);
      alert("A apărut o eroare la autentificare.");
    }
  };

  return (
    <div className="login-container">
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <p>{errors.email}</p>}
        </div>
        <div>
          <label>Parolă:</label>
          <input
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
          />
          {errors.password && <p>{errors.password}</p>}
        </div>
        <button type="submit">Autentificare</button>
      </form>
    </div>
  );
};

export default LoginPage;
