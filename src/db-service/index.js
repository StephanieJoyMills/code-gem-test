const { knex } = require("./knex");
module.exports = {
  ...require("./products"),
  ...require("./shopping_cart"),
  knex
};
