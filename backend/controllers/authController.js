const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const pool = require('../services/db');
const { createUser, findUserByEmail, findUserByName } = require('../models/userModel');


const SECRET = 'secret_key'; // можно позже в .env

exports.register = async (req, res) => {
  const { name, email, password, role, class: className } = req.body;

  console.log('REGISTER BODY:', req.body);
  if (!name || !email || !password || !role) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    // Проверка роли - используем кон кретную таблицу
    const table = role === 'student' ? 'students' : 'teachers';
    const existing = await pool.query(`SELECT * FROM ${table} WHERE name = $1`, [name]);
    if (existing.rows.length > 0) {
      return res.status(409).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    //Передаем null вместо className, если роль не student
    const userToCreate = {
      name,
      email,
      password: hashedPassword,
      role,
      className: role === 'student' ? className : null,
    };

    const newUser = await createUser(
      userToCreate.name,
      userToCreate.email,
      userToCreate.password,
      userToCreate.role,
      userToCreate.className
    );

    res.status(201).json({ message: 'User created', user: newUser });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.login = async (req, res) => {
  const { name, password } = req.body;
  try {
    const user = await findUserByName(name);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).json({ message: 'Invalid password' });

    const token = jwt.sign({ id: user.id, role: user.role, name: user.name }, SECRET, { expiresIn: '1h' });
    res.json({ message: 'Login successful', token });
  } catch (err) {
    res.status(500).json({ message: 'Login error', error: err.message });
  }
};
