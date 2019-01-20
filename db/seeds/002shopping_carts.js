exports.seed = function(knex, Promise) {
  return knex("shopping_carts")
    .del()
    .then(function() {
      return knex("shopping_carts").insert([
        {
          id: "7da76898-8f53-40cb-be48-636d2535ad6c",
          owner_email: "stephanie@gmail.com",
          owner_name: "Stephanie"
        },
        { owner_email: "rikuDaCat@gmail.com", owner_name: "Riku" }
      ]);
    });
};
