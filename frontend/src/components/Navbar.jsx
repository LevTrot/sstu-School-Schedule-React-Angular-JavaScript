import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <nav>
  <NavLink to="/schedule" className={({ isActive }) => isActive ? 'active' : ''}>Расписание</NavLink>
  <NavLink to="/grades" className={({ isActive }) => isActive ? 'active' : ''}>Успеваемость</NavLink>
  <NavLink to="/profile" className={({ isActive }) => isActive ? 'active' : ''}>Личный кабинет</NavLink>
  <button onClick={handleLogout}>Выход</button>
</nav>

  );
};

export default Navbar;
