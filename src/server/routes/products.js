const {
  getProducts,
  productInventory,
  purchaseProduct
} = require("../../db-service");

module.exports = async function(app) {
  app.get("/products", async (req, res, next) => {
    const { limit, offset, available } = req.query;

    try {
      const products = await getProducts(limit, offset, available);
      res.send({ products });
    } catch (err) {
      console.log(
        {
          err
        },
        "Failed to retrieve product data"
      );
      next(err);
    }
  });

  app.patch("/product/:product_id/purchase", async (req, res, next) => {
    const productId = req.params.product_id;

    try {
      const currentInventory = await productInventory(productId);

      if (!currentInventory) {
        const err = { err: `Product:${productId} is an invalid item` };
        console.log(err);
        res.status(404).send(err);
      }

      if (currentInventory.inventory_count < 1) {
        const err = { err: `Product:${productId} is out of stock` };
        console.log(err);
        res.status(400).send(err);
        return;
      }

      const updatedInventory = currentInventory.inventory_count - 1;
      const updatedProduct = await purchaseProduct(productId, updatedInventory);

      if (!updatedProduct) {
        const err = { err: `Product:${productId} purchase failed` };
        console.log(err);
        res.status(400).send(err);
        return;
      }

      res.status(200).send(updatedProduct);
    } catch (err) {
      console.log(
        {
          err
        },
        `Failed to purchase product: ${productId}`
      );
      next(err);
    }
  });
};
