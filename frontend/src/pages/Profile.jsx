import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ProfilePage.css';
import { useNavigate } from 'react-router-dom'; 

function ProfilePage() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get('http://localhost:8080/api/users/me', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        setUser(res.data);
        //setLoading(false);
      } catch (err) {
        console.error('Failed to fetch user', err);
      }
    };

    fetchUser();
  }, []);

  const logout = () => {
    localStorage.clear();
    navigate('/login');
  };

  if (!user) return <div className="profile-container">Loading...</div>;

  return (
    <div className="profile-container">
      <h2>Личный кабинет</h2>
      <p><strong>Имя:</strong> {user.name}</p>
      <p><strong>Email:</strong> {user.email}</p>
      {user.class && <p><strong>Класс:</strong> {user.class}</p>}

      <div className="button-group">
        <button onClick={logout}>Выход</button>
        {user.role === 'admin' && (
          <button onClick={() => window.location.href='http://localhost:4200/'}>Админ-панель</button>
        )}
      </div>
    </div>
  );
}

export default ProfilePage;