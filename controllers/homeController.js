const {User} = require('../models/user')
const bcrypt = require('bcrypt')
const _ = require('lodash')

exports.renderLogin = (req, res) => {
    res.render('login')
}

exports.loginHandler = async (req, res) => {
    try {
        const user = await User.findOne({email: req.body.email})
        if(!user){
            req.flash('error', 'incorrect email or password')
            return res.redirect('/login')
        }
        const matchPassword  = await bcrypt.compare(req.body.password, user.password)
        if(!matchPassword){
            req.flash('error', 'incorrect email or password')
            return res.redirect('/login')
        }
        req.session.user = _.pick(user, '_id', 'username', 'isAdmin')
        req.flash('success', 'welcome to billing application')
        res.redirect('/inventory')
    } catch (error) {
        res.send(error.message)
    }
}

exports.logoutHandler = (req, res) => {
    req.session.destroy()
    res.redirect('/login')
}

exports.errorHandler = (req, res) => {
    res.render('error')
}