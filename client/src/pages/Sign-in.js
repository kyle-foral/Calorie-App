import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function SignIn() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      const formData = new FormData(event.target);
      const userData = Object.fromEntries(formData.entries());
      const req = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      };
      const res = await fetch('/api/food', req);
      if (!res.ok) {
        throw new Error(`fetch Error ${res.status}`);
      }
      const user = await res.json();
      console.log('Registered', user);
    } catch (err) {
      console.error(`Error: ${err}`);
    }
  }

  //   function handleUsername(event){
  //     const value = event.taget.value
  //     setUsername(value)
  //   }
  //   function handlePassword(event){
  //   const value = event.target.value
  //   setPassword(value)
  // }

  return (
    <main className="sign-up-sign-in">
      <h2>Sign In</h2>
      <form className="sign-up-sign-in-form" onSubmit={handleSubmit}>
        <div>
          <input
            placeholder="Enter Username"
            required
            className="sign-up-sign-in-name"
            id="sign-up-email"
            name="email"
            type="email"
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
          <Link to="/sign-up"> Need an Account </Link>
          <button> Sign In </button>
        </div>
      </form>
    </main>
  );
}
