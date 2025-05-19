const pool = require('../services/db');

exports.getAllGrades = async () => {
  const result = await pool.query('SELECT * FROM grades');
  return result.rows;
};

exports.getGrades = async () => {
  const result = await pool.query(`
    SELECT s.name AS student_name, g.grade
    FROM grades g
    JOIN students s ON g.student_id = s.id
  `);
  return result.rows;
};

exports.createGrade = async ({ student_id, subject_id, grade, date }) => {
  const result = await pool.query(
    'INSERT INTO grades (student_id, subject_id, grade, date) VALUES ($1, $2, $3, $4) RETURNING *',
    [student_id, subject_id, grade, date]
  );
  return result.rows[0];
};

exports.updateGrade = async (id, { student_id, subject_id, grade, date }) => {
  const result = await pool.query(
    'UPDATE grades SET student_id = $1, subject_id = $2, grade = $3, date = $4 WHERE id = $5 RETURNING *',
    [student_id, subject_id, grade, date, id]
  );
  return result.rows[0];
};

exports.deleteGrade = async (id) => {
  await pool.query('DELETE FROM grades WHERE id = $1', [id]);
};
