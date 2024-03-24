const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const isAuthenticated = require('../middlewares/isAuthenticated');

router.get('/role/teacher', userController.getTeachers);
router.get('/role/student', userController.getStudents);

router.put('/:id/updateFields', userController.updateUserFields);
router.get('/students/mysubjects', isAuthenticated, userController.getStudentsByTeacherSubject);


router.get('/', userController.getAllUsers);
router.post('/', userController.createUser);
router.get('/:id', userController.getUserById);
router.put('/:id', userController.updateUserById);
router.delete('/:id', userController.deleteUserById);

module.exports = router;
