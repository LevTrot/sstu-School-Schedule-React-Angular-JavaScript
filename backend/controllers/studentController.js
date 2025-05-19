const model = require('../models/studentModel');

exports.getStudent = async (req, res) => {
  const student = await model.getStudent();
  res.json(student);
};

exports.createStudent = async (req, res) => {
  const item = await model.createStudent(req.body);
  res.status(201).json(item);
};

exports.updateStudent = async (req, res) => {
  const item = await model.updateStudent(req.params.id, req.body);
  res.json(item);
};

exports.deleteStudent = async (req, res) => {
  await model.deleteStudent(req.params.id);
  res.status(204).send();
};