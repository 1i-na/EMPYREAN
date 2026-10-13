export default function NavBar() {
  return (
    <>
      <nav>
        <a href="/" className="logo">Rider's Guild</a>

        <ul>
            <li><a href="/">Leaderboard</a></li>
            <li><a href="/about.html">About</a></li>
            <li><a href="/login.html">Login/Sign Up</a></li>
        </ul>
      </nav>
    </>
  );
}