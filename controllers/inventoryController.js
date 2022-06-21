const {Item} = require('../models/item')

exports.getItems = async(req, res) => {
    try {
        const items = await Item.find()
        res.send(items)
    } catch (error) {
        res.send('error')
    }
}

exports.renderCreateItem = (req, res) => {
    res.render('inventory/new')
}
exports.createItem = async (req, res) => {
    try {
        const item = new Item(req.body)
        await item.save()
        res.redirect('/inventory')
    } catch (error) {
        res.send(error.message)
    }
}

exports.getItem = async(req, res) => {
    res.send(req.url)
}

exports.renderUpdateItem = async(req, res) => {
    res.send(req.url)
}
exports.updateItem = async(req, res) => {
    res.send(req.url)
}

exports.deleteItem = async(req, res) => {
    res.send(req.url)
}