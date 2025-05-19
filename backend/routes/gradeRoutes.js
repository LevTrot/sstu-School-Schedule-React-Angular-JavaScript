const express = require('express');
const router = express.Router();
const controller = require('../controllers/gradeController');
const auth = require('../middleware/authMiddleware');

router.get('/all', auth(['admin', 'student', 'teacher']), controller.getAllGrades);
router.get('/', auth(['admin', 'student', 'teacher']), controller.getGrades);
router.post('/', auth(['admin']), controller.createGrade);
router.put('/:id', auth(['admin']), controller.updateGrade);
router.delete('/:id', auth(['admin']), controller.deleteGrade);

module.exports = router;
