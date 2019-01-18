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
    return await query;
};