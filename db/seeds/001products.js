exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("products")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("products").insert([
        {
          id: "7ba92c67-9b97-483b-8de8-874addf4ea89",
          title: "Cat Tree",
          price: 70.99,
          inventory_count: 13
        },
        {
          id: "ef981413-8dac-41f6-8e49-7dfffba4e183",
          title: "Large Mouse Toy",
          price: 10.99,
          inventory_count: 12
        },
        { title: "Small Mouse Toy", price: 1.99, inventory_count: 116 },
        { title: "Food Bowls", price: 20.99, inventory_count: 0 },
        { title: "Scratching Pole", price: 22.99, inventory_count: 5 },
        { title: "Large Dry Food", price: 15.99, inventory_count: 10 },
        { title: "Small Dry Food", price: 35.99, inventory_count: 3 },
        { title: "Large Wet Food", price: 3.99, inventory_count: 56 },
        { title: "Small Wet Food", price: 6.99, inventory_count: 21 }
      ]);
    });
};
