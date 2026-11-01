import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SignUp from '../login/SignUp.jsx';
import Login from '../login/Login.jsx';
import '../../styles/SignUpPage.css';

export default function SignUpPage({ setUser }){
  const [page, setPage] = useState('login');
  const [checkingSession, setCheckingSession] = useState(true);
  const navigate = useNavigate();

  // check if user is logged in already
  useEffect(() => {
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

  if (checkingSession) return <p>Checking login...</p>;

  return (
    <main className='page'>
      <section className="card auth-card">
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
          ? <Login onSuccess={() => navigate("/account")} /> 
          : <SignUp onSuccess={() => navigate("/account")} />
        }
      </section>
    </main>
  );
}