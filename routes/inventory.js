const express = require('express')
const router = express.Router()
const inventoryController = require('../controllers/inventoryController')
const {validateItem} = require('../util/middlewares')

router.route('/')
    .get(inventoryController.getItems)
    .post(validateItem, inventoryController.createItem);
router.get('/new', inventoryController.renderCreateItem)
router.route('/:id')
    .get(inventoryController.getItem)
    .put(inventoryController.updateItem)
    .delete(inventoryController.deleteItem);

router.post('/:id/edit', inventoryController.renderUpdateItem)

module.exports = router