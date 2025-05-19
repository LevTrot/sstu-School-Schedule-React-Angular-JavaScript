import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('student');
  const [className, setClassName] = useState('');
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      await axios.post('http://localhost:8080/api/auth/register', {
        name,
        email,
        password,
        role,
        class: role === 'student' ? className : undefined
      });
      console.log('Registration successful');
      navigate('/login');
    } catch (err) {
      console.log('Registration failed: ' + err.response?.data?.message || err.message);
    }
  };

  return (
  <div className="container">
    <h2>Register</h2>
    <input placeholder="Name" value={name} onChange={e => setName(e.target.value)} />
    <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
    <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
    <select value={role} onChange={e => setRole(e.target.value)}>
      <option value="student">Student</option>
      <option value="teacher">Teacher</option>
    </select>
    {role === 'student' && (
      <input placeholder="Class" value={className} onChange={e => setClassName(e.target.value)} />
    )}
    <button onClick={handleRegister}>Register</button>
    <p>
      Already have an account? <button onClick={() => navigate('/login')}>Login</button>
    </p>
  </div>
);

}

export default Register;

