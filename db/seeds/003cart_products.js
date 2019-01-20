exports.seed = function(knex, Promise) {
  return knex("cart_products")
    .del()
    .then(function() {
      return knex("cart_products").insert([
        {
          product_id: "ef981413-8dac-41f6-8e49-7dfffba4e183",
          shopping_cart_id: "7da76898-8f53-40cb-be48-636d2535ad6c"
        }
      ]);
    });
};
