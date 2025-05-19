import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './GradesPage.css';

const GradesPage = () => {
  const [students, setStudents] = useState([]);
  const [searchName, setSearchName] = useState('');
  const [filtered, setFiltered] = useState([]);

  useEffect(() => {
  const token = localStorage.getItem('token');

  axios.get('http://localhost:8080/api/grades', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  .then(res => {
    setStudents(res.data);
    setFiltered(res.data);
  })
  .catch(err => {
    console.error('Ошибка при получении оценок:', err);
    // Можно сделать перенаправление или показ сообщения об ошибке
  });
}, []);


  const handleSearch = () => {
    const lower = searchName.toLowerCase();
    const result = students.filter(s => s.name.toLowerCase().includes(lower));
    setFiltered(result);
  };

  const calculateAverage = (grades) => {
    if (!grades || grades.length === 0) return 0;
    const sum = grades.reduce((acc, val) => acc + val, 0);
    return sum / grades.length;
  };

  const calculatePercent = (avg) => {
    return Math.max(0, ((avg - 2) / 3) * 100);
  };

  return (
    <div className="grade-container">
      <div className="form-container">
        <input
          type="text"
          placeholder="Введите имя студента"
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
        />
        <button onClick={handleSearch}>Поиск</button>
      </div>

      <table>
        <thead>
          <tr>
            <th>Имя</th>
            <th>Оценки</th>
            <th>Средний балл</th>
            <th>Успеваемость (%)</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map(student => {
            const avg = calculateAverage(student.grades || []);
            return (
              <tr key={student.id}>
                <td>{student.name}</td>
                <td>{(student.grades || []).join(', ')}</td>
                <td>{avg.toFixed(1)}</td>
                <td>{calculatePercent(avg).toFixed(0)}%</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default GradesPage;
