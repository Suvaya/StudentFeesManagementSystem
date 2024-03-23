const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const isAuthenticated  = require('../middlewares/isAuthenticated');

// Middleware for filtering by role
const filterByRole = (role) => async (req, res, next) => {
    req.roleFilter = { roles: role };
    next();
};

router.get('/students', filterByRole('student'), isAuthenticated, userController.getAllUsers);
router.get('/teachers', filterByRole('teacher'), userController.getAllUsers);
router.get('/studentsByTeacherSubjects', isAuthenticated, userController.getStudentsByTeacherSubjects);

router.route('/')
    .get(userController.getAllUsers)
    .post(userController.createUser);

router.route('/:id')
    .get(userController.getUserById)
    .put(userController.updateUserById)
    .delete(userController.deleteUserById);

module.exports = router;
