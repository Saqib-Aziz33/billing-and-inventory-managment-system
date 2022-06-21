const mongoose = require('mongoose')

module.exports.Item = mongoose.model('Item', new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'name is required'],
        minlength: 5
    },
    manufacturer: String,
    manufacturer_price: {
        type: Number,
        required: true,
        min: 0
    },
    price: {
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