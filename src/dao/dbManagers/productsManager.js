const productsModel = require('../models/product.model')

class ProductsManager {

    constructor() { }

    async prepare() {

        if (productsModel.db.readyState !== 1) {
            throw new Error('must connect to mongodb!')
        }
    }

    async getAll(limit) {

        const products = limit
            ? await productsModel.find().limit(limit)
            : await productsModel.find()

        return products.map(d => d.toObject({ virtuals: true }))
    }

    async addProduct(title, price, thumbnail, code, stock) {
        try {

            await productsModel.create({
                title: title,
                price: price,
                thumbnail: thumbnail,
                code: code,
                stock: stock
            });


        } catch (err) {
            throw new Error(err.message);
        }
    }

    async updateProduct(productId, updatedProductData) {
        try {
            const updatedProduct = await productsModel.findByIdAndUpdate(productId, updatedProductData, { new: true });

            if (!updatedProduct) {
                return { error: 'Producto no encontrado', status: 404 };
            }

            return updatedProduct.toObject({ virtuals: true });
        } catch (err) {
            throw new Error(err.message);
        }
    }

    async getProductById(productId) {
        try {
            const product = await productsModel.findById(productId);

            if (!product) {
                return null;
            }

            return product.toObject({ virtuals: true });
        } catch (err) {
            throw new Error(err.message);
        }
    }

    async deleteProductById(productId) {
        try {
            const result = await productsModel.findByIdAndDelete(productId);

            return result !== null;
        } catch (err) {
            throw new Error(err.message);
        }
    }

}

module.exports = ProductsManager