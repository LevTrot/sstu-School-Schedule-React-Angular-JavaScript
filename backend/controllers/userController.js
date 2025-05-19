const pool = require('../services/db');

const getCurrentUser = async (req, res) => {
  const name = req.user.name;
  try {
    let result = await pool.query('SELECT * FROM students WHERE name = $1', [name]);

    if (result.rows.length === 0) {
      result = await pool.query('SELECT * FROM teachers WHERE name = $1', [name]);
    }

    if (result.rows.length === 0) return res.status(404).json({ message: 'User not found' });

    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {getCurrentUser};