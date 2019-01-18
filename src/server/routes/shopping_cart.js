const {
  createCart,
  checkIfHasCart,
  checkIfProductInCart,
  addProductToCart
} = require("../../db-service");

module.exports = async function(app) {
  // Add to cart
  // is it in the cart already? if yes, increase the quanitity
  // Get Cart - total, products
  // Checkout
  //DONE Create Cart
  // remove item
  //change quanitity -> if 0 remve item

  app.post("/cart/create", async (req, res, next) => {
    const { name, email } = req.body;
    try {
      // check if email already attached to cart
      const hasCart = await checkIfHasCart(email);
      console.log(hasCart);
      if (hasCart) {
        const err = { err: `${email} already has a cart` };
        console.log(err);
        res.status(400).send(err);
        return;
      }

      const cart = await createCart(name, email);
      console.log(`Cart created!`);
      res.send(cart);
    } catch (err) {
      console.log(
        {
          err
        },
        "Failed to ceate a cart"
      );
      next(err);
    }
  });

  app.post("/cart/:cart_id/product/:product_id", async (req, res, next) => {
    const cartId = req.params.cart_id;
    const productId = req.params.product_id;
    console.log(cartId);
    try {
      // check if already in car
      const inCart = await checkIfProductInCart(cartId, productId);
      if (inCart) {
        const err = { err: `Item already in cart` };
        console.log(err);
        res.status(400).send(err);
        return;
      }

      const addToCart = await addProductToCart(cartId, productId);
      console.log(`Added to Cart!`);
      res.send(addToCart);
    } catch (err) {
      console.log(
        {
          err
        },
        "Failed to ceate a cart"
      );
      next(err);
    }
  });
};
