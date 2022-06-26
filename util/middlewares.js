const itemModel = require('../models/item')
const userModel = require('../models/user')

exports.validateItem = (req, res, next) => {
    const {error} = itemModel.validateSchema.validate(req.body)
    if(error){
        req.flash('error', error.message)
        return res.redirect('/inventory/new')
    }
    next()
}

exports.validateUser = (req, res, next) => {
    const {error} = userModel.validateSchema.validate(req.body)
    if(error){
        req.flash('error', error.message)
        return res.redirect('/users/new')
    }
    next()
}