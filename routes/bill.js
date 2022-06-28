const express = require('express')
const router = express.Router()
const billController = require('../controllers/billController')
const {isAdmin} = require('../util/middlewares')

// route chaining
router.route('/')
    .get(billController.allBills)
    .post(billController.createBill);

router.get('/new', billController.renderBillPage);
router.route('/:id')
    .get(billController.bill)
    .delete(isAdmin, billController.deleteBill)


router.get('/:id/print', billController.printHTML);

module.exports = router