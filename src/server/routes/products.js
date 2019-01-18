const {
    getProducts,
  } = require('../../db-service');

module.exports = async function(app) {
    // get the metadata of the sets: name and id of set, total kitties required to completed set, and count of users kitties in each set
    app.get('/products', async (req, res, next) => {
      const { limit, offset } = req.query;
      try {
        const products = await getProducts(limit, offset);
        return res.send({ products });
      } catch (err) {
        console.log(
          {
            err,
          },
          'Failed to retrieve product data',
        );
        next(err);
      }
    });
}