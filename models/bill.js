const mongoose = require('mongoose')
const Joi = require('joi')

module.exports.Bill = mongoose.model('Bill', new mongoose.Schema({
    customer_name: {
        type: String,
        required: true
    },
    customer_phone: String,
    items: [
        {
            _id: false,
            name: {
                type: String,
                required: true
            },
            quantity: {
                type: Number,
                default: 1
            },
            price: {
                type: Number,
                required: true
            },
            total: {
                type: Number,
                required: true
            },
            item_id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Item',
                required: true
            }
        }
    ],
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    grandTotal: {
        type: Number,
        min: 0,
        required: true
    },
    created_at: {
        type: Date,
        default: new Date
    },
    modified_at: {
        type: Date,
        default: new Date
    }
}))
