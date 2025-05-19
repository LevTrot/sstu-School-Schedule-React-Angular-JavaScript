const pool = require('../services/db');

const createUser = async (name, email, password, role, className = null) => {
  if (role === 'student') {
    const result = await pool.query(
      'INSERT INTO students (name, email, password, role, class) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [name, email, password, role, className]
    );
    return result.rows[0];
  } else if (role === 'teacher') {
    const result = await pool.query(
      'INSERT INTO teachers (name, email, password, role) VALUES ($1, $2, $3, $4) RETURNING *',
      [name, email, password, role]
    );
    return result.rows[0];
  } else {
    throw new Error('Invalid role');
  }
};

const findUserByEmail = async (email) => {
  const result = await pool.query(
    'SELECT * FROM students WHERE email = $1',
    [email]
  );
  return result.rows[0];
};

const findUserByName = async (name) => {
  // Сначала пробуем найти в таблице студентов
  let result = await pool.query('SELECT * FROM students WHERE name = $1', [name]);

  // Если не найдено — пробуем найти в таблице преподавателей
  if (result.rows.length === 0) {
    result = await pool.query('SELECT * FROM teachers WHERE name = $1', [name]);
  }

  return result.rows[0];
};

module.exports = { createUser, findUserByEmail, findUserByName };
