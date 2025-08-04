import { BrowserRouter, Routes, Route, Navigate, Link } from "react-router-dom";
import { useUser } from "./contexts/UserContext";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProfilePage from "./pages/ProfilePage";
import NewHelpRequestPage from "./pages/NewHelpRequestPage";
import HelpRequestsListPage from "./pages/HelpRequestsListPage";
import MyHelpRequestsPage from "./pages/MyHelpRequestsPage";
import { HelpRequestDetailsPage } from "./pages/HelpRequestDetailsPage";

function App() {
  const { user, logout } = useUser();

  return (
    <BrowserRouter>
      <div>
        <nav>
          {user ? (
            <>
              <button onClick={logout}>Logout</button>
              <Link to="/profile">Profil</Link>
              <Link to="/new">Cerere nouă</Link>
              <Link to="/requests">Cereri</Link>
              <Link to="/my-requests">Cererile Mele</Link>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          )}
        </nav>

        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/my-requests" element={<MyHelpRequestsPage />} />
          <Route
            path="/help-requests/:id"
            element={<HelpRequestDetailsPage />}
          />

          {user ? (
            <>
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/new" element={<NewHelpRequestPage />} />
              <Route path="/requests" element={<HelpRequestsListPage />} />
              <Route path="*" element={<Navigate to="/profile" />} />
            </>
          ) : (
            <Route path="*" element={<Navigate to="/login" />} />
          )}
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
