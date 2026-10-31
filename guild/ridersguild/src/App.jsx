import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'
import NavBar from './components/NavBar';
import LeaderboardPage from "./components/pages/LeaderboardPage";
import SignUpPage from './components/pages/SignUpPage';
import AccountPage from "./components/AccountPage";
import AboutPage from "./components/AboutPage";

export default function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<LeaderboardPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/login" element={<SignUpPage />} />
        <Route path="/account" element={<AccountPage />} />
      </Routes>
    </BrowserRouter>
  );
}
