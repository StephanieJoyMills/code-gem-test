const {knex} = require('./knex');

exports.getProducts = async (limit = 12, offset = 0, available) => {
    let query = knex('products')
    .orderBy(['created_at'], 'desc')
    .limit(limit)
    .offset(offset)
    .select(
      'products.title',
      'products.price',
      'products.inventory_count',
    )
    if (available){
        query.where('products.inventory_count', '>', 0);
    }
    return query;
};

exports.productInventory = async (id) => {
    const rows = await knex('products')
    .select('inventory_count')
    .where({ id })
    return rows[0] || false 
};

exports.purchaseProduct = async (id, updatedInventory) => {
    const rows = await knex('products')
    .update('inventory_count', updatedInventory)
    .where('id', id)
    .returning(['title','price', 'inventory_count']);
    return rows[0] || false
};