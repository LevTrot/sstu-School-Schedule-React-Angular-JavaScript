const express = require('express');
const router = express.Router();
const controller = require('../controllers/scheduleController');
const auth = require('../middleware/authMiddleware');

router.post('/', auth(['admin']), controller.createSchedule);
router.get('/:class', auth(['admin', 'student', 'teacher']), controller.getScheduleByClass);
router.get('/:subject', auth(['admin', 'student', 'teacher']), controller.getScheduleBySubject);
router.delete('/:id', auth(['admin']), controller.deleteSchedule);

module.exports = router;
