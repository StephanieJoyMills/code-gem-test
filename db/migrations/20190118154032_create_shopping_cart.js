exports.up = async function(knex, Promise) {
  let exists = await knex.schema.hasTable("shopping_carts");
  if (!exists) {
    return knex.schema
      .createTable("shopping_carts", function(table) {
        table
          .uuid("id")
          .defaultTo(knex.raw("uuid_generate_v4()"))
          .primary();
        table
          .string("owner_email")
          .notNullable()
          .unique();
        table.string("owner_name").notNullable();
        table
          .timestamp("created_at")
          .notNullable()
          .defaultTo(knex.fn.now());
      })
      .then(async function() {
        exists = await knex.schema.hasTable("cart_products");
        if (!exists) {
          return knex.schema.createTable("cart_products", function(table) {
            table
              .uuid("shopping_cart_id")
              .notNullable()
              .references("shopping_carts.id")
              .onDelete("CASCADE");
            table
              .uuid("product_id")
              .notNullable()
              .references("products.id")
              .onDelete("CASCADE");
            table.primary(["product_id", "shopping_cart_id"]);
            table
              .timestamp("created_at")
              .notNullable()
              .defaultTo(knex.fn.now());
          });
        }
      });
  }
};

exports.down = function(knex, Promise) {
  return knex.schema
    .dropTableIfExists("cart_products")
    .then(() => knex.schema.dropTableIfExists("shopping_carts"));
};
