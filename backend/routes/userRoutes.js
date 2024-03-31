const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const isAuthenticated = require('../middlewares/isAuthenticated');

router.patch('/:userId/studsubjects', userController.addSubjectsToUser);
router.get('/role/teacher', userController.getTeachers);
router.get('/role/student', userController.getStudents);
router.get('/role/teacher/:id',isAuthenticated, userController.getTeacherById);
router.get('/role/student/:id', isAuthenticated, userController.getStudentById);
router.put('/:id/subjects/marks', userController.updateStudentSubjectMarks);
router.put('/:id/updateFields', userController.updateUserFields);
router.get('/students/mysubjects', isAuthenticated, userController.getStudentsByTeacherSubject);

router.get('/', userController.getAllUsers);
router.post('/', userController.createUser);
router.get('/:id', userController.getUserById);
router.put('/:id', userController.updateUserById);
router.delete('/:id', userController.deleteUserById);

module.exports = router;