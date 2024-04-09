const { Router } = require('express');

const router = Router();



router.get('/', async (req, res) => {
  const cartManager = req.app.get('cartsManager')
  try {
    const carts = await cartManager.getCarts();
    res.status(200).json(carts);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get('/:cartId', async (req, res) => {
  const cartManager = req.app.get('cartsManager')
  const cartId = req.params.cartId;
  try {
    const cart = await cartManager.getCartById(cartId);
    if (cart.error) {
      res.status(cart.status).json({ error: cart.error });
    } else {
      res.status(200).json(cart);
    }
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.post('/', async (req, res) => {
  const cartManager = req.app.get('cartsManager')
  try {
    const result = await cartManager.createCart();
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.put('/:cartId/products/:productId', async (req, res) => {
  const cartManager = req.app.get('cartsManager')
  const { cartId, productId } = req.params;
  const { quantity } = req.body;
  try {
    const result = await cartManager.addProductToCart(cartId, productId, quantity);
    res.status(200).json({ message: result });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.delete('/:cartId/products/:productId', async (req, res) => {
  const cartManager = req.app.get('cartsManager')
  const { cartId, productId } = req.params;
  try {
    const result = await cartManager.removeProductFromCart(cartId, productId);
    res.status(200).json({ message: result });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;