const model = require('../models/scheduleModel');

// Массовое создание расписания
exports.createSchedule = async (req, res) => {
  try {
    const entries = req.body; // массив записей расписания
    const result = await model.createSchedule(entries);
    res.status(201).json(result);
  } catch (error) {
    console.error('Error creating schedule:', error);
    res.status(500).json({ message: 'Ошибка при создании расписания' });
  }
};

// Получить расписание по классу
exports.getScheduleByClass = async (req, res) => {
  try {
    const className = req.params.class;
    const schedule = await model.getScheduleByClass(className);
    res.status(200).json(schedule);
  } catch (error) {
    console.error('Error fetching schedule:', error);
    res.status(500).json({ message: 'Ошибка при получении расписания' });
  }
};

// Получить расписание по предмету
exports.getScheduleBySubject = async (req, res) => {
  try {
    const subject = req.params.class;
    const schedule = await model.getScheduleBySubject(subject);
    res.status(200).json(schedule);
  } catch (error) {
    console.error('Error fetching schedule:', error);
    res.status(500).json({ message: 'Ошибка при получении расписания' });
  }
};

exports.deleteSchedule = async (req, res) => {
  await model.deleteSchedule(req.params.id);
  res.status(204).send();
}