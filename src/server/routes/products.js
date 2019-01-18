const {
    getProducts,
    productInventory,
    purchaseProduct
  } = require('../../db-service');

module.exports = async function(app) {
    // get the metadata of the sets: name and id of set, total kitties required to completed set, and count of users kitties in each set
    app.get('/products', async (req, res, next) => {
      const { limit, offset, available } = req.query;
      try {
        const products = await getProducts(limit, offset, available);
        return res.send({ products });
      } catch (err) {
        console.log(
          {
            err,
          },
          'Failed to retrieve product data',
        );
        next(err);
      }
    });

        app.patch('/purchase/product/:product_id', async (req, res, next) => {
          const productId = req.params.product_id;
          try {
            const currentInventory = await productInventory(productId);
            console.log(currentInventory)

            if (!currentInventory){
              const err = {err: `Product:${productId} is an invalid item`}
              console.log(err)
              res.status(404).send(err)
              next(err)
            }

            if (currentInventory.inventory_count < 1){
              const err = {err: `Product:${productId} is out of stock`}
              console.log(err)
              res.status(400).send(err)
              next(err)
            }

            const updatedInventory = currentInventory.inventory_count - 1;
            const updatedProduct = await purchaseProduct(productId, updatedInventory);
            if (!updatedProduct){
              const err = {err: `Product:${productId} purchase failed`}
              console.log(err)
              res.status(400).send(err)
            }
            res.status(200).send(updatedProduct);
          } catch (err) {
            console.log(
              {
                err,
              },
              `Failed to purchase product: ${productId}`,
            );
            next(err);
          }
        });
}