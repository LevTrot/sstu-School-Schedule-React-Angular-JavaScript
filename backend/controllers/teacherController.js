const model = require('../models/teacherModel');

exports.getTeacher = async (req, res) => {
  const student = await model.getTeacher();
  res.json(student);
};

exports.createStudent = async (req, res) => {
  const item = await model.createTeacher(req.body);
  res.status(201).json(item);
};

exports.updateTeacher = async (req, res) => {
  const item = await model.updateTeacher(req.params.id, req.body);
  res.json(item);
};

exports.deleteTeacher = async (req, res) => {
  await model.deleteTeacher(req.params.id);
  res.status(204).send();
};