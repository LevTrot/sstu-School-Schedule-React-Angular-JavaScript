const express = require('express');
const router = express.Router();
const controller = require('../controllers/studentController');
const auth = require('../middleware/authMiddleware');

router.get('/', auth(), controller.getStudent);
router.post('/', auth(['admin']), controller.createStudent);
router.put('/:id', auth(['admin']), controller.updateStudent);
router.delete('/:id', auth(['admin']), controller.deleteStudent);

module.exports = router;