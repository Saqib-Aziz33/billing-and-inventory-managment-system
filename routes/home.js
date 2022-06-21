const express = require('express')
const router = express.Router()
const homeController = require('../controllers/homeController')

router.get('/', homeController.renderDashboard);

router.route('/login')
    .get(homeController.renderLogin)
    .post(homeController.loginHandler);

router.post('/logout', homeController.logoutHandler)

module.exports = router