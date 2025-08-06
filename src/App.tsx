import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useUser } from "./contexts/UserContext";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProfilePage from "./pages/ProfilePage";
import NewHelpRequestPage from "./pages/NewHelpRequestPage";
import HelpRequestsListPage from "./pages/HelpRequestsListPage";
import MyHelpRequestsPage from "./pages/MyHelpRequestsPage";
import { HelpRequestDetailsPage } from "./pages/HelpRequestDetailsPage";
import Header from "./components/Header";
import Footer from "./components/Footer";
import AboutPage from "./pages/AboutPage";

function App() {
  const { user } = useUser();

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/my-requests" element={<MyHelpRequestsPage />} />
        <Route path="/help-requests/:id" element={<HelpRequestDetailsPage />} />
        <Route path="/about" element={<AboutPage />} />

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
      <Footer />
    </BrowserRouter>
  );
}

export default App;
