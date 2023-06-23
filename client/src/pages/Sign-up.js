import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Signup() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      const req = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      };
      const res = await fetch('/api/auth/sign-up', req);
      const result = await res.json();
      if (!res.ok) {
        throw new Error(result.error);
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <main className="sign-up-sign-in">
      <h2>Sign Up</h2>
      <form className="sign-up-sign-in-form" onSubmit={handleSubmit}>
        <div>
          <input
            placeholder="Enter Username"
            required
            className="sign-up-sign-in-name"
            id="sign-up-name"
            type="text"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
          />
        </div>
        <div>
          <input
            placeholder="Enter Password"
            required
            className="sign-up-sign-in-password"
            id="sign-up-email"
            name="password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>
        <div className="sign-up-sign-in-cancel-submit">
          <Link to="/sign-in"> Have an account </Link>
          <button> Sign Up </button>
        </div>
      </form>
    </main>
  );
}
