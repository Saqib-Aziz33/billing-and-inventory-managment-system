const express = require('express')
const router = express.Router()
const inventoryController = require('../controllers/inventoryController')
const {validateItem, isAdmin} = require('../util/middlewares')

router.route('/')
    .get(inventoryController.getItems)
    .post(isAdmin ,validateItem, inventoryController.createItem);
router.get('/new', inventoryController.renderCreateItem)
router.route('/:id')
    .patch(isAdmin, inventoryController.updateItem)
    .delete(isAdmin, inventoryController.deleteItem);


router.get('/:id/edit', isAdmin, inventoryController.renderUpdateItem)

module.exports = router