const mongoose = require('mongoose')
const Joi = require('joi')

module.exports.User = mongoose.model('User', new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'name is required'],
        minlength: 5,
        maxlength: 50
    },
    email: {
        type: String,
        required: [true, 'name is required'],
        minlength: 5,
        maxlength: 60,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    created_at: {
        type: Date,
        default: new Date
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
}))


exports.validateSchema = Joi.object({
    username: Joi.string().required().min(5).max(40),
    email: Joi.string().required().min(5).max(60),
    password: Joi.string().required().min(6),
    confirm_password: Joi.ref('password')
})

exports.ValidateUpdate = Joi.object({
    username: Joi.string().min(5).max(40),
    email: Joi.string().min(5).max(60),
    password: Joi.string().min(6)
})