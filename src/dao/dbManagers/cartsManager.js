const Cart = require('../models/cart.model')

class CartManager {
    constructor() { }

    async prepare() {

        if (Cart.db.readyState !== 1) {
            throw new Error('must connect to mongodb!')
        }
    }
    async getCarts() {
        try {
            const carts = await Cart.find();
            return carts;
        } catch (err) {
            console.error('Error al obtener los carritos:', err);
            return [];
        }
    }

    async getCartById(cartId) {
        try {
            const cart = await Cart.findById(cartId);
            if (!cart) {
                return { error: 'No se encontró ningún carrito con ese ID', status: 404 };
            }
            return cart;
        } catch (err) {
            throw new Error(err.message);
        }
    }

    async createCart() {
        try {
            const newCart = await Cart.create({ products: [] });
            return { response: 'Nuevo carrito creado', cartId: newCart._id };
        } catch (err) {
            throw new Error(err.message);
        }
    }

    async addProductToCart(cartId, productId, quantity = 1) {
        try {
            const cart = await Cart.findById(cartId);
            if (!cart) {
                return 'No se encontró un carrito con el ID proporcionado.';
            }
            cart.products.push({ productId, quantity });
            await cart.save();
            return 'Producto agregado al carrito exitosamente.';
        } catch (err) {
            throw new Error(err.message);
        }
    }

    async removeProductFromCart(cartId, productId) {
        try {
            const cart = await Cart.findById(cartId);
            if (!cart) {
                return 'No se encontró un carrito con el ID proporcionado.';
            }
            cart.products = cart.products.filter(item => item.productId != productId);
            await cart.save();
            return 'Producto eliminado del carrito exitosamente.';
        } catch (err) {
            throw new Error(err.message);
        }
    }
}

module.exports = CartManager;