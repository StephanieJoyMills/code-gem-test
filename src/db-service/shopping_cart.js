const { knex } = require("./knex");

exports.createCart = async (name, email) => {
  const result = await knex("shopping_carts")
    .insert({
      owner_name: name,
      owner_email: email
    })
    .returning(["id", "owner_email", "owner_name"]);
  return result[0];
};

exports.checkIfHasCart = async email => {
  const result = await knex("shopping_carts")
    .select("id")
    .where({ owner_email: email });
  return result.length > 0 ? true : false;
};

exports.addProductToCart = async (cartId, productId) => {
  const result = await knex("cart_products")
    .insert({
      shopping_cart_id: cartId,
      product_id: productId
    })
    .returning("*");
  return result[0];
};

exports.checkIfProductInCart = async (cartId, productId) => {
  const result = await knex("cart_products")
    .select("*")
    .where({ shopping_cart_id: cartId, product_id: productId });
  return result.length > 0 ? true : false;
};
