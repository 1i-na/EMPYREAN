import { useState } from 'react';
import './SignUp.css';

export default function Login() {
  const [message, setMessage] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setMessage("");

    const formElement = e.currentTarget;
    const form = new FormData(formElement);

    const credentials = {
      username: form.get('username').trim(),
      password: form.get('password'),
    };

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(credentials),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error('Login failed: ', result.Error);
      }

      setMessage('Logged in successfully. Welcome back, rider.');
      formElement.reset();
    } catch (error) {
      setMessage('Unable to log in. Please try again.');
      console.error(error);
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
      <p aria-live='polite'>{message}</p>
    </form>
  );
}