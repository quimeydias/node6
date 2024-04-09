const { Router } = require('express');


const router = Router();



router.get('/', async (req, res) => {
    const limit = +req.query.limit;

    try {
        const productsManager = req.app.get('productsManager')

        if (limit) {
            const products = await productsManager.getAll(limit)
            res.status(200).json(products)
        } else {
            const products = await productsManager.getAll()
            res.status(200).json(products)

        }

    }
    catch (err) {
        return res.status(400).json({ success: err })
    }

});


//router.get('/realtimeproducts', async (req, res) => {

//  const result = await productM.getProducts()

//  const data = {

//    result,

//  }
//   res.render('realTimeProducts', data)
//res.send(result);

//});

router.post('/', async (req, res) => {
    const productData = req.body;

    try {
        const productsManager = req.app.get('productsManager');

        // Agregar el nuevo producto utilizando la función addProduct
        const result = await productsManager.addProduct(
            productData.title,
            productData.price,
            productData.thumbnail,
            productData.code,
            productData.stock
        );

        // Emitir evento de recarga al servidor WebSocket
        // const wsServer = req.app.get('ws');
        // wsServer.emit('reload', result);

        // Devolver el resultado como JSON
        res.status(200).json(result);
    } catch (err) {
        // Manejar errores
        res.status(400).json({ error: err.message });
    }
});


router.put('/:pid', async (req, res) => {
    const productId = req.params.pid;
    const productData = req.body;

    try {
        const productsManager = req.app.get('productsManager');

        const result = await productsManager.updateProduct(productId, productData);

        if (result.error) {
            return res.status(result.status).json({ error: result.error });
        }

        return res.json(result);
    } catch (err) {
        return res.status(400).json({ error: err.message });
    }
});

router.get('/:pid', async (req, res) => {
    const productId = req.params.pid;

    try {
        const productsManager = req.app.get('productsManager');

        const product = await productsManager.getProductById(productId);

        if (!product) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }

        return res.json(product);
    } catch (err) {
        return res.status(400).json({ error: err.message });
    }
});


router.delete('/:pid', async (req, res) => {
    const productId = req.params.pid;

    try {
        const productsManager = req.app.get('productsManager');

        const result = await productsManager.deleteProductById(productId);

        if (!result) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }

        return res.json({ message: 'Producto eliminado correctamente' });
    } catch (err) {
        return res.status(400).json({ error: err.message });
    }
});

module.exports = router;