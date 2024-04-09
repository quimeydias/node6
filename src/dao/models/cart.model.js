const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    products: [{
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
            required: true
        },
        quantity: {
            type: Number,
            default: 1
        }
    }]
});


module.exports = mongoose.model('Carts', schema, 'carts')