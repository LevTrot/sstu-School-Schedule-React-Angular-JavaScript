const pool = require('../services/db');

exports.getStudent = async () => {
  const result = await pool.query('SELECT * FROM students');
  return result.rows;
};

exports.createStudent = async (data) => {
  const {name, email, password, studentClass, role } = data;
  const result = await pool.query(
    'INSERT INTO students (name, email, password, class, role) VALUES ($1, $2, $3, $4, $5) RETURNING *',
    [name, email, password, studentClass, role]
  );
  return result.rows[0];
};

exports.updateStudent = async (id, data) => {
  const { name, email, studentClass, role } = data;

  const current = await pool.query('SELECT password FROM students WHERE id = $1', [id]);
  const currentPassword = current.rows[0].password;

  const result = await pool.query(
    'UPDATE students SET name = $1, email = $2, password = $3, class = $4, role = $5 WHERE id = $6 RETURNING *',
    [name, email, currentPassword, studentClass, role, id]
  );

  return result.rows[0];
};


exports.deleteStudent = async (id) => {
  await pool.query('DELETE FROM students WHERE id = $1', [id]);
};