const {Item} = require('../models/item')
const _ = require('lodash')
const itemModel = require('../models/item')

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

exports.renderUpdateItem = async(req, res) => {
    try {
        const isFound = await findItem(req.params.id)
        if(!isFound){
            req.flash('error', 'Item not found')
            return res.redirect('/inventory')
        }
        // const item = await Item.findById(req.params.id)
        res.render('inventory/edit', {item: isFound})
    } catch (error) {
        req.flash('error', error.message)
        res.redirect('/inventory')
    }
}
exports.updateItem = async(req, res) => {
    try {
        // validate request data
        const {error} = itemModel.ValidateUpdate.validate(req.body)
        if(error){
            req.flash('error', error.message)
            return res.redirect(`/inventory/${req.params.id}/edit`)
        }
        const isFound = await findItem(req.params.id)
        if(!isFound){
            req.flash('error', 'Item not found')
            return res.redirect('/inventory')
        }
        await Item.findByIdAndUpdate(req.params.id, {..._.pick(req.body, ['price', 'stock', 'manufacturer', 'manufacturer_price']), modified_date: new Date}, {runValidators: true})
        req.flash('success', 'Item updated')
        res.redirect(`/inventory/${req.params.id}/edit`)
    } catch (error) {
        req.flash('error', error.message)
        res.redirect('/inventory')
    }
}

exports.deleteItem = async(req, res) => {
    try {
        const isFound = await findItem(req.params.id)
        if(!isFound){
            req.flash('error', 'Item not found')
            return res.redirect('/inventory')
        }
        await Item.findByIdAndDelete(req.params.id)
        req.flash('success', 'Item deleted')
        res.redirect('/inventory')
    } catch (error) {
        req.flash('error', error.message)
        res.redirect('/inventory')
    }
}

// impure
async function findItem(id){
    try {
        const data = await Item.findById(id)
        if(!data){
            return false
        }
        return data
    } catch (error) {
        console.log(error.message)
    }
}