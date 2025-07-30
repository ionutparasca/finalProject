import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
} from "react-router-dom";
import { useUser } from "./contexts/UserContext";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProfilePage from "./pages/ProfilePage";

function App() {
  const { user, logout } = useUser();

  return (
    <Router>
      <div>
        <nav style={{ display: "flex", gap: "1rem", marginBottom: "1rem" }}>
          {!user && (
            <>
              <Link to="/">Login</Link>
              <Link to="/register">Register</Link>
            </>
          )}
          {user && (
            <>
              <Link to="/profile">Profil</Link>
              {/* aici vom adăuga ulterior: <Link to="/help">Cereri</Link> */}
              <button onClick={logout}>Logout</button>
            </>
          )}
        </nav>

        <Routes>
          <Route
            path="/"
            element={!user ? <LoginPage /> : <Navigate to="/profile" />}
          />
          <Route path="/register" element={<RegisterPage />} />
          <Route
            path="/profile"
            element={user ? <ProfilePage /> : <Navigate to="/" />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
