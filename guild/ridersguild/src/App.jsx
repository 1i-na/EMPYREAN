import { useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'
import NavBar from './components/NavBar';
import LeaderboardPage from "./components/pages/LeaderboardPage";
import SignUpPage from './components/pages/SignUpPage';
import AccountPage from "./components/pages/AccountPage";
import AboutPage from "./components/pages/AboutPage";

export default function App() {
  const [user, setUser] = useState(null);

  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<LeaderboardPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/login" element={<SignUpPage setUser={setUser} />} />
        <Route path="/account" element={<AccountPage user={user} setUser={setUser} />} />
      </Routes>
    </BrowserRouter>
  );
}
