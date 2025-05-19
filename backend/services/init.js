const pool = require('./db');

async function init() {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS students (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        class VARCHAR(50),
        role VARCHAR(20) DEFAULT 'student'
      );

      CREATE TABLE IF NOT EXISTS teachers (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        role VARCHAR(20) DEFAULT 'teacher'
      );

      CREATE TABLE IF NOT EXISTS subjects (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        description TEXT
      );

      CREATE TABLE IF NOT EXISTS schedules (
        id SERIAL PRIMARY KEY,
        subject_id INTEGER REFERENCES subjects(id),
        teacher_id INTEGER REFERENCES teachers(id),
        class VARCHAR(50),
        day_of_week VARCHAR(20),
        start_time TIME,
        end_time TIME
      );

      CREATE TABLE IF NOT EXISTS grades (
        id SERIAL PRIMARY KEY,
        student_id INTEGER REFERENCES students(id),
        subject_id INTEGER REFERENCES subjects(id),
        grade INTEGER CHECK (grade >= 1 AND grade <= 5),
        date DATE DEFAULT CURRENT_DATE
      );
    `);

    console.log('Все таблицы успешно созданы!');
  } catch (err) {
    console.error('Ошибка при создании таблиц:', err);
  } finally {
    pool.end();
  }
}

init();