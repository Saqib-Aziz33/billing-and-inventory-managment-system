const express = require('express')
const router = express.Router()
const homeController = require('../controllers/homeController')

router.get('/', (req, res) => {})
router.route('/login')
.get(homeController.renderLogin)
.post(homeController.loginHandler);

router.post('/logout', homeController.logoutHandler)

router.get('/error', homeController.errorHandler);

module.exports = router