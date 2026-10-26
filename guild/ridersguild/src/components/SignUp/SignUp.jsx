import { useState } from 'react';
import './SignUp.css'

const sections = [
  "Scale", "Tail", "Heart", "Flame", "Fang", 
  "Claw", "Gem", "Sol", "Nova", "Luna", "Dawn",
];

export default function SignUp({onSuccess}){
  const [isRider, setIsRider] = useState(false);
  const [message, setMessage] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    setMessage('');

    const form = new FormData(e.currentTarget);
    const requiredInfo = {
      username: form.get('username').trim(),
      nickname: form.get('nickname').trim(),
      password: form.get('password'),
      isRider,
      section: isRider? form.get('section') : null
    };

    try {
      const response = await fetch('/api/signup', {
        method: 'POST',
        credentials: 'include',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(requiredInfo)
      });

      const result = await response.json();
      if (!response.ok) throw new Error(result.error);

      const meResponse = await fetch("/api/me", { credentials: "include" });
      const meResult = await meResponse.json();
      
      if (!meResponse.ok) throw new Error(meResult.error);

      onSuccess(meResult.user);
    } catch (error){
      setMessage(error.message);
    }
  }

  return (
    <form className='signup-form' onSubmit={handleSubmit}>
      <label>
        Discord username:
        <input name='username' required maxLength={80} />
      </label>

      <label>
        Nickname:
        <input name='nickname' required maxLength={80} />
      </label>

      <label>
        Password:
        <input name='password' type='password' required minLength={7} />
      </label>

      <label>
        Are you a rider?
        <select
          value={isRider ? 'yes' : 'no'}
          onChange={(e) => setIsRider(e.target.value === 'yes')}
        >
          <option value='no'>No</option>
          <option value='yes'>Yes</option>
        </select>
      </label>

      {isRider && (
        <label>
          Section:
          <select name='section' required>
            <option value='' disabled>Choose your section</option>
            {sections.map(section => (
              <option key={section} value={section}>{section}</option>
            ))}
          </select>
        </label>
      )}

      <button type='submit'>Sign Up</button>
      <p 
        className={`form-message ${message ? 'has-message' : ''}`} 
        aria-live='polite'
      >
        {message}
      </p>
    </form>
  );
}