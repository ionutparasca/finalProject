import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../contexts/UserContext";
import "../styles/HeaderFooter.css";

const Header: React.FC = () => {
  const { user, logout } = useUser();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="header">
      <div className="container-header">
        <h1 className="logo">Comunitate360</h1>
        <nav className="nav-links">
          {user ? (
            <>
              <Link to="/profile">Profil</Link>
              <Link to="/new">Cerere nouă</Link>
              <Link to="/requests">Cereri</Link>
              <Link to="/my-requests">Cererile Mele</Link>
              <Link to="/about">Despre</Link>

              <button onClick={handleLogout}>Logout</button>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
