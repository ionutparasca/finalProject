import { useUser } from "./contexts/UserContext";
import LoginPage from "./pages/LoginPage";

function App() {
  const { user, logout } = useUser();

  return (
    <div>
      {user ? (
        <>
          <h2>Bun venit, {user.firstName}!</h2>
          <button onClick={logout}>Logout</button>
        </>
      ) : (
        <LoginPage />
      )}
    </div>
  );
}

export default App;
