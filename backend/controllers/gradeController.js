const model = require('../models/gradeModel');

exports.getAllGrades = async (req, res) => {
  const grades = await model.getAllGrades();
  res.json(grades);
};

exports.getGrades = async (req, res) => {
  const rows = await model.getGrades();

  // Группируем по имени
  const grouped = {};
  for (const row of rows) {
    const name = row.student_name;
    if (!grouped[name]) {
      grouped[name] = [];
    }
    grouped[name].push(row.grade);
  }

  // Преобразуем в массив
  const result = Object.entries(grouped).map(([name, grades]) => ({
    name,
    grades
  }));

  res.json(result);
};

exports.createGrade = async (req, res) => {
  const grade = await model.createGrade(req.body);
  res.status(201).json(grade);
};

exports.updateGrade = async (req, res) => {
  const grade = await model.updateGrade(req.params.id, req.body);
  res.json(grade);
};

exports.deleteGrade = async (req, res) => {
  await model.deleteGrade(req.params.id);
  res.status(204).send();
};
