const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')

router.route('/')
    .get(userController.getAllUsers)
    .post(userController.createUser)

router.route('/:id').get(userController.getUserById)

router.route('/:id').put(userController.updateUserById)

router.route('/:id').delete(userController.deleteUserById)


module.exports = router