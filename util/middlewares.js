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

exports.isAdmin = (req, res, next) => {
    if(!req.session.user.isAdmin){
        req.flash('error', "you don't have this permission")
        return res.redirect('/error')
    }
    next()
}

exports.isAuthenticated = (req, res, next) => {
    if(!req.session.user){
        req.flash('error', "login required")
        return res.redirect('/login')
    }
    next()
}