const userModel = require('../models/user')
const {User} = userModel
const _ = require('lodash')
const bcrypt = require('bcrypt')


exports.allUsers = async (req, res) => {
    try {
        const users = await User.find({isAdmin: {$ne: true}})
        res.render('users/index', {users})
    } catch (error) {
        res.send(error.message)
    }
}

exports.createUser = async (req, res) => {
    try {
        const user = new User(_.pick(req.body, ['username', 'email']))
        user.password = await bcrypt.hash(req.body.password, 12)
        await user.save()
        req.flash('success', 'user created successfully')
        res.redirect('/users')
    } catch (error) {
        res.send(error.message)
    }
}

exports.renderCreateUser = (req, res) => {
    res.render('users/new')
}