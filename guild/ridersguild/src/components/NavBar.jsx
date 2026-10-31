import { Link } from "react-router-dom";

export default function NavBar() {
  return (
    <nav className="navbar">
      <Link to="/" className="logo">Rider's Guild</Link>
      <div className="nav-links">
        <Link to="/">Leaderboard</Link>
        <Link to="/about">About</Link>
        <Link to="/account">Account</Link>
      </div>
    </nav>
  );
}