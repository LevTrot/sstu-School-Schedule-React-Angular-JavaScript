const express = require('express');
const router = express.Router();
const controller = require('../controllers/teacherController');
const auth = require('../middleware/authMiddleware');

router.get('/', auth(), controller.getTeacher);
router.post('/', auth(['admin']), controller.createStudent);
router.put('/:id', auth(['admin']), controller.updateTeacher);
router.delete('/:id', auth(['admin']), controller.deleteTeacher);

module.exports = router;