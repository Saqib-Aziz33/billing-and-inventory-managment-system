const mongoose = require('mongoose')
const Joi = require('joi')

module.exports.Item = mongoose.model('Item', new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'name is required'],
        minlength: 5,
        maxlength: 60
    }, 
    price: {
        type: Number,
        required: true,
        min: 0
    },
    manufacturer: String,
    manufacturer_price: {
        type: Number,
        required: true,
        min: 0
    },
    created_date: {
        type: Date,
        default: new Date
    },
    modified_date: {
        type: Date,
        default: new Date
    },
    stock: {
        type: Number,
        min: 0
    }
}))


exports.validateSchema = Joi.object({
    name: Joi.string().required().min(5).max(60),
    price: Joi.number().required().min(0),
    manufacturer: Joi.string().max(60),
    manufacturer_price: Joi.number().required().min(0),
    stock: Joi.number().min(0)
})