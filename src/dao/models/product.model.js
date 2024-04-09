const mongoose = require('mongoose')

const schema = new mongoose.Schema({

    title: {
        type: String,
        //unique: true,
        required: true
    },


    price: {
        type: Number,
        required: true
    },

    thumbnail: {
        type: String,
        required: true,
    },

    code: {
        type: Number,
        required: true,

    },

    stock: {
        type: Number,
        required: true,

    }
})

schema.virtual('id').get(function () {
    return this._id.toString()
})

module.exports = mongoose.model('Products', schema, 'products')