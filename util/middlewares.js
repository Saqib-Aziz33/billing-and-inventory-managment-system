const itemModel = require('../models/item')

exports.validateItem = (req, res, next) => {
    const {error} = itemModel.validateSchema.validate(req.body)
    if(error){
        return res.send(error.message)
    }
    next()
}