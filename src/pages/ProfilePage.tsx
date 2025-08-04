import React, { useState, useEffect } from "react";
import { useUser } from "../contexts/UserContext";
import type { User } from "../contexts/UserContext";

const ProfilePage: React.FC = () => {
  const { user, updateUser } = useUser();

  const [firstName, setFirstName] = useState(user?.firstName || "");
  const [lastName, setLastName] = useState(user?.lastName || "");
  const [email, setEmail] = useState(user?.email || "");
  const [password, setPassword] = useState(user?.password || "");
  const [profileImage, setProfileImage] = useState(user?.profileImage || "");

  useEffect(() => {
    if (user) {
      setFirstName(user.firstName);
      setLastName(user.lastName);
      setEmail(user.email);
      setPassword(user.password);
      setProfileImage(user.profileImage || "");
    }
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    const updatedUser: User = {
      id: user.id,
      firstName,
      lastName,
      email,
      password,
      profileImage,
    };

    try {
      const res = await fetch(`http://localhost:3001/users/${user.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedUser),
      });

      if (!res.ok) throw new Error("Eroare la actualizarea profilului.");

      updateUser(updatedUser);
      alert("Profil actualizat cu succes!");
    } catch (err) {
      console.error(err);
      alert("A apărut o eroare.");
    }
  };

  if (!user) {
    return <p>Trebuie să fii logat pentru a vedea această pagină.</p>;
  }

  return (
    <div>
      <h2>Profilul Meu</h2>

      {profileImage && (
        <img
          src={profileImage}
          alt="Poza de profil"
          style={{ width: "100px", height: "100px", borderRadius: "50%" }}
        />
      )}

      <form onSubmit={handleSubmit}>
        <div>
          <label>Prenume:</label>
          <input
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        <div>
          <label>Nume:</label>
          <input
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <div>
          <label>Email:</label>
          <input value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div>
          <label>Parolă:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <label>URL poză profil:</label>
          <input
            value={profileImage}
            onChange={(e) => setProfileImage(e.target.value)}
            placeholder="https://i.pravatar.cc/150?u=ionut"
          />
        </div>
        <button type="submit">Salvează</button>
      </form>
    </div>
  );
};

export default ProfilePage;
