const subjectModel = require('../models/subjectModel');

exports.getSubjects = async (req, res) => {
  const subjects = await subjectModel.getAllSubjects();
  res.json(subjects);
};

exports.createSubject = async (req, res) => {
  const { name } = req.body;
  const subject = await subjectModel.createSubject(name);
  res.status(201).json(subject);
};

exports.updateSubject = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const subject = await subjectModel.updateSubject(id, name);
  res.json(subject);
};

exports.deleteSubject = async (req, res) => {
  const { id } = req.params;
  await subjectModel.deleteSubject(id);
  res.status(204).send();
};
