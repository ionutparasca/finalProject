import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useUser } from "./contexts/UserContext";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProfilePage from "./pages/ProfilePage";
import NewHelpRequestPage from "./pages/NewHelpRequestPage";

function App() {
  const { user, logout, loading } = useUser();

  if (loading) return null; // asta oprește afișarea până se verifică userul

  return (
    <BrowserRouter>
      <div>
        <nav>
          {user ? (
            <>
              <button onClick={logout}>Logout</button>
              <a href="/profile">Profil</a>
              <a href="/new">Cerere nouă</a>
            </>
          ) : (
            <>
              <a href="/login">Login</a>
              <a href="/register">Register</a>
            </>
          )}
        </nav>

        <Routes>
          {!user && <Route path="*" element={<Navigate to="/login" />} />}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          {user && (
            <>
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/new" element={<NewHelpRequestPage />} />
            </>
          )}
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
