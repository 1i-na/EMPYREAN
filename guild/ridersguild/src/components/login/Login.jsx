import { useState } from 'react';
import './SignUp.css';

export default function Login({onSuccess}) {
  const [message, setMessage] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    setMessage('');

    const form = new FormData(e.currentTarget);

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        credentials: 'include',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          username: form.get('username').trim(),
          password: form.get('password')
        })
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error);
      }

      onSuccess(result.user);
    } catch (error) {
      setMessage(error.message);
    }
  }

  return (
    <form className="signup-form" onSubmit={handleSubmit}>
      <h1>Log In</h1>

      <label>
        Discord username:
        <input name="username" required maxLength={80} autoComplete='username' />
      </label>

      <label>
        Password:
        <input
          name='password'
          type='password'
          required
          autoComplete='current-password'
        />
      </label>

      <button type='submit'>Log In</button>
      <p 
        className={`form-message ${message ? 'has-message' : ''}`} 
        aria-live='polite'
      >
        {message}
      </p>
    </form>
  );
}