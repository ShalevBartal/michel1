import React, { useState } from 'react';
import './Login.css';

const Login = ({ onLogin }) => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    // Updated credentials with an added 'Coordinator' account
    const credentials = {
      '209145621': { password: 'Michel123', role: 'CEO' },
      '234437652': { password: 'Michel124', role: 'SeniorCoordinator' },
      '209947942': { password: 'Michel125', role: 'Coordinator' }  // New account
    };

    // Check if entered ID exists and password matches
    if (credentials[id] && credentials[id].password === password) {
      onLogin({ id, role: credentials[id].role });
    } else {
      setErrorMessage('Invalid ID or Password');
    }
  };

  return (
    <div className="login-container">
      <div className="welcome-container">
        <h1>Welcome to Michel Levin Operation System</h1>
      </div>
      <form onSubmit={handleSubmit} className="login-form">
        <label htmlFor="id">ID:</label>
        <input 
          type="text" 
          name="id" 
          value={id} 
          onChange={(e) => setId(e.target.value)} 
          required 
        />

        <label htmlFor="password">Password:</label>
        <input 
          type="password" 
          name="password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          required 
        />

        {errorMessage && <div className="error-message">{errorMessage}</div>}

        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
