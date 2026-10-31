import SignUp from './SignUp.jsx';
import Login from './Login.jsx';
import './SignUpPage.css';
import { useState, useEffect } from 'react';
import OATLeaderboard from "../OATLeaderboard/OATLeaderboard.jsx"

export default function SignUpPage({ users, sortedUsers, error }){
  const [user, setUser] = useState(null);
  const [page, setPage] = useState('login');
  const [checkingSession, setCheckingSession] = useState(true);

  useEffect(() => {
    // check if user is logged in already
    async function checkSession(){
      try {
        const response = await fetch('/api/me', {
          credentials: 'include'
        });

        if (response.ok) {
          const result = await response.json();
          setUser(result.user);
        }
      } catch (err) {
        console.error('Could not check session: ', err);
      } finally {
        setCheckingSession(false);
      }
    }

    checkSession();
  }, []);

  async function handleLogout() {
    await fetch("/api/logout", {
      method: "POST",
      credentials: "include",
    });

    setUser(null);
    setPage("login");
  }

  if (checkingSession) return <p>Checking login...</p>;

  if (user) {
    return (
      <>
        <OATLeaderboard
          users={users}
          sortedUsers={sortedUsers}
          error={error}
        />
        <button type="button" onClick={handleLogout}>
          Log Out
        </button>
      </>
    );
  }

  return (
    <main className='auth-page'>
      <div className='auth-toggle'>
        <button 
          type='button' 
          className={page === 'login' ? 'active' : ''}
          onClick={() => setPage('login')}
        >
          Log In
        </button>
        <button 
          type='button' 
          className={page === 'signup' ? 'active' : ''}
          onClick={() => setPage('signup')}
        >
          Sign Up
        </button>
      </div>

      {page === 'login' 
        ? (<Login onSuccess={setUser} />) 
        : (<SignUp onSuccess={setUser} />)
      }
    </main>
  );
}