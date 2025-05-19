const pool = require('../services/db');

// Создание одного расписания
exports.createScheduleEntry = async ({ subject_id, teacher_id, class: className, day_of_week, start_time, end_time }) => {
  const result = await pool.query(
    `INSERT INTO schedules (subject_id, teacher_id, class, day_of_week, start_time, end_time)
     VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
    [subject_id, teacher_id, className, day_of_week, start_time, end_time]
  );
  return result.rows[0];
};

// Массовое создание расписания (принимаем массив ячеек)
exports.createSchedule = async (entries) => {
  const results = [];
  for (const entry of entries) {
    const result = await exports.createScheduleEntry(entry);
    results.push(result);
  }
  return results;
};

exports.deleteSchedule = async (id) => {
  await pool.query('DELETE FROM schedules WHERE id = $1', [id]);
};

// Получение расписания опреленного класса
exports.getScheduleByClass = async (className) => {
  const result = await pool.query(
    `SELECT s.*, sub.name AS subject_name, t.name AS teacher_name
     FROM schedules s
     JOIN subjects sub ON s.subject_id = sub.id
     JOIN teachers t ON s.teacher_id = t.id
     WHERE s.class = $1
     ORDER BY 
       CASE 
         WHEN day_of_week = 'Понедельник' THEN 1
         WHEN day_of_week = 'Вторник' THEN 2
         WHEN day_of_week = 'Среда' THEN 3
         WHEN day_of_week = 'Четверг' THEN 4
         WHEN day_of_week = 'Пятница' THEN 5
         ELSE 6
       END,
       start_time`,
    [className]
  );
  return result.rows;
};

// Получение расписания по предмету
exports.getScheduleBySubject = async (subject) => {
  const result = await pool.query(
    `SELECT s.*, sub.name AS subject_name, t.name AS teacher_name
     FROM schedules s
     JOIN subjects sub ON s.subject_id = sub.id
     JOIN teachers t ON s.teacher_id = t.id
     WHERE s.subject_name = $1
     ORDER BY 
       CASE 
         WHEN day_of_week = 'Понедельник' THEN 1
         WHEN day_of_week = 'Вторник' THEN 2
         WHEN day_of_week = 'Среда' THEN 3
         WHEN day_of_week = 'Четверг' THEN 4
         WHEN day_of_week = 'Пятница' THEN 5
         ELSE 6
       END,
       start_time`,
    [subject]
  );
  return result.rows;
};