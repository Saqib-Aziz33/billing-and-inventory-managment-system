const express = require('express')
const router = express.Router()
const inventoryController = require('../controllers/inventoryController')

router.route('/')
    .get(inventoryController.getItems)
    .post(inventoryController.createItem);

router.route('/:id')
    .get(inventoryController.getItem)
    .put(inventoryController.updateItem)
    .delete(inventoryController.deleteItem);

router.post('/:id/edit', inventoryController.renderUpdateItem)

module.exports = router