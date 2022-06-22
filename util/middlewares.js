const itemModel = require('../models/item')

exports.validateItem = (req, res, next) => {
    const {error} = itemModel.validateSchema.validate(req.body)
    if(error){
        req.flash('error', error.message)
        return res.redirect('/inventory/new')
    }
    next()
}