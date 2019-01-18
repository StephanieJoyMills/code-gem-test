const products = require("./products");
const shoppingCart = require("./shopping_cart");

module.exports = function(app) {
  products(app);
  shoppingCart(app);
};
