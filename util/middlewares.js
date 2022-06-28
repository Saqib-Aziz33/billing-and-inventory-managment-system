const itemModel = require('../models/item')
const userModel = require('../models/user')
const billModel = require('../models/bill')

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

exports.validateBill = (req, res, next) => {
    const {error} = billModel.validateSchema.validate(req.body)
    if(error){
        req.flash('error', error.message)
        return res.redirect('/bill/new')
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

exports.isAuthenticated = async(req, res, next) => {
    try {
        if(!req.session.user){
            req.flash('error', "login required")
            return res.redirect('/login')
        }
        req.user = await userModel.User.findById(req.session.user._id).select('-password')
        next()
    } catch (error) {
        res.send(error.message)
    }
}