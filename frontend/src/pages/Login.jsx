import React, { useState } from 'react';
import axios from 'axios';

function Login() {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  const login = async () => {
    try {
      const res = await axios.post('http://localhost:8080/api/auth/login', { name, password });
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('role', res.data.role);
      window.location.href = '/profile';
    } catch (err) {
      console.log('Invalid credentials');
    }
  };

  return (
    <div className="container">
      <h2>Login</h2>
      <input placeholder="Name" value={name} onChange={e => setName(e.target.value)} />
      <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
      <button onClick={login}>Login</button>
      <p>
        Don't have an account? <button onClick={() => window.location.href = '/register'}>Sign up</button>
      </p>
    </div>
  );
}

export default Login;
