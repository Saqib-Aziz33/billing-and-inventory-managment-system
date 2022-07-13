const userModel = require('../models/user')
const {User} = userModel
const {Bill} = require('../models/bill')
const _ = require('lodash')
const bcrypt = require('bcrypt')


exports.allUsers = async (req, res) => {
    try {
        const users = await User.find({isAdmin: {$ne: true}})
        const bills = await Bill.find({})
        res.render('users/index', {users, bills})
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

exports.updateUser = async (req, res) => {
    try {
        if(req.body.password && req.body.password.length > 5){
            const password = await bcrypt.hash(req.body.password, 12)
            await User.findByIdAndUpdate(req.params.id, {..._.pick(req.body, ['username', 'email']), password}, {runValidators: true})
            req.flash('success', 'user updated')
            return res.redirect('/users')
        }
        await User.findByIdAndUpdate(req.params.id, _.pick(req.body, ['username', 'email']), {runValidators: true})
        req.flash('success', 'user updated')
        res.redirect('/users')
    } catch (error) {
        res.send(error.message)
    }
}

exports.deleteUser = async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id)
        req.flash('success', 'user deleted')
        res.redirect('/users')
    } catch (error) {
        res.send(error.message)
    }
}