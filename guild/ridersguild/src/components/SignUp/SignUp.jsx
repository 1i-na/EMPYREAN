import { useState } from 'react';
import './SignUp.css'

const sections = [
  "Scale", "Tail", "Heart", "Flame", "Fang", 
  "Claw", "Gem", "Sol", "Nova", "Luna", "Dawn",
];

export default function SignUp(){
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
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(requiredInfo)
      });

      const result = await response.json();
      if (!response.ok) throw new Error('Signup failed: ', result.Error);

      setMessage("Account created. Welcome to the EMPYREAN Rider's Guild.");
      e.currentTarget.reset();
      setIsRider(false);
    } catch (error){
      setMessage('Unable to create an account. Please try again.');
      console.error(error);
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
        <input name='password' type='password' required minLength={12} />
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
            {sections.map(section => (
              <option key={section} value={section}>{section}</option>
            ))}
          </select>
        </label>
      )}

      <button type='submit'>Sign Up</button>
      <p aria-live='polite'>{message}</p>
    </form>
  );
}