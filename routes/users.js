const express = require('express')
const router = express.Router()
const usersController = require('../controllers/usersController')
const {validateUser, isAdmin, isAuthenticated} = require('../util/middlewares')

router.route('/')
    .get(isAuthenticated, isAdmin, usersController.allUsers)
    .post(isAuthenticated, isAdmin, validateUser, usersController.createUser);

router.get('/new', usersController.renderCreateUser);

// router.post('/logout', homeController.logoutHandler);

module.exports = router