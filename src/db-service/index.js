const {knex} = require('./knex')
module.exports = {
    ...require('./products'),
    knex
}
