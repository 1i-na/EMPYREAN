import SignUp from './SignUp.jsx';
import Login from './Login.jsx';
import './SignUpPage.css';
import { useState } from 'react';

export default function SignUpPage(){
  const [page, setPage] = useState('login');

  return (
    <main className='auth-page'>
      <div className='auth-toggle' role='tablist' aria-label='Account options'>
        <button
          type='button'
          role='tab'
          aria-selected={page == 'login'}
          className={page === 'login' ? 'active' : ''}
          onClick={() => setPage('login')}
        >
          Log In
        </button>
        <button
          type='button'
          role='tab'
          aria-selected={page == 'signup'}
          className={page === 'signup' ? 'active' : ''}
          onClick={() => setPage('signup')}
        >
          Sign Up
        </button>
      </div>
      {page === 'login' ? <Login /> : <SignUp />}
    </main>
  );
}