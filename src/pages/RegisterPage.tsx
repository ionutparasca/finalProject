import React, { useState } from "react";
import { z } from "zod";

const schema = z.object({
  firstName: z
    .string()
    .min(2, "Prenumele trebuie să aibă cel puțin 2 caractere"),
  lastName: z.string().min(2, "Numele trebuie să aibă cel puțin 2 caractere"),
  email: z.string().email("Email invalid"),
  password: z.string().min(6, "Parola trebuie să aibă cel puțin 6 caractere"),
});

type FormData = z.infer<typeof schema>;

const RegisterPage: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>(
    {}
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const result = schema.safeParse(formData);

    if (!result.success) {
      const zodErrors: Partial<Record<keyof FormData, string>> = {};

      result.error.issues.forEach((err: z.ZodIssue) => {
        const field = err.path[0] as keyof FormData;
        zodErrors[field] = err.message;
      });

      setErrors(zodErrors);
      return;
    }

    try {
      const res = await fetch("http://localhost:3001/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: crypto.randomUUID(), ...formData }),
      });

      if (!res.ok) throw new Error("Eroare la înregistrare.");

      alert("Înregistrare reușită!");
      setFormData({ firstName: "", lastName: "", email: "", password: "" });
      setErrors({});
    } catch (err) {
      console.error(err);
      alert("A apărut o eroare.");
    }
  };

  return (
    <div>
      <h1>Înregistrare</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Prenume:</label>
          <input
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
          />
          {errors.firstName && (
            <p style={{ color: "red" }}>{errors.firstName}</p>
          )}
        </div>
        <div>
          <label>Nume:</label>
          <input
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
          />
          {errors.lastName && <p style={{ color: "red" }}>{errors.lastName}</p>}
        </div>
        <div>
          <label>Email:</label>
          <input
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}
        </div>
        <div>
          <label>Parolă:</label>
          <input
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
          />
          {errors.password && <p style={{ color: "red" }}>{errors.password}</p>}
        </div>
        <button type="submit">Înregistrează-te</button>
      </form>
    </div>
  );
};

export default RegisterPage;
