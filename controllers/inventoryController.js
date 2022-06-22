const {Item} = require('../models/item')
const _ = require('lodash')

exports.getItems = async(req, res) => {
    try {
        const items = await Item.find()
        res.render('inventory/index', {items})
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
        req.flash('success', 'item added in inventory')
        res.redirect('/inventory')
    } catch (error) {
        res.send(error.message)
    }
}

exports.getItem = async(req, res) => {
    res.send(req.url)
}

exports.renderUpdateItem = async(req, res) => {
    try {
        const item = await Item.findById(req.params.id)
        res.render('inventory/edit', {item})
    } catch (error) {
        req.flash('error', error.message)
        res.redirect('/inventory')
    }
}
exports.updateItem = async(req, res) => {
    try {
        await Item.findByIdAndUpdate(req.params.id, _.pick(req.body, ['price', 'stock', 'manufacturer', 'manufacturer_price']), {runValidators: true})
        req.flash('success', 'Item updated')
        res.redirect(`/inventory/${req.params.id}/edit`)
    } catch (error) {
        req.flash('error', error.message)
        res.redirect('/inventory')
    }
}

exports.deleteItem = async(req, res) => {
    try {
        await Item.findByIdAndDelete(req.params.id)
        req.flash('success', 'Item deleted')
        res.redirect('/inventory')
    } catch (error) {
        req.flash('error', error.message)
        res.redirect('/inventory')
    }
}