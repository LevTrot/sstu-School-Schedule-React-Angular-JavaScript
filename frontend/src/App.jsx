import './App.css';
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import SchedulePage from './pages/Schedule';
import GradesPage from './pages/Grades';
import ProfilePage from './pages/Profile';
import PrivateRoute from './components/PrivateRoute';
import Navbar from './components/Navbar';
import './styles/Main.css'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={ <PrivateRoute> <><Navbar /> <div style={{ padding: '1rem' }}> <Outlet /> </div> </> </PrivateRoute> } >
          <Route path="schedule" element={<SchedulePage />} />
          <Route path="grades" element={<GradesPage />} />
          <Route path="profile" element={<ProfilePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
