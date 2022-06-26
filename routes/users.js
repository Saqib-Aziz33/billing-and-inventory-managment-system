const express = require('express')
const router = express.Router()
const usersController = require('../controllers/usersController')
const {validateUser} = require('../util/middlewares')

router.route('/')
    .get(usersController.allUsers)
    .post(validateUser, usersController.createUser);

router.get('/new', usersController.renderCreateUser);

// router.post('/logout', homeController.logoutHandler);

module.exports = router