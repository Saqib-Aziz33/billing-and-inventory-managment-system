const express = require('express')
const router = express.Router()
const usersController = require('../controllers/usersController')
const {validateUser, isAdmin, isAuthenticated} = require('../util/middlewares')

router.route('/')
    .get(isAdmin, usersController.allUsers)
    .post(isAdmin, validateUser, usersController.createUser);

router.get('/new', usersController.renderCreateUser);

router.route('/:id')
    .patch(isAdmin, usersController.updateUser)
    .delete(isAdmin, usersController.deleteUser);


module.exports = router