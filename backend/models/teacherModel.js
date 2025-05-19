const pool = require('../services/db');

exports.getTeacher = async () => {
  const result = await pool.query('SELECT * FROM teachers');
  return result.rows;
};

exports.createTeacher = async (data) => {
  const { name, email, password, role } = data;
  const result = await pool.query(
    'INSERT INTO teachers (name, email, password, role) VALUES ($1, $2, $3, $4) RETURNING *',
    [name, email, password, role]
  );
  return result.rows[0];
};

exports.updateTeacher = async (id, data) => {
  const { name, email, role } = data;

  const current = await pool.query('SELECT password FROM teachers WHERE id = $1', [id]);
  const currentPassword = current.rows[0].password;

  const result = await pool.query(
    'UPDATE teachers SET name = $1, email = $2, password = $3, role = $4 WHERE id = $5 RETURNING *',
    [name, email, currentPassword, role, id]
  );

  return result.rows[0];
};

exports.deleteTeacher = async (id) => {
  await pool.query('DELETE FROM teachers WHERE id = $1', [id]);
};