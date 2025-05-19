const express = require('express');
const router = express.Router();
const subjectController = require('../controllers/subjectController');
const auth = require('../middleware/authMiddleware');

router.get('/', auth(['admin', 'student', 'teacher']), subjectController.getSubjects);
router.post('/', auth(['admin']), subjectController.createSubject);
router.put('/:id', auth(['admin']), subjectController.updateSubject);
router.delete('/:id', auth(['admin']), subjectController.deleteSubject);

module.exports = router;
